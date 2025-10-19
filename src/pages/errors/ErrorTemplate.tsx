import { ReactNode, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import styles from "./ErrorTemplate.module.css";

const MARQUEE_REPEAT_COUNT = 20;

type BaseErrorTemplateProps = {
  statusCode: string;
  statusLabel: string;
  title: string;
  callToAction?: {
    to: string;
    label: string;
  };
  patternWords?: string[];
  illustrationSrc?: string;
  illustrationAlt?: string;
  logMessagePrefix?: string;
};

type WithDescription = BaseErrorTemplateProps & {
  description: string;
  renderDescription?: never;
};

type WithRenderDescription = BaseErrorTemplateProps & {
  description?: never;
  renderDescription: (pathname: string) => ReactNode;
};

type WithoutDescription = BaseErrorTemplateProps & {
  description?: never;
  renderDescription?: never;
};

type ErrorTemplateProps = WithDescription | WithRenderDescription | WithoutDescription;

export const ErrorTemplate = ({
  statusCode,
  statusLabel,
  title,
  description,
  renderDescription,
  callToAction = {
    to: "/",
    label: "Return Home",
  },
  patternWords,
  illustrationSrc = "/elements4.png",
  illustrationAlt = "Error illustration",
  logMessagePrefix,
}: ErrorTemplateProps) => {
  const location = useLocation();

  useEffect(() => {
    const details = logMessagePrefix ? `${logMessagePrefix}: ${location.pathname}` : `Route: ${location.pathname}`;
    console.error(`${statusCode} ${statusLabel} — ${details}`);
  }, [location.pathname, logMessagePrefix, statusCode, statusLabel]);

  const marqueeWords = patternWords?.length
    ? patternWords
    : [statusLabel.toUpperCase(), "×", statusCode, "×"];

  const descriptionContent = renderDescription ? renderDescription(location.pathname) : description;

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Navigation />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_hsla(var(--primary)/0.35),transparent_70%)] opacity-90" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(0,0,0,0.92),transparent_55%,rgba(0,0,0,0.85))]" aria-hidden="true" />

      <main className="relative z-10 flex h-screen w-full items-center justify-center overflow-hidden pt-12 sm:pt-16">
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
                className={`relative flex h-full w-[200%] items-center font-heading text-[0.5rem] uppercase tracking-[0.28em] text-background sm:text-[0.65rem] md:text-[0.75rem] ${styles.marqueeReverse}`}
                aria-hidden="true"
              >
                {[0, 1].map((duplicate) => (
                  <div
                    key={duplicate}
                    className={`flex h-full w-1/2 flex-none items-center justify-around gap-4 px-6 sm:gap-8 sm:px-10 ${styles.marquee}`}
                  >
                    {Array.from({ length: MARQUEE_REPEAT_COUNT }).map((_, index) => (
                      <span key={`${duplicate}-${index}`} className="flex-shrink-0">
                        {marqueeWords[index % marqueeWords.length]}
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
                  Status · {statusCode}
                </span>
                <h1 className="mx-auto max-w-3xl font-heading text-3xl leading-snug text-foreground sm:text-[2.5rem] md:text-[3rem] lg:mx-0">
                  {title}
                </h1>
                {descriptionContent && (
                  <p className="mx-auto max-w-2xl font-body text-sm text-foreground/70 sm:text-base md:text-lg lg:mx-0">
                    {descriptionContent}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                  <Link
                    to={callToAction.to}
                    className="group inline-flex items-center gap-3 rounded-full border border-primary/50 bg-primary/10 px-7 py-3 font-heading text-xs uppercase tracking-[0.35em] text-primary transition-all hover:border-primary hover:bg-primary hover:text-background"
                  >
                    {callToAction.label}
                    <span className="block h-px w-8 bg-primary transition-all duration-300 group-hover:w-12" />
                  </Link>
                </div>
              </div>

              <div className="relative flex items-center justify-center">
                <img
                  src={illustrationSrc}
                  alt={illustrationAlt}
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
