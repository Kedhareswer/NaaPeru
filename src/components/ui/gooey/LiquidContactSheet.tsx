import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Liquid } from "./liquid";

export interface ContactFrame {
  id: string;
  title: string;
  meta: string;
  image: string;
}

const DEFAULT_FRAMES: ContactFrame[] = [
  { id: "sketch", title: "Image to Sketch", meta: "CV · 2023", image: "/projects/image-to-sketch.webp" },
  { id: "thesisflow", title: "ThesisFlow", meta: "RESEARCH · 2025", image: "/projects/thesisflow/planner.png" },
  { id: "notebook", title: "ML Notebook", meta: "DATA · 2024", image: "/projects/ml-notebook.webp" },
  { id: "chefspeak", title: "ChefSpeak", meta: "VOICE · 2024", image: "/projects/chefspeak.webp" },
];

export interface LiquidContactSheetProps {
  frames?: ContactFrame[];
  className?: string;
  blur?: number;
  contrast?: number;
}

/**
 * Contact sheet on a light table: white-bordered prints in a row, a red
 * liquid mat behind the selected one. Pick another frame and the mat chases
 * it as rubber, stretching and trailing a droplet (liquid-gooey "move").
 */
export const LiquidContactSheet: React.FC<LiquidContactSheetProps> = ({
  frames = DEFAULT_FRAMES,
  className,
  blur = 6,
  contrast = 18,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mat, setMat] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const frameRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const updateMat = () => {
    const el = frameRefs.current[activeIndex];
    if (el) {
      // Mat runs 6px proud of the print, like a light-table selection
      setMat({ x: el.offsetLeft - 6, y: el.offsetTop - 6, w: el.offsetWidth + 12, h: el.offsetHeight + 12 });
    }
  };

  useLayoutEffect(updateMat, [activeIndex, frames]);

  useEffect(() => {
    window.addEventListener("resize", updateMat);
    return () => window.removeEventListener("resize", updateMat);
  }, [activeIndex]);

  const active = frames[activeIndex];

  return (
    <div className={cn("flex select-none flex-col items-center gap-6", className)}>
      <Liquid
        blur={blur}
        contrast={contrast}
        variant="primary"
        className="relative flex items-start gap-3 p-3 sm:gap-4"
      >
        {/* Red liquid mat — chases the selected frame */}
        <Liquid.Item effect="move">
          <div
            className="pointer-events-none absolute"
            style={{
              transform: `translate(${mat.x}px, ${mat.y}px)`,
              width: mat.w,
              height: mat.h,
              transition: "transform 240ms cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          />
        </Liquid.Item>

        {/* Crisp prints ride above the goo */}
        <div className="relative z-10 flex items-start gap-3 sm:gap-4" role="tablist" aria-label="Contact sheet">
          {frames.map((frame, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div key={frame.id} className="flex flex-col items-center gap-1.5">
                <button
                  ref={(el) => {
                    frameRefs.current[idx] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={frame.title}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "cursor-pointer bg-white p-[3px] transition-[transform,opacity] duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
                    isActive ? "opacity-100" : "opacity-60 hover:-translate-y-0.5 hover:opacity-90"
                  )}
                >
                  <img
                    src={frame.image}
                    alt=""
                    className="h-12 w-[72px] object-cover sm:h-16 sm:w-24"
                  />
                </button>
                <span
                  className={cn(
                    "font-mono text-[9px] tracking-[0.2em] transition-colors duration-150",
                    isActive ? "text-primary" : "text-foreground/30"
                  )}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
            );
          })}
        </div>
      </Liquid>

      {/* EXIF caption for the selected frame */}
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[10px] tabular-nums text-foreground/35">
          {String(activeIndex + 1).padStart(2, "0")}/{String(frames.length).padStart(2, "0")}
        </span>
        <span className="font-heading text-sm text-foreground">{active.title}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40">
          {active.meta}
        </span>
      </div>
    </div>
  );
};
