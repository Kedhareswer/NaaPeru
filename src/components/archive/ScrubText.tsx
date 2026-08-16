import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ScrubTextProps {
  text: string;
  className?: string;
  as?: "p" | "h2" | "h3";
  start?: string;
  end?: string;
}

export function ScrubText({
  text,
  className,
  as: Tag = "p",
  start = "top 85%",
  end = "top 35%",
}: ScrubTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLElement>(".scrub-word");
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: 0.6,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [text, start, end]);

  return (
    <Tag ref={ref as never} className={cn(className)}>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="scrub-word mr-[0.28em] inline-block">
          {word}
        </span>
      ))}
    </Tag>
  );
}
