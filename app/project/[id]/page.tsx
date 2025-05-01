'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter, useParams } from 'next/navigation'
import { caseStudies } from '@/components/case-studies'
import { GlossaryTooltip } from '@/components/ui/glossary-tooltip'
import Link from 'next/link'

export default function ProjectPage() {
  const router = useRouter()
  const params = useParams()
  const [project, setProject] = useState<typeof caseStudies[0] | null>(null)

  useEffect(() => {
    if (params?.id) {
      const projectId = parseInt(params.id as string)
      setProject(caseStudies[projectId] || null)
    }
  }, [params?.id])

  if (!project) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/#case-studies">
          <Button
            variant="ghost"
            className="mb-6 hover:bg-gray-100 text-sm font-light"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </Link>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">{project.title}</h1>
            
            <div className="mb-10">
              <div className="mb-8">
                <h2 className="text-xl font-medium mb-3">Overview</h2>
                <p className="text-gray-700 leading-relaxed max-w-3xl">
                  {project.description} {project.problemStatement}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-base font-medium mb-2">Year</h3>
                  <p className="text-gray-700">{new Date(project.startDate).getFullYear()}</p>
                </div>
                
                <div>
                  <h3 className="text-base font-medium mb-2">Role</h3>
                  <p className="text-gray-700">{project.role || 'Lead Data Scientist'}</p>
                </div>
                
                <div>
                  <h3 className="text-base font-medium mb-2">Client</h3>
                  <p className="text-gray-700">Research Project</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-base font-medium mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags && project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main featured image */}
          <div className="aspect-[16/9] relative overflow-hidden rounded-lg mb-16 bg-gray-100">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Project details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative mb-16">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-medium mb-5">Approach</h2>
                <ul className="list-disc list-outside ml-5 space-y-3 text-gray-700">
                  {project.approach.map((item, i) => (
                    <li key={i} className="leading-relaxed">
                      <GlossaryTooltip term="Methodology" definition="The systematic approach and techniques used to address the project's challenges.">
                        {item}
                      </GlossaryTooltip>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-medium mb-5">Outcomes & Impact</h2>
                <ul className="list-disc list-outside ml-5 space-y-3 text-gray-700 mb-5">
                  {project.outcomes.map((outcome, i) => (
                    <li key={i}>{outcome}</li>
                  ))}
                </ul>
                <p className="text-gray-700">{project.impact}</p>
              </div>
            </div>

            <div className="space-y-12 lg:sticky lg:top-24 lg:self-start">
              <div>
                <h2 className="text-2xl font-medium mb-5">Technologies</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-medium mb-5">Challenges & Solutions</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Challenges</h3>
                    <ul className="list-disc list-outside ml-5 space-y-3 text-gray-700">
                      {project.challenges.map((challenge, i) => (
                        <li key={i}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Solutions</h3>
                    <ul className="list-disc list-outside ml-5 space-y-3 text-gray-700">
                      {project.solutions.map((solution, i) => (
                        <li key={i}>{solution}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {(project.githubUrl || project.link) && (
                <div>
                  <h2 className="text-2xl font-medium mb-5">Links</h2>
                  <div className="flex flex-col gap-3">
                    {project.githubUrl && (
                      <Button
                        variant="outline"
                        className="w-full justify-start hover:bg-gray-100 transition-colors"
                        onClick={() => window.open(project.githubUrl, '_blank')}
                      >
                        View on GitHub
                      </Button>
                    )}
                    {project.link && project.link !== '#' && (
                      <Button
                        className="w-full justify-start bg-black hover:bg-gray-800 text-white transition-colors"
                        onClick={() => window.open(project.link, '_blank')}
                      >
                        Visit Project
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Gallery section */}
          <h2 className="text-2xl font-medium mb-5">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img 
                src={project.hoverImage || project.image} 
                alt="Project gallery 1" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img 
                src={project.image} 
                alt="Project gallery 2" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img 
                src={project.hoverImage || project.image} 
                alt="Project gallery 3" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}