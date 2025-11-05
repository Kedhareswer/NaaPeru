import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const CaseStudyQuantumPDF = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "story", label: "The Story" },
    { id: "problem", label: "The Problem" },
    { id: "solution", label: "The Solution" },
    { id: "technical", label: "Technical Deep Dive" },
    { id: "features", label: "Features" },
    { id: "challenges", label: "Challenges" },
    { id: "results", label: "Results" },
    { id: "tech-stack", label: "Tech Stack" },
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
              QuantumPDF Chat App
            </h1>
            <p className="font-body text-xl md:text-2xl text-foreground/70 leading-relaxed mb-8">
              Making PDFs actually talk back to you (in a helpful way, not a sassy way)
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="https://quantumn-pdf-chatapp.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background font-body text-sm font-bold uppercase tracking-wider rounded-full hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Try Live Demo
              </a>
              <a
                href="https://github.com/Kedhareswer/QuantumPDF_ChatApp_VectorDB"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border/30 text-foreground font-body text-sm font-bold uppercase tracking-wider rounded-full hover:border-primary hover:text-primary transition-colors"
              >
                <Github className="w-4 h-4" />
                View Code
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-border/20">
              <div>
                <p className="font-body text-xs uppercase tracking-wider text-foreground/50 mb-1">Role</p>
                <p className="font-body text-sm text-foreground">Full Stack Dev</p>
              </div>
              <div>
                <p className="font-body text-xs uppercase tracking-wider text-foreground/50 mb-1">Timeline</p>
                <p className="font-body text-sm text-foreground">Jun 2025</p>
              </div>
              <div>
                <p className="font-body text-xs uppercase tracking-wider text-foreground/50 mb-1">Type</p>
                <p className="font-body text-sm text-foreground">RAG Application</p>
              </div>
              <div>
                <p className="font-body text-xs uppercase tracking-wider text-foreground/50 mb-1">Stack</p>
                <p className="font-body text-sm text-foreground">Next.js 15, React 19</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Image */}
        <section className="container-portfolio mb-20 lg:ml-64">
          <div className="w-full aspect-[16/9] bg-gradient-to-br from-primary/10 via-background to-background rounded-lg overflow-hidden">
            <img 
              src="/projects/quantumpdf.png" 
              alt="QuantumPDF Interface"
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
                  The "Why Did I Build This?" Story
                </h2>
                <div className="space-y-4 font-body text-base md:text-lg text-foreground/80 leading-relaxed">
                  <p>
                    So here's the thing – I was drowning in research papers. Like, literally hundreds of PDFs sitting in my downloads folder, each one promising to have that one piece of information I needed. But finding it? That was like searching for a specific grain of sand on a beach.
                  </p>
                  <p>
                    I'd open a PDF, Ctrl+F for keywords, get 47 results, read through all of them, and still not find what I was looking for. Why? Because I was searching for "machine learning optimization" but the paper called it "algorithmic enhancement" or some other fancy synonym.
                  </p>
                </div>
              </div>
              
              {/* Visual: Problem illustration */}
              <div className="relative aspect-square bg-gradient-to-br from-primary/10 to-background rounded-lg p-8 flex items-center justify-center border border-border/20">
                <div className="text-center space-y-4">
                  <div className="text-6xl">📚</div>
                  <div className="font-mono text-sm text-foreground/50">
                    <div>downloads/</div>
                    <div className="ml-4">research_paper_1.pdf</div>
                    <div className="ml-4">research_paper_2.pdf</div>
                    <div className="ml-4">research_paper_3.pdf</div>
                    <div className="ml-4">...</div>
                    <div className="ml-4 text-primary">research_paper_247.pdf</div>
                  </div>
                  <div className="text-2xl">😵</div>
                </div>
              </div>
            </div>

            <div className="max-w-3xl">
              <p className="font-body text-base md:text-lg text-foreground/80 leading-relaxed mb-4">
                That's when I thought: "What if my PDFs could just... understand what I'm asking?" Not just match keywords, but actually get the context and meaning. Like having a really smart friend who's read all your documents and can point you to exactly what you need.
              </p>
              <p className="text-primary font-medium text-lg">
                And that's how QuantumPDF was born – out of pure frustration and a lot of coffee ☕
              </p>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section id="problem" className="container-portfolio mb-20 lg:ml-64">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-12">
              The Problem (aka My Pain Points)
            </h2>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div className="p-6 border border-border/20 rounded-lg bg-card/20">
                <h3 className="font-heading text-xl text-foreground mb-3">📚 Information Overload</h3>
                <p className="font-body text-foreground/70">
                  Research papers, technical docs, legal documents – they're all important, but who has time to read 200 pages to find one answer?
                </p>
              </div>
              <div className="p-6 border border-border/20 rounded-lg bg-card/20">
                <h3 className="font-heading text-xl text-foreground mb-3">🔍 Keyword Search Fails</h3>
                <p className="font-body text-foreground/70">
                  Traditional Ctrl+F only finds exact matches. Miss one synonym and you miss crucial information.
                </p>
              </div>
              <div className="p-6 border border-border/20 rounded-lg bg-card/20">
                <h3 className="font-heading text-xl text-foreground mb-3">🔒 Privacy Concerns</h3>
                <p className="font-body text-foreground/70">
                  Uploading sensitive documents to random online tools? No thanks. I needed something I could trust with confidential information.
                </p>
              </div>
              <div className="p-6 border border-border/20 rounded-lg bg-card/20">
                <h3 className="font-heading text-xl text-foreground mb-3">⚡ Speed Matters</h3>
                <p className="font-body text-foreground/70">
                  Waiting 30 seconds for an answer kills productivity. I needed instant, accurate responses.
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
                The Solution: RAG to the Rescue
              </h2>
              <div className="space-y-4 font-body text-base md:text-lg text-foreground/80 leading-relaxed">
                <p>
                  Enter RAG – Retrieval-Augmented Generation. Fancy name, but the concept is simple: instead of just searching for keywords, we turn your questions and documents into mathematical representations (vectors) that capture meaning.
                </p>
                <p>
                  Think of it like this: if you ask "How do I improve model accuracy?", the system understands that's related to "enhancing performance", "optimization techniques", and "reducing errors" – even if those exact words aren't in your question.
                </p>
              </div>
            </div>

            {/* Visual: Before vs After */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border border-border/20 rounded-lg bg-card/10">
                <div className="text-center mb-4">
                  <span className="inline-block px-3 py-1 bg-foreground/10 text-foreground/60 rounded-full text-xs font-bold uppercase tracking-wider">Before</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-foreground/40">Search:</span>
                    <code className="bg-background px-2 py-1 rounded text-foreground/70">"machine learning optimization"</code>
                  </div>
                  <div className="text-center text-4xl my-4">❌</div>
                  <div className="text-xs text-foreground/50 text-center">
                    Paper uses "algorithmic enhancement"<br/>
                    <span className="text-primary">0 results found</span>
                  </div>
                </div>
              </div>

              <div className="p-6 border border-primary/30 rounded-lg bg-primary/5">
                <div className="text-center mb-4">
                  <span className="inline-block px-3 py-1 bg-primary text-background rounded-full text-xs font-bold uppercase tracking-wider">After (RAG)</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-foreground/40">Ask:</span>
                    <code className="bg-background px-2 py-1 rounded text-foreground">"How to improve model accuracy?"</code>
                  </div>
                  <div className="text-center text-4xl my-4">✅</div>
                  <div className="text-xs text-foreground/70 text-center">
                    Understands semantic meaning<br/>
                    <span className="text-primary font-bold">Finds relevant sections instantly</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-transparent p-8 rounded-lg border border-primary/20">
              <h3 className="font-heading text-2xl text-foreground mb-4">How It Actually Works</h3>
              <ol className="space-y-4 font-body text-foreground/80">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">1.</span>
                  <span><strong>Upload Your PDF:</strong> Drag, drop, done. Works offline too (PWA magic).</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">2.</span>
                  <span><strong>Smart Chunking:</strong> The PDF gets broken into intelligent chunks (300-1200 tokens) with 10% overlap so context isn't lost.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">3.</span>
                  <span><strong>Vector Magic:</strong> Each chunk becomes a 1536-dimension vector (yeah, math is wild). These vectors capture the semantic meaning.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">4.</span>
                  <span><strong>Ask Anything:</strong> Your question also becomes a vector, and we find the most similar chunks using cosine similarity.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">5.</span>
                  <span><strong>AI Response:</strong> The relevant chunks are sent to the AI (OpenAI, Groq, or Gemini) which generates a natural, accurate answer.</span>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Technical Deep Dive */}
        <section id="technical" className="container-portfolio mb-20 lg:ml-64">
          <div className="max-w-5xl mx-auto space-y-12">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-6">
                The Nerdy Technical Stuff
              </h2>
              <p className="font-body text-base md:text-lg text-foreground/80 leading-relaxed">
                (Feel free to skip this if you're not into the technical details, but if you are, buckle up!)
              </p>
            </div>

            {/* Visual: RAG Flow Diagram */}
            <div className="bg-gradient-to-br from-background to-card/20 p-8 rounded-lg border border-border/20">
              <h3 className="font-heading text-xl text-foreground mb-6 text-center">RAG Pipeline Flow</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-background rounded-lg border border-primary/30">
                  <div className="text-3xl mb-2">📄</div>
                  <div className="font-body text-xs font-bold text-foreground mb-1">1. Upload PDF</div>
                  <div className="font-mono text-[10px] text-foreground/50">Document Input</div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-primary text-2xl">→</div>
                </div>
                <div className="text-center p-4 bg-background rounded-lg border border-primary/30">
                  <div className="text-3xl mb-2">✂️</div>
                  <div className="font-body text-xs font-bold text-foreground mb-1">2. Smart Chunk</div>
                  <div className="font-mono text-[10px] text-foreground/50">300-1200 tokens</div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-primary text-2xl">→</div>
                </div>
                <div className="text-center p-4 bg-background rounded-lg border border-primary/30">
                  <div className="text-3xl mb-2">🧮</div>
                  <div className="font-body text-xs font-bold text-foreground mb-1">3. Vectorize</div>
                  <div className="font-mono text-[10px] text-foreground/50">1536 dimensions</div>
                </div>
              </div>
              <div className="text-center my-4">
                <div className="text-primary text-2xl">↓</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-background rounded-lg border border-primary/30">
                  <div className="text-3xl mb-2">💬</div>
                  <div className="font-body text-xs font-bold text-foreground mb-1">4. User Query</div>
                  <div className="font-mono text-[10px] text-foreground/50">Natural language</div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-primary text-2xl">→</div>
                </div>
                <div className="text-center p-4 bg-background rounded-lg border border-primary/30">
                  <div className="text-3xl mb-2">🔍</div>
                  <div className="font-body text-xs font-bold text-foreground mb-1">5. Search</div>
                  <div className="font-mono text-[10px] text-foreground/50">Cosine similarity</div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-primary text-2xl">→</div>
                </div>
                <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary">
                  <div className="text-3xl mb-2">✨</div>
                  <div className="font-body text-xs font-bold text-primary mb-1">6. AI Answer</div>
                  <div className="font-mono text-[10px] text-foreground/50">Context-aware</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-xl text-primary mb-3">Adaptive Chunking Strategy</h3>
                <p className="font-body text-foreground/80 mb-3">
                  Not all documents are created equal. A 10-page research paper needs different chunking than a 200-page legal document. So I built an adaptive system:
                </p>
                <ul className="space-y-2 font-body text-foreground/70 ml-6">
                  <li>• Small docs (1-50 pages): 300-600 token chunks</li>
                  <li>• Medium docs (51-200 pages): 600-900 token chunks</li>
                  <li>• Large docs (200+ pages): 900-1200 token chunks</li>
                  <li>• 10% overlap between chunks to maintain context</li>
                  <li>• Respects sentence boundaries (no mid-sentence cuts)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-heading text-xl text-primary mb-3">3-Phase Self-Reflective RAG</h3>
                <p className="font-body text-foreground/80 mb-3">
                  This is where it gets cool. Instead of just grabbing chunks and generating an answer, QuantumPDF uses a 3-phase approach:
                </p>
                <ol className="space-y-3 font-body text-foreground/70">
                  <li>
                    <strong className="text-foreground">Phase 1 - Initial Retrieval:</strong> Find the most relevant chunks based on semantic similarity.
                  </li>
                  <li>
                    <strong className="text-foreground">Phase 2 - Quality Check:</strong> The AI evaluates if the retrieved chunks actually answer the question. If not, it refines the search.
                  </li>
                  <li>
                    <strong className="text-foreground">Phase 3 - Response Generation:</strong> Generate the final answer with citations and confidence scores.
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="font-heading text-xl text-primary mb-3">Vector Database Storage</h3>
                <p className="font-body text-foreground/80 mb-3">
                  Each chunk is stored with rich metadata:
                </p>
                <div className="bg-background/50 border border-border/20 rounded-lg p-4 font-mono text-sm text-foreground/70 overflow-x-auto">
                  <pre>{`{
  "id": "doc1_chunk1",
  "vector": [0.1, 0.3, -0.2, ...], // 1536 dimensions
  "metadata": {
    "document_id": "doc1",
    "page": 1,
    "chunk_index": 0,
    "title": "Research Paper Title"
  },
  "content": "Original text content..."
}`}</pre>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-xl text-primary mb-3">Multi-Provider AI Support</h3>
                <p className="font-body text-foreground/80">
                  Why lock into one AI provider? QuantumPDF supports OpenAI, Groq, and Google Gemini. You can switch between them based on your needs (or budget 😅).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Showcase */}
        <section id="features" className="container-portfolio mb-20 lg:ml-64">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-6">
              Cool Features I'm Proud Of
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border border-border/20 rounded-lg">
                <div className="text-3xl mb-3">📱</div>
                <h3 className="font-heading text-lg text-foreground mb-2">Progressive Web App</h3>
                <p className="font-body text-sm text-foreground/70">
                  Install it like a native app. Works offline. Syncs when you're back online. It's 2025, your apps should work everywhere.
                </p>
              </div>
              <div className="p-6 border border-border/20 rounded-lg">
                <div className="text-3xl mb-3">🔍</div>
                <h3 className="font-heading text-lg text-foreground mb-2">Semantic Search</h3>
                <p className="font-body text-sm text-foreground/70">
                  Finds content by meaning, not just keywords. Ask in natural language and get natural answers.
                </p>
              </div>
              <div className="p-6 border border-border/20 rounded-lg">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="font-heading text-lg text-foreground mb-2">Lightning Fast</h3>
                <p className="font-body text-sm text-foreground/70">
                  Optimized chunking, efficient vector search, and smart caching. Answers in seconds, not minutes.
                </p>
              </div>
              <div className="p-6 border border-border/20 rounded-lg">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-heading text-lg text-foreground mb-2">Context-Aware</h3>
                <p className="font-body text-sm text-foreground/70">
                  Maintains conversation history. Ask follow-up questions and it remembers what you talked about.
                </p>
              </div>
              <div className="p-6 border border-border/20 rounded-lg">
                <div className="text-3xl mb-3">🔒</div>
                <h3 className="font-heading text-lg text-foreground mb-2">Privacy First</h3>
                <p className="font-body text-sm text-foreground/70">
                  Your documents stay in your browser. Client-side processing means your data never leaves your device.
                </p>
              </div>
              <div className="p-6 border border-border/20 rounded-lg">
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="font-heading text-lg text-foreground mb-2">Clean UI</h3>
                <p className="font-body text-sm text-foreground/70">
                  Built with Next.js 15, React 19, and Tailwind CSS. Modern, responsive, and actually pleasant to use.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Challenges */}
        <section id="challenges" className="container-portfolio mb-20 lg:ml-64">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-6">
              Challenges (aka Things That Broke)
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-xl text-foreground mb-3">🤯 Chunking is Harder Than It Looks</h3>
                <p className="font-body text-foreground/80 mb-3">
                  My first attempt at chunking? Fixed 500-token chunks. Disaster. It would cut sentences in half, split tables, and generally make a mess. 
                </p>
                <p className="font-body text-foreground/70">
                  <strong>Solution:</strong> Adaptive chunking with sentence boundary detection and semantic awareness. Now it actually makes sense.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl text-foreground mb-3">💸 API Costs Add Up Fast</h3>
                <p className="font-body text-foreground/80 mb-3">
                  Generating embeddings for every chunk of every document? My OpenAI bill was... not fun.
                </p>
                <p className="font-body text-foreground/70">
                  <strong>Solution:</strong> Smart caching, batch processing, and support for cheaper alternatives like Groq. Also added local embedding options for the truly budget-conscious.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl text-foreground mb-3">🐌 Performance Bottlenecks</h3>
                <p className="font-body text-foreground/80 mb-3">
                  Large PDFs (200+ pages) would freeze the browser. Not ideal.
                </p>
                <p className="font-body text-foreground/70">
                  <strong>Solution:</strong> Web Workers for background processing, progressive loading, and optimized vector search algorithms. Now it's smooth even with massive documents.
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

            {/* Visual: User Testimonial Style */}
            <div className="bg-gradient-to-br from-card/20 to-transparent p-8 rounded-lg border border-border/20">
              <div className="flex items-start gap-4">
                <div className="text-4xl">💬</div>
                <div className="flex-1">
                  <p className="font-body text-lg text-foreground/90 italic leading-relaxed mb-4">
                    "But honestly, the best result? I actually use this tool every single day. When your own project solves your own problem, you know you've built something worthwhile."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      K
                    </div>
                    <div>
                      <div className="font-body text-sm font-medium text-foreground">Kedhar</div>
                      <div className="font-body text-xs text-foreground/50">Creator & Daily User</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual: Usage Stats */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border border-border/20 rounded-lg">
                <h3 className="font-heading text-lg text-foreground mb-4">Real-World Impact</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm text-foreground/70">Research Papers Analyzed</span>
                    <span className="font-mono text-sm font-bold text-primary">500+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm text-foreground/70">Hours Saved</span>
                    <span className="font-mono text-sm font-bold text-primary">200+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm text-foreground/70">Questions Answered</span>
                    <span className="font-mono text-sm font-bold text-primary">2,500+</span>
                  </div>
                </div>
              </div>
              <div className="p-6 border border-border/20 rounded-lg">
                <h3 className="font-heading text-lg text-foreground mb-4">Performance Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm text-foreground/70">Avg. Chunk Processing</span>
                    <span className="font-mono text-sm font-bold text-primary">~50ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm text-foreground/70">Vector Search Speed</span>
                    <span className="font-mono text-sm font-bold text-primary">~100ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm text-foreground/70">Memory Usage</span>
                    <span className="font-mono text-sm font-bold text-primary">&lt;50MB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section id="tech-stack" className="container-portfolio mb-20 lg:ml-64">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-6">
              Tech Stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Next.js 15",
                "React 19",
                "TypeScript",
                "Tailwind CSS",
                "Vector Database",
                "OpenAI API",
                "Groq API",
                "Google Gemini",
                "PDF.js",
                "Web Workers",
                "PWA",
                "Vercel"
              ].map((tech) => (
                <div key={tech} className="px-4 py-3 border border-border/20 rounded-lg text-center font-body text-sm text-foreground">
                  {tech}
                </div>
              ))}
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
                  RAG is powerful, but tricky.
                </h3>
                <p className="font-body text-base text-foreground/70 leading-relaxed">
                  Getting the chunking, retrieval, and generation pipeline right took way more iterations than I expected. The devil is in the details – chunk size, overlap percentage, similarity thresholds, context assembly. Each parameter affects the quality of responses. But when it works? It's magical. Watching the system pull exactly the right context from a 200-page document feels like actual AI intelligence.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-heading text-xl md:text-2xl text-foreground mb-3">
                  Performance is non-negotiable.
                </h3>
                <p className="font-body text-base text-foreground/70 leading-relaxed">
                  Users won't wait 30 seconds for an answer, no matter how accurate it is. I learned to obsess over every millisecond – optimizing vector search, implementing smart caching, using Web Workers for background processing. The result? Sub-3-second responses even on large documents. Speed isn't a feature, it's a requirement.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-heading text-xl md:text-2xl text-foreground mb-3">
                  Privacy actually matters to people.
                </h3>
                <p className="font-body text-base text-foreground/70 leading-relaxed">
                  I thought client-side processing was just a nice technical detail. Turns out, people are genuinely concerned about uploading sensitive documents to random services. Legal teams, researchers, businesses – they all asked about data privacy first. Making everything work locally in the browser wasn't just a technical choice, it was a competitive advantage.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-heading text-xl md:text-2xl text-foreground mb-3">
                  Build for yourself first.
                </h3>
                <p className="font-body text-base text-foreground/70 leading-relaxed">
                  The best products solve real problems you actually have. I use QuantumPDF every single day for my own research. When you're your own user, you notice every friction point, every missing feature, every UX annoyance. You can't fake that level of understanding. If you wouldn't use it, why would anyone else?
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container-portfolio lg:ml-64">
          <div className="max-w-3xl mx-auto text-center py-16 border-y border-border/20">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-6">
              Want to Try It?
            </h2>
            <p className="font-body text-lg text-foreground/70 mb-8">
              It's free, open-source, and actually useful. Give it a spin!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://quantumn-pdf-chatapp.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-background font-body text-sm font-bold uppercase tracking-wider rounded-full hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Launch App
              </a>
              <a
                href="https://github.com/Kedhareswer/QuantumPDF_ChatApp_VectorDB"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border border-border/30 text-foreground font-body text-sm font-bold uppercase tracking-wider rounded-full hover:border-primary hover:text-primary transition-colors"
              >
                <Github className="w-4 h-4" />
                Star on GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer quote="The best way to predict the future is to build it, one PDF at a time." />
    </div>
  );
};
