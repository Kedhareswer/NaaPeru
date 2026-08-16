import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Long-form narrative column in a comfortable reading measure (~680px).
 * This is the pi.website "prose rhythm" upgrade — adapted to Inter, no new font.
 * Pass <p> children; the first paragraph renders larger when `lead` is set.
 */
export function Prose({
  children,
  lead = false,
  className,
}: {
  children: ReactNode;
  lead?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-[680px] space-y-5 font-body text-foreground/75",
        "[&>p]:text-[15px] [&>p]:md:text-[17px] [&>p]:leading-[1.8]",
        "[&_strong]:font-semibold [&_strong]:text-foreground",
        "[&_em]:not-italic [&_em]:text-primary",
        "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-primary/40 hover:[&_a]:decoration-primary",
        lead &&
          "[&>p:first-of-type]:text-lg [&>p:first-of-type]:md:text-xl [&>p:first-of-type]:text-foreground/90 [&>p:first-of-type]:leading-[1.7]",
        className
      )}
    >
      {children}
    </div>
  );
}
