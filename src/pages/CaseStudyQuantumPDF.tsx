import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Seo } from "@/components/Seo";

export const CaseStudyQuantumPDF = () => {
  const [activeSection, setActiveSection] = useState("overview");

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
      tag: "Step 1",
      summary: "Drag and drop your PDF. Client-side processing extracts text, handles OCR for scanned documents, and prepares for intelligent chunking.",
      preview: "Processed a 200-page research paper in under 10 seconds, all in your browser.",
      actions: ["PDF.js parsing", "OCR support", "Progress tracking"],
    },
    {
      id: "chunk",
      title: "Chunk",
      tag: "Step 2",
      summary: "Adaptive chunking breaks documents into semantic pieces. Small docs get 300-600 token chunks, large ones get 900-1200 tokens, with 10% overlap for context.",
      preview: "Intelligently chunked 500+ pages while preserving sentence boundaries and table structures.",
      actions: ["Adaptive sizing", "Context overlap", "Boundary detection"],
    },
    {
      id: "vectorize",
      title: "Vectorize",
      tag: "Step 3",
      summary: "Each chunk becomes a 1536-dimension vector capturing semantic meaning. Stored in vector databases (Pinecone, ChromaDB, or Weaviate) with rich metadata.",
      preview: "Generated 1,200+ vectors from a single document, ready for instant semantic search.",
      actions: ["Embedding generation", "Metadata tagging", "Vector storage"],
    },
    {
      id: "retrieve",
      title: "Retrieve",
      tag: "Step 4",
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
      detail: "Users won't wait 30 seconds. I learned to obsess over every millisecond – optimizing vector search, smart caching, Web Workers. Result? Sub-3-second responses.",
    },
    {
      title: "Privacy actually matters",
      detail: "Client-side processing wasn't just a technical choice – it became a competitive advantage. People genuinely care about where their documents go.",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="QuantumPDF Case Study | RAG PDF Chat Application"
        description="Case study of QuantumPDF, a privacy-first RAG application for semantic PDF chat with vector search and fast cited answers."
        path="/case-study/quantumpdf"
        type="article"
        image="/og-quantumpdf.png"
        imageAlt="QuantumPDF RAG case study cover"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "QuantumPDF Case Study",
            description:
              "How QuantumPDF uses retrieval-augmented generation, adaptive chunking, and vector databases for PDF question answering.",
            author: {
              "@type": "Person",
              name: "Kedhar",
            },
            url: "https://kedhar.vercel.app/case-study/quantumpdf",
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://kedhar.vercel.app/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Case Study",
                item: "https://kedhar.vercel.app/case-study/quantumpdf",
              },
            ],
          },
        ]}
      />
      <Navigation />
      
      <main className="pt-32 pb-20">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:block fixed left-8 top-40 w-48 z-30">
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`block w-full text-left px-3 py-2 font-body text-sm transition-colors ${
                  activeSection === section.id
                    ? "text-primary font-medium border-l-2 border-primary"
                    : "text-foreground/50 hover:text-foreground border-l-2 border-transparent"
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </aside>
        {/* Hero Section */}
        <section id="overview" className="container-portfolio mb-20 lg:ml-64">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 font-body text-sm text-foreground/60 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Work
          </Link>

          <div className="max-w-5xl">
            <h1 className="font-heading text-5xl md:text-7xl font-normal text-foreground mb-6">
              QuantumPDF
            </h1>
            <p className="font-body text-xl md:text-2xl text-foreground/70 leading-relaxed mb-8">
              AI-powered chat platform that makes PDFs actually talk back to you
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="https://quantumn-pdf-chatapp.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background rounded-lg font-body text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Try Live Demo
              </a>
              <a
                href="https://github.com/Kedhareswer/QuantumPDF_ChatApp_VectorDB"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg font-body text-sm font-bold uppercase tracking-wider hover:bg-card/50 transition-colors"
              >
                <Github className="w-4 h-4" />
                View Code
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-border/20">
              <div>
                <p className="font-body text-xs uppercase tracking-wider text-foreground/50 mb-1">Role</p>
                <p className="font-body text-sm text-foreground">Full Stack Developer</p>
              </div>
              <div>
                <p className="font-body text-xs uppercase tracking-wider text-foreground/50 mb-1">Timeline</p>
                <p className="font-body text-sm text-foreground">2025</p>
              </div>
              <div>
                <p className="font-body text-xs uppercase tracking-wider text-foreground/50 mb-1">Type</p>
                <p className="font-body text-sm text-foreground">RAG Application</p>
              </div>
              <div>
                <p className="font-body text-xs uppercase tracking-wider text-foreground/50 mb-1">Stack</p>
                <p className="font-body text-sm text-foreground">Next.js 15, Vector DB, RAG</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Embed */}
        <section className="container-portfolio mb-20 lg:ml-64">
          <div className="w-full aspect-[16/9] bg-gradient-to-br from-primary/10 via-background to-background rounded-lg overflow-hidden">
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
        </section>

        {/* Experience Highlights */}
        <section id="experience" className="container-portfolio mb-20 lg:ml-64">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="flex flex-col gap-3">
              <p className="font-body text-xs uppercase tracking-[0.3em] text-primary/70">RAG Architecture</p>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground">How the product actually works</h2>
              <p className="font-body text-base md:text-lg text-foreground/70">
                Every interaction is a journey from PDF to answer. Less searching, more understanding.
              </p>
            </div>

            <div className="grid gap-6 md:gap-8 md:grid-cols-3">
              {experienceAreas.map((area) => (
                <div
                  key={area.title}
                  className="group relative h-full rounded-2xl border border-border/30 bg-card/30 p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:bg-card/60"
                >
                  <p className="font-body text-[10px] uppercase tracking-[0.4em] text-foreground/50 mb-4">
                    {area.label}
                  </p>
                  <h3 className="font-heading text-2xl text-foreground mb-3">{area.title}</h3>
                  <p className="font-body text-sm text-foreground/70 mb-5 leading-relaxed">{area.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {area.chips.map((chip) => (
                      <span
                        key={chip}
                        className="inline-flex items-center rounded-full border border-border/30 px-3 py-1 text-[11px] font-medium tracking-wide text-foreground/70"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                  <div className="absolute inset-x-4 bottom-4 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section id="architecture" className="container-portfolio mb-20 lg:ml-64">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="flex flex-col gap-3">
              <p className="font-body text-xs uppercase tracking-[0.3em] text-primary/70">RAG Pipeline</p>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground">The flow from PDF to answer</h2>
              <p className="font-body text-base md:text-lg text-foreground/70">
                Four steps that transform static documents into intelligent conversations.
              </p>
            </div>

            <div className="space-y-8">
              {ragPhases.map((phase, index) => (
                <div
                  key={phase.id}
                  className="group rounded-2xl border border-border/25 bg-card/30 p-6 md:p-8 transition-all hover:border-primary/50 hover:bg-card/50"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold font-heading">
                        {index + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-heading text-2xl text-foreground">{phase.title}</h3>
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
                            {phase.tag}
                          </span>
                        </div>
                        <p className="font-body text-sm text-foreground/70 mb-3">{phase.summary}</p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-16 space-y-3">
                    <p className="font-body text-sm text-primary/80 italic">{phase.preview}</p>
                    <div className="flex flex-wrap gap-2">
                      {phase.actions.map((action) => (
                        <span
                          key={action}
                          className="inline-flex items-center rounded-full border border-border/30 px-3 py-1 text-[11px] font-medium tracking-wide text-foreground/70"
                        >
                          {action}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results */}
        <section id="results" className="container-portfolio mb-20 lg:ml-64">
          <div className="max-w-5xl mx-auto space-y-12">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-6">
              The Results
            </h2>
            
            {/* Metrics Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-8 border border-primary/30 rounded-lg bg-gradient-to-br from-primary/5 to-transparent">
                <div className="font-heading text-5xl md:text-6xl text-primary mb-3">95%+</div>
                <p className="font-body text-sm font-medium text-foreground mb-2">Answer Accuracy</p>
                <p className="font-body text-xs text-foreground/50">Validated across 1000+ queries</p>
              </div>
              <div className="text-center p-8 border border-primary/30 rounded-lg bg-gradient-to-br from-primary/5 to-transparent">
                <div className="font-heading text-5xl md:text-6xl text-primary mb-3">&lt;3s</div>
                <p className="font-body text-sm font-medium text-foreground mb-2">Average Response Time</p>
                <p className="font-body text-xs text-foreground/50">Even on 200+ page documents</p>
              </div>
              <div className="text-center p-8 border border-primary/30 rounded-lg bg-gradient-to-br from-primary/5 to-transparent">
                <div className="font-heading text-5xl md:text-6xl text-primary mb-3">100%</div>
                <p className="font-body text-sm font-medium text-foreground mb-2">Client-Side Processing</p>
                <p className="font-body text-xs text-foreground/50">Your data never leaves your device</p>
              </div>
            </div>

            {/* Impact Statement */}
            <div className="bg-gradient-to-br from-card/20 to-transparent p-8 rounded-lg border border-border/20">
              <div className="flex items-start gap-4">
                <div className="text-4xl">💬</div>
                <div className="flex-1">
                  <p className="font-body text-lg text-foreground/90 italic leading-relaxed mb-4">
                    "The best result? I actually use this tool every single day. When your own project solves your own problem, you know you've built something worthwhile."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      K
                    </div>
                    <div>
                      <div className="font-body text-sm font-medium text-foreground">Kedhar</div>
                      <div className="font-body text-xs text-foreground/50">Creator & Developer</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Learnings */}
        <section id="learnings" className="container-portfolio mb-20 lg:ml-64">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="font-body text-xs uppercase tracking-[0.3em] text-primary/70 mb-2">Signals</p>
                <h2 className="font-heading text-3xl md:text-4xl text-foreground">Things I'm keeping</h2>
              </div>
              <div className="text-foreground/60 font-body text-sm">
                Short, honest notes captured after building.
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {learnings.map((item) => (
                <div key={item.title} className="rounded-2xl border border-border/20 bg-card/30 p-6">
                  <p className="font-heading text-xl text-foreground mb-3">{item.title}</p>
                  <p className="font-body text-sm text-foreground/70 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container-portfolio lg:ml-64">
          <div className="max-w-3xl mx-auto text-center py-16 border-y border-border/20">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-6">
              Ready to Transform Your PDF Experience?
            </h2>
            <p className="font-body text-lg text-foreground/70 mb-8">
              Join users who are already using QuantumPDF to make their documents intelligent.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://quantumn-pdf-chatapp.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-background rounded-lg font-body text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Try It Now
              </a>
              <a
                href="https://github.com/Kedhareswer/QuantumPDF_ChatApp_VectorDB"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground rounded-lg font-body text-sm font-bold uppercase tracking-wider hover:bg-card/50 transition-colors"
              >
                <Github className="w-4 h-4" />
                View Source
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer quote="The best way to predict the future is to build it, one PDF at a time." />
    </div>
  );
};
