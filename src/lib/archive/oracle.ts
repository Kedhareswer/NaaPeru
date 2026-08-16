/** Oracle Deck — full campaign: chapters, arcana, XP, story beats. */

export type OracleSuit = "foundation" | "vision" | "fever" | "noise" | "truth";
export type OracleRarity = "common" | "rare" | "legendary";

export interface OracleCardData {
  projectId: number;
  arcana: string;
  roman: string;
  suit: OracleSuit;
  prophecy: string;
  storyBeat: string;
  xp: number;
  rarity: OracleRarity;
  reversed?: string;
}

export interface OracleChapter {
  id: string;
  act: string;
  title: string;
  spread: "past-present-future" | "triangle" | "line";
  intro: string;
  closing: string;
  chapterXp: number;
  cardIds: number[];
}

export const ORACLE_CAMPAIGN = {
  title: "The Kedhar Spread",
  tagline: "Fifteen cards. Five chapters. One reading you can't unsee.",
  prologue: [
    "You didn't come here for a portfolio.",
    "You came because something in the commits folder whispered back.",
    "The deck was already dealt — you just hadn't scrolled far enough to flip it.",
  ],
  epilogue: {
    title: "Reading Complete",
    body: "The cards don't predict the future. They confess the past you keep shipping under new names. The work was never the prophecy — you were.",
    ranks: [
      { minXp: 0, title: "The Skeptic", line: "You flipped but didn't believe. Fair." },
      { minXp: 120, title: "The Initiate", line: "You saw the pattern forming. Keep scrolling." },
      { minXp: 220, title: "The Seer", line: "Past, fever, truth — you read the whole spread." },
      { minXp: 300, title: "The Architect", line: "You didn't just read the deck. You recognized yourself in it." },
    ],
  },
};

export const ORACLE_CHAPTERS: OracleChapter[] = [
  {
    id: "ch1",
    act: "Chapter I",
    title: "The First Deal",
    spread: "past-present-future",
    intro:
      "Before anyone watched, you shuffled tutorials like prayer cards. The deck remembers the grind — every mini project a small bet that you'd eventually belong.",
    closing: "Three cards down. The deck is warming up. It knows you're still pretending this is just a scroll.",
    chapterXp: 40,
    cardIds: [7, 1, 3],
  },
  {
    id: "ch2",
    act: "Chapter II",
    title: "Machines That See",
    spread: "triangle",
    intro:
      "Then you taught pixels to mean something. Medical scans. Sketches. Digits. You weren't building products — you were learning what problems feel like when they refuse to be abstract.",
    closing: "The triangle closes. Vision without deployment is still a kind of faith.",
    chapterXp: 40,
    cardIds: [2, 6, 9],
  },
  {
    id: "ch3",
    act: "Chapter III",
    title: "July Burns",
    spread: "line",
    intro:
      "July was a fever — not productivity, restlessness. The deck dealt fire: research, RAG, voice, prompts. Eight ideas in ten days. The cards still smell like coffee and deploy logs.",
    closing: "The heat passes. What survives isn't the fastest ship — it's what you couldn't stop thinking about.",
    chapterXp: 50,
    cardIds: [4, 8, 11],
  },
  {
    id: "ch4",
    act: "Chapter IV",
    title: "Noise & Nerve",
    spread: "past-present-future",
    intro:
      "Not everything deserved a second act. Portfolios about portfolios. Prompt tools optimizing prompts. Six APIs wearing one mask. The deck doesn't judge — it just lays the noise beside the nerve.",
    closing: "Somewhere in the static, production was waiting. Impatient.",
    chapterXp: 40,
    cardIds: [10, 12, 13],
  },
  {
    id: "ch5",
    act: "Chapter V",
    title: "What Remains",
    spread: "triangle",
    intro:
      "Five agents read one PDF and disagreed. Rooms nobody lives in. Chess with models that blunder queens. The last cards aren't about death — they're about what you keep building when nobody's graph is watching.",
    closing: "The spread is complete. The reading was always about you.",
    chapterXp: 60,
    cardIds: [14, 15, 16],
  },
];

export const ORACLE_DECK: OracleCardData[] = [
  {
    projectId: 7,
    arcana: "The Grinder",
    roman: "0",
    suit: "foundation",
    prophecy: "You will build the same tutorial one hundred times and call it foundation.",
    storyBeat: "First card. First lie you told yourself: quantity is practice.",
    xp: 15,
    rarity: "common",
  },
  {
    projectId: 1,
    arcana: "The Sketch",
    roman: "I",
    suit: "foundation",
    prophecy: "Vanity metrics will seduce you. The sketch will outlive the accuracy.",
    storyBeat: "GANs promised miracles. You kept the sketch anyway.",
    xp: 15,
    rarity: "common",
  },
  {
    projectId: 3,
    arcana: "The Digit",
    roman: "II",
    suit: "foundation",
    prophecy: "MNIST will make you feel like a god. Production will not.",
    storyBeat: "99% on a solved problem. Felt like destiny. Was homework.",
    xp: 15,
    rarity: "common",
  },
  {
    projectId: 2,
    arcana: "The Lens",
    roman: "III",
    suit: "vision",
    prophecy: "You will enhance images for patients who never arrive.",
    storyBeat: "40% clearer scans. Zero clinics. The gap between demo and deployment.",
    xp: 18,
    rarity: "common",
  },
  {
    projectId: 6,
    arcana: "The Teacher",
    roman: "IV",
    suit: "vision",
    prophecy: "Teaching others will teach you that you don't know enough.",
    storyBeat: "Let them break the models. That's how you learned too.",
    xp: 18,
    rarity: "common",
  },
  {
    projectId: 9,
    arcana: "The Analyst",
    roman: "V",
    suit: "vision",
    prophecy: "The notebook you build for analysts is the one you'll wish existed.",
    storyBeat: "Love letter disguised as product. You knew from the first cell.",
    xp: 25,
    rarity: "rare",
    reversed: "You already knew this. You built it anyway.",
  },
  {
    projectId: 4,
    arcana: "The Thesis",
    roman: "VI",
    suit: "fever",
    prophecy: "Collaboration scope will try to kill you. Narrow the thesis. Survive.",
    storyBeat: "Literature that talks back. The room mattered more than the chat box.",
    xp: 25,
    rarity: "rare",
  },
  {
    projectId: 8,
    arcana: "The Chunk",
    roman: "VII",
    suit: "fever",
    prophecy: "You will chunk PDFs the same way as everyone else — until you measure and stop.",
    storyBeat: "82% precision. Under ten seconds. You stopped praying to cosine similarity.",
    xp: 30,
    rarity: "legendary",
  },
  {
    projectId: 11,
    arcana: "The Voice",
    roman: "VIII",
    suit: "fever",
    prophecy: "Voice APIs will sound delicious. The invoice will not.",
    storyBeat: "Hands-free kitchen. Wallet on fire. ElevenLabs haunts this card.",
    xp: 18,
    rarity: "common",
  },
  {
    projectId: 10,
    arcana: "The Prompt",
    roman: "IX",
    suit: "noise",
    prophecy: "You will optimize prompts about optimizing prompts. The recursion is the lesson.",
    storyBeat: "45% better. 23% fewer tokens. 100% more meta.",
    xp: 15,
    rarity: "common",
  },
  {
    projectId: 12,
    arcana: "The Mirror",
    roman: "X",
    suit: "noise",
    prophecy: "A portfolio about portfolios — the snake eats its tail and calls it design.",
    storyBeat: "Glassmorphism reflecting glassmorphism. Meta until it wasn't.",
    xp: 15,
    rarity: "common",
  },
  {
    projectId: 13,
    arcana: "The Mask",
    roman: "XI",
    suit: "noise",
    prophecy: "Six providers, one identity crisis. Unification is its own product.",
    storyBeat: "Every model answered differently. You became the switchboard.",
    xp: 22,
    rarity: "rare",
  },
  {
    projectId: 14,
    arcana: "The Swarm",
    roman: "XII",
    suit: "truth",
    prophecy: "Five agents will read one PDF and disagree. That is the demo.",
    storyBeat: "Multi-agent wasn't the product. Watching them argue was.",
    xp: 18,
    rarity: "common",
  },
  {
    projectId: 15,
    arcana: "The Room",
    roman: "XIII",
    suit: "truth",
    prophecy: "You will design rooms no one will live in. Beauty for beauty's sake.",
    storyBeat: "Sometimes you build pretty things just to remember you can.",
    xp: 15,
    rarity: "common",
  },
  {
    projectId: 16,
    arcana: "The Gambit",
    roman: "XIV",
    suit: "truth",
    prophecy: "Watch an LLM blunder a queen. Stay humble.",
    storyBeat: "ELO as humility engine. Gemini hangs its own queen. You laugh. You learn.",
    xp: 30,
    rarity: "legendary",
    reversed: "Humility is the real ELO.",
  },
];

export const SUIT_LABEL: Record<OracleSuit, string> = {
  foundation: "Suit of Grind",
  vision: "Suit of Sight",
  fever: "Suit of Fire",
  noise: "Suit of Static",
  truth: "Suit of Remains",
};

export const SPREAD_POSITIONS: Record<OracleChapter["spread"], string[]> = {
  "past-present-future": ["Past", "Present", "Future"],
  triangle: ["Mind", "Body", "Path"],
  line: ["Spark", "Burn", "Ash"],
};

export function oracleCardByProjectId(id: number): OracleCardData | undefined {
  return ORACLE_DECK.find((c) => c.projectId === id);
}

export function rankForXp(xp: number): { title: string; line: string } {
  const ranks = ORACLE_CAMPAIGN.epilogue.ranks;
  let current = ranks[0];
  for (const r of ranks) {
    if (xp >= r.minXp) current = r;
  }
  return current;
}

export const TOTAL_ORACLE_XP =
  ORACLE_DECK.reduce((s, c) => s + c.xp, 0) +
  ORACLE_CHAPTERS.reduce((s, ch) => s + ch.chapterXp, 0);
