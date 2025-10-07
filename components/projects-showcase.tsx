"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Project } from "@/types/project"

interface ProjectsShowcaseProps {
  projects: Project[]
}

export function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  const router = useRouter()
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [selectedFeatured, setSelectedFeatured] = useState<number>(0)

  // Get featured projects and other projects
  const featuredProjects = projects.filter(p => p.featured)
  const otherProjects = projects.filter(p => !p.featured)

  // Sort both arrays by date descending
  const sortByDate = (a: Project, b: Project) => {
    const dateA = new Date(a.project_date || a.created_at || "").getTime()
    const dateB = new Date(b.project_date || b.created_at || "").getTime()
    return (isNaN(dateB) ? 0 : dateB) - (isNaN(dateA) ? 0 : dateA)
  }

  const sortedFeatured = [...featuredProjects].sort(sortByDate)
  const sortedOthers = [...otherProjects].sort(sortByDate)

  // Current featured project to display
  const currentFeatured = sortedFeatured[selectedFeatured] || sortedFeatured[0]

  const getCategoryCode = (project: Project, index: number) => {
    // Generate category codes like SM001, SM002, etc.
    const prefix = project.category?.substring(0, 2).toUpperCase() || "SM"
    const code = String(index + 1).padStart(3, "0")
    return `${prefix}${code}`
  }

  return (
    <section id="projects" className="w-full min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] min-h-screen">
        {/* Featured Project - Left Side (70%) */}
        <div className="flex flex-col items-center justify-center px-8 md:px-16 lg:px-24 py-16 lg:py-24 border-r border-gray-200">
          <motion.div
            key={currentFeatured?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-[600px] flex flex-col items-center"
          >
            {/* Featured Image */}
            <div className="w-full aspect-[4/3] mb-8 relative overflow-hidden">
              {currentFeatured?.image ? (
                <motion.img
                  src={currentFeatured.image}
                  alt={currentFeatured.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-orange-400 via-orange-500 to-red-600 flex items-center justify-center">
                  <span className="text-white text-6xl font-black">
                    {currentFeatured?.title.split(" ").map(w => w[0]).join("").slice(0, 3).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* Featured Title */}
            <h2 className="text-2xl md:text-3xl font-black text-center text-black uppercase tracking-wider mb-2">
              {currentFeatured?.title}
            </h2>

            {/* Category Code */}
            <p className="text-sm text-gray-600 tracking-widest mb-8">
              ({getCategoryCode(currentFeatured, selectedFeatured)})
            </p>

            {/* Read More Button */}
            <button
              onClick={() => {
                if (currentFeatured?.id) {
                  router.push(`/project/${currentFeatured.id}`)
                }
              }}
              className="w-full max-w-[400px] py-3 px-8 border border-black text-black text-sm font-medium uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
            >
              READ MORE
            </button>

            {/* Featured Navigation Dots */}
            {sortedFeatured.length > 1 && (
              <div className="flex gap-3 mt-12">
                {sortedFeatured.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedFeatured(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === selectedFeatured
                        ? "bg-black w-8"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Other Projects Sidebar - Right Side (30%) */}
        <div className="bg-white border-l border-gray-200 lg:h-screen lg:sticky lg:top-0 overflow-y-auto">
          <div className="flex flex-col">
            {sortedOthers.map((project, index) => (
              <motion.div
                key={project.id}
                className="border-b border-gray-200 last:border-b-0"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {/* Project Card */}
                <div className="p-6">
                  {/* Project Image */}
                  <div className="w-full aspect-[4/3] mb-4 overflow-hidden bg-gray-100">
                    {project.image ? (
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        animate={{
                          scale: hoveredProject === project.id ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.4 }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <span className="text-gray-500 text-3xl font-black">
                          {project.title.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Project Title */}
                  <h3 className="text-base font-semibold text-black uppercase tracking-wide mb-1">
                    {project.title}
                  </h3>

                  {/* Category Code */}
                  <p className="text-xs text-gray-500 tracking-wider mb-4">
                    ({getCategoryCode(project, index + featuredProjects.length)})
                  </p>

                  {/* Read More Button */}
                  <button
                    onClick={() => {
                      if (project.id) {
                        router.push(`/project/${project.id}`)
                      }
                    }}
                    className="w-full py-2 px-4 border border-black text-black text-xs font-medium uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    READ MORE
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
