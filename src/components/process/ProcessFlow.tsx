import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { ProcessNode } from "./ProcessNode";
import type { FlowStepNode, ProcessDensity } from "@/lib/process/types";

/**
 * The flow stage — a vertical main path with branch nodes hanging off each
 * decision. Vertical rather than horizontal because seven steps with real
 * labels never fit across a viewport, and the branch is the interesting part.
 */
export function ProcessFlow({
  steps,
  density = "case-study",
  className,
}: {
  steps: FlowStepNode[];
  density?: ProcessDensity;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const showNotes = density === "case-study";

  return (
    <div ref={ref} className={cn("border border-border/15 bg-card/20 p-4 md:p-8", className)}>
      {steps.map((step, i) => (
        <motion.div
          key={`${step.label}-${i}`}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="grid gap-0 md:grid-cols-2 md:gap-0">
            <ProcessNode
              label={step.label}
              kind={step.kind}
              note={showNotes ? step.note : undefined}
            />

            {step.fallback ? (
              <div className="flex flex-col md:flex-row md:items-center">
                {/* Branch connector: vertical on mobile, horizontal on desktop */}
                <div className="flex items-center gap-2 py-1.5 pl-[9px] md:px-3 md:py-0">
                  <span
                    aria-hidden
                    className="h-4 w-px bg-border/50 md:h-px md:w-6 md:bg-border/50"
                  />
                  <span className="font-body text-[9px] uppercase tracking-[0.2em] text-foreground/40">
                    No
                  </span>
                  <span aria-hidden className="hidden h-px w-4 bg-border/50 md:block" />
                </div>
                <ProcessNode
                  className="flex-1"
                  label={step.fallback.label}
                  kind="action"
                  note={showNotes ? step.fallback.note : undefined}
                  muted
                />
              </div>
            ) : (
              <div aria-hidden className="hidden md:block" />
            )}
          </div>

          {i < steps.length - 1 && (
            <div className="flex items-center gap-2 py-1.5 pl-[9px]">
              <span aria-hidden className="h-5 w-px bg-primary/40" />
              {step.kind === "decision" && (
                <span className="font-body text-[9px] uppercase tracking-[0.2em] text-primary/60">
                  Yes
                </span>
              )}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
