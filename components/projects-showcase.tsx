"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import type { Project } from "@/types/project"

interface ProjectsShowcaseProps {
  projects: Project[]
}

export function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  const router = useRouter()
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [selectedFeatured, setSelectedFeatured] = useState<number>(0)
  const sectionRef = useRef<HTMLElement | null>(null)
  const sidebarRef = useRef<HTMLDivElement | null>(null)

  // Get featured projects and other projects
  const featuredProjects = projects.filter(p => p.featured)
  const otherProjects = projects.filter(p => !p.featured)

  // Sort both arrays by date descending
  const sortByDate = (a: Project, b: Project) => {
    const dateA = new Date(a.project_date || a.created_at || "").getTime()
    const dateB = new Date(b.project_date || b.created_at || "").getTime()
    return (isNaN(dateB) ? 0 : dateB) - (isNaN(dateA) ? 0 : dateA)
  }

  const sortedFeatured = [...featuredProjects].sort(sortByDate)
  const sortedOthers = [...otherProjects].sort(sortByDate)
  const displayFeatured = sortedFeatured.length > 0 ? sortedFeatured : sortedOthers

  // Current featured project to display
  const currentFeatured = displayFeatured[selectedFeatured % (displayFeatured.length || 1)]

  const getCategoryCode = (project: Project, index: number) => {
    // Generate category codes like SM001, SM002, etc.
    const prefix = project.category?.substring(0, 2).toUpperCase() || "SM"
    const code = String(index + 1).padStart(3, "0")
    return `${prefix}${code}`
  }

  useEffect(() => {
    if (displayFeatured.length <= 1) return

    const intervalId = window.setInterval(() => {
      setSelectedFeatured((prev) => (prev + 1) % displayFeatured.length)
    }, 6500)

    return () => window.clearInterval(intervalId)
  }, [displayFeatured.length])

  useEffect(() => {
    const sectionEl = sectionRef.current
    const handleWheel = (event: WheelEvent) => {
      const sidebarEl = sidebarRef.current
      if (!sidebarEl) return

      const { scrollTop, scrollHeight, clientHeight } = sidebarEl
      const delta = event.deltaY

      const atTop = scrollTop === 0
      const atBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight

      if ((delta < 0 && !atTop) || (delta > 0 && !atBottom)) {
        event.preventDefault()
        sidebarEl.scrollBy({ top: delta, behavior: "auto" })
      }
    }

    sectionEl?.addEventListener("wheel", handleWheel, { passive: false })
    return () => sectionEl?.removeEventListener("wheel", handleWheel)
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-12 px-6 pb-28 pt-24 lg:flex-row lg:gap-16">
        {/* Featured Project */}
        <div className="flex-1 border border-black/70 bg-white shadow-[0_30px_60px_rgba(0,0,0,0.08)]">
          <motion.div
            key={currentFeatured?.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col"
          >
            <div className="relative w-full bg-black">
              <div className="relative aspect-[16/9] w-full">
                {currentFeatured?.image ? (
                  <motion.img
                    src={currentFeatured.image}
                    alt={currentFeatured.title}
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-orange-400 to-rose-500 text-white">
                    <span className="text-6xl font-black">
                      {currentFeatured?.title ? currentFeatured.title.split(" ").map(w => w[0]).join("" ).slice(0, 3).toUpperCase() : "PRJ"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 border-t border-black/70 bg-white px-10 py-10 text-center">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-[0.35em] text-black md:text-[28px]">
                  {currentFeatured?.title || "Untitled Project"}
                </h2>
                <p className="mt-2 text-xs uppercase tracking-[0.4em] text-neutral-500">
                  ({currentFeatured ? getCategoryCode(currentFeatured, selectedFeatured) : "PRJ000"})
                </p>
              </div>

              <button
                onClick={() => {
                  if (currentFeatured?.id) {
                    router.push(`/project/${currentFeatured.id}`)
                  }
                }}
                className="mt-4 w-full max-w-[420px] rounded-full border border-black px-10 py-3 text-xs font-semibold uppercase tracking-[0.5em] text-black transition-all duration-300 hover:bg-black hover:text-white"
              >
                Read More
              </button>

              {displayFeatured.length > 1 && (
                <div className="mt-8 flex items-center gap-3">
                  {displayFeatured.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedFeatured(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === selectedFeatured
                          ? "w-12 bg-black"
                          : "w-6 bg-neutral-300 hover:bg-neutral-400"
                      }`}
                      aria-label={`Show featured project ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <aside
          ref={sidebarRef}
          className="w-full max-w-[380px] self-start border border-black/70 bg-white shadow-[0_22px_45px_rgba(0,0,0,0.08)] lg:sticky lg:top-24 lg:max-h-[70vh] lg:overflow-y-auto lg:pr-2"
        >
          <div className="flex flex-col gap-6 lg:gap-8">
            {sortedOthers.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group cursor-pointer bg-white border border-black/60 shadow-[0_18px_36px_rgba(0,0,0,0.08)]"
              >
                <div className="flex h-full flex-col space-y-4 px-6 py-6 lg:h-[420px]">
                  <div className="relative w-full overflow-hidden">
                    <div className="aspect-[4/3] w-full overflow-hidden border border-black/70 bg-neutral-100">
                      {project.image ? (
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover"
                          animate={{ scale: hoveredProject === project.id ? 1.04 : 1 }}
                          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-neutral-200 to-neutral-300 text-neutral-500">
                          <span className="text-3xl font-black">
                            {project.title.split(" ").map(w => w[0]).join("" ).slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1 text-center">
                    <h3 className="text-base font-black uppercase tracking-[0.35em] text-black">
                      {project.title}
                    </h3>
                    <p className="text-[10px] uppercase tracking-[0.45em] text-neutral-500">
                      ({getCategoryCode(project, index + featuredProjects.length)})
                    </p>
                  </div>

                  <button
                    onClick={() => router.push(`/project/${project.id}`)}
                    className="mt-auto w-full rounded-full border border-black px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.45em] text-black transition-all duration-300 group-hover:bg-black group-hover:text-white"
                  >
                    Read More
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}
