import { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import type { Metric, OutcomeScreen, ProcessDensity } from "@/lib/process/types";

gsap.registerPlugin(ScrollTrigger);

const easeOut = [0.16, 1, 0.3, 1] as const;

function MetricValue({ value, active }: { value: string; active: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = /^(\d+)(.*)$/.exec(value);

  useEffect(() => {
    const el = ref.current;
    const parsed = /^(\d+)(.*)$/.exec(value);
    if (!active || !el || !parsed) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.textContent = value;
      return;
    }

    const target = parseInt(parsed[1], 10);
    const suffix = parsed[2] ?? "";
    const obj = { n: 0 };
    const tween = gsap.to(obj, {
      n: target,
      duration: 1.1,
      ease: "power3.out",
      onUpdate: () => {
        el.textContent = `${Math.round(obj.n)}${suffix}`;
      },
    });
    return () => {
      tween.kill();
    };
  }, [active, value]);

  if (!match) {
    return <span>{value}</span>;
  }

  return <span ref={ref}>{active ? `0${match[2] ?? ""}` : value}</span>;
}

/**
 * Annotated screen walkthrough — Vijaya Bank structure in the dark brand:
 * numbered frames with a why-note each, then the metric strip.
 * Frames prefer real product screenshots when `image` is set.
 */
export function ProcessOutcome({
  screens,
  metrics,
  density = "case-study",
  className,
}: {
  screens: OutcomeScreen[];
  metrics: Metric[];
  density?: ProcessDensity;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const showScreens = density === "case-study";
  const total = String(screens.length).padStart(2, "0");

  useEffect(() => {
    const root = ref.current;
    if (!root || !showScreens) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const frames = root.querySelectorAll<HTMLElement>("[data-ship-frame]");

    const ctx = gsap.context(() => {
      frames.forEach((frame) => {
        const img = frame.querySelector("img");
        gsap.fromTo(
          frame,
          { scale: 0.9, opacity: 0.35 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: frame,
              start: "top 88%",
              end: "top 42%",
              scrub: 0.85,
            },
          },
        );
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.06 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: frame,
                start: "top 85%",
                end: "bottom 20%",
                scrub: 1,
              },
            },
          );
        }
      });
    }, root);

    return () => ctx.revert();
  }, [showScreens, screens.length]);

  return (
    <div ref={ref} className={cn("space-y-8", className)}>
      {showScreens && (
        <div className="relative">
          <div className="space-y-0">
            {screens.map((screen, i) => (
              <motion.div
                key={screen.index}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.55,
                  delay: Math.min(i, 4) * 0.09,
                  ease: easeOut,
                }}
                className="group relative grid gap-3 border-t border-border/15 py-4 first:border-t-0 first:pt-0 sm:gap-4 sm:py-5 md:grid-cols-[72px_minmax(0,1.15fr)_minmax(0,0.95fr)] md:gap-5 md:py-6"
              >
                <div className="flex items-start gap-3 md:flex-col md:gap-2">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-primary bg-primary/10 font-heading text-sm font-bold text-primary transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
                    {screen.index}
                  </span>
                  <span className="pt-2.5 font-body text-[9px] uppercase tracking-[0.2em] text-foreground/30 md:pt-0">
                    {screen.index} / {total}
                  </span>
                </div>

                <div className="border border-border/30 bg-surface-elevated/40 p-1 transition-[border-color] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:border-primary/40">
                  {screen.image ? (
                    <div
                      data-ship-frame
                      className="relative overflow-hidden border border-border/20 bg-background will-change-transform"
                    >
                      <img
                        src={screen.image}
                        alt={screen.imageAlt ?? screen.title}
                        loading="lazy"
                        className="block w-full object-cover object-top transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 via-background/45 to-transparent px-3 pb-2.5 pt-12">
                        <p className="font-heading text-xs font-bold text-foreground md:text-sm">
                          {screen.title}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div
                      data-ship-frame
                      className="relative aspect-[16/10] overflow-hidden border border-border/20 bg-background"
                    >
                      <div className="flex h-6 items-center gap-1.5 border-b border-border/20 bg-card/60 px-2.5">
                        <span className="h-1.5 w-1.5 bg-primary/50" />
                        <span className="h-1.5 w-1.5 bg-foreground/20" />
                        <span className="h-1.5 w-1.5 bg-foreground/20" />
                        <span className="ml-2 h-1 max-w-[40%] flex-1 bg-foreground/10" />
                      </div>
                      <div className="flex h-[calc(100%-1.5rem)] flex-col gap-2 p-3 md:p-4">
                        <div className="h-2 w-1/3 bg-primary/40" />
                        <div className="h-2 w-2/3 bg-foreground/10" />
                        <div className="mt-1 grid flex-1 grid-cols-3 gap-2">
                          <div className="border border-border/20 bg-card/40" />
                          <div className="col-span-2 border border-border/20 bg-card/30" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="font-heading text-xs font-bold text-foreground/80 md:text-sm">
                          {screen.title}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-center border-l border-primary/30 pl-4 md:pl-5">
                  <p className="mb-2 font-body text-[9px] uppercase tracking-[0.3em] text-primary/60">
                    Why this screen
                  </p>
                  <p className="font-body text-sm leading-relaxed text-foreground/65">
                    {screen.note}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div
        className={cn(
          "grid grid-cols-2 gap-px border border-border/15 bg-border/15",
          metrics.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        )}
      >
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: (showScreens ? 0.2 : 0) + i * 0.08,
              ease: easeOut,
            }}
            className="bg-background p-5 transition-colors duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:bg-card/40 md:p-6"
          >
            <div className="font-heading text-[clamp(1.5rem,3.2vw,2.5rem)] font-bold leading-none text-primary">
              <MetricValue value={metric.value} active={inView} />
            </div>
            <p className="mt-2 font-body text-[11px] leading-relaxed text-foreground/50">
              {metric.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
