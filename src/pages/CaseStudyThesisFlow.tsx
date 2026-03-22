import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Seo } from "@/components/Seo";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "experience", label: "Experience" },
  { id: "agents", label: "Agents" },
  { id: "results", label: "Results" },
  { id: "learnings", label: "Signals" },
];

const experienceAreas = [
  {
    label: "Workspace",
    title: "Research Canvas",
    description: "Sticky-note chaos becomes one spatial canvas. Papers, notes, and timelines sit on a single infinite board powered by snapping guides.",
    chips: ["Real-time cursors", "Focus mode", "AI summaries"],
  },
  {
    label: "Automation",
    title: "Flow Recipes",
    description: "Preset automations that tag papers, plan milestones, and keep advisors in the loop without touching a spreadsheet.",
    chips: ["Phase templates", "Auto notifications", "Smart reminders"],
  },
  {
    label: "Insights",
    title: "Signal Radar",
    description: "A daily digest that surfaces risk, overdue work, and surprising literature links. Runs on top of the same agent stack.",
    chips: ["Vector search", "Mood tracking", "Advisor briefs"],
  },
];

const agentRoster = [
  {
    name: "Atlas",
    focus: "Literature Intelligence",
    traits: ["Academic tone", "Citation linked", "Gap detection"],
  },
  {
    name: "Northstar",
    focus: "Planning & Risk",
    traits: ["Deadline obsessed", "Scenario sims", "Slack pings"],
  },
  {
    name: "Pulse",
    focus: "Collaboration Ops",
    traits: ["Meeting recap", "Daily digest", "Advisor portal"],
  },
  {
    name: "Drafty",
    focus: "Writing Partner",
    traits: ["Section outlines", "Voice matching", "Context aware"],
  },
];

const learnings = [
  {
    title: "Clarity over volume",
    detail: "Researchers skim. Replaced walls of copy with progressive disclosure, hover states, and agent hints.",
  },
  {
    title: "Agents need rituals",
    detail: "Usage spiked once agents showed up at predictable times — morning digest, Friday recap.",
  },
  {
    title: "Playful data works",
    detail: "Micro-victories (papers digested, burnout risk dial) kept the UI human and made advisors smile.",
  },
];

function SectionReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

export const CaseStudyThesisFlow = () => {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      const sectionEls = sections.map(s => document.getElementById(s.id));
      const scrollY = window.scrollY + 200;
      for (let i = sectionEls.length - 1; i >= 0; i--) {
        const el = sectionEls[i];
        if (el && el.offsetTop <= scrollY) { setActiveSection(sections[i].id); break; }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="ThesisFlow AI Case Study | Built by Kedhar (Kedhareswer)"
        description="Case study by Kedhar (Marlakunta Kedhareswer Naidu): ThesisFlow AI is a multi-agent collaborative research workspace with AI literature exploration, real-time collaboration, and project planning."
        path="/case-study/thesisflow"
        type="article"
        image="/og-thesisflow.png"
        imageAlt="ThesisFlow AI case study by Kedhar Kedhareswer Naidu"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "ThesisFlow-AI Case Study",
            description: "Design and engineering decisions behind a collaborative AI research platform with multi-agent workflows.",
            author: { "@type": "Person", name: "Kedhar" },
            url: "https://kedhar.vercel.app/case-study/thesisflow",
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://kedhar.vercel.app/" },
              { "@type": "ListItem", position: 2, name: "ThesisFlow Case Study", item: "https://kedhar.vercel.app/case-study/thesisflow" },
            ],
          },
        ]}
      />
      <Navigation />

      {/* Sticky sidebar */}
      <aside className="hidden lg:block fixed left-8 top-40 w-44 z-30">
        <p className="font-body text-[8px] uppercase tracking-[0.45em] text-foreground/25 mb-4">Contents</p>
        <nav className="border-l border-border/15">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              className={`block w-full text-left pl-3 pr-2 py-1.5 font-body text-[11px] tracking-wide transition-colors ${
                activeSection === s.id
                  ? "text-primary font-semibold border-l-2 border-primary -ml-px"
                  : "text-foreground/35 hover:text-foreground/60"
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="pt-28 pb-20">
        {/* ── Hero ── */}
        <section id="overview" className="container-portfolio mb-20 lg:ml-64 relative overflow-hidden">
          <div className="absolute top-0 right-[-1rem] font-heading font-bold text-[clamp(5rem,14vw,14rem)] leading-none text-white/[0.025] select-none pointer-events-none tracking-tighter" aria-hidden="true">
            THESIS
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
            <Link to="/" className="inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.3em] text-foreground/40 hover:text-primary transition-colors mb-12">
              <ArrowLeft className="w-3 h-3" />
              Work
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary/70 mb-3">Multi-Agent AI · 2025</p>
            <div className="w-10 h-[2px] bg-primary mb-6" />
            <h1 className="font-heading text-[clamp(2.8rem,7vw,6.5rem)] font-bold tracking-tight leading-[1.0] text-foreground mb-4">
              ThesisFlow<span className="text-primary">—</span>AI
            </h1>
            <p className="font-body text-base text-foreground/60 max-w-[500px] leading-relaxed mb-10">
              Collaborative AI research workspace that actually understands your research process — from literature to final draft.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }} className="flex flex-wrap gap-3 mb-12">
            <a href="https://thesisflow-ai.vercel.app/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background font-body text-xs font-bold uppercase tracking-[0.25em] hover:bg-primary/90 transition-colors">
              <ExternalLink className="w-3.5 h-3.5" /> Try Live Demo
            </a>
            <a href="https://github.com/Kedhareswer/ai-project-planner" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border/40 text-foreground font-body text-xs font-bold uppercase tracking-[0.25em] hover:border-primary/50 hover:bg-card/40 transition-colors">
              <Github className="w-3.5 h-3.5" /> View Code
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border/15">
            {[
              { label: "Role", value: "Full Stack Developer" },
              { label: "Timeline", value: "2025" },
              { label: "Type", value: "AI Research Platform" },
              { label: "Stack", value: "React · Node.js · Agents" },
            ].map(m => (
              <div key={m.label}>
                <p className="font-body text-[9px] uppercase tracking-[0.35em] text-foreground/40 mb-1">{m.label}</p>
                <p className="font-heading text-sm font-semibold text-foreground">{m.value}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── Canva Embed ── */}
        <section className="container-portfolio mb-20 lg:ml-64">
          <SectionReveal>
            <div className="w-full aspect-[16/9] border border-border/15 bg-card/20 overflow-hidden">
              <iframe
                src="https://www.canva.com/design/DAG8G7ym8Ms/RnHo4khSch3Grqr6Zuallw/view?embed"
                title="ThesisFlow-AI Walkthrough"
                className="w-full h-full"
                allow="fullscreen; clipboard-write; encrypted-media"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer"
                style={{ border: "0" }}
              />
            </div>
          </SectionReveal>
        </section>

        {/* ── Experience ── */}
        <section id="experience" className="container-portfolio mb-20 lg:ml-64">
          <SectionReveal>
            <div className="mb-10">
              <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary/70 mb-3">Systems Thinking</p>
              <div className="w-8 h-[2px] bg-primary mb-5" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">How the product actually feels</h2>
              <p className="font-body text-sm text-foreground/60 max-w-[440px] leading-relaxed">
                Every block is a moment in the research day. Less reading, more playing with the interface.
              </p>
            </div>
          </SectionReveal>

          <div className="grid gap-4 md:grid-cols-3">
            {experienceAreas.map((area, i) => (
              <SectionReveal key={area.title} delay={i * 0.08}>
                <div className="border border-border/25 bg-card/40 p-6 h-full transition-colors hover:border-primary/40 hover:bg-card/60">
                  <p className="font-body text-[9px] uppercase tracking-[0.4em] text-foreground/40 mb-4">{area.label}</p>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">{area.title}</h3>
                  <p className="font-body text-sm text-foreground/70 mb-5 leading-relaxed">{area.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {area.chips.map(chip => (
                      <span key={chip} className="border border-border/25 px-2.5 py-1 font-body text-[10px] uppercase tracking-[0.2em] text-foreground/50">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </section>

        {/* ── Agents ── */}
        <section id="agents" className="container-portfolio mb-20 lg:ml-64">
          <SectionReveal>
            <div className="mb-10">
              <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary/70 mb-3">Multi-Agent Stack</p>
              <div className="w-8 h-[2px] bg-primary mb-5" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">Who runs the workspace</h2>
              <p className="font-body text-sm text-foreground/60 max-w-[440px] leading-relaxed">
                Agents show up like teammates. Each has a tone, a ritual, and a deliverable.
              </p>
            </div>
          </SectionReveal>

          <div className="grid gap-4 md:grid-cols-2">
            {agentRoster.map((agent, i) => (
              <SectionReveal key={agent.name} delay={i * 0.07}>
                <div className="border border-border/25 bg-card/40 p-6 transition-colors hover:border-primary/40 hover:bg-card/60">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p className="font-heading text-lg font-bold text-foreground">{agent.name}</p>
                      <p className="font-body text-[9px] uppercase tracking-[0.3em] text-primary/70 mt-0.5">{agent.focus}</p>
                    </div>
                    <div className="w-8 h-8 border border-primary/30 bg-primary/5 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-primary" />
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {agent.traits.map(trait => (
                      <li key={trait} className="flex items-center gap-2.5 font-body text-[11px] text-foreground/60">
                        <div className="w-1 h-1 bg-primary/60 flex-shrink-0" />
                        {trait}
                      </li>
                    ))}
                  </ul>
                </div>
              </SectionReveal>
            ))}
          </div>
        </section>

        {/* ── Results ── */}
        <section id="results" className="container-portfolio mb-20 lg:ml-64">
          <SectionReveal>
            <div className="mb-10">
              <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary/70 mb-3">Impact</p>
              <div className="w-8 h-[2px] bg-primary mb-5" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">The Results</h2>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { value: "5+", label: "Active Research Projects", sub: "Using the platform daily" },
              { value: "70%", label: "Faster Literature Review", sub: "Self-reported after 2 weeks" },
              { value: "10+", label: "AI Agents", sub: "Specialized research assistants" },
            ].map((stat, i) => (
              <SectionReveal key={stat.label} delay={i * 0.08}>
                <div className="border border-border/15 bg-card/30 p-8">
                  <div className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-bold text-primary leading-none mb-3">{stat.value}</div>
                  <p className="font-body text-sm font-medium text-foreground mb-1">{stat.label}</p>
                  <p className="font-body text-[10px] uppercase tracking-[0.2em] text-foreground/40">{stat.sub}</p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.25}>
            <figure className="border border-border/15 bg-card/30 p-8 md:p-10">
              <blockquote className="font-body text-base text-foreground/80 italic leading-relaxed mb-6 pl-5 border-l-2 border-primary/60">
                "The goal wasn't just to build a tool — it was to change how researchers work. Early feedback has been incredible. People are finishing literature reviews faster, staying organized, and actually enjoying the research process."
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <div className="w-8 h-8 border border-primary/30 bg-primary/10 flex items-center justify-center font-heading text-xs font-bold text-primary">K</div>
                <div>
                  <p className="font-body text-sm font-medium text-foreground">Kedhar</p>
                  <p className="font-body text-[9px] uppercase tracking-[0.25em] text-foreground/40">Creator & Developer</p>
                </div>
              </figcaption>
            </figure>
          </SectionReveal>
        </section>

        {/* ── Learnings ── */}
        <section id="learnings" className="container-portfolio mb-20 lg:ml-64">
          <SectionReveal>
            <div className="flex items-end justify-between gap-4 flex-wrap mb-10">
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary/70 mb-3">Signals</p>
                <div className="w-8 h-[2px] bg-primary mb-5" />
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Things I'm keeping</h2>
              </div>
              <p className="font-body text-[11px] text-foreground/40 uppercase tracking-[0.2em]">Notes from each pilot</p>
            </div>
          </SectionReveal>

          <div className="grid gap-4 md:grid-cols-3">
            {learnings.map((item, i) => (
              <SectionReveal key={item.title} delay={i * 0.08}>
                <div className="border border-border/25 bg-card/40 p-6 transition-colors hover:border-primary/40">
                  <p className="font-heading text-lg font-bold text-foreground mb-3">{item.title}</p>
                  <p className="font-body text-sm text-foreground/70 leading-relaxed">{item.detail}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="container-portfolio lg:ml-64">
          <SectionReveal>
            <div className="border-t border-border/15 pt-16 pb-16">
              <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary/70 mb-3">Next Step</p>
              <div className="w-8 h-[2px] bg-primary mb-6" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
                Ready to transform your research?
              </h2>
              <p className="font-body text-sm text-foreground/60 mb-8 max-w-[400px]">
                Join researchers already using ThesisFlow-AI to streamline their work.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://thesisflow-ai.vercel.app/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-background font-body text-xs font-bold uppercase tracking-[0.25em] hover:bg-primary/90 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" /> Try It Now
                </a>
                <a href="https://github.com/Kedhareswer/ai-project-planner" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-border/40 text-foreground font-body text-xs font-bold uppercase tracking-[0.25em] hover:border-primary/50 hover:bg-card/40 transition-colors">
                  <Github className="w-3.5 h-3.5" /> View Source
                </a>
              </div>
            </div>
          </SectionReveal>
        </section>
      </main>

      <Footer quote="Who needs a research assistant when you can build one that actually shows up?" />
    </div>
  );
};
