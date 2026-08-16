import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Liquid } from "./liquid";
import mePortrait from "@/assets/me.webp";

const STOPS = ["f/1.4", "f/2", "f/2.8", "f/4", "f/5.6", "f/8"];

export interface LiquidApertureDialProps {
  photoSrc?: string;
  photoAlt?: string;
  className?: string;
  blur?: number;
  contrast?: number;
}

/**
 * An aperture dial with click-stops: the red droplet thumb snaps between
 * detents, trailing a liquid tail on every jump (liquid-gooey "move").
 * The stop drives the photograph's depth of field — open up and the
 * background falls away.
 */
export const LiquidApertureDial: React.FC<LiquidApertureDialProps> = ({
  photoSrc = mePortrait,
  photoAlt = "Portrait",
  className,
  blur = 5,
  contrast = 18,
}) => {
  const [stopIndex, setStopIndex] = useState(2);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const percentage = (stopIndex / (STOPS.length - 1)) * 100;
  // Wide open = shallow depth of field = most blur
  const dofBlur = (1 - stopIndex / (STOPS.length - 1)) * 7;

  const snapFromPointer = (clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const pos = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    setStopIndex(Math.round(pos * (STOPS.length - 1)));
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* pointer capture unsupported */
    }
    snapFromPointer(e.clientX);
  };

  return (
    <div className={cn("flex w-full select-none flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10", className)}>
      {/* The photograph — depth of field follows the dial */}
      <div className="relative h-44 w-36 shrink-0 overflow-hidden border border-border">
        {/* Background layer takes the blur */}
        <img
          src={photoSrc}
          alt=""
          aria-hidden
          className="h-full w-full scale-110 object-cover"
          style={{
            filter: `blur(${dofBlur}px)`,
            transition: "filter 300ms cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        />
        {/* Subject stays sharp — masked to the face */}
        <img
          src={photoSrc}
          alt={photoAlt}
          className="absolute inset-0 h-full w-full scale-110 object-cover"
          style={{
            WebkitMaskImage: "radial-gradient(ellipse 42% 38% at 52% 38%, black 45%, transparent 100%)",
            maskImage: "radial-gradient(ellipse 42% 38% at 52% 38%, black 45%, transparent 100%)",
          }}
        />
        <span className="absolute bottom-1.5 left-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/70 mix-blend-difference">
          {STOPS[stopIndex]}
        </span>
      </div>

      {/* The dial */}
      <div className="w-full max-w-xs">
        <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40">
          <span>Aperture</span>
          <span className="text-foreground">{STOPS[stopIndex]}</span>
        </div>

        <div
          ref={trackRef}
          role="slider"
          aria-label="Aperture"
          aria-valuemin={0}
          aria-valuemax={STOPS.length - 1}
          aria-valuenow={stopIndex}
          aria-valuetext={STOPS[stopIndex]}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") setStopIndex((i) => Math.min(STOPS.length - 1, i + 1));
            if (e.key === "ArrowLeft") setStopIndex((i) => Math.max(0, i - 1));
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={(e) => isDraggingRef.current && snapFromPointer(e.clientX)}
          onPointerUp={() => {
            isDraggingRef.current = false;
          }}
          onPointerCancel={() => {
            isDraggingRef.current = false;
          }}
          className="relative flex h-10 cursor-pointer touch-none items-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
        >
          {/* Track and detent ticks — plain DOM behind the goo */}
          <div className="absolute inset-x-0 h-px bg-foreground/20" />
          {STOPS.map((_, i) => (
            <span
              key={i}
              className="absolute h-1.5 w-px -translate-x-1/2 bg-foreground/30"
              style={{ left: `calc(${(i / (STOPS.length - 1)) * 100}% - ${(i / (STOPS.length - 1)) * 20 - 10}px)` }}
            />
          ))}

          <Liquid
            blur={blur}
            contrast={contrast}
            variant="primary"
            className="relative h-8 w-full"
          >
            {/* Droplet thumb — snaps detent to detent, trailing a tail */}
            <Liquid.Item effect="move">
              <div
                className="pointer-events-none absolute top-1/2 h-5 w-5 rounded-full"
                style={{
                  left: `calc(${percentage}% - ${(percentage / 100) * 20}px)`,
                  transform: "translateY(-50%)",
                }}
              >
                <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
              </div>
            </Liquid.Item>
          </Liquid>
        </div>

        <div className="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-wider text-foreground/30">
          <span>{STOPS[0]}</span>
          <span>{STOPS[STOPS.length - 1]}</span>
        </div>
      </div>
    </div>
  );
};
