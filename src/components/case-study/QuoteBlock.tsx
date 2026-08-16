import { type ReactNode } from "react";

/** Pull-quote figure with a small monogram avatar — your existing Results pattern. */
export function QuoteBlock({
  quote,
  name,
  role,
  initial = "K",
}: {
  quote: ReactNode;
  name: string;
  role?: string;
  initial?: string;
}) {
  return (
    <figure className="border border-border/15 bg-card/30 p-8 md:p-10">
      <blockquote className="font-body text-base md:text-lg text-foreground/80 italic leading-relaxed mb-6 pl-5 border-l-2 border-primary/60">
        {quote}
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <div className="w-8 h-8 border border-primary/30 bg-primary/10 flex items-center justify-center font-heading text-xs font-bold text-primary">
          {initial}
        </div>
        <div>
          <p className="font-body text-sm font-medium text-foreground">{name}</p>
          {role && <p className="font-body text-[9px] uppercase tracking-[0.25em] text-foreground/40">{role}</p>}
        </div>
      </figcaption>
    </figure>
  );
}
