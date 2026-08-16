import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { CtaButton, type Cta } from "./CaseStudyCTA";

export type HeroMeta = { label: string; value: string };

/**
 * Case-study masthead: back link, eyebrow, red rule, ghost watermark, title,
 * one-line THESIS claim (the pi.website "lead with the result" move), CTAs, metadata grid.
 */
export function CaseStudyHero({
  id = "overview",
  ghost,
  eyebrow,
  title,
  thesis,
  ctas = [],
  meta = [],
  backHref = "/",
  backLabel = "Work",
}: {
  id?: string;
  ghost?: string;
  eyebrow: string;
  title: ReactNode;
  thesis: ReactNode;
  ctas?: Cta[];
  meta?: HeroMeta[];
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <section id={id} className="container-portfolio mb-16 lg:ml-64 relative overflow-hidden">
      {ghost && (
        <div
          className="absolute top-0 right-[-1rem] font-heading font-bold text-[clamp(5rem,14vw,14rem)] leading-none text-white/[0.025] select-none pointer-events-none tracking-tighter"
          aria-hidden="true"
        >
          {ghost}
        </div>
      )}

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
        <Link
          to={backHref}
          className="inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.3em] text-foreground/40 hover:text-primary transition-colors mb-12"
        >
          <ArrowLeft className="w-3 h-3" />
          {backLabel}
        </Link>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary/70 mb-3">{eyebrow}</p>
        <div className="w-10 h-[2px] bg-primary mb-6" />
        <h1 className="font-heading text-[clamp(2.8rem,7vw,6.5rem)] font-bold tracking-tight leading-[1.0] text-foreground mb-5">
          {title}
        </h1>
        <p className="font-body text-base md:text-lg text-foreground/65 max-w-[560px] leading-relaxed mb-10">{thesis}</p>
      </motion.div>

      {ctas.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {ctas.map((c) => (
            <CtaButton key={c.label} {...c} />
          ))}
        </motion.div>
      )}

      {meta.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border/15"
        >
          {meta.map((m) => (
            <div key={m.label}>
              <p className="font-body text-[9px] uppercase tracking-[0.35em] text-foreground/40 mb-1">{m.label}</p>
              <p className="font-heading text-sm font-semibold text-foreground">{m.value}</p>
            </div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
