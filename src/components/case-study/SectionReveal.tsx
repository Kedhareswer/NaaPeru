import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/**
 * Scroll-triggered reveal used across all case-study sections.
 * Extracted from the per-page duplicate so every page animates identically.
 */
export function SectionReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, y: 24, filter: "blur(6px)" }
      }
      animate={
        inView
          ? reduce
            ? { opacity: 1 }
            : { opacity: 1, y: 0, filter: "blur(0px)" }
          : {}
      }
      transition={{
        duration: reduce ? 0.3 : 0.65,
        delay: reduce ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
