import emailjs from '@emailjs/browser';
import { createMeetingWithCalendar, type MeetingDetails, type AppointmentMeetingData } from './meeting-service';

// EmailJS configuration
const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'your_service_id',
  TEMPLATE_ID_USER: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_USER || 'template_user',
  TEMPLATE_ID_OWNER: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_OWNER || 'template_owner',
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key',
};

// Initialize EmailJS
export const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
};

// Email template interface
export interface AppointmentEmailData {
  user_name: string;
  user_email: string;
  user_phone?: string;
  subject: string;
  preferred_date: string;
  preferred_time: string;
  timezone: string;
  duration?: number; // in minutes, defaults to 60
  meeting_platform?: 'google-meet' | 'zoom'; // defaults to google-meet
  message?: string;
  owner_name: string;
  owner_email: string;
}

// Send confirmation email to user
export const sendUserConfirmationEmail = async (data: AppointmentEmailData) => {
  try {
    // Create meeting link
    const meetingData: AppointmentMeetingData = {
      subject: data.subject,
      date: data.preferred_date,
      time: data.preferred_time,
      timezone: data.timezone,
      duration: data.duration || 60,
      hostEmail: data.owner_email,
      attendeeEmail: data.user_email,
      attendeeName: data.user_name,
    };
    
    const meetingDetails = createMeetingWithCalendar(meetingData, data.meeting_platform || 'google-meet');
    
    const templateParams = {
      to_name: data.user_name,
      to_email: data.user_email,
      from_name: data.owner_name,
      subject: `Appointment Confirmation - ${data.subject}`,
      user_name: data.user_name,
      user_email: data.user_email,
      user_phone: data.user_phone || 'Not provided',
      appointment_subject: data.subject,
      preferred_date: data.preferred_date,
      preferred_time: data.preferred_time,
      timezone: data.timezone,
      duration: data.duration || 60,
      message: data.message || '',
      reply_to: data.owner_email,
      // Meeting details
      meeting_platform: meetingDetails.platform,
      meeting_url: meetingDetails.meetingUrl,
      meeting_id: meetingDetails.meetingId,
      meeting_passcode: meetingDetails.passcode || '',
      meeting_instructions: meetingDetails.instructions,
      calendar_url: meetingDetails.calendarUrl,
      calendar_instructions: meetingDetails.calendarInstructions,
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID_USER,
      templateParams
    );

    return { success: true, response };
  } catch (error) {
    console.error('Error sending user confirmation email:', error);
    return { success: false, error };
  }
};

// Send notification email to owner
export const sendOwnerNotificationEmail = async (data: AppointmentEmailData) => {
  try {
    // Create meeting link (same as user email)
    const meetingData: AppointmentMeetingData = {
      subject: data.subject,
      date: data.preferred_date,
      time: data.preferred_time,
      timezone: data.timezone,
      duration: data.duration || 60,
      hostEmail: data.owner_email,
      attendeeEmail: data.user_email,
      attendeeName: data.user_name,
    };
    
    const meetingDetails = createMeetingWithCalendar(meetingData, data.meeting_platform || 'google-meet');
    
    const templateParams = {
      to_name: data.owner_name,
      to_email: data.owner_email,
      from_name: 'Portfolio Website',
      subject: `New Appointment Request from ${data.user_name}`,
      user_name: data.user_name,
      user_email: data.user_email,
      user_phone: data.user_phone || 'Not provided',
      appointment_subject: data.subject,
      preferred_date: data.preferred_date,
      preferred_time: data.preferred_time,
      timezone: data.timezone,
      duration: data.duration || 60,
      message: data.message || '',
      reply_to: data.user_email,
      // Meeting details
      meeting_platform: meetingDetails.platform,
      meeting_url: meetingDetails.meetingUrl,
      meeting_id: meetingDetails.meetingId,
      meeting_passcode: meetingDetails.passcode || '',
      meeting_instructions: meetingDetails.instructions,
      calendar_url: meetingDetails.calendarUrl,
      calendar_instructions: meetingDetails.calendarInstructions,
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID_OWNER,
      templateParams
    );

    return { success: true, response };
  } catch (error) {
    console.error('Error sending owner notification email:', error);
    return { success: false, error };
  }
};

// Send both emails
export const sendAppointmentEmails = async (data: AppointmentEmailData) => {
  try {
    // Send both emails concurrently
    const [userResult, ownerResult] = await Promise.allSettled([
      sendUserConfirmationEmail(data),
      sendOwnerNotificationEmail(data)
    ]);

    const results = {
      userEmail: userResult.status === 'fulfilled' ? userResult.value : { success: false, error: userResult.reason },
      ownerEmail: ownerResult.status === 'fulfilled' ? ownerResult.value : { success: false, error: ownerResult.reason }
    };

    const success = results.userEmail.success && results.ownerEmail.success;
    
    return {
      success,
      results,
      message: success 
        ? 'Appointment emails sent successfully to both parties'
        : 'Some emails failed to send. Please check the results.'
    };
  } catch (error) {
    console.error('Error sending appointment emails:', error);
    return {
      success: false,
      error,
      message: 'Failed to send appointment emails',
      results: {
        userEmail: { success: false, error },
        ownerEmail: { success: false, error }
      }
    };
  }
};

// Validate email data
export const validateAppointmentData = (data: Partial<AppointmentEmailData>): string[] => {
  const errors: string[] = [];
  
  if (!data.user_name?.trim()) errors.push('User name is required');
  if (!data.user_email?.trim()) errors.push('User email is required');
  if (!data.subject?.trim()) errors.push('Appointment subject is required');
  if (!data.preferred_date?.trim()) errors.push('Preferred date is required');
  if (!data.preferred_time?.trim()) errors.push('Preferred time is required');
  if (!data.timezone?.trim()) errors.push('Timezone is required');
  
  // Validate email format
  if (data.user_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.user_email)) {
    errors.push('Invalid email format');
  }
  
  // Validate date format (basic check)
  if (data.preferred_date && !/^\d{4}-\d{2}-\d{2}$/.test(data.preferred_date)) {
    errors.push('Date should be in YYYY-MM-DD format');
  }
  
  return errors;
}; 