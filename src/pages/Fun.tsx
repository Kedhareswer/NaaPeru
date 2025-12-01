import { useEffect, useState, useCallback, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { ArrowRight, ArrowLeft, Play, Pause, Shuffle, ExternalLink } from "lucide-react";

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
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const autoPlayRef = useRef<NodeJS.Timeout>();
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

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

  // Navigation with cinematic transition
  const goToNext = useCallback(() => {
    if (projects.length === 0 || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % projects.length);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 300);
  }, [projects.length, isTransitioning]);

  const goToPrevious = useCallback(() => {
    if (projects.length === 0 || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev - 1 + projects.length) % projects.length);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 300);
  }, [projects.length, isTransitioning]);

  const goToRandom = useCallback(() => {
    if (projects.length === 0 || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * projects.length);
      setCurrentIndex(randomIndex);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 300);
  }, [projects.length, isTransitioning]);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay && projects.length > 0) {
      autoPlayRef.current = setInterval(goToNext, 5000);
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlay, goToNext, projects.length]);

  // Show controls on mouse move, hide after delay
  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  }, []);

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
        case ' ':
          event.preventDefault();
          setIsAutoPlay(prev => !prev);
          break;
        case 'r':
        case 'R':
          event.preventDefault();
          goToRandom();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [goToNext, goToPrevious, goToRandom]);

  const currentProject = projects[currentIndex];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div 
      className="relative min-h-screen overflow-hidden bg-black text-white sm:cursor-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShowControls(true)}
    >
      {/* Navigation - Always visible */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-opacity duration-500 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <Navigation />
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="text-center space-y-8">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 border-2 border-white/10 rounded-full" />
              <div className="absolute inset-0 border-2 border-t-primary rounded-full animate-spin" />
            </div>
            <p className="font-body text-sm uppercase tracking-[0.4em] text-white/40">
              Loading Experiments
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="text-center space-y-4 max-w-md px-6">
            <p className="font-heading text-xl text-primary">{error}</p>
            <p className="font-body text-sm text-white/50">
              Try refreshing the page.
            </p>
          </div>
        </div>
      )}

      {/* Main Immersive Gallery */}
      {!isLoading && !error && projects.length > 0 && (
        <>
          {/* Welcome Overlay - First time only */}
          {!hasInteracted && (
            <div 
              className="fixed inset-0 z-40 flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-pointer"
              onClick={() => setHasInteracted(true)}
            >
              <div className="text-center space-y-8 max-w-xl px-6">
                <h1 className="font-heading text-5xl md:text-7xl text-white">
                  <span className="text-primary">Experiments</span>
                </h1>
                <p className="font-body text-lg text-white/60">
                  Click anywhere to begin
                </p>
                <div className="flex items-center justify-center gap-6 text-white/30 text-sm">
                  <span><kbd className="px-2 py-1 border border-white/20 rounded">←→</kbd> Navigate</span>
                  <span><kbd className="px-2 py-1 border border-white/20 rounded">Space</kbd> Auto-play</span>
                </div>
              </div>
            </div>
          )}

          {/* Full-Screen Background Media */}
          <div className={`fixed inset-0 transition-opacity duration-700 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {currentProject?.media.type === "video" ? (
              <video
                key={currentProject.id}
                className="w-full h-full object-cover"
                src={currentProject.media.src}
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img
                key={currentProject?.id}
                src={currentProject?.media.src}
                alt={currentProject?.media.alt}
                className="w-full h-full object-cover"
              />
            )}
            
            {/* Cinematic Gradient Overlays - Stronger on mobile for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 sm:via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 sm:from-black/80 via-black/30 sm:via-transparent to-transparent" />
            <div className="absolute inset-0 bg-black/30 sm:bg-black/20" />
          </div>

          {/* Floating Info Card - Glassmorphism - Mobile Optimized */}
          <div 
            className={`fixed z-30 transition-all duration-500 
              inset-x-4 bottom-20 
              sm:inset-x-auto sm:left-6 sm:right-auto sm:bottom-24 sm:max-w-sm
              md:left-12 md:bottom-20 md:max-w-md
              lg:left-16 lg:bottom-24 lg:max-w-lg
              ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="backdrop-blur-xl bg-black/60 sm:bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 space-y-3 sm:space-y-4 md:space-y-5">
              {/* Category & Counter */}
              <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-4">
                <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-primary text-black text-[10px] sm:text-xs font-heading uppercase tracking-wider rounded-full">
                  {currentProject?.category}
                </span>
                <span className="text-white/40 text-xs sm:text-sm font-body">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white leading-tight">
                {currentProject?.title}
              </h2>

              {/* Description - Hidden on very small screens */}
              <p className="hidden sm:block font-body text-sm md:text-base text-white/60 leading-relaxed line-clamp-2 md:line-clamp-3">
                {currentProject?.subtitle}
              </p>

              {/* Tech Tags - Scrollable on mobile */}
              {currentProject?.tags && currentProject.tags.length > 0 && (
                <div className="flex flex-nowrap sm:flex-wrap gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {currentProject.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="flex-shrink-0 px-2 py-0.5 sm:px-3 sm:py-1 bg-white/5 border border-white/10 text-[10px] sm:text-xs font-body uppercase tracking-wider text-white/50 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA Button */}
              <a
                href={currentProject?.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-white text-black font-heading text-xs sm:text-sm uppercase tracking-wider rounded-full hover:bg-primary transition-colors group"
              >
                View Project
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Year Badge - Top Right - Hidden on mobile */}
          <div 
            className={`hidden sm:block fixed top-20 sm:top-24 right-4 sm:right-8 md:right-16 z-30 transition-all duration-500 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="font-heading text-4xl sm:text-6xl md:text-8xl text-white/10">
              {currentProject?.year}
            </span>
          </div>

          {/* Navigation Arrows - Visible on mobile, hover on desktop */}
          <button
            onClick={goToPrevious}
            className={`fixed left-2 sm:left-0 top-1/2 sm:top-0 -translate-y-1/2 sm:translate-y-0 sm:bottom-0 w-12 h-12 sm:w-16 sm:h-auto md:w-24 z-20 flex items-center justify-center cursor-pointer group transition-opacity duration-500 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}
            disabled={isTransitioning}
          >
            <div className="p-2.5 sm:p-3 md:p-4 rounded-full bg-black/40 sm:bg-white/5 backdrop-blur-sm border border-white/20 sm:border-white/10 sm:opacity-0 sm:group-hover:opacity-100 transition-all sm:group-hover:scale-110">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
            </div>
          </button>

          <button
            onClick={goToNext}
            className={`fixed right-2 sm:right-0 top-1/2 sm:top-0 -translate-y-1/2 sm:translate-y-0 sm:bottom-0 w-12 h-12 sm:w-16 sm:h-auto md:w-24 z-20 flex items-center justify-center cursor-pointer group transition-opacity duration-500 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}
            disabled={isTransitioning}
          >
            <div className="p-2.5 sm:p-3 md:p-4 rounded-full bg-black/40 sm:bg-white/5 backdrop-blur-sm border border-white/20 sm:border-white/10 sm:opacity-0 sm:group-hover:opacity-100 transition-all sm:group-hover:scale-110">
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
            </div>
          </button>

          {/* Bottom Controls Bar - Centered on mobile */}
          <div 
            className={`fixed bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-6 md:right-12 lg:right-16 sm:bottom-6 md:bottom-12 lg:bottom-16 z-30 transition-all duration-500 ${
              showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3 backdrop-blur-xl bg-black/60 sm:bg-white/5 border border-white/20 sm:border-white/10 rounded-full p-1.5 sm:p-2">
              {/* Progress Dots - Limited on mobile */}
              <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3">
                {projects.slice(0, 8).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isTransitioning) {
                        setIsTransitioning(true);
                        setTimeout(() => {
                          setCurrentIndex(index);
                          setTimeout(() => setIsTransitioning(false), 100);
                        }, 300);
                      }
                    }}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-primary w-4 sm:w-6' 
                        : 'bg-white/30 w-1 hover:bg-white/50'
                    }`}
                  />
                ))}
                {projects.length > 8 && (
                  <span className="text-white/30 text-[10px] ml-1">+{projects.length - 8}</span>
                )}
              </div>

              <div className="w-px h-5 sm:h-6 bg-white/10" />

              {/* Auto-play */}
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className={`p-2 sm:p-3 rounded-full transition-all ${
                  isAutoPlay 
                    ? 'bg-primary text-black' 
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                title="Auto-play (Space)"
              >
                {isAutoPlay ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              </button>

              {/* Random */}
              <button
                onClick={goToRandom}
                className="p-2 sm:p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all"
                title="Random (R)"
                disabled={isTransitioning}
              >
                <Shuffle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* Mobile hint removed - arrows are now visible */}

          {/* Next Project Preview - Subtle hint */}
          {nextProject && (
            <div 
              className={`fixed bottom-8 right-8 md:bottom-auto md:top-1/2 md:right-16 md:-translate-y-1/2 z-10 transition-all duration-500 hidden md:block ${
                showControls ? 'opacity-30 hover:opacity-60' : 'opacity-0'
              }`}
            >
              <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Next</p>
              <p className="text-white/60 text-sm font-heading max-w-[150px] truncate">{nextProject.title}</p>
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {!isLoading && !error && projects.length === 0 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black">
          <div className="text-center space-y-4">
            <p className="font-heading text-2xl text-white/50">No experiments yet</p>
            <p className="font-body text-sm text-white/30">Check back soon</p>
          </div>
        </div>
      )}

      {/* Custom styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Fun;
