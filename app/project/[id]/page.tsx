'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter, useParams } from 'next/navigation'
import { caseStudies } from '@/components/case-studies'

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
    router.push('/#case-studies')
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Button
          variant="ghost"
          className="mb-8 hover:bg-gray-100"
          onClick={() => router.push('/#case-studies')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Button>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="aspect-video relative overflow-hidden rounded-xl mb-12">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
                <p className="text-gray-600 text-lg">{project.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Problem Statement</h2>
                <p className="text-gray-600">{project.problemStatement}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Approach</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {project.approach.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Outcomes & Impact</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                  {project.outcomes.map((outcome, i) => (
                    <li key={i}>{outcome}</li>
                  ))}
                </ul>
                <p className="text-gray-600">{project.impact}</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Project Details</h2>
                <div className="space-y-4">
                  {project.role && (
                    <div>
                      <h3 className="font-medium text-gray-900">Role</h3>
                      <p className="text-gray-600">{project.role}</p>
                    </div>
                  )}
                  {project.duration && (
                    <div>
                      <h3 className="font-medium text-gray-900">Duration</h3>
                      <p className="text-gray-600">{project.duration}</p>
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900">Technologies</h3>
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
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Challenges & Solutions</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Challenges</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {project.challenges.map((challenge, i) => (
                        <li key={i}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Solutions</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {project.solutions.map((solution, i) => (
                        <li key={i}>{solution}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {(project.githubUrl || project.liveDemo) && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Links</h2>
                  <div className="space-y-3">
                    {project.githubUrl && (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => window.open(project.githubUrl, '_blank')}
                      >
                        View on GitHub
                      </Button>
                    )}
                    {project.liveDemo && (
                      <Button
                        className="w-full"
                        onClick={() => window.open(project.liveDemo, '_blank')}
                      >
                        View Live Demo
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}