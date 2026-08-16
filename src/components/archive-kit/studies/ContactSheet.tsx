import { useCallback, useEffect, useRef, useState } from "react";
import { EASE_OPTIC, FRAMES, Hint, Readout, clamp, lerp, usePrefersReducedMotion } from "./_shared";

const COLS = 4;
const GAP = 6; // px gutter — also the hit-test bleed, so gutters never drop the loupe
const LOUPE = 1.6; // loupe is this many cells wide: readable, but the sheet stays around it
const OVERHANG = 18; // px the loupe may spill past the sheet before it gets clipped

/** Arrow keys walk the sheet like a grid, not like a tab order. */
const ARROW: Record<string, number | undefined> = {
  ArrowRight: 1,
  ArrowLeft: -1,
  ArrowDown: COLS,
  ArrowUp: -COLS,
};

type Rect = { x: number; y: number; w: number; h: number };

const pad = (n: number) => String(n).padStart(2, "0");

export default function ContactSheet() {
  const reduced = usePrefersReducedMotion();

  const gridRef = useRef<HTMLDivElement>(null);
  const loupeRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLButtonElement | null)[]>([]);
  /** Cell geometry relative to the grid box — cached so pointermove never forces layout. */
  const rectsRef = useRef<Rect[]>([]);
  /** Eased loupe centre. Null means "next appearance lands in place, no travel". */
  const posRef = useRef<{ x: number; y: number } | null>(null);

  const [active, setActive] = useState(-1);
  const [promoted, setPromoted] = useState(-1);
  const [cell, setCell] = useState<Rect | null>(null);
  const [engaged, setEngaged] = useState(false); // has the user pointed at the sheet yet?

  const activeRef = useRef(active);
  const lastRef = useRef(0); // outlives active === -1 so the loupe fades out with its content intact
  useEffect(() => {
    activeRef.current = active;
    if (active >= 0) lastRef.current = active;
  }, [active]);

  const measure = useCallback(() => {
    const host = gridRef.current;
    if (!host) return;
    const base = host.getBoundingClientRect();
    rectsRef.current = cellRefs.current.map((el) => {
      const r = el?.getBoundingClientRect();
      return r ? { x: r.left - base.left, y: r.top - base.top, w: r.width, h: r.height } : { x: 0, y: 0, w: 0, h: 0 };
    });
    const a = activeRef.current;
    if (a >= 0) setCell(rectsRef.current[a] ?? null);
  }, []);

  useEffect(() => {
    const host = gridRef.current;
    if (!host) return;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    return () => ro.disconnect();
  }, [measure]);

  /** Which cell sits under the pointer. Rects are bled by the gutter so travel never falls through. */
  const hitTest = (px: number, py: number) => {
    const rects = rectsRef.current;
    for (let i = 0; i < rects.length; i++) {
      const r = rects[i];
      if (r.w === 0) continue;
      if (px >= r.x - GAP && px <= r.x + r.w + GAP && py >= r.y - GAP && py <= r.y + r.h + GAP) return i;
    }
    return -1;
  };

  const select = (i: number) => {
    if (i === activeRef.current) return;
    if (i >= 0) setCell(rectsRef.current[i] ?? null);
    setActive(i);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (promoted >= 0) return;
    const host = gridRef.current;
    if (!host) return;
    const base = host.getBoundingClientRect();
    if (!engaged) setEngaged(true);
    select(hitTest(e.clientX - base.left, e.clientY - base.top));
  };

  const onPointerLeave = () => {
    // Keyboard focus outranks the pointer: leaving the sheet must not blank a focused caption.
    const focused = cellRefs.current.findIndex((el) => el === document.activeElement);
    if (focused >= 0) {
      select(focused);
      return;
    }
    posRef.current = null;
    select(-1);
  };

  /** Ease the loupe toward the active cell centre, then stop. No idle loop, ever. */
  useEffect(() => {
    if (reduced || active < 0 || promoted >= 0) return;
    const el = loupeRef.current;
    const host = gridRef.current;
    const r = rectsRef.current[active];
    if (!el || !host || !r) return;

    // Keep the loupe inside the clipped stage; the shift is small enough that the
    // magnified cell still sits wholly within the glass.
    const halfW = (r.w * LOUPE) / 2;
    const halfH = (r.h * LOUPE) / 2;
    const tx = clamp(r.x + r.w / 2, halfW - OVERHANG, host.clientWidth - halfW + OVERHANG);
    const ty = clamp(r.y + r.h / 2, halfH - OVERHANG, host.clientHeight - halfH + OVERHANG);
    if (!posRef.current) posRef.current = { x: tx, y: ty };

    let frame = 0;
    const step = () => {
      const p = posRef.current;
      if (!p) return;
      p.x = lerp(p.x, tx, 0.24);
      p.y = lerp(p.y, ty, 0.24);
      const settled = Math.hypot(tx - p.x, ty - p.y) < 0.4;
      if (settled) {
        p.x = tx;
        p.y = ty;
      }
      el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
      frame = settled ? 0 : requestAnimationFrame(step);
    };
    step();

    return () => {
      if (frame) cancelAnimationFrame(frame);
    };
  }, [active, promoted, reduced]);

  /** Promoted view: Escape returns to the sheet, arrows step frame to frame. */
  useEffect(() => {
    if (promoted < 0) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        cellRefs.current[promoted]?.focus();
        setPromoted(-1);
      } else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        const d = e.key === "ArrowRight" ? 1 : -1;
        setPromoted((p) => (p + d + FRAMES.length) % FRAMES.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [promoted]);

  const onCellKeyDown = (e: React.KeyboardEvent, i: number) => {
    const step = ARROW[e.key];
    if (step === undefined) return;
    e.preventDefault();
    cellRefs.current[clamp(i + step, 0, FRAMES.length - 1)]?.focus();
  };

  const detail = FRAMES[active >= 0 ? active : lastRef.current];

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-background font-body">
      <header className="flex shrink-0 items-baseline justify-between gap-4 px-4 pb-2 pt-4 md:px-6">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/70">Contact sheet</h3>
        {promoted >= 0 ? (
          <Hint>Esc returns to sheet</Hint>
        ) : engaged || active >= 0 ? (
          <Hint>Click to promote</Hint>
        ) : (
          <Hint>Move across the sheet</Hint>
        )}
      </header>

      <div className="min-h-0 flex-1 px-4 pb-4 md:px-6 md:pb-6">
        <div className="h-full w-full border border-border bg-card p-[6px]">
          {/* Zero border + zero padding: this box is both the hit-test frame and the
              loupe's containing block, so measured rects and CSS offsets agree exactly. */}
          <div
            ref={gridRef}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            className="relative grid h-full w-full touch-pan-y"
            style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`, gap: GAP }}
          >
            {FRAMES.map((f, i) => (
              <button
                key={f.src}
                ref={(el) => {
                  cellRefs.current[i] = el;
                }}
                type="button"
                onFocus={() => select(i)}
                onKeyDown={(e) => onCellKeyDown(e, i)}
                onClick={() => setPromoted(i)}
                aria-label={`${f.title} — ${f.exif.focal}, ${f.exif.aperture}`}
                className="group relative overflow-hidden bg-foreground/[0.06] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                <img
                  src={f.src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                  style={{
                    // The cell under the loupe recedes — the glass carries the detail now.
                    opacity: active === i && !reduced ? 0.3 : 0.85,
                    transition: reduced ? "none" : `opacity 200ms ${EASE_OPTIC}`,
                  }}
                />
                {/* Frame number, struck along the rebate edge like a real sheet */}
                <span className="pointer-events-none absolute left-1 top-1 font-mono text-[9px] tabular-nums text-foreground/45">
                  {pad(i + 1)}
                </span>

                {/* Reduced motion: the caption is the whole interaction — static, on hover or focus */}
                {reduced && active === i && (
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-card/95 px-1.5 py-1 text-left font-mono text-[9px] uppercase leading-tight tracking-[0.1em] text-foreground">
                    {f.title}
                    <span className="mt-0.5 block tracking-normal text-foreground/55">
                      {f.exif.focal} · {f.exif.aperture} · {f.exif.shutter} · ISO {f.exif.iso}
                    </span>
                  </span>
                )}
              </button>
            ))}

            {/* The loupe: magnifies in place, so the sheet is never replaced — only inspected. */}
            {!reduced && cell && (
              <div
                ref={loupeRef}
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 z-10"
                style={{ width: cell.w * LOUPE, height: cell.h * LOUPE }}
              >
                <div
                  className="h-full w-full border border-foreground/25 bg-card"
                  style={{
                    boxShadow: "0 18px 42px -16px hsl(var(--foreground) / 0.45)",
                    opacity: active >= 0 && promoted < 0 ? 1 : 0,
                    transform: `scale(${active >= 0 && promoted < 0 ? 1 : 0.92})`,
                    transition: `opacity 170ms ${EASE_OPTIC}, transform 260ms ${EASE_OPTIC}`,
                  }}
                >
                  <div className="h-[70%] w-full overflow-hidden bg-foreground/[0.06]">
                    <img src={detail.src} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex h-[30%] flex-col justify-center gap-1 px-1.5">
                    <p className="truncate font-mono text-[10px] uppercase tracking-[0.14em] text-foreground">
                      {detail.title}
                    </p>
                    <div className="flex flex-wrap gap-1 overflow-hidden">
                      <Readout className="!px-1 !py-0">{detail.exif.focal}</Readout>
                      <Readout className="!px-1 !py-0">{detail.exif.aperture}</Readout>
                      <Readout className="!px-1 !py-0">{detail.exif.shutter}</Readout>
                      <Readout className="!px-1 !py-0">ISO {detail.exif.iso}</Readout>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Promotion keeps the sheet legible behind it — the grid is still your place. */}
      {promoted >= 0 && (
        <div
          className={`absolute inset-0 z-20 flex items-center justify-center bg-background/85 p-5 md:p-10 ${
            reduced ? "" : "animate-fade-in"
          }`}
          onPointerDown={() => setPromoted(-1)}
        >
          <figure className="w-full max-w-xl border border-border bg-card">
            <div className="aspect-[3/2] w-full overflow-hidden bg-foreground/[0.06]">
              <img
                src={FRAMES[promoted].src}
                alt={FRAMES[promoted].title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-3 py-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground">
                {pad(promoted + 1)} / {pad(FRAMES.length)} — {FRAMES[promoted].title}
              </span>
              <span className="flex flex-wrap gap-1">
                <Readout>{FRAMES[promoted].exif.focal}</Readout>
                <Readout>{FRAMES[promoted].exif.aperture}</Readout>
                <Readout>{FRAMES[promoted].exif.shutter}</Readout>
                <Readout>ISO {FRAMES[promoted].exif.iso}</Readout>
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
