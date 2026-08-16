import { useEffect, useRef, useState } from "react";

/**
 * Every study must degrade to a static, legible state when the user asks for
 * less motion. The old generated kit honoured this in 22 of 100 demos; here it
 * is part of the contract, not an afterthought.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}

/**
 * Scroll progress (0..1) of an internal scroll container. Studies own their own
 * scroller so a scroll-linked piece works inside the gallery frame instead of
 * depending on the page scrollbar.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const read = () => {
      frame = 0;
      const span = el.scrollHeight - el.clientHeight;
      setProgress(span <= 0 ? 0 : clamp(el.scrollTop / span, 0, 1));
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };

    read();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, progress };
}

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Optical easing — fast out of the gate, long settle. Reads as glass, not CSS. */
export const EASE_OPTIC = "cubic-bezier(0.16, 1, 0.3, 1)";

/** Shutter timing — abrupt open, held close. */
export const EASE_SHUTTER = "cubic-bezier(0.7, 0, 0.2, 1)";

export type Frame = {
  src: string;
  title: string;
  /** Plausible capture metadata — the camera vocabulary is the through-line. */
  exif: { focal: string; aperture: string; shutter: string; iso: string };
};

export const FRAMES: Frame[] = [
  { src: "/projects/quantumpdf.webp", title: "QuantumPDF", exif: { focal: "35mm", aperture: "f/1.8", shutter: "1/125", iso: "200" } },
  { src: "/projects/data-notebook.webp", title: "Data Notebook", exif: { focal: "50mm", aperture: "f/2.0", shutter: "1/250", iso: "160" } },
  { src: "/projects/chefspeak.webp", title: "ChefSpeak", exif: { focal: "24mm", aperture: "f/2.8", shutter: "1/60", iso: "400" } },
  { src: "/projects/llm-chess.webp", title: "LLM Chess", exif: { focal: "85mm", aperture: "f/1.4", shutter: "1/500", iso: "100" } },
  { src: "/projects/research-bolt.webp", title: "Research Bolt", exif: { focal: "35mm", aperture: "f/4.0", shutter: "1/90", iso: "320" } },
  { src: "/projects/email-insight.webp", title: "Email Insight", exif: { focal: "28mm", aperture: "f/2.2", shutter: "1/160", iso: "250" } },
  { src: "/projects/prompt-forger.webp", title: "Prompt Forger", exif: { focal: "50mm", aperture: "f/1.8", shutter: "1/200", iso: "125" } },
  { src: "/projects/image-to-sketch.webp", title: "Image to Sketch", exif: { focal: "105mm", aperture: "f/2.8", shutter: "1/320", iso: "200" } },
  { src: "/projects/endoscopy-image-enhancement.webp", title: "Endoscopy Enhance", exif: { focal: "60mm", aperture: "f/5.6", shutter: "1/45", iso: "800" } },
  { src: "/projects/internal-policy-chatbot.webp", title: "Policy Chatbot", exif: { focal: "35mm", aperture: "f/2.0", shutter: "1/110", iso: "320" } },
  { src: "/projects/dream-home-design.webp", title: "Dream Home", exif: { focal: "18mm", aperture: "f/8.0", shutter: "1/30", iso: "640" } },
  { src: "/projects/portfolio-nexus.webp", title: "Portfolio Nexus", exif: { focal: "40mm", aperture: "f/2.5", shutter: "1/180", iso: "160" } },
];

/** Shared readout chip — the small monospace camera labels studies hang data on. */
export function Readout({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 border border-border bg-card/80 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] tabular-nums text-foreground/70 ${className}`}
    >
      {children}
    </span>
  );
}

/** Prompt shown when a study needs an input the user hasn't given yet. */
export function Hint({ children }: { children: React.ReactNode }) {
  return (
    <p className="pointer-events-none select-none font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/35">
      {children}
    </p>
  );
}
