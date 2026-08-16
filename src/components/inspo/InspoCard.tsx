import { Link } from "react-router-dom";
import type { InspoEntry } from "@/lib/inspo/types";

interface InspoCardProps {
  entry: InspoEntry;
  index: number;
  total: number;
  categoryLabel: string;
}

const VISIBLE_TAGS = 3;

export function InspoCard({
  entry,
  index,
  total,
  categoryLabel,
}: InspoCardProps) {
  const visible = entry.tags.slice(0, VISIBLE_TAGS);
  const overflow = entry.tags.length - visible.length;
  const pad = String(index + 1).padStart(2, "0");
  const totalPad = String(total).padStart(2, "0");

  return (
    <Link
      to={`/inspo/${entry.slug}`}
      className="group flex flex-col border border-inspo-ink bg-inspo-paper transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#111]"
    >
      <div className="border-b border-inspo-ink bg-inspo-stock">
        <img
          src={entry.thumbnail}
          alt=""
          className="aspect-[3/2] w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-inspo-serif text-2xl leading-none tracking-tight text-inspo-ink sm:text-[1.75rem]">
            {entry.title}
          </h2>
          <p className="shrink-0 text-right font-inspo-mono text-[10px] uppercase tracking-[0.06em] text-inspo-ink/55 sm:text-[11px]">
            {entry.tagline}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {visible.map((tag) => (
            <span
              key={tag}
              className="border border-inspo-ink/40 bg-inspo-stock/80 px-2 py-1 font-inspo-mono text-[9px] uppercase tracking-[0.04em] text-inspo-ink/80 sm:text-[10px]"
            >
              {tag}
            </span>
          ))}
          {overflow > 0 && (
            <span className="border border-inspo-ink/25 px-2 py-1 font-inspo-mono text-[9px] text-inspo-ink/45 sm:text-[10px]">
              +{overflow}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="inline-flex items-center gap-2 font-inspo-mono text-[10px] uppercase tracking-[0.1em] text-inspo-coral sm:text-[11px]">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rotate-45 bg-inspo-coral"
            />
            {categoryLabel}
          </span>
          <span className="font-inspo-mono text-[10px] tabular-nums tracking-wider text-inspo-ink/50 sm:text-[11px]">
            {pad} / {totalPad}
          </span>
        </div>
      </div>
    </Link>
  );
}
