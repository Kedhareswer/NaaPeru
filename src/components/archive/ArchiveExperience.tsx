import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { ArchiveLenisProvider, useArchiveLenis } from "@/contexts/ArchiveLenisContext";
import { useArchiveScroll } from "@/hooks/useArchiveScroll";
import { ArchiveFrame } from "@/components/archive/ArchiveFrame";
import { ArchiveMontageFrame } from "@/components/archive/ArchiveMontageFrame";
import { ARCHIVE_FRAMES, getVariantMeta } from "@/lib/archive/variants";
import { loadArchiveProjects, projectById } from "@/lib/archive/projects";
import type { ArchiveFrame as FrameDef, ArchiveProject, ArchiveVariantId } from "@/lib/archive/types";
import { cn } from "@/lib/utils";

function renderFrame(
  frame: FrameDef,
  projects: ArchiveProject[],
  index: number,
  total: number,
  mode: "forward" | "rewind",
) {
  if (frame.kind === "montage") {
    const montageProjects = frame.projectIds
      .map((id) => projectById(projects, id))
      .filter((p): p is ArchiveProject => !!p);

    return (
      <ArchiveMontageFrame
        key={`${mode}-${frame.id}`}
        title={frame.title}
        subtitle={frame.subtitle}
        period={frame.period}
        projects={montageProjects}
        index={index}
        total={total}
        mode={mode}
      />
    );
  }

  const project = projectById(projects, frame.projectId);
  if (!project) return null;

  return (
    <ArchiveFrame
      key={`${mode}-${project.id}`}
      project={project}
      index={index}
      total={total}
      mode={mode}
    />
  );
}

function ArchiveExperienceInner({ variant }: { variant: ArchiveVariantId }) {
  const meta = getVariantMeta(variant);
  const frames = ARCHIVE_FRAMES[variant];
  const [projects, setProjects] = useState<ArchiveProject[]>([]);
  const [loading, setLoading] = useState(true);
  const { timecode, progress } = useArchiveLenis();
  const { pinRef, trackRef, rewindPinRef, rewindTrackRef } = useArchiveScroll({
    frameCount: frames.length,
  });

  useEffect(() => {
    loadArchiveProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  const shutterBars = useMemo(() => Array.from({ length: 7 }), []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="font-body text-xs uppercase tracking-[0.35em] text-foreground/50">Loading archive...</p>
      </div>
    );
  }

  return (
    <div className="archive-page overflow-x-hidden bg-background">
      {/* Variant badge + timecode */}
      <div className="pointer-events-none fixed left-0 right-0 top-24 z-30 flex items-start justify-between px-6 sm:px-8 md:px-12">
        <div className="pointer-events-auto border border-primary/40 bg-background/80 px-4 py-2 backdrop-blur">
          <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary">{meta.label}</p>
          <p className="font-heading text-sm font-semibold text-foreground">{meta.title}</p>
          <p className="font-body text-[10px] text-foreground/50">{meta.frameCount} frames</p>
        </div>
        <div className="font-heading text-[11px] tabular-nums tracking-[0.2em] text-primary/70">{timecode}</div>
      </div>

      {/* Compare strip */}
      <div className="fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-1 border border-border/30 bg-background/90 p-1 backdrop-blur">
        {(["a", "b", "c"] as const).map((v) => (
          <Link
            key={v}
            to={`/archive/${v}`}
            className={cn(
              "px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[0.2em] transition-colors",
              v === variant ? "bg-primary text-background" : "text-foreground/60 hover:text-foreground",
            )}
          >
            {v.toUpperCase()}
          </Link>
        ))}
        <Link
          to="/archive"
          className="border-l border-border/30 px-3 py-1.5 font-body text-[10px] uppercase tracking-[0.2em] text-foreground/50 hover:text-foreground"
        >
          Compare
        </Link>
      </div>

      {/* Progress bar */}
      <div className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-border/20">
        <div className="h-full bg-primary transition-[width] duration-150 ease-out" style={{ width: `${progress * 100}%` }} />
      </div>

      {/* Act I — Cold open */}
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-24 pt-40">
        <div className="pointer-events-none absolute inset-0 flex items-center overflow-hidden">
          <h1
            className="font-heading whitespace-nowrap font-bold leading-none tracking-tighter text-foreground/[0.04] select-none"
            style={{ fontSize: "clamp(6rem, 20vw, 18rem)" }}
          >
            ARCHIVE
          </h1>
        </div>

        {/* Shutter intro bars */}
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col">
          {shutterBars.map((_, i) => (
            <div
              key={i}
              className="archive-shutter-bar flex-1 bg-background"
              style={{ animationDelay: `${i * 80}ms` }}
            />
          ))}
        </div>

        <div className="container-portfolio relative z-20">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-primary/60" />
              <span className="font-body text-xs uppercase tracking-[0.4em] text-primary/80">
                {meta.label} &middot; {meta.tagline}
              </span>
            </div>
            <h2 className="font-heading max-w-5xl text-3xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              Everything I&apos;ve shipped, in order.
            </h2>
            <p className="font-body max-w-2xl text-base text-foreground/60 md:text-lg">
              Scroll down. The track moves left. Keep going — the film rewinds with a different layer.
              {variant === "a" && " All fifteen projects, one frame each."}
              {variant === "b" && " Montage clusters for the burst, standouts on their own."}
              {variant === "c" && " Eight curated frames — tightest arc."}
            </p>
            <p className="font-body text-[10px] uppercase tracking-[0.3em] text-foreground/40">
              Scroll to play &darr;
            </p>
          </div>
        </div>
      </section>

      {/* Act II — Horizontal dailies (forward) */}
      <section ref={pinRef} className="archive-pin-section relative h-[100svh] overflow-hidden">
        <div className="absolute left-6 top-6 z-10 font-body text-[10px] uppercase tracking-[0.35em] text-foreground/40">
          Dailies &mdash; forward
        </div>
        <div ref={trackRef} className="flex h-full will-change-transform">
          {frames.map((frame, i) => renderFrame(frame, projects, i, frames.length, "forward"))}
        </div>
      </section>

      {/* Act III — Timeline strip (vertical breath) */}
      <section className="border-y border-border/15 py-24 md:py-32">
        <div className="container-portfolio space-y-10">
          <div className="space-y-3">
            <span className="font-body text-[10px] uppercase tracking-[0.35em] text-primary/80">Timeline</span>
            <h3 className="font-heading text-2xl text-foreground md:text-3xl">The full strip at once.</h3>
          </div>
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-2" style={{ minWidth: "max-content" }}>
              {projects
                .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                .map((p) => (
                  <div key={p.id} className="w-28 shrink-0 border border-border/20 sm:w-32">
                    <img src={p.image} alt="" className="aspect-square w-full object-cover opacity-70" loading="lazy" />
                    <p className="truncate p-2 font-body text-[9px] uppercase tracking-[0.1em] text-foreground/50">
                      {p.project_date}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Act IV — Rewind (horizontal opposite) */}
      <section ref={rewindPinRef} className="archive-pin-section relative h-[100svh] overflow-hidden">
        <div className="absolute left-6 top-6 z-10 font-body text-[10px] uppercase tracking-[0.35em] text-primary/60">
          Rewind &mdash; objectives layer
        </div>
        <div ref={rewindTrackRef} className="flex h-full will-change-transform">
          {[...frames].reverse().map((frame, i) =>
            renderFrame(frame, projects, frames.length - 1 - i, frames.length, "rewind"),
          )}
        </div>
      </section>

      {/* Act V — End card */}
      <section className="border-t border-border/15 py-32 md:py-40">
        <div className="container-portfolio mx-auto max-w-3xl text-center space-y-8">
          <div className="mx-auto h-px w-16 bg-primary" />
          <p className="font-heading text-2xl italic leading-snug text-foreground/90 md:text-3xl">
            I don&apos;t know where this goes. I just know I won&apos;t stop.
          </p>
          <p className="font-body text-sm text-foreground/50">
            You viewed {meta.title}. Pick A, B, or C from the bar below when you&apos;re ready to decide.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-primary px-6 py-3 font-body text-xs font-bold uppercase tracking-[0.25em] text-background hover:bg-primary/90"
            >
              Back to Work
            </Link>
            <Link
              to="/archive"
              className="inline-flex items-center gap-2 border border-border/40 px-6 py-3 font-body text-xs uppercase tracking-[0.25em] text-foreground hover:border-primary/50"
            >
              Compare Variants
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export function ArchiveExperience({ variant }: { variant: ArchiveVariantId }) {
  const meta = getVariantMeta(variant);

  return (
    <ArchiveLenisProvider>
      <Seo
        title={`Archive ${variant.toUpperCase()} — ${meta.title} | Kedhar`}
        description={meta.description}
        path={`/archive/${variant}`}
        image="/og-work.png"
        imageAlt={`Archive variant ${variant} project timeline`}
      />
      <Navigation />
      <main>
        <ArchiveExperienceInner variant={variant} />
      </main>
      <Footer quote="The shape of the work is more important than the volume of it." />
    </ArchiveLenisProvider>
  );
}
