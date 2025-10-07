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

  // Get next and previous projects
  const currentIndex = allProjects.findIndex(p => p.id === project.id)
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length]
  const previousProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length]

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
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="px-6 py-4 lg:px-12">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-3 px-3 py-2 text-black hover:text-gray-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-xs uppercase tracking-[0.4em] hidden sm:inline-block">Back</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Side (70%) - Title + Gallery + Navigation */}
        <div className="flex-1 lg:w-[70%] flex flex-col">
          {/* Title Block */}
          <div className="bg-white px-6 sm:px-8 lg:px-12 pt-8 pb-6">
            <div className="flex items-end justify-between">
              <h1 className="text-3xl lg:text-5xl xl:text-6xl font-black uppercase tracking-wider text-black">
                {project.title}
              </h1>
              <p className="hidden sm:block text-sm lg:text-base tracking-widest text-gray-700">({getCategoryCode(project)})</p>
            </div>
            <div className="mt-4 border-b border-gray-900" />
          </div>

          {/* Image Gallery Area - full-height within column */}
          <div className="bg-black relative flex items-center justify-center px-6 sm:px-8 lg:px-12 py-8 min-h-[70vh]">
            {/* Main Image Display */}
            <div className="relative w-full h-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                {galleryImages.length > 0 ? (
                  <motion.img
                    key={currentImageIndex}
                    src={galleryImages[currentImageIndex]}
                    alt={project.title}
                    className="w-full h-[65vh] lg:h-[75vh] object-contain"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                  />
                ) : (
                  <motion.div
                    className="w-full max-w-3xl aspect-video bg-gradient-to-br from-orange-400 via-orange-500 to-red-600 flex items-center justify-center"
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
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm">
                {currentImageIndex + 1} / {galleryImages.length}
              </div>
            )}
          </div>

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

                {/* Outcomes Section */}
                {project.outcomes && project.outcomes.length > 0 && (
                  <div className="pt-6 border-t border-gray-200">
                    <h2 className="text-xs font-bold uppercase tracking-wider mb-4 text-black">
                      Outcomes
                    </h2>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {project.outcomes.map((outcome, index) => (
                        <li key={index}>{outcome}</li>
                      ))}
                    </ul>
                  </div>
                )}
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
