import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";

/* ──────────────────────────────────────────────────────────────
 * /poreia — "How I work"
 * Five-phase narrative. Scroll-revealed, diary voice, camera/EXIF
 * vocabulary continued from the rest of the site.
 * Each project is one of these in some compressed form.
 * ────────────────────────────────────────────────────────────── */

type Phase = {
  num: string;            // "01"
  greek: string;          // Εἰσαγωγή
  greekRoman: string;     // Eisagogí
  title: string;          // "Intake"
  question: string;       // headline question
  body: string[];         // diary paragraphs
  artifact: {
    label: string;        // small uppercase tag on the artifact card
    kind: "callout" | "table" | "code" | "list" | "metric";
    content: unknown;     // shape depends on kind
  };
  exif: {
    duration: string;     // "~2 DAYS"
    tool: string;         // "NOTEPAD"
  };
};

const PHASES: Phase[] = [
  {
    num: "01",
    greek: "Εἰσαγωγή",
    greekRoman: "Eisagogí",
    title: "Intake",
    question: "What is the actual problem?",
    body: [
      "Most asks arrive wrapped in a solution. “Build a dashboard” usually means “we can’t tell what’s happening.” “Add AI” usually means “we’re behind a competitor.”",
      "Phase one is unwrapping the ask until the real shape of the problem shows up. Until then the dashboard and the AI are both expensive guesses.",
    ],
    artifact: {
      label: "QUESTIONS I ASK",
      kind: "list",
      content: [
        "What does “done” look like, exactly?",
        "Who notices if this works?",
        "What’s the cost of doing nothing?",
        "Whose problem stops being a problem?",
      ],
    },
    exif: { duration: "~2 DAYS", tool: "NOTEPAD" },
  },
  {
    num: "02",
    greek: "Ἀναζήτησις",
    greekRoman: "Anazítisis",
    title: "Explore",
    question: "What has been tried before?",
    body: [
      "A quick survey of three things — papers, products, and prior internal attempts. Papers say what’s theoretically possible. Products say what’s already commodity. Prior attempts say where the landmines are.",
      "By the end I have a one-page map: solved territory, contested territory, open frontier. Most of the time the answer is hiding in the second column.",
    ],
    artifact: {
      label: "TERRITORY MAP",
      kind: "table",
      content: [
        { col: "Solved", val: "Generic RAG, dense retrieval, function-calling agents" },
        { col: "Contested", val: "Long-context routing, multi-doc reasoning, cost↔latency tradeoffs" },
        { col: "Open frontier", val: "Domain-specific evals, agentic supervision, failure attribution" },
      ],
    },
    exif: { duration: "~3 DAYS", tool: "OBSIDIAN" },
  },
  {
    num: "03",
    greek: "Πρωτότυπος",
    greekRoman: "Prōtótupos",
    title: "Prototype",
    question: "What is the smallest thing that proves the thing?",
    body: [
      "Not a demo. A test. The smallest possible version that answers the phase-one question. If the question is “is RAG enough for this corpus,” the prototype is ten documents, five questions, hand-evaluated answers. No UI. No infrastructure.",
      "The point isn’t to be impressive. The point is to decide whether to keep going.",
    ],
    artifact: {
      label: "WHAT GETS BUILT",
      kind: "code",
      content: [
        "# the whole prototype",
        "docs = load(\"./10-pdfs\")",
        "index = embed(docs)",
        "for q in questions:",
        "    ctx = top_k(index, q, k=4)",
        "    print(q, llm(ctx + q))",
      ],
    },
    exif: { duration: "~1 WEEK", tool: "CURSOR" },
  },
  {
    num: "04",
    greek: "Δοκιμή",
    greekRoman: "Dokimí",
    title: "Test",
    question: "How does it break on purpose?",
    body: [
      "Adversarial questions, weird input shapes, the things that don’t appear in the demo flow but live in production. If the system breaks here, that’s a feature — failures found now are failures not shipped.",
      "I keep a running log: what broke, what I changed, what I’d do differently. The log outlives the project.",
    ],
    artifact: {
      label: "ADVERSARIAL CASES",
      kind: "list",
      content: [
        "Empty input → polite refusal, not crash.",
        "Question outside the corpus → “I don’t know.”",
        "Two contradicting sources → surface the disagreement.",
        "Prompt injection in the document body → ignored.",
        "Cold-start latency → measured, not hidden.",
      ],
    },
    exif: { duration: "~3 DAYS", tool: "PROD-LOG" },
  },
  {
    num: "05",
    greek: "Ἀποστολή",
    greekRoman: "Apostolí",
    title: "Ship",
    question: "Did it solve the problem from phase one?",
    body: [
      "Shipping is the easy part. Measuring is what most projects skip. I instrument the thing before launch so I can see whether it’s doing the job — not just whether it’s running.",
      "A week later, the metrics speak. If the answer is no, the loop restarts at phase one. If the answer is yes, the loop restarts somewhere else.",
    ],
    artifact: {
      label: "WHAT I WATCH",
      kind: "metric",
      content: [
        { name: "Answer accept rate", target: 85, unit: "%" },
        { name: "p95 latency", target: 1800, unit: "ms" },
        { name: "Cost per query", target: 4, unit: "¢" },
        { name: "Escalations to human", target: 6, unit: "%" },
      ],
    },
    exif: { duration: "ONGOING", tool: "GRAFANA" },
  },
];

/* ───────────── Hero with ghost ΠΟΡΕΙΑ parallax ───────────── */

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const ghostX = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden flex flex-col justify-end pb-24 pt-40"
    >
      {/* Ghost ΠΟΡΕΙΑ — giant, low-opacity, parallaxes horizontally */}
      <div className="container-portfolio relative">
        <div className="relative overflow-hidden">
          <motion.h1
            className="font-heading font-bold text-foreground/5 leading-[0.85] tracking-tighter select-none whitespace-nowrap"
            style={{
              x: ghostX,
              fontSize: "clamp(7rem, 22vw, 22rem)",
            }}
          >
            ΠΟΡΕΙΑ
          </motion.h1>
        </div>

        {/* Foreground intro */}
        <div className="mt-16 max-w-3xl space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-primary" />
            <span className="font-body text-xs uppercase tracking-[0.4em] text-primary/80">
              The Path &middot; How I work
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight text-foreground">
            Every project is the same five steps in different clothes.
          </h2>

          <p className="font-body text-base md:text-lg text-foreground/60 leading-relaxed max-w-2xl">
            Below: how I take a problem from intake to ship. Diary voice, written in the order I actually do it, with the small artifacts that fall out of each step.
          </p>

          {/* Phase index */}
          <div className="pt-8 border-t border-border/15">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-6 gap-y-4">
              {PHASES.map((p) => (
                <a
                  key={p.num}
                  href={`#phase-${p.num}`}
                  className="group flex flex-col gap-1 transition-opacity hover:opacity-100 opacity-60"
                >
                  <span className="font-heading text-xs font-semibold tracking-[0.2em] text-primary">
                    {p.num}
                  </span>
                  <span className="font-body text-sm uppercase tracking-[0.15em] text-foreground group-hover:text-primary transition-colors">
                    {p.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Phase section ───────────── */

function PhaseSection({ phase, index }: { phase: Phase; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Ghost keyword behind content parallaxes opposite to scroll
  const ghostX = useTransform(scrollYProgress, [0, 1], ["6%", "-12%"]);

  const reveal = inView
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 20 };
  const numberReveal = inView
    ? { y: 0 }
    : { y: "100%" };

  // Alternate left/right alignment per phase for rhythm — odd phases left, even phases right
  const isRight = index % 2 === 1;

  return (
    <section
      ref={ref}
      id={`phase-${phase.num}`}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* Ghost keyword behind everything — same family as the hero ΠΟΡΕΙΑ but smaller */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none flex items-center"
        style={{ x: ghostX }}
      >
        <span
          className="font-heading font-bold text-foreground/[0.035] leading-none tracking-tighter whitespace-nowrap select-none"
          style={{ fontSize: "clamp(7rem, 20vw, 18rem)" }}
        >
          {phase.title.toUpperCase()}
        </span>
      </motion.div>

      <div className="container-portfolio relative">
        <div className={`grid gap-12 lg:gap-20 lg:grid-cols-12 ${isRight ? "lg:flow-rtl" : ""}`}>
          {/* Left column — number + label + diary text */}
          <div className={`lg:col-span-7 ${isRight ? "lg:col-start-6" : ""}`}>
            {/* Big phase number with mask reveal */}
            <div className="overflow-hidden h-[8rem] md:h-[10rem] lg:h-[12rem]">
              <motion.div
                initial={false}
                animate={numberReveal}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="font-heading font-bold text-primary leading-none tracking-tighter"
                style={{ fontSize: "clamp(7rem, 12vw, 12rem)" }}
              >
                {phase.num}
              </motion.div>
            </div>

            {/* Greek + roman + English title */}
            <motion.div
              initial={false}
              animate={reveal}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-6 space-y-2"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-heading text-2xl md:text-3xl font-medium text-foreground">
                  {phase.greek}
                </span>
                <span className="font-body text-xs uppercase tracking-[0.3em] text-foreground/40">
                  {phase.greekRoman}
                </span>
              </div>
              <h3 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                {phase.title}
              </h3>
            </motion.div>

            {/* Question */}
            <motion.p
              initial={false}
              animate={reveal}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-8 font-heading text-xl md:text-2xl leading-snug text-foreground/80 italic max-w-xl"
            >
              {phase.question}
            </motion.p>

            {/* Diary paragraphs */}
            <div className="mt-8 space-y-5 max-w-xl">
              {phase.body.map((p, i) => (
                <motion.p
                  key={i}
                  initial={false}
                  animate={reveal}
                  transition={{ duration: 0.6, delay: 0.45 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="font-body text-[0.95rem] md:text-base text-foreground/70 leading-[1.7]"
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Right column — artifact card + EXIF markers */}
          <div className={`lg:col-span-5 ${isRight ? "lg:col-start-1 lg:row-start-1" : ""}`}>
            <motion.div
              initial={false}
              animate={inView ? { opacity: 1, clipPath: "inset(0 0 0 0)" } : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              transition={{ duration: 0.85, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative border border-border/25 bg-card/40 backdrop-blur p-6 md:p-8"
            >
              {/* EXIF corner markers — same vocabulary as Hero HEIGHT/AGE labels */}
              <div className="absolute right-3 top-3 z-10 text-right">
                <div className="font-heading text-[9px] uppercase tracking-[0.25em] text-primary/60">
                  Phase
                </div>
                <div className="font-heading text-[11px] font-medium text-primary mt-0.5">
                  {phase.num} / 05
                </div>
              </div>

              <div className="font-body text-[10px] uppercase tracking-[0.35em] text-foreground/40 mb-4">
                {phase.artifact.label}
              </div>

              {/* Artifact content — switches on kind */}
              <ArtifactContent kind={phase.artifact.kind} content={phase.artifact.content} />

              {/* Bottom EXIF row */}
              <div className="mt-6 pt-4 border-t border-border/15 flex items-center justify-between gap-4 text-[9px] uppercase tracking-[0.25em]">
                <div className="flex items-center gap-2 text-foreground/40">
                  <span>Duration</span>
                  <span className="text-foreground/70">{phase.exif.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-foreground/40">
                  <span>Tool</span>
                  <span className="text-foreground/70">{phase.exif.tool}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* row-direction helper — Tailwind doesn't ship lg:flow-rtl, fallback handled by order classes above */}
    </section>
  );
}

/* ───────────── Artifact renderers ───────────── */

function ArtifactContent({ kind, content }: { kind: Phase["artifact"]["kind"]; content: unknown }) {
  if (kind === "list") {
    return (
      <ul className="space-y-3">
        {(content as string[]).map((item, i) => (
          <li key={i} className="flex gap-3 items-start">
            <span className="font-heading text-[10px] text-primary/60 font-medium mt-1 w-5 flex-shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-body text-sm text-foreground/80 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (kind === "table") {
    return (
      <div className="space-y-3">
        {(content as { col: string; val: string }[]).map((row, i) => (
          <div key={i} className="grid grid-cols-[120px,1fr] gap-4 py-2 border-b border-border/10 last:border-b-0">
            <div className="font-body text-[10px] uppercase tracking-[0.25em] text-primary/70">{row.col}</div>
            <div className="font-body text-sm text-foreground/80 leading-relaxed">{row.val}</div>
          </div>
        ))}
      </div>
    );
  }
  if (kind === "code") {
    return (
      <pre className="font-mono text-[12px] leading-[1.7] text-foreground/80 whitespace-pre-wrap">
        {(content as string[]).map((line, i) => (
          <div key={i} className="flex gap-3">
            <span className="text-foreground/25 select-none w-5 text-right">{String(i + 1).padStart(2, "0")}</span>
            <span>{line}</span>
          </div>
        ))}
      </pre>
    );
  }
  if (kind === "metric") {
    const metrics = content as { name: string; target: number; unit: string }[];
    return (
      <div className="space-y-3">
        {metrics.map((m, i) => (
          <div key={i} className="flex items-baseline justify-between gap-4 py-2 border-b border-border/10 last:border-b-0">
            <span className="font-body text-sm text-foreground/80">{m.name}</span>
            <span className="font-heading text-base font-medium tabular-nums text-primary">
              {m.target}
              <span className="text-foreground/40 text-xs ml-0.5">{m.unit}</span>
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

/* ───────────── Closing section ───────────── */

function ClosingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 md:py-40 border-t border-border/15">
      <div className="container-portfolio">
        <div ref={ref} className="max-w-3xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-16 h-px bg-primary mx-auto origin-left"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-6"
          >
            <p className="font-heading text-2xl md:text-3xl text-foreground/90 italic leading-snug">
              And then the loop starts again.
            </p>
            <p className="font-body text-base text-foreground/60 leading-relaxed max-w-xl mx-auto">
              Every project is one of these in some compressed form. Some collapse into a day. Others stretch into months. The shape is the same.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="pt-8 font-body text-[10px] uppercase tracking-[0.4em] text-foreground/40"
          >
            Πορεία &middot; updated this week
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Page ───────────── */

const Poreia = () => {
  return (
    <div className="bg-background min-h-screen">
      <Seo
        title="Πορεία — How I work | Kedhar"
        description="Five-phase process narrative: how Kedhar (AI Engineer) takes a problem from intake through exploration, prototype, test, and ship."
        path="/poreia"
        image="/og-image.png"
        imageAlt="Poreia — How I work, by Kedhar"
      />
      <Navigation />
      <main>
        <HeroSection />
        {PHASES.map((phase, i) => (
          <PhaseSection key={phase.num} phase={phase} index={i} />
        ))}
        <ClosingSection />
      </main>
      <Footer quote="The shape of the work is more important than the volume of it." />
    </div>
  );
};

export default Poreia;
