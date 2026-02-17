import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Seo } from "@/components/Seo";

export const CaseStudyThesisFlow = () => {
  const [activeSection, setActiveSection] = useState("overview");

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

  const flowPhases = [
    {
      id: "discover",
      title: "Discover",
      tag: "Week 0–1",
      summary: "Upload every doc, chat, and idea dump. AI clusters literature, creates topic maps, and highlights gaps.",
      preview: "Generated a map linking 42 papers into 6 research themes in < 4 minutes.",
      actions: ["Drag & drop PDFs", "Auto-tag literature", "See topic galaxy"],
    },
    {
      id: "design",
      title: "Design",
      tag: "Week 2",
      summary: "Turn insights into a living plan. Milestones automatically inherit context, owners, and deadlines.",
      preview: "Sprint board drafted from literature takeaways + advisor feedback in one view.",
      actions: ["Phase templates", "Advisor handoff packet", "Risk heatmap"],
    },
    {
      id: "build",
      title: "Build",
      tag: "Week 3–6",
      summary: "Workspace shifts into execution mode. Notes, code snippets, and experiments stay attached to their tasks.",
      preview: "Notes + repo commits stitched into a timeline that advisors can replay.",
      actions: ["Inline notebooks", "Agent pair program", "Auto meeting notes"],
    },
    {
      id: "share",
      title: "Share",
      tag: "Week 7+",
      summary: "Generate briefs, export timelines, and collect sign-offs without duplicating work or rewriting copy.",
      preview: "One-click handoff doc with highlights, blockers, and next bets.",
      actions: ["Narrated recap", "Insight snapshots", "Advisor approval"],
    },
  ];

  const agentRoster = [
    {
      icon: "📚",
      name: "Atlas",
      focus: "Literature Intelligence",
      traits: ["Academic tone", "Citation linked", "Gap detection"],
    },
    {
      icon: "🧠",
      name: "Northstar",
      focus: "Planning & Risk",
      traits: ["Deadline obsessed", "Scenario sims", "Slack pings"],
    },
    {
      icon: "🎛️",
      name: "Pulse",
      focus: "Collaboration Ops",
      traits: ["Meeting recap", "Daily digest", "Advisor portal"],
    },
    {
      icon: "✍️",
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
      detail: "Usage spiked once agents showed up at predictable times (morning digest, Friday recap).",
    },
    {
      title: "Playful data works",
      detail: "Micro-victories (∑ papers digested, burnout risk dial) kept the UI human and made advisors smile.",
    },
  ];

  const quickStats = [
    { value: "5+", label: "Active Research Pods", sub: "Testing the workspace" },
    { value: "70%", label: "Faster Lit Review", sub: "Self-reported after 2 weeks" },
    { value: "12", label: "Agent Rituals", sub: "Scheduled touchpoints" },
  ];

  const [activePhase, setActivePhase] = useState(flowPhases[0].id);

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
        title="ThesisFlow-AI Case Study | Collaborative Research Workspace"
        description="Case study of ThesisFlow-AI, a multi-agent collaborative workspace that accelerates literature review and research execution."
        path="/case-study/thesisflow"
        type="article"
        image="/og-thesisflow.png"
        imageAlt="ThesisFlow AI case study cover"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "ThesisFlow-AI Case Study",
            description:
              "Design and engineering decisions behind a collaborative AI research platform with multi-agent workflows.",
            author: {
              "@type": "Person",
              name: "Kedhar",
            },
            url: "https://kedhar.vercel.app/case-study/thesisflow",
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
                item: "https://kedhar.vercel.app/case-study/thesisflow",
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
              ThesisFlow-AI
            </h1>
            <p className="font-body text-xl md:text-2xl text-foreground/70 leading-relaxed mb-8">
              Collaborative AI research workspace that actually understands your research
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="https://thesisflow-ai.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background rounded-lg font-body text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Try Live Demo
              </a>
              <a
                href="https://github.com/Kedhareswer/ai-project-planner"
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
                <p className="font-body text-sm text-foreground">AI Research Platform</p>
              </div>
              <div>
                <p className="font-body text-xs uppercase tracking-wider text-foreground/50 mb-1">Stack</p>
                <p className="font-body text-sm text-foreground">React, Node.js, AI Agents</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Embed */}
        <section className="container-portfolio mb-20 lg:ml-64">
          <div className="w-full aspect-[16/9] bg-gradient-to-br from-primary/10 via-background to-background rounded-lg overflow-hidden">
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
        </section>

        {/* Experience Highlights */}
        <section id="experience" className="container-portfolio mb-20 lg:ml-64">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="flex flex-col gap-3">
              <p className="font-body text-xs uppercase tracking-[0.3em] text-primary/70">Systems Thinking</p>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground">How the product actually feels</h2>
              <p className="font-body text-base md:text-lg text-foreground/70">
                Every block is a moment in the research day. Less reading, more playing with the interface.
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


        {/* Agents */}
        <section id="agents" className="container-portfolio mb-20 lg:ml-64">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="flex flex-col gap-3">
              <p className="font-body text-xs uppercase tracking-[0.3em] text-primary/70">Multi-agent Stack</p>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground">Who runs the workspace</h2>
              <p className="font-body text-base md:text-lg text-foreground/70">
                Agents show up like teammates. Each has a tone, a ritual, and a deliverable.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {agentRoster.map((agent) => (
                <div key={agent.name} className="rounded-2xl border border-border/25 bg-card/30 p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{agent.icon}</span>
                    <div>
                      <p className="font-heading text-xl text-foreground">{agent.name}</p>
                      <p className="font-body text-xs uppercase tracking-[0.3em] text-primary/70">{agent.focus}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 font-body text-sm text-foreground/75">
                    {agent.traits.map((trait) => (
                      <li key={trait} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-primary" />
                        {trait}
                      </li>
                    ))}
                  </ul>
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
                <div className="font-heading text-5xl md:text-6xl text-primary mb-3">5+</div>
                <p className="font-body text-sm font-medium text-foreground mb-2">Active Research Projects</p>
                <p className="font-body text-xs text-foreground/50">Using the platform daily</p>
              </div>
              <div className="text-center p-8 border border-primary/30 rounded-lg bg-gradient-to-br from-primary/5 to-transparent">
                <div className="font-heading text-5xl md:text-6xl text-primary mb-3">70%</div>
                <p className="font-body text-sm font-medium text-foreground mb-2">Faster Literature Review</p>
                <p className="font-body text-xs text-foreground/50">Reported by early users</p>
              </div>
              <div className="text-center p-8 border border-primary/30 rounded-lg bg-gradient-to-br from-primary/5 to-transparent">
                <div className="font-heading text-5xl md:text-6xl text-primary mb-3">10+</div>
                <p className="font-body text-sm font-medium text-foreground mb-2">AI Agents</p>
                <p className="font-body text-xs text-foreground/50">Specialized research assistants</p>
              </div>
            </div>

            {/* Impact Statement */}
            <div className="bg-gradient-to-br from-card/20 to-transparent p-8 rounded-lg border border-border/20">
              <div className="flex items-start gap-4">
                <div className="text-4xl">💬</div>
                <div className="flex-1">
                  <p className="font-body text-lg text-foreground/90 italic leading-relaxed mb-4">
                    "The goal wasn't just to build a tool – it was to change how researchers work. Early feedback has been incredible. People are finishing literature reviews faster, staying organized, and actually enjoying the research process."
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
                <h2 className="font-heading text-3xl md:text-4xl text-foreground">Things I’m keeping</h2>
              </div>
              <div className="text-foreground/60 font-body text-sm">
                Short, honest notes captured after each pilot.
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
              Ready to Transform Your Research?
            </h2>
            <p className="font-body text-lg text-foreground/70 mb-8">
              Join researchers who are already using ThesisFlow-AI to streamline their work.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://thesisflow-ai.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-background rounded-lg font-body text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Try It Now
              </a>
              <a
                href="https://github.com/Kedhareswer/ai-project-planner"
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

      <Footer quote="Who needs a research assistant when you can build one that actually shows up?" />
    </div>
  );
};
