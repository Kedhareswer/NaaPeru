import { useCallback, useEffect, useRef, useState } from "react";
import { EASE_OPTIC, FRAMES, Hint, Readout, clamp, usePrefersReducedMotion } from "./_shared";

const LAST = FRAMES.length - 1;
/** Horizontal drag, in px, that racks the pile forward by one print. */
const PX_PER_CARD = 130;
/** Prints beyond this depth are transparent — caps the blurred layer count at 7. */
const WINDOW = 3;
/** How long a flick is allowed to coast, in ms of pointer velocity. */
const FLICK_MS = 110;
const MAX_BLUR = 7;

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Rubber band past either end of the pile. Dragging off the stack resists
 * instead of running away, so a flick at the edge can't strand the focal plane.
 */
const band = (v: number) => (v < 0 ? v * 0.28 : v > LAST ? LAST + (v - LAST) * 0.28 : v);

/**
 * Depth for one print, given its signed distance from the focal plane.
 * Behind the plane (d > 0) the pile recedes up and shrinks; in front (d < 0) it
 * swings down and grows, the way a print held nearer the lens would. Blur is
 * quantised to half-pixels so the expensive filter rebuilds a handful of times
 * per rack rather than on every pointer frame.
 */
function depth(d: number, reduced: boolean) {
  const k = Math.abs(d);
  const behind = d > 0;
  const y = behind ? -k * 24 : k * 56;
  const x = d * 9; // a hair of lateral drift so the drag direction reads
  const scale = behind ? 1 - k * 0.075 : 1 + Math.min(k, 2) * 0.05;
  const fade = clamp(1 - k / (WINDOW + 0.6), 0, 1);
  const blur = Math.round(Math.min((behind ? 1.7 : 2.4) * k, MAX_BLUR) * 2) / 2;

  return {
    transform: `translate3d(calc(-50% + ${x.toFixed(1)}px), calc(-50% + ${y.toFixed(1)}px), 0) scale(${scale.toFixed(3)})`,
    // Reduced motion trades the blur gradient for a dimming gradient: the focal
    // print stays at full ink, everything else steps back out of the way.
    opacity: reduced ? fade * (k < 0.5 ? 1 : 0.4) : fade,
    filter: reduced ? "none" : `blur(${blur}px) saturate(${clamp(1 - k * 0.3, 0.1, 1).toFixed(2)})`,
    zIndex: 60 + Math.round(behind ? -k * 10 : k * 10),
    inWindow: k <= WINDOW + 0.6,
    sharpness: clamp(1 - k * 1.6, 0, 1),
  };
}

export default function RackFocus() {
  const reduced = usePrefersReducedMotion();

  /** Focal plane as a float — fractional while dragging, integral once settled. */
  const [focus, setFocus] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [engaged, setEngaged] = useState(false);

  const drag = useRef({ startX: 0, startFocus: 0, lastX: 0, lastT: 0, velocity: 0, moved: false });
  const pendingX = useRef(0);
  const frame = useRef(0);

  const cancelFrame = useCallback(() => {
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = 0;
  }, []);

  useEffect(() => cancelFrame, [cancelFrame]);

  const rackTo = useCallback((to: number) => {
    setEngaged(true);
    setFocus(clamp(Math.round(to), 0, LAST));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.focus();
    drag.current = { startX: e.clientX, startFocus: focus, lastX: e.clientX, lastT: e.timeStamp, velocity: 0, moved: false };
    setDragging(true);
    setEngaged(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const d = drag.current;
    const dt = e.timeStamp - d.lastT;
    if (dt > 0) d.velocity = (e.clientX - d.lastX) / dt; // px per ms, signed
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
    if (Math.abs(e.clientX - d.startX) > 6) d.moved = true;

    // Coalesce to one rack per frame — pointermove can fire far faster than paint.
    pendingX.current = e.clientX;
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      setFocus(band(d.startFocus + (d.startX - pendingX.current) / PX_PER_CARD));
    });
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    cancelFrame();
    setDragging(false);

    const d = drag.current;
    const raw = d.startFocus + (d.startX - d.lastX) / PX_PER_CARD;
    // A flick coasts a little past where it was released; reduced motion gets none.
    const coast = reduced ? 0 : clamp((-d.velocity * FLICK_MS) / PX_PER_CARD, -2.5, 2.5);
    setFocus(clamp(Math.round(raw + coast), 0, LAST));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const next =
      e.key === "ArrowRight" ? focus + 1
      : e.key === "ArrowLeft" ? focus - 1
      : e.key === "Home" ? 0
      : e.key === "End" ? LAST
      : null;
    if (next === null) return;
    e.preventDefault();
    rackTo(next);
  };

  const index = clamp(Math.round(focus), 0, LAST);
  const current = FRAMES[index];
  // Transitions only exist between a release and the settle — never during drag
  // (the pointer is the clock) and never under reduced motion.
  const settling = !dragging && !reduced;
  const cardTransition = settling
    ? `transform 560ms ${EASE_OPTIC}, opacity 460ms ${EASE_OPTIC}, filter 380ms ${EASE_OPTIC}`
    : "none";

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-background font-body">
      <header className="flex shrink-0 items-baseline justify-between gap-4 px-4 pb-2 pt-4 md:px-6">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/70">Rack focus</h3>
        <Hint>{engaged ? "Drag · ← →" : "Drag to pull focus"}</Hint>
      </header>

      <div
        role="group"
        tabIndex={0}
        aria-label="Print stack — drag or use arrow keys to rack focus"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        className="relative min-h-0 flex-1 touch-pan-y select-none outline-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-foreground"
        style={{ cursor: dragging ? "grabbing" : "grab" }}
      >
        {FRAMES.map((f, i) => {
          const d = depth(i - focus, reduced);
          return (
            <button
              key={f.src}
              type="button"
              tabIndex={-1}
              aria-hidden={i !== index}
              aria-label={`Rack to ${f.title}`}
              // A drag that ends over a print must not also read as a click on it.
              onClick={() => !drag.current.moved && rackTo(i)}
              className="absolute left-1/2 top-1/2 w-[58%] min-w-[10rem] max-w-[23rem] border border-border bg-card p-[6px] text-left outline-none"
              style={{
                transform: d.transform,
                opacity: d.opacity,
                filter: d.filter,
                zIndex: d.zIndex,
                transition: cardTransition,
                pointerEvents: d.inWindow ? "auto" : "none",
                willChange: d.inWindow ? "transform, opacity" : undefined,
                boxShadow: d.sharpness > 0 ? `0 ${18 * d.sharpness}px ${44 * d.sharpness}px -18px hsl(var(--foreground) / ${0.45 * d.sharpness})` : undefined,
              }}
            >
              <div className="aspect-[3/2] w-full overflow-hidden bg-foreground/[0.06]">
                <img src={f.src} alt="" loading="lazy" className="h-full w-full object-cover" draggable={false} />
              </div>
              {/* Print margin, struck like a caption on the back of the photograph */}
              <span className="mt-[6px] flex items-baseline justify-between gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-foreground/70">
                <span className="truncate">{f.title}</span>
                <span className="shrink-0 tabular-nums text-foreground/45">{pad(i + 1)}</span>
              </span>
            </button>
          );
        })}

        {/* Depth scale — the pile's full extent stays on screen, always. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center" aria-hidden>
          <div className="flex h-4 items-end gap-[3px]">
            {FRAMES.map((f, i) => {
              const near = Math.max(0, 1 - Math.abs(i - focus));
              return (
                <span
                  key={f.src}
                  className="h-4 w-px origin-bottom bg-foreground"
                  style={{
                    transform: `scaleY(${(0.28 + near * 0.72).toFixed(3)})`,
                    opacity: 0.2 + near * 0.7,
                    transition: settling ? `transform 460ms ${EASE_OPTIC}, opacity 460ms ${EASE_OPTIC}` : "none",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      <footer className="flex shrink-0 flex-wrap items-center justify-between gap-2 px-4 pb-4 pt-1 md:px-6 md:pb-5">
        <span className="flex flex-wrap gap-1">
          <Readout>
            {pad(index + 1)} / {pad(FRAMES.length)}
          </Readout>
          <Readout>{current.exif.aperture}</Readout>
          <Readout>{current.exif.focal}</Readout>
        </span>
        <span className="truncate font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/55">
          {current.title}
        </span>
      </footer>

      <span className="sr-only" aria-live="polite">
        {`Frame ${index + 1} of ${FRAMES.length}, ${current.title}, in focus`}
      </span>
    </div>
  );
}
