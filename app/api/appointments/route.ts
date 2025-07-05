import { NextRequest, NextResponse } from 'next/server';
import { sendAppointmentEmails, validateAppointmentData, type AppointmentEmailData } from '@/lib/email-service';
import sql from '@/lib/db';
import { createMeetingLink, type AppointmentMeetingData } from '@/lib/meeting-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Extract appointment data from request
    const appointmentData: AppointmentEmailData = {
      user_name: body.name || body.user_name || '',
      user_email: body.contact || body.email || body.user_email || '',
      user_phone: body.phone || body.user_phone || '',
      subject: body.subject || body.appointment_subject || '',
      preferred_date: body.date || body.preferred_date || '',
      preferred_time: body.time || body.preferred_time || '',
      timezone: body.timezone || '',
      duration: body.duration || 20, // Default 20 minutes
      meeting_platform: body.meeting_platform || 'google-meet', // Default Google Meet
      message: body.message || body.additional_message || '',
      owner_name: 'Kedhareswer Naidu',
      owner_email: 'kedhareswer.12110626@gmail.com'
    };

    // Validate the appointment data
    const validationErrors = validateAppointmentData(appointmentData);
    
    if (validationErrors.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        details: validationErrors
      }, { status: 400 });
    }

    // Check if EmailJS environment variables are configured
    if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 
        !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      console.error('EmailJS configuration missing');
      return NextResponse.json({
        success: false,
        error: 'Email service is not properly configured. Please contact the administrator.'
      }, { status: 500 });
    }

    // Generate meeting link/details
    let meetingPlatform = appointmentData.meeting_platform || 'google-meet';
    let meetingLink = '';
    try {
      const meetingData: AppointmentMeetingData = {
        subject: appointmentData.subject,
        date: appointmentData.preferred_date,
        time: appointmentData.preferred_time,
        timezone: appointmentData.timezone,
        duration: appointmentData.duration || 60,
        hostEmail: appointmentData.owner_email,
        attendeeEmail: appointmentData.user_email,
        attendeeName: appointmentData.user_name,
      };
      const meetingDetails = createMeetingLink(meetingData, meetingPlatform);
      meetingPlatform = meetingDetails.platform;
      meetingLink = meetingDetails.meetingUrl;
    } catch (linkErr) {
      console.error('Failed to generate meeting link', linkErr);
    }

    // Persist appointment to database (includes platform & link)
    try {
      await sql`INSERT INTO appointments (user_name, user_email, subject, preferred_date, preferred_time, timezone, meeting_platform, meeting_link) VALUES (
        ${appointmentData.user_name},
        ${appointmentData.user_email},
        ${appointmentData.subject},
        ${appointmentData.preferred_date},
        ${appointmentData.preferred_time},
        ${appointmentData.timezone},
        ${meetingPlatform},
        ${meetingLink}
      )`;
    } catch (dbError) {
      console.error('Failed to save appointment to database', dbError);
      // Continue even if DB fails
    }

    // Send emails using EmailJS
    const emailResult = await sendAppointmentEmails(appointmentData);
    
    if (emailResult.success) {
      return NextResponse.json({
        success: true,
        message: 'Appointment request submitted successfully! You and Kedhareswer will receive email confirmations shortly.',
        data: {
          appointment: {
            name: appointmentData.user_name,
            email: appointmentData.user_email,
            subject: appointmentData.subject,
            date: appointmentData.preferred_date,
            time: appointmentData.preferred_time,
            timezone: appointmentData.timezone
          },
          emailStatus: {
            userEmail: emailResult.results.userEmail.success,
            ownerEmail: emailResult.results.ownerEmail.success
          }
        }
      });
    } else {
      // Partial success or complete failure
      const results = emailResult.results || { userEmail: { success: false }, ownerEmail: { success: false } };
      const userEmailSent = results.userEmail?.success || false;
      const ownerEmailSent = results.ownerEmail?.success || false;
      
      let message = 'Appointment request received, but there were issues with email delivery.';
      
      if (userEmailSent && !ownerEmailSent) {
        message = 'Appointment request received and confirmation sent to you. Owner notification email failed.';
      } else if (!userEmailSent && ownerEmailSent) {
        message = 'Appointment request received and owner has been notified. Confirmation email to you failed.';
      } else {
        message = 'Appointment request received but email notifications failed. Please contact directly.';
      }
      
      return NextResponse.json({
        success: false,
        error: 'Email delivery issues',
        message,
        data: {
          appointment: {
            name: appointmentData.user_name,
            email: appointmentData.user_email,
            subject: appointmentData.subject,
            date: appointmentData.preferred_date,
            time: appointmentData.preferred_time,
            timezone: appointmentData.timezone
          },
          emailStatus: {
            userEmail: userEmailSent,
            ownerEmail: ownerEmailSent
          }
        }
      }, { status: 207 }); // 207 Multi-Status for partial success
    }

  } catch (error) {
    console.error('Appointment API Error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'An unexpected error occurred while processing your appointment request. Please try again or contact directly via email.'
    }, { status: 500 });
  }
}

// Handle GET requests (optional - for health check)
export async function GET() {
  return NextResponse.json({
    message: 'Appointments API is running',
    timestamp: new Date().toISOString(),
    endpoints: {
      POST: 'Submit appointment request'
    }
  });
} 