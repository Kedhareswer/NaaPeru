import { NextResponse } from 'next/server';
import calendarService from '@/lib/calendar-service';

export async function GET() {
  try {
    const meetingTypes = calendarService.getMeetingTypes();
    return NextResponse.json({ meetingTypes });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch meeting types' }, { status: 500 });
  }
}
