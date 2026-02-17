import { INTENT_RULES, MATCH_WEIGHTS } from "./chatbotIntents";
import { buildReply } from "./chatbotResponses";
import { normalizeQuery } from "./chatbotNormalizer";
import {
  createInitialSessionState,
  type ChatbotReply,
  type ChatSessionState,
  type IntentId,
  type IntentRule,
  type MatchResult,
  type QueryContext,
} from "./chatbotTypes";

interface IntentScore {
  id: IntentId;
  score: number;
  entity: string | null;
  hits: string[];
}

const MIN_SCORE = 3;
const MIN_MARGIN = 1;

const escapeRegex = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const hasPhrase = (text: string, phrase: string): boolean => {
  const pattern = phrase.trim();
  if (!pattern) {
    return false;
  }

  const escaped = escapeRegex(pattern).replace(/\s+/g, "\\s+");
  return new RegExp(`\\b${escaped}\\b`, "i").test(text);
};

const ruleById = (id: IntentId): IntentRule | undefined => INTENT_RULES.find((rule) => rule.id === id);

const createBaseScores = (): IntentScore[] =>
  INTENT_RULES.map((rule) => ({
    id: rule.id,
    score: 0,
    entity: null,
    hits: [],
  }));

const updateIntentScore = (entry: IntentScore, context: QueryContext, rule: IntentRule): void => {
  let keywordHits = 0;

  for (const phrase of rule.phrases) {
    if (hasPhrase(context.normalized, phrase)) {
      entry.score += MATCH_WEIGHTS.phrase;
      entry.hits.push(`phrase:${phrase}`);
    }
  }

  for (const keyword of rule.keywords) {
    if (context.tokens.includes(keyword) || hasPhrase(context.normalized, keyword)) {
      entry.score += MATCH_WEIGHTS.keyword;
      entry.hits.push(`keyword:${keyword}`);
      keywordHits += 1;

      if (context.normalized === keyword) {
        entry.score += MATCH_WEIGHTS.entity;
        entry.hits.push(`keyword_exact:${keyword}`);
      }
    }
  }

  if (keywordHits >= 2) {
    entry.score += MATCH_WEIGHTS.keyword;
    entry.hits.push("keyword_combo");
  } else if (keywordHits === 1 && context.tokens.length <= 3) {
    entry.score += MATCH_WEIGHTS.entity;
    entry.hits.push("keyword_short_boost");
  }

  if (rule.entityAliases) {
    for (const [entity, aliases] of Object.entries(rule.entityAliases)) {
      for (const alias of aliases) {
        if (hasPhrase(context.normalized, alias)) {
          entry.score += MATCH_WEIGHTS.entity;
          entry.entity = entity;
          entry.hits.push(`entity:${alias}`);
        }
      }
    }
  }

  if (rule.blockers) {
    for (const blocker of rule.blockers) {
      if (hasPhrase(context.normalized, blocker) || context.tokens.includes(blocker)) {
        entry.score += MATCH_WEIGHTS.blocker;
        entry.hits.push(`blocker:${blocker}`);
      }
    }
  }
};

const selectIntent = (context: QueryContext, session: ChatSessionState): MatchResult => {
  const scores = createBaseScores();

  for (const entry of scores) {
    const rule = ruleById(entry.id);
    if (!rule) {
      continue;
    }
    updateIntentScore(entry, context, rule);
  }

  if (context.hasFollowUpMarker && session.lastIntent) {
    const followUpEntry = scores.find((score) => score.id === session.lastIntent);
    const followUpRule = ruleById(session.lastIntent);

    if (followUpEntry && followUpRule?.supportsFollowUp) {
      followUpEntry.score += MATCH_WEIGHTS.followUp;
      followUpEntry.hits.push("followup:marker");

      // Follow-up-only questions should still resolve to previous intent.
      if (followUpEntry.score < MIN_SCORE) {
        followUpEntry.score = MIN_SCORE;
        followUpEntry.hits.push("followup:carry");
      }

      if (!followUpEntry.entity && session.lastEntity) {
        followUpEntry.entity = session.lastEntity;
      }
    }
  }

  scores.sort((a, b) => b.score - a.score);
  const top = scores[0];
  const second = scores[1];

  const topScore = top?.score ?? 0;
  const secondBestScore = second?.score ?? 0;
  const margin = topScore - secondBestScore;

  if (!top || topScore < MIN_SCORE || margin < MIN_MARGIN) {
    return {
      intent: "clarify",
      score: topScore,
      secondBestScore,
      confidence: 0.3,
      matchedEntity: null,
      debugHits: top?.hits ?? [],
    };
  }

  const confidence = Math.max(0.35, Math.min(1, topScore / 10));

  return {
    intent: top.id,
    score: topScore,
    secondBestScore,
    confidence,
    matchedEntity: top.entity,
    debugHits: top.hits,
  };
};

const appendWithMax = <T>(list: T[], value: T, maxSize: number): T[] => {
  const next = [...list, value];
  return next.slice(Math.max(0, next.length - maxSize));
};

const buildNextSessionState = (
  session: ChatSessionState,
  intent: IntentId,
  entity: string | null,
  variantId: string,
): ChatSessionState => {
  const retainedEntity = entity ?? (intent === session.lastIntent ? session.lastEntity : null);

  return {
    lastIntent: intent,
    lastEntity: retainedEntity,
    recentIntents: appendWithMax(session.recentIntents, intent, 6),
    recentReplyVariantIds: appendWithMax(session.recentReplyVariantIds, variantId, 6),
  };
};

export class QueryMatcher {
  getResponse(query: string, session: ChatSessionState = createInitialSessionState()): ChatbotReply {
    const context = normalizeQuery(query);

    const match = selectIntent(context, session);
    const reply = buildReply({
      intent: match.intent,
      entity: match.matchedEntity,
      session,
    });

    const nextSession = buildNextSessionState(session, match.intent, match.matchedEntity, reply.variantId);

    return {
      text: reply.text,
      intent: match.intent,
      confidence: match.confidence,
      entity: match.matchedEntity,
      variantId: reply.variantId,
      suggestions: reply.suggestions,
      session: nextSession,
      match,
    };
  }
}

export const queryMatcher = new QueryMatcher();
