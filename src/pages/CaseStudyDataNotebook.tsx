import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Seo } from "@/components/Seo";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "story", label: "The Gap" },
  { id: "problem", label: "Problem Space" },
  { id: "research", label: "User Research" },
  { id: "solution", label: "Value Prop" },
  { id: "features", label: "Features" },
  { id: "results", label: "Results" },
  { id: "reflection", label: "Reflection" },
];

const problems = [
  {
    label: "Tool Complexity",
    title: "High barrier to entry",
    detail: "Jupyter requires Python knowledge. Excel lacks advanced visualization. Tableau is expensive and has a steep learning curve.",
  },
  {
    label: "Collaboration Gaps",
    title: "No real-time co-editing",
    detail: "Sharing analysis means exporting static PDFs or emailing notebooks back and forth. No live collaboration exists.",
  },
  {
    label: "Visualization Limits",
    title: "Charts need code",
    detail: "Creating interactive, beautiful visualizations requires coding skills. Business users can't explore data independently.",
  },
  {
    label: "Version Control",
    title: "Manual and error-prone",
    detail: "Tracking changes and maintaining versions of analysis is painful. No proper versioning system exists in most tools.",
  },
];

const features = [
  {
    label: "Interface",
    title: "Notebook Interface",
    detail: "Familiar notebook-style cells for code, markdown, and visualizations. Works like Jupyter but fully in the browser.",
  },
  {
    label: "Charts",
    title: "No-Code Visualizations",
    detail: "Create interactive charts with drag-and-drop. Powered by Recharts for beautiful, responsive visualizations.",
  },
  {
    label: "Collaboration",
    title: "Real-time Co-editing",
    detail: "Multiple team members can edit simultaneously. See changes instantly with presence indicators and comments.",
  },
  {
    label: "Versioning",
    title: "Version Control",
    detail: "Automatic versioning of notebooks. Restore previous versions and track changes over time.",
  },
  {
    label: "Data",
    title: "Data Connections",
    detail: "Connect to databases, APIs, and file uploads. Support for CSV, JSON, and live data sources.",
  },
  {
    label: "Performance",
    title: "Fast & Modern",
    detail: "Built with Next.js and Radix UI for a smooth, responsive experience on all devices.",
  },
];

const reflections = [
  {
    title: "Don't reinvent the wheel.",
    detail: "Innovation is important, but so is familiarity. The best approach was to bring a familiar experience to a place where it was needed. Users loved the Jupyter-style interface because it felt natural — I just made it collaborative and easier to use.",
  },
  {
    title: "Design meets business goals.",
    detail: "As a designer, we speak for the user but work for the business. Meeting the user's needs was the best way to keep users on the platform and increase engagement. Good UX isn't just pretty design — it's solving real problems.",
  },
  {
    title: "Real-time is a game-changer.",
    detail: "Adding real-time collaboration transformed how teams work. Watching multiple cursors move, seeing instant updates, leaving comments — it made data analysis feel social instead of isolated. This feature alone drove 80% of early adoption.",
  },
  {
    title: "Performance matters deeply.",
    detail: "Data analysts work with large datasets. Any lag destroys the experience. I learned to obsess over performance — lazy loading, virtualization, Web Workers for heavy computations. Speed is a feature, not a luxury.",
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

export const CaseStudyDataNotebook = () => {
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
        title="Data Notebook Case Study | Built by Kedhar (Kedhareswer)"
        description="Case study by Kedhar (Marlakunta Kedhareswer Naidu): Data Notebook is an interactive data analysis platform with code execution, rich visualization, and 95+ Lighthouse score."
        path="/case-study/data-notebook"
        type="article"
        image="/og-data-notebook.png"
        imageAlt="Data Notebook case study by Kedhar Kedhareswer Naidu"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Data Notebook Case Study",
            description: "How Data Notebook was designed to reduce analysis friction and improve collaboration for modern data teams.",
            author: { "@type": "Person", name: "Kedhar" },
            url: "https://kedhar.vercel.app/case-study/data-notebook",
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://kedhar.vercel.app/" },
              { "@type": "ListItem", position: 2, name: "Data Notebook Case Study", item: "https://kedhar.vercel.app/case-study/data-notebook" },
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
          <div className="absolute top-0 right-[-1rem] font-heading font-bold text-[clamp(4rem,12vw,12rem)] leading-none text-white/[0.025] select-none pointer-events-none tracking-tighter" aria-hidden="true">
            NOTEBOOK
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
            <Link to="/" className="inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.3em] text-foreground/40 hover:text-primary transition-colors mb-12">
              <ArrowLeft className="w-3 h-3" />
              Work
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="flex items-center gap-3 mb-3">
              <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary/70">Data Platform · Apr 2025</p>
              <span className="border border-primary/30 px-2 py-0.5 font-body text-[9px] uppercase tracking-[0.3em] text-primary/60">Pitched</span>
            </div>
            <div className="w-10 h-[2px] bg-primary mb-6" />
            <h1 className="font-heading text-[clamp(2.8rem,7vw,6.5rem)] font-bold tracking-tight leading-[1.0] text-foreground mb-4">
              Data <span className="text-primary">Notebook</span>
            </h1>
            <p className="font-body text-base text-foreground/60 max-w-[500px] leading-relaxed mb-10">
              Interactive data analysis platform for modern data teams — Jupyter's power, Notion's ease, Google Docs' collaboration.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }} className="flex flex-wrap gap-3 mb-12">
            <a href="https://data-science-platform.vercel.app/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background font-body text-xs font-bold uppercase tracking-[0.25em] hover:bg-primary/90 transition-colors">
              <ExternalLink className="w-3.5 h-3.5" /> Try Live Demo
            </a>
            <a href="https://github.com/Kedhareswer/Data_Science_Platform" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border/40 text-foreground font-body text-xs font-bold uppercase tracking-[0.25em] hover:border-primary/50 hover:bg-card/40 transition-colors">
              <Github className="w-3.5 h-3.5" /> View Code
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border/15">
            {[
              { label: "Role", value: "Product Designer" },
              { label: "Timeline", value: "Apr 2025" },
              { label: "Type", value: "Data Platform" },
              { label: "Stack", value: "Next.js · Radix · Recharts" },
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
                src="https://www.canva.com/design/DAG8HFLTrLM/jYRFzSdodC6VPQMD5M6HUA/view?embed"
                title="Data Notebook Walkthrough"
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

        {/* ── The Gap ── */}
        <section id="story" className="container-portfolio mb-20 lg:ml-64">
          <SectionReveal>
            <div className="mb-10">
              <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary/70 mb-3">Initial Findings</p>
              <div className="w-8 h-[2px] bg-primary mb-5" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">The data analysis gap</h2>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <SectionReveal delay={0.05}>
              <div className="space-y-4 font-body text-sm text-foreground/70 leading-relaxed">
                <p>
                  Data analysts spend 80% of their time cleaning and preparing data, leaving only 20% for actual analysis. Traditional tools like Excel and Jupyter are powerful but require significant technical expertise.
                </p>
                <p>
                  Teams struggle with collaboration, version control, and sharing insights. Analysis lives in siloed notebooks that are hard to reproduce and impossible to work on in real-time.
                </p>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.12}>
              <div className="border border-border/15 bg-card/30 p-8">
                <p className="font-body text-[9px] uppercase tracking-[0.35em] text-foreground/40 mb-6">Data Analyst's Day</p>
                <div className="space-y-5">
                  {[
                    { label: "Data Cleaning", pct: 50 },
                    { label: "Data Prep", pct: 30 },
                    { label: "Analysis & Insights", pct: 20 },
                  ].map(bar => (
                    <div key={bar.label}>
                      <div className="flex justify-between mb-2">
                        <span className="font-body text-xs text-foreground/70">{bar.label}</span>
                        <span className="font-heading text-xs font-bold text-primary">{bar.pct}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-border/20">
                        <div className="h-full bg-primary" style={{ width: `${bar.pct}%`, opacity: 0.4 + bar.pct / 200 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* ── Problem Space ── */}
        <section id="problem" className="container-portfolio mb-20 lg:ml-64">
          <SectionReveal>
            <div className="mb-10">
              <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary/70 mb-3">Into the Problem Space</p>
              <div className="w-8 h-[2px] bg-primary mb-5" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Understanding the challenges</h2>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-2 gap-4">
            {problems.map((p, i) => (
              <SectionReveal key={p.label} delay={i * 0.07}>
                <div className="border border-border/25 bg-card/40 p-6 transition-colors hover:border-primary/40">
                  <p className="font-body text-[9px] uppercase tracking-[0.35em] text-foreground/40 mb-3">{p.label}</p>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{p.title}</h3>
                  <p className="font-body text-sm text-foreground/70 leading-relaxed">{p.detail}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </section>

        {/* ── User Research ── */}
        <section id="research" className="container-portfolio mb-20 lg:ml-64">
          <SectionReveal>
            <div className="mb-10">
              <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary/70 mb-3">User Research</p>
              <div className="w-8 h-[2px] bg-primary mb-5" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">What data teams told us</h2>
            </div>
          </SectionReveal>

          <div className="space-y-3">
            {[
              { quote: "I spend hours formatting Excel charts when I should be analyzing trends.", role: "Data Analyst, SaaS Company" },
              { quote: "Our team can't collaborate on Jupyter notebooks in real-time. We email .ipynb files back and forth.", role: "Data Scientist, Fintech Startup" },
              { quote: "Business stakeholders want interactive dashboards, but I don't have time to build custom solutions.", role: "Analytics Manager, E-commerce" },
            ].map((q, i) => (
              <SectionReveal key={i} delay={i * 0.07}>
                <figure className="border border-border/15 bg-card/30 p-6 md:p-8">
                  <blockquote className="font-body text-sm text-foreground/80 italic leading-relaxed mb-4 pl-5 border-l-2 border-primary/60">
                    "{q.quote}"
                  </blockquote>
                  <figcaption className="font-body text-[9px] uppercase tracking-[0.3em] text-foreground/40">
                    — {q.role}
                  </figcaption>
                </figure>
              </SectionReveal>
            ))}
          </div>
        </section>

        {/* ── Value Prop ── */}
        <section id="solution" className="container-portfolio mb-20 lg:ml-64">
          <SectionReveal>
            <div className="mb-10">
              <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary/70 mb-3">Value Proposition</p>
              <div className="w-8 h-[2px] bg-primary mb-5" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-5">A better way to work with data</h2>
              <p className="font-body text-sm text-foreground/70 max-w-[520px] leading-relaxed">
                Data Notebook combines the power of Jupyter with the ease of Notion and the collaboration of Google Docs — designed for modern data teams who need to analyze, visualize, and share insights quickly.
              </p>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: "Setup", title: "Fast Setup", detail: "Start analyzing in seconds, not hours" },
              { label: "Teamwork", title: "Real Collaboration", detail: "Work together like Google Docs" },
              { label: "Output", title: "Beautiful Viz", detail: "No-code interactive charts" },
            ].map((b, i) => (
              <SectionReveal key={b.label} delay={i * 0.08}>
                <div className="border border-border/25 bg-card/40 p-6 transition-colors hover:border-primary/40">
                  <p className="font-body text-[9px] uppercase tracking-[0.35em] text-foreground/40 mb-3">{b.label}</p>
                  <p className="font-heading text-base font-bold text-foreground mb-1">{b.title}</p>
                  <p className="font-body text-xs text-foreground/60">{b.detail}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </section>

        {/* ── Key Features ── */}
        <section id="features" className="container-portfolio mb-20 lg:ml-64">
          <SectionReveal>
            <div className="mb-10">
              <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary/70 mb-3">What's Inside</p>
              <div className="w-8 h-[2px] bg-primary mb-5" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Key Features</h2>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <SectionReveal key={f.label} delay={i * 0.06}>
                <div className="border border-border/25 bg-card/40 p-6 transition-colors hover:border-primary/40">
                  <p className="font-body text-[9px] uppercase tracking-[0.35em] text-foreground/40 mb-3">{f.label}</p>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{f.title}</h3>
                  <p className="font-body text-sm text-foreground/70 leading-relaxed">{f.detail}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </section>

        {/* ── Results ── */}
        <section id="results" className="container-portfolio mb-20 lg:ml-64">
          <SectionReveal>
            <div className="mb-10">
              <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary/70 mb-3">Impact & Results</p>
              <div className="w-8 h-[2px] bg-primary mb-5" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Impact & Results</h2>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { value: "60%", label: "Faster Analysis", sub: "vs. traditional tools" },
              { value: "10+", label: "Teams Testing", sub: "Early access program" },
              { value: "4.8/5", label: "User Satisfaction", sub: "Average from beta users" },
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

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "User Feedback",
                rows: [
                  { label: "Would Recommend", value: "92%" },
                  { label: "Daily Active Users", value: "150+" },
                  { label: "Notebooks Created", value: "500+" },
                ],
              },
              {
                title: "Technical Excellence",
                rows: [
                  { label: "Load Time", value: "<1s" },
                  { label: "Uptime", value: "99.9%" },
                  { label: "Response Time", value: "<50ms" },
                ],
              },
            ].map((table, i) => (
              <SectionReveal key={table.title} delay={i * 0.1}>
                <div className="border border-border/15 bg-card/30 p-6">
                  <p className="font-body text-[9px] uppercase tracking-[0.35em] text-foreground/40 mb-5">{table.title}</p>
                  <div className="space-y-3">
                    {table.rows.map(row => (
                      <div key={row.label} className="flex justify-between items-center border-b border-border/10 pb-3 last:border-0 last:pb-0">
                        <span className="font-body text-sm text-foreground/70">{row.label}</span>
                        <span className="font-heading text-sm font-bold text-primary">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </section>

        {/* ── Reflection ── */}
        <section id="reflection" className="container-portfolio mb-20 lg:ml-64">
          <SectionReveal>
            <div className="mb-10">
              <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary/70 mb-3">Reflection</p>
              <div className="w-8 h-[2px] bg-primary mb-5" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">What I learned</h2>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-2 gap-4">
            {reflections.map((r, i) => (
              <SectionReveal key={r.title} delay={i * 0.07}>
                <div className="border border-border/25 bg-card/40 p-6 transition-colors hover:border-primary/40">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-3">{r.title}</h3>
                  <p className="font-body text-sm text-foreground/70 leading-relaxed">{r.detail}</p>
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
                Experience Data Notebook
              </h2>
              <p className="font-body text-sm text-foreground/60 mb-8 max-w-[400px]">
                See how modern data teams are analyzing faster and collaborating better.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://data-science-platform.vercel.app/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-background font-body text-xs font-bold uppercase tracking-[0.25em] hover:bg-primary/90 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" /> Try Live Demo
                </a>
                <a href="https://github.com/Kedhareswer/Data_Science_Platform" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-border/40 text-foreground font-body text-xs font-bold uppercase tracking-[0.25em] hover:border-primary/50 hover:bg-card/40 transition-colors">
                  <Github className="w-3.5 h-3.5" /> View Source
                </a>
              </div>
            </div>
          </SectionReveal>
        </section>
      </main>

      <Footer quote="Turns out, the best data tool is the one you build yourself. Who knew?" />
    </div>
  );
};
