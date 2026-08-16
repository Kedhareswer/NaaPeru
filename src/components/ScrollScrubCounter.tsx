import { useEffect, useRef, useState } from "react";

interface ScrollScrubCounterProps {
  /** Final number to count up to */
  target: number;
  /** Suffix appended to the number (e.g. "+", "%") */
  suffix?: string;
  className?: string;
}

/**
 * Number that counts from 0 → target as the element scrolls into the viewport.
 * Locks at target once fully visible. Plays in both directions when scrolling
 * back and forth, so it stays in sync with scroll position.
 */
export const ScrollScrubCounter = ({ target, suffix = "", className }: ScrollScrubCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setValue(target);
      return;
    }

    let rafId = 0;
    const compute = () => {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      // Scrub range: from "element top enters viewport bottom" (start)
      // to "element top reaches 40% of viewport" (end / locked at target)
      const start = viewportH;
      const end = viewportH * 0.4;
      const progress = (start - rect.top) / (start - end);
      const clamped = Math.max(0, Math.min(1, progress));
      setValue(Math.round(target * clamped));
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [target]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
};
