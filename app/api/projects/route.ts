import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const featured = request.nextUrl.searchParams.get('featured');
    const query = featured === 'true'
      ? sql`SELECT * FROM projects WHERE featured = true ORDER BY id LIMIT 6`
      : sql`SELECT * FROM projects ORDER BY id`;
    const projects = await query;
    const mapped = (projects as any).map((p: any) => ({
      ...p,
      categories: p.category ? [p.category] : [],
      date: p.project_date,
      demoUrl: p.demo,
    }));
    return NextResponse.json({ projects: mapped });
  } catch (err) {
    console.error('Projects API Error', err);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
} 