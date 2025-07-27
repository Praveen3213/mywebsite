from fastapi import FastAPI, APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
import re


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Praveen Reddy Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=2, max_length=100)
    email: str = Field(..., min_length=5, max_length=200)
    subject: str = Field(..., min_length=5, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="new")
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None

class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: str = Field(..., min_length=5, max_length=200)
    subject: str = Field(..., min_length=5, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)

class ContactResponse(BaseModel):
    success: bool
    message: str
    id: Optional[str] = None

# Utility functions
def validate_email(email: str) -> bool:
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def sanitize_input(text: str) -> str:
    # Basic sanitization - remove potential HTML/script tags
    text = re.sub(r'<[^>]*>', '', text)
    text = re.sub(r'javascript:', '', text, flags=re.IGNORECASE)
    return text.strip()

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Praveen Reddy Portfolio API is running!"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(
    contact_data: ContactMessageCreate,
    request: Request
):
    """
    Handle contact form submissions from the portfolio website
    """
    try:
        # Validate email format
        if not validate_email(contact_data.email):
            raise HTTPException(status_code=400, detail="Invalid email format")
        
        # Sanitize input data
        sanitized_data = {
            "name": sanitize_input(contact_data.name),
            "email": sanitize_input(contact_data.email.lower()),
            "subject": sanitize_input(contact_data.subject),
            "message": sanitize_input(contact_data.message)
        }
        
        # Create contact message object
        contact_message = ContactMessage(
            **sanitized_data,
            ip_address=request.client.host if hasattr(request, 'client') else None,
            user_agent=request.headers.get("user-agent", "") if hasattr(request, 'headers') else ""
        )
        
        # Save to database
        await db.contacts.insert_one(contact_message.dict())
        
        # Log the contact submission
        logger.info(f"New contact form submission from {contact_message.email}")
        
        return ContactResponse(
            success=True,
            message="Thank you for your message! I'll get back to you soon.",
            id=contact_message.id
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/contacts", response_model=List[ContactMessage])
async def get_all_contacts():
    """
    Get all contact form submissions (for admin use)
    """
    try:
        contacts = await db.contacts.find().sort("timestamp", -1).to_list(100)
        return [ContactMessage(**contact) for contact in contacts]
    except Exception as e:
        logger.error(f"Error fetching contacts: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/contacts/{contact_id}", response_model=ContactMessage)
async def get_contact_by_id(contact_id: str):
    """
    Get a specific contact message by ID
    """
    try:
        contact = await db.contacts.find_one({"id": contact_id})
        if not contact:
            raise HTTPException(status_code=404, detail="Contact not found")
        return ContactMessage(**contact)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching contact: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.patch("/contacts/{contact_id}/status")
async def update_contact_status(contact_id: str, status: str):
    """
    Update the status of a contact message (new, read, replied)
    """
    try:
        if status not in ["new", "read", "replied"]:
            raise HTTPException(status_code=400, detail="Invalid status")
            
        result = await db.contacts.update_one(
            {"id": contact_id},
            {"$set": {"status": status}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Contact not found")
            
        return {"success": True, "message": f"Status updated to {status}"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating contact status: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
