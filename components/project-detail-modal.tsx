"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, ExternalLink, Github, Calendar, Code, Target, Trophy } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  categories: string[]
  date: string
  image: string
  technologies: string[]
  objectives: string[]
  outcomes: string[]
  githubUrl?: string
  liveDemo?: string
}

interface ProjectDetailModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      window.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  // Close on outside click
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={handleOutsideClick}>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
          >
            {/* Header */}
            <div className="relative border-b border-gray-100 p-6">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 hover:bg-gray-100 rounded-full"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>

              <div className="pr-12">
                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.categories.map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-3">{project.title}</h2>

                {/* Date */}
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">{project.date}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Project Description */}
                  <section>
                    <h3 className="text-xl font-light mb-4 text-gray-900">Project Overview</h3>
                    <div className="w-16 h-px bg-gray-300 mb-6"></div>
                    <p className="text-gray-700 leading-relaxed">{project.description}</p>
                  </section>

                  {/* Technologies */}
                  <section>
                    <h3 className="text-xl font-light mb-4 text-gray-900 flex items-center gap-3">
                      <Code className="w-5 h-5 text-gray-600" />
                      Technologies Used
                    </h3>
                    <div className="w-16 h-px bg-gray-300 mb-6"></div>
                    <div className="flex flex-wrap gap-3">
                      {project.technologies.map((tech, index) => (
                        <motion.span
                          key={tech}
                          className="px-4 py-2 bg-gray-50 border border-gray-200 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </section>

                  {/* Objectives and Outcomes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Objectives */}
                    <section>
                      <h3 className="text-xl font-light mb-4 text-gray-900 flex items-center gap-3">
                        <Target className="w-5 h-5 text-gray-600" />
                        Key Objectives
                      </h3>
                      <div className="w-16 h-px bg-gray-300 mb-6"></div>
                      <ul className="space-y-4">
                        {project.objectives.map((objective, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start gap-4 text-gray-700"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="leading-relaxed">{objective}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </section>

                    {/* Outcomes */}
                    <section>
                      <h3 className="text-xl font-light mb-4 text-gray-900 flex items-center gap-3">
                        <Trophy className="w-5 h-5 text-gray-600" />
                        Project Outcomes
                      </h3>
                      <div className="w-16 h-px bg-gray-300 mb-6"></div>
                      <ul className="space-y-4">
                        {project.outcomes.map((outcome, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start gap-4 text-gray-700"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="leading-relaxed">{outcome}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </section>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                  {/* Project Image */}
                  <section>
                    <h3 className="text-xl font-light mb-4 text-gray-900">Project Preview</h3>
                    <div className="w-16 h-px bg-gray-300 mb-6"></div>
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </section>

                  {/* Quick Actions */}
                  <section>
                    <h3 className="text-xl font-light mb-4 text-gray-900">Quick Actions</h3>
                    <div className="w-16 h-px bg-gray-300 mb-6"></div>
                    <div className="space-y-3">
                      {project.liveDemo && (
                        <Button className="w-full bg-black hover:bg-gray-800 text-white" asChild>
                          <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            Source Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
