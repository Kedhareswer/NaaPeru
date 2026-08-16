import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SectionReveal } from "./SectionReveal";
import { FigureMedia, Caption, type MediaSource } from "./Figure";

/**
 * Two-up / three-up media comparison with a single shared caption.
 * (pi.website's source-vs-target / before-after layout.)
 */
export function FigureRow({
  items,
  caption,
  className,
}: {
  items: MediaSource[];
  caption?: ReactNode;
  className?: string;
}) {
  const cols = items.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2";
  return (
    <SectionReveal className={className}>
      <figure>
        <div className={cn("grid grid-cols-1 gap-3", cols)}>
          {items.map((it, i) => (
            <FigureMedia key={i} {...it} />
          ))}
        </div>
        {caption && <Caption>{caption}</Caption>}
      </figure>
    </SectionReveal>
  );
}
