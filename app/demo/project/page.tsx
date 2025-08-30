import ProjectDetails, { type ProjectDetailsModel } from "@/components/ui/project-details"

const sampleProject: ProjectDetailsModel = {
  id: 1,
  title: "Portfolio Nexus",
  description:
    "A modern, responsive personal portfolio that showcases projects with rich animations, clean typography, and accessible UI patterns. Built to be blazing fast and effortlessly maintainable.",
  image: "/projects/portfolio-nexus.png",
  technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  githubUrl: "https://github.com/",
  kaggleUrl: null,
  demoUrl: "https://example.com",
  category: "Portfolio",
  date: "2025",
  objectives: [
    "Replicate pixel-perfect hero with staggered animations",
    "Ensure conditional social icons with brand styling",
  ],
  outcomes: [
    "Improved visual consistency across components",
    "Reusable animation primitives for future pages",
  ],
}

export default function DemoProjectPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      <div className="pt-6">
        <ProjectDetails project={sampleProject} />
      </div>
    </main>
  )
}
