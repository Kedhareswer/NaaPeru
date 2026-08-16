import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArchiveLenisProvider, useArchiveLenis } from "@/contexts/ArchiveLenisContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { SIGNAL_BEATS } from "@/lib/archive/story";
import { loadArchiveProjects, projectById } from "@/lib/archive/projects";
import type { ArchiveProject } from "@/lib/archive/types";
import { VariantSwitcher } from "@/components/archive/VariantSwitcher";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

function SignalInner() {
  const [projects, setProjects] = useState<ArchiveProject[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const { progress } = useArchiveLenis();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadArchiveProjects().then(setProjects);
  }, []);

  useEffect(() => {
    const sections = containerRef.current?.querySelectorAll(".signal-beat");
    if (!sections?.length) return;

    const triggers = Array.from(sections).map((section, i) =>
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveIndex(i),
        onEnterBack: () => setActiveIndex(i),
      }),
    );

    return () => triggers.forEach((t) => t.kill());
  }, [projects]);

  useEffect(() => {
    const ghosts = containerRef.current?.querySelectorAll(".signal-ghost");
    if (!ghosts?.length) return;

    const ctx = gsap.context(() => {
      ghosts.forEach((ghost) => {
        gsap.fromTo(
          ghost,
          { scale: 0.6, opacity: 0, rotate: -8 },
          {
            scale: 1,
            opacity: 0.35,
            rotate: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ghost,
              start: "top 80%",
              end: "top 30%",
              scrub: 1,
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [projects]);

  const activeBeat = SIGNAL_BEATS[activeIndex];
  const activeProjects =
    activeBeat?.projectIds?.map((id) => projectById(projects, id)).filter(Boolean) as ArchiveProject[] ?? [];

  return (
    <div className="archive-page relative min-h-screen bg-background">
      <VariantSwitcher current="c" badge="THE SIGNAL" subtitle="Typography · one line at a time" />
      <div className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-border/20">
        <div className="h-full bg-primary" style={{ width: `${progress * 100}%` }} />
      </div>

      {/* Floating ghost project orbit */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {activeProjects.map((p, i) => (
          <img
            key={p.id}
            src={p.image}
            alt=""
            className="signal-ghost absolute h-32 w-32 object-cover opacity-0 md:h-48 md:w-48"
            style={{
              top: `${15 + i * 22}%`,
              left: i % 2 === 0 ? "8%" : "auto",
              right: i % 2 === 1 ? "8%" : "auto",
              transform: `rotate(${i % 2 === 0 ? -6 : 6}deg)`,
            }}
            loading="lazy"
          />
        ))}
      </div>

      <div ref={containerRef}>
        {SIGNAL_BEATS.map((beat, i) => (
          <section
            key={beat.id}
            className="signal-beat relative flex min-h-[100svh] items-center justify-center px-6 py-24"
          >
            <div
              className={cn(
                "relative z-10 max-w-5xl text-center transition-opacity duration-500",
                activeIndex === i ? "opacity-100" : "opacity-30",
              )}
            >
              <h2
                className={cn(
                  "font-heading font-bold leading-[1.05] tracking-tight",
                  beat.accent ? "text-5xl text-primary md:text-7xl lg:text-8xl" : "text-4xl text-foreground md:text-6xl lg:text-7xl",
                )}
              >
                {beat.line}
              </h2>
              {beat.subline && (
                <p className="mx-auto mt-8 max-w-xl font-body text-base text-foreground/50 md:text-lg">{beat.subline}</p>
              )}
              {beat.projectIds && (
                <p className="mt-6 font-body text-[10px] uppercase tracking-[0.35em] text-foreground/35">
                  {beat.projectIds.length} project{beat.projectIds.length > 1 ? "s" : ""} in frame
                </p>
              )}
            </div>
          </section>
        ))}
      </div>

      <section className="relative z-10 border-t border-border/15 py-24 text-center">
        <Link to="/archive" className="font-body text-xs uppercase tracking-[0.3em] text-primary hover:text-primary/80">
          Pick your narrative mode
        </Link>
      </section>
    </div>
  );
}

export function SignalArchive() {
  return (
    <ArchiveLenisProvider>
      <Seo title="The Signal — Archive | Kedhar" description="Typography-led scroll story. One line at a time." path="/archive/c" image="/og-work.png" />
      <Navigation />
      <main><SignalInner /></main>
      <Footer quote="Less UI. More hook." />
    </ArchiveLenisProvider>
  );
}
