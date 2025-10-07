"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import type { Project } from "@/types/project"

interface ProjectDetailProps {
  project: Project
  allProjects: Project[]
}

export function ProjectDetail({ project, allProjects }: ProjectDetailProps) {
  const router = useRouter()
  const [infoVisible, setInfoVisible] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Create an array of images for the gallery (project image + placeholder images)
  const galleryImages = project.image ? [project.image] : []

  const getCategoryCode = (proj: Project) => {
    const index = allProjects.findIndex(p => p.id === proj.id)
    const prefix = proj.category?.substring(0, 2).toUpperCase() || "SM"
    const code = String(index + 1).padStart(3, "0")
    return `${prefix}${code}`
  }

  const nextImage = () => {
    if (galleryImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
    }
  }

  const prevImage = () => {
    if (galleryImages.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with back button */}
      <header className="border-b border-gray-200 px-6 py-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-black hover:text-gray-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Image Gallery Area - Left Side (70%) */}
        <div className="flex-1 lg:w-[70%] bg-black relative flex items-center justify-center p-8 lg:p-16">
          {/* Project Title Overlay */}
          <div className="absolute top-8 left-8 lg:top-12 lg:left-12 z-10">
            <h1 className="text-white text-3xl lg:text-5xl xl:text-6xl font-black uppercase tracking-wider">
              {project.title}
            </h1>
            <p className="text-white text-sm lg:text-base tracking-widest mt-2">
              ({getCategoryCode(project)})
            </p>
          </div>

          {/* Main Image Display */}
          <div className="relative w-full h-full flex items-center justify-center max-w-5xl">
            <AnimatePresence mode="wait">
              {galleryImages.length > 0 ? (
                <motion.img
                  key={currentImageIndex}
                  src={galleryImages[currentImageIndex]}
                  alt={project.title}
                  className="max-w-full max-h-[70vh] object-contain"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                />
              ) : (
                <motion.div
                  className="w-full max-w-2xl aspect-video bg-gradient-to-br from-orange-400 via-orange-500 to-red-600 flex items-center justify-center rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span className="text-white text-8xl font-black">
                    {project.title.split(" ").map(w => w[0]).join("").slice(0, 3).toUpperCase()}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Arrows (if multiple images) */}
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}
          </div>

          {/* Image Counter (if multiple images) */}
          {galleryImages.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-sm">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>
          )}
        </div>

        {/* Info Sidebar - Right Side (30%) */}
        <AnimatePresence>
          {infoVisible && (
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full lg:w-[30%] bg-white border-l border-gray-200 overflow-y-auto lg:h-screen lg:sticky lg:top-0"
            >
              <div className="p-6 lg:p-8 space-y-8">
                {/* Overview Section */}
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-4 text-black">
                    Overview
                  </h2>
                  <p className="text-sm leading-relaxed text-gray-700">
                    {project.description}
                  </p>
                </div>

                {/* Services/Technologies Section */}
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-4 text-black">
                    Technologies
                  </h2>
                  <ul className="space-y-2">
                    {project.technologies.map((tech, index) => (
                      <li key={index} className="text-sm text-gray-700">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Objectives Section (if available) */}
                {project.objectives && project.objectives.length > 0 && (
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider mb-4 text-black">
                      Objectives
                    </h2>
                    <ul className="space-y-2">
                      {project.objectives.map((objective, index) => (
                        <li key={index} className="text-sm text-gray-700">
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Outcomes Section (if available) */}
                {project.outcomes && project.outcomes.length > 0 && (
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider mb-4 text-black">
                      Outcomes
                    </h2>
                    <ul className="space-y-2">
                      {project.outcomes.map((outcome, index) => (
                        <li key={index} className="text-sm text-gray-700">
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Links Section */}
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-4 text-black">
                    Links
                  </h2>
                  <div className="space-y-3">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-3 px-4 border border-black text-black text-xs font-medium uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-300 text-center"
                      >
                        VISIT LIVE SITE
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-3 px-4 border border-black text-black text-xs font-medium uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-300 text-center"
                      >
                        VIEW SOURCE CODE
                      </a>
                    )}
                  </div>
                </div>

                {/* Category & Date Info */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="space-y-2 text-xs text-gray-600">
                    {project.category && (
                      <p>
                        <span className="font-bold uppercase tracking-wider">Category:</span>{" "}
                        {project.category}
                      </p>
                    )}
                    {project.project_date && (
                      <p>
                        <span className="font-bold uppercase tracking-wider">Date:</span>{" "}
                        {project.project_date}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Hide/Show Info Toggle Button */}
        <button
          onClick={() => setInfoVisible(!infoVisible)}
          className="fixed bottom-8 right-8 lg:bottom-12 lg:right-12 px-4 py-2 bg-white border border-black text-black text-xs font-medium uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-300 shadow-lg z-50"
        >
          {infoVisible ? "◦ Hide Info" : "◦ Info"}
        </button>
      </div>
    </div>
  )
}
