import { useEffect, useRef } from "react";
import { useChat } from "@/contexts/ChatContext";

const FRAME_COUNT = 140;
const frameSrc = (i: number) => `/motion/crow/f${String(i).padStart(3, "0")}.webp`;
/** Exact background of every frame (sampled) — the section bleeds this red so
 *  the canvas has no visible edge and the crow flies in a red room. */
const CLIP_RED = "rgb(255, 1, 0)";

/**
 * Scroll-scrubbed footer for the landing page only. A crow wing-beat loop
 * (Pinterest pin 745064332144889923) rebuilt through the measured pipeline.
 * The page hard-cuts from dark into the clip's own red; scroll owns the
 * wings. Ink flips to black — the clip's two-color system becomes the
 * section's design system.
 */
export const CrowFooter = ({ quote }: { quote?: string }) => {
  const { openChat } = useChat();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const images: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
    let loaded = false;
    let drawnFrame = -1;
    let raf = 0;

    const draw = (index: number) => {
      const img = images[index];
      if (!img?.complete || !img.naturalWidth) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth * dpr;
      const h = canvas.clientHeight * dpr;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      // square frames on a square canvas — plain fit, edges dissolve into the bg
      ctx.drawImage(img, 0, 0, w, h);
      drawnFrame = index;
    };

    const preload = () => {
      if (loaded) return;
      loaded = true;
      const indices = reduced ? [FRAME_COUNT - 1] : [...Array(FRAME_COUNT).keys()];
      indices.forEach((i) => {
        const img = new Image();
        img.src = frameSrc(i);
        img.decode?.().catch(() => {});
        img.onload = () => {
          if (drawnFrame === -1 && (reduced || i === 0)) draw(reduced ? FRAME_COUNT - 1 : 0);
        };
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
      const progress = Math.min(1, Math.max(0, -rect.top / (rect.height - vh)));
      if (!reduced) {
        const frame = Math.round(progress * (FRAME_COUNT - 1));
        if (frame !== drawnFrame) draw(frame);
      }
      if (overlayRef.current) {
        const t = reduced ? 1 : Math.min(1, Math.max(0, (progress - 0.8) / 0.14));
        overlayRef.current.style.opacity = String(t);
        // settle up as it appears — scroll drives it, so the ease lives in the mapping
        overlayRef.current.style.transform = `translateY(${(1 - t) * 12}px)`;
        overlayRef.current.style.pointerEvents = t > 0.5 ? "auto" : "none";
      }
    };
    raf = requestAnimationFrame(tick);

    const onResize = () => drawnFrame >= 0 && draw(drawnFrame);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <footer ref={sectionRef} className="relative h-[300vh]" style={{ backgroundColor: CLIP_RED }}>
      <div
        className="sticky top-0 flex h-screen items-center justify-center overflow-hidden"
        style={{ backgroundColor: CLIP_RED }}
      >
        <canvas ref={canvasRef} className="aspect-square h-[80vh] max-w-[94vw] w-auto" />

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
