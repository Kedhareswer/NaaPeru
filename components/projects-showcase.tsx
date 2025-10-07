"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Project } from "@/types/project"

interface ProjectsShowcaseProps {
  projects: Project[]
}

export function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  const router = useRouter()
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [selectedFeatured, setSelectedFeatured] = useState<number>(0)

  const featuredProjects = projects.filter((project) => project.featured)
  const otherProjects = projects.filter((project) => !project.featured)

  const sortByDate = (a: Project, b: Project) => {
    const dateA = new Date(a.project_date || a.created_at || "").getTime()
    const dateB = new Date(b.project_date || b.created_at || "").getTime()
    return (isNaN(dateB) ? 0 : dateB) - (isNaN(dateA) ? 0 : dateA)
  }

  const sortedFeatured = [...featuredProjects].sort(sortByDate)
  const sortedOthers = [...otherProjects].sort(sortByDate)

  const currentFeatured = sortedFeatured[selectedFeatured] || sortedFeatured[0]

  const getCategoryCode = (project: Project, index: number) => {
    const prefix = project.category?.substring(0, 2).toUpperCase() || "SM"
    const code = String(index + 1).padStart(3, "0")
    return `${prefix}${code}`
  }

  return (
    <section id="projects" className="relative w-full bg-white">
      <div className="mx-auto w-full max-w-[1400px] px-6 pb-24 pt-24 lg:px-10 lg:pb-32">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,0.3fr)]">
          {/* Featured Column */}
          <div className="lg:sticky lg:top-24">
            {currentFeatured && (
              <motion.div
                key={currentFeatured.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="flex flex-col items-center gap-10 text-center"
              >
                <div className="relative w-full">
                  <div className="relative mx-auto w-full max-w-[760px] overflow-hidden border border-neutral-900 bg-white shadow-[0_28px_48px_rgba(15,23,42,0.14)]">
                    <div className="relative aspect-[4/3] w-full">
                      {currentFeatured.image ? (
                        <motion.img
                          src={currentFeatured.image}
                          alt={currentFeatured.title}
                          className="h-full w-full object-cover"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-400 via-orange-500 to-rose-500 text-white">
                          <span className="text-6xl font-black uppercase tracking-[0.28em]">
                            {currentFeatured.title
                              .split(" ")
                              .map((word) => word[0])
                              .join("")
                              .slice(0, 3)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-[clamp(2rem,3vw,2.8rem)] font-black uppercase tracking-[0.32em] text-neutral-900">
                    {currentFeatured.title}
                  </h2>
                  <p className="text-[11px] uppercase tracking-[0.45em] text-neutral-500">
                    ({getCategoryCode(currentFeatured, selectedFeatured)})
                  </p>
                </div>

                <div className="flex w-full max-w-[540px] flex-col items-center gap-6">
                  <button
                    onClick={() => currentFeatured.id && router.push(`/project/${currentFeatured.id}`)}
                    className="inline-flex w-full justify-center rounded-full border border-neutral-900 px-12 py-3 text-sm font-semibold uppercase tracking-[0.5em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
                  >
                    Read More
                  </button>

                  <div className="h-[18px] w-full rounded-full border border-neutral-900">
                    <div className="mx-auto h-full w-[22%] rounded-full border border-neutral-900" />
                  </div>
                </div>

                {sortedFeatured.length > 1 && (
                  <div className="mt-6 flex items-center gap-3">
                    {sortedFeatured.map((project, index) => (
                      <button
                        key={project.id}
                        onClick={() => setSelectedFeatured(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === selectedFeatured ? "w-10 bg-neutral-900" : "w-6 bg-neutral-300 hover:bg-neutral-400"
                        }`}
                        aria-label={`Show featured project ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Other Projects Column */}
          <aside className="space-y-10">
            {sortedOthers.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group space-y-4 border-b border-neutral-200 pb-10 last:border-b-0 last:pb-0"
              >
                <div className="overflow-hidden border border-neutral-900">
                  <div className="relative aspect-[4/3] w-full">
                    {project.image ? (
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover"
                        animate={{ scale: hoveredProject === project.id ? 1.03 : 1 }}
                        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-3xl font-black uppercase tracking-[0.3em] text-neutral-500">
                        {project.title
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2 text-center">
                  <h3 className="text-base font-black uppercase tracking-[0.35em] text-neutral-900">
                    {project.title}
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.45em] text-neutral-500">
                    ({getCategoryCode(project, index + sortedFeatured.length)})
                  </p>
                </div>

                <div className="flex w-full items-center justify-center">
                  <button
                    onClick={() => project.id && router.push(`/project/${project.id}`)}
                    className="inline-flex w-full justify-center rounded-full border border-neutral-900 px-8 py-2 text-[11px] font-semibold uppercase tracking-[0.45em] text-neutral-900 transition group-hover:bg-neutral-900 group-hover:text-white"
                  >
                    Read More
                  </button>
                </div>
              </motion.article>
            ))}

            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.45em] text-neutral-500">
              <span>SW.</span>
              <span>Instagram</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
