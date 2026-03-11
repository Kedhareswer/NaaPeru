import { kedharProfile } from "./chatbotKnowledge";
import { CLARIFY_SUGGESTIONS } from "./chatbotIntents";
import type { ChatSessionState, IntentId } from "./chatbotTypes";

interface ReplyBuildInput {
  intent: IntentId;
  entity: string | null;
  session: ChatSessionState;
}

interface ReplyBuildResult {
  text: string;
  variantId: string;
  suggestions: string[];
}

const RESPONSE_TEMPLATES: Record<IntentId, string[]> = {
  greeting: [
    "Yo. I am Kedhar — I build AI systems and obsess over clean interfaces. What do you want to know?",
    "Hey. Kedhar here. Engineer by day, design nerd by night. Fire away.",
    "What's up. I ship AI products and care too much about pixel alignment. Ask me something.",
  ],
  about: [
    "I am Marlakunta Kedhareswer Naidu — most people call me Kedhar. I build AI-powered products where the intelligence actually helps and the interface does not get in the way. My sweet spot is that overlap between ML engineering, product thinking, and obsessive UI craft. If something feels smart but annoying, I consider that a personal failure.",
    "Short version: AI engineer with a design addiction. I turn messy problems into shipped products. Long version involves a lot of architecture diagrams, late-night debugging, and an unreasonable amount of coffee.",
    "I am the kind of engineer who reads design system docs for fun and gets genuinely upset about bad kerning. Professionally, I build AI products end-to-end — model logic to pixel-perfect frontend. Currently at DiligenceVault making financial AI less painful.",
  ],
  experience: [
    "The career arc so far: **Software Developer at DiligenceVault** right now — building agent orchestration for financial document processing. Before that, research at upGrad (cybersecurity + ML), AI evaluation at Outlier.AI, data analytics at Psyliq, and leadership at AIESEC. Different domains, same pattern: find the hard problem, ship the practical solution.",
    "I have worked across AI engineering, cybersecurity research, model training, data analytics, and international program management. Currently at DiligenceVault building production AI systems. Ask about any specific company and I will give you the real story.",
    "Work timeline: DiligenceVault (now, Software Dev), upGrad (research), Outlier.AI (AI training), Psyliq (data), AIESEC (leadership). Each stop taught me something different. The throughline is shipping things that work under real conditions, not just in demos.",
  ],
  project: [
    "Main builds: **ThesisFlow-AI** (collaborative research platform), **QuantumPDF** (RAG-powered PDF chat with 82% precision), **Data Notebook** (interactive analysis tool), and **ChefSpeak** (voice-controlled cooking assistant). Ask for any one by name and I will walk you through the build decisions.",
    "I build tools for workflows people actually suffer through. ThesisFlow fixes academic research pain. QuantumPDF makes PDFs conversational. Data Notebook is my love letter to better data UX. Each started from a real frustration, not a tutorial.",
    "Project highlights: ThesisFlow-AI for research collaboration, QuantumPDF for document intelligence, Data Notebook for analysis, Image-to-Sketch for deep learning, and ChefSpeak for voice AI. Pick one and I will tell you the real tradeoffs, not the marketing version.",
  ],
  skill: [
    "Core stack: **Python** and **TypeScript** for everything. AI/ML with TensorFlow, PyTorch, Scikit-learn. Frontend with React, Next.js, Tailwind. Backend with FastAPI, Node.js. Databases from MySQL to vector stores like Pinecone. I optimize for shipping production systems, not collecting badges.",
    "I work across the full stack but I am deepest in AI engineering and frontend craft. Python for model pipelines and APIs, TypeScript + React for product layer, SQL + vector DBs for persistence. I can move from training a model to polishing a hover animation without context-switching pain.",
    "Skills by layer: **AI/ML** — NLP, CV, RAG, deep learning. **Frontend** — React, Next.js, Tailwind, motion design. **Backend** — FastAPI, Node.js, REST APIs. **Data** — SQL, Pinecone, Power BI. **Cloud** — AWS, Azure, Vercel. The value is not knowing all of these — it is knowing which to pick for each problem.",
  ],
  education: [
    "B.Tech in Computer Science from Lovely Professional University, specializing in Data Science (AI & ML). CGPA 7.74. Also stacked certifications in Neo4j, AWS, responsible AI, and GANs. But honestly, most of my real education came from shipping production projects.",
    "LPU, CSE, AI/ML specialization. The degree gave me foundations. The projects gave me scars. Both were necessary. I also picked up certifications from Google, AWS, and Infosys to keep the formal learning sharp.",
    "Academic track: Computer Science with AI/ML focus at LPU. I treated university as a launchpad — combined coursework with real internships and project deployment from day one. The certifications (Neo4j, AWS, Google AI) came as natural extensions.",
  ],
  resume: [
    "Head to the **Resume** page on this portfolio — it has the full structured breakdown plus a downloadable PDF. That is the clean recruiter-ready version of everything I just told you.",
    "Resume lives on the Resume tab with PDF export. It is the same information, just formatted for humans who read in bullet points.",
    "Check the Resume page for the formal version. PDF download included. It covers experience, projects, skills, and education in the format hiring managers actually scan.",
  ],
  portfolio: [
    "You are already inside it. **Work** has the flagship projects, **Experimentos** has the wild experiments, **About** has context about me, and **Resume** has the formal version. Navigate by mood.",
    "This site is the hub. Work for serious builds, Experimentos for side experiments, About for background, Resume for hiring context, and case studies for deep dives. What are you looking for?",
    "Portfolio layout: Work page for featured projects with case studies, Experimentos for everything else, About for my story, Resume for the formal PDF. Each project card links to a detailed breakdown.",
  ],
  contact: [
    "Best channels: **LinkedIn** (linkedin.com/in/kedhareswernaidu) for professional connections, **GitHub** (github.com/Kedhareswer) for code, or **email** me directly. All links are in the About and Resume sections.",
    "Professional contact info lives in the About and Resume pages. LinkedIn for networking, GitHub for code review, email for everything else. I respond faster to specific questions than generic intros.",
    "Find me on LinkedIn, GitHub, Kaggle, or 21st.dev — all linked in the About section. For direct communication, email works. I keep contact details on the portfolio so this chat does not become a spam vector.",
  ],
  hobby: [
    "Outside of code: **strategic gaming** (I apply system thinking to everything, including virtual worlds), **reading** (sci-fi and technical literature), **music** (genre exploration is my reset button), and **travel** (new places, new perspectives). Basically, things that recharge creative thinking.",
    "Gaming, books, music, and travel. I am convinced that the best engineering ideas come after stepping away from the editor. Gaming teaches strategy, reading teaches patterns, travel teaches empathy. Music just keeps me sane.",
    "When I am not building: competitive gaming for strategy practice, sci-fi for imagination fuel, music for flow state, and travel for perspective. The hobby-to-work pipeline is surprisingly productive.",
  ],
  achievement: [
    "Key outcomes: **82% semantic retrieval precision** in RAG systems, **60% reduction** in manual document review effort, **90% accuracy** in deep learning image conversion, and **25% improvement** in data comprehension at Psyliq. I measure in shipped impact, not conference slides.",
    "I track achievements by what actually shipped and moved metrics. Better retrieval quality at DiligenceVault, faster processing pipelines, usable products in production. The numbers matter because they represent real users saved from real pain.",
    "Highlight reel: built RAG systems that actually work at scale, delivered production AI at DiligenceVault, created research tools that researchers use, and consistently improved efficiency metrics across every role. Impact over impressions.",
  ],
  location: [
    "Originally from **Madanapalli, Andhra Pradesh** — Telugu roots run deep. Currently based in India. The Telugu greeting you see on the About page is not decoration, it is home.",
    "Home is Andhra Pradesh. Madanapalli specifically. I carry that context into everything I build — the Telugu elements on this portfolio are intentional identity, not aesthetic filler.",
    "India-based, Andhra Pradesh roots. Madanapalli is home. The culture shows up in the portfolio details if you look closely.",
  ],
  age: [
    "Early-career bracket, recent grad, already shipping production AI. I find the 'how old' question less interesting than the 'what have you shipped' question — and the answer to that one is a lot.",
    "Young enough to move fast, experienced enough to know when not to. I am in my early twenties with production engineering experience that usually takes longer to accumulate.",
    "Age is the least interesting metric. I have shipped more real products during university than most engineers do in their first two years of employment. But if you need a number for context: early twenties.",
  ],
  future: [
    "Near term: keep building AI products with clear user value at DiligenceVault. Medium term: own harder product problems end-to-end. Long term: build something that outlasts the hype cycle.",
    "I want to keep working where AI engineering meets product craft. The goal is not just better models — it is better experiences powered by those models. Eventually, I want to lead that kind of work.",
    "Future plan: deepen AI product expertise, take on more end-to-end ownership, and keep shipping things that survive contact with real users. The specific role title matters less than the impact surface.",
  ],
  advice: [
    "Practical advice: **build something that solves real pain**, deploy it, and learn from production feedback. One shipped project teaches more than ten tutorials. Document your tradeoffs honestly — that is what separates portfolio pieces from actual engineering.",
    "If you are getting into AI: master fundamentals first, then ship. Pretty demos are easy. Reliable systems under real load are hard. The gap between a notebook and production is where actual learning happens.",
    "Career tip: pick one real problem you personally find annoying, solve it end-to-end, deploy it, and write about the tradeoffs. That artifact will open more doors than any certification.",
  ],
  role: [
    "Targeting **AI Engineer** and **Full-Stack AI Developer** roles where I own implementation from model logic to user interface. High-ownership environments where shipping matters more than meetings.",
    "Best fit: product-focused AI roles with real engineering ownership. I want to build the pipeline, design the API, and polish the UI — not just hand off a notebook to someone else.",
    "I am looking for roles where the expectation is shipped software, not slide decks. AI Engineer, Product Engineer, or Full-Stack AI — the title matters less than the scope and autonomy.",
  ],
  job_fit: [
    "Why hire me: I ship **real systems across the full stack**. Model training to pixel-perfect UI in one person. You get execution velocity, not committee discussions. I have already done this at DiligenceVault — reduced manual work by 60% with production AI.",
    "Value prop: I close the gap between 'AI prototype' and 'product users love.' I can architect the backend, train the model, build the frontend, and care about the loading animation. That range is rare and it ships faster.",
    "Three reasons: (1) I build end-to-end — no handoff friction. (2) I care about UX as much as model metrics. (3) I have already shipped production AI at scale. You are not hiring potential, you are hiring proven output.",
  ],
  favorite_project: [
    "**QuantumPDF** is my proudest build. It solves a daily pain point (talking to PDFs instead of Ctrl+F-ing through them), and it forced serious work on retrieval quality, chunking strategy, and latency tradeoffs. 82% precision did not come easy.",
    "Tough call between ThesisFlow-AI and QuantumPDF. ThesisFlow had the most ambitious scope. QuantumPDF had the deepest technical challenges. Both started from real frustration, which is the only valid origin for good tools.",
    "QuantumPDF. Not because it is the most complex, but because it is the most useful. I use it myself. When you build something you actually need every day, the quality bar is naturally higher.",
  ],
  favorite_tech: [
    "Go-to combo: **Python + TypeScript**. Python for AI backend (FastAPI, PyTorch, LangChain). TypeScript + React for the product layer. Tailwind for styling because life is too short for vanilla CSS debates. Vector DBs for retrieval.",
    "Preferred stack: Python handles AI logic, TypeScript handles product experience, and they meet at a clean API boundary. I pick frameworks by shipping speed and long-term maintainability, not popularity charts.",
    "Python and TypeScript, always. FastAPI for backend, React + Tailwind for frontend, vector databases for AI retrieval. I like stacks where I can debug at every layer without switching mental models.",
  ],
  thanks: [
    "Anytime. Hit me with the next one.",
    "Glad that was useful. What else?",
    "No problem. Keep the questions coming.",
  ],
  goodbye: [
    "Good talk. Come back when you need more answers.",
    "Later. I will be here, not going anywhere.",
    "Peace. The portfolio is always open.",
  ],
  joke: [
    "I do not debug code. I maintain eye contact with it until it confesses what it did wrong.",
    "My CSS has more trust issues than my last relationship — everything is `!important` but nothing actually works.",
    "I told my AI model to be creative. It generated the same output 500 times and called it 'consistent artistry.'",
  ],
  sensitive: [
    "That is private territory. This chat covers work, projects, and career context — personal details stay offline.",
    "Nice try. I keep personal-sensitive topics out of this panel. Ask me about my engineering work instead.",
    "Not sharing that here. Professional topics only — projects, skills, experience, resume. Pick one.",
  ],
  out_of_scope: [
    "That is outside my scope. I am specifically tuned for my portfolio, projects, and career. For general knowledge, there are better AIs for that.",
    "Wrong chatbot for that question. I only know Kedhar-specific context — work, projects, skills, resume. Redirect and I will be sharp.",
    "I am not a general assistant. I know everything about Kedhar's career and nothing about the weather. Ask me what I am good at.",
  ],
  clarify: [
    "I did not confidently parse that. Try asking about my **projects**, **experience**, **skills**, **resume**, or **contact** routes.",
    "That came in fuzzy. Here is what I am good at: answering questions about my work, projects, skills, or career. Try one of those.",
    "Not sure what you meant. Rephrase with a specific topic — projects, experience, skills, education, or resume — and I will answer cleanly.",
  ],
};

const getCompanyDetail = (entity: string): string | null => {
  const detail = kedharProfile.experienceJourney?.[entity as keyof typeof kedharProfile.experienceJourney];
  if (!detail) {
    return null;
  }

  const learnedList = detail.whatILearned.map((item) => `- ${item}`).join("\n");

  return [
    `Here is the **${detail.role}** story:`,
    detail.journey,
    `**What I learned:**\n${learnedList}`,
    `**Impact:** ${detail.impact}`,
  ].join("\n\n");
};

const getProjectDetail = (entity: string): string | null => {
  const detail = kedharProfile.projectJourney?.[entity as keyof typeof kedharProfile.projectJourney];
  if (!detail) {
    return null;
  }

  const learnedList = detail.whatILearned.map((item) => `- ${item}`).join("\n");

  return [
    `**${detail.name}** — the full story:`,
    detail.journey,
    `**What I learned:**\n${learnedList}`,
    `**Technical highlights:** ${detail.technicalHighlights}`,
  ].join("\n\n");
};

const pickVariantIndex = (intent: IntentId, session: ChatSessionState): number => {
  const options = RESPONSE_TEMPLATES[intent];
  if (!options || options.length === 0) {
    return 0;
  }

  for (let index = 0; index < options.length; index += 1) {
    const variantId = `${intent}:${index}`;
    if (!session.recentReplyVariantIds.includes(variantId)) {
      return index;
    }
  }

  return 0;
};

const withFollowUpPrompt = (intent: IntentId, text: string): string => {
  if (["clarify", "thanks", "goodbye"].includes(intent)) {
    return text;
  }

  const prompt =
    "\n\nAsk a follow-up and I will go deeper.";

  return `${text}${prompt}`;
};

export const buildReply = ({ intent, entity, session }: ReplyBuildInput): ReplyBuildResult => {
  let text: string | null = null;

  if (intent === "experience" && entity) {
    text = getCompanyDetail(entity);
  }

  if (intent === "project" && entity) {
    text = getProjectDetail(entity);
  }

  const variantIndex = pickVariantIndex(intent, session);
  const variantId = `${intent}:${variantIndex}`;
  const fallbackText = RESPONSE_TEMPLATES[intent][variantIndex] ?? RESPONSE_TEMPLATES.clarify[0];
  const finalText = withFollowUpPrompt(intent, text ?? fallbackText);

  return {
    text: finalText,
    variantId,
    suggestions: intent === "clarify" ? [...CLARIFY_SUGGESTIONS] : [],
  };
};
