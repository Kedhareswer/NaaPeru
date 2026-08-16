import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArchiveLenisProvider, useArchiveLenis } from "@/contexts/ArchiveLenisContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { SchizoSwitcher } from "@/components/archive/SchizoSwitcher";
import { ScrubText } from "@/components/archive/ScrubText";
import { OracleHUD } from "@/components/archive/OracleHUD";
import { OracleCollection } from "@/components/archive/OracleCollection";
import { OracleCard } from "@/components/archive/OracleCard";
import {
  ORACLE_CAMPAIGN,
  ORACLE_CHAPTERS,
  ORACLE_DECK,
  SPREAD_POSITIONS,
  oracleCardByProjectId,
  rankForXp,
} from "@/lib/archive/oracle";
import { loadArchiveProjects, projectById } from "@/lib/archive/projects";
import type { ArchiveProject } from "@/lib/archive/types";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

function OracleInner() {
  const [projects, setProjects] = useState<ArchiveProject[]>([]);
  const { progress } = useArchiveLenis();
  const [revealedIds, setRevealedIds] = useState<Set<number>>(() => new Set());
  const [resonatedIds, setResonatedIds] = useState<Set<number>>(() => new Set());
  const [xp, setXp] = useState(0);
  const [flashXp, setFlashXp] = useState<number | null>(null);
  const [chapterIndex, setChapterIndex] = useState(-1);
  const [chapterTitle, setChapterTitle] = useState("");
  const completedChaptersRef = useRef<Set<string>>(new Set());
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    loadArchiveProjects().then(setProjects);
  }, []);

  useEffect(() => {
    const triggers = chapterRefs.current
      .filter(Boolean)
      .map((el, i) => {
        const ch = ORACLE_CHAPTERS[i];
        if (!el || !ch) return null;
        return ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => {
            setChapterIndex(i);
            setChapterTitle(ch.title);
          },
          onEnterBack: () => {
            setChapterIndex(i);
            setChapterTitle(ch.title);
          },
        });
      })
      .filter(Boolean);

    return () => triggers.forEach((t) => t?.kill());
  }, [projects]);

  const awardChapterBonus = useCallback((chapterId: string, bonus: number) => {
    if (completedChaptersRef.current.has(chapterId)) return;
    completedChaptersRef.current.add(chapterId);
    setXp((prev) => prev + bonus);
    setFlashXp(bonus);
    setTimeout(() => setFlashXp(null), 1200);
  }, []);

  const handleReveal = useCallback(
    (projectId: number, cardXp: number) => {
      setRevealedIds((prev) => {
        if (prev.has(projectId)) return prev;
        const next = new Set(prev);
        next.add(projectId);
        setXp((x) => x + cardXp);
        setFlashXp(cardXp);
        setTimeout(() => setFlashXp(null), 1200);

        ORACLE_CHAPTERS.forEach((ch) => {
          const allRevealed = ch.cardIds.every((id) => next.has(id));
          if (allRevealed) awardChapterBonus(ch.id, ch.chapterXp);
        });

        return next;
      });
    },
    [awardChapterBonus],
  );

  const handleResonate = useCallback((projectId: number) => {
    setResonatedIds((prev) => {
      if (prev.has(projectId)) return prev;
      const next = new Set(prev);
      next.add(projectId);
      setXp((x) => x + 5);
      setFlashXp(5);
      setTimeout(() => setFlashXp(null), 1200);
      return next;
    });
  }, []);

  const rank = rankForXp(xp);
  const allRevealed = revealedIds.size >= ORACLE_DECK.length;

  return (
    <div className="archive-page min-h-screen bg-background pb-28 pt-24">
      <SchizoSwitcher current="g" badge="ORACLE DECK" subtitle="Campaign · five chapters · fifteen cards" />

      <OracleHUD
        revealed={revealedIds.size}
        total={ORACLE_DECK.length}
        xp={xp}
        chapterIndex={chapterIndex}
        chapterTitle={chapterTitle}
        flashXp={flashXp}
      />

      <OracleCollection deck={ORACLE_DECK} revealedIds={revealedIds} />

      <div className="fixed left-0 right-0 top-[7.25rem] z-50 h-[2px] bg-border/10">
        <div className="h-full bg-primary/60" style={{ width: `${progress * 100}%` }} />
      </div>

      {/* Prologue */}
      <section className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
        <p className="font-body text-[10px] uppercase tracking-[0.45em] text-primary">☽ {ORACLE_CAMPAIGN.title}</p>
        <h1 className="mt-8 max-w-3xl font-heading text-4xl font-bold leading-tight text-foreground md:text-6xl">
          {ORACLE_CAMPAIGN.tagline}
        </h1>
        <div className="mt-12 max-w-xl space-y-4">
          {ORACLE_CAMPAIGN.prologue.map((line, i) => (
            <ScrubText
              key={line}
              text={line}
              className={cn(
                "font-body text-base leading-relaxed text-foreground/70 md:text-lg",
                i === ORACLE_CAMPAIGN.prologue.length - 1 && "text-foreground/90",
              )}
              start={`top ${88 - i * 4}%`}
              end={`top ${48 - i * 4}%`}
            />
          ))}
        </div>
        <p className="mt-16 font-body text-[10px] uppercase tracking-[0.35em] text-foreground/35">
          Scroll to deal · Flip to earn insight
        </p>

        <div className="relative mt-12 flex h-36 w-full max-w-lg items-end justify-center">
          {ORACLE_DECK.slice(0, 7).map((c, i) => (
            <div
              key={c.projectId}
              className="absolute h-28 w-[4.5rem] border border-primary/20 bg-card/60"
              style={{
                transform: `rotate(${(i - 3) * 6}deg) translateY(${Math.abs(i - 3) * 3}px)`,
                left: `${8 + i * 12}%`,
                zIndex: i,
              }}
            />
          ))}
        </div>
      </section>

      {/* Chapters */}
      {ORACLE_CHAPTERS.map((chapter, chIdx) => {
        const positions = SPREAD_POSITIONS[chapter.spread];
        const cards = chapter.cardIds
          .map((id) => {
            const card = oracleCardByProjectId(id);
            const project = projectById(projects, id);
            return card && project ? { card, project } : null;
          })
          .filter(Boolean) as { card: (typeof ORACLE_DECK)[0]; project: ArchiveProject }[];

        if (!cards.length) return null;

        return (
          <section
            key={chapter.id}
            ref={(el) => {
              chapterRefs.current[chIdx] = el;
            }}
            className="border-t border-border/15 py-20 md:py-28"
          >
            <div className="container-portfolio space-y-12">
              <div className="max-w-2xl space-y-4">
                <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary">
                  {chapter.act} · {chapter.spread.replace(/-/g, " ")}
                </p>
                <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">{chapter.title}</h2>
                <ScrubText text={chapter.intro} className="font-body text-base leading-relaxed text-foreground/65 md:text-lg" />
              </div>

              <div
                className={cn(
                  "grid gap-4",
                  chapter.spread === "line"
                    ? "md:grid-cols-3"
                    : chapter.spread === "triangle"
                      ? "mx-auto max-w-4xl md:grid-cols-3"
                      : "md:grid-cols-3",
                )}
              >
                {cards.map(({ card, project }, i) => (
                  <OracleCard
                    key={card.projectId}
                    card={card}
                    project={project}
                    positionLabel={positions[i] ?? `Card ${i + 1}`}
                    indexInSpread={i}
                    onReveal={handleReveal}
                    onResonate={handleResonate}
                    resonated={resonatedIds.has(card.projectId)}
                  />
                ))}
              </div>

              <p className="max-w-xl border-l-2 border-primary/30 pl-6 font-body text-sm italic text-foreground/50">
                {chapter.closing}
              </p>

              {chapter.cardIds.every((id) => revealedIds.has(id)) && (
                <p className="animate-fade-in font-mono text-xs text-primary">
                  ✓ Chapter complete · +{chapter.chapterXp} XP
                </p>
              )}
            </div>
          </section>
        );
      })}

      {/* Epilogue */}
      <section
        className={cn(
          "border-t border-primary/20 py-32 transition-opacity duration-700",
          allRevealed ? "opacity-100" : "opacity-40",
        )}
      >
        <div className="container-portfolio mx-auto max-w-2xl text-center space-y-8">
          <p className="font-body text-[10px] uppercase tracking-[0.4em] text-primary">{ORACLE_CAMPAIGN.epilogue.title}</p>
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">{rank.title}</h2>
          <p className="font-body text-lg italic text-foreground/60">{rank.line}</p>

          <div className="grid grid-cols-3 gap-4 border border-border/25 bg-card/30 p-6 text-left">
            <div>
              <p className="font-body text-[9px] uppercase tracking-[0.25em] text-foreground/40">Cards</p>
              <p className="font-heading text-2xl text-foreground">{revealedIds.size}/{ORACLE_DECK.length}</p>
            </div>
            <div>
              <p className="font-body text-[9px] uppercase tracking-[0.25em] text-foreground/40">Insight</p>
              <p className="font-heading text-2xl text-primary">{xp} XP</p>
            </div>
            <div>
              <p className="font-body text-[9px] uppercase tracking-[0.25em] text-foreground/40">Resonated</p>
              <p className="font-heading text-2xl text-foreground">{resonatedIds.size}</p>
            </div>
          </div>

          <ScrubText
            text={ORACLE_CAMPAIGN.epilogue.body}
            className="font-body text-base leading-relaxed text-foreground/70"
          />

          {allRevealed && (
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link
                to="/"
                className="bg-primary px-6 py-3 font-body text-xs font-bold uppercase tracking-[0.25em] text-background"
              >
                See the work
              </Link>
              <Link
                to="/archive"
                className="border border-border/40 px-6 py-3 font-body text-xs uppercase tracking-[0.25em] text-foreground/70 hover:border-primary/50"
              >
                Compare modes
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export function OracleArchive() {
  return (
    <ArchiveLenisProvider>
      <Seo
        title="Oracle Deck — The Kedhar Spread | Kedhar"
        description="A gamified scroll campaign. Five chapters, fifteen cards, insight XP, and a reading that tells your story."
        path="/archive/g"
        image="/og-work.png"
      />
      <Navigation />
      <main><OracleInner /></main>
      <Footer quote="The prophecy was always the build." />
    </ArchiveLenisProvider>
  );
}
