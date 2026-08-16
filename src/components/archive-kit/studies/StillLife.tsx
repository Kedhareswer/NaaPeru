import { useEffect, useRef, useState } from "react";
import { Readout, useScrollProgress, usePrefersReducedMotion, clamp } from "./_shared";
import { createFrameAnimator, type FrameAnimator } from "@/lib/motion/interactiveMotion";

/**
 * Still life — a Pinterest bouquet render (single flower blooming into a full
 * arrangement while the vase re-throws itself) rebuilt frame-by-frame through
 * the measured pipeline, upscaled with Real-ESRGAN, and exported as a WebP
 * sequence. Scroll owns growth: the bouquet only blooms as fast as you ask.
 */

const FRAME_COUNT = 130;
const frameSrc = (i: number) => `/motion/bouquet/f${String(i).padStart(3, "0")}.webp`;

/** The vessel re-throws itself as the clip runs — named stages for the readout. */
function vesselAt(progress: number) {
  if (progress < 0.3) return "GLASS";
  if (progress < 0.55) return "CHALICE";
  if (progress < 0.75) return "JUG";
  if (progress < 0.92) return "POT";
  return "MARBLE";
}

export default function StillLife() {
  const reduced = usePrefersReducedMotion();
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animatorRef = useRef<FrameAnimator | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const images: HTMLImageElement[] = [];
    const draw = (frame: number) => {
      const img = images[frame];
      if (!img?.complete || !img.naturalWidth) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth * dpr;
      const h = canvas.clientHeight * dpr;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      ctx.drawImage(img, 0, 0, w, h);
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      img.decode?.().catch(() => {});
      if (i === 0) {
        img.onload = () => {
          draw(0);
          setReady(true);
        };
      }
      images.push(img);
    }

    animatorRef.current = createFrameAnimator({
      frameCount: FRAME_COUNT,
      render: draw,
    });
    return () => {
      animatorRef.current?.destroy();
      animatorRef.current = null;
    };
  }, [reduced]);

  useEffect(() => {
    animatorRef.current?.setProgress(progress);
  }, [progress]);

  const frame = Math.round(clamp(progress, 0, 1) * (FRAME_COUNT - 1));

  if (reduced) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-6 py-8">
        <img
          src={frameSrc(FRAME_COUNT - 1)}
          alt="A dense pink-and-blue bouquet in a sculpted vase, lit warmly against black"
          className="h-[75%] w-auto border border-border object-contain"
        />
        <p className="max-w-sm text-center font-body text-xs leading-relaxed text-foreground/50">
          Reduced motion: the arrangement holds fully grown. With motion enabled,
          scrolling grows a single flower into the whole bouquet.
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <div
        ref={ref}
        tabIndex={0}
        role="region"
        aria-label="Still life — scroll to grow a single flower into a full bouquet"
        className="h-full w-full overflow-y-auto overscroll-contain outline-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-foreground"
      >
        {/* 5x spacer = 4 screens of travel: ~32 frames per screen of scroll */}
        <div className="h-[500%] w-full">
          <div className="sticky top-0 flex h-[20%] flex-col items-center justify-center gap-3 px-6 py-6">
            <div className="relative h-[calc(100%-3.25rem)] max-w-full">
              <div
                className="relative h-full overflow-hidden border border-border bg-background"
                style={{ aspectRatio: "9 / 16" }}
              >
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 h-full w-full transition-opacity duration-300"
                  style={{ opacity: ready ? 1 : 0 }}
                />
              </div>
            </div>

            <div className="flex w-full max-w-[15rem] items-center justify-between gap-3">
              <Readout>{vesselAt(progress)}</Readout>
              <Readout>SSIM 0.9865</Readout>
              <Readout>
                f{String(frame + 1).padStart(3, "0")}/{FRAME_COUNT}
              </Readout>
            </div>
          </div>
        </div>
      </div>

      {progress < 0.03 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/35">
            Scroll to grow the bouquet
          </span>
        </div>
      )}
    </div>
  );
}
