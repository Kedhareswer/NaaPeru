import { useEffect, useMemo, useState } from "react";
import { Seo } from "@/components/Seo";
import { InspoShell } from "@/components/inspo/InspoShell";
import { InspoFilters } from "@/components/inspo/InspoFilters";
import { InspoCard } from "@/components/inspo/InspoCard";
import {
  countByCategory,
  filterEntries,
  loadInspo,
  categoryLabel,
} from "@/lib/inspo/load";
import type { InspoData } from "@/lib/inspo/types";

const Inspo = () => {
  const [data, setData] = useState<InspoData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState("all");

  useEffect(() => {
    loadInspo()
      .then(setData)
      .catch(() => setError("Could not load the inspiration library."));
  }, []);

  const counts = useMemo(() => {
    if (!data) return {} as Record<string, number>;
    const map: Record<string, number> = {};
    for (const cat of data.categories) {
      map[cat.id] = countByCategory(data.entries, cat.id);
    }
    return map;
  }, [data]);

  const visible = useMemo(() => {
    if (!data) return [];
    return filterEntries(data.entries, active);
  }, [data, active]);

  return (
    <InspoShell>
      <Seo
        title="Inspo Library | Kedhar"
        description="Curated inspiration library with UI/UX audits, design tokens, and intentional design notes."
        path="/inspo"
        noindex
      />

      <div className="mx-auto max-w-[1440px] px-4 pb-20 pt-8 sm:px-6 md:px-10">
        <div className="mb-8 max-w-2xl">
          <h1 className="font-inspo-serif text-4xl tracking-tight text-inspo-ink sm:text-5xl">
            Inspiration
          </h1>
          <p className="mt-3 font-inspo-mono text-[13px] leading-relaxed text-inspo-ink/55">
            Taste, significance, uniqueness — each entry opens into screens,
            a UI/UX audit, extracted tokens, and why it works.
          </p>
        </div>

        {error && (
          <p className="border border-inspo-coral px-4 py-3 font-inspo-mono text-sm text-inspo-coral">
            {error}
          </p>
        )}

        {!data && !error && (
          <p className="font-inspo-mono text-sm text-inspo-ink/40">Loading…</p>
        )}

        {data && (
          <>
            <div className="mb-10">
              <InspoFilters
                categories={data.categories}
                counts={counts}
                active={active}
                onChange={setActive}
              />
            </div>

            {visible.length === 0 ? (
              <p className="border border-dashed border-inspo-ink/30 px-6 py-16 text-center font-inspo-mono text-sm text-inspo-ink/45">
                No entries in this lane yet. Send a URL and it lands here.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {visible.map((entry, i) => (
                  <InspoCard
                    key={entry.id}
                    entry={entry}
                    index={i}
                    total={visible.length}
                    categoryLabel={categoryLabel(data.categories, entry.category)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </InspoShell>
  );
};

export default Inspo;
