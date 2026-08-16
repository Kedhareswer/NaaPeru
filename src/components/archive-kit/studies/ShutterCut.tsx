import { useCallback, useEffect, useRef, useState } from "react";
import { EASE_SHUTTER, FRAMES, Readout, usePrefersReducedMotion } from "./_shared";

/**
 * Focal-plane timing. A real curtain doesn't move as one piece — each band
 * starts a beat after the one above it, so the closure reads as travel rather
 * than a wipe. Everything downstream is derived from these four numbers.
 */
const BLADES = 7;
const STAGGER = 34; // ms between adjacent blades
const CLOSE_MS = 240; // one blade's sweep, closing
const HOLD_MS = 190; // full closure — the window the swap hides inside
const OPEN_MS = 260; // one blade's sweep, opening

const CLOSE_TOTAL = CLOSE_MS + (BLADES - 1) * STAGGER;
const OPEN_TOTAL = OPEN_MS + (BLADES - 1) * STAGGER;

type Phase = "idle" | "closing" | "swap" | "opening";

/** The three exposures the shutter cuts between. Real work, real captions. */
const STATES = [
  {
    frame: FRAMES[0],
    caption:
      "Retrieval traces render beside the answer, so a bad citation is visible before it is trusted.",
  },
  {
    frame: FRAMES[3],
    caption:
      "Two models play and the board doubles as the log — every illegal move is a legible failure, not a silent retry.",
  },
  {
    frame: FRAMES[7],
    caption:
      "Edge thresholds tuned by hand until the line reads as drawn rather than computed.",
  },
];

/** Phase timeline — the honest part. Shows what the motion costs and buys. */
const SEGMENTS: { phase: Exclude<Phase, "idle">; label: string; ms: number }[] = [
  { phase: "closing", label: "Closing", ms: CLOSE_TOTAL },
  { phase: "swap", label: "Swap", ms: HOLD_MS },
  { phase: "opening", label: "Opening", ms: OPEN_TOTAL },
];

export default function ShutterCut() {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  /** What the tabs report — updates on press, so the control never feels laggy. */
  const [selected, setSelected] = useState(0);
  /** What the panel renders — only ever changes behind a fully closed shutter. */
  const [shown, setShown] = useState(0);

  const targetRef = useRef(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  /**
   * One timer at a time, owned by one effect. Every branch returns a clear, so
   * an unmount mid-sweep can't land a setState — and because `idle` is the only
   * terminal state, the shutter can never park itself closed.
   */
  useEffect(() => {
    if (phase === "idle") return;

    let timer = 0;
    if (phase === "closing") {
      timer = window.setTimeout(() => setPhase("swap"), CLOSE_TOTAL);
    } else if (phase === "swap") {
      // The swap itself. Anything expensive — a fetch, a decode — belongs here.
      timer = window.setTimeout(() => {
        setShown(targetRef.current);
        setPhase("opening");
      }, HOLD_MS);
    } else {
      timer = window.setTimeout(() => setPhase("idle"), OPEN_TOTAL);
    }

    return () => window.clearTimeout(timer);
  }, [phase]);

  const expose = useCallback(
    (index: number) => {
      // Guard: input during a sweep is dropped, not queued. A second shutter
      // fired mid-travel would expose the swap it exists to hide.
      if (phase !== "idle") return;
      setSelected(index);
      targetRef.current = index;

      if (reduced) {
        setShown(index); // no sweep, no hold — the state just changes
        return;
      }
      setPhase("closing");
    },
    [phase, reduced],
  );

  /** Roving focus across the tablist, per the tabs pattern. */
  const onTabKeyDown = (event: React.KeyboardEvent) => {
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    let next = -1;
    if (delta !== 0) next = (selected + delta + STATES.length) % STATES.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = STATES.length - 1;
    if (next < 0) return;

    event.preventDefault();
    tabsRef.current[next]?.focus();
    expose(next);
  };

  const busy = phase !== "idle";
  const state = STATES[shown];

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-background px-6 py-5 md:px-8">
      {/* ─── Triggers ─────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          role="tablist"
          aria-label="Exposure"
          aria-busy={busy}
          onKeyDown={onTabKeyDown}
          className="flex border border-border bg-card"
        >
          {STATES.map((item, i) => (
            <button
              key={item.frame.title}
              ref={(el) => {
                tabsRef.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`shutter-tab-${i}`}
              aria-selected={selected === i}
              aria-controls="shutter-panel"
              tabIndex={selected === i ? 0 : -1}
              onClick={() => expose(i)}
              className={`border-r border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors last:border-r-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-1 focus-visible:ring-offset-background ${
                selected === i
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/55 hover:text-foreground"
              }`}
            >
              {item.frame.title}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => expose(selected)}
          className="border border-border bg-card px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/70 transition-colors hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-1 focus-visible:ring-offset-background"
        >
          Re-expose
        </button>
      </div>

      {/* ─── Stage: content and curtain share one clipping frame ──── */}
      <div className="relative mt-4 min-h-0 flex-1 overflow-hidden border border-border bg-card">
        <div
          id="shutter-panel"
          role="tabpanel"
          aria-labelledby={`shutter-tab-${selected}`}
          className="flex h-full flex-col"
        >
          <div className="min-h-0 flex-1 overflow-hidden bg-foreground/[0.06]">
            <img
              src={state.frame.src}
              alt={state.frame.title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="border-t border-border px-4 py-3">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-body text-sm font-medium text-foreground">{state.frame.title}</h3>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] tabular-nums text-foreground/45">
                {state.frame.exif.focal} · {state.frame.exif.aperture} · {state.frame.exif.shutter}
              </span>
            </div>
            <p className="mt-1.5 font-body text-xs leading-relaxed text-foreground/60">
              {state.caption}
            </p>
          </div>
        </div>

        {/* Curtain. Closing sweeps top-down from each blade's leading edge;
            opening continues in the same direction, retracting to the trailing
            edge — the way a second curtain follows a first. */}
        {!reduced &&
          Array.from({ length: BLADES }).map((_, i) => {
            const shut = phase === "closing" || phase === "swap";
            const moving = phase === "closing" || phase === "opening";
            return (
              <div
                key={i}
                aria-hidden
                className="pointer-events-none absolute left-0 w-full bg-black"
                style={{
                  top: `${(i / BLADES) * 100}%`,
                  height: `${100 / BLADES + 0.4}%`, // overlap kills seam lines
                  transform: shut ? "scaleY(1)" : "scaleY(0)",
                  transformOrigin: shut ? "top" : "bottom",
                  transition: moving
                    ? `transform ${phase === "closing" ? CLOSE_MS : OPEN_MS}ms ${EASE_SHUTTER} ${i * STAGGER}ms`
                    : "none",
                  willChange: moving ? "transform" : undefined,
                }}
              >
                <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
              </div>
            );
          })}
      </div>

      {/* ─── Readout: what the motion is buying ──────────────────── */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {reduced ? (
          <>
            <Readout>Instant swap</Readout>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/40">
              Reduced motion — curtain suppressed
            </span>
          </>
        ) : (
          <>
            <div className="flex border border-border">
              {SEGMENTS.map((seg) => (
                <span
                  key={seg.phase}
                  className={`border-r border-border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] tabular-nums transition-colors last:border-r-0 ${
                    phase === seg.phase
                      ? "bg-primary text-primary-foreground"
                      : "bg-card/80 text-foreground/45"
                  }`}
                >
                  {seg.label} {seg.ms}
                </span>
              ))}
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/40">
              {busy ? "Curtain travelling" : `Swap window ${HOLD_MS}ms — loading hides here`}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
