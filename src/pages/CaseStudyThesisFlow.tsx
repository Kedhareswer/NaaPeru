import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const CaseStudyThesisFlow = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "story", label: "The Story" },
    { id: "problem", label: "The Problem" },
    { id: "solution", label: "The Solution" },
    { id: "features", label: "Key Features" },
    { id: "architecture", label: "Architecture" },
    { id: "challenges", label: "Challenges" },
    { id: "results", label: "Results" },
    { id: "learnings", label: "What I Learned" },
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

        {/* Main Image */}
        <section className="container-portfolio mb-20 lg:ml-64">
          <div className="w-full aspect-[16/9] bg-gradient-to-br from-primary/10 via-background to-background rounded-lg overflow-hidden">
            <img 
              src="/projects/research-bolt.png" 
              alt="ThesisFlow-AI Interface"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* The Story */}
        <section id="story" className="container-portfolio mb-20 lg:ml-64">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-6">
                  Why I Built This
                </h2>
                <div className="space-y-4 font-body text-base md:text-lg text-foreground/80 leading-relaxed">
                  <p>
                    Research is messy. You're juggling papers, notes, code experiments, and deadlines – all while trying to maintain some semblance of organization. I watched my friends struggle with this during their thesis work, bouncing between Google Docs, Notion, Trello, and random text files.
                  </p>
                  <p>
                    The problem wasn't a lack of tools. It was that none of them were built specifically for research workflows. They were general-purpose tools trying to fit a very specific, complex use case.
                  </p>
                </div>
              </div>
              
              {/* Visual: Research chaos */}
              <div className="relative aspect-square bg-gradient-to-br from-primary/10 to-background rounded-lg p-8 flex items-center justify-center border border-border/20">
                <div className="text-center space-y-6">
                  <div className="flex justify-center gap-4 text-4xl">
                    <div>📝</div>
                    <div>📊</div>
                    <div>💻</div>
                  </div>
                  <div className="font-mono text-sm text-foreground/50 space-y-2">
                    <div>→ Literature Review (Google Docs)</div>
                    <div>→ Task Management (Trello)</div>
                    <div>→ Notes (Notion)</div>
                    <div>→ Code (GitHub)</div>
                    <div>→ Timeline (Excel)</div>
                  </div>
                  <div className="text-2xl">🤯</div>
                </div>
              </div>
            </div>

            <div className="max-w-3xl">
              <p className="font-body text-base md:text-lg text-foreground/80 leading-relaxed mb-4">
                So I thought: what if there was a platform that understood research workflows from the ground up? That could integrate literature review, task planning, note-taking, and collaboration – all with AI assistance that actually understood your research domain.
              </p>
              <p className="text-primary font-medium text-lg">
                That's how ThesisFlow-AI was born – a research workspace that speaks your language 🎓
              </p>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section id="problem" className="container-portfolio mb-20 lg:ml-64">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-12">
              The Research Workflow Problem
            </h2>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div className="p-6 border border-border/20 rounded-lg bg-card/20">
                <h3 className="font-heading text-xl text-foreground mb-3">🗂️ Context Switching Hell</h3>
                <p className="font-body text-foreground/70">
                  Researchers spend hours jumping between 5-7 different tools. Each context switch kills productivity and breaks focus.
                </p>
              </div>
              <div className="p-6 border border-border/20 rounded-lg bg-card/20">
                <h3 className="font-heading text-xl text-foreground mb-3">👥 Collaboration Chaos</h3>
                <p className="font-body text-foreground/70">
                  Working with advisors means endless email threads, conflicting feedback, and version control nightmares.
                </p>
              </div>
              <div className="p-6 border border-border/20 rounded-lg bg-card/20">
                <h3 className="font-heading text-xl text-foreground mb-3">📚 Literature Overload</h3>
                <p className="font-body text-foreground/70">
                  Reading 50+ papers while keeping track of key findings, methodologies, and connections is overwhelming.
                </p>
              </div>
              <div className="p-6 border border-border/20 rounded-lg bg-card/20">
                <h3 className="font-heading text-xl text-foreground mb-3">⏰ Timeline Tracking</h3>
                <p className="font-body text-foreground/70">
                  Thesis deadlines are unforgiving, but most task managers don't understand research milestones and dependencies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Solution */}
        <section id="solution" className="container-portfolio mb-20 lg:ml-64">
          <div className="max-w-5xl mx-auto space-y-12">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-6">
                The Solution: AI-Powered Research Hub
              </h2>
              <div className="space-y-4 font-body text-base md:text-lg text-foreground/80 leading-relaxed">
                <p>
                  ThesisFlow-AI brings everything you need for research into one intelligent platform. It's not just about consolidation – it's about having AI agents that understand research methodology and can actively help you.
                </p>
              </div>
            </div>

            {/* Visual: Platform Architecture */}
            <div className="bg-gradient-to-br from-background to-card/20 p-8 rounded-lg border border-border/20">
              <h3 className="font-heading text-xl text-foreground mb-6 text-center">Unified Research Platform</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-background rounded-lg border border-primary/30">
                  <div className="text-4xl mb-3">🤖</div>
                  <div className="font-body text-sm font-bold text-foreground mb-2">AI Agents</div>
                  <div className="font-body text-xs text-foreground/60">
                    Research Assistant, Literature Reviewer, Task Planner
                  </div>
                </div>
                <div className="text-center p-6 bg-background rounded-lg border border-primary/30">
                  <div className="text-4xl mb-3">📊</div>
                  <div className="font-body text-sm font-bold text-foreground mb-2">Workspace</div>
                  <div className="font-body text-xs text-foreground/60">
                    Notes, Tasks, Timeline, Literature Library
                  </div>
                </div>
                <div className="text-center p-6 bg-background rounded-lg border border-primary/30">
                  <div className="text-4xl mb-3">👥</div>
                  <div className="font-body text-sm font-bold text-foreground mb-2">Collaboration</div>
                  <div className="font-body text-xs text-foreground/60">
                    Real-time Updates, Comments, Feedback
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section id="features" className="container-portfolio mb-20 lg:ml-64">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-12">
              Key Features
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border border-border/20 rounded-lg">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-heading text-lg text-foreground mb-2">Smart Task Management</h3>
                <p className="font-body text-sm text-foreground/70">
                  AI suggests task breakdowns based on research phases. Tracks dependencies and adjusts timelines automatically.
                </p>
              </div>
              <div className="p-6 border border-border/20 rounded-lg">
                <div className="text-3xl mb-3">📖</div>
                <h3 className="font-heading text-lg text-foreground mb-2">Literature Library</h3>
                <p className="font-body text-sm text-foreground/70">
                  Store papers, extract key findings, and let AI identify connections between different works.
                </p>
              </div>
              <div className="p-6 border border-border/20 rounded-lg">
                <div className="text-3xl mb-3">💡</div>
                <h3 className="font-heading text-lg text-foreground mb-2">Research Assistant</h3>
                <p className="font-body text-sm text-foreground/70">
                  AI agent that helps with methodology design, experiment planning, and literature synthesis.
                </p>
              </div>
              <div className="p-6 border border-border/20 rounded-lg">
                <div className="text-3xl mb-3">🔄</div>
                <h3 className="font-heading text-lg text-foreground mb-2">Real-time Collaboration</h3>
                <p className="font-body text-sm text-foreground/70">
                  WebSocket-powered updates mean your advisor sees changes instantly. No more version conflicts.
                </p>
              </div>
              <div className="p-6 border border-border/20 rounded-lg">
                <div className="text-3xl mb-3">📈</div>
                <h3 className="font-heading text-lg text-foreground mb-2">Progress Tracking</h3>
                <p className="font-body text-sm text-foreground/70">
                  Visualize your research journey with milestone tracking and progress analytics.
                </p>
              </div>
              <div className="p-6 border border-border/20 rounded-lg">
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="font-heading text-lg text-foreground mb-2">Beautiful UX</h3>
                <p className="font-body text-sm text-foreground/70">
                  Clean, distraction-free interface built with React and modern design principles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section id="architecture" className="container-portfolio mb-20 lg:ml-64">
          <div className="max-w-5xl mx-auto space-y-8">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-6">
              Technical Architecture
            </h2>
            
            <div className="space-y-6">
              <div className="p-6 border border-border/20 rounded-lg">
                <h3 className="font-heading text-xl text-primary mb-3">Multi-Agent AI System</h3>
                <p className="font-body text-foreground/80 mb-4">
                  Built specialized AI agents for different research tasks. Each agent has its own context, memory, and expertise:
                </p>
                <ul className="space-y-2 font-body text-foreground/70 ml-6">
                  <li>• <strong>Research Assistant:</strong> Helps with methodology and experimental design</li>
                  <li>• <strong>Literature Agent:</strong> Analyzes papers and suggests relevant readings</li>
                  <li>• <strong>Task Planner:</strong> Breaks down research phases into actionable tasks</li>
                  <li>• <strong>Writing Helper:</strong> Assists with drafting and editing</li>
                </ul>
              </div>

              <div className="p-6 border border-border/20 rounded-lg">
                <h3 className="font-heading text-xl text-primary mb-3">Real-time Collaboration Layer</h3>
                <p className="font-body text-foreground/80">
                  WebSocket connections for instant updates. Operational Transformation (OT) for conflict-free collaborative editing. Think Google Docs, but for research.
                </p>
              </div>

              <div className="p-6 border border-border/20 rounded-lg">
                <h3 className="font-heading text-xl text-primary mb-3">Modular Frontend</h3>
                <p className="font-body text-foreground/80">
                  React with component-based architecture. Each research tool (notes, tasks, library) is a self-contained module that can be extended independently.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Challenges */}
        <section id="challenges" className="container-portfolio mb-20 lg:ml-64">
          <div className="max-w-5xl mx-auto space-y-8">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-6">
              Challenges & Solutions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-xl text-foreground mb-3">🤔 AI Agent Context Management</h3>
                <p className="font-body text-foreground/80 mb-3">
                  <strong>Problem:</strong> Each AI agent needs to maintain context across long conversations while staying within token limits.
                </p>
                <p className="font-body text-foreground/70">
                  <strong>Solution:</strong> Implemented a context window manager that intelligently summarizes old conversations and keeps only relevant history. Agents can also query a vector database for past insights.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl text-foreground mb-3">⚡ Real-time Sync Performance</h3>
                <p className="font-body text-foreground/80 mb-3">
                  <strong>Problem:</strong> Syncing changes across multiple users in real-time without lag or conflicts.
                </p>
                <p className="font-body text-foreground/70">
                  <strong>Solution:</strong> Borrowed ideas from CRDTs and OT algorithms. Implemented optimistic updates on client-side with server reconciliation. 99% of edits happen instantly.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl text-foreground mb-3">📊 Complex State Management</h3>
                <p className="font-body text-foreground/80 mb-3">
                  <strong>Problem:</strong> Managing state across tasks, notes, literature, and AI conversations is complex.
                </p>
                <p className="font-body text-foreground/70">
                  <strong>Solution:</strong> Used a combination of React Context for global state and local state for component-specific data. Redux felt overkill, but needed something more structured than useState.
                </p>
              </div>
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
            <div className="mb-12">
              <p className="font-body text-xs uppercase tracking-[0.2em] text-foreground/50 mb-2">REFLECTION</p>
              <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground">
                What I Learned
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-4">
                <h3 className="font-heading text-xl md:text-2xl text-foreground mb-3">
                  AI agents need personality.
                </h3>
                <p className="font-body text-base text-foreground/70 leading-relaxed">
                  Generic AI responses don't work for research. Each agent needed its own "personality" and expertise area. The Literature Agent speaks academically, the Task Planner is pragmatic and deadline-focused. Users connect with specialized agents better than one generic assistant.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-heading text-xl md:text-2xl text-foreground mb-3">
                  Real-time is hard. Really hard.
                </h3>
                <p className="font-body text-base text-foreground/70 leading-relaxed">
                  Building collaborative features that work smoothly is way more complex than I expected. Conflict resolution, race conditions, network issues – there's a reason Google Docs took years to perfect. I gained massive respect for real-time systems engineering.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-heading text-xl md:text-2xl text-foreground mb-3">
                  User research is everything.
                </h3>
                <p className="font-body text-base text-foreground/70 leading-relaxed">
                  I spent weeks talking to PhD students and researchers before writing a line of code. Understanding their actual workflows (not what I assumed they needed) shaped every feature. The best products solve real problems, not imaginary ones.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-heading text-xl md:text-2xl text-foreground mb-3">
                  Ship early, iterate fast.
                </h3>
                <p className="font-body text-base text-foreground/70 leading-relaxed">
                  I wanted to build 50 features before launching. But getting early feedback transformed the product. Features I thought were essential were ignored. Features I thought were minor became the most loved. User feedback {'>'}  my assumptions, every time.
                </p>
              </div>
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

      <Footer />
    </div>
  );
};
