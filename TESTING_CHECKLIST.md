# Email Notification System - Testing Checklist

## Pre-Testing Setup

### ✓ Prerequisites
- [ ] Dev server is running (`npm run dev`)
- [ ] Application is accessible in browser
- [ ] EmailJS account is configured with credentials
- [ ] Have access to both a test email account and the admin email

### ✓ Configuration Verification
- [ ] EmailJS Service ID: `service_5yvw3kl` (in emailService.ts)
- [ ] EmailJS Template ID: `template_9qfpbxm` (in emailService.ts)
- [ ] EmailJS Public Key: `oeEXDVnhS6KGxOa_e` (in emailService.ts)
- [ ] Admin Email: `walkerchristopherr549@gmail.com` (in emailService.ts)

## Test Case 1: Student Registration - Email Delivery

### Steps:
```
1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Navigate to any course on the website
4. Click "Enroll as Student"
5. Fill in registration form:
   - Full Name: Test Student [Your Name]
   - Age: 18
   - Email: [YOUR_TEST_EMAIL]
   - Phone: +256700000000
   - Class Type: Private
   - Class Mode: Remote
   - Education Level: High School
   - Previous Coding: No
6. Click "Submit Registration"
```

### Expected Results:

#### Console Output:
```
✓ [Expected to see in console]
- "🔄 Processing registration for: [Your Name]"
- "📧 Sending enrollment confirmation emails..."
- "✓ Student confirmation email sent successfully to: [email]"
- "✓ Admin notification email sent successfully to: walkerchristopherr549@gmail.com"
- "✓ Registration completed successfully with all emails sent"

✗ [If you see errors, note them below]
```

#### Form Feedback:
```
- [ ] Success message appears
- [ ] Message shows: "Registration successful! Confirmation email has been sent to [email]"
- [ ] Form closes automatically after 2-3 seconds
```

#### Email Inbox Checks:
```
Student Email:
- [ ] Email arrives at [YOUR_TEST_EMAIL]
- [ ] Subject line indicates course registration
- [ ] Email contains course title: [Course Name]
- [ ] Email contains class mode: Remote
- [ ] Email contains pricing in UGX and USD
- [ ] Email contains 5-step next steps
- [ ] Contact information is in email

Admin Email:
- [ ] Email arrives at walkerchristopherr549@gmail.com
- [ ] Subject indicates new registration
- [ ] Email contains student name: [Your Name]
- [ ] Email contains student email: [YOUR_TEST_EMAIL]
- [ ] Email contains course name: [Course Name]
- [ ] Email contains action items for admin
```

### Pass/Fail:
```
PASS: Both student and admin emails received with all required information
FAIL: [Describe what failed]
```

## Test Case 2: Parent Registration - Multiple Children

### Steps:
```
1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Navigate to any course on the website
4. Click "Enroll as Parent"
5. Fill in parent information:
   - Full Name: Test Parent
   - Email: [YOUR_TEST_EMAIL]
   - Phone: +256700000000
   - Address: Test Address
   - Preferred Contact: Email
   - Class Type: Group
   - Class Mode: Physical
6. Fill in child #1:
   - Full Name: Child One
   - Age: 12
   - Education: Secondary School
   - Previous Coding: No
7. Click "Add Child"
8. Fill in child #2:
   - Full Name: Child Two
   - Age: 14
   - Education: Secondary School
   - Previous Coding: Yes
9. Click "Submit"
```

### Expected Results:

#### Console Output:
```
✓ [Expected]
- "🔄 Submitting parent registration for: Test Parent"
- "📧 Processing registration for child: Child One"
- "✓ Student confirmation email sent successfully to: [email]"
- "📧 Processing registration for child: Child Two"
- "✓ Student confirmation email sent successfully to: [email]"
- "✓ All registrations completed successfully"
```

#### Form Feedback:
```
- [ ] Success message appears
- [ ] Message shows: "Registration Successful!"
- [ ] Message includes: "Our admin team will contact you shortly"
- [ ] Form closes automatically
```

#### Email Inbox Checks:
```
For Each Child (should receive separate emails):
- [ ] Email 1 arrives for Child One
- [ ] Email 2 arrives for Child Two
- [ ] Both emails have correct child's information

Admin Inbox (should receive notification for each child):
- [ ] Email 1 for Child One enrollment
- [ ] Email 2 for Child Two enrollment
- [ ] Total of 2 emails from this registration
```

### Pass/Fail:
```
PASS: All children registrations sent emails to both student and admin
FAIL: [Describe what failed]
```

## Test Case 3: Form Validation

### Test 3.1: Empty Full Name
```
1. Open Student Registration form
2. Leave Full Name empty
3. Fill other fields
4. Click Submit

Expected: Error message "Full name is required"
Result: [ ] Pass [ ] Fail
```

### Test 3.2: Invalid Email
```
1. Open Student Registration form
2. Enter email: "invalidemail"
3. Fill other required fields
4. Click Submit

Expected: Error message "Valid email address is required"
Result: [ ] Pass [ ] Fail
```

### Test 3.3: Phone Too Short
```
1. Open Student Registration form
2. Enter phone: "123"
3. Fill other required fields
4. Click Submit

Expected: Error message "Valid phone number is required (at least 10 digits)"
Result: [ ] Pass [ ] Fail
```

### Test 3.4: Age Out of Range
```
1. Open Student Registration form
2. Enter age: "3"
3. Fill other required fields
4. Click Submit

Expected: Error message "Please enter a valid age (5-100)"
Result: [ ] Pass [ ] Fail
```

### Test 3.5: Missing Education
```
1. Open Student Registration form
2. Leave Education Level empty
3. Fill other required fields
4. Click Submit

Expected: Error message "Education level is required"
Result: [ ] Pass [ ] Fail
```

## Test Case 4: Partial Email Delivery

### Steps to Simulate (requires EmailJS service issue):
```
1. Temporarily modify EmailJS service ID to invalid value
2. Submit registration form
3. Observe error handling
```

### Expected Results:
```
- [ ] Console shows: "⚠ Partial email delivery"
- [ ] User still receives success message
- [ ] Message indicates email issues but will contact shortly
- [ ] No data is lost
```

## Test Case 5: Network Error Handling

### Steps:
```
1. Open Developer Tools
2. Go to Network tab
3. Set Offline mode
4. Try submitting registration
5. Go back Online
```

### Expected Results:
```
- [ ] Clear error message displayed
- [ ] Console shows error details
- [ ] User can retry submission
- [ ] After reconnect, submission succeeds
```

## Test Case 6: Different Course Prices

### Steps:
```
1. Test Student Registration for course with UGX price: 1,000,000
2. Check email contains correct price
3. Test Student Registration for course with different price
4. Verify email shows correct pricing
```

### Expected Results:
```
- [ ] Email shows correct UGX price
- [ ] Email shows correct USD price
- [ ] Prices match what was displayed on course page
- [ ] Currency symbols are correct
```

## Test Case 7: Class Mode Descriptions

### Steps:
```
1. Register with Class Mode: Remote
2. Check email for schedule info
3. Register with Class Mode: Physical
4. Check email for different schedule info
5. Register with Class Mode: Hybrid
```

### Expected Results:
```
Remote Registration:
- [ ] Email contains: "Online via Zoom/Google Meet - Flexible timing"

Physical Registration:
- [ ] Email contains: "In-person at GiiT Campus - Scheduled sessions"

Hybrid Registration:
- [ ] Email contains: "Flexible - Combination of online and in-person"
```

## Performance Test

### Steps:
```
1. Note the time
2. Submit registration form
3. Note the time when success message appears
4. Measure total time
```

### Expected Results:
```
- [ ] Form validation: < 1 second
- [ ] Email sending: 3-5 seconds
- [ ] Total process: < 10 seconds
- [ ] No timeout errors
- [ ] Both emails arrive within 1 minute
```

## Final Verification Checklist

### Email Service Status:
- [ ] EmailJS is initialized
- [ ] Service ID is valid
- [ ] Template ID is valid
- [ ] Public key is valid
- [ ] Admin email is correct

### Form Components:
- [ ] StudentRegistrationForm renders correctly
- [ ] ParentRegistrationForm renders correctly
- [ ] All form fields are present
- [ ] Form validation works
- [ ] Success/error messages display

### Email Delivery:
- [ ] Student emails arrive
- [ ] Admin emails arrive
- [ ] Email content is complete
- [ ] Email formatting is correct
- [ ] All required fields present

### Error Handling:
- [ ] Validation errors display correctly
- [ ] Network errors handled gracefully
- [ ] Partial email delivery handled
- [ ] User receives clear feedback

### Console Logging:
- [ ] Success messages show checkmarks
- [ ] Error messages show X marks
- [ ] Warning messages show caution symbols
- [ ] All logs are clear and actionable

## Summary Report

### Overall Status:
```
Total Tests: ___
Passed: ___
Failed: ___
Pass Rate: ___%
```

### Issues Found:
```
1. [Issue Description]
   Impact: [High/Medium/Low]
   Fix: [What needs to be done]

2. [Issue Description]
   Impact: [High/Medium/Low]
   Fix: [What needs to be done]
```

### Ready for Production:
```
[ ] YES - All tests passed, system is ready
[ ] NO - Issues need to be resolved before release
```

## Sign-Off

Tested by: ___________________
Date: ___________________
Environment: [Development/Staging/Production]

Notes:
```
[Additional observations or comments]
```

---

## Quick Reference: What to Check

### In Browser Console (F12):
1. ✓ Success indicators (green with checkmarks)
2. ❌ Error indicators (red with X marks)
3. ⚠ Warning indicators (yellow caution symbols)

### In Email Inboxes:
1. Student email received at registered address
2. Admin email received at walkerchristopherr549@gmail.com
3. All content matches registration information
4. Professional formatting and styling

### In Registration Form:
1. All required fields present
2. Validation works on invalid input
3. Success message shows after submission
4. Form closes automatically
5. Confirmation shows student's email address

## Need Help?

If tests fail or emails don't arrive:
1. Check browser console for error messages
2. Verify EmailJS credentials are correct
3. Check that both email inboxes (not spam folder)
4. Verify network connectivity
5. Check EmailJS dashboard for quota/limits
6. See EMAIL_SYSTEM_VERIFICATION.md for troubleshooting
