import { useEffect, useMemo, useRef, useState } from "react";
import { EASE_OPTIC, FRAMES, Readout, clamp, usePrefersReducedMotion } from "./_shared";

const FRAME = FRAMES[4]; // Research Bolt — wide tonal range, useful to push around

const SRC_BINS = 256; // working resolution of the luminance model
const DISPLAY_BINS = 64; // drawn columns — coarse enough to stay readable when stretched
const SAMPLE_W = 128;
const SAMPLE_H = 96;

/** A tenth of a percent stacked against an end reads as blown on screen. */
const CLIP_THRESHOLD = 0.004;

const EV_RANGE = { min: -2, max: 2, step: 0.1 };
const CONTRAST_RANGE = { min: 50, max: 180, step: 1 };

/**
 * Deterministic stand-in distribution — a three-lobe mixture that behaves like a
 * real exposure: a shadow foot, a broad midtone mass, a small specular tail.
 * Used verbatim when canvas sampling is unavailable (tainted image, no 2d
 * context, decode failure) so the graph is never blank and never invented.
 */
function modelHistogram() {
  const bins = new Float64Array(SRC_BINS);
  const lobes = [
    { mu: 44, sigma: 24, weight: 0.34 },
    { mu: 122, sigma: 47, weight: 1 },
    { mu: 206, sigma: 19, weight: 0.21 },
  ];
  for (let i = 0; i < SRC_BINS; i += 1) {
    let v = 0;
    for (const lobe of lobes) {
      const d = (i - lobe.mu) / lobe.sigma;
      v += lobe.weight * Math.exp(-0.5 * d * d);
    }
    bins[i] = v;
  }
  return bins;
}

/** Read the real luminance distribution off the decoded bitmap. Null on failure. */
function sampleHistogram(img: HTMLImageElement) {
  try {
    if (!img.naturalWidth || !img.naturalHeight) return null;
    const canvas = document.createElement("canvas");
    canvas.width = SAMPLE_W;
    canvas.height = SAMPLE_H;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0, SAMPLE_W, SAMPLE_H);
    const { data } = ctx.getImageData(0, 0, SAMPLE_W, SAMPLE_H); // throws if tainted
    const bins = new Float64Array(SRC_BINS);
    for (let i = 0; i < data.length; i += 4) {
      // Rec. 709 luma — weights the channels the way the eye does
      const y = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      bins[clamp(Math.round(y), 0, 255)] += 1;
    }
    return bins;
  } catch {
    return null;
  }
}

/**
 * Mirrors the CSS filter chain exactly: brightness() scales linearly, then
 * contrast() pivots around mid-grey. Keeping the math identical is the whole
 * point of the study — the graph has to describe the picture, not approximate it.
 */
function mapTone(value: number, gain: number, contrast: number) {
  const n = (value / 255) * gain;
  return ((n - 0.5) * contrast + 0.5) * 255;
}

type Analysis = { bars: number[]; shadow: number; highlight: number };

/** Push the base distribution through the tone map and re-bin the result. */
function analyse(base: Float64Array, ev: number, contrast: number): Analysis {
  const gain = 2 ** ev;
  const c = contrast / 100;
  const bins = new Float64Array(DISPLAY_BINS);
  let total = 0;
  let shadow = 0;
  let highlight = 0;

  for (let i = 0; i < SRC_BINS; i += 1) {
    const count = base[i];
    if (count <= 0) continue;
    total += count;
    const mapped = mapTone(i, gain, c);
    // Anything the map pushes past either end cannot come back — it stacks.
    if (mapped <= 0) shadow += count;
    else if (mapped >= 255) highlight += count;
    const slot = Math.min(DISPLAY_BINS - 1, Math.floor((clamp(mapped, 0, 255) / 256) * DISPLAY_BINS));
    bins[slot] += count;
  }

  if (total <= 0) return { bars: new Array(DISPLAY_BINS).fill(0), shadow: 0, highlight: 0 };

  // Normalise against the tallest interior column: once tones pile against an
  // end, that one bin would otherwise flatten the entire graph into a baseline.
  let peak = 0;
  for (let i = 1; i < DISPLAY_BINS - 1; i += 1) peak = Math.max(peak, bins[i]);
  if (peak <= 0) peak = total;

  return {
    bars: Array.from(bins, (v) => clamp(v / peak, 0, 1)),
    shadow: shadow / total,
    highlight: highlight / total,
  };
}

/** The transfer curve itself, drawn over the bars. Its flat ends are the clipping. */
function curvePath(ev: number, contrast: number, w: number, h: number) {
  const gain = 2 ** ev;
  const c = contrast / 100;
  const steps = 48;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const input = (i / steps) * 255;
    const out = clamp(mapTone(input, gain, c), 0, 255);
    pts.push(`${((input / 255) * w).toFixed(1)} ${(h - (out / 255) * h).toFixed(1)}`);
  }
  return `M ${pts.join(" L ")}`;
}

const VB_W = 640;
const VB_H = 100;
const COL_W = VB_W / DISPLAY_BINS;

export default function ExposureCurve() {
  const reduced = usePrefersReducedMotion();
  const imgRef = useRef<HTMLImageElement>(null);

  const [ev, setEv] = useState(0);
  const [contrast, setContrast] = useState(100);
  const [base, setBase] = useState<Float64Array>(() => modelHistogram());
  const [sampled, setSampled] = useState(false);

  // Sample once the bitmap is decoded; cached images are already complete when
  // the effect runs, so cover that path too rather than waiting on an event.
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    let cancelled = false;

    const read = () => {
      if (cancelled) return;
      const bins = sampleHistogram(img);
      if (!bins || cancelled) return; // fall through to the model distribution
      setBase(bins);
      setSampled(true);
    };

    if (img.complete) read();
    img.addEventListener("load", read);
    return () => {
      cancelled = true;
      img.removeEventListener("load", read);
    };
  }, []);

  const { bars, shadow, highlight } = useMemo(() => analyse(base, ev, contrast), [base, ev, contrast]);

  // The frame may ship with pure black or pure white pixels of its own. Flagging
  // those at rest would cry wolf, so the warning lights on clipping the *edit*
  // introduced; the readouts still report the honest absolute figure.
  const neutral = useMemo(() => analyse(base, 0, 100), [base]);
  const shadowClipped = shadow > CLIP_THRESHOLD && shadow > neutral.shadow + 0.001;
  const highlightClipped = highlight > CLIP_THRESHOLD && highlight > neutral.highlight + 0.001;

  const isNeutral = ev === 0 && contrast === 100;
  const ease = reduced ? "none" : `filter 140ms ${EASE_OPTIC}`;
  const barEase = reduced ? "none" : `height 140ms ${EASE_OPTIC}, y 140ms ${EASE_OPTIC}`;

  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <div className="flex h-full w-full flex-col gap-3 p-4 font-body md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Readout>{`EV ${ev >= 0 ? "+" : "−"}${Math.abs(ev).toFixed(1)}`}</Readout>
          <Readout>{`Contrast ${contrast}%`}</Readout>
          <Readout className="ml-auto">{sampled ? "Sampled" : "Modelled"}</Readout>
        </div>

        {/* The picture — CSS filters only; no per-pixel work needed on this side. */}
        <div className="relative min-h-0 flex-1 overflow-hidden bg-foreground/[0.06]">
          <img
            ref={imgRef}
            src={FRAME.src}
            alt={`${FRAME.title} — ${FRAME.exif.focal} at ${FRAME.exif.aperture}`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              filter: `brightness(${(2 ** ev).toFixed(3)}) contrast(${contrast}%)`,
              transition: ease,
            }}
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 border border-foreground/10" />
        </div>

        {/* The data — same edit, second representation. */}
        <div className="relative border border-border bg-card">
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="none"
            role="img"
            aria-label={`Luminance histogram. Shadow clipping ${(shadow * 100).toFixed(1)} percent, highlight clipping ${(highlight * 100).toFixed(1)} percent.`}
            className="block h-[68px] w-full md:h-[84px]"
          >
            {/* quarter-tone rules */}
            {[0.25, 0.5, 0.75].map((t) => (
              <line
                key={t}
                x1={t * VB_W}
                y1={0}
                x2={t * VB_W}
                y2={VB_H}
                className="text-border"
                stroke="currentColor"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {/* clip zones — lit only when the edit pushes tones off either end */}
            {shadowClipped && (
              <rect x={0} y={0} width={COL_W} height={VB_H} className="text-primary" fill="currentColor" opacity={0.16} />
            )}
            {highlightClipped && (
              <rect
                x={VB_W - COL_W}
                y={0}
                width={COL_W}
                height={VB_H}
                className="text-primary"
                fill="currentColor"
                opacity={0.16}
              />
            )}

            <g className="text-foreground/70">
              {bars.map((v, i) => {
                const isEnd = i === 0 || i === DISPLAY_BINS - 1;
                const lit = (i === 0 && shadowClipped) || (i === DISPLAY_BINS - 1 && highlightClipped);
                const h = Math.max(v * VB_H, v > 0 ? 1 : 0);
                return (
                  <rect
                    key={i}
                    x={i * COL_W + 0.5}
                    y={VB_H - h}
                    width={COL_W - 1}
                    height={h}
                    fill="currentColor"
                    className={lit ? "text-primary" : isEnd ? "text-foreground" : undefined}
                    style={{ transition: barEase }}
                  />
                );
              })}
            </g>

            {/* the exposure curve — flat ends are exactly where tone is being lost */}
            <path
              d={curvePath(ev, contrast, VB_W, VB_H)}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.25}
              vectorEffect="non-scaling-stroke"
              className="text-foreground"
              opacity={0.45}
              style={{ transition: reduced ? "none" : `d 140ms ${EASE_OPTIC}` }}
            />
          </svg>

          <div className="flex items-center justify-between gap-2 border-t border-border px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] tabular-nums">
            <span className={shadowClipped ? "text-primary" : "text-foreground/40"}>
              {shadowClipped ? "■ " : ""}
              Shadows {(shadow * 100).toFixed(1)}%
            </span>
            <span className="text-foreground/30">0 &mdash; 255</span>
            <span className={highlightClipped ? "text-primary" : "text-foreground/40"}>
              Highlights {(highlight * 100).toFixed(1)}%
              {highlightClipped ? " ■" : ""}
            </span>
          </div>
        </div>

        {/* Native inputs, restyled — keyboard, screen reader and touch come free. */}
        <div className="flex flex-col gap-2">
          <Slider
            id="exposure-curve-ev"
            label="Exposure"
            value={ev}
            display={`${ev >= 0 ? "+" : "−"}${Math.abs(ev).toFixed(1)} EV`}
            {...EV_RANGE}
            onChange={setEv}
          />
          <Slider
            id="exposure-curve-contrast"
            label="Contrast"
            value={contrast}
            display={`${contrast}%`}
            {...CONTRAST_RANGE}
            onChange={setContrast}
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-foreground/35">
            {shadowClipped || highlightClipped
              ? "Tone is stacking against the wall — detail there is gone"
              : "The graph is the cost of the edit"}
          </p>
          <button
            type="button"
            onClick={() => {
              setEv(0);
              setContrast(100);
            }}
            disabled={isNeutral}
            className="shrink-0 border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/70 transition-colors hover:border-foreground/40 hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-foreground disabled:pointer-events-none disabled:opacity-30"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

type SliderProps = {
  id: string;
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
};

/**
 * A real <input type="range"> with its track and thumb rebuilt as sharp marks.
 * Hand-rolled drag handles lose keyboard, AT and touch semantics; restyling
 * keeps all three.
 */
function Slider({ id, label, value, display, min, max, step, onChange }: SliderProps) {
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor={id}
        className="w-[4.5rem] shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/50"
      >
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={display}
        onChange={(e) => onChange(Number(e.currentTarget.value))}
        className={[
          "h-5 w-full flex-1 cursor-ew-resize appearance-none bg-transparent focus:outline-none",
          "[&::-webkit-slider-runnable-track]:h-px [&::-webkit-slider-runnable-track]:bg-border",
          "[&::-webkit-slider-thumb]:-mt-[7px] [&::-webkit-slider-thumb]:h-[15px] [&::-webkit-slider-thumb]:w-[3px]",
          "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-foreground",
          "[&::-moz-range-track]:h-px [&::-moz-range-track]:bg-border",
          "[&::-moz-range-thumb]:h-[15px] [&::-moz-range-thumb]:w-[3px] [&::-moz-range-thumb]:border-0",
          "[&::-moz-range-thumb]:[border-radius:0] [&::-moz-range-thumb]:bg-foreground",
          "focus-visible:[&::-webkit-slider-thumb]:bg-primary focus-visible:[&::-moz-range-thumb]:bg-primary",
        ].join(" ")}
      />
      <span className="w-[3.75rem] shrink-0 text-right font-mono text-[10px] uppercase tracking-[0.1em] tabular-nums text-foreground/70">
        {display}
      </span>
    </div>
  );
}
