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
  { id: "architecture", label: "Architecture" },
  { id: "results", label: "Results" },
  { id: "learnings", label: "Signals" },
];

const experienceAreas = [
  {
    label: "Upload",
    title: "Drag & Drop Intelligence",
    description: "Upload any PDF and watch it transform. Client-side processing means your documents never leave your device, while adaptive chunking breaks them into semantic pieces.",
    chips: ["PWA support", "Offline mode", "Smart chunking"],
  },
  {
    label: "Search",
    title: "Semantic Understanding",
    description: "Ask questions in natural language. Vector search finds relevant content by meaning, not just keywords. The system understands context and relationships.",
    chips: ["Vector search", "Context-aware", "Multi-provider AI"],
  },
  {
    label: "Response",
    title: "Instant Answers",
    description: "Get accurate, cited responses in seconds. The 3-phase self-reflective RAG ensures quality by validating retrieved chunks before generating answers.",
    chips: ["Sub-3s responses", "Source citations", "Confidence scores"],
  },
];

const ragPhases = [
  {
    id: "upload",
    title: "Upload",
    tag: "Step 01",
    summary: "Drag and drop your PDF. Client-side processing extracts text, handles OCR for scanned documents, and prepares for intelligent chunking.",
    preview: "Processed a 200-page research paper in under 10 seconds, all in your browser.",
    actions: ["PDF.js parsing", "OCR support", "Progress tracking"],
  },
  {
    id: "chunk",
    title: "Chunk",
    tag: "Step 02",
    summary: "Adaptive chunking breaks documents into semantic pieces. Small docs get 300–600 token chunks, large ones get 900–1200 tokens, with 10% overlap for context.",
    preview: "Intelligently chunked 500+ pages while preserving sentence boundaries and table structures.",
    actions: ["Adaptive sizing", "Context overlap", "Boundary detection"],
  },
  {
    id: "vectorize",
    title: "Vectorize",
    tag: "Step 03",
    summary: "Each chunk becomes a 1536-dimension vector capturing semantic meaning. Stored in vector databases (Pinecone, ChromaDB, Weaviate) with rich metadata.",
    preview: "Generated 1,200+ vectors from a single document, ready for instant semantic search.",
    actions: ["Embedding generation", "Metadata tagging", "Vector storage"],
  },
  {
    id: "retrieve",
    title: "Retrieve",
    tag: "Step 04",
    summary: "Your question becomes a vector. Cosine similarity finds the most relevant chunks. The 3-phase RAG validates quality before generating the final answer.",
    preview: "Retrieved top 5 relevant chunks from 10,000+ candidates in under 100ms.",
    actions: ["Semantic search", "Quality validation", "Context assembly"],
  },
];

const learnings = [
  {
    title: "RAG is powerful, but tricky",
    detail: "Getting chunking, retrieval, and generation right took way more iterations than expected. Each parameter affects quality, but when it works, it's magical.",
  },
  {
    title: "Performance is non-negotiable",
    detail: "Users won't wait 30 seconds. I learned to obsess over every millisecond — optimizing vector search, smart caching, Web Workers. Result? Sub-3-second responses.",
  },
  {
    title: "Privacy actually matters",
    detail: "Client-side processing wasn't just a technical choice — it became a competitive advantage. People genuinely care about where their documents go.",
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

export const CaseStudyQuantumPDF = () => {
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
        title="QuantumPDF Case Study | RAG System by Kedhar (Kedhareswer)"
        description="Case study by Kedhar (Marlakunta Kedhareswer Naidu): QuantumPDF is a RAG-powered PDF chat app with 82% semantic precision, adaptive chunking, and 20+ AI provider support."
        path="/case-study/quantumpdf"
        type="article"
        image="/og-quantumpdf.png"
        imageAlt="QuantumPDF RAG case study by Kedhar Kedhareswer Naidu"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "QuantumPDF Case Study",
            description: "How QuantumPDF uses retrieval-augmented generation, adaptive chunking, and vector databases for PDF question answering.",
            author: { "@type": "Person", name: "Kedhar" },
            url: "https://kedhar.vercel.app/case-study/quantumpdf",
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://kedhar.vercel.app/" },
              { "@type": "ListItem", position: 2, name: "QuantumPDF Case Study", item: "https://kedhar.vercel.app/case-study/quantumpdf" },
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
            QUANTUM
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
            <Link to="/" className="inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.3em] text-foreground/40 hover:text-primary transition-colors mb-12">
              <ArrowLeft className="w-3 h-3" />
              Work
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary/70 mb-3">RAG Application · 2025</p>
            <div className="w-10 h-[2px] bg-primary mb-6" />
            <h1 className="font-heading text-[clamp(2.8rem,7vw,6.5rem)] font-bold tracking-tight leading-[1.0] text-foreground mb-4">
              Quantum<span className="text-primary">PDF</span>
            </h1>
            <p className="font-body text-base text-foreground/60 max-w-[500px] leading-relaxed mb-10">
              AI-powered chat platform that makes PDFs actually talk back — with 82% semantic precision and zero server uploads.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }} className="flex flex-wrap gap-3 mb-12">
            <a href="https://quantumn-pdf-chatapp.netlify.app/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background font-body text-xs font-bold uppercase tracking-[0.25em] hover:bg-primary/90 transition-colors">
              <ExternalLink className="w-3.5 h-3.5" /> Try Live Demo
            </a>
            <a href="https://github.com/Kedhareswer/QuantumPDF_ChatApp_VectorDB" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border/40 text-foreground font-body text-xs font-bold uppercase tracking-[0.25em] hover:border-primary/50 hover:bg-card/40 transition-colors">
              <Github className="w-3.5 h-3.5" /> View Code
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border/15">
            {[
              { label: "Role", value: "Full Stack Developer" },
              { label: "Timeline", value: "2025" },
              { label: "Type", value: "RAG Application" },
              { label: "Stack", value: "Next.js 15 · Vector DB" },
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
                src="https://www.canva.com/design/DAG8G87f9Zc/geWJbg050_BPR2JGm27xWg/view?embed"
                title="QuantumPDF Walkthrough"
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
              <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary/70 mb-3">RAG Architecture</p>
              <div className="w-8 h-[2px] bg-primary mb-5" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">How the product actually works</h2>
              <p className="font-body text-sm text-foreground/60 max-w-[440px] leading-relaxed">
                Every interaction is a journey from PDF to answer. Less searching, more understanding.
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

        {/* ── Architecture ── */}
        <section id="architecture" className="container-portfolio mb-20 lg:ml-64">
          <SectionReveal>
            <div className="mb-10">
              <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary/70 mb-3">RAG Pipeline</p>
              <div className="w-8 h-[2px] bg-primary mb-5" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">The flow from PDF to answer</h2>
              <p className="font-body text-sm text-foreground/60 max-w-[440px] leading-relaxed">
                Four steps that transform static documents into intelligent conversations.
              </p>
            </div>
          </SectionReveal>

          <div className="space-y-3">
            {ragPhases.map((phase, i) => (
              <SectionReveal key={phase.id} delay={i * 0.07}>
                <div className="border border-border/25 bg-card/40 p-6 md:p-8 transition-colors hover:border-primary/40 hover:bg-card/60">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-10 h-10 border border-primary/40 bg-primary/5 flex items-center justify-center font-heading text-xs font-bold text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="font-heading text-lg font-bold text-foreground">{phase.title}</h3>
                        <span className="font-body text-[9px] uppercase tracking-[0.3em] text-primary/60 border border-primary/25 px-2 py-1">
                          {phase.tag}
                        </span>
                      </div>
                      <p className="font-body text-sm text-foreground/70 mb-3 leading-relaxed">{phase.summary}</p>
                      <p className="font-body text-[11px] italic text-primary/70 mb-3 pl-3 border-l border-primary/30">{phase.preview}</p>
                      <div className="flex flex-wrap gap-2">
                        {phase.actions.map(action => (
                          <span key={action} className="border border-border/20 px-2.5 py-1 font-body text-[10px] uppercase tracking-[0.2em] text-foreground/50">
                            {action}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
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
              { value: "95%+", label: "Answer Accuracy", sub: "Validated across 1000+ queries" },
              { value: "<3s", label: "Avg Response Time", sub: "Even on 200+ page documents" },
              { value: "100%", label: "Client-Side", sub: "Your data never leaves your device" },
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
                "The best result? I actually use this tool every single day. When your own project solves your own problem, you know you've built something worthwhile."
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
              <p className="font-body text-[11px] text-foreground/40 uppercase tracking-[0.2em]">Notes from building</p>
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
                Ready to transform your PDF experience?
              </h2>
              <p className="font-body text-sm text-foreground/60 mb-8 max-w-[400px]">
                Join users already using QuantumPDF to make their documents intelligent.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://quantumn-pdf-chatapp.netlify.app/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-background font-body text-xs font-bold uppercase tracking-[0.25em] hover:bg-primary/90 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" /> Try It Now
                </a>
                <a href="https://github.com/Kedhareswer/QuantumPDF_ChatApp_VectorDB" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-border/40 text-foreground font-body text-xs font-bold uppercase tracking-[0.25em] hover:border-primary/50 hover:bg-card/40 transition-colors">
                  <Github className="w-3.5 h-3.5" /> View Source
                </a>
              </div>
            </div>
          </SectionReveal>
        </section>
      </main>

      <Footer quote="The best way to predict the future is to build it, one PDF at a time." />
    </div>
  );
};
