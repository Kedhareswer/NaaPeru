/**
 * Process Score — the shared grammar for presenting a project as an
 * ideation-to-outcome artifact instead of a screenshot.
 *
 * Each of the four reference languages becomes one stage, not one style:
 *   provocation  → sparse opening field
 *   analyze      → problem space and constraints
 *   architecture → three-level IA tree
 *   flow         → nodes, decisions, branches
 *   outcome      → numbered annotated screens + metrics
 */

/** Landing renders a condensed spine; case-study renders all five stages. */
export type ProcessDensity = "landing" | "case-study";

/**
 * Node role in the shared vocabulary. Depth reads through fill weight rather
 * than new hues, because the design system allows one red and one dark only.
 */
export type NodeKind = "step" | "decision" | "action";

/** Architecture tree depth. 1 = phase, 2 = step, 3 = artifact. */
export type NodeLevel = 1 | 2 | 3;

export interface TreeNode {
  label: string;
  /** Rendered only at case-study density. */
  note?: string;
  children?: TreeNode[];
}

export interface FlowStepNode {
  label: string;
  kind: NodeKind;
  note?: string;
  /** Decision nodes only: the branch taken when the check fails. */
  fallback?: { label: string; note?: string };
}

export interface AnalyzeNote {
  /** The friction observed. */
  label: string;
  /** Why it mattered enough to design around. */
  detail: string;
}

export interface OutcomeScreen {
  index: string;
  title: string;
  note: string;
  /** Real product screenshot — preferred over abstract skeletons. */
  image?: string;
  imageAlt?: string;
}

export interface Metric {
  value: string;
  label: string;
}

interface StageBase {
  id: string;
  /** Stage counter, e.g. "01". */
  index: string;
  /** Stage name in the grammar, e.g. "Provocation". */
  label: string;
  title: string;
  /** Right-rail why-note. The Vijaya Bank annotation habit. */
  annotation?: string;
}

export type ProcessStage =
  | (StageBase & { kind: "provocation"; line: string; body: string })
  | (StageBase & { kind: "analyze"; notes: AnalyzeNote[] })
  | (StageBase & { kind: "architecture"; root: TreeNode })
  | (StageBase & { kind: "flow"; steps: FlowStepNode[] })
  | (StageBase & { kind: "outcome"; screens: OutcomeScreen[]; metrics: Metric[] });

export interface ProcessScore {
  slug: string;
  /** Project counter on the landing page, e.g. "01". */
  number: string;
  title: string;
  subtitle: string;
  /** Uppercase metadata strip, matching the existing landing page rhythm. */
  meta: string;
  links: {
    caseStudy?: string;
    demo?: string;
    github?: string;
  };
  stages: ProcessStage[];
}

export function stageOf<K extends ProcessStage["kind"]>(
  score: ProcessScore,
  kind: K,
): Extract<ProcessStage, { kind: K }> | undefined {
  return score.stages.find((s): s is Extract<ProcessStage, { kind: K }> => s.kind === kind);
}
