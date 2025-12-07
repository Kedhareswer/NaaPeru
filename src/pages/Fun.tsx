import { useEffect, useState, useCallback } from "react";
import { Navigation } from "@/components/Navigation";
import { ExternalLink } from "lucide-react";

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

  const currentProject = projects[currentIndex];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="min-h-screen bg-background text-foreground">
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

      {/* Main Experimentos Index Layout - Full screen */}
      {!isLoading && !error && projects.length > 0 && (
        <main className="pt-28 pb-16">
          <div className="container-portfolio">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-20">
              {/* Left: Index list */}
              <section className="w-full max-w-sm lg:max-w-[280px] xl:max-w-[320px] shrink-0">
                  <p className="font-body text-[10px] uppercase tracking-[0.35em] text-foreground/40 mb-2">
                    Index
                  </p>
                  <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground mb-6">
                    Experimentos
                  </h1>

                  {/* Current selection summary */}
                  {currentProject && (
                    <div className="mb-8 space-y-2">
                      <p className="font-body text-xs uppercase tracking-[0.28em] text-primary/80">
                        Selected
                      </p>
                      <h2 className="font-heading text-lg sm:text-xl text-foreground leading-tight">
                        {currentProject.title}
                      </h2>
                      <p className="font-body text-xs text-foreground/60 line-clamp-3">
                        {currentProject.subtitle}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-body text-foreground/50">
                        {currentProject.year !== "—" && (
                          <span className="px-2 py-0.5 rounded-full border border-border/30">
                            {currentProject.year}
                          </span>
                        )}
                        {currentProject.tags?.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full border border-border/30"
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

                  {/* Scrollable index list */}
                  <div className="max-h-[360px] pr-3 overflow-y-auto space-y-1">
                    {projects.map((project, index) => {
                      const lineNumber = index * 3 + 1; // loose nod to the wireframe spacing
                      const isActive = index === currentIndex;
                      return (
                        <button
                          key={project.id}
                          type="button"
                          onClick={() => setCurrentIndex(index)}
                          className={`group flex w-full items-baseline gap-3 rounded-md px-2 py-1 text-left transition-colors ${
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

                {/* Right: Grid of experiment tiles */}
                <section className="flex-1">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
                    {projects.map((project, index) => {
                      const isActive = index === currentIndex;
                      return (
                        <button
                          key={project.id}
                          type="button"
                          onClick={() => setCurrentIndex(index)}
                          className="group flex flex-col items-stretch"
                        >
                          <div
                            className={`relative aspect-[3/4] w-full overflow-hidden border bg-card/60 transition-all duration-300 ${
                              isActive
                                ? "border-primary/70 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                                : "border-border/30 hover:border-primary/40"
                            }`}
                          >
                            {/* Actual media with sharp edges - fills container */}
                            {project.media.type === "video" ? (
                              <video
                                className="absolute inset-0 h-full w-full object-cover"
                                src={project.media.src}
                                muted
                                loop
                                autoPlay
                                playsInline
                              />
                            ) : (
                              <img
                                className="absolute inset-0 h-full w-full object-cover"
                                src={project.media.src}
                                alt={project.media.alt}
                              />
                            )}
                          </div>
                          <p
                            className={`mt-2 text-center font-body text-[11px] sm:text-xs ${
                              isActive ? "text-foreground" : "text-foreground/70"
                            }`}
                          >
                            {project.title}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Keyboard hint / next label */}
                  {nextProject && (
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-[11px] font-body text-foreground/45">
                      <p>
                        <span className="mr-2 uppercase tracking-[0.28em]">Next</span>
                        <span className="text-foreground/70">{nextProject.title}</span>
                      </p>
                      <p className="flex items-center gap-3">
                        <span className="hidden sm:inline">Use</span>
                        <span className="flex items-center gap-1">
                          <kbd className="rounded border border-border/40 px-1.5 py-0.5 text-[10px]">←</kbd>
                          <kbd className="rounded border border-border/40 px-1.5 py-0.5 text-[10px]">→</kbd>
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
