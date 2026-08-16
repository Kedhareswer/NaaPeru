import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useArchiveLenis } from "@/contexts/ArchiveLenisContext";

gsap.registerPlugin(ScrollTrigger);

interface UseArchiveScrollOptions {
  frameCount: number;
}

export function useArchiveScroll({ frameCount }: UseArchiveScrollOptions) {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rewindPinRef = useRef<HTMLDivElement>(null);
  const rewindTrackRef = useRef<HTMLDivElement>(null);
  const { ready } = useArchiveLenis();

  useEffect(() => {
    if (!ready || frameCount === 0) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const pin = pinRef.current;
      const track = trackRef.current;
      const rewindPin = rewindPinRef.current;
      const rewindTrack = rewindTrackRef.current;

      if (pin && track) {
        const getScrollDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${Math.max(window.innerHeight * frameCount * 0.65, window.innerHeight * 2)}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      if (rewindPin && rewindTrack) {
        const getRewindDistance = () => Math.max(0, rewindTrack.scrollWidth - window.innerWidth);

        gsap.fromTo(
          rewindTrack,
          { x: () => -getRewindDistance() },
          {
            x: 0,
            ease: "none",
            scrollTrigger: {
              trigger: rewindPin,
              start: "top top",
              end: () => `+=${Math.max(window.innerHeight * frameCount * 0.5, window.innerHeight * 1.5)}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );
      }
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, [ready, frameCount]);

  return { pinRef, trackRef, rewindPinRef, rewindTrackRef };
}
