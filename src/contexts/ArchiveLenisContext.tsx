import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";
import { formatTimecode } from "@/lib/archive/projects";

gsap.registerPlugin(ScrollTrigger);

interface ArchiveLenisContextValue {
  progress: number;
  timecode: string;
  ready: boolean;
}

const ArchiveLenisContext = createContext<ArchiveLenisContextValue>({
  progress: 0,
  timecode: "00:00:00:00",
  ready: false,
});

export function ArchiveLenisProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [timecode, setTimecode] = useState("00:00:00:00");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        setProgress(p);
        setTimecode(formatTimecode(p));
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      setReady(true);
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });

    lenis.on("scroll", (instance: Lenis) => {
      ScrollTrigger.update();
      const p = instance.progress;
      setProgress(p);
      setTimecode(formatTimecode(p));
    });

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    setReady(true);

    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <ArchiveLenisContext.Provider value={{ progress, timecode, ready }}>
      {children}
    </ArchiveLenisContext.Provider>
  );
}

export function useArchiveLenis() {
  return useContext(ArchiveLenisContext);
}
