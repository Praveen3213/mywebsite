# API Contracts for Praveen Reddy Portfolio

## Backend Integration Plan

### Current Mock Data Structure
- **File**: `/app/frontend/src/mock.js`
- **Contains**: Personal info, experiences, education, skills, projects, testimonials, contact info
- **Frontend State**: All data is currently static/mock

### API Endpoints to Implement

#### 1. Contact Form Submission
**Endpoint**: `POST /api/contact`
**Purpose**: Handle contact form submissions from website visitors

**Request Body**:
```json
{
    "name": "string",
    "email": "string", 
    "subject": "string",
    "message": "string"
}
```

**Response**: 
```json
{
    "success": true,
    "message": "Message sent successfully",
    "id": "contact_id"
}
```

**Database Collection**: `contacts`
**Fields**: name, email, subject, message, timestamp, status (new/read)

#### 2. Portfolio Data Endpoints (Optional - for dynamic content)
**Endpoint**: `GET /api/portfolio`
**Purpose**: Serve portfolio data dynamically (currently using mock.js)

**Response**:
```json
{
    "personalInfo": {...},
    "experiences": [...],
    "skills": [...], 
    "projects": [...],
    "testimonials": [...]
}
```

### Frontend Integration Changes Required

1. **Contact Form** (`/app/frontend/src/components/Contact.jsx`):
   - Remove mock form submission
   - Add actual API call to `/api/contact`
   - Add loading states and success/error handling
   - Use toast notifications for feedback

2. **Data Fetching** (Optional):
   - Replace mock.js imports with API calls
   - Add loading states for data fetching
   - Error handling for failed API calls

### Database Schema

#### Contacts Collection
```javascript
{
    _id: ObjectId,
    name: String,
    email: String, 
    subject: String,
    message: String,
    timestamp: Date,
    status: String, // 'new', 'read', 'replied'
    ip_address: String, // for spam prevention
    user_agent: String
}
```

#### Portfolio Collection (Optional)
```javascript
{
    _id: ObjectId,
    section: String, // 'personalInfo', 'experiences', 'skills', etc.
    data: Mixed, // The actual content
    lastUpdated: Date,
    isActive: Boolean
}
```

### Implementation Priority

1. **High Priority**: Contact form backend + frontend integration
2. **Medium Priority**: Basic contact management dashboard
3. **Low Priority**: Dynamic portfolio content management

### Testing Requirements

1. Contact form submission with valid data
2. Contact form validation (required fields, email format)
3. Database storage verification
4. Email sending functionality (optional)
5. Spam prevention measures

### Security Considerations

1. Input validation and sanitization
2. Rate limiting for contact form
3. CORS configuration
4. Email validation
5. Basic spam protection

### Notes
- Contact form is the primary interactive feature needing backend
- All other data can remain static (mock.js) for MVP
- Email notifications for new contacts would be valuable addition