import { useEffect, useState, type MouseEvent } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowRight, ExternalLink } from "lucide-react";

type FunProject = {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  tags?: string[];
  link: string;
  media: {
    type: "image" | "video" | "gif";
    src: string;
    alt: string;
  };
};

const isCoarsePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

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

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Navigation />

      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_hsla(var(--primary)/0.15),transparent_50%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_hsla(var(--primary)/0.08),transparent_60%)]" aria-hidden="true" />

      {/* Custom Cursor */}
      {!isCoarsePointer() && (
        <div
          className={`pointer-events-none fixed z-[120] flex items-center gap-2 bg-primary px-4 py-2.5 rounded-full font-body text-xs font-bold uppercase tracking-wider text-background shadow-xl transition-all duration-150 ${
            cursorState.visible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
          style={{
            left: `${cursorState.x}px`,
            top: `${cursorState.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <ExternalLink className="w-4 h-4" />
          {cursorState.label}
        </div>
      )}

      <main className="relative z-10 px-6 py-32 sm:px-8 md:px-12">
        <div className="container-portfolio w-full max-w-7xl">
          
          {/* Hero Section - CHAOTIC & FUN */}
          <div className="mb-20 space-y-10 relative">
            {/* Floating Accent Shapes */}
            <div className="absolute -top-10 right-10 h-20 w-20 border-2 border-primary/20 rotate-12 animate-float" />
            <div className="absolute top-32 -left-5 h-16 w-16 bg-primary/5 -rotate-6 animate-float" style={{ animationDelay: '1s' }} />
            <div className="absolute top-64 right-1/4 h-3 w-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            
            {/* Animated Badge with Pulse - MORE ENERGY */}
            <div className="flex items-center gap-3 animate-fade-in">
              <div className="flex gap-1">
                <div className="h-2 w-2 bg-primary animate-pulse" style={{ animationDelay: '0ms' }} />
                <div className="h-2 w-2 bg-primary animate-pulse" style={{ animationDelay: '200ms' }} />
                <div className="h-2 w-2 bg-primary animate-pulse" style={{ animationDelay: '400ms' }} />
              </div>
              <span className="font-heading text-xs uppercase tracking-[0.6em] text-primary/75 animate-pulse">
                • Experiments •
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/30 via-primary/10 to-transparent" />
              <span className="font-body text-[10px] uppercase tracking-[0.4em] text-primary/50 animate-pulse">
                {!isLoading && `${projects.length} wild ideas`}
              </span>
            </div>

            {/* Title with CRAZY Ghost Typography */}
            <div className="relative overflow-hidden">
              {/* Multiple layered ghost text for depth */}
              <h1 className="font-heading text-[6rem] leading-none tracking-tighter text-foreground/5 sm:text-[8rem] md:text-[10rem] lg:text-[14rem] select-none">
                FUN
              </h1>
              <h1 className="absolute inset-0 font-heading text-[6rem] leading-none tracking-tighter text-primary/5 sm:text-[8rem] md:text-[10rem] lg:text-[14rem] select-none translate-x-2 translate-y-2">
                FUN
              </h1>
              
              <div className="absolute inset-0 flex items-center">
                <div className="space-y-6 animate-slide-up">
                  <h2 className="font-heading text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                    Side projects & <span className="text-primary italic">experiments</span>.
                  </h2>
                  <p className="max-w-2xl font-body text-base text-foreground/70 sm:text-lg md:text-xl">
                    Quick builds, interface tests, and AI workflows. <span className="text-primary font-bold">Click to explore.</span>
                  </p>
                  {/* Fun emoji indicators */}
                  <div className="flex gap-3 text-2xl">
                    <span className="animate-bounce" style={{ animationDelay: '0ms' }}>⚡</span>
                    <span className="animate-bounce" style={{ animationDelay: '100ms' }}>🎨</span>
                    <span className="animate-bounce" style={{ animationDelay: '200ms' }}>🚀</span>
                    <span className="animate-bounce" style={{ animationDelay: '300ms' }}>✨</span>
                  </div>
                </div>
              </div>
            </div>

            {/* WILD Stats Strip with Ticker Effect */}
            <div className="relative overflow-hidden border-y-2 border-primary/30 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
              <div className="flex items-center gap-8 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center border-2 border-primary/50 bg-primary/10 rotate-3 hover:rotate-0 transition-transform">
                    <span className="font-heading text-2xl text-primary">{isLoading ? "?" : projects.length}</span>
                  </div>
                  <div>
                    <p className="font-body text-xs uppercase tracking-[0.3em] text-foreground/50">Projects</p>
                    <p className="font-body text-[10px] uppercase tracking-[0.3em] text-primary/50">⚡ Latest First</p>
                  </div>
                </div>
                <div className="h-10 w-px bg-primary/30 -rotate-12" />
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="h-3 w-3 rounded-full bg-primary animate-ping absolute" />
                    <div className="h-3 w-3 rounded-full bg-primary" />
                  </div>
                  <span className="font-body text-xs uppercase tracking-[0.3em] text-foreground/50">Live Updates</span>
                </div>
                <div className="h-10 w-px bg-primary/30 rotate-12" />
                <div className="flex items-center gap-2">
                  <span className="font-body text-xs uppercase tracking-[0.3em] text-foreground/40">Made with ❤️ & ☕</span>
                </div>
              </div>
              {/* Multiple animated lines for chaos */}
              <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 animate-pulse" />
              <div className="absolute top-0 left-0 h-[2px] w-1/3 bg-primary opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="mb-12 border-l-4 border-primary bg-primary/10 px-6 py-4">
              <p className="font-body text-sm uppercase tracking-[0.3em] text-primary">{error}</p>
            </div>
          )}

          {/* Projects Grid with CHAOTIC Staggered Animation */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => {
              // Random subtle rotations for each card
              const randomRotation = (index % 3 === 0 ? 1 : index % 3 === 1 ? -1 : 0.5);
              const randomDelay = index * 100;
              
              return (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col overflow-hidden border-2 border-border/30 bg-background transition-all duration-300 hover:border-primary/50 hover:-translate-y-3 hover:shadow-[0_12px_40px_rgba(255,0,0,0.2)] animate-fade-in hover:z-10"
                style={{ 
                  animationDelay: `${randomDelay}ms`,
                  transform: `rotate(${randomRotation * 0.5}deg)`
                }}
                onMouseEnter={handleCursorEnter("🚀 View Project")}
                onMouseMove={handleCursorMove("🚀 View Project")}
                onMouseLeave={handleCursorLeave}
              >
                {/* Multiple Corner Accents for CHAOS */}
                <div className="absolute top-0 right-0 h-12 w-12 border-t-2 border-r-2 border-primary/0 group-hover:border-primary/50 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-primary/0 group-hover:border-primary/30 transition-all duration-500" style={{ transitionDelay: '100ms' }} />
                
                {/* Fun decorative elements */}
                <div className="absolute top-2 left-2 h-2 w-2 bg-primary/0 group-hover:bg-primary transition-all duration-300 rotate-45" />
                <div className="absolute top-4 left-2 h-2 w-2 bg-primary/0 group-hover:bg-primary/50 transition-all duration-300" style={{ transitionDelay: '50ms' }} />
                
                {/* Media */}
                <div className="relative aspect-[16/10] overflow-hidden bg-foreground/5">
                  {project.media.type === "video" ? (
                    <video
                      className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
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
                      className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />
                  )}
                  {/* Animated Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Year Badge on Image - FUN STYLE */}
                  <div className="absolute top-4 left-4 bg-background/90 border-2 border-primary/30 px-3 py-1 backdrop-blur-sm -rotate-2 group-hover:rotate-0 transition-transform">
                    <span className="font-body text-[10px] uppercase tracking-[0.4em] text-primary">
                      ⚡ {project.year}
                    </span>
                  </div>
                  
                  {/* Fun random accent on image */}
                  {index % 2 === 0 && (
                    <div className="absolute bottom-4 right-4 h-8 w-8 border-2 border-primary/20 rotate-45 group-hover:rotate-90 transition-all duration-500" />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-4 p-6 relative">
                  {/* Animated Border - DOUBLE LAYER */}
                  <div className="absolute top-0 left-0 h-[3px] w-0 bg-primary group-hover:w-full transition-all duration-500" />
                  <div className="absolute top-0 left-0 h-[1px] w-0 bg-primary/50 group-hover:w-full transition-all duration-700" style={{ transitionDelay: '100ms' }} />
                  
                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="font-heading text-xl leading-tight text-foreground group-hover:text-primary transition-colors duration-300 group-hover:translate-x-1">
                      {project.title}
                    </h3>
                    <p className="font-body text-sm text-foreground/70 leading-relaxed line-clamp-2 group-hover:text-foreground/90 transition-colors">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Tags with Hover Effect */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tag}
                          className="font-body text-[10px] uppercase tracking-[0.3em] text-foreground/50 border border-border/30 px-2 py-1 group-hover:border-primary/30 group-hover:text-foreground/70 transition-all duration-300"
                          style={{ transitionDelay: `${tagIndex * 50}ms` }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA with Animated Arrow */}
                  <div className="mt-auto flex items-center justify-between border-t border-border/20 pt-4">
                    <span className="font-body text-xs uppercase tracking-[0.3em] text-foreground/60 group-hover:text-primary transition-colors">
                      View Project
                    </span>
                    <div className="relative">
                      <ArrowRight className="h-4 w-4 text-foreground/60 transition-all group-hover:translate-x-2 group-hover:text-primary" />
                      <ArrowRight className="absolute top-0 left-0 h-4 w-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all" />
                    </div>
                  </div>
                </div>
              </a>
              );
            })}
          </div>

          {/* Loading State with WILD Animation */}
          {isLoading && (
            <div className="py-20 text-center space-y-8">
              <div className="flex items-center justify-center gap-3">
                <div className="h-4 w-4 bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="h-4 w-4 bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="h-4 w-4 bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <div className="space-y-2">
                <p className="font-heading text-2xl text-foreground/70 animate-pulse">⚡ Loading experiments...</p>
                <p className="font-body text-xs uppercase tracking-[0.4em] text-foreground/40">Preparing the chaos</p>
              </div>
              {/* Fun loading bar */}
              <div className="max-w-xs mx-auto h-2 bg-foreground/5 overflow-hidden">
                <div className="h-full bg-primary animate-pulse" style={{ width: '60%' }} />
              </div>
            </div>
          )}

          {/* Empty State - PLAYFUL */}
          {!isLoading && projects.length === 0 && !error && (
            <div className="py-20 text-center space-y-6">
              <div className="inline-block border-2 border-primary/30 bg-primary/5 p-8 -rotate-3 hover:rotate-0 transition-transform">
                <p className="font-heading text-8xl text-foreground/10 animate-pulse">∅</p>
              </div>
              <div className="space-y-2">
                <p className="font-heading text-xl text-foreground/70">No experiments found</p>
                <p className="font-body text-xs uppercase tracking-[0.4em] text-foreground/40">🎨 Time to build something!</p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer quote="Made with ☕, 🎨, and a sprinkle of chaos ✨" />
    </div>
  );
};

export default Fun;
