import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Vijaya Bank "Final Screens" board — ported to dark crimson.
 *
 * What makes Vijaya work (and what a vertical case-study list is NOT):
 * - One composition canvas, not stacked full-width rows
 * - Compact device frames floating on large accent circles
 * - Zigzag placement with thin flow connectors
 * - Short captions under devices
 * - Sticky callout cards beside frames
 * - Nav sitemap expanding from the "home" screen
 */

export type FinalScreen = {
  index: string;
  title: string;
  caption: string;
  callout?: string;
  steps?: string[];
  image?: string;
  imageAlt?: string;
  sketch?: "landing" | "login";
};

export type NavMapItem = {
  label: string;
  children: string[];
};

function LandingSketch() {
  return (
    <div className="flex h-full flex-col bg-[#0c0c0c]">
      <div className="flex h-4 items-center gap-1 border-b border-white/10 px-2">
        <span className="h-1 w-1 bg-white/20" />
        <span className="h-1 w-1 bg-white/20" />
        <span className="h-1 w-1 bg-white/20" />
      </div>
      <div className="relative flex flex-1 flex-col justify-center gap-2 p-3">
        <div className="h-px w-2/3 bg-white/20" />
        <div className="h-px w-1/2 bg-white/10" />
        <div className="mt-3 h-5 w-16 bg-primary" />
        <div className="absolute bottom-3 right-3 top-6 w-[40%] border border-dashed border-white/15" />
      </div>
    </div>
  );
}

function LoginSketch() {
  return (
    <div className="flex h-full flex-col bg-[#0c0c0c]">
      <div className="h-10 bg-primary/80" />
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4">
        <div className="h-px w-10 bg-white/25" />
        <div className="mt-2 h-6 w-full border border-white/20" />
        <div className="h-6 w-full border border-white/20" />
        <div className="mt-2 h-7 w-full bg-primary" />
        <div className="mt-3 h-8 w-8 rounded-full border border-white/25" />
      </div>
    </div>
  );
}

function DeviceFrame({
  screen,
  className,
}: {
  screen: FinalScreen;
  className?: string;
}) {
  return (
    <div className={cn("relative z-[1] w-[min(100%,300px)]", className)}>
      {/* Compact browser mockup — web product, Vijaya device scale */}
      <div className="overflow-hidden border border-foreground/70 bg-background shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85)]">
        <div className="flex h-6 items-center gap-1.5 border-b border-border/40 bg-card px-2.5">
          <span className="h-1.5 w-1.5 bg-foreground/25" />
          <span className="h-1.5 w-1.5 bg-foreground/25" />
          <span className="h-1.5 w-1.5 bg-foreground/25" />
          <span className="ml-2 h-2 flex-1 max-w-[55%] bg-foreground/10" />
        </div>
        <div className="aspect-[4/5] overflow-hidden bg-background">
          {screen.image ? (
            <img
              src={screen.image}
              alt={screen.imageAlt ?? screen.title}
              loading="lazy"
              className="h-full w-full object-cover object-top"
            />
          ) : screen.sketch === "login" ? (
            <LoginSketch />
          ) : (
            <LandingSketch />
          )}
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-heading text-lg font-bold text-primary">{screen.index}</span>
        <span className="font-heading text-[11px] font-bold uppercase tracking-[0.18em] text-foreground">
          {screen.title}
        </span>
      </div>
      <p className="mt-1 max-w-[280px] font-body text-[11px] leading-snug text-foreground/50">
        {screen.caption}
      </p>
      {screen.callout && !screen.steps && (
        <Sticky className="mt-3">{screen.callout}</Sticky>
      )}
      {screen.steps && screen.steps.length > 0 && (
        <Sticky className="mt-3 max-w-[240px]">
          {screen.callout && <p className="mb-2">{screen.callout}</p>}
          <ol className="space-y-1">
            {screen.steps.map((step, i) => (
              <li key={step} className="flex gap-1.5">
                <span className="shrink-0 font-heading text-[9px] font-bold">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </Sticky>
      )}
    </div>
  );
}

function AccentCircle({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full bg-primary/25",
        className,
      )}
    />
  );
}

function Sticky({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <aside
      className={cn(
        "relative z-[2] max-w-[200px] border border-primary/40 bg-primary px-3 py-2.5",
        "font-body text-[10px] leading-snug text-primary-foreground",
        className,
      )}
    >
      {children}
    </aside>
  );
}

function FlowArrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 80 40"
      className={cn("h-8 w-16 text-foreground/35", className)}
      fill="none"
    >
      <path
        d="M4 20 H68 M58 10 L72 20 L58 30"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function NavMap({ items }: { items: NavMapItem[] }) {
  return (
    <div className="relative z-[2] w-full max-w-xl border border-border/25 bg-background/90 p-3">
      <p className="mb-2 font-body text-[9px] uppercase tracking-[0.28em] text-primary">
        Main navigation
      </p>
      <div className="grid grid-cols-4 gap-px bg-border/30">
        {items.map((item) => (
          <div
            key={item.label}
            className="bg-primary px-1.5 py-2 text-center font-heading text-[8px] font-bold uppercase tracking-[0.08em] text-primary-foreground sm:text-[9px]"
          >
            {item.label}
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {items.map((item) => (
          <ul key={item.label} className="space-y-0.5 border-t border-border/20 pt-1.5">
            {item.children.map((child) => (
              <li
                key={child}
                className="font-body text-[8px] leading-snug text-foreground/45 sm:text-[9px]"
              >
                {child}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

const easeOut = [0.16, 1, 0.3, 1] as const;

/**
 * Expects screens in Vijaya order:
 * 0 Landing, 1 Login, 2 Home/Literature, 3 Module A, 4 Module B (+ optional steps)
 */
export function ProcessFinalBoard({
  screens,
  navMap,
  className,
}: {
  screens: FinalScreen[];
  navMap?: NavMapItem[];
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, margin: "0px 0px -8% 0px" });

  const s0 = screens[0];
  const s1 = screens[1];
  const s2 = screens[2];
  const s3 = screens[3];
  const s4 = screens[4];

  return (
    <motion.div
      ref={rootRef}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: easeOut }}
      className={cn(
        "relative overflow-hidden border border-border/20 bg-[#121212]",
        "[background-image:radial-gradient(hsl(var(--foreground)/0.045)_1px,transparent_1px)] [background-size:16px_16px]",
        className,
      )}
    >
      <div className="relative px-4 py-10 md:px-10 md:py-14">
        {/* ── Row 1: Landing → Login ── */}
        <div className="relative flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between md:gap-6">
          {s0 && (
            <div className="relative">
              <AccentCircle className="-left-8 -top-6 h-48 w-48 md:h-56 md:w-56" />
              <DeviceFrame screen={s0} />
            </div>
          )}

          <FlowArrow className="hidden shrink-0 self-center md:block" />
          <div className="flex md:hidden" aria-hidden>
            <FlowArrow className="rotate-90" />
          </div>

          {s1 && (
            <div className="relative">
              <AccentCircle className="-right-6 -top-8 h-52 w-52 md:h-60 md:w-60" />
              <DeviceFrame screen={s1} className="md:ml-auto" />
            </div>
          )}
        </div>

        {/* Connector down to home */}
        <div className="my-6 flex justify-center md:my-10" aria-hidden>
          <svg viewBox="0 0 24 48" className="h-12 w-6 text-foreground/30" fill="none">
            <path d="M12 0 V40 M4 32 L12 44 L20 32" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        {/* ── Row 2: Home / Literature + nav map ── */}
        {s2 && (
          <div className="relative mb-10 flex flex-col items-center gap-8 md:mb-14 md:flex-row md:items-start md:justify-center md:gap-8">
            <div className="relative shrink-0">
              <AccentCircle className="-left-10 -top-8 h-56 w-56 md:h-64 md:w-64" />
              <DeviceFrame screen={s2} />
            </div>

            {navMap && (
              <div className="relative w-full max-w-xl flex-1 pt-2 md:pt-20">
                <svg
                  aria-hidden
                  className="pointer-events-none absolute -left-6 top-28 hidden h-6 w-8 text-foreground/30 md:block"
                  viewBox="0 0 40 24"
                  fill="none"
                >
                  <path
                    d="M0 12 H28 M20 4 L32 12 L20 20"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeDasharray="3 3"
                  />
                </svg>
                <NavMap items={navMap} />
              </div>
            )}
          </div>
        )}

        {/* ── Row 3: Module screens ── */}
        <div className="relative flex flex-col items-center gap-12 md:flex-row md:items-start md:justify-between md:gap-10">
          {s3 && (
            <div className="relative">
              <AccentCircle className="-left-6 -top-6 h-48 w-48 md:h-56 md:w-56" />
              <DeviceFrame screen={s3} />
            </div>
          )}

          {s4 && (
            <div className="relative md:mt-12">
              <AccentCircle className="-right-8 -top-4 h-52 w-52 md:h-60 md:w-60" />
              <DeviceFrame screen={s4} />
            </div>
          )}
        </div>

        {screens[5] && (
          <div className="relative mt-12 flex justify-center md:mt-16">
            <div className="relative">
              <AccentCircle className="-left-8 -top-6 h-52 w-52" />
              <DeviceFrame screen={screens[5]} />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
