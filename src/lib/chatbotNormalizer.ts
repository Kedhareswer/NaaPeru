import type { QueryContext } from "./chatbotTypes";

const WORD_ALIASES: Record<string, string> = {
  u: "you",
  ur: "your",
  r: "are",
  pls: "please",
  plz: "please",
  bro: "",
  anna: "",
  ra: "",
  em: "what",
  enti: "what",
  cheppu: "tell",
  cheppandi: "tell",
  evaru: "who are you",
  nenu: "i",
  nuvvu: "you",
  meeru: "you",
  na: "my",
  meeku: "to you",
  resumee: "resume",
  cvv: "cv",
  projcts: "projects",
  experiance: "experience",
  urself: "yourself",
  waht: "what",
  wht: "what",
  frm: "from",
};

const FOLLOW_UP_PATTERNS = [
  "tell me more",
  "what about",
  "and",
  "that",
  "it",
  "more details",
  "continue",
];

const SAFE_TEXT_PATTERN = /[\p{L}\p{N}]/u;

export const normalizeQuery = (input: string): QueryContext => {
  const withoutControlCharacters = Array.from(input)
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code <= 31 || (code >= 127 && code <= 159)) {
        return " ";
      }
      return char;
    })
    .join("");

  const cleaned = withoutControlCharacters
    .toLowerCase()
    .replace(/[_/\\|]+/g, " ")
    .replace(/[^\p{L}\p{N}\s!?'.-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

  const aliased = cleaned
    .split(" ")
    .map((word) => {
      const replacement = WORD_ALIASES[word];
      if (replacement === undefined) {
        return word;
      }
      return replacement;
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  const hasFollowUpMarker = FOLLOW_UP_PATTERNS.some(
    (pattern) =>
      aliased === pattern || aliased.startsWith(`${pattern} `) || aliased.includes(` ${pattern} `),
  );

  const tokens = aliased.length === 0 ? [] : aliased.split(" ");

  return {
    normalized: aliased,
    tokens,
    hasFollowUpMarker,
  };
};

export const collapseWhitespace = (value: string): string =>
  value.replace(/\s+/g, " ").trim();

export const isMeaningfulText = (value: string): boolean => SAFE_TEXT_PATTERN.test(value);
