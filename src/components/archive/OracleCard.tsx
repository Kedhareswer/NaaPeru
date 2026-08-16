import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import type { ArchiveProject } from "@/lib/archive/types";
import type { OracleCardData } from "@/lib/archive/oracle";
import { SUIT_LABEL } from "@/lib/archive/oracle";

gsap.registerPlugin(ScrollTrigger);

const RARITY_BADGE: Record<OracleCardData["rarity"], string> = {
  common: "text-foreground/40",
  rare: "text-primary/80",
  legendary: "text-primary",
};

interface OracleCardProps {
  card: OracleCardData;
  project: ArchiveProject;
  positionLabel: string;
  indexInSpread: number;
  onReveal: (projectId: number, xp: number) => void;
  onResonate: (projectId: number) => void;
  resonated: boolean;
}

export function OracleCard({
  card,
  project,
  positionLabel,
  indexInSpread,
  onReveal,
  onResonate,
  resonated,
}: OracleCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const revealedRef = useRef(false);

  useEffect(() => {
    const el = cardRef.current;
    const wrap = wrapRef.current;
    if (!el || !wrap) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { rotateY: 180, y: 40 },
        {
          rotateY: 0,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrap,
            start: "top 78%",
            end: "top 38%",
            scrub: 1,
            onUpdate: (self) => {
              if (self.progress > 0.85 && !revealedRef.current) {
                revealedRef.current = true;
                setFlipped(true);
                onReveal(card.projectId, card.xp);
              }
            },
          },
        },
      );
    }, wrap);

    return () => ctx.revert();
  }, [card, onReveal]);

  return (
    <div ref={wrapRef} className="oracle-card-wrap flex flex-col items-center py-8" style={{ perspective: "1400px" }}>
      <p className="mb-4 font-body text-[9px] uppercase tracking-[0.35em] text-foreground/35">{positionLabel}</p>

      <div
        ref={cardRef}
        className="relative h-[440px] w-full max-w-[280px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center border border-primary/25 bg-card/70"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="font-body text-[10px] uppercase tracking-[0.4em] text-primary">☽</p>
          <p className="mt-2 font-heading text-5xl text-foreground/10">{card.roman}</p>
          <p className="mt-6 font-body text-[9px] uppercase tracking-[0.3em] text-foreground/25">Face down</p>
        </div>

        {/* Front */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col border bg-background",
            card.rarity === "legendary" ? "border-primary" : "border-border/30",
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="relative h-36 overflow-hidden border-b border-border/20">
            <img src={project.image} alt="" className="h-full w-full object-cover opacity-55" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute left-3 top-3 flex gap-2">
              <span className={cn("bg-background/80 px-2 py-0.5 font-body text-[8px] uppercase tracking-[0.2em]", RARITY_BADGE[card.rarity])}>
                {card.rarity}
              </span>
              <span className="bg-background/80 px-2 py-0.5 font-mono text-[8px] text-primary">+{card.xp} XP</span>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-5">
            <p className="font-body text-[8px] uppercase tracking-[0.3em] text-primary/60">{SUIT_LABEL[card.suit]}</p>
            <p className="mt-1 font-heading text-lg font-bold text-foreground">
              {card.roman} — {card.arcana}
            </p>
            <p className="mt-1 font-body text-[10px] text-foreground/45">{project.title}</p>

            <p className="mt-4 font-heading text-base leading-snug text-foreground">{card.prophecy}</p>

            {flipped && (
              <p className="mt-4 animate-fade-in border-l-2 border-primary/40 pl-3 font-body text-xs italic leading-relaxed text-foreground/55">
                {card.storyBeat}
              </p>
            )}

            {card.reversed && flipped && (
              <p className="mt-3 font-body text-[10px] italic text-foreground/40">↺ {card.reversed}</p>
            )}

            {flipped && (
              <button
                type="button"
                onClick={() => onResonate(card.projectId)}
                disabled={resonated}
                className={cn(
                  "pointer-events-auto mt-auto w-full border py-2.5 font-body text-[10px] uppercase tracking-[0.25em] transition-colors",
                  resonated
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-border/40 text-foreground/60 hover:border-primary/50 hover:text-primary",
                )}
              >
                {resonated ? "✓ Resonated +5 XP" : "Resonate +5 XP"}
              </button>
            )}
          </div>
        </div>
      </div>

      <p className="mt-3 font-mono text-[9px] text-foreground/25">Card {indexInSpread + 1}</p>
    </div>
  );
}
