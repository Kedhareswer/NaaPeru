import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionResponse {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

const LEVEL_CLASSES = [
  "bg-foreground/[0.06]",
  "bg-primary/25",
  "bg-primary/50",
  "bg-primary/75",
  "bg-primary",
] as const;

function groupByWeeks(contributions: ContributionDay[]): ContributionDay[][] {
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  for (const day of contributions) {
    const dayOfWeek = new Date(day.date).getDay();
    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
  }
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }
  return weeks;
}

function calculateStreak(contributions: ContributionDay[]): number {
  let streak = 0;
  for (let i = contributions.length - 1; i >= 0; i--) {
    if (contributions[i].count > 0) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

function SkeletonGrid() {
  return (
    <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
      {Array.from({ length: 52 * 7 }).map((_, i) => (
        <div
          key={i}
          className="h-[10px] w-[10px] animate-pulse rounded-[1px] bg-foreground/[0.06] sm:h-[11px] sm:w-[11px]"
        />
      ))}
    </div>
  );
}

export const GitHubActivity = () => {
  const { data, isLoading, isError } = useQuery<ContributionResponse>({
    queryKey: ["github-contributions", "Kedhareswer"],
    queryFn: () =>
      fetch(
        "https://github-contributions-api.jogruber.de/v4/Kedhareswer?y=last",
      ).then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      }),
    staleTime: 1000 * 60 * 60,
    retry: 2,
  });

  const weeks = data ? groupByWeeks(data.contributions) : [];
  const totalKey = data ? Object.keys(data.total)[0] : "";
  const total = data ? data.total[totalKey] ?? 0 : 0;
  const streak = data ? calculateStreak(data.contributions) : 0;

  return (
    <section className="mb-24 space-y-8">
      {/* Section header */}
      <div className="space-y-6">
        <span className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
          Activity
        </span>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr),minmax(0,1.4fr)]">
          <h2
            className="font-heading text-3xl sm:text-4xl md:text-5xl text-transparent"
            style={{
              WebkitTextStroke: "1.25px rgba(255,255,255,0.2)",
              color: "transparent",
            }}
          >
            Build Frequency
          </h2>
          <p className="font-body text-base sm:text-lg text-gray-light">
            Open-source contribution activity over the last year. Proof that
            shipping is a habit, not an event.
          </p>
        </div>
      </div>

      {/* Heatmap card */}
      <div className="border border-border/25 bg-card/30 p-6 sm:p-8 backdrop-blur">
        {/* Stats */}
        {!isLoading && !isError && data && (
          <div className="mb-6 flex flex-wrap items-center gap-6 sm:gap-8">
            <div className="border-l-2 border-primary/50 pl-4 space-y-1">
              <p className="font-heading text-3xl sm:text-4xl text-foreground">
                {total.toLocaleString()}
              </p>
              <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gray-light/70">
                Contributions
              </p>
            </div>
            <div className="border-l-2 border-primary/30 pl-4 space-y-1">
              <p className="font-heading text-3xl sm:text-4xl text-foreground">
                {streak}
              </p>
              <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gray-light/70">
                Day Streak
              </p>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="overflow-x-auto">
          {isLoading && <SkeletonGrid />}

          {isError && (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <p className="font-body text-sm text-gray-light/60">
                GitHub activity temporarily unavailable.
              </p>
              <a
                href="https://github.com/Kedhareswer"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs uppercase tracking-[0.2em] text-primary hover:text-primary/80 transition-colors"
              >
                View on GitHub &rarr;
              </a>
            </div>
          )}

          {!isLoading && !isError && data && (
            <>
              <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
                {weeks.map((week, wi) =>
                  week.map((day) => (
                    <div
                      key={day.date}
                      className={cn(
                        "h-[10px] w-[10px] rounded-[1px] transition-colors sm:h-[11px] sm:w-[11px]",
                        LEVEL_CLASSES[day.level] ?? LEVEL_CLASSES[0],
                      )}
                      title={`${day.count} contribution${day.count !== 1 ? "s" : ""} on ${day.date}`}
                    />
                  )),
                )}
              </div>

              {/* Legend */}
              <div className="mt-4 flex items-center justify-end gap-1.5">
                <span className="font-body text-[10px] text-gray-light/50 mr-1">
                  Less
                </span>
                {LEVEL_CLASSES.map((cls, i) => (
                  <div
                    key={i}
                    className={cn("h-[10px] w-[10px] rounded-[1px] sm:h-[11px] sm:w-[11px]", cls)}
                  />
                ))}
                <span className="font-body text-[10px] text-gray-light/50 ml-1">
                  More
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
