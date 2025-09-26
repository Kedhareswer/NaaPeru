"use client"

import Image from "next/image"
import Link from "next/link"
import profile from "@/data/profile.json"

function getFirstName(fullName?: string) {
  if (!fullName) return ""
  const [first] = fullName.split(" ")
  return first
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between w-full py-2 border-b border-black/10 hover:bg-black/5 transition-colors"
    >
      <span className="text-sm">{children}</span>
      <span aria-hidden className="text-sm">↗</span>
    </a>
  )
}

export default function BorisLanding() {
  const name = profile.personalInfo?.name ?? ""
  const firstName = getFirstName(name)
  const location = profile.personalInfo?.location ?? ""

  const experiences = profile.experience ?? []
  const allProjects = (profile as any).projects ?? []
  // Select specific projects in the requested order and cap at 5 total
  const priorityOrder = [
    "PromptForger",
    "Data Notebook",
    "QuantumPDF ChatApp VectorDB",
    "Thesis Flow AI",
  ]
  let projects = allProjects
    .filter((p: any) =>
      priorityOrder.some((key) => p.title?.toLowerCase().includes(key.toLowerCase()))
    )
    .sort((a: any, b: any) => {
      const ia = priorityOrder.findIndex((key) =>
        a.title?.toLowerCase().includes(key.toLowerCase())
      )
      const ib = priorityOrder.findIndex((key) =>
        b.title?.toLowerCase().includes(key.toLowerCase())
      )
      return ia - ib
    })
  if (projects.length < 5) {
    const picked = new Set(projects.map((p: any) => p.title))
    const extras = allProjects
      .filter((p: any) => !picked.has(p.title))
      .slice(0, 5 - projects.length)
    projects = [...projects, ...extras]
  }
  projects = projects.slice(0, 5)

  return (
    <section className="w-full min-h-screen">
      <div className="w-full grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-0 pr-2 sm:pr-4 lg:pr-8">
        <aside className="lg:sticky lg:top-0 self-start lg:h-screen lg:overflow-auto lg:border-r border-black/10">
          <div className="space-y-2 p-2 sm:p-4 lg:p-2">
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-100 overflow-hidden border border-black/10 mx-auto lg:mx-0">
              <Image src="/me.jpg" alt={name} width={160} height={160} className="object-cover w-full h-full" priority />
            </div>

            <p className="text-sm leading-snug text-black/80 text-center lg:text-left">
              AI/ML specialist building intelligent systems that solve real-world problems through data-driven innovation.
            </p>

            <div className="space-y-1">
              <Link href="/#projects" className="block py-2 sm:py-1 border-b border-black/10 hover:bg-black/5 text-sm text-center lg:text-left">Projects</Link>
              <a href="/Kedhar_July_DataAnalyst.pdf" className="block py-2 sm:py-1 border-b border-black/10 hover:bg-black/5 text-sm text-center lg:text-left" download>
                Download Resume
              </a>
              <Link href="/#experience" className="block py-2 sm:py-1 border-b border-black/10 hover:bg-black/5 text-sm text-center lg:text-left">Experience</Link>
              <Link href="/#why-hire-me" className="block py-2 sm:py-1 border-b border-black/10 hover:bg-black/5 text-sm text-center lg:text-left">Why Choose Me</Link>
            </div>

            <div className="pt-2 space-y-1">
              <ExternalLink href={profile.personalInfo?.linkedin ?? "#"}>LinkedIn Profile</ExternalLink>
              <ExternalLink href={`mailto:${profile.personalInfo?.email}`}>Send Email</ExternalLink>
              <ExternalLink href={`https://wa.me/919398911432`}>WhatsApp Chat</ExternalLink>
              <div className="text-xs text-black/60 pt-1 text-center lg:text-left">📍 {location}</div>
            </div>
          </div>
        </aside>

        <div className="">
          <div className="border-b border-black/10 p-2 sm:p-4 lg:p-2">
            <h1 className="uppercase font-extrabold tracking-[-.02em] leading-[0.9] text-[clamp(1.5rem,5vw,3.5rem)] sm:text-[clamp(1.8rem,6vw,3.5rem)]">
              Hey, I'm <span className="inline-block">🔲</span> {firstName} — AI/ML Engineer turned Data Scientist and <span className="inline-block">↩</span> back.
            </h1>
            <div className="text-[clamp(0.9rem,2.5vw,1.8rem)] sm:text-[clamp(1rem,3vw,1.8rem)] font-semibold text-black/30 uppercase mt-2 tracking-wide">
              I'm currently open to work
            </div>
          </div>

          <div id="why-hire-me" className="border-b border-black/10 p-2 sm:p-4 lg:p-2">
            <div className="text-xs tracking-widest uppercase text-black/60 mb-2">Why Choose Me</div>
            <p className="text-sm text-black/80 mb-3">
              5+ AI/ML projects • 90% accuracy in deep learning models • Real-time processing optimization • Medical imaging expertise
            </p>
            
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-sm">
              <a href={`mailto:${profile.personalInfo?.email}`} className="text-blue-600 hover:underline break-all">
                {profile.personalInfo?.email}
              </a>
              <a href={`tel:${profile.personalInfo?.phone}`} className="text-blue-600 hover:underline">
                {profile.personalInfo?.phone}
              </a>
              <a href={profile.personalInfo?.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                GitHub
              </a>
            </div>
          </div>

          <div id="experience" className="relative">
            <div className="sticky top-0 bg-white z-[100] px-2 lg:px-2 py-6 sm:py-8 border-b border-black/10">
              <div className="text-xs tracking-widest uppercase text-black/60">Experience</div>
            </div>
            <div className="relative">
              {experiences.map((exp: any, idx: number) => (
                <div 
                  key={`${exp.company}-${idx}`}
                  className="sticky bg-white border border-black/10 shadow-lg"
                  style={{ 
                    top: '80px',
                    zIndex: 10 + idx,
                    marginBottom: idx === experiences.length - 1 ? '0' : '-1px'
                  }}
                >
                  <div className="p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 space-y-2 sm:space-y-0">
                      <div className="flex-1">
                        <h3 className="font-semibold text-base sm:text-lg text-black/90 leading-tight">{exp.role}</h3>
                        <p className="text-sm text-black/70">@{exp.company}</p>
                        <p className="text-xs text-black/50">{exp.location}</p>
                      </div>
                      <div className="text-left sm:text-right flex-shrink-0">
                        <p className="text-sm font-medium text-black/80">{exp.duration}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {exp.achievements?.map((achievement: string, achievementIdx: number) => (
                        <div key={achievementIdx} className="flex items-start gap-2">
                          <span className="text-black/40 text-xs mt-1 flex-shrink-0">•</span>
                          <p className="text-sm text-black/80 leading-relaxed">{achievement}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="projects" className="relative">
            <div className="sticky top-0 bg-white z-[100] px-2 lg:px-2 py-6 sm:py-8 border-b border-black/10">
              <div className="text-xs tracking-widest uppercase text-black/60">Projects</div>
            </div>
            <div className="relative">
              {projects.map((proj: any, idx: number) => (
                <a 
                  key={`${proj.title}-${idx}`}
                  href={proj.demo ?? proj.github ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sticky bg-white border border-black/10 shadow-lg block hover:shadow-xl transition-shadow"
                  style={{ 
                    top: '80px',
                    zIndex: 20 + idx,
                    marginBottom: idx === projects.length - 1 ? '0' : '-1px'
                  }}
                >
                  <div className="p-2 sm:p-3 border-b border-black/10 text-xs sm:text-sm text-black/70 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-black/50">{proj.category ?? "Project"}</span>
                      <span className="text-black/30">/</span>
                      <span className="truncate lowercase">{proj.title}</span>
                      <span className="text-black/40 ml-1">↗</span>
                    </div>
                    <div className="flex items-center gap-2 sm:ml-auto">
                      <span className="text-xs text-black/40">{proj.date}</span>
                      <span className="text-xs text-blue-600">
                        {proj.demo ? "Live Demo" : "View Code"}
                      </span>
                    </div>
                  </div>
                  <div className={`relative ${idx % 3 === 0 ? "bg-[#5AA5FF]" : idx % 3 === 1 ? "bg-[#e9eef7]" : "bg-[#f5f7fa]"}`}>
                    <Image
                      src={proj.image ?? "/projects/research-bolt.png"}
                      alt={proj.title}
                      width={1600}
                      height={900}
                      className="w-full h-auto block"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
