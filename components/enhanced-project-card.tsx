"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, ExternalLink, Eye } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  categories: string[]
  date: string
  image: string
  demoUrl?: string
  featured?: boolean
  technologies?: string[]
}

interface ProjectCardProps {
  project: Project
  index: number
  onViewDetails: (project: Project) => void
}

export function EnhancedProjectCard({ project, index, onViewDetails }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const techPreview = Array.isArray(project.technologies)
    ? project.technologies.slice(0, 3)
    : [];

  const catArr = Array.isArray(project.categories) ? project.categories : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card className="group overflow-hidden h-full flex flex-col bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg cursor-pointer">
        {/* Image Container */}
        <div className="aspect-[16/9] relative bg-gray-50 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-3 left-3">
              <span className="bg-black text-white text-xs px-2 py-1 rounded-full font-medium">Featured</span>
            </div>
          )}

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {project.demoUrl && (
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white text-black"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(project.demoUrl, "_blank")
                }}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              className="bg-white/90 hover:bg-white text-black border-white/20"
              onClick={(e) => {
                e.stopPropagation()
                onViewDetails(project)
              }}
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow" onClick={() => onViewDetails(project)}>
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-semibold text-gray-900 leading-tight group-hover:text-black transition-colors">
              {project.title}
            </h3>
            <span className="text-sm text-gray-500 whitespace-nowrap ml-4 font-medium">{project.date}</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-4 flex-grow leading-relaxed line-clamp-3">{project.description}</p>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {catArr.slice(0, 3).map((category, idx) => (
              <span
                key={idx}
                className="text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                {category}
              </span>
            ))}
            {catArr.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">+{catArr.length - 3} more</span>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
            <div className="flex gap-2">
              {project.demoUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-black hover:bg-gray-50 p-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(project.demoUrl, "_blank")
                  }}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="group/btn text-gray-600 hover:text-black hover:bg-gray-50"
              onClick={(e) => {
                e.stopPropagation()
                onViewDetails(project)
              }}
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
