import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const featured = request.nextUrl.searchParams.get('featured');
    const query = featured === 'true'
      ? sql`SELECT * FROM projects WHERE featured = true ORDER BY project_date DESC LIMIT 6`
      : sql`SELECT * FROM projects ORDER BY project_date DESC`;
    const projects = await query;
    const mapped = (projects as any).map((p: any) => {
      // Format project_date to MM/YY
      let formattedDate = p.project_date;
      try {
        const d = new Date(p.project_date);
        if (!isNaN(d.getTime())) {
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const year = d.getFullYear().toString().slice(-2);
          formattedDate = `${month}/${year}`;
        }
      } catch (_) {
        // keep original value if parsing fails
      }

      return {
        ...p,
        categories: p.category ? [p.category] : [],
        date: formattedDate,
        demoUrl: p.demo,
      };
    });
    return NextResponse.json({ projects: mapped });
  } catch (err) {
    console.error('Projects API Error', err);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
} 