import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { STUDIES, STUDY_COUNT, STUDY_GROUPS } from "@/components/archive-kit/studies/registry";
import { cn } from "@/lib/utils";

const grouped = STUDY_GROUPS.map((group) => ({
  group,
  items: STUDIES.filter((s) => s.group === group),
})).filter((g) => g.items.length > 0);

const Archive = () => {
  const [activeId, setActiveId] = useState(STUDIES[0].id);

  const index = useMemo(() => STUDIES.findIndex((s) => s.id === activeId), [activeId]);
  const active = STUDIES[index];
  const Study = active.Component;

  const step = (delta: number) => {
    const next = (index + delta + STUDIES.length) % STUDIES.length;
    setActiveId(STUDIES[next].id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Archive — motion studies | Kedhar"
        description={`${STUDY_COUNT} interaction studies in camera optics and liquid physics. Each one solves a stated interface problem.`}
        path="/archive"
        image="/og-work.png"
        imageAlt="NaaPeru archive"
      />
      <Navigation />

      <main className="overflow-x-hidden pb-24 pt-28 md:pt-36">
        {/* Page header stays in the portfolio's voice — it's the frame, not the art */}
        <section className="container-portfolio pb-14 md:pb-20">
          <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary/80">
            Archive · {STUDY_COUNT} studies
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-[clamp(2.25rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground">
            Motion studies
          </h1>
          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-foreground/55">
            Interactions borrowed from camera optics and liquid physics — each built to solve
            one interface problem. Every study states what the motion is for.
          </p>
        </section>

        {/* ── Gallery: its own surface, its own type. Not the portfolio's skin. ── */}
        <section id="kit" className="kit-stage scroll-mt-28 border-y border-border/20">
          <div className="container-portfolio grid gap-0 py-14 md:py-20 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-14">
            {/* Index */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-body text-[10px] uppercase tracking-[0.3em] text-foreground/40">
                Index
              </p>
              <nav className="mt-5 space-y-7">
                {grouped.map(({ group, items }) => (
                  <div key={group}>
                    <p className="font-body text-[10px] uppercase tracking-[0.25em] text-foreground/35">
                      {group}
                    </p>
                    <ul className="mt-2.5">
                      {items.map((item) => {
                        const isActive = item.id === active.id;
                        return (
                          <li key={item.id}>
                            <button
                              type="button"
                              onClick={() => setActiveId(item.id)}
                              aria-current={isActive ? "true" : undefined}
                              className={cn(
                                "flex w-full items-baseline gap-3 py-1.5 text-left transition-colors",
                                isActive ? "text-foreground" : "text-foreground/50 hover:text-foreground/85",
                              )}
                            >
                              <span className="font-mono text-[10px] tabular-nums text-foreground/30">
                                {item.id}
                              </span>
                              <span
                                className={cn(
                                  "font-gallery text-[15px] leading-snug",
                                  isActive && "underline decoration-foreground/30 underline-offset-4",
                                )}
                              >
                                {item.title}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </nav>
            </aside>

            {/* Detail */}
            <div className="mt-12 min-w-0 lg:mt-0">
              {/* Exhibit — frame is the wall colour, never bg-card: studies that draw
                  their own bg-card surface must read as objects sitting on it. */}
              <div className="relative h-[26rem] overflow-hidden border border-border bg-background md:h-[34rem]">
                {/* key remounts the study on switch so it starts from its rest state */}
                <Study key={active.slug} />
              </div>

              <div className="mt-3 flex items-center justify-between gap-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/40">
                  ↳ {active.invite}
                </p>
                <p className="font-mono text-[10px] tabular-nums text-foreground/30">
                  {active.id} / {String(STUDY_COUNT).padStart(2, "0")}
                </p>
              </div>

              {/* Wall label */}
              <div className="mt-7 border-t border-border pt-7">
                <p className="font-body text-[10px] uppercase tracking-[0.3em] text-foreground/40">
                  {active.group}
                </p>
                <h2 className="mt-2 font-gallery text-3xl leading-tight text-foreground md:text-4xl">
                  {active.title}
                </h2>

                <div className="mt-5 grid gap-x-10 gap-y-5 md:grid-cols-[minmax(0,1fr)_minmax(0,16rem)]">
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[0.28em] text-foreground/35">
                      What it's for
                    </p>
                    <p className="mt-2 max-w-prose font-body text-[15px] leading-relaxed text-foreground/70">
                      {active.purpose}
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[0.28em] text-foreground/35">
                      Technique
                    </p>
                    <p className="mt-2 font-body text-[13px] leading-relaxed text-foreground/55">
                      {active.technique}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-9 flex items-center justify-between border-t border-border pt-5">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="inline-flex min-h-11 items-center gap-2 font-body text-[11px] uppercase tracking-[0.2em] text-foreground/55 transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  {STUDIES[(index - 1 + STUDIES.length) % STUDIES.length].title}
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="inline-flex min-h-11 items-center gap-2 text-right font-body text-[11px] uppercase tracking-[0.2em] text-foreground/55 transition-colors hover:text-foreground"
                >
                  {STUDIES[(index + 1) % STUDIES.length].title}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="container-portfolio mt-24 text-center">
          <p className="font-body text-sm text-foreground/50">
            Questions, or something custom — happy to talk.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/about"
              className="inline-flex min-h-11 items-center border border-border/40 px-6 py-3 font-body text-xs uppercase tracking-[0.2em] text-foreground hover:border-primary/40"
            >
              About
            </Link>
            <a
              href="mailto:kedhareswer.12110626@gmail.com"
              className="inline-flex min-h-11 items-center border border-primary bg-primary px-6 py-3 font-body text-xs uppercase tracking-[0.2em] text-primary-foreground"
            >
              Email
            </a>
          </div>
        </section>
      </main>

      <Footer quote={`${STUDY_COUNT} studies. Each one answers a question.`} />
    </div>
  );
};

export default Archive;
