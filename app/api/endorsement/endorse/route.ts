import { NextRequest, NextResponse } from 'next/server';
import endorsementService from '@/lib/endorsement-service';

export const dynamic = 'force-dynamic'; // Ensure we get fresh data on every request

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { skillId, email } = body;
    
    if (!skillId || !email) {
      return NextResponse.json(
        { error: 'Skill ID and email are required' },
        { status: 400 }
      );
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Use await since the service method is now async
    const result = await endorsementService.endorseSkill(skillId, email);
    
    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(
        { error: result.message },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error endorsing skill:', error);
    return NextResponse.json(
      { error: 'Failed to endorse skill' },
      { status: 500 }
    );
  }
}
