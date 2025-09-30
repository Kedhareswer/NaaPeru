import { promises as fs } from "fs"
import path from "path"
import { WorkSection } from "@/components/work-section"
import type { Project } from "@/types/project"

export default async function WorkPage() {
  const projectsPath = path.join(process.cwd(), "public", "projects.json")
  const raw = await fs.readFile(projectsPath, "utf8")
  const all: Project[] = JSON.parse(raw)

  // Only featured
  const featured = all.filter(p => !!p.featured)

  return (
    <main className="w-full h-screen">
      <WorkSection projects={featured} name="Kedhar" />
    </main>
  )
}
