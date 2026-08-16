import { useEffect, useMemo, useRef, useState } from "react";
import { Readout, useScrollProgress, usePrefersReducedMotion, clamp } from "./_shared";
import {
  createFrameAnimator,
  createVideoSeekRenderer,
  type FrameAnimator,
} from "@/lib/motion/interactiveMotion";

/**
 * Magic hour — a Pinterest cinemagraph (giant sun, silhouetted figure and car,
 * a full night passing) recompiled through the oil-motion pipeline into an
 * all-keyframe scrub video. Scroll owns the timeline: no autoplay, ever.
 */

const FPS = 48;
const SRC_DESKTOP = "/motion/magic-hour/scrub-desktop.mp4";
const SRC_MOBILE = "/motion/magic-hour/scrub-mobile.mp4";
const POSTER = "/motion/magic-hour/poster.jpg";

/** Scroll 0..1 mapped onto the night: dusk 18:30 through to dawn 06:12. */
function clockAt(progress: number) {
  const start = 18.5 * 60;
  const span = 702; // minutes from 18:30 to 06:12
  const minutes = Math.round(start + progress * span) % 1440;
  const hh = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mm = String(minutes % 60).padStart(2, "0");
  return `${hh}:${mm}`;
}

export default function MagicHour() {
  const reduced = usePrefersReducedMotion();
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const animatorRef = useRef<FrameAnimator | null>(null);
  const [ready, setReady] = useState(false);
  const [frameCount, setFrameCount] = useState(0);

  const src = useMemo(
    () => (window.matchMedia("(max-width: 640px)").matches ? SRC_MOBILE : SRC_DESKTOP),
    [],
  );

  useEffect(() => {
    if (reduced) return;
    const video = videoRef.current;
    if (!video) return;

    let renderer: ReturnType<typeof createVideoSeekRenderer> | null = null;

    const onLoaded = () => {
      const frames = Math.max(1, Math.round(video.duration * FPS));
      setFrameCount(frames);
      renderer = createVideoSeekRenderer(video, FPS);
      animatorRef.current = createFrameAnimator({
        frameCount: frames,
        // scrubbing a decoder: cap chase speed so fast flicks skim, not queue
        maxSpeed: FPS * 4,
        render: renderer.render,
      });
      setReady(true);
    };

    if (video.readyState >= 2) onLoaded();
    else video.addEventListener("loadeddata", onLoaded, { once: true });

    return () => {
      video.removeEventListener("loadeddata", onLoaded);
      animatorRef.current?.destroy();
      animatorRef.current = null;
      renderer?.destroy();
    };
  }, [reduced]);

  useEffect(() => {
    animatorRef.current?.setProgress(progress);
  }, [progress]);

  // White balance drifts toward moonlight at the middle of the night and back.
  const kelvin = Math.round(2400 + 3200 * Math.sin(clamp(progress, 0, 1) * Math.PI));
  const frame = frameCount ? Math.round(progress * (frameCount - 1)) : 0;

  if (reduced) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-6 py-8">
        <img
          src={POSTER}
          alt="A silhouetted figure and car on a ridge in front of a giant setting sun"
          className="h-[75%] w-auto border border-border object-contain"
        />
        <p className="max-w-sm text-center font-body text-xs leading-relaxed text-foreground/50">
          Reduced motion: the scene holds at dusk. With motion enabled, scrolling
          scrubs the whole night — sunset, moonrise, dawn.
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
        aria-label="Magic hour — scroll to move the sky through a full night"
        className="h-full w-full overflow-y-auto overscroll-contain outline-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-foreground"
      >
        {/* 5x spacer = 4 screens of travel: ~120 frames per screen of scroll */}
        <div className="h-[500%] w-full">
          <div className="sticky top-0 flex h-[20%] flex-col items-center justify-center gap-3 px-6 py-6">
            <div className="relative h-[calc(100%-3.25rem)] max-w-full">
              <div className="relative h-full overflow-hidden border border-border bg-background" style={{ aspectRatio: "9 / 16" }}>
                {/* Poster sits underneath until the first frame is decodable */}
                <img
                  src={POSTER}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <video
                  ref={videoRef}
                  src={src}
                  muted
                  playsInline
                  preload="auto"
                  disablePictureInPicture
                  aria-label="A silhouetted figure and car on a ridge; the sun sets, a moon crosses the sky, dawn returns"
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
                  style={{ opacity: ready ? 1 : 0 }}
                />
              </div>
            </div>

            <div className="flex w-full max-w-[15rem] items-center justify-between gap-3">
              <Readout>{clockAt(progress)}</Readout>
              <Readout>{kelvin}K</Readout>
              <Readout>
                f{String(frame + 1).padStart(3, "0")}
                {frameCount ? `/${frameCount}` : ""}
              </Readout>
            </div>
          </div>
        </div>
      </div>

      {progress < 0.03 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/35">
            Scroll to turn the sky
          </span>
        </div>
      )}
    </div>
  );
}
