"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { EnhancedProjectCard } from "./enhanced-project-card"
import { ProjectDetailModal } from "./project-detail-modal"

interface Project {
  id: number
  title: string
  description: string
  categories: string[]
  date: string
  image: string
  demoUrl?: string
  githubUrl?: string
  technologies: string[]
  objectives: string[]
  outcomes: string[]
  gallery?: string[]
}

const staticProjects: Project[] = []

export default function CaseStudies() {
  const [projects, setProjects] = useState<Project[]>(staticProjects)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const categories = [
    'All',
    ...Array.from(new Set(projects.flatMap(p => p.categories || [])))
  ]

  useEffect(() => {
    fetch('/api/projects?featured=true', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => setProjects(data.projects || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((project) => project.categories.includes(selectedCategory))

  const handleViewDetails = (project: any) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  if (loading) return null

  return (
    <section id="case-studies" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-gray-900">Featured Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore my portfolio of data science and AI projects, showcasing innovative solutions across various domains
            and technologies.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Button
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`text-sm min-h-[44px] min-w-[44px] px-4 py-2 transition-all duration-200 font-medium ${
                  selectedCategory === category
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                }`}
              >
                {category}
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project, index) => (
            <EnhancedProjectCard
              key={project.id}
              project={{
                ...project,
                featured: index < 2, // Mark first 2 as featured
              }}
              index={index}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            asChild
            className="bg-black text-white hover:bg-gray-800 min-h-[44px] px-6 py-3 text-base font-medium transition-all duration-200 hover:shadow-lg"
          >
            <a href="/projects">
              View All Projects
              <ChevronRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </motion.div>
      </div>

      <ProjectDetailModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  )
}
