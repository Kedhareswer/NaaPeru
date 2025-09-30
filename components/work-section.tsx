"use client"

import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import type { Project } from "@/types/project"

interface WorkSectionProps {
  projects: Project[]
  name?: string
}

export function WorkSection({ projects, name = "Your Name" }: WorkSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  
  const firstName = name.split(" ")[0] || "Your"

  // Only featured projects, sorted by project_date (fallback created_at)
  const sortedProjects = [...projects]
    .filter(p => !!p.featured)
    .sort((a, b) => {
      const dateA = new Date(a.project_date || a.created_at || "").getTime()
      const dateB = new Date(b.project_date || b.created_at || "").getTime()
      return (isNaN(dateB) ? 0 : dateB) - (isNaN(dateA) ? 0 : dateA)
    })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let scrollTimeout: NodeJS.Timeout
    
    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      
      scrollTimeout = setTimeout(() => {
        const scrollTop = container.scrollTop
        const containerHeight = container.clientHeight
        
        // Calculate which project should be active based on scroll position
        const projectIndex = Math.round(scrollTop / containerHeight)
        const clampedIndex = Math.max(0, Math.min(projectIndex, sortedProjects.length - 1))
        
        if (clampedIndex !== activeProjectIndex) {
          setActiveProjectIndex(clampedIndex)
        }
      }, 50)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      container.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [activeProjectIndex, sortedProjects.length])

  // Forward wheel events from the whole section and middle column to the right scroll container
  useEffect(() => {
    const host = sectionRef.current
    const scroller = containerRef.current
    if (!host || !scroller) return

    const onWheel = (e: WheelEvent) => {
      // Avoid native body scroll; smoothly scroll our container instead
      e.preventDefault()
      scroller.scrollBy({ top: e.deltaY, behavior: 'smooth' })
    }

    host.addEventListener('wheel', onWheel, { passive: false })
    return () => host.removeEventListener('wheel', onWheel as EventListener)
  }, [])

  const activeProject = sortedProjects[activeProjectIndex]

  return (
    <section ref={sectionRef} className="w-full h-screen flex overflow-hidden bg-white">
      {/* Left Column - 10% - Fixed Navigation */}
      <div className="w-[10%] bg-gray-50 flex flex-col items-center justify-start pt-8 px-2 h-screen border-r border-gray-200">
        <Link href="/" className="mb-8">
          <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
            <span className="text-white font-bold text-sm md:text-base lg:text-lg">
              {firstName.substring(0, 2).toUpperCase()}
            </span>
          </div>
        </Link>
        
        <div className="flex flex-col space-y-3 text-[10px] md:text-xs text-center">
          <motion.a
            href="#work"
            className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            whileHover={{ scale: 1.05 }}
          >
            Full case studies
          </motion.a>
          <motion.a
            href="#cv"
            className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            whileHover={{ scale: 1.05 }}
          >
            Get CV
          </motion.a>
        </div>

        <div className="mt-auto mb-8 space-y-3 text-[10px] text-center">
          <div className="font-semibold text-gray-800">Work snippets</div>
          <Link 
            href="/projects"
            className="text-gray-600 hover:text-blue-600 transition-colors block"
          >
            More Projects
          </Link>
        </div>
      </div>

      {/* Middle Column - 20% - Project Info (Sticky) */}
      <div className="w-[20%] bg-white border-r border-gray-200 relative overflow-hidden">
        <div className="sticky top-0 h-screen flex flex-col p-4 lg:p-6">
          <motion.div
            key={activeProjectIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 lg:space-y-6"
          >
            {/* Project Title */}
            <div>
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900 mb-2 leading-tight">
                {activeProject?.title || "Work"}
              </h2>
              <p className="text-[10px] lg:text-xs text-gray-500">
                {activeProject?.project_date || activeProject?.created_at}
              </p>
            </div>

            {/* Key Information */}
            <div className="space-y-3 lg:space-y-4">
              <h3 className="text-xs lg:text-sm font-bold text-gray-900 uppercase tracking-wide">
                Key Information
              </h3>
              
              <div className="space-y-2 lg:space-y-3 text-sm">
                <div>
                  <div className="text-[10px] lg:text-xs text-gray-500 mb-1">Category</div>
                  <div className="text-xs lg:text-sm text-gray-900 font-medium">
                    {activeProject?.category || "Web Development"}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] lg:text-xs text-gray-500 mb-1">Technologies</div>
                  <div className="flex flex-wrap gap-1 lg:gap-1.5">
                    {activeProject?.technologies.slice(0, 4).map((tech, i) => (
                      <span 
                        key={i}
                        className="text-[9px] lg:text-[10px] px-1.5 lg:px-2 py-0.5 lg:py-1 bg-blue-50 text-blue-700 rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {activeProject?.description && (
                  <div>
                    <div className="text-[10px] lg:text-xs text-gray-500 mb-1">Overview</div>
                    <p className="text-[10px] lg:text-xs text-gray-700 leading-relaxed line-clamp-4">
                      {activeProject.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Links */}
              <div className="space-y-1.5 lg:space-y-2 pt-2 lg:pt-4">
                {activeProject?.demo && (
                  <a
                    href={activeProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[10px] lg:text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                  >
                    View Live Demo →
                  </a>
                )}
                {activeProject?.github && (
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[10px] lg:text-xs text-gray-600 hover:text-gray-800 font-medium hover:underline transition-colors"
                  >
                    View Source Code →
                  </a>
                )}
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="pt-4 lg:pt-6">
              <div className="flex items-center gap-1.5 lg:gap-2">
                {sortedProjects.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-0.5 lg:h-1 rounded-full transition-all duration-300 ${
                      index === activeProjectIndex 
                        ? 'bg-blue-600 w-6 lg:w-8' 
                        : 'bg-gray-300 w-3 lg:w-4'
                    }`}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: index === activeProjectIndex ? 1 : 0.5 }}
                  />
                ))}
              </div>
              <p className="text-[9px] lg:text-[10px] text-gray-500 mt-2">
                Project {activeProjectIndex + 1} of {sortedProjects.length}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Column - 70% - Project Images (Scrollable with overlay) */}
      <div 
        ref={containerRef}
        className="w-[70%] h-screen overflow-y-scroll relative"
        style={{
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            width: 8px;
          }
          div::-webkit-scrollbar-track {
            background: transparent;
          }
          div::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 4px;
          }
          div::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.3);
          }
        `}</style>

        {sortedProjects.map((project, index) => {
          const isActive = index === activeProjectIndex
          const isPast = index < activeProjectIndex
          
          return (
            <div 
              key={project.id}
              className="h-screen w-full relative"
              style={{
                scrollSnapAlign: 'start',
              }}
            >
              <div
                className="sticky top-0 w-full h-screen"
                style={{
                  zIndex: sortedProjects.length - index,
                }}
              >
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  animate={{
                    scale: isPast ? 0.9 : isActive ? 1 : 0.95,
                    y: isPast ? -100 : isActive ? 0 : 50,
                    opacity: isPast ? 0 : isActive ? 1 : 0.6,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  {/* Sticky Header for each project */}
                  <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/60 via-black/30 to-transparent p-4 lg:p-6">
                    <div className="flex justify-between items-start text-white">
                      <div>
                        <div className="text-[10px] lg:text-xs font-medium uppercase tracking-wider mb-1">
                          Work Snippets
                        </div>
                        <div className="text-xs lg:text-sm opacity-90">
                          {project.category}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] lg:text-xs opacity-80">
                          @{firstName} Platform
                        </div>
                        <div className="text-[10px] lg:text-xs opacity-80 mt-1">
                          {project.project_date || (project.created_at ? new Date(project.created_at).toLocaleDateString() : '')}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-700"
                        style={{
                          filter: isActive ? 'brightness(1)' : 'brightness(0.6)',
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-white/20 text-[80px] lg:text-[120px] font-bold">
                          {project.title.split(' ').map(w => w[0]).join('').slice(0, 2)}
                        </div>
                      </div>
                    )}
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>

                  {/* Project Title Overlay (Bottom) */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 z-10">
                    <motion.h1
                      className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 lg:mb-4 leading-tight"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: isActive ? 1 : 0.5, y: isActive ? 0 : 20 }}
                      transition={{ duration: 0.6 }}
                    >
                      {project.title}
                    </motion.h1>
                    <motion.div
                      className="flex gap-3 lg:gap-4 items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isActive ? 1 : 0.5 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs lg:text-sm text-white/90 hover:text-white underline underline-offset-4 transition-colors"
                        >
                          Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs lg:text-sm text-white/90 hover:text-white underline underline-offset-4 transition-colors"
                        >
                          Source Code
                        </a>
                      )}
                    </motion.div>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-16 lg:top-20 right-4 lg:right-6 bg-white/90 backdrop-blur-sm px-3 lg:px-4 py-1.5 lg:py-2 rounded-full z-20">
                      <span className="text-[10px] lg:text-xs font-bold text-black tracking-wider">
                        FEATURED
                      </span>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          )
        })}

        {/* Scroll indicator at bottom */}
        {activeProjectIndex < sortedProjects.length - 1 && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-white text-xs flex flex-col items-center gap-2"
            >
              <span className="text-[10px] lg:text-xs">Scroll</span>
              <svg 
                className="w-3 h-3 lg:w-4 lg:h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}
