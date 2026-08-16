import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { ExternalLink, Github } from "lucide-react";
import {
  CaseStudySidebar,
  CaseStudyHero,
  CaseStudySection,
  SectionHeader,
  SectionReveal,
  Prose,
  PullStat,
  Figure,
  FlowDiagram,
  ComparisonChart,
  StatRow,
  QuoteBlock,
  CaseStudyCTA,
  type CaseStudyNavItem,
  type FlowStep,
  type ChartMetric,
  type Stat,
} from "@/components/case-study";

const sections: CaseStudyNavItem[] = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The Problem" },
  { id: "how", label: "How it works" },
  { id: "proof", label: "In Action" },
  { id: "results", label: "Results" },
  { id: "challenges", label: "Hard Parts" },
  { id: "next", label: "What's Next" },
];

const flowSteps: FlowStep[] = [
  { title: "Upload", detail: "PDF.js parses text; Tesseract OCRs scanned pages — all in the browser." },
  { title: "Chunk", detail: "Adaptive 300–1200 token chunks with 10% overlap, respecting sentence & table boundaries." },
  { title: "Vectorize", detail: "Each chunk → a 1536-dim embedding, stored in Pinecone, ChromaDB or Weaviate." },
  { title: "Retrieve", detail: "Your question becomes a vector; cosine similarity finds the closest passages." },
  { title: "Answer", detail: "A 3-phase self-reflective pass validates chunks before composing a cited answer." },
];

const chartMetrics: ChartMetric[] = [
  { label: "Answer accuracy", value: 95, baseline: 61, max: 100, display: (n) => `${n}%` },
  { label: "Retrieval precision", value: 82, baseline: 47, max: 100, display: (n) => `${n}%` },
];

const stats: Stat[] = [
  { value: "<3s", label: "Avg response time", sub: "Even on 200+ page documents" },
  { value: "95%+", label: "Answer accuracy", sub: "Validated across 1000+ queries" },
  { value: "100%", label: "Client-side", sub: "Your data never leaves the device" },
  { value: "20+", label: "AI providers", sub: "Bring your own model" },
];

const challenges = [
  {
    title: "Chunking is the whole game",
    detail:
      "Too big and retrieval drowns in noise; too small and the answer loses its context. It took dozens of iterations to land on adaptive sizing that keeps sentences and tables intact.",
  },
  {
    title: "The browser is not a server",
    detail:
      "A 500-page PDF will happily freeze a tab. Web Workers and streaming parsing were the difference between a demo and something I could actually use on real documents.",
  },
  {
    title: "Retrieval lies confidently",
    detail:
      "Naive top-k kept returning plausible-but-wrong passages. Adding a 3-phase self-reflective step — validate the chunks before you trust them — is what pushed accuracy past 95%.",
  },
];

export const CaseStudyQuantumPDF = () => {
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
            description:
              "How QuantumPDF uses retrieval-augmented generation, adaptive chunking, and vector databases for PDF question answering.",
            author: { "@type": "Person", name: "Kedhar" },
            url: "https://kedhar.vercel.app/case-study/quantumpdf",
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://kedhar.vercel.app/" },
              {
                "@type": "ListItem",
                position: 2,
                name: "QuantumPDF Case Study",
                item: "https://kedhar.vercel.app/case-study/quantumpdf",
              },
            ],
          },
        ]}
      />
      <Navigation />

      <CaseStudySidebar sections={sections} />

      <main className="pt-28 pb-20">
        {/* ── Masthead ── */}
        <CaseStudyHero
          id="overview"
          ghost="QUANTUM"
          eyebrow="RAG Application · 2025"
          title={
            <>
              Quantum<span className="text-primary">PDF</span>
            </>
          }
          thesis="Most PDF tools search for keywords. QuantumPDF reads the document, understands the question, and answers it — with citations, in under three seconds, without a single byte leaving your browser."
          ctas={[
            {
              label: "Try Live Demo",
              href: "https://quantumn-pdf-chatapp.netlify.app/",
              icon: <ExternalLink className="w-3.5 h-3.5" />,
              variant: "primary",
            },
            {
              label: "View Code",
              href: "https://github.com/Kedhareswer/QuantumPDF_ChatApp_VectorDB",
              icon: <Github className="w-3.5 h-3.5" />,
              variant: "secondary",
            },
          ]}
          meta={[
            { label: "Role", value: "Full-Stack Developer" },
            { label: "Timeline", value: "2025" },
            { label: "Type", value: "RAG Application" },
            { label: "Stack", value: "Next.js 15 · Vector DB" },
          ]}
        />

        {/* ── Hero demo loop ── */}
        <CaseStudySection className="mb-24">
          <Figure
            video="/projects/quantumpdf-demo.mp4"
            videoWebm="/projects/quantumpdf-demo.webm"
            poster="/projects/quantumpdf-demo.webp"
            aspect="16 / 9"
            alt="QuantumPDF embedding a question, retrieving the most relevant PDF chunks, and composing a cited answer"
            caption={
              <>
                One query, end to end: the question is embedded, the closest chunks are retrieved from the vector
                store, and a cited answer is composed — <em>entirely client-side</em>.
              </>
            }
          />
        </CaseStudySection>

        {/* ── The Problem ── */}
        <CaseStudySection id="problem">
          <SectionHeader eyebrow="The Problem" title="Search finds words. It doesn't find answers." />
          <Prose lead>
            <p>
              Ctrl-F is great — until you don't know the exact word the author used. Research papers, contracts,
              manuals: the thing you need is in there, phrased in a way you'd never guess. So you skim 200 pages
              and hope.
            </p>
            <p>
              I wanted something that worked the way I actually think — <strong>ask a question in plain language,
              get the answer back with the receipts</strong>. And it had to be private. The documents I care about
              aren't things I want to hand to someone else's server.
            </p>
          </Prose>

          <PullStat
            value="0 uploads"
            label="Every PDF is parsed, chunked, embedded and queried entirely in your browser. The file never touches a server."
          />

          <Figure
            className="mt-12"
            video="/projects/quantumpdf-search.mp4"
            videoWebm="/projects/quantumpdf-search.webm"
            poster="/projects/quantumpdf-search.webp"
            aspect="16 / 9"
            alt="The same query run as a keyword search and as semantic search, side by side"
            layout="inset"
            caption={
              <>
                The same query, two engines: Ctrl-F finds nothing because the exact words aren't in the text —
                QuantumPDF finds the passage by <em>meaning</em>, at a 0.89 match.
              </>
            }
          />
        </CaseStudySection>

        {/* ── How it works ── */}
        <CaseStudySection id="how">
          <SectionHeader
            eyebrow="How it works"
            title="From a 200-page PDF to a cited answer"
            subtitle="Five stages turn a static document into something you can actually talk to."
          />

          <SectionReveal>
            <FlowDiagram steps={flowSteps} />
          </SectionReveal>

          <Prose className="mt-12">
            <p>
              The quality lives in the boring details. Chunking adapts to the document — small files get tight
              300–600 token chunks, large ones get 900–1200 — always with a 10% overlap so context survives the
              cut. Each chunk becomes a 1536-dimension embedding and lands in a vector database (Pinecone,
              ChromaDB or Weaviate).
            </p>
            <p>
              At question time, your query is embedded too, and cosine similarity pulls the closest passages from
              tens of thousands of candidates in under 100ms. The part I'm proudest of is the last step: a{" "}
              <strong>3-phase self-reflective RAG</strong> that checks whether the retrieved chunks actually
              answer the question <em>before</em> it generates a word — so the model cites, instead of guessing.
            </p>
          </Prose>

          <Figure
            className="mt-12"
            video="/projects/quantumpdf-providers.mp4"
            videoWebm="/projects/quantumpdf-providers.webm"
            poster="/projects/quantumpdf-providers.webp"
            aspect="16 / 9"
            alt="Switching between AI model providers in QuantumPDF"
            layout="inset"
            caption="Bring your own model: switch between 20+ providers — OpenAI, Anthropic, Google, Groq, Ollama and more — behind one interface."
          />
        </CaseStudySection>

        {/* ── In action ── */}
        <CaseStudySection id="proof">
          <SectionHeader
            eyebrow="In Action"
            title="What it feels like to use"
            subtitle="Plain-language questions in; answers you can trust and trace back, out."
          />
          <Figure
            video="/projects/quantumpdf-answer.mp4"
            videoWebm="/projects/quantumpdf-answer.webm"
            poster="/projects/quantumpdf-answer.webp"
            aspect="16 / 9"
            alt="An answer with a confidence score and citations linking back to source pages"
            caption="Every answer carries a confidence score and links straight back to its source chunks — grounded in the document, never invented."
          />
        </CaseStudySection>

        {/* ── Results ── */}
        <CaseStudySection id="results">
          <SectionHeader eyebrow="Results" title="The numbers" />
          <SectionReveal>
            <ComparisonChart
              metrics={chartMetrics}
              seriesLabel="QuantumPDF"
              baselineLabel="Keyword search"
              className="mb-8"
            />
          </SectionReveal>

          <StatRow stats={stats} className="mb-10" />

          <SectionReveal delay={0.1}>
            <QuoteBlock
              quote={
                "“The best result? I actually use this tool every single day. When your own project solves your own problem, you know you’ve built something worthwhile.”"
              }
              name="Kedhar"
              role="Creator & Developer"
            />
          </SectionReveal>
        </CaseStudySection>

        {/* ── The hard parts ── */}
        <CaseStudySection id="challenges">
          <SectionHeader
            eyebrow="The Hard Parts"
            title="What didn't work the first time"
            subtitle="The honest version — the bits that took the most iterations."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {challenges.map((c, i) => (
              <SectionReveal key={c.title} delay={i * 0.08}>
                <div className="h-full border border-border/25 bg-card/40 p-6 transition-colors hover:border-primary/40">
                  <p className="font-heading text-lg font-bold text-foreground mb-3">{c.title}</p>
                  <p className="font-body text-sm text-foreground/70 leading-relaxed">{c.detail}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </CaseStudySection>

        {/* ── What's next ── */}
        <CaseStudySection id="next">
          <SectionHeader eyebrow="What's Next" title="Where this goes" />
          <Prose>
            <p>
              The natural next step is reasoning across <strong>multiple documents</strong> at once — ask one
              question, get an answer stitched from a whole folder. After that: agentic follow-ups, where the
              model proposes the next question itself, and a fully local mode that runs the embedding model in the
              browser so even the AI provider drops out of the loop.
            </p>
          </Prose>
        </CaseStudySection>

        {/* ── CTA ── */}
        <CaseStudyCTA
          eyebrow="Next Step"
          title="Ready to make your PDFs talk back?"
          subtitle="Try it on your own documents — nothing gets uploaded, and you don't need an account."
          ctas={[
            {
              label: "Try It Now",
              href: "https://quantumn-pdf-chatapp.netlify.app/",
              icon: <ExternalLink className="w-3.5 h-3.5" />,
              variant: "primary",
            },
            {
              label: "View Source",
              href: "https://github.com/Kedhareswer/QuantumPDF_ChatApp_VectorDB",
              icon: <Github className="w-3.5 h-3.5" />,
              variant: "secondary",
            },
          ]}
        />
      </main>

      <Footer quote="The best way to predict the future is to build it, one PDF at a time." />
    </div>
  );
};
