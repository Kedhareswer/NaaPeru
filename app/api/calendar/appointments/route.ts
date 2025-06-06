import { NextResponse } from 'next/server';
import calendarService from '@/lib/calendar-service';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');
    const id = url.searchParams.get('id');
    
    if (id) {
      const appointment = calendarService.getAppointmentById(id);
      if (!appointment) {
        return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
      }
      return NextResponse.json({ appointment });
    } else if (date) {
      const appointments = calendarService.getAppointmentsForDate(date);
      return NextResponse.json({ appointments });
    } else {
      const appointments = calendarService.getAppointments();
      return NextResponse.json({ appointments });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, timeSlot, name, email, meetingType, topic } = body;
    
    // Validate required fields
    if (!date || !timeSlot || !name || !email || !meetingType || !topic) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    try {
      const newAppointment = calendarService.bookAppointment({
        date,
        timeSlot,
        name,
        email,
        meetingType,
        topic
      });
      
      return NextResponse.json({ appointment: newAppointment });
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 });
  }
}
