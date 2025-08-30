import sql from '@/lib/db'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

function isNumericId(v: string) {
  return /^\d+$/.test(v)
}

function parseMaybeArray(value: any): string[] {
  if (!value) return []
  if (Array.isArray(value)) return value.filter(Boolean)
  if (typeof value === 'string') {
    const s = value.trim()
    // JSON array
    if ((s.startsWith('[') && s.endsWith(']')) || (s.startsWith('"[') && s.endsWith(']"'))) {
      try {
        const json = JSON.parse(s.replace(/^"|"$/g, ''))
        return Array.isArray(json) ? json.filter(Boolean) : []
      } catch {
        // fall-through
      }
    }
    // Postgres text[] like {a,b,c}
    if (s.startsWith('{') && s.endsWith('}')) {
      return s
        .slice(1, -1)
        .split(',')
        .map((x) => x.replace(/^\"|\"$/g, '').trim())
        .filter(Boolean)
    }
    // comma separated
    if (s.includes(',')) return s.split(',').map((x) => x.trim()).filter(Boolean)
    if (s.length) return [s]
  }
  return []
}

function parseMaybeJSON<T = any>(value: any): T | undefined {
  if (!value) return undefined
  if (typeof value === 'object') return value as T
  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as T
    } catch {
      return undefined
    }
  }
  return undefined
}

async function getProject(param: string) {
  if (isNumericId(param)) {
    const id = Number(param)
    const rows = await sql`SELECT * FROM projects WHERE id = ${id} LIMIT 1`
    return rows?.[0]
  }
  // Try slug column if available
  try {
    const rows = await sql`SELECT * FROM projects WHERE slug = ${param} LIMIT 1`
    if (rows?.length) return rows[0]
  } catch {
    // ignore if slug column doesn't exist
  }
  // Fallback: try case-insensitive title match (safe parameterized LIKE)
  const titleGuess = param.replace(/-/g, ' ')
  const rows = await sql`SELECT * FROM projects WHERE LOWER(title) = LOWER(${titleGuess}) LIMIT 1`
  return rows?.[0]
}

export default async function ProjectDetailsPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)
  if (!project) return notFound()

  const technologies = parseMaybeArray((project as any).technologies)
  const objectives = parseMaybeArray((project as any).objectives)
  const outcomes = parseMaybeArray((project as any).outcomes)
  const screenshots = parseMaybeArray((project as any).screenshots || (project as any).gallery || (project as any).images)
  const metrics = parseMaybeJSON<Record<string, string | number>>((project as any).metrics)

  const title: string = (project as any).title || 'Project'
  const description: string = (project as any).description || ''
  const image: string | undefined = (project as any).image || (project as any).cover
  const demoUrl: string | undefined = (project as any).demo || (project as any).demo_url
  const githubUrl: string | undefined = (project as any).github || (project as any).github_url
  const date: string | undefined = (project as any).project_date || (project as any).date
  const category: string | undefined = (project as any).category

  return (
    <section className="py-10 md:py-14 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">{title}</h1>
            <div className="flex gap-3">
              {demoUrl && (
                <a href={demoUrl} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg bg-neutral-900 text-white hover:bg-black transition-colors">Live Demo</a>
              )}
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-50 transition-colors">GitHub</a>
              )}
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-neutral-600">
            {category && <span className="px-2 py-1 rounded-md bg-neutral-100">{category}</span>}
            {date && <span className="px-2 py-1 rounded-md bg-neutral-100">{new Date(date).toLocaleDateString()}</span>}
          </div>
        </div>

        {/* Hero Image */}
        {image && (
          <div className="mb-10 overflow-hidden rounded-2xl border border-neutral-200">
            <img src={image} alt={title} className="w-full h-auto object-cover" />
          </div>
        )}

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-8">
            {description && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Overview</h2>
                <p className="leading-relaxed text-neutral-700 whitespace-pre-wrap">{description}</p>
              </div>
            )}

            {!!objectives.length && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Objectives</h3>
                <ul className="list-disc ml-5 space-y-1 text-neutral-700">
                  {objectives.map((o, i) => (
                    <li key={i}>{o}</li>
                  ))}
                </ul>
              </div>
            )}

            {!!outcomes.length && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Outcomes</h3>
                <ul className="list-disc ml-5 space-y-1 text-neutral-700">
                  {outcomes.map((o, i) => (
                    <li key={i}>{o}</li>
                  ))}
                </ul>
              </div>
            )}

            {!!screenshots.length && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {screenshots.map((src, i) => (
                    <img key={i} src={src} alt={`Screenshot ${i + 1}`} className="w-full h-40 md:h-48 object-cover rounded-xl border border-neutral-200" />
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="md:col-span-1 space-y-6">
            {!!technologies.length && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((t, i) => (
                    <span key={i} className="text-sm px-2 py-1 rounded-md bg-neutral-100 border border-neutral-200">{t}</span>
                  ))}
                </div>
              </div>
            )}

            {metrics && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Key Metrics</h3>
                <ul className="space-y-1 text-sm text-neutral-700">
                  {Object.entries(metrics).map(([k, v]) => (
                    <li key={k} className="flex justify-between gap-4">
                      <span className="text-neutral-500">{k}</span>
                      <span className="font-medium">{String(v)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  )
}
