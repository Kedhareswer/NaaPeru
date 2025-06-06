const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const { v4: uuidv4 } = require('uuid');

dayjs.extend(utc);
dayjs.extend(timezone);

const app = express();
const PORT = process.env.PORT || 3001;

// In-memory storage
const appointments = [];
const availabilitySchedule = {
  Monday: [
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: true },
    { time: '01:00 PM', available: true },
    { time: '02:00 PM', available: true },
    { time: '03:00 PM', available: true },
    { time: '04:00 PM', available: true },
  ],
  Tuesday: [
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: true },
    { time: '01:00 PM', available: true },
    { time: '02:00 PM', available: true },
    { time: '03:00 PM', available: true },
    { time: '04:00 PM', available: true },
  ],
  Wednesday: [
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: true },
    { time: '01:00 PM', available: true },
    { time: '02:00 PM', available: true },
    { time: '03:00 PM', available: true },
    { time: '04:00 PM', available: true },
  ],
  Thursday: [
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: true },
    { time: '01:00 PM', available: true },
    { time: '02:00 PM', available: true },
    { time: '03:00 PM', available: true },
    { time: '04:00 PM', available: true },
  ],
  Friday: [
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: true },
    { time: '01:00 PM', available: true },
    { time: '02:00 PM', available: true },
    { time: '03:00 PM', available: true },
    { time: '04:00 PM', available: true },
  ],
};

// Current status (available, busy, away)
let currentStatus = 'available';

// Middleware
app.use(cors());
app.use(express.json());

// Google Calendar setup
let oAuth2Client = null;
let calendarInitialized = false;

/**
 * Initialize the Google Calendar API
 */
function initializeGoogleCalendar(credentials) {
  try {
    const { client_id, client_secret, redirect_uris } = credentials.web || credentials.installed;
    oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    return true;
  } catch (error) {
    console.error('Error initializing Google Calendar:', error);
    return false;
  }
}

/**
 * Generate authorization URL
 */
app.get('/api/google/auth-url', (req, res) => {
  if (!oAuth2Client) {
    return res.status(400).json({ error: 'Google Calendar not initialized' });
  }

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar'],
  });

  res.json({ url: authUrl });
});

/**
 * Handle OAuth callback
 */
app.post('/api/google/auth-callback', async (req, res) => {
  const { code } = req.body;
  
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    calendarInitialized = true;
    
    // Now sync with Google Calendar
    await syncWithGoogleCalendar();
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error with auth callback:', error);
    res.status(500).json({ error: 'Failed to authenticate with Google' });
  }
});

/**
 * Initialize Google Calendar with credentials
 */
app.post('/api/google/initialize', (req, res) => {
  const { credentials } = req.body;
  
  if (!credentials) {
    return res.status(400).json({ error: 'No credentials provided' });
  }
  
  const success = initializeGoogleCalendar(credentials);
  
  if (success) {
    res.json({ success: true });
  } else {
    res.status(500).json({ error: 'Failed to initialize Google Calendar' });
  }
});

/**
 * Sync with Google Calendar to update availability
 */
async function syncWithGoogleCalendar() {
  if (!calendarInitialized) return false;
  
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
  const now = new Date();
  const oneWeekFromNow = new Date();
  oneWeekFromNow.setDate(now.getDate() + 7);
  
  try {
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: now.toISOString(),
      timeMax: oneWeekFromNow.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });
    
    const events = response.data.items;
    
    // Reset availability
    Object.keys(availabilitySchedule).forEach(day => {
      availabilitySchedule[day].forEach(slot => {
        slot.available = true;
      });
    });
    
    // Mark slots as unavailable based on Google Calendar events
    events.forEach(event => {
      const start = new Date(event.start.dateTime || event.start.date);
      const day = dayjs(start).format('dddd');
      const time = dayjs(start).format('hh:mm A');
      
      if (availabilitySchedule[day]) {
        const slot = availabilitySchedule[day].find(s => s.time === time);
        if (slot) {
          slot.available = false;
        }
      }
    });
    
    return true;
  } catch (error) {
    console.error('Error syncing with Google Calendar:', error);
    return false;
  }
}

// API Routes

/**
 * Get current availability status
 */
app.get('/api/availability/status', (req, res) => {
  res.json({ status: currentStatus });
});

/**
 * Update current availability status
 */
app.post('/api/availability/status', (req, res) => {
  const { status } = req.body;
  
  if (!status || !['available', 'busy', 'away'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  
  currentStatus = status;
  res.json({ status: currentStatus });
});

/**
 * Get availability schedule
 */
app.get('/api/availability/schedule', async (req, res) => {
  // Try to sync with Google Calendar first
  if (calendarInitialized) {
    await syncWithGoogleCalendar();
  }
  
  // Format the data for the frontend
  const formattedSchedule = Object.keys(availabilitySchedule).map(day => {
    // Get the date for the next occurrence of this day
    const today = dayjs();
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(day);
    const diff = (dayOfWeek + 7 - today.day()) % 7;
    const nextDate = today.add(diff, 'day').format('YYYY-MM-DD');
    
    return {
      day,
      date: nextDate,
      slots: availabilitySchedule[day]
    };
  });
  
  res.json(formattedSchedule);
});

/**
 * Book an appointment
 */
app.post('/api/appointments', async (req, res) => {
  const { date, time, name, email, meetingType, topic } = req.body;
  
  if (!date || !time || !name || !email || !meetingType || !topic) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Check if the slot is available
  const dayName = dayjs(date).format('dddd');
  if (!availabilitySchedule[dayName]) {
    return res.status(400).json({ error: 'Invalid day' });
  }
  
  const slot = availabilitySchedule[dayName].find(s => s.time === time);
  if (!slot || !slot.available) {
    return res.status(400).json({ error: 'Time slot is not available' });
  }
  
  // Create appointment
  const appointment = {
    id: uuidv4(),
    date,
    time,
    name,
    email,
    meetingType,
    topic,
    createdAt: new Date().toISOString()
  };
  
  // Add to in-memory storage
  appointments.push(appointment);
  
  // Mark the slot as unavailable
  slot.available = false;
  
  // If Google Calendar is initialized, create the event there too
  if (calendarInitialized) {
    try {
      const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
      
      // Convert date and time to ISO format
      const startDateTime = dayjs(`${date} ${time}`, 'YYYY-MM-DD hh:mm A');
      
      // Determine end time based on meeting type
      let endDateTime;
      if (meetingType === 'Quick Chat') {
        endDateTime = startDateTime.add(15, 'minute');
      } else if (meetingType === 'Project Consultation') {
        endDateTime = startDateTime.add(30, 'minute');
      } else {
        endDateTime = startDateTime.add(45, 'minute');
      }
      
      await calendar.events.insert({
        calendarId: 'primary',
        requestBody: {
          summary: `Meeting with ${name}: ${topic}`,
          description: `Meeting type: ${meetingType}\nEmail: ${email}\nTopic: ${topic}`,
          start: {
            dateTime: startDateTime.toISOString(),
            timeZone: 'Asia/Kolkata',
          },
          end: {
            dateTime: endDateTime.toISOString(),
            timeZone: 'Asia/Kolkata',
          },
          attendees: [{ email }],
          reminders: {
            useDefault: false,
            overrides: [
              { method: 'email', minutes: 24 * 60 },
              { method: 'popup', minutes: 10 },
            ],
          },
        },
      });
    } catch (error) {
      console.error('Error creating Google Calendar event:', error);
      // We'll still return success since the appointment is in our system
    }
  }
  
  res.status(201).json(appointment);
});

/**
 * Get all appointments
 */
app.get('/api/appointments', (req, res) => {
  res.json(appointments);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
