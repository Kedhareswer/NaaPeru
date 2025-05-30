"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  X,
  ExternalLink,
  Github,
  Calendar,
  Star,
  GitFork,
  Eye,
  Code,
  Target,
  Trophy,
  Share2,
  Bookmark,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface ProjectDetailModalProps {
  project: {
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
    gallery?: string[]
  } | null
  isOpen: boolean
  onClose: () => void
}

interface GitHubStats {
  stars: number
  forks: number
  watchers: number
  language: string
  lastUpdated: string
  openIssues: number
}

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0)
  const modalRef = useRef<HTMLDivElement>(null)

  // Extract GitHub repo from URL
  const getGithubRepo = (url?: string) => {
    if (!url) return null
    const match = url.match(/github\.com\/([^/]+\/[^/]+)/)
    return match ? match[1] : null
  }

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  // Gallery navigation
  const nextImage = () => {
    if (project?.gallery) {
      setCurrentGalleryIndex((prev) => (prev + 1) % project.gallery!.length)
    }
  }

  const prevImage = () => {
    if (project?.gallery) {
      setCurrentGalleryIndex((prev) => (prev - 1 + project.gallery!.length) % project.gallery!.length)
    }
  }

  // Fetch GitHub stats
  useEffect(() => {
    if (!project?.githubUrl || !isOpen) return

    const repo = getGithubRepo(project.githubUrl)
    if (!repo) return

    setLoading(true)
    fetch(`https://api.github.com/repos/${repo}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setGithubStats({
            stars: data.stargazers_count || 0,
            forks: data.forks_count || 0,
            watchers: data.watchers_count || 0,
            language: data.language || "Unknown",
            lastUpdated: data.updated_at || "",
            openIssues: data.open_issues_count || 0,
          })
        }
      })
      .catch((err) => console.log("GitHub API error:", err))
      .finally(() => setLoading(false))
  }, [project?.githubUrl, isOpen])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  // Close on outside click
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  // Reset gallery index when project changes
  useEffect(() => {
    setCurrentGalleryIndex(0)
  }, [project?.id])

  if (!project) return null

  // Default gallery with main project image
  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image]

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
            className="relative bg-white w-full max-w-6xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
          >
            {/* Header */}
            <div className="relative border-b border-gray-100 p-6 md:p-8">
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 hover:bg-gray-100 rounded-full z-10"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>

              {/* Project title and meta */}
              <div className="pr-12">
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
                <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-3">{project.title}</h2>
                <div className="flex items-center gap-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">{project.date}</span>
                  </div>
                  {githubStats && (
                    <>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        <span className="text-sm font-medium">{githubStats.stars}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <GitFork className="w-4 h-4" />
                        <span className="text-sm font-medium">{githubStats.forks}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:p-8">
                {/* Main Content - Left Side */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Project Description */}
                  <div>
                    <h3 className="text-xl font-light mb-4 text-gray-900">Project Overview</h3>
                    <div className="w-16 h-px bg-gray-300 mb-6"></div>
                    <p className="text-gray-700 leading-relaxed text-base">{project.description}</p>
                  </div>

                  {/* Technologies */}
                  <div>
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
                  </div>

                  {/* Objectives and Outcomes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
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
                    </div>

                    <div>
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
                    </div>
                  </div>

                  {/* Technical Implementation */}
                  <div>
                    <h3 className="text-xl font-light mb-4 text-gray-900">Technical Implementation</h3>
                    <div className="w-16 h-px bg-gray-300 mb-6"></div>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700 leading-relaxed mb-4">
                        This project demonstrates the application of advanced techniques in{" "}
                        {project.categories.join(", ")} to solve real-world problems. The implementation leverages
                        cutting-edge technologies and methodologies to deliver exceptional results.
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                            <Clock className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1">Planning & Research</h4>
                            <p className="text-gray-600 text-sm">
                              Initial research, requirement gathering, and project planning phase.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                            <Code className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1">Development</h4>
                            <p className="text-gray-600 text-sm">
                              Core development phase including algorithm implementation and system design.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                            <Eye className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1">Testing & Optimization</h4>
                            <p className="text-gray-600 text-sm">
                              Rigorous testing, performance optimization, and quality assurance.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar - Right Side */}
                <div className="space-y-8">
                  {/* Project Gallery */}
                  <div>
                    <h3 className="text-xl font-light mb-4 text-gray-900">Project Gallery</h3>
                    <div className="w-16 h-px bg-gray-300 mb-6"></div>
                    <div className="space-y-4">
                      {/* Main Gallery Image */}
                      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={gallery[currentGalleryIndex] || "/placeholder.svg"}
                          alt={`${project.title} - Image ${currentGalleryIndex + 1}`}
                          fill
                          className="object-cover"
                        />
                        {gallery.length > 1 && (
                          <>
                            <button
                              onClick={prevImage}
                              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              onClick={nextImage}
                              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>

                      {/* Gallery Thumbnails */}
                      {gallery.length > 1 && (
                        <div className="grid grid-cols-3 gap-2">
                          {gallery.map((image, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentGalleryIndex(index)}
                              className={`aspect-video bg-gray-100 rounded-md overflow-hidden border-2 transition-colors ${
                                index === currentGalleryIndex ? "border-black" : "border-transparent"
                              }`}
                            >
                              <Image
                                src={image || "/placeholder.svg"}
                                alt={`Gallery ${index + 1}`}
                                width={100}
                                height={60}
                                className="object-cover w-full h-full"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* GitHub Stats */}
                  {githubStats && (
                    <div>
                      <h3 className="text-xl font-light mb-4 text-gray-900 flex items-center gap-3">
                        <Github className="w-5 h-5 text-gray-600" />
                        Repository Stats
                      </h3>
                      <div className="w-16 h-px bg-gray-300 mb-6"></div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm text-gray-600 font-medium">Stars</span>
                          </div>
                          <span className="font-semibold text-gray-900">{githubStats.stars}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center gap-2">
                            <GitFork className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-600 font-medium">Forks</span>
                          </div>
                          <span className="font-semibold text-gray-900">{githubStats.forks}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-600 font-medium">Watchers</span>
                          </div>
                          <span className="font-semibold text-gray-900">{githubStats.watchers}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center gap-2">
                            <Code className="w-4 h-4 text-purple-500" />
                            <span className="text-sm text-gray-600 font-medium">Language</span>
                          </div>
                          <span className="font-semibold text-gray-900">{githubStats.language}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div>
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
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 border-gray-300 hover:bg-gray-50">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 border-gray-300 hover:bg-gray-50">
                          <Bookmark className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
