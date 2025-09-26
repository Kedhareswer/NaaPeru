import { notFound, permanentRedirect } from 'next/navigation'
import sql from '@/lib/db'
import Image from 'next/image'
import Link from 'next/link'
import { toSafeExternalHref } from '@/lib/utils'
import { ArrowLeft, Home } from 'lucide-react'

export const dynamic = 'force-dynamic'

interface ProjectRow {
  id: number
  title: string
  description: string
  technologies?: string[]
  github?: string
  demo?: string
  category?: string
  project_date?: string | null
  image?: string | null
  featured?: boolean
  objectives?: string[] | null
  outcomes?: string[] | null
}

function formatDate(input?: string | null) {
  if (!input) return null
  const d = new Date(input)
  if (Number.isNaN(d.getTime())) return null
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC'
  }).format(d)
}

function extractIdFromSlug(slug: string): number | null {
  // Expect format: `${id}-${slug-text}` but also support just numeric
  if (!slug) return null
  const first = slug.split('-')[0]
  if (!/^\d+$/.test(first)) return null
  return Number.parseInt(first, 10)
}

function slugify(s: string) {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default async function ProjectDetailsBySlugPage({
  params,
  searchParams
}: { params: Promise<{ slug: string }>; searchParams?: { [key: string]: string | string[] | undefined } }) {
  const { slug } = await params
  const id = extractIdFromSlug(slug)
  if (id == null) notFound()

  const rows = await sql`
    SELECT id, title, description, technologies, github, demo, category, project_date, image, featured, objectives, outcomes
    FROM projects WHERE id = ${id} LIMIT 1
  `
  const p = (rows as unknown as ProjectRow[])?.[0]
  if (!p) notFound()
  // Ensure canonical URL matches `/projects/{id}-{slugified-title}`
  const canonical = p.title && p.title.trim() ? `${p.id}-${slugify(p.title)}` : `${p.id}`
  if (slug !== canonical) {
    const qs = new URLSearchParams(
      Object.entries(searchParams ?? {}).flatMap(([k, v]) =>
        Array.isArray(v) ? v.map(val => [k, val]) : v != null ? [[k, v]] : []
      ) as [string, string][]
    ).toString()
    permanentRedirect(`/projects/${canonical}${qs ? `?${qs}` : ''}`)
  }

  const dateLabel = formatDate(p.project_date)
  const technologies = Array.isArray(p.technologies) ? p.technologies : []
  const objectives = Array.isArray(p.objectives) ? p.objectives : []
  const outcomes = Array.isArray(p.outcomes) ? p.outcomes : []
  const demoHref = toSafeExternalHref(p.demo)
  const githubHref = toSafeExternalHref(p.github)

  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link 
            href="/" 
            className="flex items-center hover:text-gray-700 transition-colors"
          >
            <Home className="w-4 h-4 mr-1" />
            Home
          </Link>
          <span>/</span>
          <Link 
            href="/projects" 
            className="hover:text-gray-700 transition-colors"
          >
            Projects
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate max-w-xs">{p.title}</span>
        </nav>

        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/projects"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </div>

        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">{p.title}</h1>
            {p.category || dateLabel ? (
              <p className="mt-3 text-sm text-gray-500">{p.category}{p.category && dateLabel ? ' · ' : ''}{dateLabel}</p>
            ) : null}
          </div>
          <div className="flex items-center gap-3">
            {demoHref ? (
              <a
                href={demoHref}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-800"
              >
                Open Live
              </a>
            ) : null}
            {githubHref ? (
              <a
                href={githubHref}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-black/20 text-sm font-semibold hover:bg-black/5"
              >
                GitHub
              </a>
            ) : null}
          </div>
        </div>

        <p className="mt-6 text-gray-700 max-w-3xl">{p.description}</p>

        {p.image ? (
          <div className="mt-10">
            <div className="relative w-full max-h-[520px]">
              <Image
                src={p.image}
                alt={p.title || 'Project image'}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="rounded-2xl border border-black/5 shadow-md object-cover"
                priority
              />
            </div>
          </div>
        ) : null}

        {technologies.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {technologies.map((t, i) => (
              <span key={`${t}-${i}`} className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-800 text-xs border border-gray-200">
                {t}
              </span>
            ))}
          </div>
        ) : null}

        {objectives.length > 0 ? (
          <div className="mt-10">
            <h2 className="text-xl font-semibold">Objectives</h2>
            <ul className="mt-3 list-disc pl-6 space-y-1 text-gray-700">
              {objectives.map((o, i) => (
                <li key={`${o}-${i}`}>{o}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {outcomes.length > 0 ? (
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Outcomes</h2>
            <ul className="mt-3 list-disc pl-6 space-y-1 text-gray-700">
              {outcomes.map((o, i) => (
                <li key={`${o}-${i}`}>{o}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    </main>
  )
}
