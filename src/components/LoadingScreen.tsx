import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

/**
 * Identity-preserving enhancement of the existing preloader.
 * Keeps visible at all times: BoldCraft logo, conic ring,
 * “Crafting your experience”, % counter, Initializing/Ready, progress bar.
 * Upgrades: GSAP progress easing + soft logo settle + fade exit + reduced-motion.
 */
export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const logoSrc = useMemo(() => "/logo.png", []);

  useEffect(() => {
    const root = rootRef.current;
    const ring = ringRef.current;
    const bar = barRef.current;
    const counter = counterRef.current;
    const status = statusRef.current;
    const logo = logoRef.current;
    if (!root || !ring || !bar || !counter || !status || !logo) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setRing = (pct: number) => {
      ring.style.background = `conic-gradient(from 180deg at 50% 50%, hsl(var(--primary)) ${pct}%, hsl(var(--primary) / 0.15) ${pct}% 100%)`;
    };

    if (reduceMotion) {
      counter.textContent = "100";
      status.textContent = "Ready";
      gsap.set(bar, { scaleX: 1 });
      setRing(100);
      const t = window.setTimeout(() => onCompleteRef.current(), 200);
      return () => window.clearTimeout(t);
    }

    const progress = { value: 0 };
    const ctx = gsap.context(() => {
      gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
      setRing(0);

      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      tl.to(progress, {
        value: 100,
        duration: 2.4,
        onUpdate: () => {
          const n = Math.round(progress.value);
          counter.textContent = String(n);
          status.textContent = n < 100 ? "Initializing" : "Ready";
          gsap.set(bar, { scaleX: progress.value / 100 });
          setRing(progress.value);
        },
      });

      // Soft settle on the mark — same brand, better finish
      tl.to(
        logo,
        {
          scale: 1.06,
          duration: 0.22,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        },
        ">-0.05",
      );

      tl.to(
        root,
        {
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => onCompleteRef.current(),
        },
        "+=0.25",
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-50 overflow-hidden bg-background"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading portfolio"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsla(var(--primary)/0.2),transparent_60%)] opacity-70"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(140deg,hsla(var(--primary)/0.08),transparent,hsla(var(--primary)/0.12))]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-10 text-center">
        <div className="relative flex h-40 w-40 items-center justify-center">
          <div
            className="absolute inset-0 animate-spin-slow rounded-full border border-white/5"
            aria-hidden="true"
          />
          <div
            ref={ringRef}
            className="absolute inset-0 rounded-full opacity-90"
            style={{
              background:
                "conic-gradient(from 180deg at 50% 50%, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.15) 0% 100%)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-[14px] rounded-full bg-background/80 backdrop-blur"
            aria-hidden="true"
          />
          <img
            ref={logoRef}
            src={logoSrc}
            alt="BoldCraft mark"
            className="relative h-16 w-16 object-contain drop-shadow-[0_15px_35px_hsla(5,78%,42%,0.35)] animate-logo-wipe will-change-transform"
          />
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="font-heading text-sm uppercase tracking-[0.45em] text-foreground/60">
            Crafting your experience
          </p>

          <div className="flex items-end gap-3">
            <span className="font-heading text-5xl font-bold text-foreground tabular-nums">
              <span ref={counterRef}>0</span>
              <span className="text-3xl">%</span>
            </span>
            <span
              ref={statusRef}
              className="font-body text-xs uppercase tracking-[0.4em] text-foreground/40"
            >
              Initializing
            </span>
          </div>

          <div className="relative h-1 w-72 overflow-hidden rounded-full bg-foreground/10">
            <div
              ref={barRef}
              className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-gradient-to-r from-primary via-primary/80 to-foreground/70 shadow-[0_0_20px_hsla(var(--primary)/0.4)] will-change-transform"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
