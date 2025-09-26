import sql from '@/lib/db'
import ProjectsGrid, { ProjectForCard } from '@/components/projects-grid'
import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AllProjectsPage() {
  const rows = await sql`
    SELECT id, title, description, technologies, github, demo, category, project_date, image, featured
    FROM projects
    ORDER BY project_date DESC NULLS LAST, id DESC
  `

  const projects: ProjectForCard[] = (rows as any[]).map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description ?? '',
    categories: p.category ? [p.category] : [],
    date: p.project_date,
    image: p.image ?? '/projects/digit-2.png',
    demoUrl: p.demo ?? null,
    featured: Boolean(p.featured),
    technologies: Array.isArray(p.technologies) ? p.technologies : [],
  }))

  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-16">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link 
            href="/" 
            className="flex items-center hover:text-gray-700 transition-colors"
          >
            <Home className="w-4 h-4 mr-1" />
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Projects</span>
        </nav>

        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">All Projects</h1>
          <span className="text-sm text-gray-500">{projects.length} projects</span>
        </div>
        <div className="mt-8">
          <ProjectsGrid projects={projects} />
        </div>
      </section>
    </main>
  )
}
