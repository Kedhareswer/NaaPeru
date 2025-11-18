import { useEffect, useState, useCallback, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowRight, ArrowLeft, Play, Pause, Shuffle, Trophy, Lock, Unlock, Volume2, VolumeX } from "lucide-react";

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

type Achievement = {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
};

const Fun = () => {
  const [projects, setProjects] = useState<FunProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [konamiUnlocked, setKonamiUnlocked] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: "first_view", title: "First Steps", description: "Viewed your first project", unlocked: false, icon: "👀" },
    { id: "explorer", title: "Explorer", description: "Viewed 5 different projects", unlocked: false, icon: "🗺️" },
    { id: "completionist", title: "Completionist", description: "Viewed all projects", unlocked: false, icon: "🏆" },
    { id: "speed_runner", title: "Speed Runner", description: "Navigated through 3 projects in 10 seconds", unlocked: false, icon: "⚡" },
    { id: "konami_master", title: "Konami Master", description: "Found the secret code", unlocked: false, icon: "🎮" },
    { id: "random_explorer", title: "Random Explorer", description: "Used random project 3 times", unlocked: false, icon: "🎲" },
  ]);
  const [viewedProjects, setViewedProjects] = useState<Set<number>>(new Set());
  const [randomCount, setRandomCount] = useState(0);
  const [navigationSpeed, setNavigationSpeed] = useState<number[]>([]);
  
  const autoPlayRef = useRef<NodeJS.Timeout>();
  const konamiSequence = useRef<string[]>([]);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

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

  // Achievement system
  const unlockAchievement = useCallback((achievementId: string) => {
    setAchievements(prev => prev.map(achievement => 
      achievement.id === achievementId 
        ? { ...achievement, unlocked: true }
        : achievement
    ));
  }, []);

  // Track project views for achievements
  useEffect(() => {
    if (projects.length > 0 && currentIndex >= 0) {
      const projectId = projects[currentIndex]?.id;
      if (projectId) {
        setViewedProjects(prev => {
          const newViewed = new Set(prev);
          newViewed.add(projectId);
          
          // Check achievements
          if (newViewed.size === 1) {
            unlockAchievement("first_view");
          } else if (newViewed.size >= 5) {
            unlockAchievement("explorer");
          }
          if (newViewed.size === projects.length) {
            unlockAchievement("completionist");
          }
          
          return newViewed;
        });
      }
    }
  }, [currentIndex, projects, unlockAchievement]);

  // Navigation functions
  const goToNext = useCallback(() => {
    if (projects.length === 0) return;
    setCurrentIndex(prev => (prev + 1) % projects.length);
    setNavigationSpeed(prev => [...prev, Date.now()]);
  }, [projects.length]);

  const goToPrevious = useCallback(() => {
    if (projects.length === 0) return;
    setCurrentIndex(prev => (prev - 1 + projects.length) % projects.length);
    setNavigationSpeed(prev => [...prev, Date.now()]);
  }, [projects.length]);

  const goToRandom = useCallback(() => {
    if (projects.length === 0) return;
    const randomIndex = Math.floor(Math.random() * projects.length);
    setCurrentIndex(randomIndex);
    setRandomCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 3) {
        unlockAchievement("random_explorer");
      }
      return newCount;
    });
  }, [projects.length, unlockAchievement]);

  // Speed runner achievement check
  useEffect(() => {
    if (navigationSpeed.length >= 3) {
      const recent = navigationSpeed.slice(-3);
      const timeDiff = recent[recent.length - 1] - recent[0];
      if (timeDiff <= 10000) { // 10 seconds
        unlockAchievement("speed_runner");
      }
    }
  }, [navigationSpeed, unlockAchievement]);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay && projects.length > 0) {
      autoPlayRef.current = setInterval(goToNext, 4000);
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

  // Konami code detection
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      konamiSequence.current.push(event.code);
      if (konamiSequence.current.length > konamiCode.length) {
        konamiSequence.current.shift();
      }
      
      if (konamiSequence.current.length === konamiCode.length &&
          konamiSequence.current.every((key, index) => key === konamiCode[index])) {
        setKonamiUnlocked(true);
        unlockAchievement("konami_master");
        konamiSequence.current = [];
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [unlockAchievement]);

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
        case 's':
        case 'S':
          event.preventDefault();
          setSoundEnabled(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [goToNext, goToPrevious, goToRandom]);

  const currentProject = projects[currentIndex];
  const unlockedAchievements = achievements.filter(a => a.unlocked);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground pt-24 pb-32 md:pt-28 md:pb-16">
      <Navigation />

      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_hsla(var(--primary)/0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_hsla(var(--primary)/0.08),transparent_60%)]" />
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/20 rounded-full animate-float" />
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-primary/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-primary/25 rounded-full animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2">
              <div className="h-4 w-4 rounded-full bg-primary animate-bounce" />
              <div className="h-4 w-4 rounded-full bg-primary/80 animate-bounce" style={{ animationDelay: "120ms" }} />
              <div className="h-4 w-4 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "240ms" }} />
            </div>
            <div className="space-y-2">
              <p className="font-heading text-2xl text-foreground/80">Loading the Lab...</p>
              <p className="font-body text-xs uppercase tracking-[0.35em] text-foreground/40">
                Preparing interactive experiments
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4 max-w-md">
            <div className="text-6xl">⚠️</div>
            <p className="font-heading text-xl text-primary">{error}</p>
            <p className="font-body text-sm text-foreground/70">
              Something went wrong loading the experiments. Try refreshing the page.
            </p>
          </div>
        </div>
      )}

      {/* Main Carousel Interface */}
      {!isLoading && !error && projects.length > 0 && (
        <>
          {/* Welcome Splash (only on first load) */}
          {currentIndex === 0 && viewedProjects.size === 0 && (
            <div className="absolute inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center animate-fade-in">
              <div className="text-center space-y-8 max-w-2xl px-6">
                <div className="space-y-4">
                  <h1 className="font-heading text-6xl md:text-8xl text-foreground animate-slide-up">
                    Welcome to the <span className="text-primary">Lab</span>
                  </h1>
                  <p className="font-body text-lg text-foreground/70 animate-slide-up" style={{ animationDelay: '200ms' }}>
                    Interactive experiments, playful projects, and digital chaos.
                  </p>
                </div>
                
                <div className="space-y-4 animate-slide-up" style={{ animationDelay: '400ms' }}>
                  <p className="font-body text-sm text-foreground/60">
                    Use <kbd className="px-2 py-1 bg-primary/20 rounded text-primary">←→</kbd> arrows, 
                    <kbd className="px-2 py-1 bg-primary/20 rounded text-primary ml-2">Space</kbd> for auto-play, 
                    <kbd className="px-2 py-1 bg-primary/20 rounded text-primary ml-2">R</kbd> for random
                  </p>
                  <button
                    onClick={() => setViewedProjects(new Set([projects[0].id]))}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-background font-heading text-sm uppercase tracking-wider rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Start Exploring
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {konamiUnlocked && (
                  <div className="absolute top-4 right-4 text-2xl animate-bounce">
                    🎮 Secret Unlocked!
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Main Carousel */}
          <div className="relative min-h-screen flex items-center justify-center">
            {/* Project Display */}
            <div className="relative w-full max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
                {/* Project Media */}
                <div className="relative group">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-foreground/5 border border-border/25">
                    {currentProject?.media.type === "video" ? (
                      <video
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={currentProject.media.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={currentProject?.media.src}
                        alt={currentProject?.media.alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    
                    {/* Media Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary/90 text-background text-xs font-heading uppercase tracking-wider rounded-full">
                        {currentProject?.category}
                      </span>
                    </div>

                    {/* Year Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-background/90 text-foreground text-xs font-heading uppercase tracking-wider rounded-full border border-border/40">
                        {currentProject?.year}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="space-y-8 pb-24 md:pb-0">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="font-body text-xs uppercase tracking-[0.4em] text-primary/70">
                        Experiment {currentIndex + 1} of {projects.length}
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
                    </div>
                    
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
                      {currentProject?.title}
                    </h2>
                    
                    <p className="font-body text-lg text-foreground/70 leading-relaxed">
                      {currentProject?.subtitle}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  {currentProject?.tags && currentProject.tags.length > 0 && (
                    <div className="space-y-3">
                      <p className="font-body text-xs uppercase tracking-[0.35em] text-foreground/50">
                        Tech Stack
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {currentProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 border border-border/40 text-xs font-body uppercase tracking-wider text-foreground/70 hover:border-primary/40 hover:text-primary transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="flex items-center gap-4">
                    <a
                      href={currentProject?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-background font-heading text-sm uppercase tracking-wider rounded-lg hover:bg-primary/90 transition-colors group"
                    >
                      Explore Project
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                    
                    {konamiUnlocked && (
                      <button className="px-4 py-2 border border-primary/40 text-primary text-xs uppercase tracking-wider rounded-lg hover:bg-primary/10 transition-colors">
                        🎮 Secret Mode
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute inset-x-4 bottom-4 md:bottom-8 md:left-1/2 md:inset-x-auto md:-translate-x-1/2">
              <div className="w-full max-w-xl mx-auto flex flex-wrap items-center justify-center gap-3 md:gap-4 px-4 py-3 md:px-6 bg-background/90 backdrop-blur-sm border border-border/40 rounded-2xl md:rounded-full">
                {/* Previous */}
                <button
                  onClick={goToPrevious}
                  className="p-2 hover:bg-primary/10 rounded-full transition-colors group"
                  title="Previous (←)"
                >
                  <ArrowLeft className="w-5 h-5 text-foreground/70 group-hover:text-primary" />
                </button>

                {/* Progress Dots */}
                <div className="flex items-center gap-2">
                  {projects.slice(0, 5).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex 
                          ? 'bg-primary w-6' 
                          : 'bg-foreground/30 hover:bg-foreground/50'
                      }`}
                    />
                  ))}
                  {projects.length > 5 && (
                    <span className="text-xs text-foreground/50 ml-2">
                      +{projects.length - 5} more
                    </span>
                  )}
                </div>

                {/* Next */}
                <button
                  onClick={goToNext}
                  className="p-2 hover:bg-primary/10 rounded-full transition-colors group"
                  title="Next (→)"
                >
                  <ArrowRight className="w-5 h-5 text-foreground/70 group-hover:text-primary" />
                </button>
              </div>
            </div>

            {/* Side Controls */}
            <div className="hidden md:block absolute right-6 top-1/2 transform -translate-y-1/2">
              <div className="flex flex-col gap-3">
                {/* Auto-play */}
                <button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className={`p-3 rounded-full border transition-colors ${
                    isAutoPlay 
                      ? 'bg-primary text-background border-primary' 
                      : 'bg-background/80 text-foreground/70 border-border/40 hover:border-primary/40'
                  }`}
                  title={`${isAutoPlay ? 'Pause' : 'Play'} Auto-play (Space)`}
                >
                  {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                {/* Random */}
                <button
                  onClick={goToRandom}
                  className="p-3 bg-background/80 text-foreground/70 border border-border/40 rounded-full hover:border-primary/40 hover:text-primary transition-colors"
                  title="Random Project (R)"
                >
                  <Shuffle className="w-4 h-4" />
                </button>

                {/* Achievements */}
                <button
                  onClick={() => setShowAchievements(!showAchievements)}
                  className={`p-3 rounded-full border transition-colors relative ${
                    showAchievements
                      ? 'bg-primary text-background border-primary'
                      : 'bg-background/80 text-foreground/70 border-border/40 hover:border-primary/40'
                  }`}
                  title="Achievements"
                >
                  <Trophy className="w-4 h-4" />
                  {unlockedAchievements.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-background text-xs rounded-full flex items-center justify-center">
                      {unlockedAchievements.length}
                    </span>
                  )}
                </button>

                {/* Sound Toggle */}
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`p-3 rounded-full border transition-colors ${
                    soundEnabled
                      ? 'bg-primary text-background border-primary'
                      : 'bg-background/80 text-foreground/70 border-border/40 hover:border-primary/40'
                  }`}
                  title={`${soundEnabled ? 'Disable' : 'Enable'} Sound (S)`}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Achievements Panel */}
          {showAchievements && (
            <div className="fixed inset-y-0 right-0 w-full sm:w-80 bg-background/95 backdrop-blur-sm border-l border-border/40 z-40 overflow-y-auto">
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-xl text-foreground">Achievements</h3>
                  <button
                    onClick={() => setShowAchievements(false)}
                    className="p-2 hover:bg-foreground/10 rounded-full transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg border transition-all ${
                        achievement.unlocked
                          ? 'bg-primary/10 border-primary/40 text-foreground'
                          : 'bg-foreground/5 border-border/25 text-foreground/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{achievement.icon}</span>
                        <div className="space-y-1">
                          <h4 className="font-heading text-sm">{achievement.title}</h4>
                          <p className="font-body text-xs">{achievement.description}</p>
                        </div>
                        {achievement.unlocked ? (
                          <Unlock className="w-4 h-4 text-primary ml-auto" />
                        ) : (
                          <Lock className="w-4 h-4 text-foreground/30 ml-auto" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-border/25 space-y-2">
                  <p className="font-body text-xs text-foreground/60">
                    Progress: {viewedProjects.size}/{projects.length} projects viewed
                  </p>
                  <div className="w-full bg-foreground/10 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(viewedProjects.size / projects.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Keyboard Shortcuts Help */}
          <div className="hidden md:block fixed bottom-4 left-4 text-xs text-foreground/40 space-y-1">
            <p>← → Navigate</p>
            <p>Space Auto-play</p>
            <p>R Random</p>
            <p>S Sound</p>
          </div>
        </>
      )}

      {/* Empty State */}
      {!isLoading && !error && projects.length === 0 && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-6">
            <div className="text-8xl">🧪</div>
            <div className="space-y-2">
              <p className="font-heading text-2xl text-foreground/70">Lab is Empty</p>
              <p className="font-body text-sm text-foreground/50">
                No experiments found. Time to build something!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fun;
