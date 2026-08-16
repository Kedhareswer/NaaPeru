import type { InspoCategory, InspoData, InspoEntry } from "./types";

let cache: InspoData | null = null;

export async function loadInspo(): Promise<InspoData> {
  if (cache) return cache;
  const res = await fetch("/inspo.json");
  if (!res.ok) throw new Error("Failed to load inspo.json");
  cache = (await res.json()) as InspoData;
  return cache;
}

export function getEntryBySlug(data: InspoData, slug: string): InspoEntry | undefined {
  return data.entries.find((e) => e.slug === slug);
}

export function countByCategory(entries: InspoEntry[], categoryId: string): number {
  if (categoryId === "all") return entries.length;
  return entries.filter((e) => e.category === categoryId).length;
}

export function filterEntries(
  entries: InspoEntry[],
  categoryId: string,
): InspoEntry[] {
  if (categoryId === "all") return entries;
  return entries.filter((e) => e.category === categoryId);
}

export function categoryLabel(
  categories: InspoCategory[],
  id: string,
): string {
  return categories.find((c) => c.id === id)?.label ?? id;
}
