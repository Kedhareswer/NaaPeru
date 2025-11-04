import { ArrowUpRight } from "lucide-react";

export const WorkProjects = () => {

  const projects = [
    {
      number: "01",
      category: "AI Research Platform",
      title: "ThesisFlow-AI",
      description:
        "Collaborative research workspace with AI-assisted literature review, project planning, and real-time team workflows powered by Gemini, OpenAI, and Groq integrations.",
      tags: ["React", "Node.js", "AI Agents", "WebSocket"],
      image: "/projects/research-bolt.png",
      type: "WEB",
      github: "https://github.com/Kedhareswer/ai-project-planner",
      demo: "https://thesisflow-ai.vercel.app/",
      projectDate: "Ongoing",
    },
    {
      number: "02",
      category: "RAG Application",
      title: "QuantumPDF Chat App",
      description:
        "PDF intelligence assistant with RAG, adaptive chunking, and Vector DB support for instant, accurate document conversations.",
      tags: ["Next.js 15", "Tailwind", "Vector DB", "LLM"],
      image: "/projects/quantumpdf.png",
      type: "APP",
      github: "https://github.com/Kedhareswer/QuantumPDF_ChatApp_VectorDB",
      demo: "https://quantumn-pdf-chatapp.netlify.app/",
      projectDate: "Jun 2025",
    },
    {
      number: "03",
      category: "Data Experience",
      title: "Data Notebook",
      description:
        "Interactive data analysis notebook with rich visualizations, code execution, and multi-format data ingestion for analysts and teams.",
      tags: ["Next.js", "Radix UI", "Recharts", "TypeScript"],
      image: "/projects/data-notebook.png",
      type: "Detail Sheet",
      github: "https://github.com/Kedhareswer/Data_Science_Platform",
      demo: "https://data-science-platform.vercel.app/",
      projectDate: "Apr 2025",
    },
  ];

  const projectMockups: Record<string, string[]> = {
    "QuantumPDF Chat App": [
      "/projects/quantumpdf.png",
      "/projects/quantumpdf1.png",
      "/projects/quantumpdf3.png",
    ],
    "Data Notebook": [
      "/projects/data-notebook.png",
      "/projects/data-notebook1.png",
    ],
    "ThesisFlow-AI": [
      "/projects/research-bolt.png",
      "/projects/research-bolt-2.png",
    ],
  };

  const supportingProjects = projects.slice(1);

  return (
    <section id="work" className="relative bg-background pt-0 pb-3xl md:pb-4xl overflow-x-hidden overflow-y-visible">
      <div className="container-portfolio">
        <style>
          {`
            @keyframes marqueeX { from { transform: translateX(0); } to { transform: translateX(-100%); } }
            @keyframes revealUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
          `}
        </style>

        {/* Projects Grid - Magazine Layout */}
        <div className="grid-12 gap-6 md:gap-8">
          {supportingProjects.map((project, index) => {
            const template = index % 3;
            const mockups = projectMockups[project.title] || [project.image];

            if (template === 0) {
              return (
                <article
                  key={project.number}
                  className={`col-span-12 md:col-span-7 group relative flex h-full flex-col overflow-hidden border border-border/25 bg-[#070709] shadow-[0_30px_60px_-45px_rgba(0,0,0,0.8)]`}
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/5 to-transparent">
                    {mockups.slice(0, 2).map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`${project.title} preview ${i + 1}`}
                        className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${i === 0
                          ? "opacity-100 group-hover:opacity-0"
                          : "opacity-0 group-hover:opacity-100"
                          }`}
                      />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-60" />
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2">
                          <span className="font-body text-xs uppercase tracking-[0.3em] text-primary/70">{project.category}</span>
                          <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground leading-tight">{project.title}</h3>
                        </div>
                        <span className="font-heading text-4xl text-primary/40">{project.number}</span>
                      </div>
                      <p className="font-body text-sm md:text-base text-gray-light leading-relaxed">{project.description}</p>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-body text-xs uppercase tracking-[0.25em] text-foreground/70 border border-border/30 bg-card/40 px-3 py-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4">
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-wider text-primary transition-all hover:gap-3"
                        >
                          Live Demo
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                        </a>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body text-sm font-semibold uppercase tracking-wider text-foreground/60 transition-colors hover:text-primary"
                        >
                          GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            }

            if (template === 1) {
              return (
                <article
                  key={project.number}
                  className="col-span-12 md:col-span-5 group relative flex h-full flex-col overflow-hidden border border-border/25 bg-gradient-to-b from-[#070709] to-black/80 shadow-[0_30px_60px_-45px_rgba(0,0,0,0.8)]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={mockups[0]}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-80" />
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                    <div className="space-y-3">
                      <span className="font-body text-xs uppercase tracking-[0.3em] text-primary/70">{project.category}</span>
                      <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground leading-tight">{project.title}</h3>
                      <p className="font-body text-sm text-gray-light leading-relaxed">{project.description}</p>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-body text-xs uppercase tracking-[0.2em] text-foreground/70 border border-border/30 bg-card/40 px-2 py-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-wider text-primary transition-all hover:gap-3"
                      >
                        View Project
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            }

            return (
              <article
                key={project.number}
                className="col-span-12 group relative overflow-hidden border border-border/25 bg-[#070709] shadow-[0_30px_60px_-45px_rgba(0,0,0,0.8)] md:col-span-12"
              >
                <div className="grid md:grid-cols-2">
                  <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
                    <img
                      src={mockups[0]}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-col justify-between p-6 md:p-10">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <span className="font-body text-xs uppercase tracking-[0.3em] text-primary/70">{project.category}</span>
                        <span className="font-heading text-4xl text-primary/40">{project.number}</span>
                      </div>
                      <h3 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">{project.title}</h3>
                      <p className="font-body text-base text-gray-light leading-relaxed">{project.description}</p>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-body text-xs uppercase tracking-[0.25em] text-foreground/70 border border-border/30 bg-card/40 px-3 py-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4">
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-wider text-primary transition-all hover:gap-3"
                        >
                          Live Demo
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                        </a>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body text-sm font-semibold uppercase tracking-wider text-foreground/60 transition-colors hover:text-primary"
                        >
                          GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* Floating Particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-2 w-2 animate-float rounded-full bg-primary/20" style={{ animationDelay: "0s" }} />
        <div className="absolute top-3/4 right-1/4 h-3 w-3 animate-float rounded-full bg-primary/10" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-3/4 h-1.5 w-1.5 animate-float rounded-full bg-primary/30" style={{ animationDelay: "4s" }} />
      </div>
    </section>
  );
};
