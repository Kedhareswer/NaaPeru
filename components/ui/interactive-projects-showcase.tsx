"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Loader2 } from 'lucide-react'

// Type aligned with /api/projects response
type ProjectSlide = {
  title: string
  description: string
  image: string
  demoUrl?: string
  githubUrl?: string
}

export default function ScrollingProjectsShowcase() {
  const [slides, setSlides] = useState<ProjectSlide[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const stickyPanelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch('/api/projects?featured=true&limit=4', { cache: 'no-store' })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        const projects = Array.isArray(data.projects) ? data.projects : []
        const mapped: ProjectSlide[] = projects.map((p: any) => ({
          title: p.title,
          description: p.description,
          image: p.image,
          demoUrl: p.demoUrl,
          githubUrl: p.githubUrl,
        }))
        setSlides(mapped.slice(0, 4))
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollableHeight = container.scrollHeight - window.innerHeight
      const steps = Math.max(slides.length, 1)
      const stepHeight = scrollableHeight / steps
      const newActiveIndex = Math.min(
        Math.max(steps - 1, 0),
        Math.floor(container.scrollTop / stepHeight)
      )
      if (!Number.isNaN(newActiveIndex)) setActiveIndex(newActiveIndex)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [slides.length])

  // Fixed, neutral styling (ignore yellow background requirement)
  const dynamicStyles: React.CSSProperties = {
    backgroundColor: '#ffffff',
    color: '#111827',
    transition: 'background-color 0.7s ease, color 0.7s ease',
  }

  const gridPatternStyle: React.CSSProperties = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    '--grid-color': 'rgba(0, 0, 0, 0.12)',
    backgroundImage: `
      linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
      linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
    `,
    backgroundSize: '3.5rem 3.5rem',
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-600">Failed to load projects: {error}</div>
    )
  }

  if (slides.length === 0) {
    return <div className="text-center text-gray-500">No featured projects found.</div>
  }

  const active = slides[Math.min(activeIndex, slides.length - 1)]

  return (
    <div
      ref={scrollContainerRef}
      className="h-screen w-full overflow-y-auto"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div style={{ height: `${slides.length * 100}vh` }}>
        <div
          ref={stickyPanelRef}
          className="sticky top-0 h-screen w-full flex flex-col items-center justify-center"
          style={dynamicStyles}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full max-w-7xl mx-auto">
            {/* Left Column */}
            <div className="relative flex flex-col justify-center p-8 md:p-16 border-r border-black/10">
              {/* Pagination Bars */}
              <div className="absolute top-16 left-16 flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const container = scrollContainerRef.current
                      if (container) {
                        const scrollableHeight = container.scrollHeight - window.innerHeight
                        const stepHeight = scrollableHeight / slides.length
                        container.scrollTo({ top: stepHeight * index, behavior: 'smooth' })
                      }
                    }}
                    className={`h-1 rounded-full transition-all duration-500 ease-in-out ${
                      index === activeIndex ? 'w-12 bg-black/80' : 'w-6 bg-black/20'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <div className="relative h-64 w-full">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      index === activeIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                  >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{slide.title}</h2>
                    <p className="mt-6 text-base md:text-lg max-w-md text-gray-700">{slide.description}</p>
                  </div>
                ))}
              </div>

              {/* Action */}
              <div className="absolute bottom-16 left-16">
                {active?.demoUrl || active?.githubUrl ? (
                  <a
                    href={(active.demoUrl || active.githubUrl) as string}
                    target="_blank"
                    rel="noreferrer"
                    className="px-8 py-3 bg-black text-white font-semibold rounded-full uppercase tracking-wider hover:bg-gray-800 transition-colors"
                  >
                    View Project
                  </a>
                ) : null}
              </div>
            </div>

            {/* Right Column: Images */}
            <div className="hidden md:flex items-center justify-center p-8" style={gridPatternStyle}>
              <div className="relative w-[50%] h-[80vh] rounded-2xl overflow-hidden shadow-2xl border-4 border-black/5">
                <div
                  className="absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateY(-${activeIndex * 100}%)` }}
                >
                  {slides.map((slide, index) => (
                    <div key={index} className="w-full h-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={slide.image || 'https://placehold.co/800x1200/e2e8f0/4a5568?text=No+Image'}
                        alt={slide.title}
                        className="h-full w-full object-cover"
                        onError={(e: any) => {
                          e.target.onerror = null
                          e.target.src = 'https://placehold.co/800x1200/e2e8f0/4a5568?text=Image+Not+Found'
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
