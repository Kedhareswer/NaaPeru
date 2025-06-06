import { NextRequest, NextResponse } from 'next/server';
import endorsementService from '@/lib/endorsement-service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    
    const skills = category 
      ? endorsementService.getSkillsByCategory(category)
      : endorsementService.getAllSkills();
      
    return NextResponse.json({ skills }, { status: 200 });
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}
