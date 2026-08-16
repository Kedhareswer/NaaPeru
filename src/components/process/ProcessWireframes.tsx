import { useEffect, useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Wireframe path — Too-Doo sketches in the dark brand.
 * Line drawings only. Not final product screens.
 * Mobile: single column, tight. Desktop: index | frame | note, compact rhythm.
 */

export type WireframeKind =
  | "landing"
  | "login"
  | "explorer"
  | "summarizer"
  | "planner"
  | "collaborate";

export interface WireframeStep {
  index: string;
  title: string;
  note: string;
  kind: WireframeKind;
}

function SketchChrome({ label }: { label: string }) {
  return (
    <div className="flex h-5 items-center gap-1.5 border-b border-foreground/20 px-2">
      <span className="h-1 w-1 bg-foreground/25" />
      <span className="h-1 w-1 bg-foreground/25" />
      <span className="h-1 w-1 bg-foreground/25" />
      <span className="ml-2 font-body text-[8px] uppercase tracking-[0.18em] text-foreground/35">
        {label}
      </span>
    </div>
  );
}

function Line({ className }: { className?: string }) {
  return <div data-wf-ink="line" className={cn("h-px bg-foreground/20", className)} />;
}

function Block({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div data-wf-ink="block" className={cn("border border-foreground/25 bg-transparent", className)}>
      {children}
    </div>
  );
}

function WireframeSketch({ kind }: { kind: WireframeKind }) {
  switch (kind) {
    case "landing":
      return (
        <div className="flex h-full flex-col">
          <SketchChrome label="landing" />
          <div className="relative flex flex-1 flex-col justify-between p-3">
            <div className="flex items-center justify-between">
              <Line className="w-16" />
              <Block className="h-4 w-14" />
            </div>
            <div className="space-y-2 py-3">
              <Line className="w-3/4" />
              <Line className="w-1/2" />
              <div className="mt-2 flex gap-2">
                <Block className="h-5 w-16 border-primary/50 bg-primary/30" />
                <Block className="h-5 w-12" />
              </div>
            </div>
            <div className="absolute bottom-6 right-3 top-7 w-[38%] border border-dashed border-foreground/20" />
          </div>
        </div>
      );
    case "login":
      return (
        <div className="flex h-full flex-col">
          <SketchChrome label="login" />
          <div className="flex flex-1 items-center justify-center p-3">
            <div className="w-[75%] space-y-2 border border-foreground/25 p-3">
              <Line className="mx-auto w-12" />
              <Line className="mx-auto w-20 opacity-40" />
              <Block className="mt-2 h-5 w-full" />
              <Block className="h-5 w-full" />
              <Block className="h-6 w-full border-primary/40 bg-primary/25" />
            </div>
          </div>
        </div>
      );
    case "explorer":
      return (
        <div className="flex h-full">
          <div className="flex w-7 flex-col gap-1.5 border-r border-foreground/20 p-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={cn(
                  "h-2 w-full border border-foreground/20",
                  i === 2 && "border-primary/50 bg-primary/35",
                )}
              />
            ))}
          </div>
          <div className="flex flex-1 flex-col">
            <SketchChrome label="explorer" />
            <div className="flex flex-1 flex-col gap-1.5 p-2">
              <Line className="w-20" />
              <div className="flex gap-1">
                {["Search", "Explore", "Ideas"].map((t, i) => (
                  <span
                    key={t}
                    className={cn(
                      "border border-foreground/20 px-1 py-0.5 font-body text-[7px] uppercase tracking-wider text-foreground/40",
                      i === 0 && "border-primary/50 text-primary/70",
                    )}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <Block className="h-5 w-full" />
              <div className="mt-0.5 grid flex-1 grid-cols-3 gap-1">
                <Block />
                <Block />
                <Block />
              </div>
            </div>
          </div>
        </div>
      );
    case "summarizer":
      return (
        <div className="flex h-full flex-col">
          <SketchChrome label="summarizer" />
          <div className="flex flex-1 gap-2 p-2">
            <div className="flex flex-[1.4] flex-col gap-1.5">
              <div className="grid grid-cols-4 gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <Block
                    key={i}
                    className={cn("aspect-square", i === 3 && "border-primary/50 bg-primary/20")}
                  />
                ))}
              </div>
              <Block className="min-h-0 flex-1" />
            </div>
            <div className="flex w-[34%] flex-col gap-1.5">
              <Block className="h-8" />
              <Block className="min-h-0 flex-1" />
              <Block className="h-5 border-primary/40 bg-primary/20" />
            </div>
          </div>
        </div>
      );
    case "planner":
      return (
        <div className="flex h-full">
          <div className="w-6 border-r border-foreground/20 p-1">
            <div className="mb-1 h-2 w-full bg-primary/35" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="mb-1 h-1.5 w-full border border-foreground/15" />
            ))}
          </div>
          <div className="flex flex-1 flex-col">
            <SketchChrome label="planner" />
            <div className="grid flex-1 grid-cols-4 gap-1 p-2">
              {[1, 2, 3, 4].map((i) => (
                <Block key={i} className="flex flex-col gap-1 p-1">
                  <Line className="w-5" />
                  <div className="font-heading text-[10px] font-bold text-foreground/50">
                    {i === 1 ? "2" : i === 4 ? "45%" : "1"}
                  </div>
                </Block>
              ))}
              <Block className="col-span-4 min-h-[2.5rem] p-1.5">
                <Line className="mb-1.5 w-16" />
                <div className="h-1.5 w-3/4 bg-primary/40" />
              </Block>
            </div>
          </div>
        </div>
      );
    case "collaborate":
      return (
        <div className="flex h-full">
          <div className="w-6 border-r border-foreground/20" />
          <div className="flex w-[28%] flex-col border-r border-foreground/20 p-1.5">
            <Line className="mb-2 w-10" />
            <Block className="mb-1 h-8 border-primary/40 bg-primary/10" />
            <Block className="h-6 opacity-40" />
          </div>
          <div className="flex flex-1 flex-col">
            <SketchChrome label="collaborate" />
            <div className="flex flex-1 flex-col gap-2 p-2">
              <div className="flex items-start gap-2">
                <div className="h-3.5 w-3.5 shrink-0 border border-foreground/25" />
                <div className="flex-1 space-y-1">
                  <Line className="w-full" />
                  <Line className="w-2/3" />
                </div>
              </div>
              <div className="ml-5 flex items-start gap-2">
                <div className="h-3.5 w-3.5 shrink-0 border border-primary/40 bg-primary/20" />
                <div className="flex-1 space-y-1">
                  <Line className="w-full" />
                  <Line className="w-1/2" />
                </div>
              </div>
              <div className="mt-auto border border-foreground/20 p-1.5">
                <Line className="w-3/4 opacity-30" />
              </div>
            </div>
          </div>
        </div>
      );
  }
}

const easeOut = [0.16, 1, 0.3, 1] as const;

export function ProcessWireframes({
  steps,
  className,
}: {
  steps: WireframeStep[];
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, margin: "0px 0px -8% 0px" });
  const total = String(steps.length).padStart(2, "0");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    const stepsEls = root.querySelectorAll<HTMLElement>("[data-wf-step]");
    if (stepsEls[0]) stepsEls[0].classList.add("is-active");

    const ctx = gsap.context(() => {
      stepsEls.forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 65%",
          end: "bottom 40%",
          onEnter: () => {
            stepsEls.forEach((s) => s.classList.remove("is-active"));
            step.classList.add("is-active");
          },
          onEnterBack: () => {
            stepsEls.forEach((s) => s.classList.remove("is-active"));
            step.classList.add("is-active");
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [steps.length]);

  /**
   * Draw-on. Each frame sketches itself the first time it scrolls into view:
   * rules wipe left-to-right, filled blocks settle in behind them — the closest
   * DOM analogue to a pen laying down a wireframe, and the reason these stay
   * live elements rather than baked video (they reflow; a render wouldn't).
   *
   * Runs once per frame, never loops. Mobile included — the small frames are
   * where the drawing reads most clearly.
   */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    // Reduced motion keeps the finished drawing, skips the drawing of it.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>("[data-wf-frame]").forEach((frame) => {
        const lines = frame.querySelectorAll<HTMLElement>('[data-wf-ink="line"]');
        const blocks = frame.querySelectorAll<HTMLElement>('[data-wf-ink="block"]');
        if (!lines.length && !blocks.length) return;

        // Blocks fade rather than scale — scaling would smear their 1px borders.
        gsap.set(lines, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(blocks, { opacity: 0, y: 4 });

        gsap
          .timeline({ scrollTrigger: { trigger: frame, start: "top 85%", once: true } })
          .to(lines, { scaleX: 1, duration: 0.5, ease: "power3.out", stagger: 0.035 })
          .to(blocks, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.04 }, 0.12);
      });
    }, root);

    return () => ctx.revert();
  }, [steps.length]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative border border-border/15 bg-card/15",
        "[background-image:radial-gradient(hsl(var(--foreground)/0.05)_1px,transparent_1px)] [background-size:12px_12px]",
        className,
      )}
    >
      <div className="space-y-0 p-3 sm:p-4 md:p-5">
        {steps.map((step, i) => (
          <motion.div
            key={step.index}
            data-wf-step
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.45,
              delay: Math.min(i, 4) * 0.05,
              ease: easeOut,
            }}
            className={cn(
              "group relative grid grid-cols-1 gap-2.5 border-t border-border/15 py-3 first:border-t-0 first:pt-0",
              "sm:grid-cols-[48px_minmax(0,1fr)] sm:gap-3 sm:py-4",
              "lg:grid-cols-[48px_minmax(0,1.1fr)_minmax(0,0.85fr)] lg:gap-4 lg:py-4",
              "transition-opacity duration-400 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
              "lg:opacity-70 lg:[&.is-active]:opacity-100",
            )}
          >
            <div className="flex items-center gap-2 sm:flex-col sm:items-start sm:gap-1">
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center border font-heading text-xs font-bold",
                  "border-primary/60 text-primary",
                  "lg:border-border/40 lg:text-foreground/45",
                  "lg:group-[:is(.is-active)]:border-primary lg:group-[:is(.is-active)]:bg-primary/10 lg:group-[:is(.is-active)]:text-primary",
                )}
              >
                {step.index}
              </span>
              <div className="min-w-0 sm:pt-0.5">
                <p className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-foreground sm:hidden">
                  {step.title}
                </p>
                <span className="font-body text-[9px] uppercase tracking-[0.18em] text-foreground/30">
                  {step.index} / {total}
                </span>
              </div>
            </div>

            <div className="min-w-0">
              <div
                data-wf-frame
                className="aspect-[16/10] max-h-[180px] w-full overflow-hidden border border-foreground/30 bg-background/80 sm:max-h-[220px] lg:max-h-[280px] lg:group-[:is(.is-active)]:border-primary/50"
              >
                <WireframeSketch kind={step.kind} />
              </div>
              <p className="mt-2 hidden font-heading text-xs font-bold uppercase tracking-[0.12em] text-foreground sm:block">
                {step.title}
              </p>
            </div>

            <div className="border-l-0 pl-0 sm:col-span-2 lg:col-span-1 lg:border-l lg:border-primary/30 lg:pl-4">
              <p className="mb-1 font-body text-[9px] uppercase tracking-[0.28em] text-primary/60">
                On this screen
              </p>
              <p className="font-body text-[13px] leading-relaxed text-foreground/60 sm:text-sm">
                {step.note}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
