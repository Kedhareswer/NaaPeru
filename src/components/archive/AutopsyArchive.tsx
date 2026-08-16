import { useEffect, useState } from "react";
import { ArchiveLenisProvider, useArchiveLenis } from "@/contexts/ArchiveLenisContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { SchizoSwitcher } from "@/components/archive/SchizoSwitcher";
import { AUTOPSY_INTRO, AUTOPSY_RECORDS, VERDICT_LABEL } from "@/lib/archive/schizotech";
import { loadArchiveProjects, projectById } from "@/lib/archive/projects";
import type { ArchiveProject } from "@/lib/archive/types";
import { cn } from "@/lib/utils";

const VERDICT_STYLE: Record<string, string> = {
  tuition: "border-foreground/20 text-foreground/50",
  survived: "border-primary/40 text-primary",
  active: "border-primary bg-primary/10 text-primary",
  "cold-case": "border-border/40 text-foreground/40",
};

function AutopsyInner() {
  const [projects, setProjects] = useState<ArchiveProject[]>([]);
  const { progress } = useArchiveLenis();

  useEffect(() => {
    loadArchiveProjects().then(setProjects);
  }, []);

  return (
    <div className="archive-page min-h-screen bg-background">
      <SchizoSwitcher current="d" badge="AUTOPSY REPORT" subtitle="Cause of death · dark humor" />
      <div className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-border/20">
        <div className="h-full bg-primary" style={{ width: `${progress * 100}%` }} />
      </div>

      <section className="border-b border-primary/20 py-32 md:py-40">
        <div className="container-portfolio max-w-3xl space-y-6">
          <p className="font-body text-[10px] uppercase tracking-[0.4em] text-primary">County Examiner · Case #K-2026</p>
          <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">{AUTOPSY_INTRO.title}</h1>
          <p className="font-body text-lg italic text-foreground/60">{AUTOPSY_INTRO.subtitle}</p>
          <p className="font-body text-xs text-foreground/40">{AUTOPSY_INTRO.disclaimer}</p>
        </div>
      </section>

      {AUTOPSY_RECORDS.map((record, i) => {
        const project = projectById(projects, record.projectId);
        if (!project) return null;

        return (
          <section
            key={record.projectId}
            className={cn(
              "border-b border-border/15 py-16 md:py-20",
              record.verdict === "active" && "bg-primary/[0.03]",
            )}
          >
            <div className="container-portfolio grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/35">
                  Subject {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="font-heading mt-2 text-2xl font-bold text-foreground">{project.title}</h2>
                <p className="mt-2 font-mono text-xs text-foreground/45">{project.project_date}</p>
                <div className="mt-6 aspect-video overflow-hidden border border-border/25">
                  <img src={project.image} alt="" className="h-full w-full object-cover grayscale contrast-125" loading="lazy" />
                </div>
              </div>

              <div className="space-y-6 lg:col-span-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="border border-border/25 p-4">
                    <p className="font-body text-[9px] uppercase tracking-[0.3em] text-foreground/40">Cause of death</p>
                    <p className="mt-2 font-heading text-lg text-foreground">{record.causeOfDeath}</p>
                  </div>
                  <div className="border border-border/25 p-4">
                    <p className="font-body text-[9px] uppercase tracking-[0.3em] text-foreground/40">Manner</p>
                    <p className="mt-2 font-body text-sm text-foreground/75">{record.manner}</p>
                  </div>
                </div>

                <div className={cn("inline-block border px-4 py-2 font-body text-[10px] uppercase tracking-[0.25em]", VERDICT_STYLE[record.verdict])}>
                  {VERDICT_LABEL[record.verdict]}
                </div>

                {record.examinerNote && (
                  <blockquote className="border-l-2 border-primary/50 pl-6 font-body text-sm italic leading-relaxed text-foreground/60">
                    {record.examinerNote}
                  </blockquote>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <section className="py-24 text-center">
        <p className="font-heading text-xl italic text-foreground/50">End of report. Most survived as tuition.</p>
      </section>
    </div>
  );
}

export function AutopsyArchive() {
  return (
    <ArchiveLenisProvider>
      <Seo title="Autopsy Report — Archive | Kedhar" description="Fifteen projects. Cause of death. Dark humor post-mortems." path="/archive/d" image="/og-work.png" />
      <Navigation />
      <main><AutopsyInner /></main>
      <Footer quote="Died of scope creep. Survived as tuition." />
    </ArchiveLenisProvider>
  );
}
