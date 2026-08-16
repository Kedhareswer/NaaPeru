import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { InspoShell } from "@/components/inspo/InspoShell";
import { InspoDetailView } from "@/components/inspo/InspoDetailView";
import {
  categoryLabel,
  getEntryBySlug,
  loadInspo,
} from "@/lib/inspo/load";
import type { InspoData } from "@/lib/inspo/types";

const InspoDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<InspoData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadInspo()
      .then(setData)
      .catch(() => setError("Could not load the inspiration library."));
  }, []);

  const entry = useMemo(() => {
    if (!data || !slug) return undefined;
    return getEntryBySlug(data, slug);
  }, [data, slug]);

  const nav = useMemo(() => {
    if (!data || !entry) return { index: 0, prev: undefined, next: undefined };
    const idx = data.entries.findIndex((e) => e.id === entry.id);
    return {
      index: idx,
      prev: idx > 0 ? data.entries[idx - 1]?.slug : undefined,
      next:
        idx >= 0 && idx < data.entries.length - 1
          ? data.entries[idx + 1]?.slug
          : undefined,
    };
  }, [data, entry]);

  if (error) {
    return (
      <InspoShell>
        <p className="p-10 font-inspo-mono text-inspo-coral">{error}</p>
      </InspoShell>
    );
  }

  if (!data) {
    return (
      <InspoShell>
        <p className="p-10 font-inspo-mono text-inspo-ink/40">Loading…</p>
      </InspoShell>
    );
  }

  if (!entry) {
    return (
      <InspoShell>
        <Seo title="Not found | Inspo" description="Missing entry" path={`/inspo/${slug}`} noindex />
        <div className="mx-auto max-w-[1440px] px-6 py-24 text-center">
          <h1 className="font-inspo-serif text-3xl text-inspo-ink">Not in the library</h1>
          <Link
            to="/inspo"
            className="mt-6 inline-block border border-inspo-ink px-4 py-2 font-inspo-mono text-[11px] uppercase tracking-[0.14em] text-inspo-ink"
          >
            ← Back to library
          </Link>
        </div>
      </InspoShell>
    );
  }

  return (
    <InspoShell>
      <Seo
        title={`${entry.title} — Inspo | Kedhar`}
        description={entry.summary}
        path={`/inspo/${entry.slug}`}
        image={entry.thumbnail}
        type="article"
        noindex
      />
      <InspoDetailView
        entry={entry}
        categoryLabel={categoryLabel(data.categories, entry.category)}
        index={nav.index}
        total={data.entries.length}
        prevSlug={nav.prev}
        nextSlug={nav.next}
      />
    </InspoShell>
  );
};

export default InspoDetail;
