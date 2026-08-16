export interface ArchiveProject {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  github: string | null;
  demo: string | null;
  category: string;
  project_date: string;
  image: string;
  featured: boolean;
  created_at: string;
  objectives: string[];
  outcomes: string[];
}

export type ArchiveFrame =
  | {
      kind: "project";
      projectId: number;
    }
  | {
      kind: "montage";
      id: string;
      title: string;
      subtitle: string;
      period: string;
      projectIds: number[];
    };

export type ArchiveVariantId = "a" | "b" | "c";

export interface ArchiveVariantMeta {
  id: ArchiveVariantId;
  label: string;
  title: string;
  tagline: string;
  engine: string;
  scrollEstimate: string;
  description: string;
  route: string;
}
