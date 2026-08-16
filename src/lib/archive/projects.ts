import type { ArchiveProject } from "./types";

const CASE_STUDY_BY_TITLE: Record<string, string> = {
  "Thesis Flow AI": "/case-study/thesisflow",
  "QuantumPDF ChatApp VectorDB": "/case-study/quantumpdf",
  "Data Notebook": "/case-study/data-notebook",
};

export async function loadArchiveProjects(): Promise<ArchiveProject[]> {
  const res = await fetch("/projects.json");
  if (!res.ok) throw new Error("Failed to load projects");
  return res.json();
}

export function sortChronological(projects: ArchiveProject[]): ArchiveProject[] {
  return [...projects].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );
}

export function projectById(projects: ArchiveProject[], id: number): ArchiveProject | undefined {
  return projects.find((p) => p.id === id);
}

export function caseStudyPath(title: string): string | null {
  return CASE_STUDY_BY_TITLE[title] ?? null;
}

export function formatTimecode(progress: number): string {
  const totalSeconds = Math.floor(progress * 120);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  const f = Math.floor((progress * 120 - totalSeconds) * 24);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}:${String(f).padStart(2, "0")}:00`;
}
