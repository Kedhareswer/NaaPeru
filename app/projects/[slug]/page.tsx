import ProjectDetails, { type ProjectDetailsModel } from "@/components/ui/project-details";
import sql from "@/lib/db";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

async function getProjectBySlugOrId(slug: string) {
  // Try numeric id first
  const asNum = Number(slug);
  if (Number.isFinite(asNum)) {
    const rows = await sql`SELECT * FROM projects WHERE id = ${asNum} LIMIT 1`;
    if (rows.length > 0) return rows[0];
  }

  // Fallback: derive slug from title in SQL (normalize to kebab-case)
  const rows2 = await sql`
    SELECT * FROM projects
    WHERE lower(regexp_replace(title, '[^a-z0-9]+', '-', 'g')) = ${slug.toLowerCase()}
    LIMIT 1
  `;
  if (rows2.length > 0) return rows2[0];
  return null;
}

function mapRowToModel(row: any): ProjectDetailsModel {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    image: row.image || row.hero || row.hero_image || row.thumbnail || row.banner || null,
    technologies: row.technologies || row.tech || row.stack || [],
    githubUrl:
      row.github || row.github_url || row.githuburl || row.repo || row.repository || row.repo_url || row.repository_url || null,
    kaggleUrl: row.kaggle || row.kaggle_url || row.kaggleurl || null,
    demoUrl: row.demo || row.demo_url || row.live || row.live_url || row.link || row.website || row.app_url || null,
    category: row.category,
    date: row.project_date ? String(row.project_date) : null,
    objectives: row.objectives || [],
    outcomes: row.outcomes || [],
  };
}

export default async function ProjectDetailsPage({ params }: { params: { slug: string } }) {
  const row = await getProjectBySlugOrId(params.slug);
  if (!row) {
    notFound();
  }
  const project = mapRowToModel(row);
  return <ProjectDetails project={project} />;
}
