import type { ChatbotReply } from "./chatbotTypes";

export interface FallbackQuotaState {
  totalTurns: number;
  aiTurns: number;
}

interface AiFallbackPayload {
  question: string;
  matcherReply: string;
}

const FALLBACK_INTENTS = new Set(["clarify"]);

export const shouldUseAiFallback = (
  reply: ChatbotReply,
  quota: FallbackQuotaState,
): boolean => {
  if (!FALLBACK_INTENTS.has(reply.intent)) {
    return false;
  }

  const nextTurn = quota.totalTurns + 1;
  const maxAiTurns = Math.max(1, Math.floor(nextTurn * 0.3));

  return quota.aiTurns < maxAiTurns;
};

export const buildNextQuotaState = (
  current: FallbackQuotaState,
  usedAiFallback: boolean,
): FallbackQuotaState => ({
  totalTurns: current.totalTurns + 1,
  aiTurns: current.aiTurns + (usedAiFallback ? 1 : 0),
});

export const fetchAiFallbackReply = async (
  payload: AiFallbackPayload,
): Promise<string | null> => {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return null;
    }

    const body = (await response.json()) as { text?: unknown };
    if (typeof body.text !== "string") {
      return null;
    }

    const text = body.text.trim();
    return text.length > 0 ? text : null;
  } catch {
    return null;
  }
};
