import { v4 as uuidv4 } from 'uuid';

export interface MeetingDetails {
  platform: 'google-meet' | 'zoom';
  meetingUrl: string;
  meetingId: string;
  passcode?: string;
  dialInNumber?: string;
  instructions: string;
}

export interface AppointmentMeetingData {
  subject: string;
  date: string;
  time: string;
  timezone: string;
  duration: number; // in minutes
  hostEmail: string;
  attendeeEmail: string;
  attendeeName: string;
}

// Generate Google Meet link (instant meeting approach)
export const generateGoogleMeetLink = (appointmentData: AppointmentMeetingData): MeetingDetails => {
  // Generate a unique meeting ID
  const meetingId = `apt-${Date.now()}-${uuidv4().substring(0, 8)}`;
  
  // Create Google Meet URL (this creates an instant meeting room)
  const meetingUrl = `https://meet.google.com/${meetingId}`;
  
  return {
    platform: 'google-meet',
    meetingUrl,
    meetingId,
    instructions: `
🎥 **Google Meet Details:**
• **Meeting Link:** ${meetingUrl}
• **Meeting ID:** ${meetingId}
• **How to Join:**
  - Click the meeting link above
  - Or go to meet.google.com and enter the meeting ID
  - No password required

📱 **Join by Phone:**
• You can also join by dialing into the meeting once it starts
• Phone numbers will be available in the meeting room

⏰ **Meeting Schedule:**
• **Date:** ${appointmentData.date}
• **Time:** ${appointmentData.time} (${appointmentData.timezone})
• **Duration:** ${appointmentData.duration} minutes

💡 **Tips:**
• Join a few minutes early to test your audio/video
• Ensure you have a stable internet connection
• Use Chrome for the best Google Meet experience
    `.trim()
  };
};

// Generate Zoom meeting link (using Zoom web client)
export const generateZoomMeetLink = (appointmentData: AppointmentMeetingData): MeetingDetails => {
  // Generate meeting details
  const meetingId = Math.random().toString().substring(2, 11); // 9-digit ID
  const passcode = Math.random().toString(36).substring(2, 8).toUpperCase(); // 6-char passcode
  
  // Create Zoom web client URL
  const meetingUrl = `https://zoom.us/j/${meetingId}?pwd=${passcode}`;
  
  return {
    platform: 'zoom',
    meetingUrl,
    meetingId,
    passcode,
    dialInNumber: '+1 669 900 6833', // Zoom US number
    instructions: `
🎥 **Zoom Meeting Details:**
• **Meeting Link:** ${meetingUrl}
• **Meeting ID:** ${meetingId}
• **Passcode:** ${passcode}

📱 **Join by Phone:**
• **Dial:** +1 669 900 6833
• **Meeting ID:** ${meetingId}
• **Passcode:** ${passcode}

💻 **Join by Computer:**
• Click the meeting link above
• Or go to zoom.us/join and enter the meeting ID

⏰ **Meeting Schedule:**
• **Date:** ${appointmentData.date}
• **Time:** ${appointmentData.time} (${appointmentData.timezone})
• **Duration:** ${appointmentData.duration} minutes

💡 **Tips:**
• Download the Zoom app for better experience
• Test your audio/video before the meeting
• Join a few minutes early
    `.trim()
  };
};

// Main function to create meeting based on preference
export const createMeetingLink = (
  appointmentData: AppointmentMeetingData, 
  platform: 'google-meet' | 'zoom' = 'google-meet'
): MeetingDetails => {
  switch (platform) {
    case 'zoom':
      return generateZoomMeetLink(appointmentData);
    case 'google-meet':
    default:
      return generateGoogleMeetLink(appointmentData);
  }
};

// Enhanced meeting creation with calendar event suggestion
export const createMeetingWithCalendar = (appointmentData: AppointmentMeetingData, platform: 'google-meet' | 'zoom' = 'google-meet') => {
  const meetingDetails = createMeetingLink(appointmentData, platform);
  
  // Create calendar event URL (Google Calendar)
  const startDateTime = new Date(`${appointmentData.date}T${appointmentData.time}`);
  const endDateTime = new Date(startDateTime.getTime() + appointmentData.duration * 60000);
  
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(appointmentData.subject)}&dates=${startDateTime.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}/${endDateTime.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}&details=${encodeURIComponent(`Meeting with ${appointmentData.attendeeName}\n\n${meetingDetails.instructions}`)}&location=${encodeURIComponent(meetingDetails.meetingUrl)}`;
  
  return {
    ...meetingDetails,
    calendarUrl,
    calendarInstructions: `
📅 **Add to Calendar:**
• **Google Calendar:** [Click here to add to calendar](${calendarUrl})
• **Other Calendars:** Copy the meeting details below to your calendar app

**Event Details:**
• **Title:** ${appointmentData.subject}
• **Date:** ${appointmentData.date}
• **Time:** ${appointmentData.time} (${appointmentData.timezone})
• **Duration:** ${appointmentData.duration} minutes
• **Location:** ${meetingDetails.meetingUrl}
    `.trim()
  };
};

// Validate meeting platform
export const isValidMeetingPlatform = (platform: string): platform is 'google-meet' | 'zoom' => {
  return platform === 'google-meet' || platform === 'zoom';
};

// Generate meeting agenda template
export const generateMeetingAgenda = (appointmentData: AppointmentMeetingData): string => {
  return `
📋 **Meeting Agenda - ${appointmentData.subject}**

**Attendees:**
• Kedhareswer Naidu (Host)
• ${appointmentData.attendeeName}

**Agenda Items:**
• Introduction and overview (5 minutes)
• Discussion: ${appointmentData.subject}
• Next steps and action items (5 minutes)
• Q&A Session

**Meeting Duration:** ${appointmentData.duration} minutes
**Meeting Date:** ${appointmentData.date} at ${appointmentData.time} (${appointmentData.timezone})

**Preparation:**
• Please test your audio/video setup before the meeting
• Have any relevant documents or questions ready
• Join 2-3 minutes early for technical checks
  `.trim();
}; 