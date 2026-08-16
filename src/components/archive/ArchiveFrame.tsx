import { cn } from "@/lib/utils";
import { caseStudyPath } from "@/lib/archive/projects";
import type { ArchiveProject } from "@/lib/archive/types";
import { ExternalLink, Github } from "lucide-react";
import { TransitionLink } from "@/components/TransitionLink";

const CATEGORY_ANIM: Record<string, string> = {
  "Multi-Agent AI": "archive-anim-agents",
  "AI Chat": "archive-anim-chat",
  "Deep Learning": "archive-anim-dl",
  "Machine Learning": "archive-anim-ml",
  "Web Development": "archive-anim-web",
};

interface ArchiveFrameProps {
  project: ArchiveProject;
  index: number;
  total: number;
  mode?: "forward" | "rewind";
}

export function ArchiveFrame({ project, index, total, mode = "forward" }: ArchiveFrameProps) {
  const cs = caseStudyPath(project.title);
  const animClass = CATEGORY_ANIM[project.category] ?? "archive-anim-web";
  const headline = mode === "forward" ? project.outcomes[0] : project.objectives[0];

  return (
    <article
      className={cn(
        "archive-frame relative flex h-[100svh] w-[100vw] shrink-0 flex-col justify-end overflow-hidden border-r border-border/20",
        mode === "rewind" && "archive-frame--rewind",
      )}
      data-index={index}
    >
      {/* Perforation strip */}
      <div className="absolute left-0 right-0 top-0 z-20 flex h-3 gap-1.5 px-4 opacity-40">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="h-full w-2 rounded-[1px] bg-foreground/30" />
        ))}
      </div>

      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={project.image}
          alt=""
          className={cn(
            "h-full w-full object-cover transition-all duration-700",
            mode === "rewind" ? "scale-105 grayscale contrast-125 opacity-40 mix-blend-luminosity" : "scale-100 opacity-50",
            animClass,
          )}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
        {mode === "rewind" && (
          <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
        )}
      </div>

      {/* Category animation overlay */}
      <div className={cn("archive-anim-overlay pointer-events-none absolute inset-0", animClass)} aria-hidden />

      <div className="relative z-10 p-8 sm:p-12 md:p-16">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary/80">
              {project.project_date} &middot; {project.category}
            </p>
            <h3 className="font-heading max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {project.title}
            </h3>
          </div>
          <div className="text-right font-heading text-[10px] uppercase tracking-[0.25em] text-foreground/40">
            <div>Frame</div>
            <div className="mt-0.5 text-primary/70">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </div>
          </div>
        </div>

        <p className="font-body max-w-xl text-base leading-relaxed text-foreground/70 md:text-lg">
          {mode === "rewind" ? (
            <span className="italic text-foreground/50">Objective: </span>
          ) : null}
          {headline}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map((t) => (
            <span
              key={t}
              className="border border-border/30 px-2 py-1 font-body text-[10px] uppercase tracking-[0.15em] text-foreground/50"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          {cs && mode === "forward" && (
            <TransitionLink
              to={cs}
              label="CASE STUDY"
              className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 font-body text-xs font-bold uppercase tracking-[0.25em] text-background transition-colors hover:bg-primary/90"
            >
              Case Study
            </TransitionLink>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border/40 px-4 py-2 font-body text-xs uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:border-primary/50"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border/40 px-4 py-2 font-body text-xs uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:border-primary/50"
            >
              <Github className="h-3.5 w-3.5" />
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
