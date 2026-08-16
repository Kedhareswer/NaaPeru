import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderInkProps {
  onComplete: () => void;
  /** When false, stays on final frame instead of fading out. Default true. */
  autoExit?: boolean;
}

/**
 * Direction C — Ink canvas.
 * Full-bleed brush atmosphere + bottom-left type + thin progress rail.
 */
export const PreloaderInk = ({ onComplete, autoExit = true }: PreloaderInkProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const inkRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLImageElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const readyRef = useRef<HTMLParagraphElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const root = rootRef.current;
    const ink = inkRef.current;
    const mark = markRef.current;
    const bar = barRef.current;
    const counter = counterRef.current;
    const status = statusRef.current;
    const ready = readyRef.current;
    if (!root || !ink || !mark || !bar || !counter || !status || !ready) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      counter.textContent = "100";
      status.textContent = "ENTERING";
      ready.textContent = "READY";
      gsap.set(bar, { scaleX: 1 });
      gsap.set([ink, mark], { opacity: 1, scale: 1 });
      const t = window.setTimeout(() => onCompleteRef.current(), 300);
      return () => window.clearTimeout(t);
    }

    const progress = { value: 0 };
    const ctx = gsap.context(() => {
      gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(ink, { scale: 1.08, opacity: 0.55 });
      gsap.set(mark, { scale: 1.12, opacity: 0.7, filter: "blur(6px)" });
      gsap.set(ready, { opacity: 0, y: 12 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(ink, { scale: 1, opacity: 1, duration: 1.1 }, 0);
      tl.to(
        mark,
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.2 },
        0.08,
      );

      tl.to(
        progress,
        {
          value: 100,
          duration: 2.6,
          ease: "power2.inOut",
          onUpdate: () => {
            const n = Math.round(progress.value);
            counter.textContent = String(n).padStart(3, "0");
            gsap.set(bar, { scaleX: progress.value / 100 });
            if (n >= 92) {
              status.textContent = "ENTERING";
            }
          },
        },
        0.2,
      );

      tl.to(
        ready,
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
        ">-0.35",
      );

      if (autoExit) {
        tl.to(
          root,
          {
            autoAlpha: 0,
            duration: 0.55,
            ease: "power2.inOut",
            onComplete: () => onCompleteRef.current(),
          },
          "+=0.35",
        );
      } else {
        tl.call(() => onCompleteRef.current(), [], "+=0.2");
      }
    }, root);

    return () => ctx.revert();
  }, [autoExit]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-50 overflow-hidden bg-[#0a0c10] text-foreground"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading — ink canvas"
    >
      {/* Atmosphere */}
      <div
        ref={inkRef}
        className="pointer-events-none absolute inset-0 will-change-transform"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_72%_45%,hsla(5,78%,42%,0.28),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_20%_80%,hsla(5,78%,42%,0.12),transparent_60%)]" />
        <div className="absolute -right-[8%] top-[8%] h-[85%] w-[70%] opacity-90">
          <img
            ref={markRef}
            src="/logo.png"
            alt=""
            className="h-full w-full object-contain object-right drop-shadow-[0_0_80px_hsla(5,78%,42%,0.35)] will-change-transform"
          />
        </div>
      </div>

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Seal */}
      <div className="absolute left-6 top-6 z-10 flex items-start gap-3 sm:left-10 sm:top-10">
        <div className="flex h-11 w-11 items-center justify-center border border-primary/70">
          <img src="/logo.png" alt="BoldCraft" className="h-6 w-6 object-contain" />
        </div>
        <div className="pt-0.5 font-body text-[9px] uppercase leading-tight tracking-[0.28em] text-foreground/45">
          <div>BoldCraft</div>
          <div>Kedhar</div>
        </div>
      </div>

      {/* Bottom-left type cluster */}
      <div className="absolute bottom-10 left-6 z-10 sm:bottom-14 sm:left-10">
        <p
          ref={statusRef}
          className="font-body text-[10px] uppercase tracking-[0.42em] text-foreground/55"
        >
          Entering
        </p>
        <p
          ref={readyRef}
          className="mt-2 font-heading text-[clamp(2.75rem,8vw,5.5rem)] font-medium leading-[0.9] tracking-[-0.03em] text-foreground opacity-0"
        >
          Ready
        </p>
        <p className="mt-3 font-heading text-2xl font-semibold tabular-nums tracking-tight text-foreground/80 sm:text-3xl">
          <span ref={counterRef}>000</span>
        </p>
      </div>

      {/* Bottom rail */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-[2px] bg-foreground/10">
        <div
          ref={barRef}
          className="h-full w-full origin-left bg-primary will-change-transform"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
};
