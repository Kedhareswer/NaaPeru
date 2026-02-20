import { describe, expect, it } from "vitest";
import {
  buildNextQuotaState,
  shouldUseAiFallback,
  type FallbackQuotaState,
} from "@/lib/chatbotAiFallback";
import { createInitialSessionState, type ChatbotReply, type IntentId } from "@/lib/chatbotTypes";

const makeReply = (intent: IntentId): ChatbotReply => ({
  text: "x",
  intent,
  confidence: 0.5,
  entity: null,
  variantId: `${intent}:0`,
  suggestions: [],
  session: createInitialSessionState(),
  match: {
    intent,
    score: 3,
    secondBestScore: 2,
    confidence: 0.5,
    matchedEntity: null,
    debugHits: [],
  },
});

describe("chatbot AI fallback policy", () => {
  it("allows fallback for clarify intents within quota", () => {
    const quota: FallbackQuotaState = { totalTurns: 0, aiTurns: 0 };
    expect(shouldUseAiFallback(makeReply("clarify"), quota)).toBe(true);
  });

  it("blocks fallback for non-clarify intents", () => {
    const quota: FallbackQuotaState = { totalTurns: 0, aiTurns: 0 };
    expect(shouldUseAiFallback(makeReply("about"), quota)).toBe(false);
  });

  it("blocks fallback after reaching the 30% cap", () => {
    const quota: FallbackQuotaState = { totalTurns: 9, aiTurns: 3 };
    expect(shouldUseAiFallback(makeReply("clarify"), quota)).toBe(false);
  });

  it("tracks quota progression", () => {
    const current: FallbackQuotaState = { totalTurns: 4, aiTurns: 1 };
    expect(buildNextQuotaState(current, true)).toEqual({ totalTurns: 5, aiTurns: 2 });
    expect(buildNextQuotaState(current, false)).toEqual({ totalTurns: 5, aiTurns: 1 });
  });
});
