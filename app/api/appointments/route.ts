import { NextResponse } from 'next/server';
import { saveAppointment } from '@/utils/appointment';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, contact, subject, date, time } = body;

    // Validate required fields
    if (!name || !contact || !subject || !date || !time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save appointment and send notification
    const result = await saveAppointment({ name, contact, subject, date, time });

    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Appointment scheduled successfully' });
  } catch (error) {
    console.error('Error processing appointment:', error);
    return NextResponse.json(
      { error: 'Failed to process appointment' },
      { status: 500 }
    );
  }
}