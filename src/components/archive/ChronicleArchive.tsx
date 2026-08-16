import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArchiveLenisProvider, useArchiveLenis } from "@/contexts/ArchiveLenisContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { ScrubText } from "@/components/archive/ScrubText";
import { CHRONICLE_BEATS } from "@/lib/archive/story";
import { loadArchiveProjects, projectById, caseStudyPath } from "@/lib/archive/projects";
import type { ArchiveProject } from "@/lib/archive/types";
import { cn } from "@/lib/utils";
import { VariantSwitcher } from "@/components/archive/VariantSwitcher";

gsap.registerPlugin(ScrollTrigger);

const VISUAL_CLASS: Record<string, string> = {
  vhs: "opacity-70 contrast-125 saturate-50",
  clean: "opacity-90",
  wireframe: "grayscale contrast-150 opacity-40 mix-blend-luminosity",
  present: "opacity-100",
  burn: "sepia-[0.3] contrast-110",
};

function ChronicleInner() {
  const [projects, setProjects] = useState<ArchiveProject[]>([]);
  const { progress, timecode } = useArchiveLenis();
  const burstRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadArchiveProjects().then(setProjects);
  }, []);

  useEffect(() => {
    if (!burstRef.current) return;
    const cards = burstRef.current.querySelectorAll(".burst-card");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0, rotate: -4 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: burstRef.current,
            start: "top 70%",
            end: "top 20%",
            scrub: 1,
          },
        },
      );
    }, burstRef);
    return () => ctx.revert();
  }, [projects]);

  return (
    <div className="archive-page bg-background">
      <VariantSwitcher current="a" badge="THE CHRONICLE" subtitle="Vertical documentary" />
      <div className="fixed right-6 top-28 z-30 font-heading text-[11px] tabular-nums tracking-[0.2em] text-primary/60">
        {timecode}
      </div>
      <div className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-border/20">
        <div className="h-full bg-primary" style={{ width: `${progress * 100}%` }} />
      </div>

      {CHRONICLE_BEATS.map((beat) => {
        const beatProjects =
          beat.projectIds?.map((id) => projectById(projects, id)).filter(Boolean) as ArchiveProject[] ?? [];

        if (beat.layout === "cold-open") {
          return (
            <section key={beat.id} className="flex min-h-[100svh] items-center justify-center px-6">
              <ScrubText
                as="h2"
                text={beat.narrator}
                className="font-heading max-w-5xl text-center text-4xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl"
              />
            </section>
          );
        }

        if (beat.layout === "diary") {
          return (
            <section key={beat.id} className="border-t border-border/10 py-32 md:py-48">
              <div className="container-portfolio grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <p className="font-body text-[10px] uppercase tracking-[0.4em] text-primary">{beat.act}</p>
                  <p className="mt-4 font-heading text-sm uppercase tracking-[0.2em] text-foreground/40">Diary</p>
                </div>
                <div className="lg:col-span-8">
                  <ScrubText
                    text={beat.narrator}
                    className="font-body text-xl leading-[1.8] text-foreground/80 md:text-2xl md:leading-[1.75]"
                  />
                </div>
              </div>
            </section>
          );
        }

        if (beat.layout === "montage" || beat.layout === "burst") {
          return (
            <section
              key={beat.id}
              ref={beat.layout === "burst" ? burstRef : undefined}
              className="border-t border-border/10 py-32 md:py-40"
            >
              <div className="container-portfolio space-y-12">
                <div className="max-w-3xl space-y-4">
                  <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary">
                    {beat.act} {beat.period ? `· ${beat.period}` : ""}
                  </p>
                  <ScrubText
                    text={beat.narrator}
                    className="font-body text-lg leading-relaxed text-foreground/75 md:text-xl"
                  />
                </div>
                <div
                  className={cn(
                    "grid gap-3",
                    beat.layout === "burst" ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-4",
                  )}
                >
                  {beatProjects.map((p) => (
                    <div
                      key={p.id}
                      className={cn(
                        "burst-card group relative aspect-[3/4] overflow-hidden border border-border/25",
                        VISUAL_CLASS[beat.visual ?? "clean"],
                      )}
                    >
                      <img src={p.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                      <p className="absolute bottom-3 left-3 right-3 font-heading text-xs font-semibold text-foreground">{p.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        if (beat.layout === "project-hero" && beatProjects[0]) {
          const p = beatProjects[0];
          const cs = caseStudyPath(p.title);
          return (
            <section key={beat.id} className="relative min-h-[100svh] border-t border-border/10">
              <img src={p.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
              <div className="container-portfolio relative flex min-h-[100svh] flex-col justify-center py-24">
                <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary">{beat.act}</p>
                <h3 className="font-heading mt-4 text-4xl font-bold text-foreground md:text-6xl">{p.title}</h3>
                <ScrubText text={beat.narrator} className="mt-8 max-w-2xl font-body text-base leading-relaxed text-foreground/70 md:text-lg" />
                {cs && (
                  <Link to={cs} className="mt-8 inline-flex w-fit bg-primary px-6 py-3 font-body text-xs font-bold uppercase tracking-[0.25em] text-background">
                    Case Study
                  </Link>
                )}
              </div>
            </section>
          );
        }

        if (beat.layout === "split-career") {
          return (
            <section key={beat.id} className="border-t border-border/10 py-32 md:py-48">
              <div className="container-portfolio grid gap-12 lg:grid-cols-2">
                <div className="space-y-4">
                  <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary">{beat.act} · {beat.period}</p>
                  <p className="font-heading text-3xl font-bold text-foreground">DiligenceVault</p>
                  <ScrubText text={beat.narrator} className="font-body text-base leading-relaxed text-foreground/70" />
                </div>
                <div className="space-y-4 border border-border/25 bg-card/30 p-8">
                  {["Agent orchestration", "5,000+ doc chunks", "82% retrieval precision", "60% less manual review"].map((m) => (
                    <div key={m} className="flex items-center gap-3 border-b border-border/15 pb-3 last:border-0">
                      <span className="h-1.5 w-1.5 bg-primary" />
                      <span className="font-body text-sm text-foreground/80">{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        if (beat.layout === "sticky-now") {
          return (
            <section key={beat.id} className="border-t border-border/10 py-32">
              <div className="container-portfolio">
                <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary">{beat.act} · Present</p>
                <ScrubText text={beat.narrator} className="mt-6 max-w-4xl font-heading text-2xl font-medium leading-snug text-foreground md:text-4xl" />
                <div className="mt-12 grid gap-4 sm:grid-cols-2">
                  {beatProjects.map((p) => (
                    <div key={p.id} className="flex gap-4 border border-primary/30 bg-primary/5 p-6">
                      <img src={p.image} alt="" className="h-20 w-20 object-cover" loading="lazy" />
                      <div>
                        <p className="font-heading font-semibold text-foreground">{p.title}</p>
                        <p className="mt-1 font-body text-xs text-foreground/50">{p.project_date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        if (beat.layout === "rewind-voice") {
          return (
            <section key={beat.id} className="border-t border-primary/20 bg-primary/[0.03] py-32 md:py-48">
              <div className="container-portfolio max-w-3xl space-y-8">
                <p className="font-body text-[10px] uppercase tracking-[0.4em] text-primary/80">Rewind · Inner voice</p>
                <ScrubText text={beat.narrator} className="font-heading text-2xl italic text-foreground/90 md:text-3xl" />
                {beat.innerVoice && (
                  <ScrubText text={beat.innerVoice} className="font-body text-base leading-relaxed text-foreground/50 md:text-lg" start="top 90%" end="top 50%" />
                )}
              </div>
            </section>
          );
        }

        if (beat.layout === "manifesto") {
          return (
            <section key={beat.id} className="border-t border-border/15 py-40 text-center">
              <div className="container-portfolio mx-auto max-w-2xl space-y-8">
                <ScrubText as="h2" text={beat.narrator} className="font-heading text-3xl italic text-foreground md:text-4xl" />
                <Link to="/archive" className="inline-block border border-border/40 px-6 py-3 font-body text-xs uppercase tracking-[0.25em] text-foreground/70 hover:border-primary/50">
                  Compare narrative modes
                </Link>
              </div>
            </section>
          );
        }

        return null;
      })}
    </div>
  );
}

export function ChronicleArchive() {
  return (
    <ArchiveLenisProvider>
      <Seo title="The Chronicle — Archive | Kedhar" description="Vertical documentary scroll through projects and diary voice." path="/archive/a" image="/og-work.png" />
      <Navigation />
      <main><ChronicleInner /></main>
      <Footer quote="Diary first. Metadata second." />
    </ArchiveLenisProvider>
  );
}
