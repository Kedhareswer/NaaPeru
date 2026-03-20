import { useEffect, useRef, useCallback } from "react";
import { useTransition, TRANSITION_TIMING } from "@/contexts/TransitionContext";

const NUM_BARS = 7;
const STAGGER = 70; // ms between each bar

export const FilmShutterOverlay = () => {
  const { state, targetLabel } = useTransition();
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement[]>([]);
  const prevStateRef = useRef(state);

  const setBarRef = useCallback(
    (el: HTMLDivElement | null, i: number) => {
      if (el) barsRef.current[i] = el;
    },
    [],
  );

  useEffect(() => {
    const prev = prevStateRef.current;
    prevStateRef.current = state;

    if (prev === state) return;

    const bars = barsRef.current;
    const label = labelRef.current;
    const scanline = scanlineRef.current;

    // ─── CLOSING: bars slam shut with stagger ───
    if (state === "closing") {
      // First ensure bars are at scaleX(0) with no transition
      bars.forEach((bar, i) => {
        const fromLeft = i % 2 === 0;
        bar.style.transition = "none";
        bar.style.transform = "scaleX(0)";
        bar.style.transformOrigin = fromLeft ? "left" : "right";
      });
      if (label) {
        label.style.transition = "none";
        label.style.opacity = "0";
        label.style.transform = "translate(-50%, -50%) scale(0.9)";
      }
      if (scanline) {
        scanline.style.transition = "none";
        scanline.style.opacity = "0";
      }

      // Force reflow so the browser paints scaleX(0)
      void containerRef.current?.offsetHeight;

      // Now animate to scaleX(1) with stagger
      const closeDur = TRANSITION_TIMING.barsClose;
      bars.forEach((bar, i) => {
        const delay = i * STAGGER;
        bar.style.transition = `transform ${closeDur}ms cubic-bezier(0.7, 0, 0.3, 1) ${delay}ms`;
        bar.style.transform = "scaleX(1)";
      });
    }

    // ─── HOLD: bars fully closed, show label ───
    if (state === "hold") {
      bars.forEach((bar) => {
        bar.style.transition = "none";
        bar.style.transform = "scaleX(1)";
      });
      if (label) {
        label.style.transition =
          "opacity 0.25s ease, transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        label.style.opacity = "1";
        label.style.transform = "translate(-50%, -50%) scale(1)";
      }
      if (scanline) {
        scanline.style.transition = "opacity 0.2s ease";
        scanline.style.opacity = "1";
      }
    }

    // ─── OPENING: bars slide out, reveal new page ───
    if (state === "opening") {
      // First: hide label + scanlines
      if (label) {
        label.style.transition = "opacity 0.2s ease";
        label.style.opacity = "0";
      }
      if (scanline) {
        scanline.style.transition = "opacity 0.15s ease";
        scanline.style.opacity = "0";
      }

      // Small delay then bars open (reverse origin direction)
      setTimeout(() => {
        const openDur = TRANSITION_TIMING.barsOpen;
        bars.forEach((bar, i) => {
          const fromLeft = i % 2 === 0;
          const delay = i * STAGGER;
          // Flip origin so they exit opposite side
          bar.style.transformOrigin = fromLeft ? "right" : "left";
          bar.style.transition = `transform ${openDur}ms cubic-bezier(0.7, 0, 0.3, 1) ${delay}ms`;
          bar.style.transform = "scaleX(0)";
        });
      }, 100);
    }
  }, [state]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ display: state === "idle" ? "none" : "block" }}
    >
      {/* Shutter bars — always mounted, hidden via display:none when idle */}
      {Array.from({ length: NUM_BARS }).map((_, i) => (
        <div
          key={i}
          ref={(el) => setBarRef(el, i)}
          className="absolute left-0 w-full"
          style={{
            top: `${(i / NUM_BARS) * 100}%`,
            height: `${100 / NUM_BARS + 0.5}%`,
            background: "hsl(var(--surface-subtle))",
            transform: "scaleX(0)",
            transformOrigin: i % 2 === 0 ? "left" : "right",
            willChange: "transform",
          }}
        >
          {/* Red accent line on leading edge */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-primary/80"
            style={{ [i % 2 === 0 ? "right" : "left"]: 0 }}
          />
          {/* Subtle bottom border between bars */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-primary/20" />
        </div>
      ))}

      {/* Scanline overlay */}
      <div
        ref={scanlineRef}
        className="absolute inset-0"
        style={{
          opacity: 0,
          zIndex: 62,
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            hsla(0, 0%, 0%, 0.25) 2px,
            hsla(0, 0%, 0%, 0.25) 4px
          )`,
        }}
      />

      {/* Route label */}
      <div
        ref={labelRef}
        className="absolute flex items-center justify-center"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(0.9)",
          opacity: 0,
          zIndex: 65,
          whiteSpace: "nowrap",
        }}
      >
        <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground">
          <span className="text-primary">.</span>
          {targetLabel}
        </h2>
      </div>
    </div>
  );
};
