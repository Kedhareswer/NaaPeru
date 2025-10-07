import { ProjectDetail } from "../../../components/project-detail"
import { promises as fs } from "fs"
import path from "path"
import { notFound } from "next/navigation"

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const projectsPath = path.join(process.cwd(), "public", "projects.json")
  const projectsRaw = await fs.readFile(projectsPath, "utf8")
  const projects = JSON.parse(projectsRaw)

  const project = projects.find((p: any) => p.id.toString() === id)

  if (!project) {
    notFound()
  }

  return <ProjectDetail project={project} allProjects={projects} />
}
