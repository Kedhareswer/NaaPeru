import { useEffect, useRef, useState } from "react";
import { EASE_OPTIC, FRAMES, Readout, clamp, lerp, usePrefersReducedMotion } from "./_shared";

type Row = {
  file: string;
  /** Capture settings — the archive's own vocabulary, kept in one column. */
  exposure: string;
  date: string;
  size: string;
};

const pad2 = (n: number) => String(n).padStart(2, "0");

/** Hand-logged rolls. Deliberately uneven frame numbers — a real index has gaps. */
const LOGGED: Row[] = [
  { file: "atrium-dusk_0142.RAF", exposure: "35mm · f/1.8 · 1/125", date: "2026-05-28", size: "42.6 MB" },
  { file: "cooling-stack_0187.RAF", exposure: "24mm · f/5.6 · 1/250", date: "2026-05-19", size: "38.1 MB" },
  { file: "harbour-crane_0203.DNG", exposure: "85mm · f/4.0 · 1/800", date: "2026-05-04", size: "61.4 MB" },
  { file: "server-aisle-b_0219.RAF", exposure: "18mm · f/2.8 · 1/40", date: "2026-04-27", size: "44.9 MB" },
  { file: "rain-on-glass_0244.DNG", exposure: "50mm · f/1.4 · 1/60", date: "2026-04-15", size: "57.8 MB" },
  { file: "kitchen-steam_0261.RAF", exposure: "35mm · f/2.0 · 1/90", date: "2026-04-02", size: "39.7 MB" },
  { file: "cold-storage_0288.DNG", exposure: "28mm · f/3.5 · 1/30", date: "2026-03-21", size: "63.2 MB" },
  { file: "night-bus-9pm_0304.RAF", exposure: "40mm · f/1.8 · 1/45", date: "2026-03-09", size: "41.3 MB" },
  { file: "wire-loom_0331.DNG", exposure: "105mm · f/8.0 · 1/15", date: "2026-02-26", size: "58.6 MB" },
  { file: "bench-power_0349.RAF", exposure: "60mm · f/11 · 1/8", date: "2026-02-14", size: "37.4 MB" },
  { file: "salt-flat-noon_0362.DNG", exposure: "24mm · f/16 · 1/1000", date: "2026-02-01", size: "66.0 MB" },
  { file: "loading-dock_0388.RAF", exposure: "35mm · f/4.0 · 1/160", date: "2026-01-19", size: "43.8 MB" },
  { file: "solder-fumes_0401.RAF", exposure: "90mm · f/2.8 · 1/200", date: "2026-01-07", size: "40.2 MB" },
  { file: "roof-antenna_0427.DNG", exposure: "70mm · f/6.3 · 1/500", date: "2025-12-23", size: "59.5 MB" },
  { file: "lab-window_0443.RAF", exposure: "50mm · f/2.2 · 1/100", date: "2025-12-11", size: "38.9 MB" },
  { file: "transit-tunnel_0468.DNG", exposure: "16mm · f/2.0 · 1/25", date: "2025-11-29", size: "64.7 MB" },
  { file: "paper-mill_0482.RAF", exposure: "35mm · f/5.0 · 1/120", date: "2025-11-16", size: "45.1 MB" },
  { file: "cable-trench_0499.DNG", exposure: "28mm · f/3.2 · 1/50", date: "2025-11-03", size: "60.8 MB" },
  { file: "grain-tower_0517.RAF", exposure: "135mm · f/4.5 · 1/640", date: "2025-10-22", size: "42.0 MB" },
  { file: "last-light-8f_0534.DNG", exposure: "50mm · f/1.6 · 1/80", date: "2025-10-08", size: "55.3 MB" },
];

/** The project shoots already carry EXIF in _shared — reuse it rather than invent twice. */
const SHOOTS: Row[] = FRAMES.map((frame, i) => ({
  file: `${frame.title.toLowerCase().replace(/\s+/g, "-")}_0${540 + i * 13}.RAF`,
  exposure: `${frame.exif.focal} · ${frame.exif.aperture} · ${frame.exif.shutter}`,
  date: `2025-${pad2(1 + (i % 9))}-${pad2(4 + ((i * 7) % 24))}`,
  size: `${(28 + ((i * 37) % 34) + ((i * 13) % 10) / 10).toFixed(1)} MB`,
}));

/** Newest first, like any index you'd actually scan. */
const ROWS: Row[] = [...LOGGED, ...SHOOTS].sort((a, b) => b.date.localeCompare(a.date));

/** How many rows out the depth of field reaches before everything reads as "far". */
const FALLOFF_SPAN = 7;
/** Blur is the expensive part — only the rows that read as "near" get a filter at all. */
const BLUR_SPAN = 4;
const BLUR_MAX = 2.5;
const PAGE_STEP = 8;

/**
 * Clarity as a function of distance from the focal row — never hardcoded per row.
 * `sharp` is 1 on the focal plane and eases to 0 at FALLOFF_SPAN, which is what
 * gives peripheral rows a readable sense of "one away" versus "far down the list".
 */
function planeOf(distance: number, engaged: boolean, reduced: boolean) {
  const sharp = Math.pow(clamp(1 - distance / FALLOFF_SPAN, 0, 1), 1.35);

  if (reduced) {
    // No blur, no scale. Contrast alone carries the gradient, floored so the
    // furthest row is still comfortably readable.
    return { opacity: engaged ? lerp(0.45, 1, sharp) : 0.72, blur: 0, scale: 1 };
  }

  // At rest the lens sits flat: one even, slightly-held-back plane. Letting it
  // snap to all-sharp on pointer-out would read as a bug, not a resting state.
  if (!engaged) return { opacity: 0.55, blur: 0, scale: 1 };

  return {
    opacity: lerp(0.15, 1, sharp),
    blur: distance <= BLUR_SPAN ? Math.min(BLUR_MAX, distance * 0.62) : 0,
    scale: lerp(0.975, 1.05, sharp),
  };
}

export default function FocusPull() {
  const reduced = usePrefersReducedMotion();
  const [focus, setFocus] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [keyed, setKeyed] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  /** Only keyboard moves rack the scroll — chasing the pointer would fight it. */
  const fromKeyboard = useRef(false);

  const engaged = hovering || keyed;

  // Pointer drives the same single focus index the keyboard does, rAF-throttled so
  // a fast sweep down 32 rows costs one state write per frame, not one per row.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let frame = 0;
    let pending = -1;
    const commit = () => {
      frame = 0;
      if (pending < 0) return;
      fromKeyboard.current = false;
      setFocus(pending);
    };
    const onMove = (e: PointerEvent) => {
      const row = (e.target as HTMLElement | null)?.closest?.("[data-row]") as HTMLElement | null;
      setHovering(true);
      if (!row) return;
      pending = Number(row.dataset.row);
      if (!frame) frame = requestAnimationFrame(commit);
    };
    const onLeave = () => setHovering(false);

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Keep the focal row on screen for keyboard users, with two rows of context so
  // the falloff stays visible on both sides instead of pinning to the edge.
  useEffect(() => {
    if (!fromKeyboard.current) return;
    const el = scrollerRef.current;
    const row = rowRefs.current[focus];
    if (!el || !row) return;

    const pad = row.offsetHeight * 2;
    const above = row.offsetTop - pad;
    const below = row.offsetTop + row.offsetHeight + pad;
    let top = el.scrollTop;
    if (above < el.scrollTop) top = above;
    else if (below > el.scrollTop + el.clientHeight) top = below - el.clientHeight;
    if (top === el.scrollTop) return;

    el.scrollTo({
      top: clamp(top, 0, el.scrollHeight - el.clientHeight),
      behavior: reduced ? "auto" : "smooth",
    });
  }, [focus, reduced]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let next = focus;
    if (e.key === "ArrowDown") next = focus + 1;
    else if (e.key === "ArrowUp") next = focus - 1;
    else if (e.key === "PageDown") next = focus + PAGE_STEP;
    else if (e.key === "PageUp") next = focus - PAGE_STEP;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = ROWS.length - 1;
    else return;

    e.preventDefault();
    fromKeyboard.current = true;
    setFocus(clamp(next, 0, ROWS.length - 1));
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <div className="flex h-full w-full flex-col">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 pb-3 pt-5">
          <div className="min-w-0">
            <h3 className="font-heading text-sm uppercase tracking-[0.18em] text-foreground">Frame index</h3>
            <p className="mt-1 max-w-md font-body text-xs leading-relaxed text-muted-foreground">
              Clarity falls off with distance from the row you're on — near rows stay
              readable, far rows recede. The gradient is the wayfinding.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Readout>
              {pad2(focus + 1)} / {ROWS.length}
            </Readout>
            <Readout>{engaged ? (reduced ? "marked" : `dof ±${FALLOFF_SPAN}`) : "at rest"}</Readout>
          </div>
        </header>

        <div className="grid grid-cols-[2.25rem_minmax(0,1fr)_5.75rem] items-center gap-3 border-b border-border/60 px-5 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/35 md:grid-cols-[2.25rem_minmax(0,1fr)_11rem_6rem_5.75rem]">
          <span>#</span>
          <span>frame</span>
          <span className="hidden md:block">exposure</span>
          <span className="hidden md:block">date</span>
          <span className="text-right">size</span>
        </div>

        <div
          ref={scrollerRef}
          role="listbox"
          aria-label="Frame index — arrow keys rack focus"
          aria-activedescendant={`focus-pull-row-${focus}`}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onFocus={() => setKeyed(true)}
          onBlur={() => setKeyed(false)}
          className={`relative flex-1 overflow-y-auto overscroll-contain py-1 outline-none ${
            keyed ? "ring-1 ring-inset ring-foreground/30" : ""
          }`}
        >
          {ROWS.map((row, i) => {
            const distance = Math.abs(i - focus);
            const { opacity, blur, scale } = planeOf(distance, engaged, reduced);
            const isFocus = i === focus && engaged;

            return (
              <div
                key={row.file}
                id={`focus-pull-row-${i}`}
                data-row={i}
                role="option"
                aria-selected={isFocus}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                className={`relative grid cursor-default grid-cols-[2.25rem_minmax(0,1fr)_5.75rem] items-center gap-3 px-5 py-[7px] md:grid-cols-[2.25rem_minmax(0,1fr)_11rem_6rem_5.75rem] ${
                  isFocus && reduced ? "font-semibold" : ""
                }`}
                style={{
                  opacity,
                  transform: scale === 1 ? undefined : `scale(${scale})`,
                  transformOrigin: "left center",
                  filter: blur > 0 ? `blur(${blur.toFixed(2)}px)` : undefined,
                  transition: reduced
                    ? "none"
                    : `opacity 300ms ${EASE_OPTIC}, transform 300ms ${EASE_OPTIC}` +
                      (distance <= BLUR_SPAN ? `, filter 300ms ${EASE_OPTIC}` : ""),
                }}
              >
                {/* Rule marker — the one focus cue that survives reduced motion. */}
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-[2px] bg-primary"
                  style={{ opacity: isFocus ? 1 : 0 }}
                />
                <span className="font-mono text-[10px] tabular-nums text-foreground/45">{pad2(i + 1)}</span>
                <span
                  className={`truncate font-body text-[13px] leading-tight ${
                    isFocus ? "text-foreground" : "text-foreground/85"
                  }`}
                >
                  {row.file}
                </span>
                <span className="hidden truncate font-mono text-[10px] tabular-nums text-muted-foreground md:block">
                  {row.exposure}
                </span>
                <span className="hidden font-mono text-[10px] tabular-nums text-muted-foreground md:block">
                  {row.date}
                </span>
                <span className="text-right font-mono text-[10px] tabular-nums text-muted-foreground">
                  {row.size}
                </span>
              </div>
            );
          })}
        </div>

        <footer className="flex items-center justify-between gap-3 border-t border-border px-5 py-3">
          <span className="min-w-0 truncate font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/55">
            {engaged ? ROWS[focus].file : "lens at rest"}
          </span>
          <span className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.24em] text-foreground/35 sm:block">
            ↑ ↓ · home / end
          </span>
        </footer>
      </div>
    </div>
  );
}
