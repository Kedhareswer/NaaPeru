import { cn } from "@/lib/utils";
import type { InspoCategory } from "@/lib/inspo/types";

interface InspoFiltersProps {
  categories: InspoCategory[];
  counts: Record<string, number>;
  active: string;
  onChange: (id: string) => void;
}

export function InspoFilters({
  categories,
  counts,
  active,
  onChange,
}: InspoFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const isActive = active === cat.id;
        const count = counts[cat.id] ?? 0;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onChange(cat.id)}
            className={cn(
              "inline-flex items-center gap-2 border border-inspo-ink px-3 py-2 font-inspo-mono text-[10px] uppercase tracking-[0.14em] transition-colors sm:text-[11px]",
              isActive
                ? "bg-inspo-ink text-inspo-paper"
                : "bg-transparent text-inspo-ink hover:bg-inspo-ink/5",
            )}
          >
            {cat.accent && !isActive && (
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rotate-45 bg-inspo-coral"
              />
            )}
            <span>{cat.label}</span>
            <span
              className={cn(
                "tabular-nums",
                isActive ? "text-inspo-paper/70" : "text-inspo-coral",
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
