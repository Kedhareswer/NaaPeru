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
  const [selectedFeatured, setSelectedFeatured] = useState<number>(0)
  const sectionRef = useRef<HTMLElement | null>(null)

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
  const remainingProjects = projects
    .filter(project => !displayFeatured.some(featured => featured.id === project.id))
    .sort(sortByDate)

  useEffect(() => {
    if (selectedFeatured >= displayFeatured.length) {
      setSelectedFeatured(0)
    }
  }, [displayFeatured.length, selectedFeatured])

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

  return (
    <section ref={sectionRef} id="projects" className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-12 px-6 pb-24 pt-20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-neutral-500">Projects Showcase</p>
            <h2 className="mt-2 text-3xl md:text-4xl lg:text-[46px] font-black uppercase tracking-[0.4em] text-black">
              Featured Work
            </h2>
          </div>
          {displayFeatured.length > 1 && (
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={() =>
                  setSelectedFeatured((prev) => (prev - 1 + displayFeatured.length) % displayFeatured.length)
                }
                className="rounded-full border border-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.45em] text-black transition-all duration-300 hover:bg-black hover:text-white"
              >
                Previous
              </button>
              <button
                onClick={() => setSelectedFeatured((prev) => (prev + 1) % displayFeatured.length)}
                className="rounded-full border border-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.45em] text-black transition-all duration-300 hover:bg-black hover:text-white"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Featured Project */}
        <div className="border border-black/70 bg-white shadow-[0_30px_60px_rgba(0,0,0,0.08)]">
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
      </div>

      {/* Remaining Projects Table */}
      {remainingProjects.length > 0 && (
        <div className="mx-auto w-full max-w-[1400px] px-6 pb-28">
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-black uppercase tracking-[0.35em] text-black">
              More Projects
            </h3>
            <span className="text-xs uppercase tracking-[0.4em] text-neutral-500">{remainingProjects.length} items</span>
          </div>
          <div className="mt-8 overflow-x-auto border border-black/50">
            <table className="min-w-full border-collapse">
              <thead className="bg-black text-white text-xs uppercase tracking-[0.4em]">
                <tr>
                  <th className="px-6 py-4 text-left">Project</th>
                  <th className="px-6 py-4 text-left">Overview</th>
                  <th className="px-6 py-4 text-left">Live Demo</th>
                  <th className="px-6 py-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {remainingProjects.map((project) => (
                  <tr key={project.id} className="border-t border-black/20 hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-5">
                      <button
                        onClick={() => project.id && router.push(`/project/${project.id}`)}
                        className="font-semibold uppercase tracking-[0.35em] text-left text-black hover:underline"
                      >
                        {project.title}
                      </button>
                    </td>
                    <td className="px-6 py-5 text-neutral-600">
                      {project.description || "—"}
                    </td>
                    <td className="px-6 py-5">
                      {project.demo ? (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-black hover:underline"
                        >
                          Visit
                        </a>
                      ) : (
                        <span className="text-neutral-400 text-xs uppercase tracking-[0.35em]">Unavailable</span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-xs uppercase tracking-[0.35em] text-neutral-600">
                      {project.featured ? "Featured" : "Active"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  )
}
