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
      <div className="mx-auto w-full max-w-[1500px] px-6 pb-24 pt-28 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,0.3fr)]">
          {/* Featured Column */}
          <div className="space-y-12 lg:sticky lg:top-28">
            <div className="flex flex-col gap-3 text-xs uppercase tracking-[0.45em] text-neutral-500">
              <span className="text-[10px]">Featured Portfolio</span>
              {sortedFeatured.length > 1 && (
                <div className="flex gap-2">
                  {sortedFeatured.map((project, index) => (
                    <button
                      key={project.id}
                      onClick={() => setSelectedFeatured(index)}
                      className={`flex-1 rounded-full border border-neutral-900 px-4 py-2 text-[10px] font-semibold transition ${
                        index === selectedFeatured
                          ? "bg-neutral-900 text-white"
                          : "bg-white text-neutral-700 hover:bg-neutral-100"
                      }`}
                      aria-label={`Show featured project ${index + 1}`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {currentFeatured && (
              <motion.div
                key={currentFeatured.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
                className="overflow-hidden rounded-[40px] border border-neutral-900 bg-white shadow-[0_32px_70px_rgba(15,23,42,0.18)]"
              >
                <div className="relative aspect-[16/9] w-full border-b border-neutral-900 bg-black">
                  {currentFeatured.image ? (
                    <motion.img
                      src={currentFeatured.image}
                      alt={currentFeatured.title}
                      className="h-full w-full object-cover"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-400 via-orange-500 to-rose-500 text-white">
                      <span className="text-6xl font-black uppercase tracking-[0.3em]">
                        {currentFeatured.title
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 3)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="px-12 pb-12 pt-8 text-center">
                  <h2 className="text-[clamp(1.9rem,2.6vw,2.6rem)] font-black uppercase tracking-[0.32em] text-neutral-900">
                    {currentFeatured.title}
                  </h2>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.48em] text-neutral-500">
                    ({getCategoryCode(currentFeatured, selectedFeatured)})
                  </p>

                  <div className="mt-6 flex flex-col items-center gap-3">
                    <div className="h-1 w-full max-w-[360px] rounded-full border border-neutral-900" />
                    <button
                      onClick={() => currentFeatured.id && router.push(`/project/${currentFeatured.id}`)}
                      className="w-full max-w-[360px] rounded-full border border-neutral-900 px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.5em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Other Projects Column */}
          <aside className="lg:sticky lg:top-28">
            <div className="rounded-[40px] border border-neutral-900 bg-white shadow-[0_26px_60px_rgba(15,23,42,0.16)]">
              <div className="max-h-[calc(100vh-220px)] overflow-y-auto scroll-smooth pr-2 lg:scrollbar-thin lg:scrollbar-track-transparent lg:scrollbar-thumb-neutral-300">
                {sortedOthers.map((project, index) => (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className="group border-b border-neutral-200 px-6 py-7 last:border-b-0"
                  >
                    <div className="overflow-hidden rounded-[28px] border border-neutral-900 bg-neutral-100">
                      {project.image ? (
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover"
                          animate={{ scale: hoveredProject === project.id ? 1.04 : 1 }}
                          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                        />
                      ) : (
                        <div className="flex h-[220px] w-full items-center justify-center text-3xl font-black uppercase tracking-[0.32em] text-neutral-500">
                          {project.title
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                      )}
                    </div>

                    <div className="mt-5 space-y-2 text-center">
                      <h3 className="text-base font-black uppercase tracking-[0.35em] text-neutral-900">
                        {project.title}
                      </h3>
                      <p className="text-[10px] uppercase tracking-[0.45em] text-neutral-500">
                        ({getCategoryCode(project, index + sortedFeatured.length)})
                      </p>
                    </div>

                    <button
                      onClick={() => project.id && router.push(`/project/${project.id}`)}
                      className="mt-5 inline-flex w-full justify-center rounded-full border border-neutral-900 px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.45em] text-neutral-900 transition group-hover:bg-neutral-900 group-hover:text-white"
                    >
                      Read More
                    </button>
                  </motion.article>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-neutral-900 px-6 py-4 text-[11px] uppercase tracking-[0.45em] text-neutral-500">
                <span>SW.</span>
                <span>Instagram</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
