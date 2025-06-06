import { NextResponse } from 'next/server';
import calendarService from '@/lib/calendar-service';

export async function GET() {
  try {
    const status = calendarService.getStatus();
    return NextResponse.json({ status });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch status' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { status } = body;
    
    if (!status || !['available', 'busy', 'away'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }
    
    calendarService.updateStatus(status);
    return NextResponse.json({ status });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}
