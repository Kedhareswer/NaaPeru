import { useEffect, useState, type MouseEvent } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowUpRight } from "lucide-react";

type FunProject = {
  id: number;
  title: string;
  subtitle: string;
  yearLabel: string;
  yearValue?: number;
  badge?: string;
  badgeColor?: string;
  badgeText?: string;
  tags?: string[];
  link: string;
  layout?: "hero" | "wide" | "tall" | "portrait" | "square";
  media: {
    type: "image" | "video" | "gif";
    src: string;
    alt: string;
  };
};

const getActionLabel = (link: string) =>
  link.includes("github.com") ? "View GitHub" : "View Website";

const isCoarsePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

const parseProjectYear = (projectDate?: string) => {
  if (!projectDate) {
    return { label: "", value: undefined };
  }

  const yearMatch = projectDate.match(/(19|20)\d{2}/);
  const numericYear = yearMatch ? Number(yearMatch[0]) : undefined;

  return { label: projectDate, value: numericYear };
};

const determineMediaType = (source: string | undefined): FunProject["media"]["type"] => {
  if (!source) return "image";
  const extension = source.split(".").pop()?.toLowerCase();
  if (extension === "mp4" || extension === "webm") return "video";
  if (extension === "gif") return "gif";
  return "image";
};

const computeLayout = (index: number, featured: boolean | undefined) => {
  if (index === 0) return "hero" as const;
  if (featured) return "wide" as const;
  const sequence: Array<FunProject["layout"]> = ["portrait", "square", "tall", "wide"];
  return sequence[(index - 1) % sequence.length];
};

const getBuildWindowLabel = (items: FunProject[]) => {
  const years = items
    .map((project) => project.yearValue)
    .filter((value): value is number => typeof value === "number");

  if (!years.length) {
    return "—";
  }

  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  return minYear === maxYear ? `${minYear}` : `${minYear}-${maxYear}`;
};

const formatProjectCount = (count: number) => {
  if (!count) return "00";
  return count < 10 ? `0${count}` : `${count}`;
};

const Fun = () => {
  const [projects, setProjects] = useState<FunProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cursorState, setCursorState] = useState({
    x: 0,
    y: 0,
    label: "",
    visible: false,
  });

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch("/projects.json");
        if (!response.ok) {
          throw new Error("Failed to load projects.json");
        }
        const data = await response.json();

        const ignoredTitles = [
          "Thesis Flow AI",
          "QuantumPDF ChatApp VectorDB",
          "Data Notebook",
        ];

        const mapped = (data as any[])
          .filter((item) => !ignoredTitles.includes(item.title))
          .sort((a, b) => {
            const dateA = new Date(a.created_at ?? a.project_date ?? 0).getTime();
            const dateB = new Date(b.created_at ?? b.project_date ?? 0).getTime();
            return dateB - dateA;
          })
          .map<FunProject>((item, index) => {
            const { label, value } = parseProjectYear(item.project_date);
            const imageSource = item.image?.startsWith("http")
              ? item.image
              : item.image
              ? item.image
              : "/placeholder.svg";
            const link = item.demo || item.github || "#";

            return {
              id: item.id ?? index,
              title: item.title,
              subtitle: item.description,
              yearLabel: label,
              yearValue: value,
              badge: item.featured ? "Featured" : undefined,
              badgeColor: item.featured ? "#FEE7F7" : undefined,
              badgeText: item.featured ? "#0F0F0F" : undefined,
              tags: item.technologies?.slice(0, 4) ?? [],
              link,
              layout: computeLayout(index, item.featured),
              media: {
                type: determineMediaType(imageSource),
                src: imageSource,
                alt: item.title,
              },
            };
          });

        setProjects(mapped);
        setError(null);
      } catch (error) {
        console.error("Error loading fun projects:", error);
        setError("Projects failed to load. Refresh to try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleCursorEnter = (label: string) => (
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    if (isCoarsePointer()) {
      return;
    }
    setCursorState({
      x: event.clientX,
      y: event.clientY,
      label,
      visible: true,
    });
  };

  const handleCursorMove = (label: string) => (
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    if (isCoarsePointer()) {
      return;
    }
    setCursorState({
      x: event.clientX,
      y: event.clientY,
      label,
      visible: true,
    });
  };

  const handleCursorLeave = () => {
    setCursorState((prev) => ({ ...prev, visible: false }));
  };

  const heroProject = projects[0];
  const featureProjects = projects.slice(1, 4);
  const galleryProjects = projects.slice(4);
  const projectCountLabel = isLoading ? "··" : formatProjectCount(projects.length);
  const buildWindowLabel = isLoading ? "····" : getBuildWindowLabel(projects);

  return (
    <div className="overflow-x-hidden bg-background text-foreground">
      <Navigation />
      <main className="min-h-screen pt-32 pb-24">
        <div
          className={`pointer-events-none fixed z-[120] hidden md:flex items-center justify-center bg-primary px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.35em] text-background transition-all duration-150 ${cursorState.visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
          style={{
            left: `${cursorState.x}px`,
            top: `${cursorState.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {cursorState.label}
        </div>
        <section className="container-portfolio space-y-16">
          <header className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
            <div className="space-y-5">
              <span className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
                Side Quests & Experiments
              </span>
              <h1 className="font-heading text-4xl md:text-6xl leading-tight">
                Experiments that refuse to stay in drafts.
              </h1>
              <p className="font-body text-base md:text-lg text-foreground/70 leading-relaxed max-w-2xl">
                Welcome to the lab where I workshop interfaces, test AI workflows, and chase curiosity. Every project below is a sharp-edged capsule of energy—no fluff, just honest builds you can click, explore, and remix.
              </p>
            </div>

            <div className="border border-border/30 bg-card/20 p-8 space-y-6">
              <div className="space-y-2">
                <p className="font-body text-sm uppercase tracking-[0.35em] text-foreground/60">
                  How to explore
                </p>
                <p className="font-body text-base text-foreground/80 leading-relaxed">
                  Hover to peek the vibe, tap to jump into the live build. These are scrappy by design—perfect for inspiration, teardown, or five-minute joyrides.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="border border-border/30 p-4">
                  <p className="font-heading text-3xl">{projectCountLabel}</p>
                  <p className="font-body text-xs uppercase tracking-[0.3em] text-foreground/50">
                    Projects
                  </p>
                </div>
                <div className="border border-border/30 p-4">
                  <p className="font-heading text-3xl">{buildWindowLabel}</p>
                  <p className="font-body text-xs uppercase tracking-[0.3em] text-foreground/50">
                    Build window
                  </p>
                </div>
              </div>
            </div>
          </header>

          {error && (
            <div className="border border-destructive/40 bg-destructive/10 px-6 py-4 text-sm uppercase tracking-[0.3em] text-destructive">
              {error}
            </div>
          )}

          {heroProject && (
            <section className="grid gap-12 xl:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]">
              <a
                href={heroProject.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${heroProject.title} (${getActionLabel(heroProject.link)})`}
                className="group/hero relative flex min-h-[520px] flex-col border border-border/40 bg-background md:cursor-none"
                onMouseEnter={handleCursorEnter(getActionLabel(heroProject.link))}
                onMouseMove={handleCursorMove(getActionLabel(heroProject.link))}
                onMouseLeave={handleCursorLeave}
              >
                <div className="absolute inset-0">
                  {heroProject.media.type === "video" ? (
                    <video
                      className="h-full w-full object-cover opacity-75 transition duration-700 ease-out group-hover/hero:scale-[1.03] group-hover/hero:opacity-100"
                      src={heroProject.media.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={heroProject.media.src}
                      alt={heroProject.media.alt}
                      loading="lazy"
                      className="h-full w-full object-cover opacity-75 transition duration-700 ease-out group-hover/hero:scale-[1.03] group-hover/hero:opacity-100"
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/70 to-background/30 transition duration-500 group-hover/hero:from-background/85 group-hover/hero:via-background/60 group-hover/hero:to-background/20" />

                <div className="relative z-10 flex h-full flex-col justify-between p-10">
                  <div className="flex items-start justify-between">
                    <div className="space-y-4">
                      <span className="font-body text-xs uppercase tracking-[0.5em] text-foreground/60">
                        {heroProject.yearLabel}
                      </span>
                      <h2 className="font-heading text-5xl uppercase leading-[1.05] tracking-tight">
                        {heroProject.title}
                      </h2>
                    </div>
                    {heroProject.badge && (
                      <span
                        className="border border-border/40 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.35em]"
                        style={{
                          backgroundColor: heroProject.badgeColor,
                          color: heroProject.badgeText,
                        }}
                      >
                        {heroProject.badge}
                      </span>
                    )}
                  </div>

                  <div className="max-w-xl space-y-6">
                    <p className="font-body text-lg leading-relaxed text-foreground/80">
                      {heroProject.subtitle}
                    </p>
                    {heroProject.tags && (
                      <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.35em] text-foreground/60">
                        {heroProject.tags.map((tag) => (
                          <span key={tag} className="border border-border/40 px-3 py-1">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t border-border/30 pt-6 text-[11px] uppercase tracking-[0.35em] text-foreground/65">
                    <span>{getActionLabel(heroProject.link)}</span>
                    <ArrowUpRight className="h-6 w-6 transition-transform duration-200 group-hover/hero:translate-x-1 group-hover/hero:-translate-y-1" />
                  </div>
                </div>
              </a>

              <div className="flex flex-col border border-border/40 bg-background">
                <div className="border-b border-border/40 px-8 py-6">
                  <p className="font-body text-sm uppercase tracking-[0.45em] text-foreground/60">
                    Dispatch Board
                  </p>
                  <p className="mt-3 font-heading text-3xl uppercase leading-snug">
                    Fresh drops from the studio floor.
                  </p>
                </div>

                <div className="flex-1 divide-y divide-border/30">
                  {featureProjects.map((project) => {
                    const actionLabel = getActionLabel(project.link);
                    return (
                      <a
                        key={project.title}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title} (${actionLabel})`}
                        className="group/feature flex flex-col gap-4 px-8 py-6 transition-colors hover:bg-foreground/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 md:cursor-none"
                        onMouseEnter={handleCursorEnter(actionLabel)}
                        onMouseMove={handleCursorMove(actionLabel)}
                        onMouseLeave={handleCursorLeave}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-body text-xs uppercase tracking-[0.45em] text-foreground/55">
                            {project.yearLabel}
                          </span>
                          {project.badge && (
                            <span
                              className="border border-border/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em]"
                              style={{
                                backgroundColor: project.badgeColor,
                                color: project.badgeText,
                              }}
                            >
                              {project.badge}
                            </span>
                          )}
                        </div>
                        <div className="flex items-start justify-between gap-6">
                          <div className="space-y-2">
                            <h3 className="font-heading text-2xl uppercase leading-tight">
                              {project.title}
                            </h3>
                            <p className="font-body text-sm text-foreground/70 leading-relaxed">
                              {project.subtitle}
                            </p>
                          </div>
                          <ArrowUpRight className="h-5 w-5 flex-shrink-0 transition-transform duration-200 group-hover/feature:translate-x-1 group-hover/feature:-translate-y-1" />
                        </div>
                        {project.tags && (
                          <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.35em] text-foreground/55">
                            {project.tags.map((tag) => (
                              <span key={tag} className="border border-border/40 px-3 py-1">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.35em] text-foreground/60">
                          <span>{actionLabel}</span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          <section className="space-y-6">
            <div className="flex items-baseline justify-between border-t border-border/30 pt-6">
              <div className="space-y-2">
                <span className="font-body text-xs uppercase tracking-[0.45em] text-foreground/60">
                  Studio Archive
                </span>
                <h2 className="font-heading text-3xl uppercase leading-tight">
                  Experiments to click, keep, and remix.
                </h2>
              </div>
              <div className="hidden text-right md:block">
                <p className="font-body text-xs uppercase tracking-[0.4em] text-foreground/40">
                  Sorted by most recent energy
                </p>
                <p className="font-body text-sm uppercase tracking-[0.3em] text-foreground/50">
                  {galleryProjects.length}+ entries
                </p>
              </div>
            </div>

            <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
              {galleryProjects.map((project) => {
                const actionLabel = getActionLabel(project.link);
                return (
                  <a
                    key={project.title}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title} (${actionLabel})`}
                    className="group/card relative flex h-full flex-col border border-border/40 bg-background transition-transform duration-500 ease-out hover:-translate-y-1 hover:border-primary/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 md:cursor-none"
                    onMouseEnter={handleCursorEnter(actionLabel)}
                    onMouseMove={handleCursorMove(actionLabel)}
                    onMouseLeave={handleCursorLeave}
                  >
                    <div className="relative h-64 border-b border-border/30">
                      {project.media.type === "video" ? (
                        <video
                          className="h-full w-full object-cover opacity-80 transition duration-700 ease-out group-hover/card:scale-[1.04] group-hover/card:opacity-100"
                          src={project.media.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      ) : (
                        <img
                          src={project.media.src}
                          alt={project.media.alt}
                          loading="lazy"
                          className="h-full w-full object-cover opacity-80 transition duration-700 ease-out group-hover/card:scale-[1.04] group-hover/card:opacity-100"
                        />
                      )}
                    </div>

                    <div className="flex flex-1 flex-col gap-6 p-7">
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.4em] text-foreground/55">
                        <span>{project.yearLabel}</span>
                        {project.badge && (
                          <span
                            className="border border-border/40 px-3 py-1 font-semibold"
                            style={{
                              backgroundColor: project.badgeColor,
                              color: project.badgeText,
                            }}
                          >
                            {project.badge}
                          </span>
                        )}
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-heading text-2xl uppercase leading-tight">
                          {project.title}
                        </h3>
                        <p className="font-body text-sm text-foreground/70 leading-relaxed">
                          {project.subtitle}
                        </p>
                      </div>

                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.35em] text-foreground/60">
                          {project.tags.map((tag) => (
                            <span key={tag} className="border border-border/40 px-3 py-1">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-auto flex items-center justify-between text-[11px] uppercase tracking-[0.35em] text-foreground/60">
                        <span>{actionLabel}</span>
                        <ArrowUpRight className="h-5 w-5 transition-transform duration-200 group-hover/card:translate-x-1 group-hover/card:-translate-y-1" />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        </section>
      </main>
      <Footer quote="Even the smallest idea, acted upon daily, outshines the greatest one never started" />
    </div>
  );
};

export default Fun;
