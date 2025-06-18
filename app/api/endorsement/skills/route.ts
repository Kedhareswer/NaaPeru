import { NextRequest, NextResponse } from 'next/server';
import endorsementService from '@/lib/endorsement-service';

export const dynamic = 'force-dynamic'; // Ensure we get fresh data on every request

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    
    // Use await since the service methods are now async
    const skills = category 
      ? await endorsementService.getSkillsByCategory(category)
      : await endorsementService.getAllSkills();
      
    return NextResponse.json({ skills }, { status: 200 });
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}
