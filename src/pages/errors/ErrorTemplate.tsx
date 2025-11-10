import { ReactNode, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { ArrowLeft, AlertTriangle } from "lucide-react";
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

      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_hsla(var(--primary)/0.15),transparent_50%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_hsla(var(--primary)/0.08),transparent_60%)]" aria-hidden="true" />

      <main className="relative z-10 flex min-h-screen w-full items-center justify-center px-6 py-32 sm:px-8 md:px-12">
        <div className="container-portfolio w-full max-w-5xl">
          
          {/* Error Badge */}
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-md border border-primary/30 bg-primary/10">
              <AlertTriangle className="h-6 w-6 text-primary" />
            </div>
            <div className="font-heading text-xs uppercase tracking-[0.6em] text-primary/75">
              Error · {statusCode}
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Status Code Display - Large and Bold */}
            <div className="relative">
              <h1 className="font-heading text-[8rem] leading-none tracking-tighter text-foreground/10 sm:text-[12rem] md:text-[16rem] lg:text-[20rem]">
                {statusCode}
              </h1>
              <div className="absolute inset-0 flex items-center">
                <div className="space-y-4">
                  <h2 className="font-heading text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                    {title}
                  </h2>
                  {descriptionContent && (
                    <p className="max-w-2xl font-body text-base text-foreground/70 sm:text-lg md:text-xl">
                      {descriptionContent}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Status Label Marquee */}
            <div className="relative overflow-hidden">
              <div className="pointer-events-none relative h-12 overflow-hidden border-y border-primary/20 bg-primary/5">
                <div
                  className={`absolute flex h-full w-[200%] items-center font-heading text-xs uppercase tracking-[0.3em] text-primary/40 ${styles.marqueeReverse}`}
                  aria-hidden="true"
                >
                  {[0, 1].map((duplicate) => (
                    <div
                      key={duplicate}
                      className="flex h-full w-1/2 flex-none items-center justify-around gap-8 px-8"
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

            {/* CTA */}
            <div className="pt-4">
              <Link
                to={callToAction.to}
                className="group inline-flex items-center gap-3 border-b-2 border-primary/30 pb-2 font-heading text-sm uppercase tracking-[0.3em] text-foreground transition-all hover:border-primary hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                {callToAction.label}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
