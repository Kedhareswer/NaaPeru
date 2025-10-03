"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import type { Project } from "@/types/project"

interface ProjectsListProps {
  projects: Project[]
}

export function ProjectsList({ projects }: ProjectsListProps) {
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set())
  const [clickedProjects, setClickedProjects] = useState<Set<number>>(new Set())
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [expandAll, setExpandAll] = useState(false)

  const toggleProject = (id: number) => {
    const newClicked = new Set(clickedProjects)
    const newExpanded = new Set(expandedProjects)
    
    if (clickedProjects.has(id)) {
      // If already clicked, remove from both clicked and expanded
      newClicked.delete(id)
      newExpanded.delete(id)
    } else {
      // If not clicked, add to both clicked and expanded
      newClicked.add(id)
      newExpanded.add(id)
    }
    
    setClickedProjects(newClicked)
    setExpandedProjects(newExpanded)
  }

  const handleMouseEnter = (id: number) => {
    setHoveredProject(id)
    if (!clickedProjects.has(id)) {
      const newExpanded = new Set(expandedProjects)
      newExpanded.add(id)
      setExpandedProjects(newExpanded)
    }
  }

  const handleMouseLeave = (id: number) => {
    setHoveredProject(null)
    if (!clickedProjects.has(id)) {
      const newExpanded = new Set(expandedProjects)
      newExpanded.delete(id)
      setExpandedProjects(newExpanded)
    }
  }

  const handleExpandAll = () => {
    if (expandAll) {
      setExpandedProjects(new Set())
    } else {
      setExpandedProjects(new Set(projects.map(p => p.id)))
    }
    setExpandAll(!expandAll)
  }

  // Sort projects: featured first, then by date descending
  const sortedProjects = [...projects].sort((a, b) => {
    // Prioritize featured projects
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    
    // If both featured or both not featured, sort by date
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
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-none tracking-tight">
            Projects
            <motion.span
              className="w-2 h-2 md:w-3 md:h-3 bg-blue-500 rounded-full ml-1 inline-block"
              animate={{ 
                scale: [1, 1.2, 1],
                transition: { 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 4
                }
              }}
            />
          </h2>
          <button
            onClick={handleExpandAll}
            className="text-sm md:text-base font-medium text-gray-600 hover:text-slate-900 transition-colors duration-200"
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
                  className="py-4 md:py-5 cursor-pointer transition-all duration-300 ease-out"
                  onClick={() => toggleProject(project.id)}
                  onMouseEnter={() => handleMouseEnter(project.id)}
                  onMouseLeave={() => handleMouseLeave(project.id)}
                >
                  <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center">
                    {/* Project Name */}
                    <div className="col-span-12 sm:col-span-5 md:col-span-4 lg:col-span-4">
                      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-slate-900 break-words">
                        {project.title}
                      </h3>
                    </div>

                    {/* Category */}
                    <div className="col-span-8 sm:col-span-4 md:col-span-5 lg:col-span-5">
                      <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">
                        {project.category || "Web Development"}
                      </p>
                    </div>

                    {/* Year */}
                    <div className="col-span-3 sm:col-span-2 md:col-span-2 lg:col-span-2 text-right">
                      <p className="text-xs sm:text-sm md:text-base text-slate-900 font-medium">
                        {getYear(project)}
                      </p>
                    </div>

                    {/* Expand Button */}
                    <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 flex justify-end">
                      <motion.button
                        className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-lg sm:text-xl text-slate-900 font-light"
                        animate={{ rotate: isExpanded ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
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
                  transition={{ 
                    duration: 0.4, 
                    ease: "easeOut",
                    opacity: { duration: isExpanded ? 0.3 : 0.2, delay: isExpanded ? 0.1 : 0 }
                  }}
                  className="overflow-hidden"
                >
                  <motion.div 
                    className="pb-6 pt-2 px-4 md:px-6 bg-gray-50"
                    initial={false}
                    animate={{
                      y: isExpanded ? 0 : -10,
                    }}
                    transition={{ duration: 0.3, delay: isExpanded ? 0.1 : 0 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left Column - Details */}
                      <div className="space-y-4">
                        {/* Description */}
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                            Overview
                          </h4>
                          <p className="text-sm text-gray-700 leading-relaxed font-medium">
                            {project.description}
                          </p>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                            Technologies
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, i) => (
                              <span
                                key={i}
                                className="text-xs px-3 py-1.5 bg-white border border-gray-300 text-slate-900 rounded-md font-medium shadow-sm"
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
                              className="text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors duration-200"
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
                              className="text-sm font-medium text-gray-600 hover:text-slate-900 transition-colors duration-200"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Source Code →
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Right Column - Image */}
                      <motion.div
                        initial={false}
                        animate={{
                          scale: isExpanded ? 1 : 0.95,
                          opacity: isExpanded ? 1 : 0.8,
                        }}
                        transition={{ duration: 0.3, delay: isExpanded ? 0.2 : 0 }}
                      >
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-48 md:h-64 object-cover rounded-lg border border-gray-300 shadow-sm"
                          />
                        ) : (
                          <div className="w-full h-48 md:h-64 bg-gray-200 rounded-lg border border-gray-300 flex items-center justify-center shadow-sm">
                            <span className="text-4xl font-black text-gray-400">
                              {project.title.split(' ').map(w => w[0]).join('').slice(0, 2)}
                            </span>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
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
