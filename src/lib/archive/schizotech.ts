/** Schizotech narrative data — autopsy, git blame, shutter acts, oracle deck. */

export interface AutopsyRecord {
  projectId: number;
  causeOfDeath: string;
  manner: string;
  verdict: "tuition" | "survived" | "active" | "cold-case";
  examinerNote?: string;
}

export interface BlameCommit {
  projectId: number;
  hash: string;
  author: string;
  date: string;
  message: string;
  innerVoice: string;
  filesChanged: number;
}

export interface ShutterAct {
  id: string;
  label: string;
  ghostWord: string;
  narrator: string;
  projectIds: number[];
}

export interface OracleCard {
  projectId: number;
  prophecy: string;
  reversed?: string;
}

export const AUTOPSY_INTRO = {
  title: "Case File: Kedhareswer",
  subtitle: "Fifteen subjects. Most deceased. A few refused to die.",
  disclaimer: "Cause of death determined by scope creep, shame, and honest post-mortems.",
};

export const AUTOPSY_RECORDS: AutopsyRecord[] = [
  {
    projectId: 7,
    causeOfDeath: "Death by a thousand tutorials",
    manner: "Repetitive blunt force",
    verdict: "tuition",
    examinerNote: "Body contained 100 mini corpses. None were buried. All were referenced once.",
  },
  {
    projectId: 1,
    causeOfDeath: "Vanity metrics",
    manner: "Chased 90% accuracy off a cliff",
    verdict: "tuition",
    examinerNote: "GANs promised miracles. Delivered a sketch of ambition.",
  },
  {
    projectId: 3,
    causeOfDeath: "MNIST was never the problem",
    manner: "Solved a solved problem beautifully",
    verdict: "tuition",
  },
  {
    projectId: 2,
    causeOfDeath: "Medical imaging without a hospital",
    manner: "Academic aspiration",
    verdict: "tuition",
    examinerNote: "40% clearer images. 0% clinical deployment. Classic.",
  },
  {
    projectId: 6,
    causeOfDeath: "Education platform fatigue",
    manner: "Feature creep in pedagogy",
    verdict: "tuition",
  },
  {
    projectId: 9,
    causeOfDeath: "—",
    manner: "Refused autopsy",
    verdict: "active",
    examinerNote: "Still breathing. Would use daily. Suspect is the analyst in all of us.",
  },
  {
    projectId: 4,
    causeOfDeath: "Almost died of collaboration scope",
    manner: "Survived by narrowing the thesis",
    verdict: "survived",
    examinerNote: "Literature that talks back. Hackathon child raised in production foster care.",
  },
  {
    projectId: 8,
    causeOfDeath: "Cosine similarity worship",
    manner: "Recovered after measuring chunk quality",
    verdict: "survived",
    examinerNote: "82% precision. Under ten seconds. Stopped praying, started benchmarking.",
  },
  {
    projectId: 11,
    causeOfDeath: "Voice API bills",
    manner: "ElevenLabs hemorrhage",
    verdict: "tuition",
    examinerNote: "Hands-free cooking. Wallet wasn't hands-free.",
  },
  {
    projectId: 10,
    causeOfDeath: "Prompt optimization theater",
    manner: "45% better responses, 100% more prompts",
    verdict: "tuition",
  },
  {
    projectId: 12,
    causeOfDeath: "Portfolio recursion",
    manner: "Built a portfolio to show portfolios",
    verdict: "tuition",
    examinerNote: "Glassmorphism on glassmorphism. Meta until it wasn't.",
  },
  {
    projectId: 13,
    causeOfDeath: "Provider fatigue",
    manner: "Six APIs, one identity crisis",
    verdict: "survived",
    examinerNote: "Became the template for everything after.",
  },
  {
    projectId: 14,
    causeOfDeath: "Sandbox without walls",
    manner: "No auth, no RBAC, no regrets",
    verdict: "tuition",
    examinerNote: "Five agents read the same PDF and disagreed. Educational.",
  },
  {
    projectId: 15,
    causeOfDeath: "Interior design without clients",
    manner: "Aesthetic aspiration",
    verdict: "cold-case",
  },
  {
    projectId: 16,
    causeOfDeath: "—",
    manner: "Gemini blundered a queen. Subject laughed.",
    verdict: "active",
    examinerNote: "ELO leaderboard as humility engine. Currently running.",
  },
];

export const BLAME_INTRO = {
  repo: "kedhareswer/portfolio-of-regrets",
  branch: "main",
  graphNote: "Public contribution graph: quiet. Private commits: loud. You are rewinding.",
};

export const BLAME_COMMITS: BlameCommit[] = [
  {
    projectId: 16,
    hash: "a3f91c2",
    author: "Kedhareswer <kedhar@local>",
    date: "2026-01-15",
    message: "feat(chess): let gemini hang its own queen",
    innerVoice: "I needed proof that intelligence and wisdom are different departments.",
    filesChanged: 47,
  },
  {
    projectId: 15,
    hash: "b8e2041",
    author: "Kedhareswer <kedhar@local>",
    date: "2026-01-10",
    message: "feat(home): render rooms nobody will live in",
    innerVoice: "Sometimes you build beauty just to remember you can.",
    filesChanged: 23,
  },
  {
    projectId: 14,
    hash: "c1d9f88",
    author: "Kedhareswer <kedhar@local>",
    date: "2025-11-18",
    message: "feat(swarm): five agents, one pdf, zero consensus",
    innerVoice: "Multi-agent wasn't the product. Watching them disagree was.",
    filesChanged: 31,
  },
  {
    projectId: 13,
    hash: "d4a7e33",
    author: "Kedhareswer <kedhar@local>",
    date: "2025-08-09",
    message: "feat(chat): unify six providers, lose sleep",
    innerVoice: "If every model answers differently, which one is me?",
    filesChanged: 89,
  },
  {
    projectId: 12,
    hash: "e92b1aa",
    author: "Kedhareswer <kedhar@local>",
    date: "2025-07-06",
    message: "feat(portfolio): portfolio about portfolios",
    innerVoice: "Meta until the recursion made me dizzy.",
    filesChanged: 56,
  },
  {
    projectId: 10,
    hash: "f0c3d77",
    author: "Kedhareswer <kedhar@local>",
    date: "2025-07-05",
    message: "feat(prompts): optimize prompts about optimizing prompts",
    innerVoice: "45% better. 23% fewer tokens. 100% more anxiety.",
    filesChanged: 42,
  },
  {
    projectId: 11,
    hash: "1ab44ef",
    author: "Kedhareswer <kedhar@local>",
    date: "2025-07-05",
    message: "feat(voice): hands-free kitchen, wallet on fire",
    innerVoice: "ElevenLabs sounded delicious. The invoice did not.",
    filesChanged: 67,
  },
  {
    projectId: 8,
    hash: "2cd88a1",
    author: "Kedhareswer <kedhar@local>",
    date: "2025-07-05",
    message: "feat(rag): stop praying to cosine similarity",
    innerVoice: "Measured chunk quality. 82% precision. Finally slept.",
    filesChanged: 124,
  },
  {
    projectId: 4,
    hash: "3ef91b0",
    author: "Kedhareswer <kedhar@local>",
    date: "2025-07-05",
    message: "feat(thesis): literature that talks back",
    innerVoice: "Research platforms need rooms, not chat boxes.",
    filesChanged: 98,
  },
  {
    projectId: 6,
    hash: "4fa22c9",
    author: "Kedhareswer <kedhar@local>",
    date: "2025-05-20",
    message: "feat(ml): teach models by letting users break them",
    innerVoice: "Education through destruction. Very on-brand.",
    filesChanged: 34,
  },
  {
    projectId: 3,
    hash: "5bc33d8",
    author: "Kedhareswer <kedhar@local>",
    date: "2025-05-15",
    message: "feat(digits): solve mnist with unnecessary elegance",
    innerVoice: "99% accuracy on a problem solved in 1998. Felt powerful anyway.",
    filesChanged: 28,
  },
  {
    projectId: 2,
    hash: "6de44e7",
    author: "Kedhareswer <kedhar@local>",
    date: "2025-05-10",
    message: "feat(medical): enhance images, lack hospital",
    innerVoice: "40% clearer. Zero patients. The gap between demo and deployment.",
    filesChanged: 45,
  },
  {
    projectId: 1,
    hash: "7ff55f6",
    author: "Kedhareswer <kedhar@local>",
    date: "2025-04-20",
    message: "feat(sketch): gan promises, sketch delivers",
    innerVoice: "90% accuracy is a feeling when the metric is vanity.",
    filesChanged: 52,
  },
  {
    projectId: 9,
    hash: "8aa66a5",
    author: "Kedhareswer <kedhar@local>",
    date: "2025-04-15",
    message: "feat(notebook): analysts deserve better than jupyter fights",
    innerVoice: "The one I'd open every morning if I were honest.",
    filesChanged: 156,
  },
  {
    projectId: 7,
    hash: "9bb77b4",
    author: "Kedhareswer <kedhar@local>",
    date: "2023-03-01",
    message: "feat(grind): 100 mini projects, one long tutorial",
    innerVoice: "First commit. No audience. Just stubbornness and HTML.",
    filesChanged: 100,
  },
];

export const SHUTTER_ACTS: ShutterAct[] = [
  {
    id: "act1",
    label: "ACT I — FIRST LIGHT",
    ghostWord: "SEE",
    narrator: "Before anyone watched, I taught machines to see. Pixels into sketches. Digits into tensors. Medical images into something a doctor might trust — someday.",
    projectIds: [7, 1, 3, 2],
  },
  {
    id: "act2",
    label: "ACT II — JULY FEVER",
    ghostWord: "SHIP",
    narrator: "July was a fever. Eight repos in ten days. Not productivity — restlessness. Every idea felt urgent. Most were tuition.",
    projectIds: [4, 8, 11, 10, 12],
  },
  {
    id: "act3",
    label: "ACT III — THREE SURVIVORS",
    ghostWord: "PROVE",
    narrator: "Three survived the heat. Research that collaborates. PDFs that answer back. Notebooks that don't fight you.",
    projectIds: [4, 8, 9],
  },
  {
    id: "act4",
    label: "ACT IV — PRODUCTION",
    ghostWord: "HUMBLE",
    narrator: "Production doesn't care about your diagram. Real deadlines taught me what 'it works' is not the same as 'it's good.'",
    projectIds: [13, 14],
  },
  {
    id: "act5",
    label: "ACT V — PRESENT TENSE",
    ghostWord: "KEEP",
    narrator: "TGG in the trees. Chess with LLMs. Still proving I belong — to myself, mostly.",
    projectIds: [16, 15],
  },
];

export const ORACLE_INTRO = {
  line: "The deck knows what you shipped before you do.",
  subline: "Scroll to flip. Read the prophecy. Ignore at your peril.",
};

export const ORACLE_CARDS: OracleCard[] = [
  { projectId: 7, prophecy: "You will build the same tutorial one hundred times and call it foundation." },
  { projectId: 1, prophecy: "Vanity metrics will seduce you. The sketch will outlive the accuracy." },
  { projectId: 3, prophecy: "MNIST will make you feel like a god. Production will not." },
  { projectId: 2, prophecy: "You will enhance images for patients who never arrive." },
  { projectId: 6, prophecy: "Teaching others will teach you that you don't know enough." },
  { projectId: 9, prophecy: "The notebook you build for analysts is the one you'll wish existed.", reversed: "You already knew this. You built it anyway." },
  { projectId: 4, prophecy: "Collaboration scope will try to kill you. Narrow the thesis. Survive." },
  { projectId: 8, prophecy: "You will chunk PDFs the same way as everyone else — until you measure and stop." },
  { projectId: 11, prophecy: "Voice APIs will sound delicious. The invoice will not." },
  { projectId: 10, prophecy: "You will optimize prompts about optimizing prompts. The recursion is the lesson." },
  { projectId: 12, prophecy: "A portfolio about portfolios — the snake eats its tail and calls it design." },
  { projectId: 13, prophecy: "Six providers, one identity crisis. Unification is its own product." },
  { projectId: 14, prophecy: "Five agents will read one PDF and disagree. That is the demo." },
  { projectId: 15, prophecy: "You will design rooms no one will live in. Beauty for beauty's sake." },
  { projectId: 16, prophecy: "Watch an LLM blunder a queen. Stay humble.", reversed: "Humility is the real ELO." },
];

export const SCHIZO_VARIANTS = [
  { id: "d" as const, label: "D", name: "Autopsy", badge: "AUTOPSY REPORT", subtitle: "Cause of death · dark humor" },
  { id: "e" as const, label: "E", name: "Blame", badge: "GIT BLAME", subtitle: "Rewind commits · inner voice" },
  { id: "f" as const, label: "F", name: "Shutter", badge: "FILM SHUTTER", subtitle: "Act breaks · 7-bar cuts" },
  { id: "g" as const, label: "G", name: "Oracle", badge: "ORACLE DECK", subtitle: "Campaign · XP · five chapters" },
];

export type SchizoVariantId = (typeof SCHIZO_VARIANTS)[number]["id"];

export const VERDICT_LABEL: Record<AutopsyRecord["verdict"], string> = {
  tuition: "Survived as tuition",
  survived: "Still breathing",
  active: "ACTIVE CASE",
  "cold-case": "Cold case — unsolved",
};
