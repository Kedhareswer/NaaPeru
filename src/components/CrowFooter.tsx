import { useEffect, useRef } from "react";
import { useChat } from "@/contexts/ChatContext";

const FRAME_COUNT = 140;
const frameSrc = (i: number) => `/motion/crow/f${String(i).padStart(3, "0")}.webp`;

/**
 * A line held in the red room.
 *  - `kind` picks the voice: `statement` is loud, `quote` is quiet.
 *  - `at` places it in the negative space around the bird. Portrait viewports
 *    collapse the side gutters into the bands, since there is no room beside it.
 */
export type CrowLine = {
  text: string;
  kind: "statement" | "quote";
  at: "top" | "bottom" | "left" | "right";
};

const DEFAULT_LINES: CrowLine[] = [
  { text: "THIS IS THE END", kind: "statement", at: "top" },
  { text: "WHY ARE YOU STILL SCROLLING?", kind: "statement", at: "bottom" },
  { text: "OK. HERE ARE SOME QUOTES.", kind: "statement", at: "top" },
  { text: "Ship it before you feel ready. Ready is a story you tell yourself.", kind: "quote", at: "right" },
  { text: "The best code is the code you didn't write.", kind: "quote", at: "left" },
  { text: "You can't debug a problem you refuse to name.", kind: "quote", at: "bottom" },
  { text: "Nobody remembers the framework. They remember whether it worked.", kind: "quote", at: "right" },
  { text: "Measure it. Your intuition is confident and frequently wrong.", kind: "quote", at: "left" },
  { text: "Finish things. An unfinished thing teaches you almost nothing.", kind: "quote", at: "top" },
  { text: "STILL HERE. GENUINELY, RESPECT.", kind: "statement", at: "bottom" },
];

/** smoothstep — a linear alpha ramp reads as a mechanical wipe on a slow scrub. */
const smooth = (t: number) => {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
};

/**
 * Scroll-scrubbed footer for the landing page only. A crow wing-beat
 * (Pinterest pin 745064332144889923) rebuilt through the measured pipeline.
 * The page hard-cuts from dark into a flat red field; ink flips to black — the
 * clip's two-color system becomes the section's design system.
 *
 * Three things about how this draws:
 *
 * 1. The red is CSS, not asset. The frames used to bake the clip's own
 *    rgb(255,1,0) into every pixel, so the section could never wear the brand
 *    red — the background was settable but the canvas was not. They are now a
 *    white field with black ink, drawn with `multiply`: field x background keeps
 *    the background, ink x background stays ink, and edges blend for free. The
 *    canvas reads its fill from the section's own computed background, so the
 *    two can never drift apart.
 *
 * 2. Scroll owns everything, and the beat runs once. No autoplay, no wrap —
 *    the 140 frames map straight onto scroll progress, so the reader is the one
 *    moving the wings.
 *
 * 3. The words are set INTO the canvas in the same black ink as the crow, and
 *    placed in the negative space AROUND it — a band above, a band below, or a
 *    column in either gutter. Every line is laid out against the bird's measured
 *    box, so nothing can ever land on top of it and turn to mush (both are the
 *    same black). One surface, two colors, one composition.
 */
export const CrowFooter = ({
  quote,
  lines = DEFAULT_LINES,
}: {
  quote?: string;
  lines?: CrowLine[];
}) => {
  const { openChat } = useChat();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef(lines);
  linesRef.current = lines;

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const images: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
    let loaded = false;
    let raf = 0;
    let fontsReady = false;

    // Canvas text silently falls back to a system face if it draws before the
    // webfont lands, so hold the words until it has.
    document.fonts?.ready.then(() => {
      fontsReady = true;
    });

    /** Canvas fill comes from the section itself, so asset and CSS cannot drift. */
    const fieldColor = () =>
      getComputedStyle(section).backgroundColor || "rgb(191,37,24)";

    const wrap = (text: string, maxWidth: number) => {
      const words = text.split(" ");
      const out: string[] = [];
      let line = "";
      for (const w of words) {
        const next = line ? `${line} ${w}` : w;
        if (ctx.measureText(next).width > maxWidth && line) {
          out.push(line);
          line = w;
        } else {
          line = next;
        }
      }
      if (line) out.push(line);
      return out;
    };

    /**
     * Which line is showing, and how present it is. Each line owns an equal band
     * of the scroll; the ends of a band ramp so lines change over rather than
     * snapping.
     */
    const lineAt = (progress: number) => {
      const all = linesRef.current;
      if (!all.length) return null;
      const band = 1 / all.length;
      const idx = Math.min(all.length - 1, Math.floor(progress / band));
      const t = (progress - idx * band) / band; // 0..1 within the band
      const fade = 0.18;
      const raw = t < fade ? t / fade : t > 1 - fade ? (1 - t) / fade : 1;
      return { line: all[idx], alpha: smooth(raw) };
    };

    const draw = (frameIndex: number, progress: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (!w || !h) return;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      const pad = Math.min(w, h) * 0.055;
      const portrait = h > w;

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.fillStyle = fieldColor();
      ctx.fillRect(0, 0, w, h);

      // --- the bird ------------------------------------------------------
      const square = portrait
        ? Math.min(h * 0.42, w * 1.0)
        : Math.min(h * 0.62, w * 0.5);
      const cx = w / 2;
      const cy = portrait ? h * 0.4 : h * 0.47;
      const img = images[frameIndex];
      if (img?.complete && img.naturalWidth) {
        ctx.globalCompositeOperation = "multiply";
        ctx.drawImage(img, cx - square / 2, cy - square / 2, square, square);
        ctx.globalCompositeOperation = "source-over";
      }

      // Ink keep-out. The art does not fill its square — measured against the
      // rebuild's sprite bbox the ink covers about the middle 64% across and 50%
      // down — so the gutters start closer in than the drawn square suggests.
      const keep = {
        l: cx - square * 0.34,
        r: cx + square * 0.34,
        t: cy - square * 0.28,
        b: cy + square * 0.28,
      };

      if (!fontsReady) return;
      const shown = lineAt(progress);
      if (!shown || shown.alpha <= 0.01) return;
      const { line, alpha } = shown;

      // --- where the words go --------------------------------------------
      // Side gutters only exist when there is room beside the bird; on a phone
      // they collapse into the band above or below it.
      let slot = line.at;
      if (portrait && (slot === "left" || slot === "right")) {
        slot = slot === "left" ? "top" : "bottom";
      }

      const statement = line.kind === "statement";
      const gutter = slot === "left" || slot === "right";
      const base = statement ? 0.062 : 0.038;
      const fontSize = Math.min(
        w * (portrait ? base * 1.5 : base) * (gutter ? 0.68 : 1),
        (statement ? 76 : 44) * dpr,
      );

      ctx.font = statement
        ? `700 ${fontSize}px "Space Grotesk", sans-serif`
        : `italic 400 ${fontSize}px "Inter", sans-serif`;
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#000";

      // Anchor to the BIRD, not to the viewport. Pinned to the frame edges the
      // words and the crow read as two unrelated things sharing a red field;
      // held a short gap off its box they read as one composition.
      const gap = pad * 1.15;
      const lh = fontSize * 1.3;

      let maxWidth: number;
      let x: number;
      let align: CanvasTextAlign;
      if (slot === "left") {
        maxWidth = Math.max(140, keep.l - gap - pad);
        x = keep.l - gap;
        align = "right";
      } else if (slot === "right") {
        maxWidth = Math.max(140, w - keep.r - gap - pad);
        x = keep.r + gap;
        align = "left";
      } else {
        maxWidth = Math.min(w * 0.8, square * 1.45);
        x = w / 2;
        align = "center";
      }

      ctx.textAlign = align;
      ctx.globalAlpha = alpha;

      // Rows first: the block has to be positioned by its own height so it sits
      // a consistent gap off the bird however many lines it wraps to.
      const rows = wrap(line.text, maxWidth);
      const blockH = (rows.length - 1) * lh;
      let top: number;
      if (slot === "top") top = keep.t - gap - blockH;
      else if (slot === "bottom") top = keep.b + gap;
      else top = cy - blockH / 2;

      // Never let a block run off the top or bottom of the sticky frame.
      top = Math.max(pad + fontSize / 2, Math.min(h - pad - fontSize / 2 - blockH, top));

      rows.forEach((row, i) => ctx.fillText(row, x, top + i * lh));

      ctx.globalAlpha = 1;
    };

    const preload = () => {
      if (loaded) return;
      loaded = true;
      const indices = reduced ? [FRAME_COUNT - 1] : [...Array(FRAME_COUNT).keys()];
      indices.forEach((i) => {
        const img = new Image();
        img.src = frameSrc(i);
        img.decode?.().catch(() => {});
        images[i] = img;
      });
    };

    const observer = new IntersectionObserver(
      (entries) => entries.some((e) => e.isIntersecting) && preload(),
      { rootMargin: "150% 0%" }
    );
    observer.observe(section);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return;

      const progress = Math.min(
        1,
        Math.max(0, -rect.top / Math.max(1, rect.height - vh))
      );
      // Scroll owns the wings. One pass, no wrap — the beat does not restart.
      const frame = reduced
        ? FRAME_COUNT - 1
        : Math.min(FRAME_COUNT - 1, Math.round(progress * (FRAME_COUNT - 1)));
      draw(frame, progress);

      if (overlayRef.current) {
        const t = reduced ? 1 : smooth(Math.max(0, (progress - 0.93) / 0.07));
        overlayRef.current.style.opacity = String(t);
        overlayRef.current.style.transform = `translateY(${(1 - t) * 10}px)`;
        overlayRef.current.style.pointerEvents = t > 0.5 ? "auto" : "none";
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <footer ref={sectionRef} className="relative h-[400vh] bg-primary">
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* Footer content, revealed on the last stretch of the scrub */}
        <div
          ref={overlayRef}
          className="absolute inset-x-0 bottom-0 opacity-0"
          style={{ pointerEvents: "none" }}
        >
          <div className="pb-16 pt-10">
            <div className="container-portfolio flex flex-col items-center justify-between gap-6 md:flex-row md:items-center">
              <p className="max-w-3xl text-left font-body text-sm italic text-black/70 md:text-base">
                {quote}
              </p>
              <button
                onClick={openChat}
                className="font-sanchari text-2xl font-bold text-black cursor-pointer transition-transform duration-150 ease-out hover:[text-shadow:0_0_24px_rgba(0,0,0,0.45)] active:scale-[0.97]"
              >
                సంచారి?
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
