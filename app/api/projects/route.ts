import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featuredParam = searchParams.get('featured')

    // Build query based on filter
    let projects
    if (featuredParam === 'true') {
      projects = await sql`SELECT * FROM projects WHERE featured = true ORDER BY id`
    } else {
      projects = await sql`SELECT * FROM projects ORDER BY id`
    }
    
    // Format the projects to match the expected structure
    const formattedProjects = projects.map((project: any) => {
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