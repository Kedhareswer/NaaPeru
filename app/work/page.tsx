import { WorkSection } from "@/components/work-section"
import { promises as fs } from "fs"
import path from "path"

export default async function WorkPage() {
  const profilePath = path.join(process.cwd(), "public", "profile.json")
  const projectsPath = path.join(process.cwd(), "public", "projects.json")

  const [profileRaw, projectsRaw] = await Promise.all([
    fs.readFile(profilePath, "utf8"),
    fs.readFile(projectsPath, "utf8"),
  ])

  const profile = JSON.parse(profileRaw)
  const projects = JSON.parse(projectsRaw)

  // Filter only featured projects
  const featuredProjects = projects.filter((p: any) => p.featured)

  return (
    <div>
      <WorkSection 
        projects={featuredProjects}
        name={profile.personalInfo?.name}
      />
    </div>
  )
}
