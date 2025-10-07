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
    <section className="w-full bg-white">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1400px] px-6 py-4 lg:px-10">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-3 px-3 py-2 text-neutral-900 transition-colors hover:text-neutral-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden text-xs uppercase tracking-[0.4em] sm:inline-block">Back</span>
          </button>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1400px] px-6 py-10 lg:px-10 lg:py-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)]">
          {/* Content Column */}
          <div className="space-y-12">
            <div className="space-y-4 border-b border-neutral-900 pb-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <h1 className="text-[clamp(2.75rem,4vw,3.75rem)] font-black uppercase leading-[0.96] tracking-[0.32em] text-neutral-900">
                  {project.title}
                </h1>
                <p className="text-xs uppercase tracking-[0.45em] text-neutral-500">
                  ({getCategoryCode(project)})
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[36px] border border-neutral-900 bg-black shadow-[0_32px_65px_rgba(15,23,42,0.18)]">
              <div className="relative aspect-[16/9] w-full">
                <AnimatePresence mode="wait">
                  {galleryImages.length > 0 ? (
                    <motion.img
                      key={currentImageIndex}
                      src={galleryImages[currentImageIndex]}
                      alt={project.title}
                      className="h-full w-full object-cover"
                      initial={{ opacity: 0.2, scale: 0.985 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.2, scale: 0.985 }}
                      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                    />
                  ) : (
                    <motion.div
                      className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-400 via-orange-500 to-rose-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <span className="text-6xl font-black uppercase tracking-[0.3em] text-white">
                        {project.title
                          .split(" ")
                          .map(w => w[0])
                          .join("")
                          .slice(0, 3)
                          .toUpperCase()}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-white/15 p-2 text-white backdrop-blur transition hover:bg-white/30"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-white/15 p-2 text-white backdrop-blur transition hover:bg-white/30"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                {galleryImages.length > 1 && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/40 bg-white/10 px-4 py-1 text-[11px] uppercase tracking-[0.4em] text-white">
                    {currentImageIndex + 1} / {galleryImages.length}
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-[36px] border border-neutral-900 bg-white p-8 shadow-[0_26px_55px_rgba(15,23,42,0.12)] lg:p-10">
              <div className="grid gap-10 lg:grid-cols-2">
                {previousProject && (
                  <article className="space-y-6">
                    <header className="space-y-3">
                      <h2 className="text-4xl font-black uppercase tracking-[0.32em] text-neutral-900">Previous</h2>
                      <p className="text-[11px] uppercase tracking-[0.45em] text-neutral-500">
                        ({getCategoryCode(previousProject)})
                      </p>
                    </header>
                    <div className="overflow-hidden rounded-[28px] border border-neutral-900 bg-neutral-100">
                      {previousProject.image ? (
                        <motion.img
                          src={previousProject.image}
                          alt={previousProject.title}
                          className="h-full w-full object-cover"
                          whileHover={{ scale: 1.04 }}
                          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-4xl font-black uppercase tracking-[0.3em] text-neutral-500">
                          {previousProject.title
                            .split(" ")
                            .map(w => w[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-base font-semibold uppercase tracking-[0.32em] text-neutral-900">
                        {previousProject.title}
                      </h3>
                      <button
                        onClick={() => router.push(`/project/${previousProject.id}`)}
                        className="w-full rounded-full border border-neutral-900 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.45em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
                      >
                        Explore Project
                      </button>
                    </div>
                  </article>
                )}

                {nextProject && (
                  <article className="space-y-6 text-left lg:text-right">
                    <header className="space-y-3">
                      <h2 className="text-4xl font-black uppercase tracking-[0.32em] text-neutral-900">Next</h2>
                      <p className="text-[11px] uppercase tracking-[0.45em] text-neutral-500">
                        ({getCategoryCode(nextProject)})
                      </p>
                    </header>
                    <div className="overflow-hidden rounded-[28px] border border-neutral-900 bg-neutral-100">
                      {nextProject.image ? (
                        <motion.img
                          src={nextProject.image}
                          alt={nextProject.title}
                          className="h-full w-full object-cover"
                          whileHover={{ scale: 1.04 }}
                          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-4xl font-black uppercase tracking-[0.3em] text-neutral-500">
                          {nextProject.title
                            .split(" ")
                            .map(w => w[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-base font-semibold uppercase tracking-[0.32em] text-neutral-900">
                        {nextProject.title}
                      </h3>
                      <button
                        onClick={() => router.push(`/project/${nextProject.id}`)}
                        className="w-full rounded-full border border-neutral-900 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.45em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
                      >
                        Explore Project
                      </button>
                    </div>
                  </article>
                )}
              </div>
            </div>
          </div>

          {/* Info Sidebar */}
          <AnimatePresence>
            {infoVisible && (
              <motion.aside
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="lg:sticky lg:top-32"
              >
                <div className="flex flex-col gap-8 rounded-[32px] border border-neutral-900 bg-white p-8 shadow-[0_24px_54px_rgba(15,23,42,0.1)]">
                  <section className="space-y-3">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.45em] text-neutral-600">Overview</h2>
                    <p className="text-sm leading-relaxed text-neutral-700">
                      {project.description}
                    </p>
                  </section>

                  {project.objectives?.length ? (
                    <section className="space-y-3">
                      <h2 className="text-xs font-semibold uppercase tracking-[0.45em] text-neutral-600">Objectives</h2>
                      <ul className="space-y-2 text-sm leading-relaxed text-neutral-700">
                        {project.objectives.map((objective, index) => (
                          <li key={index}>{objective}</li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  {project.outcomes?.length ? (
                    <section className="space-y-3">
                      <h2 className="text-xs font-semibold uppercase tracking-[0.45em] text-neutral-600">Outcomes</h2>
                      <ul className="space-y-2 text-sm leading-relaxed text-neutral-700">
                        {project.outcomes.map((outcome, index) => (
                          <li key={index}>{outcome}</li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  <section className="space-y-3">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.45em] text-neutral-600">Links</h2>
                    <div className="grid gap-3">
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-full items-center justify-center rounded-full border border-neutral-900 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.45em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
                        >
                          Visit Live Site
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-full items-center justify-center rounded-full border border-neutral-900 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.45em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
                        >
                          View Source Code
                        </a>
                      )}
                    </div>
                  </section>

                  <section className="space-y-2 text-[11px] uppercase tracking-[0.45em] text-neutral-500">
                    {project.category && (
                      <p>
                        Category <span className="text-neutral-800">{project.category}</span>
                      </p>
                    )}
                    {project.project_date && (
                      <p>
                        Date <span className="text-neutral-800">{project.project_date}</span>
                      </p>
                    )}
                  </section>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </div>

      <button
        onClick={() => setInfoVisible(!infoVisible)}
        className="fixed bottom-8 right-8 z-50 inline-flex items-center gap-2 rounded-full border border-neutral-900 bg-white px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.45em] text-neutral-900 shadow-[0_16px_32px_rgba(15,23,42,0.12)] transition hover:bg-neutral-900 hover:text-white lg:bottom-12 lg:right-12"
      >
        {infoVisible ? "◦ Hide Info" : "◦ Info"}
      </button>
    </section>
  )
}
