import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArchiveLenisProvider, useArchiveLenis } from "@/contexts/ArchiveLenisContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { REEL_SCENES } from "@/lib/archive/story";
import { loadArchiveProjects, projectById } from "@/lib/archive/projects";
import type { ArchiveProject } from "@/lib/archive/types";
import { VariantSwitcher } from "@/components/archive/VariantSwitcher";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

function ReelInner() {
  const [projects, setProjects] = useState<ArchiveProject[]>([]);
  const { progress, timecode } = useArchiveLenis();
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rewindPinRef = useRef<HTMLDivElement>(null);
  const rewindTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadArchiveProjects().then(setProjects);
  }, []);

  useEffect(() => {
    if (!projects.length) return;

    const ctx = gsap.context(() => {
      const pin = pinRef.current;
      const track = trackRef.current;
      const rewindPin = rewindPinRef.current;
      const rewindTrack = rewindTrackRef.current;

      if (pin && track) {
        gsap.to(track, {
          x: () => -Math.max(0, track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${window.innerHeight * REEL_SCENES.length * 0.9}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      if (rewindPin && rewindTrack) {
        const dist = () => Math.max(0, rewindTrack.scrollWidth - window.innerWidth);
        gsap.fromTo(
          rewindTrack,
          { x: () => -dist() },
          {
            x: 0,
            ease: "none",
            scrollTrigger: {
              trigger: rewindPin,
              start: "top top",
              end: () => `+=${window.innerHeight * 2}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );
      }
    });

    const t = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, [projects]);

  const renderScene = (scene: (typeof REEL_SCENES)[0], rewind = false) => {
    const sceneProjects = scene.projectIds
      .map((id) => projectById(projects, id))
      .filter((p): p is ArchiveProject => !!p);

    return (
      <article
        key={`${scene.id}-${rewind ? "rw" : "fw"}`}
        className={cn(
          "relative flex h-[100svh] w-[100vw] shrink-0 flex-col justify-end overflow-hidden border-r border-border/30",
          rewind && "bg-background",
        )}
      >
        {/* Film burn top */}
        <div className={cn("absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/20 to-transparent", rewind && "from-primary/40")} />

        {/* Background collage */}
        <div className="absolute inset-0 flex">
          {sceneProjects.slice(0, 3).map((p, i) => (
            <img
              key={p.id}
              src={p.image}
              alt=""
              className={cn(
                "h-full flex-1 object-cover",
                rewind ? "grayscale opacity-25" : "opacity-40",
                i === 1 && "scale-110",
              )}
              style={{ objectPosition: `${20 + i * 30}% center` }}
              loading="lazy"
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/30" />

        {/* Scene metadata — screenplay format */}
        <div className="relative z-10 p-8 md:p-14">
          <div className="mb-8 flex items-start justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-primary/70">
            <div>
              <p>{scene.sceneLabel}</p>
              <p className="mt-1 text-foreground/50">{scene.slug}</p>
            </div>
            <p className="text-foreground/40">{rewind ? "REWIND" : scene.duration}</p>
          </div>

          <p className="font-body max-w-xl text-[11px] uppercase tracking-[0.2em] text-foreground/45">{scene.direction}</p>

          <p className="font-heading mt-8 max-w-3xl text-3xl font-bold leading-tight text-foreground md:text-5xl">
            {scene.narrator}
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            {sceneProjects.map((p) => (
              <span key={p.id} className="border border-border/30 px-3 py-1.5 font-body text-[10px] uppercase tracking-[0.15em] text-foreground/60">
                {rewind ? p.objectives[0]?.slice(0, 48) + "…" : p.title}
              </span>
            ))}
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="archive-page bg-background">
      <VariantSwitcher current="b" badge="THE REEL" subtitle="Screenplay scenes · horizontal" />
      <div className="fixed right-6 top-28 z-30 font-mono text-[11px] text-primary/60">{timecode}</div>
      <div className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-border/20">
        <div className="h-full bg-primary" style={{ width: `${progress * 100}%` }} />
      </div>

      {/* Leader countdown intro */}
      <section className="flex min-h-[100svh] flex-col items-center justify-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-foreground/40">Universal Leader</p>
        <div className="mt-12 flex gap-12 font-heading text-6xl font-bold text-primary md:text-8xl">
          <span>3</span><span>2</span><span>1</span>
        </div>
        <p className="mt-16 font-body text-sm uppercase tracking-[0.35em] text-foreground/50">Scroll to roll camera</p>
      </section>

      <section ref={pinRef} className="relative h-[100svh] overflow-hidden">
        <div ref={trackRef} className="flex h-full will-change-transform">
          {REEL_SCENES.filter((s) => s.id !== "s06").map((s) => renderScene(s))}
        </div>
      </section>

      <section ref={rewindPinRef} className="relative h-[100svh] overflow-hidden border-t border-primary/30">
        <p className="absolute left-6 top-6 z-20 font-mono text-[10px] uppercase tracking-[0.35em] text-primary">Rewind layer</p>
        <div ref={rewindTrackRef} className="flex h-full will-change-transform">
          {REEL_SCENES.map((s) => renderScene(s, true))}
        </div>
      </section>
    </div>
  );
}

export function ReelArchive() {
  return (
    <ArchiveLenisProvider>
      <Seo title="The Reel — Archive | Kedhar" description="Cinematic screenplay scroll through project scenes." path="/archive/b" image="/og-work.png" />
      <Navigation />
      <main><ReelInner /></main>
      <Footer quote="Scene by scene." />
    </ArchiveLenisProvider>
  );
}
