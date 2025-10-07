import { LandingHero } from "@/components/landing-hero"
import { ProjectsShowcase } from "@/components/projects-showcase"
import { Footer } from "@/components/footer"
import { PageWrapper } from "@/components/page-wrapper"
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
  const projects = JSON.parse(projectsRaw)
  
  return (
    <PageWrapper>
      <div>
        <LandingHero profile={profile} />
        <ProjectsShowcase projects={projects} />
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
    </PageWrapper>
  )
}
