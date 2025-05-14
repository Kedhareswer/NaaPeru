"use client"

import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"

interface Project {
  id: number
  title: string
  description: string
  category: string
  date: string
  image: string
  technologies: string[]
  objectives: string[]
  outcomes: string[]
  githubUrl?: string
}

const allProjects: Project[] = [
  {
    id: 1,
    title: "Predictive Machine Learning",
    description: "Advanced predictive analytics system using machine learning algorithms for accurate forecasting and decision support.",
    category: "Machine Learning",
    date: "January 2025",
    image: "/projects/neural-network.svg",
    technologies: ["Python", "TensorFlow", "scikit-learn", "FastAPI"],
    objectives: [
      "Develop accurate forecasting models",
      "Implement decision support algorithms",
      "Create real-time prediction system"
    ],
    outcomes: [
      "85% prediction accuracy",
      "Reduced decision-making time by 40%",
      "Successfully deployed in production"
    ],
    githubUrl: "https://github.com/yourusername/predictive-ml"
  },
  // Additional projects can be added here
]

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = allProjects.find(
    (p) => p.title.toLowerCase().replace(/\s+/g, "-") === params.slug
  )

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-6 py-20">
        <div className="flex items-center mb-12">
          <Button variant="ghost" className="mr-4" asChild>
            <a href="/projects">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </a>
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden mb-8">
            <img
              src={project.image}
              alt={project.title}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="space-y-8">
            <div className="flex justify-between items-start">
              <h1 className="text-4xl font-bold">{project.title}</h1>
              <span className="text-gray-500">{project.date}</span>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {project.description}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Key Objectives</h2>
                <ul className="space-y-3">
                  {project.objectives.map((objective, index) => (
                    <li
                      key={index}
                      className="flex items-start"
                    >
                      <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3" />
                      <span className="text-gray-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Outcomes</h2>
                <ul className="space-y-3">
                  {project.outcomes.map((outcome, index) => (
                    <li
                      key={index}
                      className="flex items-start"
                    >
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3" />
                      <span className="text-gray-700">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {project.githubUrl && (
              <div className="pt-4">
                <Button asChild>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                  >
                    View on GitHub
                  </a>
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  )
}