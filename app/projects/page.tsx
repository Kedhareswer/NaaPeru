import { promises as fs } from "fs"
import path from "path"
import { Github, ExternalLink, Star } from "lucide-react"
import type { Project } from "@/types/project"

function parseProjectDate(value?: string | null): number | null {
  if (!value) return null
  const t = Date.parse(value)
  if (!Number.isNaN(t)) return t
  const monthMap: Record<string, number> = {
    jan: 0, january: 0,
    feb: 1, february: 1,
    mar: 2, march: 2,
    apr: 3, april: 3,
    may: 4,
    jun: 5, june: 5,
    jul: 6, july: 6,
    aug: 7, august: 7,
    sep: 8, sept: 8, september: 8,
    oct: 9, october: 9,
    nov: 10, november: 10,
    dec: 11, december: 11,
  }
  const m = value.trim().toLowerCase().match(/^([a-z]+)\s+(\d{4})$/)
  if (m) {
    const month = monthMap[m[1]]
    const year = parseInt(m[2], 10)
    if (month !== undefined) return new Date(year, month, 1).getTime()
  }
  return null
}

export default async function ProjectsPage() {
  const projectsPath = path.join(process.cwd(), "public", "projects.json")
  const raw = await fs.readFile(projectsPath, "utf8")
  const all: Project[] = JSON.parse(raw)

  const toTime = (p: Project) => {
    const main = parseProjectDate(p.project_date || undefined)
    if (main !== null) return main
    const fallback = Date.parse(String(p.created_at ?? ""))
    return Number.isNaN(fallback) ? 0 : fallback
  }

  const projects = [...all].sort((a, b) => toTime(b) - toTime(a))

  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-16">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur-md border border-white/50 px-3 py-1 text-[11px] text-slate-700 shadow-sm">
            All Projects
          </div>
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">Explore the work</h1>
          <p className="mt-2 text-sm text-slate-600">A clean overview of everything — minimal, fast, and informative.</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="group rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300 hover:bg-white/70">
              {/* Image */}
              <div className="relative h-44 w-full overflow-hidden">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-100 text-slate-700 text-2xl font-semibold">
                    {project.title.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </div>
                )}
                {project.featured && (
                  <div className="absolute top-3 right-3 rounded-full bg-white/80 backdrop-blur-md border border-white/60 text-[10px] px-2 py-0.5 font-semibold text-slate-800 inline-flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500" /> Featured
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base md:text-lg font-semibold text-slate-900 leading-snug line-clamp-2">{project.title}</h3>
                  {project.category && (
                    <span className="shrink-0 rounded-full bg-white/60 backdrop-blur px-2 py-0.5 text-[10px] text-slate-700 border border-white/50">{project.category}</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0,3).map(t => (
                    <span key={t} className="rounded-full bg-white/70 border border-white/60 px-2 py-0.5 text-[10px] text-slate-700">{t}</span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/70 border border-white/60 text-slate-800 hover:bg-white transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
