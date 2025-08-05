import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Fetch all projects from the Neon database
    const projects = await sql`SELECT * FROM projects ORDER BY id`
    
    // Format the projects to match the expected structure
    const formattedProjects = projects.map((project: any) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      technologies: project.technologies || [],
      github_url: project.github,
      demo_url: project.demo,
      category: project.category,
      date: project.project_date,
      image_url: project.image,
      featured: project.featured,
      objectives: project.objectives || [],
      outcomes: project.outcomes || []
    }))

    return NextResponse.json({ projects: formattedProjects })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
} 