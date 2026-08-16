import type { ArchiveProject } from "@/lib/archive/types";
import { cn } from "@/lib/utils";

interface ArchiveMontageFrameProps {
  title: string;
  subtitle: string;
  period: string;
  projects: ArchiveProject[];
  index: number;
  total: number;
  mode?: "forward" | "rewind";
}

export function ArchiveMontageFrame({
  title,
  subtitle,
  period,
  projects,
  index,
  total,
  mode = "forward",
}: ArchiveMontageFrameProps) {
  return (
    <article
      className={cn(
        "archive-frame relative flex h-[100svh] w-[100vw] shrink-0 flex-col justify-center overflow-hidden border-r border-border/20 bg-card/30",
        mode === "rewind" && "archive-frame--rewind",
      )}
    >
      <div className="absolute left-0 right-0 top-0 z-20 flex h-3 gap-1.5 px-4 opacity-40">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="h-full w-2 rounded-[1px] bg-foreground/30" />
        ))}
      </div>

      <div className="relative z-10 p-8 sm:p-12 md:p-16">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="space-y-3">
            <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary/80">
              Montage &middot; {period}
            </p>
            <h3 className="font-heading max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {title}
            </h3>
            <p className="font-body max-w-lg text-base text-foreground/60">{subtitle}</p>
          </div>
          <div className="text-right font-heading text-[10px] uppercase tracking-[0.25em] text-foreground/40">
            <div>Frame</div>
            <div className="mt-0.5 text-primary/70">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </div>
          </div>
        </div>

        <div
          className={cn(
            "grid gap-3",
            projects.length <= 4 ? "grid-cols-2 sm:grid-cols-2" : "grid-cols-2 sm:grid-cols-3",
          )}
        >
          {projects.map((p) => (
            <div
              key={p.id}
              className="group relative aspect-[4/3] overflow-hidden border border-border/25 bg-background/40 transition-colors hover:border-primary/40"
            >
              <img
                src={p.image}
                alt=""
                className={cn(
                  "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105",
                  mode === "rewind" ? "grayscale opacity-60" : "opacity-80",
                )}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="font-heading text-xs font-semibold text-foreground sm:text-sm">{p.title}</p>
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-foreground/50">
                  {p.project_date}
                </p>
              </div>
            </div>
          ))}
        </div>

        {mode === "rewind" && (
          <p className="mt-8 font-body text-sm italic text-foreground/50">
            Rewind layer: what I was trying to prove across these builds.
          </p>
        )}
      </div>
    </article>
  );
}
