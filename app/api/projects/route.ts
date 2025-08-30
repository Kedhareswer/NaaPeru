import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'
import { createSlug } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  
  // Handle single project request by slug
  if (slug) {
    try {
      const projects = await sql`
        SELECT * FROM projects 
        WHERE LOWER(REPLACE(title, ' ', '-')) = LOWER(${slug})
        LIMIT 1
      `
      
      if (!projects || projects.length === 0) {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 }
        )
      }
      
      const project = projects[0]
      const formattedProject = {
        id: project.id,
        slug: createSlug(project.title),
        title: project.title,
        description: project.description,
        longDescription: project.long_description || project.description,
        technologies: project.technologies || [],
        githubUrl: project.github,
        demoUrl: project.demo,
        image: project.image,
        featured: project.featured,
        features: project.features || [],
        objectives: project.objectives || [],
        outcomes: project.outcomes || [],
        category: project.category,
        date: project.project_date,
      }
      
      return NextResponse.json({ projects: [formattedProject] })
    } catch (error) {
      console.error('Error fetching project:', error)
      return NextResponse.json(
        { error: 'Failed to fetch project' },
        { status: 500 }
      )
    }
  }
  try {
    const { searchParams } = new URL(request.url)
    const featuredParam = searchParams.get('featured')
    const categoryParam = searchParams.get('category')
    const limitParam = searchParams.get('limit')

    // Sanitize inputs
    const featuredOnly = featuredParam === 'true'
    const category = categoryParam && categoryParam.toLowerCase() !== 'all'
      ? categoryParam
      : null
    let limit = Number.parseInt(limitParam || '0', 10)
    if (!Number.isFinite(limit) || limit <= 0) limit = 12
    if (limit > 12) limit = 12
    if (limit < 1) limit = 1

    // Build query variations to avoid raw SQL injection
    let projects
    if (featuredOnly && category) {
      projects = await sql`SELECT * FROM projects WHERE featured = true AND LOWER(category) = LOWER(${category}) ORDER BY project_date DESC NULLS LAST, id DESC LIMIT ${limit}`
    } else if (featuredOnly) {
      projects = await sql`SELECT * FROM projects WHERE featured = true ORDER BY project_date DESC NULLS LAST, id DESC LIMIT ${limit}`
    } else if (category) {
      projects = await sql`SELECT * FROM projects WHERE LOWER(category) = LOWER(${category}) ORDER BY project_date DESC NULLS LAST, id DESC LIMIT ${limit}`
    } else {
      projects = await sql`SELECT * FROM projects ORDER BY project_date DESC NULLS LAST, id DESC LIMIT ${limit}`
    }

    // Format the projects to match the expected structure
    const formattedProjects = projects.map((project: any) => {
      const categories = project.category ? [project.category] : []
      return {
        id: project.id,
        slug: createSlug(project.title),
        title: project.title,
        description: project.description,
        technologies: project.technologies || [],
        githubUrl: project.github,
        demoUrl: project.demo,
        categories,
        date: project.project_date,
        image: project.image,
        featured: project.featured,
        features: project.features || [],
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