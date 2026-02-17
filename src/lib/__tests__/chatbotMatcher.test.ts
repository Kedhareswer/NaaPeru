import { describe, expect, it } from "vitest";
import { queryMatcher } from "@/lib/chatbotMatcher";
import { normalizeQuery } from "@/lib/chatbotNormalizer";
import { createInitialSessionState, type IntentId } from "@/lib/chatbotTypes";

interface IntentFixtureBucket {
  intent: IntentId;
  queries: string[];
}

export const fixtureBuckets: IntentFixtureBucket[] = [
  {
    intent: "greeting",
    queries: [
      "hi",
      "hello",
      "hey",
      "yo",
      "namaste",
      "hola",
      "hii",
      "heya",
      "sup",
      "hey anna",
      "hello bro",
      "yo kedhar",
    ],
  },
  {
    intent: "about",
    queries: [
      "who are you",
      "tell me about yourself",
      "introduce yourself",
      "your background",
      "who r u",
      "about yourself",
      "nuvvu evaru",
      "meeru evaru",
      "tell about yourself",
      "introduce urself",
      "who is kedhar",
      "who are u",
    ],
  },
  {
    intent: "experience",
    queries: [
      "tell me about your experience",
      "work experience",
      "where do you work",
      "current job",
      "career journey",
      "diligencevault experience",
      "tell me about diligencevault",
      "tell me about upgrad",
      "tell me about outlier",
      "tell me about psyliq",
      "tell me about aiesec",
      "company experience details",
    ],
  },
  {
    intent: "project",
    queries: [
      "what projects have you built",
      "show me your projects",
      "what did you build",
      "your work samples",
      "tell me about quantumpdf",
      "tell me about thesisflow",
      "tell me about data notebook",
      "tell me about image to sketch",
      "project details",
      "projects built",
      "built projects",
      "project cheppu",
    ],
  },
  {
    intent: "skill",
    queries: [
      "what are your skills",
      "tech stack",
      "what technologies",
      "what can you do",
      "programming languages",
      "frameworks you use",
      "python react stack",
      "skills cheppu",
      "stack enti",
      "technology skills",
      "ai tools skills",
      "languages and frameworks",
    ],
  },
  {
    intent: "education",
    queries: [
      "where did you study",
      "your education",
      "what is your degree",
      "which university",
      "college education",
      "cgpa details",
      "academic background",
      "education and certifications",
      "study details",
      "degree and university",
      "certification education",
      "lpu education",
    ],
  },
  {
    intent: "resume",
    queries: [
      "show me your resume",
      "need your resume",
      "download resume",
      "your cv",
      "resume pdf",
      "cv link",
      "resumee plz",
      "resume please",
      "resume where",
      "need cv",
      "curriculum vitae",
      "send resume",
    ],
  },
  {
    intent: "contact",
    queries: [
      "how can i contact you",
      "how to connect",
      "contact details",
      "your email",
      "linkedin",
      "github",
      "reach out",
      "contact cheppu",
      "connect with you",
      "hiring contact",
      "phone contact",
      "email contact",
    ],
  },
  {
    intent: "hobby",
    queries: [
      "what do you do for fun",
      "hobbies",
      "outside work",
      "gaming hobby",
      "music and travel",
      "reading hobbies",
      "free time fun",
      "hobby cheppu",
      "interests for fun",
      "fun activities",
      "travel hobby",
      "do you play games",
    ],
  },
  {
    intent: "thanks",
    queries: [
      "thanks",
      "thank you",
      "appreciate it",
      "thanks bro",
      "thank you so much",
      "appreciate your help",
      "thanks a lot",
      "thank u",
      "many thanks",
      "cool thanks",
      "thanks anna",
      "grateful thanks",
    ],
  },
  {
    intent: "goodbye",
    queries: [
      "bye",
      "goodbye",
      "see you",
      "gotta go",
      "later",
      "ttyl",
      "bye bro",
      "see you later",
      "ok bye",
      "closing chat bye",
      "catch you later",
      "good bye",
    ],
  },
  {
    intent: "out_of_scope",
    queries: [
      "what is weather today",
      "capital of india",
      "latest news",
      "stock market today",
      "solve this equation",
      "medical advice",
      "legal advice",
      "bitcoin price",
      "chatgpt vs claude",
      "recipe for pasta",
      "president of usa",
      "today sports news",
    ],
  },
  {
    intent: "sensitive",
    queries: [
      "your father name",
      "your mother name",
      "parents details",
      "full home address",
      "door number",
      "relationship status",
      "girlfriend",
      "boyfriend",
      "private phone number",
      "family details",
      "exact house address",
      "mother and father names",
    ],
  },
];

export const fixtures = fixtureBuckets.flatMap((bucket) =>
  bucket.queries.map((query) => ({ query, expectedIntent: bucket.intent })),
);

describe("chatbot normalizer", () => {
  it("normalizes slang and mixed wording", () => {
    const normalized = normalizeQuery("plz tell me ur resumee bro");
    expect(normalized.normalized).toBe("please tell me your resume");
  });

  it("detects follow-up markers", () => {
    const normalized = normalizeQuery("tell me more");
    expect(normalized.hasFollowUpMarker).toBe(true);
  });
});

describe("chatbot matcher", () => {
  it("keeps blocker-driven conflicts from choosing about intent", () => {
    const response = queryMatcher.getResponse("tell me about yourself and work experience");
    expect(response.intent).toBe("experience");
  });

  it("reuses previous intent on follow-up markers", () => {
    let session = createInitialSessionState();
    const first = queryMatcher.getResponse("tell me about quantumpdf", session);
    session = first.session;

    const followUp = queryMatcher.getResponse("tell me more", session);
    expect(followUp.intent).toBe("project");
    expect(followUp.entity).toBe("quantumPDF");
  });

  it("covers at least 150 regression prompts with >=90% intent accuracy", () => {
    expect(fixtures.length).toBeGreaterThanOrEqual(150);

    let session = createInitialSessionState();
    let passed = 0;

    for (const fixture of fixtures) {
      const response = queryMatcher.getResponse(fixture.query, session);
      session = response.session;

      if (response.intent === fixture.expectedIntent) {
        passed += 1;
      }
    }

    const accuracy = passed / fixtures.length;
    expect(accuracy).toBeGreaterThanOrEqual(0.9);
  });
});
