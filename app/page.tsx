import { LandingHero } from "@/components/landing-hero"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { Footer } from "@/components/footer"
import { promises as fs } from "fs"
import path from "path"

export default async function Page() {
  const profilePath = path.join(process.cwd(), "public", "profile.json")
  const projectsPath = path.join(process.cwd(), "public", "projects.json")

  const [profileRaw, projectsRaw] = await Promise.all([
    fs.readFile(profilePath, "utf8"),
    fs.readFile(projectsPath, "utf8"),
  ])

  const profile = JSON.parse(profileRaw)
  let projects = JSON.parse(projectsRaw)

  // Ensure descending order by project_date (fallback to created_at)
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
  const parseProjectDate = (value: string | undefined): number | null => {
    if (!value) return null
    const t = Date.parse(value)
    if (!Number.isNaN(t)) return t
    const m = value.trim().toLowerCase().match(/^([a-z]+)\s+(\d{4})$/)
    if (m) {
      const month = monthMap[m[1]]
      const year = parseInt(m[2], 10)
      if (month !== undefined) return new Date(year, month, 1).getTime()
    }
    return null
  }
  const toTime = (p: any) => {
    const main = parseProjectDate(p.project_date)
    if (main !== null) return main
    const fallback = Date.parse((p.created_at ?? "").toString())
    return Number.isNaN(fallback) ? 0 : fallback
  }
  projects = [...projects].sort((a: any, b: any) => toTime(b) - toTime(a))
  
  return (
    <div>
      <LandingHero profile={profile} />
      <ProjectsSection projects={projects} />
      <ExperienceSection profile={profile} />
      <Footer
        name={profile.personalInfo?.name}
        title={profile.personalInfo?.title}
        email={profile.personalInfo?.email}
        phone={profile.personalInfo?.phone}
        location={profile.personalInfo?.location}
        socials={{
          instagram: profile.personalInfo?.linkedin,
          behance: profile.personalInfo?.github,
          savee: profile.personalInfo?.kaggle,
          spotify: profile.personalInfo?.portfolio,
        }}
      />
    </div>
  )
}
