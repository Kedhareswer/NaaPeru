/** Narrative spine — diary voice, not project metadata dumps. */

export type StoryLayout =
  | "cold-open"
  | "diary"
  | "project-hero"
  | "montage"
  | "burst"
  | "split-career"
  | "sticky-now"
  | "rewind-voice"
  | "manifesto";

export interface ChronicleBeat {
  id: string;
  act: string;
  layout: StoryLayout;
  narrator: string;
  innerVoice?: string;
  projectIds?: number[];
  period?: string;
  visual?: "vhs" | "clean" | "wireframe" | "present" | "burn";
}

export interface ReelScene {
  id: string;
  slug: string;
  sceneLabel: string;
  narrator: string;
  direction: string;
  projectIds: number[];
  duration: string;
}

export interface SignalBeat {
  id: string;
  line: string;
  subline?: string;
  projectIds?: number[];
  accent?: boolean;
}

export const CHRONICLE_BEATS: ChronicleBeat[] = [
  {
    id: "open",
    act: "Cold Open",
    layout: "cold-open",
    narrator: "I didn't plan any of this.",
    visual: "clean",
  },
  {
    id: "confession",
    act: "Act I",
    layout: "diary",
    narrator:
      "I don't have a five-year plan. I have a list of things I can't stop thinking about, a job that's teaching me more than college ever did, and the stubbornness to keep moving.",
    visual: "vhs",
  },
  {
    id: "origin",
    act: "Act I",
    layout: "montage",
    period: "2023 – May 2025",
    narrator:
      "First I learned to see. Pixels into sketches. Digits into tensors. Endoscopy images into something a doctor might actually use. I wasn't building products yet — I was learning what problems feel like in code.",
    projectIds: [7, 1, 3, 2],
    visual: "vhs",
  },
  {
    id: "burst",
    act: "Act II",
    layout: "burst",
    period: "July 2025",
    narrator:
      "Then July happened. Eight projects in ten days. Not because I was productive — because I was restless. Every idea felt urgent. Most weren't. A few changed everything.",
    projectIds: [4, 8, 11, 10, 12, 9, 6],
    visual: "burn",
  },
  {
    id: "thesis",
    act: "Act III",
    layout: "project-hero",
    narrator:
      "ThesisFlow stopped being a hackathon thing. Research platforms need collaboration, not another chat box. I wanted a room where the literature actually talks back.",
    projectIds: [4],
    visual: "clean",
  },
  {
    id: "quantum",
    act: "Act III",
    layout: "project-hero",
    narrator:
      "QuantumPDF was the bet: what if PDFs weren't dead files? 5,000 chunks, 82% precision, under ten seconds. I stopped praying to cosine similarity and started measuring.",
    projectIds: [8],
    visual: "clean",
  },
  {
    id: "notebook",
    act: "Act III",
    layout: "project-hero",
    narrator:
      "Data Notebook was the love letter to analysts — code, charts, and notebooks that don't fight you. If I'm honest, this is the one I'd use every day.",
    projectIds: [9],
    visual: "clean",
  },
  {
    id: "production",
    act: "Act IV",
    layout: "split-career",
    period: "Oct 2025 – Present",
    narrator:
      "DiligenceVault turned the playground into production. Financial documents. Real deadlines. Agent orchestration processing thousands of chunks while someone waits on the other end. I learned what 'it works' is not the same as 'it's good.'",
    visual: "present",
  },
  {
    id: "now",
    act: "Act V",
    layout: "sticky-now",
    narrator:
      "Right now I'm building TGG — vectorless retrieval, because everyone chunks PDFs the same way and I think that's broken. Also chess with LLMs, because sometimes you need to watch Gemini blunder a queen to stay humble.",
    projectIds: [16, 13],
    visual: "present",
  },
  {
    id: "rewind",
    act: "Rewind",
    layout: "rewind-voice",
    narrator: "If a tree falls in a forest and nobody hears it — that's my GitHub right now.",
    innerVoice:
      "I build stuff but nobody knows. That's my fault. I hide behind shipping and avoid the part where you tell people what you made.",
    visual: "wireframe",
  },
  {
    id: "close",
    act: "End Card",
    layout: "manifesto",
    narrator: "I don't know where this goes. I just know I won't stop.",
    visual: "clean",
  },
];

export const REEL_SCENES: ReelScene[] = [
  {
    id: "s01",
    slug: "INT. BEDROOM — NIGHT",
    sceneLabel: "Scene 01",
    direction: "FADE IN. A laptop glow. First commits. No audience.",
    narrator: "Before anyone was watching, I was teaching machines to see.",
    projectIds: [1, 3, 2, 7],
    duration: "00:02:14:00",
  },
  {
    id: "s02",
    slug: "INT. APARTMENT — SUMMER",
    sceneLabel: "Scene 02",
    direction: "QUICK CUTS. Tabs multiply. Coffee cools. Ship anyway.",
    narrator: "July was a fever — build, deploy, forget, build again.",
    projectIds: [4, 8, 11, 10, 12],
    duration: "00:05:41:00",
  },
  {
    id: "s03",
    slug: "INT. STUDIO — THREE FRAMES",
    sceneLabel: "Scene 03",
    direction: "SLOW PUSH IN. Three projects stop being experiments.",
    narrator: "Three survived the heat. Research. RAG. Data. The rest were tuition.",
    projectIds: [4, 8, 9],
    duration: "00:08:22:00",
  },
  {
    id: "s04",
    slug: "INT. OFFICE — MORNING",
    sceneLabel: "Scene 04",
    direction: "HANDHELD. PR reviews. Production logs. Real stakes.",
    narrator: "Production doesn't care about your architecture diagram.",
    projectIds: [13, 14],
    duration: "00:11:08:00",
  },
  {
    id: "s05",
    slug: "INT. DESK — NOW",
    sceneLabel: "Scene 05",
    direction: "STATIC. One obsession. One joke. Both serious.",
    narrator: "TGG in the trees. LLMs on a chessboard. Still proving I belong.",
    projectIds: [16],
    duration: "00:13:55:00",
  },
  {
    id: "s06",
    slug: "REWIND — OBJECTIVES",
    sceneLabel: "Rewind",
    direction: "FILM BURNS. Same shots. Different questions.",
    narrator: "What was I trying to prove? Not what shipped — what I needed to believe.",
    projectIds: [4, 8, 9, 16],
    duration: "00:16:00:00",
  },
];

export const SIGNAL_BEATS: SignalBeat[] = [
  {
    id: "s1",
    line: "I build when I'm anxious.",
    subline: "The portfolio is the byproduct, not the plan.",
    accent: true,
  },
  {
    id: "s2",
    line: "July was a fever.",
    projectIds: [4, 8, 11, 10, 12],
    subline: "Eight repos. Ten days. Zero sleep discipline.",
  },
  {
    id: "s3",
    line: "Three survived the heat.",
    projectIds: [4, 8, 9],
    subline: "ThesisFlow. QuantumPDF. Data Notebook.",
  },
  {
    id: "s4",
    line: "Production humbles you.",
    projectIds: [13, 14],
    subline: "DiligenceVault — 5,000 chunks, someone waiting on the other end.",
  },
  {
    id: "s5",
    line: "Everyone chunks PDFs the same way.",
    projectIds: [16],
    subline: "I'm building TGG to prove there's another path.",
    accent: true,
  },
  {
    id: "s6",
    line: "My public graph is quiet.",
    subline: "The work isn't. That's the tension.",
  },
  {
    id: "s7",
    line: "I won't stop.",
    subline: "I don't know where this goes.",
    accent: true,
  },
];
