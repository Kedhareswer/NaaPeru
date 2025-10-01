"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import type { Project } from "@/types/project"

interface ProjectsListProps {
  projects: Project[]
}

export function ProjectsList({ projects }: ProjectsListProps) {
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set())
  const [expandAll, setExpandAll] = useState(false)

  const toggleProject = (id: number) => {
    const newExpanded = new Set(expandedProjects)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedProjects(newExpanded)
  }

  const handleExpandAll = () => {
    if (expandAll) {
      setExpandedProjects(new Set())
    } else {
      setExpandedProjects(new Set(projects.map(p => p.id)))
    }
    setExpandAll(!expandAll)
  }

  // Sort projects by date descending
  const sortedProjects = [...projects].sort((a, b) => {
    const dateA = new Date(a.project_date || a.created_at || "").getTime()
    const dateB = new Date(b.project_date || b.created_at || "").getTime()
    return (isNaN(dateB) ? 0 : dateB) - (isNaN(dateA) ? 0 : dateA)
  })

  const getYear = (project: Project) => {
    const dateStr = project.project_date || project.created_at
    if (!dateStr) return ""
    const date = new Date(dateStr)
    return date.getFullYear().toString()
  }

  return (
    <section id="projects" className="w-full bg-white py-16 md:py-20 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-black">
            Projects;
          </h2>
          <button
            onClick={handleExpandAll}
            className="text-sm md:text-base text-zinc-600 hover:text-black transition-colors underline underline-offset-4"
          >
            {expandAll ? "Collapse All" : "Expand All"}
          </button>
        </div>

        {/* Projects List */}
        <div className="space-y-0">
          {sortedProjects.map((project, index) => {
            const isExpanded = expandedProjects.has(project.id)
            
            return (
              <div key={project.id} className="border-t border-dotted border-zinc-300">
                {/* Project Row */}
                <motion.div
                  className="py-4 md:py-5 cursor-pointer hover:bg-zinc-50 transition-colors"
                  onClick={() => toggleProject(project.id)}
                >
                  <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center">
                    {/* Project Name */}
                    <div className="col-span-12 sm:col-span-5 md:col-span-4 lg:col-span-4">
                      <h3 className="text-sm sm:text-base md:text-lg font-normal text-black break-words">
                        {project.title}
                      </h3>
                    </div>

                    {/* Category */}
                    <div className="col-span-8 sm:col-span-4 md:col-span-5 lg:col-span-5">
                      <p className="text-xs sm:text-sm md:text-base text-zinc-600">
                        {project.category || "Web Development"}
                      </p>
                    </div>

                    {/* Year */}
                    <div className="col-span-3 sm:col-span-2 md:col-span-2 lg:col-span-2 text-right">
                      <p className="text-xs sm:text-sm md:text-base text-black">
                        {getYear(project)}
                      </p>
                    </div>

                    {/* Expand Button */}
                    <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 flex justify-end">
                      <motion.button
                        className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-lg sm:text-xl text-black"
                        animate={{ rotate: isExpanded ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        +
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Expanded Content */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isExpanded ? "auto" : 0,
                    opacity: isExpanded ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pt-2 px-4 md:px-6 bg-zinc-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left Column - Details */}
                      <div className="space-y-4">
                        {/* Description */}
                        <div>
                          <h4 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider mb-2">
                            Overview
                          </h4>
                          <p className="text-sm text-zinc-700 leading-relaxed">
                            {project.description}
                          </p>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider mb-2">
                            Technologies
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, i) => (
                              <span
                                key={i}
                                className="text-xs px-2 py-1 bg-white border border-zinc-300 text-zinc-800 rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Links */}
                        <div className="flex gap-4 pt-2">
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-black hover:text-zinc-600 underline underline-offset-4 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              View Demo →
                            </a>
                          )}
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-zinc-600 hover:text-black underline underline-offset-4 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Source Code →
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Right Column - Image */}
                      <div>
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-48 md:h-64 object-cover rounded border border-zinc-300"
                          />
                        ) : (
                          <div className="w-full h-48 md:h-64 bg-zinc-200 rounded border border-zinc-300 flex items-center justify-center">
                            <span className="text-4xl font-bold text-zinc-400">
                              {project.title.split(' ').map(w => w[0]).join('').slice(0, 2)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>

        {/* Bottom border */}
        <div className="border-t border-dotted border-zinc-300 mt-0"></div>
      </div>
    </section>
  )
}
