import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import type { ProcessDensity, TreeNode } from "@/lib/process/types";

/**
 * Folder-tree architecture — client-folders inspo structure in the dark crimson brand.
 * Proper manila-folder glyphs (tab + body), orthogonal connectors, depth by fill weight.
 */

function FolderIcon({
  level,
  className,
}: {
  level: 1 | 2 | 3;
  className?: string;
}) {
  // Classic tabbed folder: raised tab on the left, rectangular body below.
  const body =
    "M2 11h11l2.5-3.5H38c0.55 0 1 0.45 1 1V27c0 0.55-0.45 1-1 1H2c-0.55 0-1-0.45-1-1V12c0-0.55 0.45-1 1-1z";

  if (level === 1) {
    return (
      <svg
        viewBox="0 0 40 30"
        className={cn("h-9 w-11 shrink-0 drop-shadow-sm", className)}
        aria-hidden
      >
        <path d={body} className="fill-primary" />
        <path
          d="M2 11h10.5l2-2.8H2V11z"
          className="fill-primary-hover"
        />
      </svg>
    );
  }

  if (level === 2) {
    return (
      <svg
        viewBox="0 0 40 30"
        className={cn("h-8 w-10 shrink-0", className)}
        aria-hidden
      >
        <path
          d={body}
          className="fill-primary/15"
          stroke="currentColor"
          strokeWidth="1.4"
          style={{ color: "hsl(var(--primary) / 0.75)" }}
        />
        <path d="M2 11h10.5l2-2.8H2V11z" className="fill-primary/40" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 40 30"
      className={cn("h-5 w-6 shrink-0", className)}
      aria-hidden
    >
      <path
        d={body}
        className="fill-transparent"
        stroke="currentColor"
        strokeWidth="1.35"
        style={{ color: "hsl(var(--foreground) / 0.4)" }}
      />
    </svg>
  );
}

export function ProcessTree({
  root,
  density = "case-study",
  className,
}: {
  root: TreeNode;
  density?: ProcessDensity;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const pillars = root.children ?? [];
  const showNotes = density === "case-study";
  const n = Math.max(pillars.length, 1);

  return (
    <div
      ref={ref}
      className={cn(
        "border border-border/15 bg-card/20 p-5 md:p-8",
        className,
      )}
    >
      {/* Level 1 — root folder */}
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center gap-2"
        >
          <FolderIcon level={1} />
          <span className="bg-primary px-4 py-1.5 font-heading text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground">
            {root.label}
          </span>
        </motion.div>

        {/* Vertical drop from root to the horizontal spine */}
        <span aria-hidden className="mt-2 h-5 w-px bg-foreground/30" />
      </div>

      {/* Orthogonal tree: horizontal spine + per-column drops */}
      <div className="relative">
        {pillars.length > 1 && (
          <span
            aria-hidden
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-0 hidden h-px bg-foreground/30 lg:block"
          />
        )}

        <div
          className={cn(
            "grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2",
            n >= 4 ? "lg:grid-cols-4" : n === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2",
          )}
        >
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.45,
                delay: 0.1 + i * 0.09,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative flex flex-col items-center"
            >
              {/* Drop from horizontal spine into this pillar */}
              <span
                aria-hidden
                className="mb-3 hidden h-5 w-px bg-foreground/30 lg:block"
              />

              <div className="flex w-full flex-col items-center gap-2">
                <FolderIcon level={2} />
                <p className="text-center font-heading text-sm font-bold uppercase tracking-[0.08em] text-foreground">
                  {pillar.label}
                </p>
                {showNotes && pillar.note && (
                  <p className="text-center font-body text-[9px] uppercase tracking-[0.14em] text-primary/65">
                    {pillar.note}
                  </p>
                )}
              </div>

              {/* Level 3 — leaf folders with L-connectors */}
              {pillar.children && pillar.children.length > 0 && (
                <ul className="mt-4 w-full space-y-0">
                  {pillar.children.map((leaf, li) => {
                    const isLast = li === (pillar.children?.length ?? 0) - 1;
                    return (
                      <li key={leaf.label} className="relative flex items-stretch gap-0 pl-3">
                        {/* Orthogonal L-bracket */}
                        <span aria-hidden className="relative mr-2 w-4 shrink-0">
                          <span
                            className={cn(
                              "absolute left-0 top-0 w-px bg-foreground/25",
                              isLast ? "h-1/2" : "h-full",
                            )}
                          />
                          <span className="absolute left-0 top-1/2 h-px w-full bg-foreground/25" />
                        </span>
                        <div className="flex min-w-0 flex-1 items-center gap-2.5 py-1.5">
                          <FolderIcon level={3} />
                          <p className="font-body text-[11px] uppercase leading-snug tracking-[0.04em] text-foreground/65">
                            {leaf.label}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
