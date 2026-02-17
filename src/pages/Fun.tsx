import { useEffect, useState, useCallback } from "react";
import { Navigation } from "@/components/Navigation";
import { ExternalLink } from "lucide-react";
import { ShiftCard } from "@/components/ui/shift-card";
import { motion } from "motion/react";
import { Seo } from "@/components/Seo";

type FunProject = {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  tags?: string[];
  link: string;
  category: string;
  media: {
    type: "image" | "video" | "gif";
    src: string;
    alt: string;
  };
};

const Fun = () => {
  const [projects, setProjects] = useState<FunProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubtitleExpanded, setIsSubtitleExpanded] = useState(false);

  // Load projects
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
            const yearMatch = item.project_date?.match(/(19|20)\d{2}/);
            const year = yearMatch ? yearMatch[0] : "—";
            const imageSource = item.image?.startsWith("http")
              ? item.image
              : item.image
              ? item.image
              : "/placeholder.svg";
            const link = item.demo || item.github || "#";

            const extension = imageSource.split(".").pop()?.toLowerCase();
            let mediaType: "image" | "video" | "gif" = "image";
            if (extension === "mp4" || extension === "webm") mediaType = "video";
            if (extension === "gif") mediaType = "gif";

            return {
              id: item.id ?? index,
              title: item.title,
              subtitle: item.description,
              year,
              tags: item.technologies?.slice(0, 3) ?? [],
              link,
              category: item.category ?? "Experiments",
              media: {
                type: mediaType,
                src: imageSource,
                alt: item.title,
              },
            };
          });

        setProjects(mapped);
        setError(null);
      } catch (error) {
        console.error("Error loading fun projects:", error);
        setError("Failed to load projects");
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Simple navigation between experiments (keyboard support)
  const goToNext = useCallback(() => {
    if (projects.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const goToPrevious = useCallback(() => {
    if (projects.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          event.preventDefault();
          goToNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [goToNext, goToPrevious]);

  useEffect(() => {
    setIsSubtitleExpanded(false);
  }, [currentIndex]);

  const currentProject = projects[currentIndex];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Experimentos | Kedhar's Creative and AI Side Projects"
        description="A curated index of experiments, creative prototypes, and AI side projects built by Kedhar."
        path="/fun"
        image="/og-fun.png"
        imageAlt="Experimentos project index by Kedhar"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Experimentos",
          url: "https://kedhar.vercel.app/fun",
          description: "Creative and technical experiments by Kedhar.",
        }}
      />
      {/* Navigation - standard portfolio navigation */}
      <Navigation />

      {/* Loading State */}
      {isLoading && (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center space-y-4">
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 border-2 border-border/30 rounded-full" />
              <div className="absolute inset-0 border-2 border-primary rounded-full border-t-transparent animate-spin" />
            </div>
            <p className="font-body text-xs uppercase tracking-[0.35em] text-foreground/50">
              Loading Experimentos
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center space-y-4 max-w-md px-6">
            <p className="font-heading text-xl text-primary">{error}</p>
            <p className="font-body text-sm text-foreground/60">
              Try refreshing the page.
            </p>
          </div>
        </div>
      )}

      {/* Main Experimentos Index Layout */}
      {!isLoading && !error && projects.length > 0 && (
        <main className="pt-24 sm:pt-28 pb-16">
          <div className="container-portfolio">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 xl:gap-20">

              {/* Left: Index panel */}
              <section className="w-full lg:max-w-[280px] xl:max-w-[320px] lg:shrink-0">
                <p className="font-body text-[10px] uppercase tracking-[0.35em] text-foreground/40 mb-2">
                  Index
                </p>
                <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground mb-6">
                  Experimentos
                </h1>

                {/* Current selection summary */}
                {currentProject && (
                  <div className="mb-6 lg:mb-8 space-y-2">
                    <p className="font-body text-xs uppercase tracking-[0.28em] text-primary/80">
                      Selected
                    </p>
                    <h2 className="font-heading text-lg sm:text-xl text-foreground leading-tight">
                      {currentProject.title}
                    </h2>
                    <div>
                      <p
                        className={`font-body text-xs text-foreground/60 ${
                          isSubtitleExpanded ? "" : "line-clamp-3"
                        }`}
                      >
                        {currentProject.subtitle}
                      </p>
                      {typeof currentProject.subtitle === "string" &&
                        currentProject.subtitle.trim().length > 140 && (
                          <button
                            type="button"
                            onClick={() => setIsSubtitleExpanded((prev) => !prev)}
                            className="mt-2 inline-flex text-[11px] font-body uppercase tracking-[0.28em] text-primary hover:text-primary/80"
                          >
                            {isSubtitleExpanded ? "Read less" : "Read more"}
                          </button>
                        )}
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-body text-foreground/50">
                      {currentProject.year !== "—" && (
                        <span className="px-2 py-0.5 border border-border/30">
                          {currentProject.year}
                        </span>
                      )}
                      {currentProject.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 border border-border/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {currentProject.link !== "#" && (
                      <a
                        href={currentProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-[11px] font-body uppercase tracking-[0.3em] text-primary hover:text-primary/80"
                      >
                        View project
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                )}

                {/* Index list — scrollable on desktop, full on mobile */}
                <div className="space-y-1">
                  {projects.map((project, index) => {
                    const lineNumber = index * 3 + 1;
                    const isActive = index === currentIndex;
                    return (
                      <button
                        key={project.id}
                        type="button"
                        onClick={() => setCurrentIndex(index)}
                        className={`group flex w-full items-baseline gap-3 px-2 py-1 text-left transition-colors ${
                          isActive ? "bg-primary/5" : "hover:bg-foreground/5"
                        }`}
                      >
                        <span className="w-6 font-body text-[10px] tabular-nums text-foreground/35">
                          {lineNumber.toString().padStart(2, "0")}
                        </span>
                        <span
                          className={`flex-1 font-body text-xs sm:text-sm ${
                            isActive
                              ? "text-foreground"
                              : "text-foreground/70 group-hover:text-foreground"
                          }`}
                        >
                          {project.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Right: Grid of ShiftCards */}
              <section className="flex-1 min-w-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                  {projects.map((project, index) => {
                    const isActive = index === currentIndex;
                    return (
                      <div
                        key={project.id}
                        onClick={() => setCurrentIndex(index)}
                        className="cursor-pointer"
                      >
                        <ShiftCard
                          className={`!w-full !min-h-[200px] sm:!min-h-[240px] md:!min-h-[280px] bg-card/60 ${
                            isActive
                              ? "ring-1 ring-primary/70 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                              : ""
                          }`}
                          topContent={
                            <div className="bg-surface-elevated border border-border/30 px-2 py-1.5 w-full">
                              <p className="font-body text-[10px] uppercase tracking-[0.25em] text-foreground/50 truncate">
                                {project.category}
                              </p>
                            </div>
                          }
                          topAnimateContent={
                            <motion.img
                              layoutId={`project-img-${project.id}`}
                              src={project.media.src}
                              alt={project.media.alt}
                              width={70}
                              height={90}
                              className="absolute top-1 right-1 object-contain shadow-lg"
                              transition={{ duration: 0.3, ease: "circIn" }}
                            />
                          }
                          middleContent={
                            <motion.img
                              layoutId={`project-img-${project.id}`}
                              src={project.media.src}
                              alt={project.media.alt}
                              className="max-h-[110px] sm:max-h-[130px] md:max-h-[155px] w-full object-contain"
                              transition={{ duration: 0.3, ease: "circIn" }}
                            />
                          }
                          bottomContent={
                            <div className="pb-3">
                              <div className="flex w-full flex-col gap-1.5 bg-surface-elevated border-t border-t-border/30 px-3 pb-3 pt-2">
                                <h3 className="font-heading text-[13px] text-foreground leading-tight">
                                  {project.title}
                                </h3>
                                <p className="font-body text-[11px] leading-[1.3] text-foreground/50 line-clamp-2">
                                  {project.subtitle}
                                </p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {project.tags?.slice(0, 2).map((tag) => (
                                    <span
                                      key={tag}
                                      className="px-1.5 py-0.5 border border-border/30 text-[9px] font-body text-foreground/45"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                {project.link !== "#" && (
                                  <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="mt-1 inline-flex items-center gap-1 text-[10px] font-body uppercase tracking-[0.2em] text-primary hover:text-primary/80"
                                  >
                                    View
                                    <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                )}
                              </div>
                            </div>
                          }
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Keyboard hint */}
                {nextProject && (
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-[11px] font-body text-foreground/45">
                    <p>
                      <span className="mr-2 uppercase tracking-[0.28em]">Next</span>
                      <span className="text-foreground/70">{nextProject.title}</span>
                    </p>
                    <p className="flex items-center gap-3">
                      <span className="hidden sm:inline">Use</span>
                      <span className="flex items-center gap-1">
                        <kbd className="border border-border/40 px-1.5 py-0.5 text-[10px]">←</kbd>
                        <kbd className="border border-border/40 px-1.5 py-0.5 text-[10px]">→</kbd>
                        <span>to move</span>
                      </span>
                    </p>
                  </div>
                )}
              </section>

            </div>
          </div>
        </main>
      )}

      {/* Empty State */}
      {!isLoading && !error && projects.length === 0 && (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center space-y-4">
            <p className="font-heading text-2xl text-foreground/60">No experiments yet</p>
            <p className="font-body text-sm text-foreground/40">Check back soon.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Fun;
