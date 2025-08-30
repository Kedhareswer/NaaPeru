import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { IPhoneMockup } from '@/components/ui/iphone-mockup'

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  demoUrl?: string
  githubUrl?: string
  technologies: string[]
  features: string[]
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const project = await getProject(params.slug)
  if (!project) return {}
  
  return {
    title: `${project.title} | Project`,
    description: project.description,
    openGraph: {
      images: [project.image],
    },
  }
}

async function getProject(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/projects?slug=${slug}`, {
      next: { revalidate: 60 * 60 } // 1 hour
    })
    
    if (!res.ok) return null
    const data = await res.json()
    return data.projects[0] || null
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string }
}) {
  const project = await getProject(params.slug)
  
  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                {project.title}
              </h1>
              <p className="text-lg text-gray-600">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {project.technologies?.map((tech, i) => (
                  <span 
                    key={i}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                {project.demoUrl && (
                  <Button asChild className="px-6 py-3">
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      Live Demo
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button variant="outline" asChild className="px-6 py-3">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      View Code
                    </a>
                  </Button>
                )}
              </div>
            </div>
            
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              {project.demoUrl ? (
                <iframe
                  src={project.demoUrl}
                  className="w-full h-full"
                  style={{ border: 'none' }}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full relative">
                  <Image
                    src={project.image || '/placeholder-project.jpg'}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">About This Project</h2>
            
            <div className="space-y-6 text-gray-600">
              <p>{project.longDescription || project.description}</p>
              
              {project.features && project.features.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-4">
                {project.demoUrl && (
                  <Button asChild size="lg" className="px-8">
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      View Live Project
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button variant="outline" size="lg" className="px-8">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      View on GitHub
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
