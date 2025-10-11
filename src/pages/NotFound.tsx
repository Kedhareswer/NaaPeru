import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navigation } from "@/components/Navigation";

const stripePattern = ["PAGE", "+", "NOT FOUND", "×"];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Navigation />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_hsla(var(--primary)/0.35),transparent_70%)] opacity-90" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(0,0,0,0.92),transparent_55%,rgba(0,0,0,0.85))]" aria-hidden="true" />

      <main className="relative z-10 flex h-screen w-full items-center justify-center overflow-hidden pt-12 sm:pt-16">
        <style>
          {`
            @keyframes notfound-marquee {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            @keyframes notfound-marquee-reverse {
              0% {
                transform: translateX(-50%);
              }
              100% {
                transform: translateX(0);
              }
            }
          `}
        </style>

        <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
          <div className="pointer-events-none absolute inset-x-[-30vw] bottom-[8%] z-0 rotate-[-5deg] sm:inset-x-[-26vw] sm:bottom-[12%] md:inset-x-[-24vw] md:bottom-[10%] lg:bottom-[8%]">
            <div className="relative h-8 overflow-hidden rounded-[1.75rem] border border-primary/40 shadow-[0_12px_28px_rgba(255,84,58,0.18)] sm:h-11 md:h-12">
              <div
                className="absolute inset-0 opacity-95"
                style={{
                  backgroundImage:
                    "linear-gradient(115deg, rgba(200,40,35,0.9), rgba(76,9,7,0.94)), repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 10px, rgba(0,0,0,0.16) 10px, rgba(0,0,0,0.16) 20px)",
                  mixBlendMode: "screen",
                }}
                aria-hidden="true"
              />
              <div
                className="relative flex h-full w-[200%] items-center font-heading text-[0.5rem] uppercase tracking-[0.28em] text-background sm:text-[0.65rem] md:text-[0.75rem]"
                style={{ animation: "notfound-marquee-reverse 28s linear infinite" }}
                aria-hidden="true"
              >
                {[0, 1].map((duplicate) => (
                  <div key={duplicate} className="flex h-full w-1/2 flex-none items-center justify-around gap-4 px-6 sm:gap-8 sm:px-10">
                    {Array.from({ length: 20 }).map((_, index) => (
                      <span key={`${duplicate}-${index}`} className="flex-shrink-0">
                        {stripePattern[index % stripePattern.length]}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="container-portfolio relative z-10">
            <div className="grid items-center gap-8 text-center lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:text-left">
              <div className="space-y-6">
                <span className="font-heading text-xs uppercase tracking-[0.6em] text-primary/75">
                  Status · 404
                </span>
                <h1 className="mx-auto max-w-3xl font-heading text-3xl leading-snug text-foreground sm:text-[2.5rem] md:text-[3rem] lg:mx-0">
                  You wandered into uncharted space.
                </h1>
                <p className="mx-auto max-w-2xl font-body text-sm text-foreground/70 sm:text-base md:text-lg lg:mx-0">
                  The path <span className="text-primary">{location.pathname}</span> doesn&apos;t exist on this grid. Plot a new course or sync with mission control.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                  <Link
                    to="/"
                    className="group inline-flex items-center gap-3 rounded-full border border-primary/50 bg-primary/10 px-7 py-3 font-heading text-xs uppercase tracking-[0.35em] text-primary transition-all hover:border-primary hover:bg-primary hover:text-background"
                  >
                    Return Home
                    <span className="block h-px w-8 bg-primary transition-all duration-300 group-hover:w-12" />
                  </Link>
                </div>
              </div>

              <div className="relative flex items-center justify-center">
                <img
                  src="/elements4.png"
                  alt="Fragmented emblem"
                  className="w-[13rem] max-w-full sm:w-[17rem] md:w-[21rem] lg:w-[25rem]"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NotFound;
