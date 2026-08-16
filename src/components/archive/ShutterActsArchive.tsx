import { useEffect, useState } from "react";
import { ArchiveLenisProvider, useArchiveLenis } from "@/contexts/ArchiveLenisContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { SchizoSwitcher } from "@/components/archive/SchizoSwitcher";
import { ActShutter } from "@/components/archive/ActShutter";
import { ScrubText } from "@/components/archive/ScrubText";
import { SHUTTER_ACTS } from "@/lib/archive/schizotech";
import { loadArchiveProjects, projectById } from "@/lib/archive/projects";
import type { ArchiveProject } from "@/lib/archive/types";

function ShutterInner() {
  const [projects, setProjects] = useState<ArchiveProject[]>([]);
  const { progress, timecode } = useArchiveLenis();

  useEffect(() => {
    loadArchiveProjects().then(setProjects);
  }, []);

  return (
    <div className="archive-page min-h-screen bg-background">
      <SchizoSwitcher current="f" badge="FILM SHUTTER" subtitle="Act breaks · 7-bar cuts" />
      <div className="fixed right-6 top-28 z-30 font-mono text-[11px] text-primary/60">{timecode}</div>
      <div className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-border/20">
        <div className="h-full bg-primary" style={{ width: `${progress * 100}%` }} />
      </div>

      <section className="flex min-h-[80svh] items-center justify-center px-6">
        <div className="max-w-2xl text-center space-y-4">
          <p className="font-body text-[10px] uppercase tracking-[0.4em] text-primary">Five acts · seven bars each</p>
          <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">Scroll. The shutter cuts.</h1>
          <p className="font-body text-sm text-foreground/50">Same 7-bar transition as site navigation — triggered by story, not clicks.</p>
        </div>
      </section>

      {SHUTTER_ACTS.map((act, i) => {
        const actProjects = act.projectIds
          .map((id) => projectById(projects, id))
          .filter((p): p is ArchiveProject => !!p);

        return (
          <div key={act.id}>
            {i > 0 && (
              <div className="relative h-4">
                <ActShutter ghostWord={act.ghostWord} />
              </div>
            )}

            <section className="min-h-[100svh] border-t border-border/10 py-24 md:py-32">
              <div className="container-portfolio space-y-12">
                <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary">{act.label}</p>
                <ScrubText
                  text={act.narrator}
                  className="max-w-3xl font-body text-xl leading-relaxed text-foreground/80 md:text-2xl"
                />
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {actProjects.map((p) => (
                    <div key={p.id} className="group relative aspect-[4/3] overflow-hidden border border-border/25">
                      <img
                        src={p.image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                      <p className="absolute bottom-3 left-3 font-heading text-xs font-semibold text-foreground">{p.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        );
      })}

      <section className="py-32 text-center">
        <p className="font-heading text-2xl italic text-foreground/50">Cut to black. Roll credits.</p>
      </section>
    </div>
  );
}

export function ShutterActsArchive() {
  return (
    <ArchiveLenisProvider>
      <Seo title="Film Shutter Acts — Archive | Kedhar" description="Five acts separated by the 7-bar film shutter transition." path="/archive/f" image="/og-work.png" />
      <Navigation />
      <main><ShutterInner /></main>
      <Footer quote="Every act costs a cut." />
    </ArchiveLenisProvider>
  );
}
