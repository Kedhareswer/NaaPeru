import { queryMatcher } from "./chatbotMatcher";
import { createInitialSessionState, type IntentId } from "./chatbotTypes";

interface FixtureCase {
  query: string;
  expectedIntent: IntentId;
  label: string;
}

interface FixtureResult {
  fixture: FixtureCase;
  actualIntent: IntentId;
  success: boolean;
}

interface RunSummary {
  total: number;
  passed: number;
  failed: number;
  accuracy: number;
  failures: FixtureResult[];
}

export const fixtureCases: FixtureCase[] = [
  { query: "hi", expectedIntent: "greeting", label: "greeting" },
  { query: "who are you", expectedIntent: "about", label: "about" },
  { query: "where do you work", expectedIntent: "experience", label: "experience" },
  { query: "tell me about diligencevault", expectedIntent: "experience", label: "experience-entity" },
  { query: "show me your projects", expectedIntent: "project", label: "project" },
  { query: "tell me about quantumpdf", expectedIntent: "project", label: "project-entity" },
  { query: "what are your skills", expectedIntent: "skill", label: "skills" },
  { query: "where did you study", expectedIntent: "education", label: "education" },
  { query: "need your resume", expectedIntent: "resume", label: "resume" },
  { query: "how can i contact you", expectedIntent: "contact", label: "contact" },
  { query: "what do you do for fun", expectedIntent: "hobby", label: "hobby" },
  { query: "what is weather today", expectedIntent: "out_of_scope", label: "oos" },
  { query: "your father name", expectedIntent: "sensitive", label: "privacy" },
  { query: "thanks", expectedIntent: "thanks", label: "thanks" },
  { query: "bye", expectedIntent: "goodbye", label: "goodbye" },
];

export const runFixtureSuite = (fixtures: FixtureCase[] = fixtureCases): RunSummary => {
  let session = createInitialSessionState();
  const results: FixtureResult[] = fixtures.map((fixture) => {
    const reply = queryMatcher.getResponse(fixture.query, session);
    session = reply.session;

    const success = reply.intent === fixture.expectedIntent;

    return {
      fixture,
      actualIntent: reply.intent,
      success,
    };
  });

  const passed = results.filter((result) => result.success).length;
  const total = results.length;
  const failed = total - passed;

  return {
    total,
    passed,
    failed,
    accuracy: total === 0 ? 0 : passed / total,
    failures: results.filter((result) => !result.success),
  };
};

export const runTests = (): RunSummary => runFixtureSuite();
