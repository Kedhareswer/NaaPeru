import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

export type FlowStep = { title: string; detail?: string };

/**
 * Pipeline / architecture diagram — labeled nodes connected by arrows.
 * Horizontal on desktop, vertical on mobile. Nodes draw in with stagger on scroll.
 * (pi.website's architecture diagram, in your dark/crimson palette.)
 */
export function FlowDiagram({ steps, className }: { steps: FlowStep[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <div ref={ref} className={cn("border border-border/15 bg-card/20 p-6 md:p-8", className)}>
      <div className="flex flex-col md:flex-row md:items-stretch">
        {steps.map((s, i) => (
          <div key={s.title} className="flex flex-1 flex-col md:flex-row md:items-stretch">
            <motion.div
              className="flex-1 border border-border/20 bg-background/40 p-4 md:p-5"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="font-heading text-xs font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
              <h4 className="mt-2 font-heading text-sm font-bold text-foreground md:text-base">{s.title}</h4>
              {s.detail && <p className="mt-1 font-body text-xs leading-relaxed text-foreground/55">{s.detail}</p>}
            </motion.div>
            {i < steps.length - 1 && (
              <div className="flex items-center justify-center px-1 py-2 md:py-0">
                <motion.span
                  className="font-body text-lg leading-none text-primary/60"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.12 + 0.2 }}
                >
                  <span className="hidden md:inline">&rarr;</span>
                  <span className="md:hidden">&darr;</span>
                </motion.span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
