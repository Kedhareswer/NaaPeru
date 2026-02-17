export type IntentId =
  | "greeting"
  | "about"
  | "experience"
  | "project"
  | "skill"
  | "education"
  | "resume"
  | "portfolio"
  | "contact"
  | "hobby"
  | "achievement"
  | "location"
  | "age"
  | "future"
  | "advice"
  | "role"
  | "job_fit"
  | "favorite_project"
  | "favorite_tech"
  | "thanks"
  | "goodbye"
  | "joke"
  | "sensitive"
  | "out_of_scope"
  | "clarify";

export type EntityKind = "experience" | "project" | "none";

export interface ChatSessionState {
  lastIntent: IntentId | null;
  lastEntity: string | null;
  recentIntents: IntentId[];
  recentReplyVariantIds: string[];
}

export interface MatchResult {
  intent: IntentId;
  score: number;
  secondBestScore: number;
  confidence: number;
  matchedEntity: string | null;
  debugHits: string[];
}

export interface ChatbotReply {
  text: string;
  intent: IntentId;
  confidence: number;
  entity: string | null;
  variantId: string;
  suggestions: string[];
  session: ChatSessionState;
  match: MatchResult;
}

export interface QueryContext {
  normalized: string;
  tokens: string[];
  hasFollowUpMarker: boolean;
}

export interface IntentRule {
  id: IntentId;
  phrases: string[];
  keywords: string[];
  blockers?: string[];
  entityAliases?: Record<string, string[]>;
  supportsFollowUp?: boolean;
}

export const createInitialSessionState = (): ChatSessionState => ({
  lastIntent: null,
  lastEntity: null,
  recentIntents: [],
  recentReplyVariantIds: [],
});
