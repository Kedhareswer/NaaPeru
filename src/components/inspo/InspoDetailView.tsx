import { Link } from "react-router-dom";
import type { InspoEntry } from "@/lib/inspo/types";
import { cn } from "@/lib/utils";

interface InspoDetailViewProps {
  entry: InspoEntry;
  categoryLabel: string;
  index: number;
  total: number;
  prevSlug?: string;
  nextSlug?: string;
}

const verdictStyles = {
  strong: "text-inspo-ink border-inspo-ink bg-inspo-stock",
  mixed: "text-inspo-coral border-inspo-coral/40",
  weak: "text-inspo-ink/50 border-inspo-ink/30",
} as const;

export function InspoDetailView({
  entry,
  categoryLabel,
  index,
  total,
  prevSlug,
  nextSlug,
}: InspoDetailViewProps) {
  const fullShots = entry.screenshots.filter((s) => s.kind === "full");
  const detailShots = entry.screenshots.filter((s) => s.kind === "detail");
  const pad = String(index + 1).padStart(2, "0");
  const totalPad = String(total).padStart(2, "0");

  return (
    <article className="mx-auto max-w-[1440px] px-4 pb-24 pt-8 sm:px-6 md:px-10">
      {/* Breadcrumb / meta */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-inspo-ink pb-4">
        <Link
          to="/inspo"
          className="font-inspo-mono text-[11px] uppercase tracking-[0.16em] text-inspo-ink/55 transition-colors hover:text-inspo-ink"
        >
          ← Library
        </Link>
        <div className="flex items-center gap-4 font-inspo-mono text-[11px] uppercase tracking-[0.12em]">
          <span className="inline-flex items-center gap-2 text-inspo-coral">
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-inspo-coral" />
            {categoryLabel}
          </span>
          <span className="tabular-nums text-inspo-ink/45">
            {pad} / {totalPad}
          </span>
        </div>
      </div>

      {/* Hero */}
      <header className="mb-10 grid gap-6 border border-inspo-ink lg:grid-cols-[1.2fr_0.8fr]">
        <div className="border-b border-inspo-ink bg-inspo-stock lg:border-b-0 lg:border-r">
          <img
            src={entry.thumbnail}
            alt={`${entry.title} preview`}
            className="aspect-[3/2] w-full object-cover lg:aspect-auto lg:min-h-[420px]"
          />
        </div>
        <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
          <div>
            <p className="mb-3 font-inspo-mono text-[11px] uppercase tracking-[0.18em] text-inspo-ink/45">
              {entry.tagline}
            </p>
            <h1 className="font-inspo-serif text-4xl leading-[0.95] tracking-tight text-inspo-ink sm:text-5xl md:text-6xl">
              {entry.title}
            </h1>
            <p className="mt-5 max-w-md font-inspo-mono text-[13px] leading-relaxed text-inspo-ink/70">
              {entry.summary}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {entry.sourceUrl && (
              <a
                href={entry.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-inspo-ink bg-inspo-ink px-4 py-2.5 font-inspo-mono text-[11px] uppercase tracking-[0.14em] text-inspo-paper transition-opacity hover:opacity-80"
              >
                Visit source ↗
              </a>
            )}
            <a
              href="#audit"
              className="border border-inspo-ink px-4 py-2.5 font-inspo-mono text-[11px] uppercase tracking-[0.14em] text-inspo-ink transition-colors hover:bg-inspo-ink hover:text-inspo-paper"
            >
              Jump to audit
            </a>
          </div>
        </div>
      </header>

      {/* Tags */}
      <section className="mb-14">
        <h2 className="mb-4 font-inspo-mono text-[11px] uppercase tracking-[0.2em] text-inspo-ink/45">
          Signals
        </h2>
        <div className="flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="border border-inspo-ink bg-inspo-stock px-3 py-1.5 font-inspo-mono text-[11px] uppercase tracking-[0.06em] text-inspo-ink"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Screenshots */}
      <section className="mb-16" id="screens">
        <SectionLabel>Screens</SectionLabel>
        <div className="space-y-8">
          {fullShots.map((shot) => (
            <figure key={shot.caption} className="border border-inspo-ink">
              <img
                src={shot.src}
                alt={shot.alt}
                className="w-full bg-inspo-stock"
              />
              <figcaption className="border-t border-inspo-ink px-4 py-3 font-inspo-mono text-[11px] uppercase tracking-[0.08em] text-inspo-ink/60">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
          {detailShots.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {detailShots.map((shot) => (
                <figure key={shot.caption} className="border border-inspo-ink">
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    className="aspect-[4/3] w-full object-cover bg-inspo-stock"
                  />
                  <figcaption className="border-t border-inspo-ink px-4 py-3 font-inspo-mono text-[11px] uppercase tracking-[0.08em] text-inspo-ink/60">
                    {shot.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* UI/UX Audit */}
      <section className="mb-16" id="audit">
        <SectionLabel>UI / UX Audit</SectionLabel>
        <div className="grid gap-0 border border-inspo-ink md:grid-cols-2">
          {entry.audit.map((item, i) => (
            <div
              key={item.area}
              className={cn(
                "p-5 sm:p-6",
                i % 2 === 0 && "md:border-r md:border-inspo-ink",
                i < entry.audit.length - (entry.audit.length % 2 === 0 ? 2 : 1) &&
                  "border-b border-inspo-ink",
                entry.audit.length % 2 === 1 &&
                  i === entry.audit.length - 1 &&
                  "md:col-span-2",
              )}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="font-inspo-serif text-xl text-inspo-ink">
                  {item.area}
                </h3>
                <span
                  className={cn(
                    "border px-2 py-0.5 font-inspo-mono text-[10px] uppercase tracking-[0.12em]",
                    verdictStyles[item.verdict],
                  )}
                >
                  {item.verdict}
                </span>
              </div>
              <p className="font-inspo-mono text-[13px] leading-relaxed text-inspo-ink/70">
                {item.observation}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Design tokens */}
      <section className="mb-16" id="tokens">
        <SectionLabel>Design System — Tokens</SectionLabel>
        <div className="space-y-6">
          {entry.tokens.map((group) => (
            <div key={group.label} className="border border-inspo-ink">
              <div className="border-b border-inspo-ink bg-inspo-ink px-4 py-2.5">
                <h3 className="font-inspo-mono text-[11px] uppercase tracking-[0.18em] text-inspo-paper">
                  {group.label}
                </h3>
              </div>
              <ul className="divide-y divide-inspo-ink/20">
                {group.tokens.map((token) => (
                  <li
                    key={token.name}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:grid-cols-[180px_1fr_auto]"
                  >
                    <code className="font-inspo-mono text-[12px] text-inspo-coral">
                      {token.name}
                    </code>
                    <div className="hidden items-center gap-3 sm:flex">
                      {token.value.startsWith("#") && (
                        <span
                          className="h-5 w-5 shrink-0 border border-inspo-ink"
                          style={{ background: token.value }}
                          aria-hidden
                        />
                      )}
                      <span className="font-inspo-mono text-[12px] text-inspo-ink">
                        {token.value}
                      </span>
                    </div>
                    <span className="text-right font-inspo-mono text-[11px] text-inspo-ink/45 sm:text-left">
                      <span className="sm:hidden">{token.value}</span>
                      {token.note && (
                        <span className="hidden sm:inline"> — {token.note}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Intentions */}
      <section className="mb-16" id="intentions">
        <SectionLabel>Why it looks like this</SectionLabel>
        <div className="space-y-0 border border-inspo-ink">
          {entry.intentions.map((item, i) => (
            <div
              key={item.title}
              className={cn(
                "grid gap-3 p-5 sm:grid-cols-[200px_1fr] sm:gap-8 sm:p-6",
                i < entry.intentions.length - 1 && "border-b border-inspo-ink",
              )}
            >
              <h3 className="font-inspo-serif text-xl text-inspo-ink">
                {item.title}
              </h3>
              <p className="font-inspo-mono text-[13px] leading-relaxed text-inspo-ink/70">
                {item.explanation}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Takeaways */}
      <section className="mb-16" id="takeaways">
        <SectionLabel>Steal this</SectionLabel>
        <ol className="border border-inspo-ink">
          {entry.takeaways.map((line, i) => (
            <li
              key={line}
              className={cn(
                "flex gap-4 px-4 py-4 sm:px-6",
                i < entry.takeaways.length - 1 && "border-b border-inspo-ink",
              )}
            >
              <span className="font-inspo-mono text-[11px] tabular-nums text-inspo-coral">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-inspo-mono text-[13px] leading-relaxed text-inspo-ink">
                {line}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Prev / next */}
      <nav className="flex items-stretch justify-between gap-4 border-t border-inspo-ink pt-8">
        {prevSlug ? (
          <Link
            to={`/inspo/${prevSlug}`}
            className="border border-inspo-ink px-4 py-3 font-inspo-mono text-[11px] uppercase tracking-[0.14em] text-inspo-ink transition-colors hover:bg-inspo-ink hover:text-inspo-paper"
          >
            ← Prev
          </Link>
        ) : (
          <span />
        )}
        {nextSlug ? (
          <Link
            to={`/inspo/${nextSlug}`}
            className="border border-inspo-ink px-4 py-3 font-inspo-mono text-[11px] uppercase tracking-[0.14em] text-inspo-ink transition-colors hover:bg-inspo-ink hover:text-inspo-paper"
          >
            Next →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 flex items-center gap-3 font-inspo-mono text-[11px] uppercase tracking-[0.22em] text-inspo-ink">
      <span className="inline-block h-1.5 w-1.5 rotate-45 bg-inspo-coral" />
      {children}
    </h2>
  );
}
