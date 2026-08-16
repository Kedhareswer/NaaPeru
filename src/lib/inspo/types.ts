export type InspoCategoryId =
  | "brand-systems"
  | "process-docs"
  | "product-ui"
  | "art-direction"
  | "portfolio-sites";

export interface InspoCategory {
  id: InspoCategoryId | "all";
  label: string;
  /** Show diamond accent on filter chip */
  accent?: boolean;
}

export interface InspoToken {
  name: string;
  value: string;
  note?: string;
}

export interface InspoTokenGroup {
  label: string;
  tokens: InspoToken[];
}

export interface InspoScreenshot {
  src: string;
  alt: string;
  caption: string;
  /** full = hero strip; detail = breakout of a specific UI moment */
  kind: "full" | "detail";
}

export interface InspoAuditItem {
  area: string;
  observation: string;
  verdict: "strong" | "mixed" | "weak";
}

export interface InspoIntention {
  title: string;
  explanation: string;
}

export interface InspoEntry {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: InspoCategoryId;
  tags: string[];
  thumbnail: string;
  sourceUrl: string | null;
  year?: string;
  summary: string;
  screenshots: InspoScreenshot[];
  audit: InspoAuditItem[];
  tokens: InspoTokenGroup[];
  intentions: InspoIntention[];
  takeaways: string[];
}

export interface InspoData {
  categories: InspoCategory[];
  entries: InspoEntry[];
}
