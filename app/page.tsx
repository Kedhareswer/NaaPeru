"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "@/components/header"
import Intro from "@/components/intro"
import About from "@/components/about"
import SkillsParticipations from "@/components/skills-participations"
import { EnhancedProjectCard } from "@/components/enhanced-project-card"
import { useRouter } from "next/navigation"
import CustomCursor from "@/components/custom-cursor"
import LoadingScreen from "@/components/loading-screen"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"
import SkillsEndorsement from "@/components/skills-endorsement"
import LatestInsights from "@/components/latest-insights"
// Projects section uses ScrollingProjectsShowcase (window-scroll scroller)
import FloatingChatBot from "@/components/floating-chat-bot"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [projects, setProjects] = useState<any[]>([])
  const [projLoading, setProjLoading] = useState(true)
  const [projError, setProjError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])
  
  // Load homepage projects (latest 3)
  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setProjLoading(true)
        const res = await fetch('/api/projects?limit=3', { cache: 'no-store' })
        const json = await res.json()
        if (!cancelled) setProjects(Array.isArray(json?.projects) ? json.projects : [])
      } catch (e) {
        if (!cancelled) setProjError('Failed to load projects')
      } finally {
        if (!cancelled) setProjLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  function slugify(s: string) {
    return (s || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  function handleViewDetails(p: any) {
    const slug = `${p?.id}-${slugify(p?.title || '')}`
    router.push(`/projects/${slug}`)
  }

  return (
    <main className="relative bg-white text-black">
      <CustomCursor />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Header />
            <Intro />
            <About />
            <SkillsParticipations />
            <SkillsEndorsement />
            <LatestInsights />
            <section id="featured-projects" className="relative" aria-labelledby="featured-projects-heading">
              <h2 id="featured-projects-heading" className="sr-only">Featured projects</h2>
              <div className="max-w-6xl mx-auto px-6 md:px-10 py-12">
                {projError ? (
                  <p className="text-red-600 text-sm">{projError}</p>
                ) : null}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(projects || []).map((p, idx) => {
                    const cardProject = {
                      id: p?.id,
                      title: p?.title ?? '',
                      description: p?.description ?? '',
                      categories: Array.isArray(p?.categories) ? p.categories : [],
                      date: p?.date ?? '',
                      image: p?.image ?? '/projects/digit-2.png',
                      demoUrl: p?.demoUrl,
                      featured: Boolean(p?.featured),
                      technologies: Array.isArray(p?.technologies) ? p.technologies : [],
                    }
                    return (
                      <EnhancedProjectCard
                        key={cardProject.id ?? idx}
                        project={cardProject as any}
                        index={idx}
                        onViewDetails={handleViewDetails}
                      />
                    )
                  })}
                </div>
                <div className="mt-10 flex justify-center">
                  <a
                    href="/projects"
                    className="inline-flex items-center px-6 py-3 rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-800"
                  >
                    View All Projects
                  </a>
                </div>
              </div>
            </section>
            <Testimonials />
            <FloatingChatBot />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
