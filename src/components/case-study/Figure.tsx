import { useEffect, useRef, type ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { SectionReveal } from "./SectionReveal";

export type MediaSource = {
  image?: string;
  alt?: string;
  /** mp4 source */
  video?: string;
  /** optional webm source, rendered first for smaller payloads */
  videoWebm?: string;
  poster?: string;
  /** CSS aspect-ratio string, e.g. "16 / 9". If omitted, image keeps natural height. */
  aspect?: string;
};

/**
 * Raw media frame (no caption). Images get a one-time "settle" zoom on reveal.
 * Videos autoplay muted/looping ONLY while in view (pi.website's behaviour),
 * and respect prefers-reduced-motion.
 */
export function FigureMedia({ image, alt = "", video, videoWebm, poster, aspect }: MediaSource) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // leave paused on poster
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const frame = "relative overflow-hidden border border-border/15 bg-card/20";
  const style = aspect ? { aspectRatio: aspect } : undefined;

  if (video) {
    return (
      <div className={frame} style={style}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={alt}
        >
          {videoWebm && <source src={videoWebm} type="video/webm" />}
          <source src={video} type="video/mp4" />
        </video>
      </div>
    );
  }

  return (
    <div className={frame} style={style}>
      <motion.img
        src={image}
        alt={alt}
        loading="lazy"
        className={cn("block w-full", aspect ? "h-full object-cover" : "h-auto")}
        initial={{ scale: 1.06, opacity: 0.35 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </div>
  );
}

/** Muted descriptive caption — the pi.website device where captions carry the evidence. */
export function Caption({ index, children }: { index?: string; children: ReactNode }) {
  return (
    <figcaption className="mt-3 max-w-[680px] font-body text-xs leading-relaxed tracking-wide text-foreground/45">
      {index && <span className="mr-2 font-medium text-primary/70">{index}</span>}
      {children}
    </figcaption>
  );
}

const layoutClass = {
  full: "w-full",
  wide: "w-full",
  inset: "max-w-[880px] mx-auto",
} as const;

/** Captioned figure = the atomic "claim → evidence → caption" unit. */
export function Figure({
  caption,
  index,
  layout = "full",
  className,
  ...media
}: MediaSource & {
  caption?: ReactNode;
  index?: string;
  layout?: keyof typeof layoutClass;
  className?: string;
}) {
  return (
    <SectionReveal className={className}>
      <figure className={layoutClass[layout]}>
        <FigureMedia {...media} />
        {caption && <Caption index={index}>{caption}</Caption>}
      </figure>
    </SectionReveal>
  );
}
