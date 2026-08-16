import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

export type ChartMetric = {
  label: string;
  /** this project's value */
  value: number;
  /** baseline / comparison value */
  baseline: number;
  /** axis max; defaults to ~115% of the larger value */
  max?: number;
  /** format a raw number for display, e.g. (n) => `${n}%` */
  display?: (n: number) => string;
};

/**
 * Grouped horizontal bar chart — crimson = this project, muted gray = baseline.
 * Bars animate width on scroll into view. (pi.website data-viz, in your palette.)
 */
export function ComparisonChart({
  metrics,
  seriesLabel = "This project",
  baselineLabel = "Baseline",
  className,
}: {
  metrics: ChartMetric[];
  seriesLabel?: string;
  baselineLabel?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <div ref={ref} className={cn("border border-border/15 bg-card/20 p-6 md:p-8", className)}>
      <div className="mb-8 flex flex-wrap items-center gap-6">
        <span className="flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.25em] text-foreground/60">
          <span className="h-3 w-3 bg-primary" /> {seriesLabel}
        </span>
        <span className="flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.25em] text-foreground/40">
          <span className="h-3 w-3 bg-foreground/20" /> {baselineLabel}
        </span>
      </div>

      <div className="space-y-7">
        {metrics.map((m, i) => {
          const max = m.max ?? Math.max(m.value, m.baseline) * 1.15;
          const vp = Math.min(100, (m.value / max) * 100);
          const bp = Math.min(100, (m.baseline / max) * 100);
          const fmt = m.display ?? ((n: number) => String(n));
          return (
            <div key={m.label}>
              <p className="mb-2 font-body text-[11px] uppercase tracking-[0.3em] text-foreground/50">{m.label}</p>
              <div className="space-y-1.5">
                <div className="relative h-7 bg-foreground/[0.04]">
                  <motion.div
                    className="absolute inset-y-0 left-0 flex items-center justify-end bg-primary pr-2"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${vp}%` } : {}}
                    transition={{ duration: 1, delay: 0.1 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <span className="font-heading text-xs font-bold text-background">{fmt(m.value)}</span>
                  </motion.div>
                </div>
                <div className="relative h-7 bg-foreground/[0.04]">
                  <motion.div
                    className="absolute inset-y-0 left-0 flex items-center justify-end bg-foreground/20 pr-2"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${bp}%` } : {}}
                    transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <span className="font-heading text-xs font-bold text-foreground/70">{fmt(m.baseline)}</span>
                  </motion.div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
