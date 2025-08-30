import { notFound, redirect } from 'next/navigation'
import sql from '@/lib/db'

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
  return d.toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric'
  })
}

function extractIdFromSlug(slug: string): number | null {
  // Expect format: `${id}-${slug-text}` but also support just numeric
  if (!slug) return null
  const first = slug.split('-')[0]
  const id = Number.parseInt(first, 10)
  return Number.isFinite(id) ? id : null
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default async function ProjectDetailsBySlugPage({ params }: { params: { slug: string } }) {
  const id = extractIdFromSlug(params.slug)
  if (id == null) notFound()

  const rows = await sql`SELECT * FROM projects WHERE id = ${id} LIMIT 1`
  const p = (rows as unknown as ProjectRow[])?.[0]
  if (!p) notFound()
  // Ensure canonical URL matches `/projects/{id}-{slugified-title}`
  const canonical = `${p.id}-${slugify(p.title || String(p.id))}`
  if (params.slug !== canonical) {
    redirect(`/projects/${canonical}`)
  }

  const dateLabel = formatDate(p.project_date)
  const technologies = Array.isArray(p.technologies) ? p.technologies : []
  const objectives = Array.isArray(p.objectives) ? p.objectives : []
  const outcomes = Array.isArray(p.outcomes) ? p.outcomes : []

  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">{p.title}</h1>
            {p.category || dateLabel ? (
              <p className="mt-3 text-sm text-gray-500">{p.category}{p.category && dateLabel ? ' · ' : ''}{dateLabel}</p>
            ) : null}
          </div>
          <div className="flex items-center gap-3">
            {p.demo ? (
              <a
                href={p.demo}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-800"
              >
                Open Live
              </a>
            ) : null}
            {p.github ? (
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image}
              alt={p.title}
              className="w-full rounded-2xl border border-black/5 shadow-md object-cover max-h-[520px]"
            />
          </div>
        ) : null}

        {technologies.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {technologies.map((t, i) => (
              <span key={i} className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-800 text-xs border border-gray-200">
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
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {outcomes.length > 0 ? (
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Outcomes</h2>
            <ul className="mt-3 list-disc pl-6 space-y-1 text-gray-700">
              {outcomes.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    </main>
  )
}
