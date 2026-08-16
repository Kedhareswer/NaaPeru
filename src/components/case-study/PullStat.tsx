import { cn } from "@/lib/utils";

/**
 * Oversized "anchor stat" callout for use between prose blocks
 * (pi.website's concrete-number device, e.g. "375 hours"), in crimson.
 */
export function PullStat({
  value,
  label,
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("my-10 border-l-2 border-primary pl-5", className)}>
      <div className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-primary leading-none">
        {value}
      </div>
      {label && (
        <p className="mt-3 font-body text-[11px] uppercase tracking-[0.3em] text-foreground/50 max-w-[360px] leading-relaxed">
          {label}
        </p>
      )}
    </div>
  );
}
