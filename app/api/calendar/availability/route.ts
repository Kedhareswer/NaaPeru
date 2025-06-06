import { NextResponse } from 'next/server';
import calendarService from '@/lib/calendar-service';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const date = url.searchParams.get('date');
  
  try {
    if (date) {
      const timeSlots = calendarService.getTimeSlotsForDate(date);
      return NextResponse.json({ timeSlots });
    } else {
      const availableDays = calendarService.getAvailableDays();
      return NextResponse.json({ availableDays });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 });
  }
}
