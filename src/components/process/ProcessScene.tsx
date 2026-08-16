import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/TransitionLink";
import { SectionReveal } from "@/components/case-study/SectionReveal";
import { ProcessStage } from "./ProcessStage";
import { ProcessTree } from "./ProcessTree";
import { ProcessFlow } from "./ProcessFlow";
import { ProcessOutcome } from "./ProcessOutcome";
import { stageOf, type AnalyzeNote, type ProcessDensity, type ProcessScore } from "@/lib/process/types";

/** The analyze stage — friction on the left, why it mattered on the right. */
function AnalyzeNotes({ notes, density }: { notes: AnalyzeNote[]; density: ProcessDensity }) {
  return (
    <ul className="grid grid-cols-1 gap-px border border-border/15 bg-border/15 md:grid-cols-2">
      {notes.map((note) => (
        <li key={note.label} className="bg-background p-4 md:p-5">
          <div className="flex items-start gap-2.5">
            <span aria-hidden className="mt-[7px] inline-block h-2 w-2 shrink-0 rotate-45 bg-primary" />
            <div className="min-w-0">
              <p className="font-body text-sm font-medium leading-snug text-foreground">
                {note.label}
              </p>
              {density === "case-study" && (
                <p className="mt-1.5 font-body text-xs leading-relaxed text-foreground/50">
                  {note.detail}
                </p>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Masthead shared by both densities. */
function SceneHeader({ score }: { score: ProcessScore }) {
  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center gap-4">
        <span className="font-heading text-xs font-bold text-primary">{score.number}</span>
        <span aria-hidden className="h-px flex-1 bg-border/25" />
        <span className="font-body text-[10px] uppercase tracking-[0.2em] text-foreground/40 md:text-xs">
          {score.meta}
        </span>
      </div>
      <h2 className="font-heading text-2xl font-normal text-foreground md:text-3xl lg:text-4xl">
        {score.title}
      </h2>
      <p className="mt-1 font-body text-sm text-foreground/60 md:text-base">{score.subtitle}</p>
    </div>
  );
}

function SceneLinks({ score }: { score: ProcessScore }) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      {score.links.caseStudy && (
        <TransitionLink
          to={score.links.caseStudy}
          className="border border-primary bg-primary px-5 py-2.5 font-body text-[10px] uppercase tracking-[0.25em] text-primary-foreground transition-transform duration-normal hover:-translate-y-0.5"
        >
          Read the full process
        </TransitionLink>
      )}
      {score.links.demo && (
        <a
          href={score.links.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border border-border/40 px-5 py-2.5 font-body text-[10px] uppercase tracking-[0.25em] text-foreground/80 transition-colors duration-normal hover:border-primary/50 hover:text-foreground"
        >
          Live demo
          <ExternalLink className="h-3 w-3" />
        </a>
      )}
    </div>
  );
}

/**
 * One project rendered as a process score.
 *
 * landing     — provocation, the flow spine, the metrics. The flow replaces
 *               the screenshot as the thing you actually look at.
 * case-study  — all five stages with annotation rails.
 */
export function ProcessScene({
  score,
  density = "case-study",
  className,
}: {
  score: ProcessScore;
  density?: ProcessDensity;
  className?: string;
}) {
  const provocation = stageOf(score, "provocation");
  const analyze = stageOf(score, "analyze");
  const architecture = stageOf(score, "architecture");
  const flow = stageOf(score, "flow");
  const outcome = stageOf(score, "outcome");

  if (density === "landing") {
    return (
      <article className={cn("group", className)}>
        <SceneHeader score={score} />

        {provocation && (
          <SectionReveal className="mb-8 border-l-2 border-primary pl-5 md:pl-6">
            <p className="font-heading text-xl font-normal leading-snug text-foreground md:text-2xl lg:text-[1.75rem]">
              {provocation.line}
            </p>
            <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-foreground/55">
              {provocation.body}
            </p>
          </SectionReveal>
        )}

        {flow && (
          <div className="mb-6">
            <p className="mb-3 font-body text-[10px] uppercase tracking-[0.35em] text-foreground/40">
              The path, end to end
            </p>
            <ProcessFlow steps={flow.steps} density="landing" />
          </div>
        )}

        {outcome && (
          <ProcessOutcome screens={outcome.screens} metrics={outcome.metrics} density="landing" />
        )}

        <SceneLinks score={score} />
      </article>
    );
  }

  return (
    <article className={cn("space-y-8 md:space-y-10", className)}>
      <SceneHeader score={score} />

      {provocation && (
        <ProcessStage
          index={provocation.index}
          label={provocation.label}
          title={provocation.title}
          annotation={provocation.annotation}
        >
          <div className="border-l-2 border-primary pl-5 md:pl-6">
            <p className="font-heading text-xl font-normal leading-snug text-foreground md:text-2xl">
              {provocation.line}
            </p>
            <p className="mt-3 font-body text-sm leading-relaxed text-foreground/55">
              {provocation.body}
            </p>
          </div>
        </ProcessStage>
      )}

      {analyze && (
        <ProcessStage
          index={analyze.index}
          label={analyze.label}
          title={analyze.title}
          annotation={analyze.annotation}
        >
          <AnalyzeNotes notes={analyze.notes} density="case-study" />
        </ProcessStage>
      )}

      {architecture && (
        <ProcessStage
          index={architecture.index}
          label={architecture.label}
          title={architecture.title}
          annotation={architecture.annotation}
        >
          <ProcessTree root={architecture.root} />
        </ProcessStage>
      )}

      {flow && (
        <ProcessStage
          index={flow.index}
          label={flow.label}
          title={flow.title}
          annotation={flow.annotation}
        >
          <ProcessFlow steps={flow.steps} />
        </ProcessStage>
      )}

      {outcome && (
        <ProcessStage
          index={outcome.index}
          label={outcome.label}
          title={outcome.title}
          annotation={outcome.annotation}
        >
          <ProcessOutcome screens={outcome.screens} metrics={outcome.metrics} />
          <SceneLinks score={score} />
        </ProcessStage>
      )}
    </article>
  );
}
