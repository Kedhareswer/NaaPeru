import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'
type ProjectRow = {
  id: number
  title: string
  description: string | null
  technologies: string[] | null
  github: string | null
  demo: string | null
  category: string | null
  project_date: string | null
  image: string | null
  featured: boolean
  objectives: string[] | null
  outcomes: string[] | null
}

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featuredParam = searchParams.get('featured')
    const categoryParam = searchParams.get('category')
    const limitParam = searchParams.get('limit')

    // Sanitize inputs
    const featuredOnly = featuredParam === 'true'
    const rawCategory = categoryParam?.trim()
    const category = rawCategory && rawCategory.toLowerCase() !== 'all' ? rawCategory : null
    // Determine result limit (1‒12). Default to 12 when parameter absent or empty.
    let limit = 12
    if (limitParam !== null && limitParam.trim() !== '') {
      const parsed = Number(limitParam)
      if (Number.isFinite(parsed)) {
        limit = Math.min(12, Math.max(1, Math.trunc(parsed)))
      }
    }

    // Build WHERE clauses dynamically to avoid duplication & keep parameterization
    const whereClauses = [
      featuredOnly ? sql`featured = true` : null,
      category ? sql`LOWER(category) = LOWER(${category})` : null,
    ].filter(Boolean)

        // Use sql.join via `any` cast to avoid type mismatch in Neon typings
    const whereSql = whereClauses.length ? (sql as any).join(whereClauses, sql` AND `) : sql``;

    const projects = await sql`
      SELECT id, title, description, technologies, github, demo, category, project_date, image, featured, objectives, outcomes
      FROM projects
      ${whereClauses.length ? sql`WHERE ${whereSql}` : sql``}
      ORDER BY project_date DESC NULLS LAST, id DESC
      LIMIT ${limit}
    `

    // Format the projects to match the expected structure
    const rows = projects as unknown as ProjectRow[]
    const formattedProjects = rows.map((project) => {
      const categories = project.category ? [project.category] : []
      return {
        id: project.id,
        title: project.title,
        description: project.description,
        technologies: project.technologies || [],
        githubUrl: project.github,
        demoUrl: project.demo,
        categories,
        date: project.project_date,
        image: project.image,
        featured: project.featured,
        objectives: project.objectives || [],
        outcomes: project.outcomes || []
      }
    })

    return NextResponse.json({ projects: formattedProjects })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}