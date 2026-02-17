import type { IntentRule } from "./chatbotTypes";

export const MATCH_WEIGHTS = {
  phrase: 3,
  keyword: 1,
  entity: 2,
  followUp: 2,
  blocker: -100,
} as const;

const EXPERIENCE_ENTITIES: Record<string, string[]> = {
  diligenceVault: ["diligencevault", "diligence vault", "dv"],
  upGrad: ["upgrad", "up grad"],
  outlierAI: ["outlier", "outlier ai", "outlier.ai"],
  psyliq: ["psyliq"],
  aiesec: ["aiesec"],
};

const PROJECT_ENTITIES: Record<string, string[]> = {
  thesisFlow: ["thesisflow", "thesis flow", "thesisflow ai"],
  quantumPDF: ["quantumpdf", "quantum pdf", "pdf chatapp", "pdf chatbot"],
  dataNotebook: ["data notebook", "datanotebook", "ml notebook", "ml-notebook"],
  imageToSketch: ["image to sketch", "sketch converter", "sketch project"],
};

export const INTENT_RULES: IntentRule[] = [
  {
    id: "greeting",
    phrases: ["hi", "hello", "hey", "yo", "namaste", "hola", "hii", "heya", "sup"],
    keywords: [],
  },
  {
    id: "about",
    phrases: [
      "who are you",
      "tell me about yourself",
      "introduce yourself",
      "your background",
      "who is kedhar",
      "about yourself",
    ],
    keywords: ["about", "yourself", "background", "introduce"],
    blockers: ["work experience", "projects", "skills"],
  },
  {
    id: "experience",
    phrases: [
      "work experience",
      "tell me about your experience",
      "where do you work",
      "current job",
      "career journey",
      "tell me about diligencevault",
      "tell me about upgrad",
      "tell me about outlier",
      "tell me about psyliq",
      "tell me about aiesec",
    ],
    keywords: ["experience", "work", "career", "internship", "job", "company", "about"],
    entityAliases: EXPERIENCE_ENTITIES,
    supportsFollowUp: true,
  },
  {
    id: "project",
    phrases: [
      "what projects have you built",
      "show me your projects",
      "your work samples",
      "what did you build",
      "tell me about quantumpdf",
      "tell me about thesisflow",
      "tell me about data notebook",
      "tell me about image to sketch",
    ],
    keywords: ["project", "projects", "built", "build", "created", "made", "about", "work"],
    entityAliases: PROJECT_ENTITIES,
    supportsFollowUp: true,
  },
  {
    id: "skill",
    phrases: ["what are your skills", "tech stack", "what technologies", "what can you do"],
    keywords: [
      "skill",
      "skills",
      "technology",
      "framework",
      "frameworks",
      "stack",
      "languages",
      "python",
      "react",
    ],
  },
  {
    id: "education",
    phrases: ["where did you study", "your education", "what is your degree"],
    keywords: ["education", "university", "college", "degree", "cgpa", "certification"],
  },
  {
    id: "resume",
    phrases: ["show me your resume", "need your resume", "download resume", "your cv"],
    keywords: ["resume", "cv", "curriculum vitae", "pdf"],
  },
  {
    id: "portfolio",
    phrases: ["your portfolio", "this website", "portfolio website", "site map"],
    keywords: ["portfolio", "website", "site"],
  },
  {
    id: "contact",
    phrases: ["how can i contact you", "reach out", "how to connect"],
    keywords: ["contact", "email", "linkedin", "github", "phone", "hire", "connect"],
  },
  {
    id: "hobby",
    phrases: ["what do you do for fun", "hobbies", "outside work"],
    keywords: ["hobby", "hobbies", "fun", "gaming", "music", "travel", "reading"],
  },
  {
    id: "achievement",
    phrases: ["your achievements", "what are you proud of", "biggest wins"],
    keywords: ["achievement", "award", "success", "highlight", "proud"],
  },
  {
    id: "location",
    phrases: ["where are you from", "where do you live", "your location"],
    keywords: ["location", "hometown", "based", "city"],
  },
  {
    id: "age",
    phrases: ["how old are you", "your age", "when were you born"],
    keywords: ["age", "old", "birthday", "born"],
  },
  {
    id: "future",
    phrases: ["future plans", "what next", "your goals"],
    keywords: ["future", "goal", "plans", "aspiration"],
  },
  {
    id: "advice",
    phrases: ["give me advice", "career tips", "should i learn ai"],
    keywords: ["advice", "tips", "recommend", "suggestion"],
  },
  {
    id: "role",
    phrases: ["what role are you looking for", "what positions are you open to", "ideal role"],
    keywords: ["role", "roles", "looking for", "seeking", "position", "opportunity"],
  },
  {
    id: "job_fit",
    phrases: ["why should we hire you", "why hire you", "convince me"],
    keywords: ["hire", "value", "choose you", "bring to team"],
  },
  {
    id: "favorite_project",
    phrases: ["favorite project", "favourite project", "best project"],
    keywords: ["favorite project", "favourite project", "proudest project"],
  },
  {
    id: "favorite_tech",
    phrases: ["favorite tech stack", "favourite stack", "go to stack"],
    keywords: ["favorite tech", "favourite tech", "stack preference"],
  },
  {
    id: "thanks",
    phrases: ["thanks", "thank you", "appreciate it"],
    keywords: ["thanks", "thank", "appreciate"],
  },
  {
    id: "goodbye",
    phrases: ["bye", "goodbye", "see you", "gotta go"],
    keywords: ["bye", "later", "ttyl"],
  },
  {
    id: "joke",
    phrases: ["tell me a joke", "make me laugh"],
    keywords: ["joke", "funny", "humor"],
  },
  {
    id: "sensitive",
    phrases: [
      "your father name",
      "your mother name",
      "full home address",
      "private phone number",
      "relationship status",
    ],
    keywords: ["father", "mother", "parents", "address", "door number", "girlfriend", "boyfriend"],
  },
  {
    id: "out_of_scope",
    phrases: [
      "what is the weather today",
      "capital of",
      "latest news",
      "stock market today",
      "solve this equation",
    ],
    keywords: [
      "weather",
      "news",
      "president",
      "bitcoin",
      "recipe",
      "medical",
      "legal",
      "chatgpt",
      "openai",
    ],
  },
];

export const CLARIFY_SUGGESTIONS = [
  "Who are you?",
  "What projects have you built?",
  "Tell me about your experience",
  "What are your skills?",
  "Where can I find your resume?",
  "What do you do for fun?",
];
