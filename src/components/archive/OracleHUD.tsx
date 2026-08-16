import { cn } from "@/lib/utils";
import { rankForXp, TOTAL_ORACLE_XP } from "@/lib/archive/oracle";

interface OracleHUDProps {
  revealed: number;
  total: number;
  xp: number;
  chapterIndex: number;
  chapterTitle: string;
  flashXp?: number | null;
}

export function OracleHUD({
  revealed,
  total,
  xp,
  chapterIndex,
  chapterTitle,
  flashXp,
}: OracleHUDProps) {
  const rank = rankForXp(xp);
  const xpPct = Math.min(100, (xp / TOTAL_ORACLE_XP) * 100);

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-[4.5rem] z-40 border-b border-border/20 bg-background/90 backdrop-blur-md">
      <div className="container-portfolio flex flex-wrap items-center justify-between gap-3 py-3">
        <div className="flex items-center gap-4">
          <div>
            <p className="font-body text-[9px] uppercase tracking-[0.35em] text-primary">☽ Reading</p>
            <p className="font-heading text-xs font-semibold text-foreground">{chapterTitle || "Prologue"}</p>
          </div>
          <div className="hidden h-8 w-px bg-border/30 sm:block" />
          <div className="hidden sm:block">
            <p className="font-body text-[9px] uppercase tracking-[0.25em] text-foreground/40">Chapter</p>
            <p className="font-mono text-xs text-foreground/70">
              {chapterIndex < 0 ? "—" : `${chapterIndex + 1} / 5`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-body text-[9px] uppercase tracking-[0.25em] text-foreground/40">Cards</p>
            <p className="font-mono text-sm text-primary">
              {revealed}<span className="text-foreground/35">/{total}</span>
            </p>
          </div>

          <div className="relative min-w-[100px] text-right">
            <p className="font-body text-[9px] uppercase tracking-[0.25em] text-foreground/40">Insight</p>
            <p className="font-mono text-sm text-foreground">
              {xp} <span className="text-[10px] text-foreground/40">XP</span>
            </p>
            {flashXp != null && flashXp > 0 && (
              <span className="absolute -right-1 top-6 animate-fade-in font-mono text-[10px] text-primary">
                +{flashXp}
              </span>
            )}
          </div>

          <div className="hidden min-w-[120px] md:block">
            <p className="font-body text-[9px] uppercase tracking-[0.25em] text-foreground/40">Rank</p>
            <p className="font-heading text-xs text-foreground/80">{rank.title}</p>
          </div>
        </div>
      </div>

      <div className="h-[2px] bg-border/15">
        <div
          className={cn("h-full bg-primary transition-all duration-500")}
          style={{ width: `${xpPct}%` }}
        />
      </div>
    </div>
  );
}
