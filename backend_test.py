#!/usr/bin/env python3
"""
Backend API Testing for Praveen Reddy's Portfolio Website
Tests all contact form related endpoints and functionality
"""

import requests
import json
import uuid
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'http://localhost:8001')
API_BASE_URL = f"{BACKEND_URL}/api"

class ContactFormTester:
    def __init__(self):
        self.base_url = API_BASE_URL
        self.test_results = []
        self.created_contact_ids = []
        
    def log_result(self, test_name, success, message, details=None):
        """Log test results"""
        result = {
            'test': test_name,
            'success': success,
            'message': message,
            'details': details,
            'timestamp': datetime.now().isoformat()
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name} - {message}")
        if details:
            print(f"   Details: {details}")
    
    def test_api_health(self):
        """Test if the API is running"""
        try:
            response = requests.get(f"{self.base_url}/", timeout=10)
            if response.status_code == 200:
                self.log_result("API Health Check", True, "API is running successfully")
                return True
            else:
                self.log_result("API Health Check", False, f"API returned status {response.status_code}")
                return False
        except Exception as e:
            self.log_result("API Health Check", False, f"Failed to connect to API: {str(e)}")
            return False
    
    def test_contact_form_submission_valid(self):
        """Test valid contact form submission"""
        test_data = {
            "name": "Rajesh Kumar",
            "email": "rajesh.kumar@techcorp.com",
            "subject": "Collaboration Opportunity - Full Stack Development",
            "message": "Hi Praveen, I came across your portfolio and I'm impressed with your work. We have an exciting full-stack development opportunity at our company and would love to discuss it with you. Please let me know if you're interested."
        }
        
        try:
            response = requests.post(f"{self.base_url}/contact", json=test_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and data.get('id'):
                    self.created_contact_ids.append(data['id'])
                    self.log_result("Valid Contact Form Submission", True, 
                                  f"Contact submitted successfully with ID: {data['id']}")
                    return data['id']
                else:
                    self.log_result("Valid Contact Form Submission", False, 
                                  "Response missing success flag or ID", data)
                    return None
            else:
                self.log_result("Valid Contact Form Submission", False, 
                              f"HTTP {response.status_code}: {response.text}")
                return None
                
        except Exception as e:
            self.log_result("Valid Contact Form Submission", False, f"Request failed: {str(e)}")
            return None
    
    def test_contact_form_validation(self):
        """Test input validation for contact form"""
        
        # Test missing required fields
        invalid_data_sets = [
            ({}, "Empty data"),
            ({"name": ""}, "Missing name"),
            ({"name": "John", "email": ""}, "Missing email"),
            ({"name": "John", "email": "john@example.com", "subject": ""}, "Missing subject"),
            ({"name": "John", "email": "john@example.com", "subject": "Test", "message": ""}, "Missing message"),
            ({"name": "A", "email": "john@example.com", "subject": "Test", "message": "Short msg"}, "Name too short"),
            ({"name": "John", "email": "invalid-email", "subject": "Test", "message": "This is a test message"}, "Invalid email format"),
            ({"name": "John", "email": "john@example.com", "subject": "Hi", "message": "This is a test message"}, "Subject too short"),
            ({"name": "John", "email": "john@example.com", "subject": "Test Subject", "message": "Short"}, "Message too short"),
        ]
        
        validation_passed = 0
        for invalid_data, description in invalid_data_sets:
            try:
                response = requests.post(f"{self.base_url}/contact", json=invalid_data, timeout=10)
                
                if response.status_code == 422 or response.status_code == 400:
                    validation_passed += 1
                    self.log_result(f"Validation Test - {description}", True, 
                                  f"Correctly rejected invalid data (HTTP {response.status_code})")
                else:
                    self.log_result(f"Validation Test - {description}", False, 
                                  f"Should have rejected invalid data but got HTTP {response.status_code}")
                    
            except Exception as e:
                self.log_result(f"Validation Test - {description}", False, f"Request failed: {str(e)}")
        
        return validation_passed == len(invalid_data_sets)
    
    def test_email_format_validation(self):
        """Test email format validation specifically"""
        invalid_emails = [
            "plainaddress",
            "@missingdomain.com",
            "missing@.com",
            "missing@domain",
            "spaces @domain.com",
            "toolong" + "x" * 200 + "@domain.com"
        ]
        
        validation_passed = 0
        for email in invalid_emails:
            test_data = {
                "name": "Test User",
                "email": email,
                "subject": "Test Subject",
                "message": "This is a test message for email validation"
            }
            
            try:
                response = requests.post(f"{self.base_url}/contact", json=test_data, timeout=10)
                
                if response.status_code == 400 or response.status_code == 422:
                    validation_passed += 1
                    self.log_result(f"Email Validation - {email}", True, 
                                  f"Correctly rejected invalid email (HTTP {response.status_code})")
                else:
                    self.log_result(f"Email Validation - {email}", False, 
                                  f"Should have rejected invalid email but got HTTP {response.status_code}")
                    
            except Exception as e:
                self.log_result(f"Email Validation - {email}", False, f"Request failed: {str(e)}")
        
        return validation_passed == len(invalid_emails)
    
    def test_input_sanitization(self):
        """Test HTML/script tag sanitization"""
        malicious_inputs = [
            "<script>alert('xss')</script>",
            "<img src=x onerror=alert('xss')>",
            "javascript:alert('xss')",
            "<b>Bold text</b>",
            "<p>Paragraph</p>"
        ]
        
        for malicious_input in malicious_inputs:
            test_data = {
                "name": f"Test User {malicious_input}",
                "email": "test@example.com",
                "subject": f"Test Subject {malicious_input}",
                "message": f"Test message with {malicious_input} content"
            }
            
            try:
                response = requests.post(f"{self.base_url}/contact", json=test_data, timeout=10)
                
                if response.status_code == 200:
                    data = response.json()
                    if data.get('success') and data.get('id'):
                        self.created_contact_ids.append(data['id'])
                        self.log_result(f"Sanitization Test", True, 
                                      f"Malicious input handled successfully")
                    else:
                        self.log_result(f"Sanitization Test", False, 
                                      "Response missing success flag or ID")
                else:
                    self.log_result(f"Sanitization Test", False, 
                                  f"HTTP {response.status_code}: {response.text}")
                    
            except Exception as e:
                self.log_result(f"Sanitization Test", False, f"Request failed: {str(e)}")
    
    def test_contact_retrieval_all(self):
        """Test retrieving all contacts"""
        try:
            response = requests.get(f"{self.base_url}/contacts", timeout=10)
            
            if response.status_code == 200:
                contacts = response.json()
                if isinstance(contacts, list):
                    self.log_result("Get All Contacts", True, 
                                  f"Retrieved {len(contacts)} contacts successfully")
                    
                    # Check if contacts are sorted by timestamp (newest first)
                    if len(contacts) > 1:
                        timestamps = [contact.get('timestamp') for contact in contacts if contact.get('timestamp')]
                        if timestamps == sorted(timestamps, reverse=True):
                            self.log_result("Contact Sorting", True, "Contacts properly sorted by timestamp (newest first)")
                        else:
                            self.log_result("Contact Sorting", False, "Contacts not properly sorted by timestamp")
                    
                    return contacts
                else:
                    self.log_result("Get All Contacts", False, "Response is not a list")
                    return None
            else:
                self.log_result("Get All Contacts", False, f"HTTP {response.status_code}: {response.text}")
                return None
                
        except Exception as e:
            self.log_result("Get All Contacts", False, f"Request failed: {str(e)}")
            return None
    
    def test_contact_retrieval_by_id(self, contact_id):
        """Test retrieving a specific contact by ID"""
        if not contact_id:
            self.log_result("Get Contact by ID", False, "No contact ID provided")
            return None
            
        try:
            response = requests.get(f"{self.base_url}/contacts/{contact_id}", timeout=10)
            
            if response.status_code == 200:
                contact = response.json()
                if contact.get('id') == contact_id:
                    self.log_result("Get Contact by ID", True, 
                                  f"Retrieved contact {contact_id} successfully")
                    return contact
                else:
                    self.log_result("Get Contact by ID", False, 
                                  f"Retrieved contact ID doesn't match requested ID")
                    return None
            elif response.status_code == 404:
                self.log_result("Get Contact by ID", False, 
                              f"Contact {contact_id} not found (404)")
                return None
            else:
                self.log_result("Get Contact by ID", False, 
                              f"HTTP {response.status_code}: {response.text}")
                return None
                
        except Exception as e:
            self.log_result("Get Contact by ID", False, f"Request failed: {str(e)}")
            return None
    
    def test_contact_retrieval_invalid_id(self):
        """Test retrieving contact with invalid ID"""
        invalid_id = "invalid-contact-id-12345"
        
        try:
            response = requests.get(f"{self.base_url}/contacts/{invalid_id}", timeout=10)
            
            if response.status_code == 404:
                self.log_result("Get Contact Invalid ID", True, 
                              "Correctly returned 404 for invalid contact ID")
                return True
            else:
                self.log_result("Get Contact Invalid ID", False, 
                              f"Should return 404 but got HTTP {response.status_code}")
                return False
                
        except Exception as e:
            self.log_result("Get Contact Invalid ID", False, f"Request failed: {str(e)}")
            return False
    
    def test_contact_status_update(self, contact_id):
        """Test updating contact status"""
        if not contact_id:
            self.log_result("Update Contact Status", False, "No contact ID provided")
            return False
            
        valid_statuses = ["read", "replied"]
        
        for status in valid_statuses:
            try:
                # Note: The API expects status as a query parameter or in request body
                # Let's try both approaches
                response = requests.patch(f"{self.base_url}/contacts/{contact_id}/status", 
                                        params={"status": status}, timeout=10)
                
                if response.status_code == 200:
                    data = response.json()
                    if data.get('success'):
                        self.log_result(f"Update Status to {status}", True, 
                                      f"Successfully updated contact status to {status}")
                    else:
                        self.log_result(f"Update Status to {status}", False, 
                                      "Response missing success flag")
                else:
                    self.log_result(f"Update Status to {status}", False, 
                                  f"HTTP {response.status_code}: {response.text}")
                    
            except Exception as e:
                self.log_result(f"Update Status to {status}", False, f"Request failed: {str(e)}")
        
        return True
    
    def test_contact_status_update_invalid(self, contact_id):
        """Test updating contact status with invalid values"""
        if not contact_id:
            self.log_result("Update Contact Status Invalid", False, "No contact ID provided")
            return False
            
        invalid_statuses = ["invalid", "pending", "closed", ""]
        
        validation_passed = 0
        for status in invalid_statuses:
            try:
                response = requests.patch(f"{self.base_url}/contacts/{contact_id}/status", 
                                        params={"status": status}, timeout=10)
                
                if response.status_code == 400:
                    validation_passed += 1
                    self.log_result(f"Invalid Status - {status}", True, 
                                  f"Correctly rejected invalid status '{status}' (HTTP 400)")
                else:
                    self.log_result(f"Invalid Status - {status}", False, 
                                  f"Should reject invalid status but got HTTP {response.status_code}")
                    
            except Exception as e:
                self.log_result(f"Invalid Status - {status}", False, f"Request failed: {str(e)}")
        
        return validation_passed == len(invalid_statuses)
    
    def test_contact_status_update_nonexistent(self):
        """Test updating status for non-existent contact"""
        nonexistent_id = "nonexistent-contact-id-12345"
        
        try:
            response = requests.patch(f"{self.base_url}/contacts/{nonexistent_id}/status", 
                                    params={"status": "read"}, timeout=10)
            
            if response.status_code == 404:
                self.log_result("Update Status Nonexistent Contact", True, 
                              "Correctly returned 404 for non-existent contact")
                return True
            else:
                self.log_result("Update Status Nonexistent Contact", False, 
                              f"Should return 404 but got HTTP {response.status_code}")
                return False
                
        except Exception as e:
            self.log_result("Update Status Nonexistent Contact", False, f"Request failed: {str(e)}")
            return False
    
    def test_long_input_handling(self):
        """Test handling of extremely long inputs"""
        long_string = "x" * 3000  # Very long string
        
        test_data = {
            "name": long_string,
            "email": "test@example.com",
            "subject": long_string,
            "message": long_string
        }
        
        try:
            response = requests.post(f"{self.base_url}/contact", json=test_data, timeout=10)
            
            if response.status_code == 422 or response.status_code == 400:
                self.log_result("Long Input Handling", True, 
                              f"Correctly rejected extremely long input (HTTP {response.status_code})")
                return True
            else:
                self.log_result("Long Input Handling", False, 
                              f"Should reject long input but got HTTP {response.status_code}")
                return False
                
        except Exception as e:
            self.log_result("Long Input Handling", False, f"Request failed: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all tests in sequence"""
        print(f"\n🚀 Starting Backend API Tests for Contact Form")
        print(f"Backend URL: {self.base_url}")
        print("=" * 60)
        
        # Test 1: API Health Check
        if not self.test_api_health():
            print("\n❌ API is not accessible. Stopping tests.")
            return self.generate_report()
        
        # Test 2: Valid Contact Form Submission
        contact_id = self.test_contact_form_submission_valid()
        
        # Test 3: Input Validation
        self.test_contact_form_validation()
        
        # Test 4: Email Format Validation
        self.test_email_format_validation()
        
        # Test 5: Input Sanitization
        self.test_input_sanitization()
        
        # Test 6: Contact Retrieval (All)
        self.test_contact_retrieval_all()
        
        # Test 7: Contact Retrieval by ID
        if contact_id:
            self.test_contact_retrieval_by_id(contact_id)
            
            # Test 8: Contact Status Update
            self.test_contact_status_update(contact_id)
            
            # Test 9: Invalid Status Update
            self.test_contact_status_update_invalid(contact_id)
        
        # Test 10: Invalid Contact ID
        self.test_contact_retrieval_invalid_id()
        
        # Test 11: Status Update for Non-existent Contact
        self.test_contact_status_update_nonexistent()
        
        # Test 12: Long Input Handling
        self.test_long_input_handling()
        
        return self.generate_report()
    
    def generate_report(self):
        """Generate test report"""
        print("\n" + "=" * 60)
        print("📊 TEST RESULTS SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result['success'])
        total = len(self.test_results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total*100):.1f}%" if total > 0 else "0%")
        
        if total - passed > 0:
            print(f"\n❌ FAILED TESTS:")
            for result in self.test_results:
                if not result['success']:
                    print(f"  • {result['test']}: {result['message']}")
        
        print(f"\n📝 Created Contact IDs during testing: {len(self.created_contact_ids)}")
        for contact_id in self.created_contact_ids:
            print(f"  • {contact_id}")
        
        return {
            'total_tests': total,
            'passed': passed,
            'failed': total - passed,
            'success_rate': (passed/total*100) if total > 0 else 0,
            'results': self.test_results,
            'created_contacts': self.created_contact_ids
        }

if __name__ == "__main__":
    tester = ContactFormTester()
    report = tester.run_all_tests()
    
    # Save detailed results to file
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump(report, f, indent=2, default=str)
    
    print(f"\n💾 Detailed results saved to: /app/backend_test_results.json")