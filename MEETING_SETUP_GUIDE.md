 # 🎥 Enhanced Appointment Booking with Video Meetings

This guide covers the complete setup for your appointment booking system that now includes automatic video meeting link generation (Google Meet or Zoom) and professional email confirmations.

## 🚀 **New Features Added:**

✅ **Automatic Video Meeting Creation** (Google Meet or Zoom)  
✅ **Calendar Integration** with meeting links  
✅ **Enhanced Email Templates** with meeting details  
✅ **Meeting Duration Preferences**  
✅ **Platform Choice** (Google Meet/Zoom)  
✅ **Professional Meeting Agendas**  

## 📋 **Prerequisites**

1. EmailJS account (free at [emailjs.com](https://www.emailjs.com/))
2. Email service connected to EmailJS (Gmail recommended)
3. Your domain configured in EmailJS access control

## 🔧 **Step 1: EmailJS Configuration**

### Environment Variables

Create `.env.local` file with:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_USER=template_user_meeting
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_OWNER=template_owner_meeting

# Existing API Key
GROQ_API_KEY=your_groq_api_key_here
```

## 📧 **Step 2: Enhanced Email Templates**

### Template 1: User Confirmation with Meeting Details

**Template ID:** `template_user_meeting`  
**Subject:** `🎥 Meeting Confirmed - {{appointment_subject}}`

**HTML Template:**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meeting Confirmation</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            background-color: #f8f9fa;
            margin: 0;
            padding: 20px;
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: white; 
            border-radius: 12px; 
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 30px 20px; 
            text-align: center; 
        }
        .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
        .content { padding: 30px; }
        .details-section { 
            background: #f8f9fa; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0; 
            border-left: 4px solid #667eea;
        }
        .meeting-section { 
            background: linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%); 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0; 
            border: 2px solid #28a745;
        }
        .meeting-link { 
            display: inline-block; 
            background: #28a745; 
            color: white; 
            padding: 12px 24px; 
            text-decoration: none; 
            border-radius: 6px; 
            font-weight: 600;
            margin: 10px 0;
        }
        .calendar-button { 
            display: inline-block; 
            background: #007bff; 
            color: white; 
            padding: 12px 24px; 
            text-decoration: none; 
            border-radius: 6px; 
            font-weight: 600;
            margin: 10px 0;
        }
        .footer { 
            background: #343a40; 
            color: white; 
            padding: 20px; 
            text-align: center; 
            font-size: 14px; 
        }
        .emoji { font-size: 1.2em; }
        .highlight { background: #fff3cd; padding: 2px 6px; border-radius: 4px; }
        .instructions { 
            background: #e7f3ff; 
            padding: 15px; 
            border-radius: 6px; 
            border-left: 4px solid #007bff;
            margin: 15px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1><span class="emoji">🎉</span> Meeting Confirmed!</h1>
            <p>Your appointment with Kedhareswer Naidu is all set</p>
        </div>
        
        <div class="content">
            <p>Hi <strong>{{user_name}}</strong>,</p>
            
            <p>Great news! Your meeting request has been confirmed. I've created a secure video meeting room for our discussion.</p>
            
            <div class="details-section">
                <h3><span class="emoji">📅</span> Meeting Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0; font-weight: 600;">Subject:</td><td style="padding: 8px 0;">{{appointment_subject}}</td></tr>
                    <tr><td style="padding: 8px 0; font-weight: 600;">Date:</td><td style="padding: 8px 0;">{{preferred_date}}</td></tr>
                    <tr><td style="padding: 8px 0; font-weight: 600;">Time:</td><td style="padding: 8px 0;">{{preferred_time}} ({{timezone}})</td></tr>
                    <tr><td style="padding: 8px 0; font-weight: 600;">Duration:</td><td style="padding: 8px 0;">{{duration}} minutes</td></tr>
                    <tr><td style="padding: 8px 0; font-weight: 600;">Platform:</td><td style="padding: 8px 0;">{{meeting_platform}}</td></tr>
                </table>
            </div>
            
            <div class="meeting-section">
                <h3><span class="emoji">🎥</span> Join Your Meeting</h3>
                <p><strong>Meeting Link:</strong></p>
                <a href="{{meeting_url}}" class="meeting-link" target="_blank">
                    <span class="emoji">📹</span> Join {{meeting_platform}} Meeting
                </a>
                
                {{#meeting_id}}
                <p><strong>Meeting ID:</strong> <span class="highlight">{{meeting_id}}</span></p>
                {{/meeting_id}}
                
                {{#meeting_passcode}}
                <p><strong>Passcode:</strong> <span class="highlight">{{meeting_passcode}}</span></p>
                {{/meeting_passcode}}
                
                <div class="instructions">
                    <h4>📱 How to Join:</h4>
                    <ul>
                        <li><strong>By Computer:</strong> Click the meeting link above</li>
                        <li><strong>By Mobile:</strong> Download the app and use the meeting ID</li>
                        <li><strong>By Phone:</strong> Dial-in numbers available in the meeting room</li>
                    </ul>
                </div>
            </div>
            
            <div style="text-align: center; margin: 25px 0;">
                <a href="{{calendar_url}}" class="calendar-button" target="_blank">
                    <span class="emoji">📅</span> Add to Google Calendar
                </a>
            </div>
            
            {{#message}}
            <div class="details-section">
                <h3><span class="emoji">💬</span> Your Message</h3>
                <p>{{message}}</p>
            </div>
            {{/message}}
            
            <div class="instructions">
                <h4><span class="emoji">💡</span> Meeting Preparation:</h4>
                <ul>
                    <li>Join 2-3 minutes early for technical checks</li>
                    <li>Ensure stable internet connection</li>
                    <li>Test your camera and microphone beforehand</li>
                    <li>Have any relevant documents ready</li>
                </ul>
            </div>
            
            <p>Looking forward to our discussion! If you need to reschedule or have any questions, please reply to this email.</p>
            
            <p>Best regards,<br>
            <strong>Kedhareswer Naidu</strong><br>
            AI/ML & Data Science Specialist</p>
        </div>
        
        <div class="footer">
            <p><strong>Contact Information</strong></p>
            <p>📧 kedhareswer.12110626@gmail.com | 📞 +91-9398911432</p>
            <p>🌐 Portfolio: <a href="https://kedhareswer-portfolio.vercel.app" style="color: #17a2b8;">kedhareswer-portfolio.vercel.app</a></p>
        </div>
    </div>
</body>
</html>
```

### Template 2: Owner Notification with Meeting Management

**Template ID:** `template_owner_meeting`  
**Subject:** `🔔 New Meeting Request - {{user_name}} ({{appointment_subject}})`

**HTML Template:**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Meeting Request</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            background-color: #f8f9fa;
            margin: 0;
            padding: 20px;
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: white; 
            border-radius: 12px; 
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header { 
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); 
            color: white; 
            padding: 30px 20px; 
            text-align: center; 
        }
        .urgent-banner { 
            background: #dc3545; 
            color: white; 
            padding: 15px; 
            text-align: center; 
            font-weight: 600;
        }
        .content { padding: 30px; }
        .client-info { 
            background: #e7f3ff; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0; 
            border-left: 4px solid #007bff;
        }
        .meeting-info { 
            background: #f8f9fa; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0; 
            border-left: 4px solid #28a745;
        }
        .action-section { 
            background: #fff3cd; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0; 
            border: 2px solid #ffc107;
        }
        .meeting-link { 
            display: inline-block; 
            background: #28a745; 
            color: white; 
            padding: 12px 24px; 
            text-decoration: none; 
            border-radius: 6px; 
            font-weight: 600;
            margin: 10px 0;
        }
        .calendar-button { 
            display: inline-block; 
            background: #007bff; 
            color: white; 
            padding: 12px 24px; 
            text-decoration: none; 
            border-radius: 6px; 
            font-weight: 600;
            margin: 10px 0;
        }
        .reply-button { 
            display: inline-block; 
            background: #6f42c1; 
            color: white; 
            padding: 12px 24px; 
            text-decoration: none; 
            border-radius: 6px; 
            font-weight: 600;
            margin: 10px 0;
        }
        .footer { 
            background: #343a40; 
            color: white; 
            padding: 20px; 
            text-align: center; 
            font-size: 14px; 
        }
        .emoji { font-size: 1.2em; }
        .highlight { background: #fff3cd; padding: 2px 6px; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="urgent-banner">
            <span class="emoji">🚨</span> NEW MEETING REQUEST RECEIVED
        </div>
        
        <div class="header">
            <h1><span class="emoji">📅</span> Meeting Request</h1>
            <p>Someone wants to schedule a meeting with you!</p>
        </div>
        
        <div class="content">
            <div class="client-info">
                <h3><span class="emoji">👤</span> Client Information</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0; font-weight: 600;">Name:</td><td style="padding: 8px 0;">{{user_name}}</td></tr>
                    <tr><td style="padding: 8px 0; font-weight: 600;">Email:</td><td style="padding: 8px 0;"><a href="mailto:{{user_email}}">{{user_email}}</a></td></tr>
                    {{#user_phone}}<tr><td style="padding: 8px 0; font-weight: 600;">Phone:</td><td style="padding: 8px 0;">{{user_phone}}</td></tr>{{/user_phone}}
                </table>
            </div>
            
            <div class="meeting-info">
                <h3><span class="emoji">🎥</span> Meeting Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0; font-weight: 600;">Subject:</td><td style="padding: 8px 0;">{{appointment_subject}}</td></tr>
                    <tr><td style="padding: 8px 0; font-weight: 600;">Date:</td><td style="padding: 8px 0;">{{preferred_date}}</td></tr>
                    <tr><td style="padding: 8px 0; font-weight: 600;">Time:</td><td style="padding: 8px 0;">{{preferred_time}} ({{timezone}})</td></tr>
                    <tr><td style="padding: 8px 0; font-weight: 600;">Duration:</td><td style="padding: 8px 0;">{{duration}} minutes</td></tr>
                    <tr><td style="padding: 8px 0; font-weight: 600;">Platform:</td><td style="padding: 8px 0;">{{meeting_platform}}</td></tr>
                </table>
                
                <div style="margin-top: 20px;">
                    <p><strong><span class="emoji">🔗</span> Meeting Link (Auto-Generated):</strong></p>
                    <a href="{{meeting_url}}" class="meeting-link" target="_blank">
                        <span class="emoji">📹</span> Join {{meeting_platform}} Meeting
                    </a>
                    
                    {{#meeting_id}}
                    <p><strong>Meeting ID:</strong> <span class="highlight">{{meeting_id}}</span></p>
                    {{/meeting_id}}
                    
                    {{#meeting_passcode}}
                    <p><strong>Passcode:</strong> <span class="highlight">{{meeting_passcode}}</span></p>
                    {{/meeting_passcode}}
                </div>
            </div>
            
            {{#message}}
            <div class="client-info">
                <h3><span class="emoji">💬</span> Client's Message</h3>
                <p><em>"{{message}}"</em></p>
            </div>
            {{/message}}
            
            <div class="action-section">
                <h3><span class="emoji">⚡</span> Action Required</h3>
                <p><strong>Response needed within 24-48 hours</strong></p>
                
                <div style="text-align: center; margin: 20px 0;">
                    <a href="mailto:{{user_email}}?subject=Re: Meeting Request - {{appointment_subject}}&body=Hi {{user_name}},%0D%0A%0D%0AThank you for scheduling a meeting with me. I confirm our appointment for {{preferred_date}} at {{preferred_time}} ({{timezone}}).%0D%0A%0D%0AMeeting Link: {{meeting_url}}%0D%0A%0D%0ALooking forward to our discussion!%0D%0A%0D%0ABest regards,%0D%0AKedhareswer Naidu" class="reply-button" target="_blank">
                        <span class="emoji">📧</span> Reply to Client
                    </a>
                    
                    <a href="{{calendar_url}}" class="calendar-button" target="_blank">
                        <span class="emoji">📅</span> Add to Calendar
                    </a>
                </div>
                
                <div style="background: #e9ecef; padding: 15px; border-radius: 6px; margin-top: 20px;">
                    <h4><span class="emoji">✅</span> Meeting Confirmation Checklist:</h4>
                    <ul style="margin: 0;">
                        <li>Reply to confirm the meeting time</li>
                        <li>Add the meeting to your calendar</li>
                        <li>Test the meeting link beforehand</li>
                        <li>Prepare any relevant materials</li>
                        <li>Set up reminder notifications</li>
                    </ul>
                </div>
            </div>
            
            <p style="margin-top: 30px;"><strong>Next Steps:</strong></p>
            <ol>
                <li>Confirm the meeting time with the client</li>
                <li>Add the appointment to your calendar</li>
                <li>Test the video meeting link</li>
                <li>Prepare for the discussion</li>
            </ol>
        </div>
        
        <div class="footer">
            <p><strong>Portfolio Website Notification</strong></p>
            <p>This meeting was scheduled through your portfolio chat interface</p>
            <p>Meeting links are automatically generated and included in client emails</p>
        </div>
    </div>
</body>
</html>
```

## 🧪 **Step 3: Testing the Enhanced System**

### Test Conversation Example:

**User:** "I want to book an appointment"

**Bot Response:** Shows enhanced booking form with video meeting options

**User:** 
```
Name: John Smith
Contact: john@example.com
Subject: Project collaboration discussion
Date: 2024-02-15
Time: 2:00 PM
Timezone: EST
Duration: 90 minutes
Platform: Google Meet
```

**Result:** 
- ✅ Appointment confirmed
- ✅ Google Meet link created
- ✅ Calendar invitations sent
- ✅ Professional emails with meeting details
- ✅ Both parties receive complete information

## 🔧 **Step 4: Email Template Variables**

All available variables in the templates:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{user_name}}` | Client's name | "John Smith" |
| `{{user_email}}` | Client's email | "john@example.com" |
| `{{user_phone}}` | Client's phone (optional) | "+1234567890" |
| `{{appointment_subject}}` | Meeting subject | "Project Discussion" |
| `{{preferred_date}}` | Meeting date | "2024-02-15" |
| `{{preferred_time}}` | Meeting time | "2:00 PM" |
| `{{timezone}}` | User's timezone | "EST" |
| `{{duration}}` | Meeting duration | "60" |
| `{{meeting_platform}}` | Video platform | "Google Meet" |
| `{{meeting_url}}` | Video meeting link | "https://meet.google.com/abc-def-ghi" |
| `{{meeting_id}}` | Meeting ID/Room | "abc-def-ghi" |
| `{{meeting_passcode}}` | Meeting passcode (Zoom) | "123456" |
| `{{calendar_url}}` | Calendar invitation link | Google Calendar URL |
| `{{message}}` | Additional message (optional) | User's extra notes |

## 🚨 **Troubleshooting**

### Common Issues:

1. **Meeting links not generating**
   - Check that uuid package is installed: `pnpm add uuid @types/uuid`
   - Verify meeting service is imported correctly

2. **Email templates not displaying meeting info**
   - Ensure all template variables are correctly formatted
   - Check that templates are published in EmailJS

3. **Calendar links not working**
   - Verify date/time format is correct
   - Check URL encoding in calendar links

### Debug Checklist:

- [ ] Environment variables set correctly
- [ ] EmailJS templates created and published
- [ ] Service ID and template IDs match
- [ ] Domain added to EmailJS access control
- [ ] Test with sample appointment data

## 🎯 **Features Summary**

✅ **Automatic Meeting Creation**: Google Meet or Zoom links generated instantly  
✅ **Calendar Integration**: One-click calendar additions  
✅ **Professional Emails**: Beautiful HTML templates with all details  
✅ **Flexible Duration**: Custom meeting lengths (default 60 minutes)  
✅ **Platform Choice**: User can prefer Google Meet or Zoom  
✅ **Mobile Responsive**: Email templates work on all devices  
✅ **Error Handling**: Graceful fallbacks and clear error messages  
✅ **Security**: No API keys needed for basic meeting generation  

## 🔒 **Security & Privacy**

- Meeting links are unique and time-stamped
- No personal data stored on external services
- Email templates follow best practices
- Meeting rooms are generated fresh for each appointment
- All communication happens through your controlled EmailJS service

---

**Your enhanced appointment booking system is now ready! 🎉**

Users can now book appointments with automatic video meetings, and you'll receive professional notifications with all the details needed to manage your schedule effectively.