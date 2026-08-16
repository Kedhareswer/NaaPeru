import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Seo } from "@/components/Seo";
import { ProcessScene } from "@/components/process";
import { PROCESS_SCORES } from "@/lib/process/scores";
import type { ProcessDensity } from "@/lib/process/types";
import { cn } from "@/lib/utils";

/**
 * Lab: Process Score.
 * Preview of the three featured projects presented as ideation-to-outcome
 * artifacts. Nothing on "/" or in the case studies changes until this direction
 * is approved — the toggle shows both intended destinations.
 */

const LEGEND = [
  { kind: "step", label: "Step", note: "a screen or a state" },
  { kind: "action", label: "Action", note: "the system doing work" },
  { kind: "decision", label: "Decision", note: "a branch in the path" },
] as const;

function GrammarLegend() {
  return (
    <div className="mb-16 border border-border/15 bg-card/20 p-5 md:p-6">
      <p className="mb-4 font-body text-[10px] uppercase tracking-[0.35em] text-foreground/40">
        Shared vocabulary
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {LEGEND.map((item) => (
          <div key={item.kind} className="flex items-start gap-2.5">
            {item.kind === "decision" ? (
              <span aria-hidden className="mt-[5px] inline-block h-2 w-2 shrink-0 rotate-45 border border-primary/70" />
            ) : item.kind === "action" ? (
              <span aria-hidden className="mt-[7px] inline-block h-2 w-2 shrink-0 bg-primary" />
            ) : (
              <span aria-hidden className="mt-[7px] inline-block h-2 w-2 shrink-0 border border-foreground/35" />
            )}
            <div>
              <p className="font-body text-xs font-medium text-foreground">{item.label}</p>
              <p className="font-body text-[11px] text-foreground/45">{item.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const LabProcess = () => {
  const [density, setDensity] = useState<ProcessDensity>("landing");

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Lab — Process Score | Kedhar"
        description="Preview: the three featured projects presented as ideation-to-outcome process artifacts."
        path="/lab/process"
        noindex
      />
      <Navigation />

      <main className="pb-40 pt-28 md:pt-32">
        <div className="container-portfolio">
          <header className="mb-12 max-w-2xl">
            <p className="mb-3 font-body text-[10px] uppercase tracking-[0.35em] text-primary/70">
              Lab · Preview
            </p>
            <div className="mb-5 h-[2px] w-8 bg-primary" />
            <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              Process Score
            </h1>
            <p className="mt-4 font-body text-sm leading-relaxed text-foreground/60 md:text-base">
              The same three projects, presented as the path from provocation to outcome instead of
              a screenshot. One shared grammar across all three: five stages, three node types, and
              depth encoded by fill weight rather than by new colours.
            </p>
            <p className="mt-3 font-body text-xs leading-relaxed text-foreground/40">
              Nothing on the live landing page or the case studies has changed. Use the toggle to
              see how the same score serves both.
            </p>
          </header>

          <GrammarLegend />

          <div className="space-y-20 md:space-y-28">
            {PROCESS_SCORES.map((score, i) => (
              <div key={score.slug}>
                {i > 0 && <div aria-hidden className="mb-20 h-px bg-border/20 md:mb-28" />}
                <ProcessScene score={score} density={density} />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Control bar — matches the existing lab convention */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] border-t border-border/20 bg-background/90 px-4 py-4 backdrop-blur-sm sm:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="font-body text-[10px] uppercase tracking-[0.35em] text-foreground/45">
            Density · {density === "landing" ? "landing page" : "case study"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {(["landing", "case-study"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setDensity(option)}
                aria-pressed={density === option}
                className={cn(
                  "border px-5 py-2.5 font-body text-[10px] uppercase tracking-[0.25em] transition-colors duration-normal",
                  density === option
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/40 text-foreground/80 hover:border-primary/50 hover:text-foreground",
                )}
              >
                {option === "landing" ? "Landing" : "Case study"}
              </button>
            ))}
            <Link
              to="/"
              className="px-3 py-2.5 font-body text-[10px] uppercase tracking-[0.25em] text-foreground/40 transition-colors hover:text-foreground/70"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabProcess;
