import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SectionReveal } from "./SectionReveal";

export type Cta = {
  label: string;
  href: string;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
  large?: boolean;
};

/** Shared CTA anchor — primary (filled crimson) or secondary (outline). */
export function CtaButton({ label, href, icon, variant = "primary", large = false }: Cta) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 font-body text-xs font-bold uppercase tracking-[0.25em]",
        "transition-[transform,background-color,border-color,color,filter] duration-500",
        "[transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
        "hover:scale-[0.97] active:scale-[0.94] hover:brightness-105",
        large ? "px-8 py-4" : "px-6 py-3",
        variant === "primary"
          ? "bg-primary text-background hover:bg-primary/90"
          : "border border-border/40 text-foreground hover:border-primary/50 hover:bg-card/40"
      )}
    >
      {icon}
      {label}
    </a>
  );
}

/** Closing call-to-action section with top divider. */
export function CaseStudyCTA({
  eyebrow = "Next Step",
  title,
  subtitle,
  ctas = [],
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  ctas?: Cta[];
}) {
  return (
    <section className="container-portfolio lg:ml-64">
      <SectionReveal>
        <div className="border-t border-border/15 pt-16 pb-16">
          <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary/70 mb-3">{eyebrow}</p>
          <div className="w-8 h-[2px] bg-primary mb-6" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">{title}</h2>
          {subtitle && <p className="font-body text-sm text-foreground/60 mb-8 max-w-[440px] leading-relaxed">{subtitle}</p>}
          {ctas.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {ctas.map((c) => (
                <CtaButton key={c.label} {...c} large />
              ))}
            </div>
          )}
        </div>
      </SectionReveal>
    </section>
  );
}
