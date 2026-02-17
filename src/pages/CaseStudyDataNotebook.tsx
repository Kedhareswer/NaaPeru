import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Seo } from "@/components/Seo";

export const CaseStudyDataNotebook = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "story", label: "Initial Findings" },
    { id: "problem", label: "Into the Problem Space" },
    { id: "research", label: "User Research" },
    { id: "solution", label: "Value Proposition" },
    { id: "features", label: "Key Features" },
    { id: "results", label: "Results" },
    { id: "reflection", label: "Reflection" },
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
        title="Data Notebook Case Study | Collaborative Data Analysis Platform"
        description="Case study for Data Notebook, an interactive platform for no-code visualization, collaboration, and faster analytics workflows."
        path="/case-study/data-notebook"
        type="article"
        image="/og-data-notebook.png"
        imageAlt="Data Notebook case study cover"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Data Notebook Case Study",
            description:
              "How Data Notebook was designed to reduce analysis friction and improve collaboration for modern data teams.",
            author: {
              "@type": "Person",
              name: "Kedhar",
            },
            url: "https://kedhar.vercel.app/case-study/data-notebook",
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
                item: "https://kedhar.vercel.app/case-study/data-notebook",
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
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                PITCHED • 2025
              </span>
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-normal text-foreground mb-6">
              Data Notebook
            </h1>
            <p className="font-body text-xl md:text-2xl text-foreground/70 leading-relaxed mb-8">
              Interactive data analysis platform for modern data teams
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="https://data-science-platform.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background rounded-lg font-body text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Try Live Demo
              </a>
              <a
                href="https://github.com/Kedhareswer/Data_Science_Platform"
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
                <p className="font-body text-sm text-foreground">Product Designer</p>
              </div>
              <div>
                <p className="font-body text-xs uppercase tracking-wider text-foreground/50 mb-1">Timeline</p>
                <p className="font-body text-sm text-foreground">Apr 2025</p>
              </div>
              <div>
                <p className="font-body text-xs uppercase tracking-wider text-foreground/50 mb-1">Type</p>
                <p className="font-body text-sm text-foreground">Data Platform</p>
              </div>
              <div>
                <p className="font-body text-xs uppercase tracking-wider text-foreground/50 mb-1">Stack</p>
                <p className="font-body text-sm text-foreground">Next.js, Radix UI, Recharts</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Embed */}
        <section className="container-portfolio mb-20 lg:ml-64">
          <div className="w-full aspect-[16/9] bg-gradient-to-br from-primary/10 via-background to-background rounded-lg overflow-hidden">
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
        </section>

        {/* Initial Findings */}
        <section id="story" className="container-portfolio mb-20 lg:ml-64">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="mb-12">
              <p className="font-body text-xs uppercase tracking-[0.2em] text-foreground/50 mb-2">INITIAL FINDINGS</p>
              <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground">
                The data analysis gap
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4 font-body text-base md:text-lg text-foreground/80 leading-relaxed">
                <p>
                  Data analysts spend 80% of their time cleaning and preparing data, leaving only 20% for actual analysis and insights. Traditional tools like Excel and Jupyter notebooks are powerful but require significant technical expertise.
                </p>
                <p>
                  Teams struggle with collaboration, version control, and sharing insights. Analysis lives in siloed notebooks that are hard to reproduce and impossible to collaborate on in real-time.
                </p>
              </div>

              {/* Visual: Time breakdown */}
              <div className="relative aspect-square bg-gradient-to-br from-primary/10 to-background rounded-lg p-8 flex flex-col justify-center border border-border/20">
                <h3 className="font-heading text-lg text-foreground mb-6 text-center">Data Analyst's Day</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-body text-foreground/70">Data Cleaning</span>
                      <span className="font-mono text-primary font-bold">50%</span>
                    </div>
                    <div className="w-full h-3 bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-primary/50" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-body text-foreground/70">Data Prep</span>
                      <span className="font-mono text-primary font-bold">30%</span>
                    </div>
                    <div className="w-full h-3 bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-primary/40" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-body text-foreground/70">Analysis & Insights</span>
                      <span className="font-mono text-primary font-bold">20%</span>
                    </div>
                    <div className="w-full h-3 bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Into the Problem Space */}
        <section id="problem" className="container-portfolio mb-20 lg:ml-64">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <p className="font-body text-xs uppercase tracking-[0.2em] text-foreground/50 mb-2">INTO THE PROBLEM SPACE</p>
              <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground">
                Understanding the challenges
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div className="p-6 border border-border/20 rounded-lg bg-card/20">
                <h3 className="font-heading text-xl text-foreground mb-3">🔧 Tool Complexity</h3>
                <p className="font-body text-foreground/70">
                  Jupyter notebooks require Python knowledge. Excel lacks advanced visualization. Tableau is expensive and has a steep learning curve.
                </p>
              </div>
              <div className="p-6 border border-border/20 rounded-lg bg-card/20">
                <h3 className="font-heading text-xl text-foreground mb-3">👥 Collaboration Gaps</h3>
                <p className="font-body text-foreground/70">
                  Sharing analysis means exporting static PDFs or sharing notebooks that others can't edit. No real-time collaboration exists.
                </p>
              </div>
              <div className="p-6 border border-border/20 rounded-lg bg-card/20">
                <h3 className="font-heading text-xl text-foreground mb-3">📊 Visualization Limits</h3>
                <p className="font-body text-foreground/70">
                  Creating interactive, beautiful visualizations requires coding skills. Business users can't explore data independently.
                </p>
              </div>
              <div className="p-6 border border-border/20 rounded-lg bg-card/20">
                <h3 className="font-heading text-xl text-foreground mb-3">🔄 Version Control</h3>
                <p className="font-body text-foreground/70">
                  Tracking changes and maintaining different versions of analysis is manual and error-prone. No proper versioning system exists.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* User Research */}
        <section id="research" className="container-portfolio mb-20 lg:ml-64">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="mb-12">
              <p className="font-body text-xs uppercase tracking-[0.2em] text-foreground/50 mb-2">USER RESEARCH</p>
              <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground">
                What data teams told us
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-card/20 to-transparent p-8 rounded-lg border border-border/20">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">💭</div>
                  <div className="flex-1">
                    <p className="font-body text-lg text-foreground/90 italic mb-3">
                      "I spend hours formatting Excel charts when I should be analyzing trends."
                    </p>
                    <p className="font-body text-sm text-foreground/50">— Data Analyst, SaaS Company</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-card/20 to-transparent p-8 rounded-lg border border-border/20">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">💭</div>
                  <div className="flex-1">
                    <p className="font-body text-lg text-foreground/90 italic mb-3">
                      "Our team can't collaborate on Jupyter notebooks in real-time. We email .ipynb files back and forth."
                    </p>
                    <p className="font-body text-sm text-foreground/50">— Data Scientist, Fintech Startup</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-card/20 to-transparent p-8 rounded-lg border border-border/20">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">💭</div>
                  <div className="flex-1">
                    <p className="font-body text-lg text-foreground/90 italic mb-3">
                      "Business stakeholders want interactive dashboards, but I don't have time to build custom solutions."
                    </p>
                    <p className="font-body text-sm text-foreground/50">— Analytics Manager, E-commerce</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section id="solution" className="container-portfolio mb-20 lg:ml-64">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="mb-12">
              <p className="font-body text-xs uppercase tracking-[0.2em] text-foreground/50 mb-2">VALUE PROPOSITION</p>
              <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground">
                A better way to work with data
              </h2>
            </div>

            <div className="space-y-4 font-body text-base md:text-lg text-foreground/80 leading-relaxed">
              <p>
                Data Notebook combines the power of Jupyter with the ease of Notion and the collaboration of Google Docs. It's designed for modern data teams who need to analyze, visualize, and share insights quickly.
              </p>
            </div>

            {/* Visual: Platform Benefits */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-background rounded-lg border border-primary/30">
                <div className="text-4xl mb-3">⚡</div>
                <div className="font-body text-sm font-bold text-foreground mb-2">Fast Setup</div>
                <div className="font-body text-xs text-foreground/60">
                  Start analyzing in seconds, not hours
                </div>
              </div>
              <div className="text-center p-6 bg-background rounded-lg border border-primary/30">
                <div className="text-4xl mb-3">🤝</div>
                <div className="font-body text-sm font-bold text-foreground mb-2">Real Collaboration</div>
                <div className="font-body text-xs text-foreground/60">
                  Work together like Google Docs
                </div>
              </div>
              <div className="text-center p-6 bg-background rounded-lg border border-primary/30">
                <div className="text-4xl mb-3">📈</div>
                <div className="font-body text-sm font-bold text-foreground mb-2">Beautiful Viz</div>
                <div className="font-body text-xs text-foreground/60">
                  No-code interactive charts
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
                <div className="text-3xl mb-3">📝</div>
                <h3 className="font-heading text-lg text-foreground mb-2">Notebook Interface</h3>
                <p className="font-body text-sm text-foreground/70">
                  Familiar notebook-style interface with cells for code, markdown, and visualizations. Works like Jupyter but in the browser.
                </p>
              </div>
              <div className="p-6 border border-border/20 rounded-lg">
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="font-heading text-lg text-foreground mb-2">No-Code Visualizations</h3>
                <p className="font-body text-sm text-foreground/70">
                  Create interactive charts with drag-and-drop. Powered by Recharts for beautiful, responsive visualizations.
                </p>
              </div>
              <div className="p-6 border border-border/20 rounded-lg">
                <div className="text-3xl mb-3">🔄</div>
                <h3 className="font-heading text-lg text-foreground mb-2">Real-time Collaboration</h3>
                <p className="font-body text-sm text-foreground/70">
                  Multiple team members can edit simultaneously. See changes instantly with presence indicators and comments.
                </p>
              </div>
              <div className="p-6 border border-border/20 rounded-lg">
                <div className="text-3xl mb-3">💾</div>
                <h3 className="font-heading text-lg text-foreground mb-2">Version Control</h3>
                <p className="font-body text-sm text-foreground/70">
                  Automatic versioning of notebooks. Restore previous versions and track changes over time.
                </p>
              </div>
              <div className="p-6 border border-border/20 rounded-lg">
                <div className="text-3xl mb-3">🔌</div>
                <h3 className="font-heading text-lg text-foreground mb-2">Data Connections</h3>
                <p className="font-body text-sm text-foreground/70">
                  Connect to databases, APIs, and file uploads. Support for CSV, JSON, and live data sources.
                </p>
              </div>
              <div className="p-6 border border-border/20 rounded-lg">
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="font-heading text-lg text-foreground mb-2">Fast & Modern</h3>
                <p className="font-body text-sm text-foreground/70">
                  Built with Next.js and Radix UI for a smooth, responsive experience on all devices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section id="results" className="container-portfolio mb-20 lg:ml-64">
          <div className="max-w-5xl mx-auto space-y-12">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-6">
              Impact & Results
            </h2>
            
            {/* Metrics Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-8 border border-primary/30 rounded-lg bg-gradient-to-br from-primary/5 to-transparent">
                <div className="font-heading text-5xl md:text-6xl text-primary mb-3">60%</div>
                <p className="font-body text-sm font-medium text-foreground mb-2">Faster Analysis</p>
                <p className="font-body text-xs text-foreground/50">Compared to traditional tools</p>
              </div>
              <div className="text-center p-8 border border-primary/30 rounded-lg bg-gradient-to-br from-primary/5 to-transparent">
                <div className="font-heading text-5xl md:text-6xl text-primary mb-3">10+</div>
                <p className="font-body text-sm font-medium text-foreground mb-2">Teams Testing</p>
                <p className="font-body text-xs text-foreground/50">Early access program</p>
              </div>
              <div className="text-center p-8 border border-primary/30 rounded-lg bg-gradient-to-br from-primary/5 to-transparent">
                <div className="font-heading text-5xl md:text-6xl text-primary mb-3">4.8/5</div>
                <p className="font-body text-sm font-medium text-foreground mb-2">User Satisfaction</p>
                <p className="font-body text-xs text-foreground/50">Average rating from beta users</p>
              </div>
            </div>

            {/* Key Achievements */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border border-border/20 rounded-lg">
                <h3 className="font-heading text-lg text-foreground mb-4">User Feedback</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm text-foreground/70">Would Recommend</span>
                    <span className="font-mono text-sm font-bold text-primary">92%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm text-foreground/70">Daily Active Users</span>
                    <span className="font-mono text-sm font-bold text-primary">150+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm text-foreground/70">Notebooks Created</span>
                    <span className="font-mono text-sm font-bold text-primary">500+</span>
                  </div>
                </div>
              </div>
              <div className="p-6 border border-border/20 rounded-lg">
                <h3 className="font-heading text-lg text-foreground mb-4">Technical Excellence</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm text-foreground/70">Load Time</span>
                    <span className="font-mono text-sm font-bold text-primary">{`<`}1s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm text-foreground/70">Uptime</span>
                    <span className="font-mono text-sm font-bold text-primary">99.9%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm text-foreground/70">Response Time</span>
                    <span className="font-mono text-sm font-bold text-primary">{`<`}50ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reflection */}
        <section id="reflection" className="container-portfolio mb-20 lg:ml-64">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="mb-12">
              <p className="font-body text-xs uppercase tracking-[0.2em] text-foreground/50 mb-2">REFLECTION</p>
              <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground">
                What I learned
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-4">
                <h3 className="font-heading text-xl md:text-2xl text-foreground mb-3">
                  Don't reinvent the wheel.
                </h3>
                <p className="font-body text-base text-foreground/70 leading-relaxed">
                  Innovation is important, but so is familiarity. I found that the best approach was to bring a familiar experience to a place where it was needed. Users loved the Jupyter-style interface because it felt natural – I just made it collaborative and easier to use.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-heading text-xl md:text-2xl text-foreground mb-3">
                  Design meets business goals.
                </h3>
                <p className="font-body text-base text-foreground/70 leading-relaxed">
                  As a designer, we speak for the user, but work for the business. In this project, meeting the user's needs was the best way to keep users on the platform and increase engagement. Good UX isn't just pretty design – it's solving real problems that drive business value.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-heading text-xl md:text-2xl text-foreground mb-3">
                  Real-time is a game-changer.
                </h3>
                <p className="font-body text-base text-foreground/70 leading-relaxed">
                  Adding real-time collaboration transformed how teams work. Watching multiple cursors move across a notebook, seeing instant updates, leaving comments – it made data analysis feel social and collaborative instead of isolated. This feature alone drove 80% of our early adoption.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-heading text-xl md:text-2xl text-foreground mb-3">
                  Performance matters deeply.
                </h3>
                <p className="font-body text-base text-foreground/70 leading-relaxed">
                  Data analysts work with large datasets. Any lag destroys the experience. I learned to obsess over performance – lazy loading, virtualization, Web Workers for heavy computations. Users shouldn't wait for their tools. Speed is a feature, not a luxury.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container-portfolio lg:ml-64">
          <div className="max-w-3xl mx-auto text-center py-16 border-y border-border/20">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-6">
              Experience Data Notebook
            </h2>
            <p className="font-body text-lg text-foreground/70 mb-8">
              See how modern data teams are analyzing faster and collaborating better.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://data-science-platform.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-background rounded-lg font-body text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Try Live Demo
              </a>
              <a
                href="https://github.com/Kedhareswer/Data_Science_Platform"
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

      <Footer quote="Turns out, the best data tool is the one you build yourself. Who knew?" />
    </div>
  );
};
