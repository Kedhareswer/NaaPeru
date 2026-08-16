import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { EASE_OPTIC, FRAMES, Hint, Readout, usePrefersReducedMotion } from "./_shared";

const FRAME = FRAMES[0];

type Hotspot = {
  id: string;
  /** Percentages of the image box, so the anchors survive any resize. */
  x: number;
  y: number;
  /** Which exif field this region explains — used to light up the readout strip. */
  field: keyof typeof FRAME.exif | null;
  tag: string;
  title: string;
  note: string;
};

const HOTSPOTS: Hotspot[] = [
  {
    id: "aperture",
    x: 27,
    y: 33,
    field: "aperture",
    tag: FRAME.exif.aperture,
    title: "The shallow plane",
    note: "Wide open, only the query column stays sharp. Everything behind it falls off, so the eye has exactly one place to land.",
  },
  {
    id: "shutter",
    x: 68,
    y: 21,
    field: "shutter",
    tag: FRAME.exif.shutter,
    title: "Frozen mid-answer",
    note: "Fast enough to catch the response while it is still streaming, slow enough to keep the panel bright without lifting the ISO.",
  },
  {
    id: "iso",
    x: 17,
    y: 72,
    field: "iso",
    tag: `ISO ${FRAME.exif.iso}`,
    title: "Clean shadow detail",
    note: "The sidebar greys hold together — no grain crawling through the flat tones where the interface goes quiet.",
  },
  {
    id: "focal",
    x: 51,
    y: 57,
    field: "focal",
    tag: FRAME.exif.focal,
    title: "Near-human field",
    note: "A 35mm view puts you at desk distance: wide enough to see the whole layout, tight enough that nothing bends at the edges.",
  },
  {
    id: "frame",
    x: 83,
    y: 69,
    field: null,
    tag: "3:2",
    title: "Weight on the lower third",
    note: "The answer block sits below centre, which is why the composition reads settled instead of pinned to the middle.",
  },
];

type Box = { x: number; y: number; w: number; h: number };
type Geometry = { w: number; h: number; img: Box; card: Box };

/**
 * Elbowed connector from a hotspot to the callout's anchor edge. The shape flips
 * with the layout: side-by-side on wide containers, stacked on narrow ones — the
 * geometry is read from the DOM rather than assumed, so both cases stay honest.
 */
function buildConnector(hx: number, hy: number, geo: Geometry) {
  const sideBySide = geo.card.x >= geo.img.x + geo.img.w - 4;
  const r = (n: number) => n.toFixed(1);

  if (sideBySide) {
    const ax = geo.card.x;
    const ay = geo.card.y + 22; // aligns with the index number inside the card
    const sx = hx + 11; // start clear of the marker so the dot stays crisp
    const knee = Math.max(sx + 10, ax - 28);
    return { d: `M ${r(sx)} ${r(hy)} L ${r(knee)} ${r(hy)} L ${r(ax - 10)} ${r(ay)} L ${r(ax)} ${r(ay)}`, ax, ay };
  }

  const ax = geo.card.x + 26;
  const ay = geo.card.y;
  const sy = hy + 11;
  const knee = Math.max(sy + 10, ay - 24);
  return { d: `M ${r(hx)} ${r(sy)} L ${r(hx)} ${r(knee)} L ${r(ax)} ${r(ay - 9)} L ${r(ax)} ${r(ay)}`, ax, ay };
}

export default function ExifInspector() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const imgBoxRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [activeId, setActiveId] = useState<string | null>(null);
  /** Which connector has finished its draw — keyed by id so a switch restarts it. */
  const [drawnId, setDrawnId] = useState<string | null>(null);
  const [geo, setGeo] = useState<Geometry | null>(null);

  const active = HOTSPOTS.find((h) => h.id === activeId) ?? null;

  const measure = useCallback(() => {
    const root = rootRef.current;
    const imgBox = imgBoxRef.current;
    const card = cardRef.current;
    if (!root || !imgBox || !card) return;

    const base = root.getBoundingClientRect();
    const rel = (el: HTMLElement): Box => {
      const b = el.getBoundingClientRect();
      return { x: b.left - base.left, y: b.top - base.top, w: b.width, h: b.height };
    };
    setGeo({ w: base.width, h: base.height, img: rel(imgBox), card: rel(card) });
  }, []);

  // Geometry is re-read on any container or card resize; the card grows and shrinks
  // with its text, so its own box is observed too.
  useLayoutEffect(() => {
    const root = rootRef.current;
    const imgBox = imgBoxRef.current;
    const card = cardRef.current;
    if (!root || !imgBox || !card) return;

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    ro.observe(imgBox);
    ro.observe(card);
    return () => ro.disconnect();
  }, [measure]);

  // Draw the line one frame after it mounts. Reduced motion skips straight to full
  // length — the connector still exists, it just doesn't travel.
  useEffect(() => {
    if (!activeId) return;
    if (reduced) {
      setDrawnId(activeId);
      return;
    }
    const frame = requestAnimationFrame(() => setDrawnId(activeId));
    return () => cancelAnimationFrame(frame);
  }, [activeId, reduced]);

  // Escape releases the inspection without needing to find the pointer again.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setActiveId(null);
      const focused = document.activeElement;
      if (focused instanceof HTMLElement && rootRef.current?.contains(focused)) focused.blur();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /** Pointer leaving the image must not steal a callout the keyboard is holding. */
  const releaseOnPointerLeave = () => {
    const focused = document.activeElement;
    if (focused instanceof HTMLElement && imgBoxRef.current?.contains(focused)) return;
    setActiveId(null);
  };

  const connector = active && geo && geo.w > 0
    ? buildConnector(geo.img.x + (geo.img.w * active.x) / 100, geo.img.y + (geo.img.h * active.y) / 100, geo)
    : null;
  const drawn = !!active && (reduced || drawnId === active.id);

  return (
    <div ref={rootRef} className="relative h-full w-full overflow-hidden bg-background font-body">
      <div className="flex h-full w-full flex-col gap-4 p-5 md:flex-row md:gap-6 md:p-7">
        {/* Stage */}
        <div className="flex min-h-0 flex-1 flex-col gap-3">
          <div
            ref={imgBoxRef}
            onPointerLeave={releaseOnPointerLeave}
            className="relative min-h-[9rem] w-full flex-1 overflow-hidden border border-border bg-foreground/[0.06]"
          >
            <img
              src={FRAME.src}
              alt={`${FRAME.title} interface, annotated`}
              loading="lazy"
              onLoad={measure}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {HOTSPOTS.map((h, i) => {
              const on = h.id === active?.id;
              const flip = h.x > 60; // keep the tag inside the frame near the right edge
              return (
                <div key={h.id} className="absolute" style={{ left: `${h.x}%`, top: `${h.y}%` }}>
                  {/* Region bracket — sharp, appears only for the inspected area */}
                  {on && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 border border-foreground/40"
                    />
                  )}
                  {on && (
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute top-1/2 -translate-y-[1.85rem] whitespace-nowrap bg-background/85 px-1 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/70 ${
                        flip ? "right-0 translate-x-6" : "left-0 -translate-x-6"
                      }`}
                    >
                      {h.tag}
                    </span>
                  )}
                  <button
                    type="button"
                    aria-label={`Region ${i + 1}, ${h.tag}. ${h.title}. ${h.note}`}
                    onMouseEnter={() => setActiveId(h.id)}
                    onFocus={() => setActiveId(h.id)}
                    onBlur={() => setActiveId((cur) => (cur === h.id ? null : cur))}
                    onClick={() => setActiveId(h.id)}
                    className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    style={{
                      backgroundColor: on ? "hsl(var(--foreground))" : "hsl(var(--background))",
                      transition: reduced ? "none" : `background-color 220ms ${EASE_OPTIC}`,
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Readout strip — the field the active region explains is brought forward. */}
          <div className="flex flex-wrap items-center gap-1.5">
            {(Object.keys(FRAME.exif) as (keyof typeof FRAME.exif)[]).map((key) => (
              <Readout
                key={key}
                className={
                  active?.field === key
                    ? "border-foreground/45 text-foreground"
                    : "text-foreground/45"
                }
              >
                {key === "iso" ? `ISO ${FRAME.exif[key]}` : FRAME.exif[key]}
              </Readout>
            ))}
            <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/35">
              {FRAME.title}
            </span>
          </div>
        </div>

        {/* Margin — one callout at a time, holding its slot so nothing reflows. */}
        <div className="w-full shrink-0 md:w-[15rem] lg:w-[17rem]">
          <div
            ref={cardRef}
            className={`min-h-[8.5rem] w-full border p-4 ${
              active ? "border-border bg-card" : "border-dashed border-border/70 bg-transparent"
            }`}
          >
            {active ? (
              <>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">
                    {String(HOTSPOTS.indexOf(active) + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground">
                    {active.tag}
                  </span>
                </div>
                <p className="mt-3 font-body text-sm leading-snug text-foreground">{active.title}</p>
                <p className="mt-2 font-body text-[13px] leading-relaxed text-foreground/60">{active.note}</p>
              </>
            ) : (
              <div className="flex h-full min-h-[6rem] items-center">
                <Hint>Hover or tab a marker</Hint>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Connector overlay. Pixel-space viewBox means no stroke distortion at any
          aspect; only ever one path, so a fast hover cannot orphan a line. */}
      {connector && geo && (
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0"
          viewBox={`0 0 ${geo.w} ${geo.h}`}
          preserveAspectRatio="none"
          width={geo.w}
          height={geo.h}
        >
          <path
            key={active?.id}
            d={connector.d}
            fill="none"
            stroke="hsl(var(--foreground) / 0.5)"
            strokeWidth={1}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={drawn ? 0 : 1}
            style={{ transition: reduced ? "none" : `stroke-dashoffset 460ms ${EASE_OPTIC}` }}
          />
          <rect
            x={connector.ax - 2}
            y={connector.ay - 2}
            width={4}
            height={4}
            fill="hsl(var(--foreground) / 0.55)"
            style={{
              opacity: drawn ? 1 : 0,
              transition: reduced ? "none" : `opacity 200ms ${EASE_OPTIC} 340ms`,
            }}
          />
        </svg>
      )}
    </div>
  );
}
