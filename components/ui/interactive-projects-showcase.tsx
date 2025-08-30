"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Loader2 } from 'lucide-react'
import IPhoneMockup from '@/components/ui/iphone-mockup'
import Link from 'next/link'

// Type aligned with /api/projects response
type ProjectSlide = {
  id?: string | number
  slug?: string
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
  const [iphoneScale, setIphoneScale] = useState(0.85)

  const sectionRef = useRef<HTMLDivElement | null>(null)
  const stickyPanelRef = useRef<HTMLDivElement | null>(null)

  const slugify = (str: string | undefined): string | undefined =>
    str
      ?.toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')

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
          id: p.id ?? p.project_id ?? p.uuid,
          slug: p.slug ?? slugify(p.title),
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

  // Drive progress from window scroll so the section integrates into homepage flow
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el || slides.length === 0) return
      const rectTop = el.getBoundingClientRect().top + window.scrollY
      const viewportH = window.innerHeight
      const stepH = viewportH
      const localScroll = window.scrollY - rectTop
      const idx = Math.floor(localScroll / stepH)
      const clamped = Math.min(slides.length - 1, Math.max(0, idx))
      if (!Number.isNaN(clamped)) setActiveIndex(clamped)
    }

    const onResize = () => onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [slides.length])

  // Responsive scaling for the iPhone mockup so it fits within the viewport height safely
  useEffect(() => {
    const OUTER_HEIGHT_14PRO = 852 + 24 // screenHeight + 2*bezel for model "14-pro"
    const computeScale = () => {
      // Aim a bit smaller (66% of viewport) to prevent header overlap/clipping
      const target = Math.max(420, Math.min(window.innerHeight * 0.66, 900))
      const s = target / OUTER_HEIGHT_14PRO
      setIphoneScale(Math.max(0.55, Math.min(1.1, s)))
    }
    computeScale()
    window.addEventListener('resize', computeScale)
    return () => window.removeEventListener('resize', computeScale)
  }, [])

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
    <div ref={sectionRef} className="relative w-full" style={{ height: `${slides.length * 100}vh` }}>
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
                      const el = sectionRef.current
                      if (!el) return
                      const rectTop = el.getBoundingClientRect().top + window.scrollY
                      const viewportH = window.innerHeight
                      window.scrollTo({ top: rectTop + viewportH * index, behavior: 'smooth' })
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
                <Link
                  href={active?.id ? `/projects/${active.id}` : active?.slug ? `/projects/${active.slug}` : '/demo'}
                  prefetch={false}
                  className="px-8 py-3 bg-black text-white font-semibold rounded-full uppercase tracking-wider hover:bg-gray-800 transition-colors"
                >
                  View Project
                </Link>
              </div>
            </div>

            {/* Right Column: iPhone mockup showing the active website only */}
            <div className="hidden md:flex items-center justify-center p-8 overflow-visible isolate" style={gridPatternStyle}>
              {/* Use overflow-visible so CSS transforms inside the mockup don't get clipped */}
              <div className="relative w-full h-[80vh] overflow-visible flex items-center justify-center">
                <IPhoneMockup
                  model="14-pro"
                  color="space-black"
                  screenBg="#000"
                  safeArea={false}
                  scale={iphoneScale}
                  className="relative z-10 drop-shadow-2xl"
                >
                  {active?.demoUrl ? (
                    <div className="relative w-full h-full">
                      <iframe
                        src={active.demoUrl}
                        className="w-full h-full"
                        style={{ border: '0' }}
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        referrerPolicy="no-referrer"
                      />
                      <div className="pointer-events-none absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/40 to-transparent" />
                      <div className="absolute bottom-2 right-2">
                        <a
                          href={active.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="pointer-events-auto px-3 py-1.5 text-xs rounded-full bg-black/70 text-white hover:bg-black/90"
                        >
                          Open Live
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full">
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage:
                            `url(${active?.image || 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=1200&q=80'})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                    </div>
                  )}
                </IPhoneMockup>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}
