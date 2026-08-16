import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Eyebrow + red rule + heading (+ optional subtitle).
 * The repeated section-intro pattern, in your existing label/heading style.
 */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("mb-10", align === "center" && "text-center", className)}>
      <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary/70 mb-3">{eyebrow}</p>
      <div className={cn("w-8 h-[2px] bg-primary mb-5", align === "center" && "mx-auto")} />
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3 font-body text-sm text-foreground/60 max-w-[440px] leading-relaxed",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
