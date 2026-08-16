import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderShutterProps {
  onComplete: () => void;
  autoExit?: boolean;
}

const NUM_BARS = 7;

/** Abstract crimson strip textures — no external photo deps. */
const STRIP_STYLES = [
  "linear-gradient(90deg, hsla(5,78%,28%,0.95), hsla(5,55%,18%,0.9)), repeating-linear-gradient(90deg, transparent, transparent 8px, hsla(0,0%,0%,0.25) 8px, hsla(0,0%,0%,0.25) 9px)",
  "linear-gradient(135deg, hsla(5,70%,35%,0.9), hsla(5,40%,12%,0.95)), radial-gradient(circle at 30% 50%, hsla(5,80%,50%,0.35), transparent 55%)",
  "linear-gradient(180deg, hsla(5,60%,22%,0.95), hsla(5,50%,14%,0.9)), repeating-linear-gradient(0deg, transparent, transparent 3px, hsla(0,0%,100%,0.04) 3px, hsla(0,0%,100%,0.04) 4px)",
  "linear-gradient(90deg, hsla(5,75%,40%,0.85), hsla(5,45%,16%,0.95))",
  "linear-gradient(120deg, hsla(5,55%,20%,0.95) 40%, hsla(5,70%,32%,0.8)), repeating-linear-gradient(90deg, transparent, transparent 14px, hsla(0,0%,0%,0.3) 14px, hsla(0,0%,0%,0.3) 16px)",
  "linear-gradient(90deg, hsla(5,65%,18%,0.95), hsla(5,80%,38%,0.75), hsla(5,50%,14%,0.95))",
  "linear-gradient(180deg, hsla(5,70%,30%,0.9), hsla(5,40%,10%,0.95)), radial-gradient(ellipse at 70% 40%, hsla(5,90%,45%,0.25), transparent 50%)",
];

const STRIP_LAYOUT = [
  { width: "42%", ml: "0%", mt: "0" },
  { width: "58%", ml: "18%", mt: "0" },
  { width: "36%", ml: "8%", mt: "0" },
  { width: "72%", ml: "22%", mt: "0" },
  { width: "48%", ml: "4%", mt: "0" },
  { width: "64%", ml: "28%", mt: "0" },
  { width: "40%", ml: "12%", mt: "0" },
];

/**
 * Direction D — Film shutter dossier.
 * Staggered crimson strips + giant counter; exits via 7-bar slam.
 */
export const PreloaderShutter = ({
  onComplete,
  autoExit = true,
}: PreloaderShutterProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const stripsRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const enteringRef = useRef<HTMLParagraphElement>(null);
  const readyRef = useRef<HTMLSpanElement>(null);
  const shutterRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const root = rootRef.current;
    const strips = stripsRef.current;
    const counter = counterRef.current;
    const entering = enteringRef.current;
    const ready = readyRef.current;
    const shutter = shutterRef.current;
    const bars = barsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!root || !strips || !counter || !entering || !ready || !shutter || bars.length < NUM_BARS)
      return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      counter.textContent = "100";
      ready.textContent = "READY";
      const t = window.setTimeout(() => onCompleteRef.current(), 300);
      return () => window.clearTimeout(t);
    }

    const progress = { value: 0 };
    const ctx = gsap.context(() => {
      gsap.set(strips.children, { opacity: 0, x: (i) => (i % 2 === 0 ? -40 : 40) });
      gsap.set(entering, { opacity: 0 });
      gsap.set(ready, { opacity: 0.35 });
      gsap.set(shutter, { autoAlpha: 0 });
      bars.forEach((bar, i) => {
        gsap.set(bar, {
          scaleX: 0,
          transformOrigin: i % 2 === 0 ? "left center" : "right center",
        });
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(
        strips.children,
        {
          opacity: 1,
          x: 0,
          duration: 0.75,
          stagger: 0.07,
          ease: "power3.out",
        },
        0.05,
      );
      tl.to(entering, { opacity: 1, duration: 0.5 }, 0.35);

      tl.to(
        progress,
        {
          value: 100,
          duration: 2.5,
          ease: "power2.inOut",
          onUpdate: () => {
            const n = Math.round(progress.value);
            counter.textContent = String(n);
            if (n >= 98) ready.textContent = "READY";
          },
        },
        0.25,
      );

      tl.to(ready, { opacity: 1, duration: 0.3 }, ">-0.2");

      if (autoExit) {
        // Slam shutter over the composition
        tl.set(shutter, { autoAlpha: 1 }, "+=0.15");
        tl.to(
          bars,
          {
            scaleX: 1,
            duration: 0.55,
            stagger: 0.07,
            ease: "power3.inOut",
          },
          "<",
        );
        tl.to(
          [strips, entering, counter.parentElement, ready],
          { opacity: 0, duration: 0.2 },
          "<0.15",
        );
        // Open shutter away
        tl.to(
          bars,
          {
            scaleX: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: "power3.inOut",
            onStart: () => {
              bars.forEach((bar, i) => {
                gsap.set(bar, {
                  transformOrigin: i % 2 === 0 ? "right center" : "left center",
                });
              });
            },
          },
          "+=0.25",
        );
        tl.call(() => onCompleteRef.current());
      } else {
        tl.call(() => onCompleteRef.current(), [], "+=0.25");
      }
    }, root);

    return () => ctx.revert();
  }, [autoExit]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-50 overflow-hidden bg-black text-foreground"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading — film shutter dossier"
    >
      {/* Top chrome */}
      <div className="absolute left-0 right-0 top-8 z-20 px-6 sm:px-10">
        <div className="mb-3 h-px w-full bg-primary/80" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="" className="h-5 w-5 object-contain" aria-hidden="true" />
            <span className="font-body text-[10px] uppercase tracking-[0.35em] text-primary">
              Kedhar / 01
            </span>
          </div>
          <span
            ref={readyRef}
            className="font-body text-[10px] uppercase tracking-[0.35em] text-primary"
          >
            Initializing
          </span>
        </div>
      </div>

      {/* Strip dossier */}
      <div
        ref={stripsRef}
        className="absolute inset-x-0 top-[22%] z-10 flex flex-col gap-2 px-0 sm:top-[20%] sm:gap-2.5"
      >
        {STRIP_LAYOUT.map((layout, i) => (
          <div
            key={i}
            className="h-[clamp(2.25rem,5.2vh,3.75rem)] will-change-transform"
            style={{
              width: layout.width,
              marginLeft: layout.ml,
              backgroundImage: STRIP_STYLES[i],
              backgroundSize: "cover",
            }}
          />
        ))}
      </div>

      <p
        ref={enteringRef}
        className="absolute left-1/2 top-[48%] z-10 -translate-x-1/2 font-body text-[11px] uppercase tracking-[0.55em] text-primary"
      >
        Entering
      </p>

      <div className="absolute bottom-12 left-6 z-10 sm:bottom-16 sm:left-10">
        <span
          ref={counterRef}
          className="font-heading text-[clamp(4.5rem,16vw,11rem)] font-bold leading-none tracking-[-0.05em] text-foreground tabular-nums"
        >
          0
        </span>
      </div>

      {/* Exit shutter overlay */}
      <div
        ref={shutterRef}
        className="pointer-events-none absolute inset-0 z-30 flex flex-col opacity-0"
        aria-hidden="true"
      >
        {Array.from({ length: NUM_BARS }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              barsRef.current[i] = el;
            }}
            className="flex-1 origin-left bg-background will-change-transform"
            style={{ transform: "scaleX(0)" }}
          />
        ))}
      </div>

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 z-40 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />
    </div>
  );
};
