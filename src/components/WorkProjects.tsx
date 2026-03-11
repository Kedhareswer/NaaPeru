import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

export const WorkProjects = () => {
  const projects = [
    {
      number: "01",
      category: "AI Research Platform",
      title: "ThesisFlow-AI",
      subtitle: "Collaborative AI research workspace",
      metadata: "AI RESEARCH • PLATFORM • 2025",
      tags: ["React", "Node.js", "AI Agents", "WebSocket"],
      image: "/projects/research-bolt.png",
      github: "https://github.com/Kedhareswer/ai-project-planner",
      demo: "https://thesisflow-ai.vercel.app/",
      caseStudy: "/case-study/thesisflow",
    },
    {
      number: "02",
      category: "RAG Application",
      title: "QuantumPDF Chat App",
      subtitle: "PDF intelligence assistant with RAG",
      metadata: "RAG APPLICATION • AI • JUN 2025",
      tags: ["Next.js 15", "Tailwind", "Vector DB", "LLM"],
      image: "/projects/quantumpdf.png",
      github: "https://github.com/Kedhareswer/QuantumPDF_ChatApp_VectorDB",
      demo: "https://quantumn-pdf-chatapp.netlify.app/",
      caseStudy: "/case-study/quantumpdf",
    },
    {
      number: "03",
      category: "Data Experience",
      title: "Data Notebook",
      subtitle: "Interactive data analysis platform",
      metadata: "DATA PLATFORM • ANALYTICS • APR 2025",
      tags: ["Next.js", "Radix UI", "Recharts", "TypeScript"],
      image: "/projects/data-notebook.png",
      github: "https://github.com/Kedhareswer/Data_Science_Platform",
      demo: "https://data-science-platform.vercel.app/",
      caseStudy: "/case-study/data-notebook",
    },
  ];

  return (
    <section id="work" className="relative bg-background pt-0 pb-20 md:pb-32">
      <div className="container-portfolio">
        {/* Projects Grid */}
        <div className="space-y-16 md:space-y-24">
          {projects.map((project) => {
            return (
              <article key={project.number} className="group">
                {/* Media Container */}
                {project.caseStudy ? (
                  <Link
                    to={project.caseStudy}
                    className="relative block w-full aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background mb-6"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Hover overlay with label */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-start p-6 md:p-8">
                      <span className="flex items-center gap-2 font-body text-xs font-bold uppercase tracking-wider text-foreground/90">
                        <Eye className="w-4 h-4" />
                        View Case Study
                      </span>
                    </div>
                  </Link>
                ) : (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block w-full aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background mb-6"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Hover overlay with label */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-start p-6 md:p-8">
                      <span className="flex items-center gap-2 font-body text-xs font-bold uppercase tracking-wider text-foreground/90">
                        <Eye className="w-4 h-4" />
                        View Project
                      </span>
                    </div>
                  </a>
                )}

                {/* Text Below - Title Left, Metadata Right */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-6">
                  <div className="space-y-1">
                    <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-normal text-foreground">
                      {project.title}
                    </h3>
                    <p className="font-body text-sm md:text-base text-foreground/60">
                      {project.subtitle}
                    </p>
                  </div>
                  <div className="font-body text-xs md:text-sm uppercase tracking-[0.15em] text-foreground/50 whitespace-nowrap">
                    {project.metadata}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
