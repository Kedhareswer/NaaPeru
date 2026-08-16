import type { ProcessScore } from "./types";

/**
 * The three featured projects, authored as process scores.
 *
 * Content is drawn from the objectives/outcomes in public/projects.json and the
 * prose already written in the case studies, so the stages describe work that
 * actually happened rather than a generic design-thinking template.
 */

const thesisFlow: ProcessScore = {
  slug: "thesisflow",
  number: "01",
  title: "ThesisFlow-AI",
  subtitle: "Collaborative AI research workspace",
  meta: "AI RESEARCH • PLATFORM • 2025",
  links: {
    caseStudy: "/case-study/thesisflow",
    demo: "https://thesisflow-ai.vercel.app/",
    github: "https://github.com/Kedhareswer/ai-project-planner",
  },
  stages: [
    {
      kind: "provocation",
      id: "provocation",
      index: "01",
      label: "Provocation",
      title: "The question that started it",
      line: "Research is collaborative. Every tool treats it as solitary.",
      body: "Literature lives in one tab, notes in another, and the actual plan in a group chat. I wanted the search, the summary, and the team in the same room.",
      annotation:
        "Starting from a grievance rather than a feature list keeps the rest of the build honest — every stage below has to answer this sentence.",
    },
    {
      kind: "analyze",
      id: "analyze",
      index: "02",
      label: "Analyze",
      title: "What was actually broken",
      annotation:
        "Four frictions, written down before any interface existed. Anything that did not reduce one of them got cut.",
      notes: [
        {
          label: "Discovery is fragmented",
          detail:
            "Semantic Scholar, arXiv and OpenAlex each answer a different slice of the same question. Four open tabs is not a search strategy.",
        },
        {
          label: "Summarizing is manual labour",
          detail:
            "Reading twenty abstracts to find the three that matter is the least valuable hour of any research day.",
        },
        {
          label: "Teams edit in parallel, silently",
          detail:
            "Two people writing the same section without knowing it is the most common failure in group research.",
        },
        {
          label: "Sessions evaporate",
          detail: "Closing a tab should not cost a day of accumulated context.",
        },
      ],
    },
    {
      kind: "architecture",
      id: "architecture",
      index: "03",
      label: "Features",
      title: "What shipped in the product",
      annotation:
        "Four feature folders. Each one exists to clear a specific research friction.",
      root: {
        label: "ThesisFlow",
        children: [
          {
            label: "Literature",
            note: "for finding the right papers",
            children: [
              { label: "Semantic Scholar / arXiv / OpenAlex" },
              { label: "Citation graph" },
              { label: "Saved collections" },
            ],
          },
          {
            label: "Summarize",
            note: "for turning reading into claims",
            children: [
              { label: "Extractive pass" },
              { label: "Abstractive pass — Gemini / OpenAI / Groq" },
              { label: "Key-claim extraction" },
            ],
          },
          {
            label: "Plan",
            note: "for turning findings into a schedule",
            children: [
              { label: "Gantt timeline" },
              { label: "Task assignment" },
              { label: "Milestones" },
            ],
          },
          {
            label: "Collaborate",
            note: "for keeping the team in one room",
            children: [
              { label: "WebSocket presence" },
              { label: "Live document editing" },
              { label: "Team chat" },
            ],
          },
        ],
      },
    },
    {
      kind: "flow",
      id: "flow",
      index: "04",
      label: "Flow",
      title: "One question, end to end",
      annotation:
        "The two decision points are where the product earns its keep: a bad query gets refined instead of answered, and solo work never pays the cost of the collaboration layer.",
      steps: [
        { label: "Ask a research question", kind: "step" },
        {
          label: "Fan out across sources",
          kind: "action",
          note: "Semantic Scholar, arXiv and OpenAlex queried in parallel",
        },
        {
          label: "Relevant?",
          kind: "decision",
          fallback: {
            label: "Refine the query",
            note: "Narrowed terms re-enter the same fan-out",
          },
        },
        {
          label: "Summarize and extract claims",
          kind: "action",
          note: "Extractive pass first, abstractive second",
        },
        {
          label: "Add to the project plan",
          kind: "step",
          note: "Findings land on the Gantt as dated tasks",
        },
        {
          label: "Team editing?",
          kind: "decision",
          fallback: {
            label: "Persist to session",
            note: "Solo work survives the closed tab untouched",
          },
        },
        {
          label: "Sync over WebSocket",
          kind: "action",
          note: "Presence, live edits and chat share one channel",
        },
      ],
    },
    {
      kind: "outcome",
      id: "outcome",
      index: "05",
      label: "Outcome",
      title: "What shipped",
      annotation:
        "Each screen maps back to one friction from stage 02, which is the only test of whether the analysis was real.",
      screens: [
        {
          index: "01",
          title: "Literature workspace",
          note: "One query, every source, deduplicated into a single list you can actually read.",
          image: "/projects/thesisflow/literature.png",
          imageAlt: "ThesisFlow Research Explorer — literature search workspace",
        },
        {
          index: "02",
          title: "Summary with receipts",
          note: "Every summary keeps its source, so a claim is always traceable back to the paper.",
          image: "/projects/thesisflow/summarize.png",
          imageAlt: "ThesisFlow Smart Summarizer — content input and AI configuration",
        },
        {
          index: "03",
          title: "Plan on a timeline",
          note: "Findings become dated tasks. The research turns into a schedule instead of a folder.",
          image: "/projects/thesisflow/planner.png",
          imageAlt: "ThesisFlow Research Planner — projects overview and progress",
        },
        {
          index: "04",
          title: "The team, present",
          note: "Live cursors and chat sit inside the workspace rather than in a separate app.",
          image: "/projects/thesisflow/collaborate.png",
          imageAlt: "ThesisFlow Collaborate — team chat workspace",
        },
      ],
      metrics: [
        { value: "3", label: "Academic sources unified behind one query" },
        { value: "Live", label: "Presence, edits and chat in a single channel" },
        { value: "Zero", label: "Context lost when the tab closes" },
        { value: "2025", label: "Shipped and in use" },
      ],
    },
  ],
};

const quantumPdf: ProcessScore = {
  slug: "quantumpdf",
  number: "02",
  title: "QuantumPDF Chat App",
  subtitle: "PDF intelligence assistant with RAG",
  meta: "RAG APPLICATION • AI • JUN 2025",
  links: {
    caseStudy: "/case-study/quantumpdf",
    demo: "https://quantumn-pdf-chatapp.netlify.app/",
    github: "https://github.com/Kedhareswer/QuantumPDF_ChatApp_VectorDB",
  },
  stages: [
    {
      kind: "provocation",
      id: "provocation",
      index: "01",
      label: "Provocation",
      title: "The question that started it",
      line: "Search finds words. It doesn't find answers.",
      body: "Ctrl-F only works when you already know the author's vocabulary. I wanted to ask in plain language and get the passage back — with citations, and without handing the file to someone else's server.",
      annotation:
        "Privacy was a constraint from the first sentence, not a feature added later. It is the reason the entire pipeline had to run in the browser.",
    },
    {
      kind: "analyze",
      id: "analyze",
      index: "02",
      label: "Analyze",
      title: "What was actually broken",
      annotation:
        "Two of these four were only discovered by building the naive version first and watching it fail convincingly.",
      notes: [
        {
          label: "Paraphrase defeats keyword search",
          detail:
            "The passage you need is in there, phrased in a way you would never guess. So you skim 200 pages and hope.",
        },
        {
          label: "Chunking is the whole game",
          detail:
            "Too big and retrieval drowns in noise. Too small and the answer loses the context that made it true.",
        },
        {
          label: "The browser is not a server",
          detail:
            "A 500-page PDF will happily freeze a tab. Workers and streaming parsing were the difference between a demo and a tool.",
        },
        {
          label: "Retrieval lies confidently",
          detail:
            "Naive top-k returns plausible-but-wrong passages with total conviction. Confidence is not correctness.",
        },
      ],
    },
    {
      kind: "architecture",
      id: "architecture",
      index: "03",
      label: "Architecture",
      title: "The client-side pipeline",
      annotation:
        "Every branch of this tree runs on the device. The vector store is the only pluggable edge, which is what keeps the rest portable.",
      root: {
        label: "Client-side pipeline",
        children: [
          {
            label: "Parse",
            note: "nothing leaves the device",
            children: [
              { label: "PDF.js text layer" },
              { label: "Tesseract OCR for scans" },
              { label: "Web Worker isolation" },
            ],
          },
          {
            label: "Chunk",
            note: "adaptive sizing",
            children: [
              { label: "300–1200 tokens" },
              { label: "10% overlap" },
              { label: "Sentence and table boundaries kept intact" },
            ],
          },
          {
            label: "Vectorize",
            note: "1536-dimension embeddings",
            children: [{ label: "Pinecone" }, { label: "ChromaDB" }, { label: "Weaviate" }],
          },
          {
            label: "Answer",
            note: "provider-agnostic",
            children: [
              { label: "20+ providers — OpenAI, Anthropic, Google, Groq, Ollama" },
              { label: "Three-phase self-reflective validation" },
              { label: "Inline citations" },
            ],
          },
        ],
      },
    },
    {
      kind: "flow",
      id: "flow",
      index: "04",
      label: "Flow",
      title: "One question, end to end",
      annotation:
        "The second decision is the one that pushed accuracy past 95%: weak context is sent back for re-retrieval instead of being answered over.",
      steps: [
        {
          label: "Drop in a PDF",
          kind: "step",
          note: "Parsed in the browser, never uploaded",
        },
        {
          label: "Text layer present?",
          kind: "decision",
          fallback: {
            label: "OCR with Tesseract",
            note: "Scanned pages rejoin the same pipeline",
          },
        },
        {
          label: "Chunk adaptively",
          kind: "action",
          note: "300–1200 tokens, 10% overlap, boundaries intact",
        },
        {
          label: "Embed and store",
          kind: "action",
          note: "1536-dim vectors into Pinecone, Chroma or Weaviate",
        },
        {
          label: "Ask a question",
          kind: "step",
          note: "The question becomes a vector too",
        },
        {
          label: "Does the context support an answer?",
          kind: "decision",
          fallback: {
            label: "Re-retrieve",
            note: "The self-reflective pass rejects weak chunks",
          },
        },
        {
          label: "Compose a cited answer",
          kind: "action",
          note: "Every claim points back at a passage",
        },
      ],
    },
    {
      kind: "outcome",
      id: "outcome",
      index: "05",
      label: "Outcome",
      title: "What shipped",
      annotation:
        "The comparison screen is deliberately first: the fastest way to explain retrieval is to show keyword search failing on the same query.",
      screens: [
        {
          index: "01",
          title: "Semantic against keyword",
          note: "The same query: Ctrl-F finds nothing because the words are not there. QuantumPDF finds the passage by meaning at a 0.89 match.",
        },
        {
          index: "02",
          title: "Answers with receipts",
          note: "Each response carries the chunks it was built from, so the answer stays auditable.",
        },
        {
          index: "03",
          title: "Bring your own model",
          note: "Twenty-plus providers behind one interface — swap the model without touching the pipeline.",
        },
        {
          index: "04",
          title: "Quality made visible",
          note: "Retrieval scores surface in the interface instead of hiding behind a confident tone.",
        },
      ],
      metrics: [
        { value: "95%", label: "Answer accuracy, up from a 61% baseline" },
        { value: "82%", label: "Retrieval precision, up from 47%" },
        { value: "<3s", label: "Response time on 200+ page documents" },
        { value: "0", label: "Bytes that leave your browser" },
      ],
    },
  ],
};

const dataNotebook: ProcessScore = {
  slug: "data-notebook",
  number: "03",
  title: "Data Notebook",
  subtitle: "Interactive data analysis platform",
  meta: "DATA PLATFORM • ANALYTICS • APR 2025",
  links: {
    caseStudy: "/case-study/data-notebook",
    demo: "https://data-science-platform.vercel.app/",
    github: "https://github.com/Kedhareswer/Data_Science_Platform",
  },
  stages: [
    {
      kind: "provocation",
      id: "provocation",
      index: "01",
      label: "Provocation",
      title: "The question that started it",
      line: "Notebooks are built for engineers. Analysis isn't only done by engineers.",
      body: "Every good analysis tool assumes you will write the import, the cleaning and the chart. I wanted the notebook model — cells, order, narrative — without demanding a Python environment first.",
      annotation:
        "The bet: the notebook's real value is the ordered reasoning, not the runtime. Remove the runtime requirement and the model still holds.",
    },
    {
      kind: "analyze",
      id: "analyze",
      index: "02",
      label: "Analyze",
      title: "What was actually broken",
      annotation:
        "Each friction here is a place where effort leaks away from the question and into the tooling.",
      notes: [
        {
          label: "Imports are format-hostile",
          detail:
            "CSV, Excel, JSON and SQL each demand their own ritual before a single number becomes visible.",
        },
        {
          label: "Cleaning is the same five moves, forever",
          detail:
            "Rename, cast, drop, fill, derive. Rewriting them for every project is wasted craft.",
        },
        {
          label: "Charts require code that isn't the point",
          detail: "The insight is the goal. Axis configuration is not.",
        },
        {
          label: "Analysis has to be re-readable",
          detail: "A result nobody can retrace is a screenshot, not a finding.",
        },
      ],
    },
    {
      kind: "architecture",
      id: "architecture",
      index: "03",
      label: "Architecture",
      title: "How the notebook is organised",
      annotation:
        "Import and Prepare exist so that Compose can stay about thinking. The split is the whole argument of the product.",
      root: {
        label: "Notebook",
        children: [
          {
            label: "Import",
            note: "format-agnostic entry",
            children: [
              { label: "PapaParse for CSV" },
              { label: "XLSX for Excel" },
              { label: "JSON and SQL sources" },
              { label: "Schema inference" },
            ],
          },
          {
            label: "Prepare",
            note: "transforms without code",
            children: [
              { label: "Type casting" },
              { label: "Null handling" },
              { label: "Feature engineering" },
            ],
          },
          {
            label: "Compose",
            note: "the cell model",
            children: [
              { label: "Rich text cells" },
              { label: "Code cells with autocomplete" },
              { label: "Chart cells" },
            ],
          },
          {
            label: "Present",
            note: "shareable output",
            children: [
              { label: "Recharts dashboards" },
              { label: "Dark and light themes" },
              { label: "Export" },
            ],
          },
        ],
      },
    },
    {
      kind: "flow",
      id: "flow",
      index: "04",
      label: "Flow",
      title: "From raw file to shared finding",
      annotation:
        "The cleaning decision loops rather than blocks — you can move forward with imperfect data and come back, which is how analysis actually behaves.",
      steps: [
        {
          label: "Bring data in",
          kind: "step",
          note: "CSV, Excel, JSON or SQL",
        },
        {
          label: "Infer the schema",
          kind: "action",
          note: "Types guessed, then shown for correction",
        },
        {
          label: "Clean enough to analyse?",
          kind: "decision",
          fallback: {
            label: "Transform",
            note: "Cast, fill, derive — then re-check",
          },
        },
        {
          label: "Choose a cell",
          kind: "step",
          note: "Narrative, code or chart",
        },
        {
          label: "Render in place",
          kind: "action",
          note: "Recharts for visuals, live output for code",
        },
        {
          label: "Share or export",
          kind: "step",
          note: "The notebook preserves the order of reasoning",
        },
      ],
    },
    {
      kind: "outcome",
      id: "outcome",
      index: "05",
      label: "Outcome",
      title: "What shipped",
      annotation:
        "The last screen matters most: charts made during analysis become the presentation, so there is no rebuild step between finding something and showing it.",
      screens: [
        {
          index: "01",
          title: "Data in, no setup",
          note: "Four import paths land in the same table view with types already inferred.",
        },
        {
          index: "02",
          title: "Cleaning without code",
          note: "The five repetitive moves become controls, so the effort goes into the question instead.",
        },
        {
          index: "03",
          title: "Cells that mix prose and proof",
          note: "Text, code and charts share one ordered surface, so the reasoning survives the session.",
        },
        {
          index: "04",
          title: "Dashboards from the same cells",
          note: "Charts built during analysis become the presentation — no rebuild step.",
        },
      ],
      metrics: [
        { value: "4", label: "Import formats: CSV, Excel, JSON, SQL" },
        { value: "95+", label: "Lighthouse performance score" },
        { value: "3", label: "Cell types on one ordered surface" },
        { value: "0", label: "Local setup before the first chart" },
      ],
    },
  ],
};

export const PROCESS_SCORES: ProcessScore[] = [thesisFlow, quantumPdf, dataNotebook];

export function scoreBySlug(slug: string): ProcessScore | undefined {
  return PROCESS_SCORES.find((s) => s.slug === slug);
}
