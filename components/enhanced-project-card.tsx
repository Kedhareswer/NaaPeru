"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, ExternalLink, Eye, Star, GitFork } from "lucide-react"

interface ProjectCardProps {
  project: {
    id: number
    title: string
    description: string
    categories: string[]
    date: string
    image: string
    link: string
    demoUrl?: string
    githubUrl?: string
    featured?: boolean
  }
  index: number
  onViewDetails: (project: any) => void
}

interface GitHubStats {
  stars: number
  forks: number
  watchers: number
}

export function EnhancedProjectCard({ project, index, onViewDetails }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(false)

  // Extract GitHub repo from URL
  const getGithubRepo = (url?: string) => {
    if (!url) return null
    const match = url.match(/github\.com\/([^/]+\/[^/]+)/)
    return match ? match[1] : null
  }

  // Fetch GitHub stats
  useEffect(() => {
    if (!project.githubUrl) return

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
          })
        }
      })
      .catch((err) => console.log("GitHub API error:", err))
      .finally(() => setLoading(false))
  }, [project.githubUrl])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="group overflow-hidden h-full flex flex-col bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
        {/* Image Container */}
        <div className="aspect-[16/9] relative bg-gray-50 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Overlay with quick actions */}
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {project.demoUrl && (
              <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white text-black" asChild>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              className="bg-white/90 hover:bg-white text-black border-white/20"
              onClick={() => onViewDetails(project)}
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </motion.div>

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-3 left-3">
              <span className="bg-black text-white text-xs px-2 py-1 rounded-full font-medium">Featured</span>
            </div>
          )}

          {/* Real GitHub Stats */}
          {githubStats && !loading && (
            <div className="absolute top-3 right-3 flex gap-2">
              <div className="bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3" />
                {githubStats.stars}
              </div>
              <div className="bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <GitFork className="w-3 h-3" />
                {githubStats.forks}
              </div>
            </div>
          )}

          {/* Loading indicator */}
          {loading && (
            <div className="absolute top-3 right-3">
              <div className="bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin"></div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-semibold text-gray-900 leading-tight line-clamp-2 group-hover:text-black transition-colors">
              {project.title}
            </h3>
            <span className="text-sm text-gray-500 whitespace-nowrap ml-4 font-medium">{project.date}</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-4 flex-grow line-clamp-3 leading-relaxed">{project.description}</p>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.categories.map((category, idx) => (
              <span
                key={idx}
                className="text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                {category}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
            <div className="flex gap-2">
              {project.demoUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-black hover:bg-gray-50 p-2"
                  asChild
                >
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="group/btn text-gray-600 hover:text-black hover:bg-gray-50"
              onClick={() => onViewDetails(project)}
            >
              View Details
              <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
