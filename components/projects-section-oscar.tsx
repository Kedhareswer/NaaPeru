"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import type { Project } from "@/types/project"

interface ProjectsSectionOscarProps {
  projects: Project[]
  name?: string
}

export function ProjectsSectionOscar({ projects, name = "Your Name" }: ProjectsSectionOscarProps) {
  // Get first 6 projects (featured + recent)
  const displayProjects = projects.slice(0, 6)
  
  const firstName = name.split(" ")[0] || "Your"

  // Grid layout pattern: [large, medium, medium, medium, medium, large]
  const gridClasses = [
    "lg:col-span-1 lg:row-span-2", // Large vertical
    "lg:col-span-1 lg:row-span-1", // Medium
    "lg:col-span-1 lg:row-span-1", // Medium
    "lg:col-span-1 lg:row-span-1", // Medium
    "lg:col-span-1 lg:row-span-1", // Medium
    "lg:col-span-1 lg:row-span-2", // Large vertical
  ]

  return (
    <section className="w-full bg-white">
      {/* Hero Text Section */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-16 md:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <h2 className="text-[32px] sm:text-[40px] md:text-[56px] lg:text-[64px] xl:text-[72px] leading-[1.1] font-bold tracking-tight text-black max-w-[1100px]">
            {firstName} transforms ideas into bold visual narratives — seamlessly blending innovation, creativity, and design.
          </h2>
          <Link
            href="/projects"
            className="inline-block text-sm font-medium text-black hover:text-zinc-600 transition-colors underline underline-offset-4 mt-2"
          >
            Explore Portfolio
          </Link>
        </motion.div>
      </div>

      {/* Projects Grid Section */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pb-16 md:pb-20 lg:pb-24">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-black"
          >
            Recent projects
          </motion.h3>
          <Link
            href="/projects"
            className="text-sm font-medium text-black hover:text-zinc-600 transition-colors"
          >
            View All
          </Link>
        </div>

        {/* Projects Grid - Masonry-style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 auto-rows-[280px]">
          {displayProjects.map((project, index) => {
            const gridClass = gridClasses[index] || "lg:col-span-1 lg:row-span-1"
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl md:rounded-3xl bg-zinc-100 ${gridClass}`}
              >
                <Link
                  href={project.demo || project.github || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                >
                  {/* Image */}
                  <div className="absolute inset-0">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-zinc-200 via-zinc-300 to-zinc-400 flex items-center justify-center">
                        <span className="text-5xl md:text-6xl font-bold text-white/20">
                          {project.title.split(" ").map(w => w[0]).join("").slice(0, 2)}
                        </span>
                      </div>
                    )}
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="space-y-1.5">
                      <h4 className="text-base md:text-lg font-semibold leading-tight line-clamp-2">
                        {project.title}
                      </h4>
                      <p className="text-xs md:text-sm text-white/80 line-clamp-1">
                        {project.category || project.technologies[0]}
                      </p>
                    </div>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-[10px] md:text-xs font-bold text-black tracking-wide">
                        FEATURED
                      </span>
                    </div>
                  )}
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20 border-t border-zinc-200">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h3 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] leading-[1.1] font-bold tracking-tight text-black">
            Multidisciplinary in approach,
          </h3>
          <h3 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] leading-[1.1] font-bold tracking-tight text-black">
            uncompromising in vision.
          </h3>
          <p className="text-[28px] sm:text-[36px] md:text-[40px] lg:text-[48px] leading-[1.1] font-normal tracking-tight text-zinc-400">
            Let's create the unexpected.
          </p>
          
          <div className="flex gap-3 pt-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-full transition-colors"
            >
              STUDIO(O)
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-6 py-3 bg-zinc-800 hover:bg-zinc-900 text-white text-sm font-medium rounded-full transition-colors"
            >
              MENU
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
