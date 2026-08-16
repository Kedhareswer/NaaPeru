import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SectionReveal } from "@/components/case-study/SectionReveal";
import type { ProcessDensity } from "@/lib/process/types";

/**
 * Numbered stage shell with a right-hand annotation rail.
 *
 * The annotation is the reason this reads as a process rather than a gallery —
 * it explains why the stage exists, not what it contains. Rail is case-study
 * density only; the landing spine keeps just the counter and the title.
 */
export function ProcessStage({
  index,
  label,
  title,
  annotation,
  density = "case-study",
  children,
  className,
}: {
  index: string;
  label: string;
  title: string;
  annotation?: string;
  density?: ProcessDensity;
  children: ReactNode;
  className?: string;
}) {
  const showRail = density === "case-study" && Boolean(annotation);

  return (
    <SectionReveal className={cn("border-t border-border/15 pt-8 md:pt-10", className)}>
      <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="font-heading text-xs font-bold text-primary">{index}</span>
        <span className="font-body text-[10px] uppercase tracking-[0.35em] text-foreground/40">
          {label}
        </span>
        <h3 className="font-heading text-lg font-bold text-foreground md:text-xl">{title}</h3>
      </div>

      <div
        className={cn(
          "grid gap-6",
          showRail && "lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-10",
        )}
      >
        <div className="min-w-0">{children}</div>

        {showRail && (
          <aside className="border-l border-primary/25 pl-4 lg:pl-5">
            <p className="mb-2 font-body text-[9px] uppercase tracking-[0.3em] text-primary/60">
              Why
            </p>
            <p className="font-body text-xs leading-relaxed text-foreground/55">{annotation}</p>
          </aside>
        )}
      </div>
    </SectionReveal>
  );
}
