"use client"

import { EnhancedProjectCard } from "@/components/enhanced-project-card"
import { useRouter } from "next/navigation"

export interface ProjectForCard {
  id: number
  title: string
  description?: string
  categories: string[]
  date?: string | null
  image: string
  demoUrl?: string | null
  featured?: boolean
  technologies?: string[]
}

export default function ProjectsGrid({ projects }: { projects: ProjectForCard[] }) {
  const router = useRouter()

  function slugify(s: string) {
    return (s || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  function onViewDetails(p: ProjectForCard) {
    const slug = `${p?.id}-${slugify(p?.title || '')}`
    router.push(`/projects/${slug}`)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {(projects || []).map((p, idx) => (
        <EnhancedProjectCard
          key={p.id ?? idx}
          project={{
            id: p.id,
            title: p.title,
            description: p.description ?? "",
            categories: Array.isArray(p.categories) ? p.categories : [],
            date: p.date ?? "",
            image: p.image ?? "/projects/digit-2.png",
            demoUrl: p.demoUrl ?? undefined,
            featured: Boolean(p.featured),
            technologies: Array.isArray(p.technologies) ? p.technologies : [],
          } as any}
          index={idx}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  )
}
