import { useEffect, useRef, useCallback } from "react";
import { useTransition, TRANSITION_TIMING } from "@/contexts/TransitionContext";

const NUM_BARS = 7;
const STAGGER = 70; // ms between each bar

export const FilmShutterOverlay = () => {
  const { state, targetLabel, carry } = useTransition();
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const carriedRef = useRef<HTMLDivElement>(null);
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
    const carried = carriedRef.current;

    // ─── CLOSING: bars slam shut with stagger; carried thumb travels to top ───
    if (state === "closing") {
      bars.forEach((bar, i) => {
        const fromLeft = i % 2 === 0;
        bar.style.transition = "none";
        bar.style.transform = "scaleX(0)";
        bar.style.transformOrigin = fromLeft ? "left" : "right";
      });
      if (label) {
        label.style.transition = "none";
        label.style.opacity = "0";
        label.style.transform = "translate(-50%, -50%) scale(0.96)";
      }
      if (scanline) {
        scanline.style.transition = "none";
        scanline.style.opacity = "0";
      }

      // Position carried thumbnail at source rect, then animate to target
      if (carried && carry) {
        carried.style.transition = "none";
        carried.style.opacity = "1";
        carried.style.left = `${carry.rect.left}px`;
        carried.style.top = `${carry.rect.top}px`;
        carried.style.width = `${carry.rect.width}px`;
        carried.style.height = `${carry.rect.height}px`;
      }

      void containerRef.current?.offsetHeight; // force reflow

      const closeDur = TRANSITION_TIMING.barsClose;
      bars.forEach((bar, i) => {
        const delay = i * STAGGER;
        bar.style.transition = `transform ${closeDur}ms cubic-bezier(0.7, 0, 0.3, 1) ${delay}ms`;
        bar.style.transform = "scaleX(1)";
      });

      // Animate the carried thumb from its source rect to a top-anchored
      // case-study-hero-shaped target (full container width, 21/9 aspect)
      if (carried && carry) {
        const totalDur = closeDur + (NUM_BARS - 1) * STAGGER;
        const target = computeCarryTarget();
        carried.style.transition =
          `left ${totalDur}ms cubic-bezier(0.25,0.46,0.45,0.94),` +
          `top ${totalDur}ms cubic-bezier(0.25,0.46,0.45,0.94),` +
          `width ${totalDur}ms cubic-bezier(0.25,0.46,0.45,0.94),` +
          `height ${totalDur}ms cubic-bezier(0.25,0.46,0.45,0.94)`;
        carried.style.left = `${target.left}px`;
        carried.style.top = `${target.top}px`;
        carried.style.width = `${target.width}px`;
        carried.style.height = `${target.height}px`;
      }
    }

    // ─── HOLD: bars fully closed, ghost word + scanlines on; fade carried thumb ───
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
      // The carried thumb is now hidden behind the closed bars; fade it out so
      // it doesn't flash when the bars open over a new page that may not have
      // a matching hero image.
      if (carried) {
        carried.style.transition = "opacity 0.25s ease";
        carried.style.opacity = "0";
      }
    }

    // ─── OPENING: bars slide out, reveal new page ───
    if (state === "opening") {
      if (label) {
        label.style.transition = "opacity 0.2s ease";
        label.style.opacity = "0";
      }
      if (scanline) {
        scanline.style.transition = "opacity 0.15s ease";
        scanline.style.opacity = "0";
      }

      setTimeout(() => {
        const openDur = TRANSITION_TIMING.barsOpen;
        bars.forEach((bar, i) => {
          const fromLeft = i % 2 === 0;
          const delay = i * STAGGER;
          bar.style.transformOrigin = fromLeft ? "right" : "left";
          bar.style.transition = `transform ${openDur}ms cubic-bezier(0.7, 0, 0.3, 1) ${delay}ms`;
          bar.style.transform = "scaleX(0)";
        });
      }, 100);
    }
  }, [state, carry]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ display: state === "idle" ? "none" : "block" }}
    >
      {/* Carried thumbnail — sits BEHIND bars (z-index 0 within container,
          bars are z-index 1+). Visible through stagger gaps during closing,
          covered during hold, fades before opening. */}
      {carry && (
        <div
          ref={carriedRef}
          className="absolute overflow-hidden"
          style={{
            zIndex: 0,
            opacity: 0,
            backgroundImage: `url("${carry.image}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      {/* Shutter bars — film perforations on leading edge instead of solid line */}
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
            zIndex: 1,
          }}
        >
          {/* Film perforations (35mm-style punches) on the leading edge */}
          <div
            className="absolute top-0 bottom-0 w-1"
            style={{
              [i % 2 === 0 ? "right" : "left"]: 0,
              background:
                "repeating-linear-gradient(to bottom, hsl(var(--primary)) 0, hsl(var(--primary)) 5px, transparent 5px, transparent 9px)",
            }}
            aria-hidden="true"
          />
          {/* Subtle bottom hairline between bars */}
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

      {/* Route label — destination's ghost word at 5% opacity (matches
          the ghost typography already living on the destination page) */}
      <div
        ref={labelRef}
        className="absolute flex items-center justify-center select-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(0.96)",
          opacity: 0,
          zIndex: 65,
          whiteSpace: "nowrap",
        }}
      >
        <h2
          className="font-heading font-bold tracking-tighter text-foreground/5 leading-none"
          style={{ fontSize: "clamp(8rem, 18vw, 20rem)" }}
        >
          {targetLabel}
        </h2>
      </div>
    </div>
  );
};

/**
 * Where the carried thumbnail should land at the end of the close phase.
 * Top-anchored, container-width, 21/9 aspect — roughly where a case-study
 * hero image would sit if the destination route renders one. If it doesn't,
 * the thumb fades during hold so nothing visible carries over.
 */
function computeCarryTarget() {
  const vw = window.innerWidth;
  // Match container-portfolio horizontal padding (matches src/index.css)
  const px =
    vw >= 1280 ? 80 :
    vw >= 1024 ? 64 :
    vw >= 768 ? 48 :
    vw >= 640 ? 32 : 24;
  const maxContainer = 1440;
  const containerWidth = Math.min(vw - px * 2, maxContainer - px * 2);
  const left = Math.max(px, (vw - containerWidth) / 2);
  const top = 120; // below nav
  const width = containerWidth;
  const height = width * (9 / 21);
  return { left, top, width, height };
}
