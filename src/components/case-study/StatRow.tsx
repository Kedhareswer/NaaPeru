import { cn } from "@/lib/utils";
import { SectionReveal } from "./SectionReveal";

export type Stat = { value: string; label: string; sub?: string };

/** Results stat blocks — large crimson number, label, optional sub-label. */
export function StatRow({ stats, className }: { stats: Stat[]; className?: string }) {
  const cols = stats.length >= 4 ? "md:grid-cols-4" : stats.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3";
  return (
    <div className={cn("grid grid-cols-1 gap-4", cols, className)}>
      {stats.map((s, i) => (
        <SectionReveal key={s.label} delay={i * 0.08}>
          <div className="h-full border border-border/15 bg-card/30 p-8">
            <div className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-bold text-primary leading-none mb-3">
              {s.value}
            </div>
            <p className="font-body text-sm font-medium text-foreground mb-1">{s.label}</p>
            {s.sub && (
              <p className="font-body text-[10px] uppercase tracking-[0.2em] text-foreground/40">{s.sub}</p>
            )}
          </div>
        </SectionReveal>
      ))}
    </div>
  );
}
