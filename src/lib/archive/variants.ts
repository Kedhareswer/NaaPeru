import type { ArchiveVariantMeta } from "./types";

export const ARCHIVE_VARIANTS: ArchiveVariantMeta[] = [
  {
    id: "a",
    label: "CHRONICLE",
    title: "The Chronicle",
    tagline: "Vertical documentary · diary voice",
    engine: "Word-scrubbed narrator, act chapters, montage bursts",
    scrollEstimate: "~4 min · vertical",
    description:
      "Not a project grid — a confession scroll. Acts, diary entries, burst montages, hero frames for the three flagships, then a rewind inner voice.",
    route: "/archive/a",
  },
  {
    id: "b",
    label: "THE REEL",
    title: "The Reel",
    tagline: "Screenplay scenes · horizontal pin",
    engine: "INT./EXT. slugs, direction lines, timecode",
    scrollEstimate: "~3 min · horizontal + rewind",
    description:
      "Universal leader countdown, then pinned horizontal scroll through six screenplay scenes. Second pass rewinds the same shots asking objectives, not titles.",
    route: "/archive/b",
  },
  {
    id: "c",
    label: "THE SIGNAL",
    title: "The Signal",
    tagline: "Typography-first · one line per viewport",
    engine: "Punchy hooks, ghost project orbit",
    scrollEstimate: "~90 sec · typographic",
    description:
      "Seven full-viewport lines. Projects appear as ghosts in the periphery — evidence, not the story. For when you want hook before proof.",
    route: "/archive/c",
  },
];

export function getVariantMeta(id: "a" | "b" | "c"): ArchiveVariantMeta {
  const meta = ARCHIVE_VARIANTS.find((v) => v.id === id);
  if (!meta) throw new Error(`Unknown variant ${id}`);
  return meta;
}
