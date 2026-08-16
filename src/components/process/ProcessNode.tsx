import { cn } from "@/lib/utils";
import type { NodeKind } from "@/lib/process/types";

/**
 * The node vocabulary, locked once so every diagram reads as one language.
 *
 *   step     neutral elevated surface  — a screen or a state
 *   action   crimson chip              — the system doing work
 *   decision hairline + diamond glyph  — a branch in the path
 *
 * Long decision labels ("Does the context support an answer?") do not fit
 * inside a literal rotated diamond at web scale, so the diamond survives as a
 * marker glyph while the box stays readable.
 */

const kindStyles: Record<NodeKind, string> = {
  step: "border-border/30 bg-surface-elevated/70",
  action: "border-primary/45 bg-primary/10",
  decision: "border-dashed border-border/45 bg-background/40",
};

export function NodeMarker({ kind }: { kind: NodeKind }) {
  if (kind === "decision") {
    return <span aria-hidden className="mt-[5px] inline-block h-2 w-2 shrink-0 rotate-45 border border-primary/70" />;
  }
  if (kind === "action") {
    return <span aria-hidden className="mt-[7px] inline-block h-2 w-2 shrink-0 bg-primary" />;
  }
  return <span aria-hidden className="mt-[7px] inline-block h-2 w-2 shrink-0 border border-foreground/35" />;
}

export function ProcessNode({
  label,
  kind,
  note,
  muted = false,
  className,
}: {
  label: string;
  kind: NodeKind;
  note?: string;
  /** Fallback branches sit visually behind the main path. */
  muted?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border p-3 md:p-4 transition-colors duration-normal",
        kindStyles[kind],
        muted && "opacity-70",
        className,
      )}
    >
      <div className="flex items-start gap-2.5">
        <NodeMarker kind={kind} />
        <div className="min-w-0">
          <p
            className={cn(
              "font-body text-xs font-medium leading-snug md:text-sm",
              kind === "action" ? "text-foreground" : "text-foreground/90",
            )}
          >
            {label}
          </p>
          {note && (
            <p className="mt-1.5 font-body text-[11px] leading-relaxed text-foreground/45">{note}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/** Vertical connector between two nodes on the main path. */
export function NodeConnector({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 py-1.5 pl-[9px]">
      <span aria-hidden className="h-5 w-px bg-primary/40" />
      {label && (
        <span className="font-body text-[9px] uppercase tracking-[0.2em] text-primary/60">{label}</span>
      )}
    </div>
  );
}
