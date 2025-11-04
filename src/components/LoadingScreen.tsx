import { useEffect, useMemo, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  const logoSrc = useMemo(() => "/logo.png", []);

  useEffect(() => {
    const duration = 2500;
    const steps = 60;
    const increment = 100 / steps;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return next;
      });
    }, stepDuration);

    return () => clearInterval(timer);
  }, [onComplete]);

  const ringStyle = useMemo(
    () => ({
      background: `conic-gradient(from 180deg at 50% 50%, hsl(var(--primary)) ${progress}%, hsl(var(--primary) / 0.15) ${progress}% 100%)`,
    }),
    [progress]
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsla(var(--primary)/0.2),transparent_60%)] opacity-70" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(140deg,hsla(var(--primary)/0.08),transparent,hsla(var(--primary)/0.12))]" aria-hidden="true" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-10 text-center">
        <div className="relative flex h-40 w-40 items-center justify-center">
          <div className="absolute inset-0 animate-spin-slow rounded-full border border-white/5" aria-hidden="true" />
          <div className="absolute inset-0 rounded-full opacity-90" style={ringStyle} aria-hidden="true" />
          <div className="absolute inset-[14px] rounded-full bg-background/80 backdrop-blur" aria-hidden="true" />
          <img
            src={logoSrc}
            alt="BoldCraft mark"
            className="relative h-16 w-16 object-contain drop-shadow-[0_15px_35px_rgba(255,0,0,0.35)]"
            style={{
              transform: progress === 100 ? "scale(1)" : "scale(0.96)",
              transition: "transform var(--transition-slow) var(--ease-smooth)",
            }}
          />
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="font-heading text-sm uppercase tracking-[0.45em] text-foreground/60">
            Crafting your experience
          </p>

          <div className="flex items-end gap-3">
            <span className="font-heading text-5xl font-bold text-foreground">
              {Math.round(progress)}
              <span className="text-3xl">%</span>
            </span>
            <span className="font-body text-xs uppercase tracking-[0.4em] text-foreground/40">
              {progress < 100 ? "Initializing" : "Ready"}
            </span>
          </div>

          <div className="relative h-1 w-72 overflow-hidden rounded-full bg-foreground/10">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-primary/80 to-foreground/70 shadow-[0_0_20px_hsla(var(--primary)/0.4)] transition-all duration-200 ease-smooth"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
