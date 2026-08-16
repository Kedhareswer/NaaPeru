import { useLayoutEffect, useRef, useState } from "react";
import {
  EASE_OPTIC,
  FRAMES,
  Hint,
  Readout,
  clamp,
  usePrefersReducedMotion,
  useScrollProgress,
  type Frame,
} from "./_shared";

/** Rebate gutter between two frames — film has no gaps, only a thin frame line. */
const GUTTER = 6;
/** Sprocket perforations punched per frame pitch, both edges. */
const PERFS = 4;
/** Vertical scroll distance spent advancing one frame through the gate. */
const SCROLL_PER_FRAME = 130;

/** A punched sprocket lane. The film base is true black; holes read as backlight through the punches. */
function Lane() {
  return (
    <div className="flex h-[13px] shrink-0 items-center justify-around px-1">
      {Array.from({ length: PERFS }, (_, i) => (
        <span key={i} className="h-[6px] w-[9px] bg-white/15" />
      ))}
    </div>
  );
}

/** Unexposed leader / tail — the roll starts and ends somewhere. */
function Blank({ label, width }: { label: string; width: number }) {
  return (
    <div className="flex shrink-0 flex-col bg-black" style={{ width }}>
      <Lane />
      <div
        className="flex items-center justify-center font-mono text-[9px] uppercase tracking-[0.2em] text-white/35"
        style={{ height: Math.round((width * 2) / 3) }}
      >
        {label}
      </div>
      <Lane />
      <div className="h-[12px]" />
    </div>
  );
}

type CellProps = {
  frame: Frame;
  index: number;
  width: number;
  /** In the gate — full tone. Out of the gate — dimmed and desaturated. */
  active: boolean;
  reduced: boolean;
  onActivate: (index: number) => void;
};

/** One exposed frame plus its edge furniture: perforations top and bottom, rebate marking below. */
function FilmCell({ frame, index, width, active, reduced, onActivate }: CellProps) {
  const code = String(index + 1).padStart(2, "0");

  return (
    <div className="flex shrink-0 flex-col bg-black" style={{ width }}>
      <Lane />
      <button
        type="button"
        onClick={(e) =>
          reduced
            ? // No mapping to undo — just centre the frame in the native list.
              e.currentTarget.scrollIntoView({ block: "nearest", inline: "center" })
            : onActivate(index)
        }
        onFocus={() => !reduced && onActivate(index)}
        aria-label={`Frame ${code}, ${frame.title}`}
        aria-current={active ? "true" : undefined}
        className="relative block w-full overflow-hidden focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-white/60"
        style={{ height: Math.round((width * 2) / 3) }}
      >
        <img
          src={frame.src}
          alt={`${frame.title} interface`}
          loading="lazy"
          className="h-full w-full object-cover"
          style={{
            opacity: active ? 1 : 0.4,
            filter: active ? "saturate(1)" : "saturate(0.15)",
            transition: reduced ? "none" : `opacity 240ms ${EASE_OPTIC}, filter 240ms ${EASE_OPTIC}`,
          }}
        />
        {/* Frame line — the emulsion edge catches the gate light when registered. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            boxShadow: active
              ? "inset 0 0 0 1px hsl(var(--primary) / 0.65)"
              : "inset 0 0 0 1px rgba(255, 255, 255, 0.12)",
            transition: reduced ? "none" : `box-shadow 240ms ${EASE_OPTIC}`,
          }}
        />
      </button>
      <Lane />
      {/* Rebate markings — etched on the base between the perforations and the edge. */}
      <div className="flex h-[12px] items-center justify-between px-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-white/45">
        <span>{code}A</span>
        <span>KDR·400</span>
      </div>
    </div>
  );
}

export default function FilmStrip() {
  const reduced = usePrefersReducedMotion();
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const shellRef = useRef<HTMLDivElement>(null);
  const gateRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  // The strip is sized from the container, not the viewport — the study has to
  // survive being dropped into any gallery cell, at any size.
  useLayoutEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const rect = entry.contentRect;
      setBox({ w: Math.round(rect.width), h: Math.round(rect.height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const frameW = Math.round(clamp(box.w * 0.4, 132, 208));
  const pitch = frameW + GUTTER;
  const last = FRAMES.length - 1;
  const scrollSpan = last * SCROLL_PER_FRAME;

  // Vertical progress becomes a continuous position along the horizontal strip.
  const position = progress * last;
  const active = Math.round(position);
  const inGate = FRAMES[active];

  /** Focus or click on a frame drives the vertical scroller — one source of truth. */
  const seek = (index: number) => {
    // Focus can nudge the clipped strip viewport; keep it pinned at origin.
    if (gateRef.current) {
      gateRef.current.scrollLeft = 0;
      gateRef.current.scrollTop = 0;
    }
    const el = ref.current;
    if (!el) return;
    const span = el.scrollHeight - el.clientHeight;
    if (span <= 0) return;
    el.scrollTo({ top: (index / last) * span, behavior: reduced ? "auto" : "smooth" });
  };

  // Reduced motion: no axis translation at all. The chronology becomes an
  // ordinary horizontally scrollable list with every caption already visible.
  if (reduced) {
    return (
      <div ref={shellRef} className="relative h-full w-full overflow-hidden">
        <div className="flex h-full w-full flex-col gap-3 px-6 py-6 md:px-10">
          <div className="flex items-center justify-between gap-3">
            <Readout>Roll 01 · {FRAMES.length} frames</Readout>
            <Hint>Scroll sideways</Hint>
          </div>
          <div className="flex-1 overflow-x-auto overflow-y-hidden overscroll-contain">
            <ul className="flex h-full items-start gap-4 pb-3">
              {FRAMES.map((frame, i) => (
                <li key={frame.src} className="shrink-0" style={{ width: 200 }}>
                  <FilmCell frame={frame} index={i} width={200} active reduced onActivate={seek} />
                  <p className="mt-2 font-body text-sm text-foreground">{frame.title}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/50">
                    {frame.exif.focal} · {frame.exif.aperture} · {frame.exif.shutter} · ISO {frame.exif.iso}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={shellRef} className="relative h-full w-full overflow-hidden">
      <div
        ref={ref}
        tabIndex={0}
        role="region"
        aria-label="Film strip — scroll vertically to advance the strip through the gate"
        className="h-full w-full overflow-y-auto overscroll-contain focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-primary"
      >
        {/* Spacer owns the scroll range; the gate stays pinned. */}
        <div className="relative w-full" style={{ height: `calc(100% + ${scrollSpan}px)` }}>
          <div
            className="sticky top-0 flex flex-col justify-center gap-4 px-6 md:px-10"
            style={{ height: box.h ? `${box.h}px` : "100%" }}
          >
            <div className="flex items-center justify-between gap-3">
              <Readout>
                {String(active + 1).padStart(2, "0")} / {FRAMES.length}
              </Readout>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40">
                Vertical scroll · horizontal transport
              </span>
            </div>

            {/* Gate viewport — the strip transports behind a fixed opening. */}
            <div ref={gateRef} className="relative w-full overflow-hidden">
              <div
                className="flex bg-foreground"
                style={{
                  // Single transform on the whole strip: perforations, frames and
                  // rebate markings all travel together, which is what sells it.
                  transform: `translate3d(${-(position * pitch + frameW / 2)}px, 0, 0)`,
                  marginLeft: "50%",
                  transition: `transform 90ms ${EASE_OPTIC}`,
                  gap: GUTTER,
                  width: "max-content",
                }}
              >
                {/* Blank leader so the first frame doesn't arrive out of nowhere. */}
                <Blank label="Leader" width={frameW} />

                {FRAMES.map((frame, i) => (
                  <FilmCell
                    key={frame.src}
                    frame={frame}
                    index={i}
                    width={frameW}
                    active={i === active}
                    reduced={false}
                    onActivate={seek}
                  />
                ))}

                {/* Tail — the roll runs out rather than stopping mid-frame. */}
                <Blank label="End of roll" width={frameW} />
              </div>

              {/* The gate itself — fixed, never moves. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 border-x border-primary/50"
                style={{ width: frameW + GUTTER }}
              >
                <span className="absolute -top-px left-0 h-px w-3 bg-primary" />
                <span className="absolute -top-px right-0 h-px w-3 bg-primary" />
                <span className="absolute -bottom-px left-0 h-px w-3 bg-primary" />
                <span className="absolute -bottom-px right-0 h-px w-3 bg-primary" />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 font-body text-sm text-foreground">{inGate.title}</span>
              <Readout>{inGate.exif.focal}</Readout>
              <Readout>{inGate.exif.aperture}</Readout>
              <Readout>{inGate.exif.shutter}</Readout>
              <Readout>ISO {inGate.exif.iso}</Readout>
            </div>
          </div>
        </div>
      </div>

      {progress < 0.02 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
          <Hint>Scroll to transport</Hint>
        </div>
      )}
    </div>
  );
}
