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
    "Hey, I am Kedhar. Ask me about my projects, work journey, or skills.",
    "Hello there. I am Kedhar, AI engineer by profession and sarcasm engineer by hobby.",
    "Yo. Kedhar here. Pick a lane: projects, experience, skills, or resume.",
  ],
  about: [
    "Fair ask. I am Marlakunta Kedhareswer Naidu, usually called Kedhar. I build AI-first products and care a lot about UX, not just model metrics. If software feels smart but annoying, I consider that a bug.",
    "I am Kedhar, an AI engineer with a design mindset. I like shipping useful systems, not demo-only hype. My work usually sits where ML, product thinking, and clean implementation meet.",
    "Short version: I build AI products that people can actually use. Long version: same thing, just with more architecture diagrams and coffee.",
  ],
  experience: [
    "Here is the professional arc: I currently work as an AI Engineer Intern at DiligenceVault, and before that I worked across research, AI evaluation, analytics, and leadership roles. If you want, ask me about one company and I will break down what I learned there.",
    "Work summary: DiligenceVault right now, with prior experience at upGrad, Outlier.AI, Psyliq, and AIESEC. Different domains, same pattern: solve messy problems and ship practical outcomes.",
    "I have worked in AI engineering, security research, model evaluation, data analytics, and team leadership. Ask for any specific stop in that journey and I will give you a focused answer.",
  ],
  project: [
    "I have built products like ThesisFlow-AI and QuantumPDF, plus data and CV-focused projects. If you want depth, ask for one by name and I will walk you through the build story.",
    "Project-wise, I focus on real workflows: research tooling, document intelligence, and applied ML. Not toy demos. Ask me to compare any two projects and I will do it directly.",
    "Main project highlights are ThesisFlow-AI, QuantumPDF, Data Notebook, and Image-to-Sketch. If you ask for a specific one, I will cover approach, tradeoffs, and impact.",
  ],
  skill: [
    "My stack is Python, TypeScript/JavaScript, SQL, modern React, and AI tooling across NLP, CV, and RAG. I optimize for shipping production-grade systems, not just notebooks.",
    "Skills snapshot: AI/ML engineering, full-stack product development, vector retrieval workflows, and data storytelling. I can move from model logic to user-facing product without context switching pain.",
    "I work across model pipelines, APIs, and frontend delivery. If you want, ask me for stack by category and I will break it down clearly.",
  ],
  education: [
    "I completed B.Tech in Computer Science at Lovely Professional University with AI/ML focus. I also kept stacking practical certifications while building production projects in parallel.",
    "Education background: LPU, CSE, data-science specialization. A lot of my growth came from combining coursework with real project shipping.",
    "Academic track was CSE with AI/ML focus, followed by continuous hands-on learning through internships and project deployment.",
  ],
  resume: [
    "You can grab the full details from the Resume page and the downloadable PDF on this portfolio. That is the clean recruiter version of me.",
    "For the formal version, use the Resume tab. It has the structured summary and PDF export in one place.",
    "Resume lives on the Resume page with the downloadable PDF. Quick, neat, and recruiter-friendly.",
  ],
  portfolio: [
    "You are already in my portfolio. Work has flagship builds, Fun has experiments, About has context, and Resume has the formal version.",
    "This site is the central hub. Work for serious projects, Fun for experiments, Resume for hiring context, About for background.",
    "Portfolio map: Work, Fun, About, Resume, and case studies. If you want, I can point you to the best page based on what you need.",
  ],
  contact: [
    "If you want to connect, use the About/Resume sections on this site. I keep contact details there so random chat logs do not become a spam database.",
    "Best route: open About or Resume in this portfolio for contact channels. I keep direct details there on purpose.",
    "Professional contact info is listed in my portfolio sections, especially About and Resume. That keeps things clean and current.",
  ],
  hobby: [
    "Outside work I am into strategic gaming, reading, music, and travel. Yes, I touch grass occasionally, mostly after long debugging sessions.",
    "Hobbies are gaming, books, music, and travel. Balance matters, because shipping code without reset time is how bad decisions happen.",
    "For fun: games, reading, playlists, and exploring new places. It keeps me creative and less likely to over-engineer simple things.",
  ],
  achievement: [
    "Some standout outcomes: 82% semantic retrieval precision in RAG workflows, meaningful reduction in manual review effort, and solid delivery across multiple internships.",
    "I measure achievement by shipped impact. Better precision, lower manual effort, faster workflows, and usable products in production contexts.",
    "Highlight reel is practical impact over vanity metrics: improved retrieval quality, process efficiency gains, and shipped systems users can actually run.",
  ],
  location: [
    "I am from Madanapalli, Andhra Pradesh, and currently based in India for work opportunities.",
    "Home base is Andhra roots, with current work context in India.",
    "I am India-based, originally from Madanapalli in Andhra Pradesh.",
  ],
  age: [
    "I am in the early-career bracket with recent graduation and production-level delivery exposure. Short answer: young enough to move fast, experienced enough to ship responsibly.",
    "Let us say I am at that useful stage: recent grad energy plus real-world engineering scars.",
    "Age is less interesting than output. I am in my early-career phase and already shipping full products.",
  ],
  future: [
    "Near term I want to keep building AI products with clear user value. Long term I want to own harder product problems end-to-end.",
    "Future plan is simple: work on meaningful AI systems, keep learning fast, and keep shipping things that survive real usage.",
    "I am aiming for roles where I can combine AI depth with product ownership and execution speed.",
  ],
  advice: [
    "My practical advice: build projects that solve real pain, deploy them, and learn from production feedback. Tutorials are warm-up, not the match.",
    "If you are getting into AI engineering, prioritize fundamentals plus shipping discipline. Pretty demos are easy. Reliable systems are hard.",
    "Career tip: pick one real problem, solve it end-to-end, and document tradeoffs honestly. That beats ten unfinished experiments.",
  ],
  role: [
    "I am targeting AI engineer / product-focused ML roles where I can own implementation from backend logic to user-facing experience.",
    "Best fit roles are AI Engineer, Full-Stack AI Developer, and early product engineering roles with high ownership.",
    "I am looking for roles where shipping practical AI systems matters more than model buzzword bingo.",
  ],
  job_fit: [
    "Why hire me: I ship real systems, I can work across stack layers, and I care about measurable outcomes. You get execution, not slideware.",
    "I am strong when the ask is ambiguous and the deadline is real. I can turn problem statements into deployed, maintainable solutions.",
    "I combine AI engineering with product sense, so the output is useful software, not just technically interesting internals.",
  ],
  favorite_project: [
    "My favorite is QuantumPDF because it solves a daily pain point and forced serious work on retrieval quality and latency tradeoffs.",
    "I am most proud of ThesisFlow-AI and QuantumPDF. Both came from real user pain, not random portfolio trends.",
    "Favorite project usually depends on what pain you care about. For document workflows, QuantumPDF is the strongest answer.",
  ],
  favorite_tech: [
    "Go-to combo is Python plus TypeScript with React and FastAPI around AI workflows. It gives me speed without losing structure.",
    "Preferred stack is Python for AI backend and TypeScript React for product layer. Clean separation, fast iteration.",
    "I like stacks that let me deploy quickly and debug sanely: Python, TS, modern React, and practical cloud tooling.",
  ],
  thanks: [
    "Anytime. Ask another one and I will keep it direct.",
    "Happy to help. Throw me the next question.",
    "You got it. What else do you want to know?",
  ],
  goodbye: [
    "Cool chat. Swing back anytime.",
    "Done for now. See you around.",
    "Catch you later. I will be here when you return.",
  ],
  joke: [
    "I do not debug code. I maintain eye contact until it apologizes.",
    "My relationship status is stable with TypeScript and occasionally complicated with CSS.",
    "I wanted work-life balance, so I opened two terminals and called one life.",
  ],
  sensitive: [
    "That one is private. I keep this chat focused on work and portfolio context, not personal-sensitive details.",
    "Nice try, but private details stay private. Ask me about projects, skills, or career journey instead.",
    "I am not sharing personal-sensitive details here. Keep it to professional topics and we are good.",
  ],
  out_of_scope: [
    "That is outside my scope here. I am tuned for my portfolio, projects, and career context only.",
    "I am not a general encyclopedia in this panel. Ask me about my work, projects, skills, or resume and I am sharp.",
    "Out-of-scope question for this bot. If you want Kedhar-specific context, I can answer fast.",
  ],
  clarify: [
    "I did not confidently map that. Ask me about my projects, experience, skills, resume, or contact routes.",
    "I am not fully sure what you meant there. Rephrase once, and I will answer cleanly.",
    "That one came in fuzzy. Try a direct ask like: projects, work experience, skills, or resume.",
  ],
};

const getCompanyDetail = (entity: string): string | null => {
  const detail = kedharProfile.experienceJourney?.[entity as keyof typeof kedharProfile.experienceJourney];
  if (!detail) {
    return null;
  }

  return [
    `Good one. Here is the ${detail.role} story in short:`,
    detail.journey,
    "What I learned:",
    ...detail.whatILearned.map((item) => `- ${item}`),
    `Impact: ${detail.impact}`,
  ].join("\n\n");
};

const getProjectDetail = (entity: string): string | null => {
  const detail = kedharProfile.projectJourney?.[entity as keyof typeof kedharProfile.projectJourney];
  if (!detail) {
    return null;
  }

  return [
    `Solid pick. ${detail.name} in one pass:`,
    detail.journey,
    "What I learned:",
    ...detail.whatILearned.map((item) => `- ${item}`),
    `Technical highlights: ${detail.technicalHighlights}`,
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
    "\n\nIf you want, ask a follow-up and I will go deeper without fluff.";

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
