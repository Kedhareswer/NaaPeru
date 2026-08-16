import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

/**
 * Cinematic preloader, no skip: the sunset-drive reel (measured Pinterest
 * rebuild, Real-ESRGAN x4plus master) plays full-bleed while a 0-100 counter
 * runs over a 3s minimum, then the site enters. Reduced-motion skips
 * everything; a hard cap guarantees the site is never blocked.
 */
const LOAD_SECONDS = 3;
const HARD_CAP_MS = 8000;

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const doneRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (reduceMotion) {
      const t = window.setTimeout(() => onCompleteRef.current(), 150);
      return () => window.clearTimeout(t);
    }

    const exit = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      gsap.to(root, {
        autoAlpha: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => onCompleteRef.current(),
      });
    };

    const progress = { value: 0 };
    const tween = gsap.to(progress, {
      value: 100,
      duration: LOAD_SECONDS,
      ease: "none",
      onUpdate: () => {
        const n = Math.round(progress.value);
        if (counterRef.current) counterRef.current.textContent = String(n);
        if (barRef.current) barRef.current.style.transform = `scaleX(${progress.value / 100})`;
      },
      onComplete: exit,
    });

    const cap = window.setTimeout(exit, HARD_CAP_MS);
    return () => {
      tween.kill();
      window.clearTimeout(cap);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-50 overflow-hidden bg-background"
      role="status"
      aria-busy="true"
      aria-label="Loading portfolio"
    >
      {/* Sunset drive reel — 16:9 master covers every viewport */}
      {!reduceMotion && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          poster="/intro-poster.jpg"
          autoPlay
          muted
          playsInline
          loop
          aria-hidden="true"
        >
          <source src="/intro.webm" type="video/webm" />
          <source src="/intro.mp4" type="video/mp4" />
        </video>
      )}

      {/* Scrim: keeps the overlay legible without boxing the video */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
        aria-hidden="true"
      />

      {/* Overlay: identity + loading counter, floating on the footage */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-6 pb-6 sm:px-10 sm:pb-8">
        <p className="font-heading text-[10px] uppercase tracking-[0.45em] text-white/80 sm:text-xs">
          Kedhar<span className="text-primary"> —</span> AI Engineer + Developer
        </p>

        <div className="flex items-baseline gap-3">
          <span className="font-body text-[10px] uppercase tracking-[0.4em] text-white/50">
            Loading
          </span>
          <span className="font-heading text-3xl font-bold text-white tabular-nums sm:text-4xl">
            <span ref={counterRef}>0</span>
            <span className="text-lg sm:text-xl">%</span>
          </span>
        </div>
      </div>

      {/* Hairline progress at the frame's bottom edge */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/15" aria-hidden="true">
        <div
          ref={barRef}
          className="h-full w-full origin-left bg-primary will-change-transform"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
};
