import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArchiveLenisProvider, useArchiveLenis } from "@/contexts/ArchiveLenisContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { SchizoSwitcher } from "@/components/archive/SchizoSwitcher";
import { BLAME_COMMITS, BLAME_INTRO } from "@/lib/archive/schizotech";
import { loadArchiveProjects, projectById } from "@/lib/archive/projects";
import type { ArchiveProject } from "@/lib/archive/types";

gsap.registerPlugin(ScrollTrigger);

function BlameInner() {
  const [projects, setProjects] = useState<ArchiveProject[]>([]);
  const { progress } = useArchiveLenis();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadArchiveProjects().then(setProjects);
  }, []);

  useEffect(() => {
    if (!projects.length || !listRef.current) return;

    const rows = listRef.current.querySelectorAll(".blame-row");
    const ctx = gsap.context(() => {
      rows.forEach((row) => {
        const inner = row.querySelector(".blame-inner");
        const voice = row.querySelector(".blame-voice");
        if (!inner) return;

        gsap.fromTo(
          inner,
          { opacity: 0.15, x: -12 },
          {
            opacity: 1,
            x: 0,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              end: "top 45%",
              scrub: 0.8,
            },
          },
        );

        if (voice) {
          gsap.fromTo(
            voice,
            { opacity: 0, y: 8 },
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: row,
                start: "top 60%",
                end: "top 30%",
                scrub: 0.6,
              },
            },
          );
        }
      });
    }, listRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <div className="archive-page min-h-screen bg-[#0a0a0a] font-mono text-sm">
      <SchizoSwitcher current="e" badge="GIT BLAME" subtitle="Rewind commits · inner voice" />
      <div className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-border/20">
        <div className="h-full bg-primary" style={{ width: `${progress * 100}%` }} />
      </div>

      <section className="border-b border-primary/20 py-24">
        <div className="container-portfolio max-w-4xl space-y-4">
          <p className="text-primary">
            <span className="text-foreground/50">$</span> git log --reverse --oneline --author=Kedhareswer
          </p>
          <p className="text-foreground/40">
            repo: {BLAME_INTRO.repo} · branch: <span className="text-primary">{BLAME_INTRO.branch}</span>
          </p>
          <p className="text-xs italic text-foreground/50">{BLAME_INTRO.graphNote}</p>
          <p className="text-foreground/35">Scroll down to rewind. Inner voice appears in the diff.</p>
        </div>
      </section>

      <div ref={listRef} className="container-portfolio max-w-4xl py-8">
        {BLAME_COMMITS.map((commit) => {
          const project = projectById(projects, commit.projectId);
          if (!project) return null;

          return (
            <article key={commit.hash} className="blame-row border-b border-border/10 py-10">
              <div className="blame-inner space-y-3">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="text-primary">{commit.hash}</span>
                  <span className="text-foreground/40">{commit.date}</span>
                  <span className="text-foreground/30">{commit.filesChanged} files</span>
                </div>
                <p className="text-foreground/90">{commit.message}</p>
                <p className="text-xs text-foreground/40">
                  <span className="text-primary/70">Author:</span> {commit.author}
                </p>
                <p className="text-xs text-foreground/50">
                  <span className="text-foreground/30">project/</span>
                  {project.title.toLowerCase().replace(/\s+/g, "-")}
                </p>
              </div>
              <p className="blame-voice mt-6 border-l border-primary/40 pl-4 text-xs italic text-primary/80">
                // inner voice: {commit.innerVoice}
              </p>
            </article>
          );
        })}
      </div>

      <section className="border-t border-primary/20 py-20 text-center">
        <p className="text-xs text-foreground/40">HEAD is now at 9bb77b4 — first commit. Graph still quiet.</p>
        <p className="mt-4 text-primary">$ git push origin main --force-with-lease</p>
        <p className="mt-2 text-[10px] text-foreground/30">(don't actually do this)</p>
      </section>
    </div>
  );
}

export function GitBlameArchive() {
  return (
    <ArchiveLenisProvider>
      <Seo title="Git Blame — Archive | Kedhar" description="Scroll rewinds commits. Inner voice is the diff message." path="/archive/e" image="/og-work.png" />
      <Navigation />
      <main><BlameInner /></main>
      <Footer quote="Blame me. I wrote it at 2am." />
    </ArchiveLenisProvider>
  );
}
