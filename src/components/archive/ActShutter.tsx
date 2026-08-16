import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const NUM_BARS = 7;
const STAGGER_MS = 70;
const CLOSE_MS = 600;
const HOLD_MS = 400;
const OPEN_MS = 600;

gsap.registerPlugin(ScrollTrigger);

interface ActShutterProps {
  ghostWord: string;
}

/** Inline 7-bar shutter — same visual language as FilmShutterOverlay, scroll-triggered. */
export function ActShutter({ ghostWord }: ActShutterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement[]>([]);
  const [active, setActive] = useState(false);
  const playedRef = useRef(false);

  const setBarRef = useCallback((el: HTMLDivElement | null, i: number) => {
    if (el) barsRef.current[i] = el;
  }, []);

  const playShutter = useCallback(() => {
    if (playedRef.current) return;
    playedRef.current = true;
    setActive(true);

    const bars = barsRef.current;
    const label = labelRef.current;

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

    void containerRef.current?.offsetHeight;

    bars.forEach((bar, i) => {
      const fromLeft = i % 2 === 0;
      const delay = i * STAGGER_MS;
      bar.style.transition = `transform ${CLOSE_MS}ms cubic-bezier(0.7, 0, 0.3, 1) ${delay}ms`;
      bar.style.transform = "scaleX(1)";
      bar.style.transformOrigin = fromLeft ? "left" : "right";
    });

    const closeTotal = CLOSE_MS + (NUM_BARS - 1) * STAGGER_MS;

    setTimeout(() => {
      if (label) {
        label.style.transition = "opacity 0.25s ease, transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        label.style.opacity = "1";
        label.style.transform = "translate(-50%, -50%) scale(1)";
      }
    }, closeTotal - 100);

    setTimeout(() => {
      if (label) {
        label.style.transition = "opacity 0.2s ease";
        label.style.opacity = "0";
      }
      bars.forEach((bar, i) => {
        const fromLeft = i % 2 === 0;
        const delay = i * STAGGER_MS;
        bar.style.transformOrigin = fromLeft ? "right" : "left";
        bar.style.transition = `transform ${OPEN_MS}ms cubic-bezier(0.7, 0, 0.3, 1) ${delay}ms`;
        bar.style.transform = "scaleX(0)";
      });

      const openTotal = OPEN_MS + (NUM_BARS - 1) * STAGGER_MS + HOLD_MS;
      setTimeout(() => setActive(false), openTotal);
    }, closeTotal + HOLD_MS);
  }, [ghostWord]);

  useEffect(() => {
    const el = containerRef.current?.parentElement;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 75%",
      once: true,
      onEnter: playShutter,
    });

    return () => trigger.kill();
  }, [playShutter]);

  if (!active && playedRef.current) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[60]"
      style={{ display: active ? "block" : "none" }}
    >
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
          <div
            className="absolute top-0 bottom-0 w-1"
            style={{
              [i % 2 === 0 ? "right" : "left"]: 0,
              background:
                "repeating-linear-gradient(to bottom, hsl(var(--primary)) 0, hsl(var(--primary)) 5px, transparent 5px, transparent 9px)",
            }}
            aria-hidden="true"
          />
          <div className="absolute bottom-0 left-0 h-px w-full bg-primary/20" />
        </div>
      ))}

      <div
        ref={labelRef}
        className="absolute flex select-none items-center justify-center"
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
          className="font-heading font-bold leading-none tracking-tighter text-foreground/5"
          style={{ fontSize: "clamp(6rem, 14vw, 16rem)" }}
        >
          {ghostWord}
        </h2>
      </div>
    </div>
  );
}
