"use client";

import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { ArrowRight } from "lucide-react";
import { useMemo, useRef } from "react";

export type ProjectDetailsModel = {
  id: number | string;
  title: string;
  description: string;
  image?: string | null;
  technologies?: string[] | null;
  githubUrl?: string | null;
  kaggleUrl?: string | null;
  demoUrl?: string | null;
  category?: string | null;
  date?: string | null;
  objectives?: string[] | null;
  outcomes?: string[] | null;
};

type Props = { project: ProjectDetailsModel };

export default function ProjectDetails({ project }: Props) {
  const heroRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const scaleVariants = {
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
    },
  };

  const heroImage = project.image ||
    "https://images.unsplash.com/photo-1718601980986-0ce75101d52d?w=1200&auto=format&fit=crop";

  const techText = useMemo(() => {
    const arr = (project.technologies || []).filter(Boolean) as string[];
    return arr.join(" | ");
  }, [project.technologies]);

  const rightBigLabel = (project.category || "PROJECT").toUpperCase();
  const rightSmallLabel = useMemo(() => {
    if (project.date) return project.date;
    const len = (project.technologies || []).length;
    return len > 0 ? `${len} techs` : "";
  }, [project.date, project.technologies]);

  // Split description into two balanced paragraphs
  const [descLeft, descRight] = useMemo(() => {
    const text = (project.description || "").trim();
    if (text.length < 320) return [text, (project.outcomes || project.objectives || [])?.join(". ") || ""];
    const mid = Math.floor(text.length / 2);
    let splitIdx = text.indexOf(" ", mid);
    if (splitIdx === -1) splitIdx = mid;
    return [text.slice(0, splitIdx).trim(), text.slice(splitIdx).trim()];
  }, [project.description, project.objectives, project.outcomes]);

  const primaryCta = project.demoUrl || project.githubUrl || null;
  const primaryCtaLabel = project.demoUrl ? "Open Live" : project.githubUrl ? "View Code" : "";

  // Social icon availability and animation order
  const hasGithub = !!project.githubUrl;
  const hasKaggle = !!project.kaggleUrl;
  const hasDemo = !!project.demoUrl;
  const socialOrder: Array<"github" | "kaggle" | "demo"> = [];
  if (hasGithub) socialOrder.push("github");
  if (hasKaggle) socialOrder.push("kaggle");
  if (hasDemo) socialOrder.push("demo");
  const ghAnim = socialOrder.indexOf("github");
  const kgAnim = socialOrder.indexOf("kaggle");
  const dmAnim = socialOrder.indexOf("demo");

  return (
    <section className="py-8 px-4 bg-[#f9f9f9]" ref={heroRef}>
      <div className="max-w-6xl mx-auto">
        <div className="relative pb-20 lg:pb-28">
          {/* Header with star and label */}
          <div className="flex justify-between items-center mb-8 w-full absolute top-8 sm:top-6 md:top-8 lg:top-10 z-20 px-2">
            <div className="flex items-center gap-2  text-xl">
              <span className="text-red-500 animate-spin">✱</span>
              <TimelineContent
                as="span"
                animationNum={0}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-sm font-medium text-gray-600"
              >
                PROJECT
              </TimelineContent>
            </div>
            <div />
          </div>

          <TimelineContent
            as="figure"
            animationNum={4}
            timelineRef={heroRef}
            customVariants={scaleVariants}
            className="relative group"
          >
            <svg className="w-full" width={"100%"} height={"100%"} viewBox="0 0 100 40">
              <defs>
                <clipPath id="clip-inverted" clipPathUnits={"objectBoundingBox"}>
                  <path
                    d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z"
                    fill="#D9D9D9"
                  />
                </clipPath>
              </defs>
              <image
                clipPath="url(#clip-inverted)"
                preserveAspectRatio="xMidYMid slice"
                width={"100%"}
                height={"100%"}
                xlinkHref={heroImage}
              ></image>
            </svg>
            {/* Social icons inside image top-right */}
            {(hasGithub || hasKaggle || hasDemo) && (
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 flex gap-2">
                {hasGithub && (
                  <TimelineContent
                    as="a"
                    animationNum={5 + ghAnim}
                    timelineRef={heroRef}
                    customVariants={revealVariants}
                    href={project.githubUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="md:w-8 md:h-8 sm:w-7 w-6 sm:h-7 h-6 border border-gray-200 bg-white/90 backdrop-blur rounded-md flex items-center justify-center shadow-sm hover:bg-white transition"
                  >
                    <img src="https://pro-section.ui-layouts.com/github.svg" alt="github" width={22} height={22} />
                  </TimelineContent>
                )}
                {hasKaggle && (
                  <TimelineContent
                    as="a"
                    animationNum={5 + kgAnim}
                    timelineRef={heroRef}
                    customVariants={revealVariants}
                    href={project.kaggleUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Kaggle"
                    className="md:w-8 md:h-8 sm:w-7 w-6 sm:h-7 h-6 border border-gray-200 bg-white/90 backdrop-blur rounded-md flex items-center justify-center shadow-sm hover:bg-white transition"
                  >
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kaggle/kaggle-original.svg" alt="kaggle" width={20} height={20} />
                  </TimelineContent>
                )}
                {hasDemo && (
                  <TimelineContent
                    as="a"
                    animationNum={5 + dmAnim}
                    timelineRef={heroRef}
                    customVariants={revealVariants}
                    href={project.demoUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Live Demo"
                    className="md:w-8 md:h-8 sm:w-7 w-6 sm:h-7 h-6 border border-gray-200 bg-white/90 backdrop-blur rounded-md flex items-center justify-center shadow-sm hover:bg-white transition"
                  >
                    <img src="https://pro-section.ui-layouts.com/link.svg" alt="live" width={22} height={22} />
                  </TimelineContent>
                )}
              </div>
            )}
          </TimelineContent>

          {/* Stats (category beside SVG + stack) */}
          <div className="relative flex flex-wrap lg:justify-start justify-between items-center py-3 text-sm lg:pr-72 xl:pr-80">
            <TimelineContent
              as="div"
              animationNum={5}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="flex flex-wrap gap-4 min-w-0"
            >
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                <span className="text-red-500 font-bold">{project.category || "Project"}</span>
                <span className="text-gray-600">category</span>
                <span className="text-gray-300">|</span>
              </div>
              {techText && (
                <div className="flex items-center gap-2 mb-2 sm:text-base text-xs max-w-full">
                  <span className="text-red-500 font-bold break-words whitespace-normal">{techText}</span>
                  <span className="text-gray-600">stack</span>
                </div>
              )}
            </TimelineContent>
            <div className="lg:absolute right-0 bottom-16 lg:w-72 flex lg:flex-col flex-row-reverse lg:gap-0 gap-4">
              <TimelineContent
                as="div"
                animationNum={6}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="flex lg:text-4xl sm:text-3xl text-2xl items-center gap-2 mb-2 justify-end text-right leading-tight flex-wrap"
              >
                <span className="text-red-500 font-semibold">{rightBigLabel}</span>
                <span className="text-gray-600 uppercase">details</span>
              </TimelineContent>
              {rightSmallLabel && (
                <TimelineContent
                  as="div"
                  animationNum={7}
                  timelineRef={heroRef}
                  customVariants={revealVariants}
                  className="flex items-center gap-2 mb-2 sm:text-base text-xs justify-end text-right"
                >
                  <span className="text-red-500 font-bold">{rightSmallLabel}</span>
                  <span className="text-gray-600">info</span>
                  <span className="text-gray-300 lg:hidden block">|</span>
                </TimelineContent>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="sm:text-4xl md:text-5xl text-2xl !leading-[110%] font-semibold text-gray-900 mb-8">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.1}
                staggerFrom="first"
                reverse={true}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 30,
                  delay: 3,
                }}
              >
                {project.title}
              </VerticalCutReveal>
            </h1>

            <TimelineContent
              as="div"
              animationNum={9}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="grid md:grid-cols-2 gap-8 text-gray-600"
            >
              <TimelineContent
                as="div"
                animationNum={10}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="sm:text-base text-xs"
              >
                <p className="leading-relaxed text-justify">{descLeft}</p>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={11}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="sm:text-base text-xs"
              >
                <p className="leading-relaxed text-justify">{descRight}</p>
              </TimelineContent>
            </TimelineContent>
          </div>

          <div className="md:col-span-1">
            <div className="text-right">
              <TimelineContent
                as="div"
                animationNum={12}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-red-500 text-2xl font-bold mb-2"
              >
                {(project.category || "PROJECT").toUpperCase()}
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={13}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-gray-600 text-sm mb-8"
              >
                {techText || ""}
              </TimelineContent>

              <TimelineContent
                as={primaryCta ? "a" : "div"}
                animationNum={15}
                timelineRef={heroRef}
                customVariants={revealVariants}
                {...(primaryCta
                  ? {
                      href: primaryCta,
                      target: "_blank",
                      rel: "noreferrer",
                    }
                  : {})}
                className="bg-neutral-900 hover:bg-neutral-950 shadow-lg shadow-neutral-900 border border-neutral-700 flex w-fit ml-auto gap-2 hover:gap-4 transition-all duration-300 ease-in-out text-white px-5 py-3 rounded-lg cursor-pointer font-semibold"
              >
                {primaryCtaLabel || ""} {primaryCtaLabel && <ArrowRight className="" />}
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
