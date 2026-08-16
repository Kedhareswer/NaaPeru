import { useEffect, useRef, type ReactNode } from "react";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import {
  CaseStudySidebar,
  CaseStudySection,
  SectionHeader,
  SectionReveal,
  CaseStudyCTA,
  type CaseStudyNavItem,
} from "@/components/case-study";
import {
  ProcessTree,
  ProcessWireframes,
  type WireframeStep,
} from "@/components/process";
import { scoreBySlug } from "@/lib/process/scores";
import { stageOf } from "@/lib/process/types";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const sections: CaseStudyNavItem[] = [
  { id: "project", label: "The Project" },
  { id: "about", label: "About" },
  { id: "features", label: "Features" },
  { id: "path", label: "Wireframes" },
];

const wireframes: WireframeStep[] = [
  {
    index: "01",
    title: "Landing",
    kind: "landing",
    note: "First contact. Brand, promise, one way in — Get Started.",
  },
  {
    index: "02",
    title: "Login",
    kind: "login",
    note: "Credentials gate. After this, the research workspace opens.",
  },
  {
    index: "03",
    title: "Explorer",
    kind: "explorer",
    note: "Search papers across sources. Save what matters.",
  },
  {
    index: "04",
    title: "Summarizer",
    kind: "summarizer",
    note: "Upload or paste. Extract claims with receipts.",
  },
  {
    index: "05",
    title: "Planner",
    kind: "planner",
    note: "Findings become dated tasks on a timeline.",
  },
  {
    index: "06",
    title: "Collaborate",
    kind: "collaborate",
    note: "Team chat and presence — same room as the work.",
  },
];

const aboutWords =
  "Research tools treat searching, summarizing, planning, and collaborating as separate apps. ThesisFlow puts them in one workspace so a question can become a shared schedule without losing the papers along the way.";

const springs = {
  snappy: { type: "spring" as const, stiffness: 400, damping: 30, mass: 1 },
};

const easeOut = [0.16, 1, 0.3, 1] as const;

function PressureAnchor({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 transition-[transform,filter,background-color,border-color,color] duration-500",
        "[transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
        "hover:scale-[0.97] active:scale-[0.94] hover:brightness-105",
        className,
      )}
    >
      {children}
    </a>
  );
}

export const CaseStudyThesisFlow = () => {
  const score = scoreBySlug("thesisflow");
  const architecture = score ? stageOf(score, "architecture") : undefined;

  const pageRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLParagraphElement>(null);
  const heroGlowRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (heroGlowRef.current && !reduce) {
        gsap.to(heroGlowRef.current, {
          opacity: 0.55,
          scale: 1.08,
          duration: 8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: 3,
        });
      }

      const words = aboutRef.current?.querySelectorAll("[data-scrub-word]");
      if (words?.length && !reduce) {
        gsap.set(words, { opacity: 0.12 });
        gsap.to(words, {
          opacity: 1,
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 75%",
            end: "bottom 45%",
            scrub: 0.7,
          },
        });
      } else if (words?.length) {
        gsap.set(words, { opacity: 1 });
      }

      const dividers = root.querySelectorAll("[data-rule]");
      dividers.forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "power3.out",
            duration: reduce ? 0.01 : 0.7,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="relative min-h-screen overflow-x-hidden bg-background">
      <Seo
        title="ThesisFlow AI Case Study | Built by Kedhar (Kedhareswer)"
        description="Case study by Kedhar: ThesisFlow AI — collaborative research workspace. Features, wireframe path, and shipped screens."
        path="/case-study/thesisflow"
        type="article"
        image="/og-thesisflow.png"
        imageAlt="ThesisFlow AI case study by Kedhar Kedhareswer Naidu"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "ThesisFlow-AI Case Study",
            description:
              "Process documentation for ThesisFlow AI — features, path, and shipped product.",
            author: { "@type": "Person", name: "Kedhar" },
            url: "https://kedhar.vercel.app/case-study/thesisflow",
          },
        ]}
      />

      {/* Reading progress */}
      <motion.div
        aria-hidden
        className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-primary"
        style={{ scaleX: progress }}
      />

      <Navigation />
      <CaseStudySidebar sections={sections} />

      <main className="w-full max-w-full overflow-x-hidden pb-24 pt-28">
        {/* ① The Project */}
        <section
          id="project"
          className="container-portfolio relative mb-28 overflow-hidden lg:ml-64 md:mb-36"
        >
          <div
            ref={heroGlowRef}
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-32 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.18)_0%,transparent_68%)] opacity-70 blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:radial-gradient(hsl(var(--foreground))_1px,transparent_1px)] [background-size:18px_18px]"
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springs.snappy, delay: 0.05 }}
          >
            <Link
              to="/"
              className="mb-12 inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.3em] text-foreground/40 transition-colors duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:text-primary"
            >
              <ArrowLeft className="h-3 w-3" />
              Work
            </Link>
          </motion.div>

          <div className="relative max-w-6xl">
            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.65, delay: 0.1, ease: easeOut }}
              className="mb-3 font-body text-[10px] uppercase tracking-[0.35em] text-primary/70"
            >
              ① · The Project
            </motion.p>
            <motion.div
              data-rule
              className="mb-6 h-[2px] w-8 origin-left bg-primary"
            />

            <h1 className="mb-5 max-w-5xl font-heading text-[clamp(2.75rem,6.5vw,5.25rem)] font-bold leading-[0.98] tracking-tight text-foreground">
              {(
                [
                  { text: "ThesisFlow", accent: false },
                  { text: "—", accent: true },
                  { text: "AI", accent: false },
                ] as const
              ).map((part, i) => (
                <span key={part.text} className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    className={cn("inline-block", part.accent && "text-primary")}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 0.7,
                      delay: 0.18 + i * 0.08,
                      ease: easeOut,
                    }}
                  >
                    {part.text}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42, ease: easeOut }}
              className="max-w-xl font-body text-base leading-relaxed text-foreground/55 md:text-lg"
            >
              Collaborative AI research workspace.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.52, ease: easeOut }}
              className="mt-6 font-body text-[10px] uppercase tracking-[0.28em] text-foreground/35"
            >
              Kedhar · Full Stack · 2025
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.58, ease: easeOut }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <PressureAnchor
                href="https://thesisflow-ai.vercel.app/"
                className="bg-primary px-5 py-2.5 font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground hover:bg-primary-hover"
              >
                Live Demo
                <ExternalLink className="h-3.5 w-3.5" />
              </PressureAnchor>
              <PressureAnchor
                href="https://github.com/Kedhareswer/ai-project-planner"
                className="border border-border/40 px-5 py-2.5 font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/70 hover:border-primary/40 hover:text-foreground"
              >
                Code
                <Github className="h-3.5 w-3.5" />
              </PressureAnchor>
            </motion.div>
          </div>
        </section>

        {/* ② About — scrubbing words */}
        <CaseStudySection id="about" className="mb-28 md:mb-36">
          <SectionHeader
            eyebrow="② · About"
            title="What it is"
            subtitle="One room for literature, summaries, plans, and the team."
          />
          <SectionReveal>
            <p
              ref={aboutRef}
              className="max-w-2xl font-body text-sm leading-[1.85] text-foreground/70 md:text-base md:leading-[1.9]"
            >
              {aboutWords.split(" ").map((word, i) => (
                <span key={`${word}-${i}`} data-scrub-word className="inline-block will-change-[opacity]">
                  {word}
                  {i < aboutWords.split(" ").length - 1 ? "\u00A0" : ""}
                </span>
              ))}
            </p>
          </SectionReveal>
        </CaseStudySection>

        {/* ③ Features */}
        <CaseStudySection id="features" className="mb-28 md:mb-36">
          <SectionHeader
            eyebrow="③ · Features"
            title="What you get"
            subtitle="Four feature folders. Each one clears a specific research friction."
          />
          {architecture && (
            <SectionReveal>
              <ProcessTree root={architecture.root} density="case-study" />
            </SectionReveal>
          )}
        </CaseStudySection>

        {/* ④ Wireframes — sketches of the path, not product shots */}
        <CaseStudySection id="path" className="mb-20 md:mb-28">
          <SectionHeader
            eyebrow="④ · Wireframes"
            title="How a user moves"
            subtitle="Landing → login → the four workspaces. Line sketches only."
          />
          <SectionReveal>
            <ProcessWireframes steps={wireframes} />
          </SectionReveal>
        </CaseStudySection>

        <CaseStudyCTA
          eyebrow="Next"
          title="Try the workspace"
          subtitle="Live demo or source — the product behind the wireframes."
          ctas={[
            {
              label: "Try It Now",
              href: "https://thesisflow-ai.vercel.app/",
              icon: <ExternalLink className="h-3.5 w-3.5" />,
              variant: "primary",
            },
            {
              label: "View Source",
              href: "https://github.com/Kedhareswer/ai-project-planner",
              icon: <Github className="h-3.5 w-3.5" />,
              variant: "secondary",
            },
          ]}
        />
      </main>

      <Footer quote="Who needs a research assistant when you can build one that actually shows up?" />
    </div>
  );
};
