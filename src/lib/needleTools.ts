// Tool schemas for Needle WASM integration
// These tools map to the chatbot's knowledge base about Kedhar

export const needleTools = [
  {
    name: "get_profile",
    description: "Get Kedhar's basic profile information including name, title, location, and contact details",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_experience",
    description: "Get Kedhar's work experience details. Optionally filter by company.",
    parameters: {
      type: "object",
      properties: {
        company: {
          type: "string",
          description: "Company name to filter by (e.g., 'DiligenceVault', 'upGrad', 'Outlier.AI', 'Psyliq', 'AIESEC')",
        },
      },
      required: [],
    },
  },
  {
    name: "get_projects",
    description: "Get Kedhar's project details. Optionally filter by project name.",
    parameters: {
      type: "object",
      properties: {
        project: {
          type: "string",
          description: "Project name to filter by (e.g., 'ThesisFlow', 'QuantumPDF', 'Data Notebook', 'Image to Sketch', 'ChefSpeak', 'ML-Notebook')",
        },
      },
      required: [],
    },
  },
  {
    name: "get_skills",
    description: "Get Kedhar's technical skills organized by category",
    parameters: {
      type: "object",
      properties: {
        category: {
          type: "string",
          description: "Skill category to filter by (e.g., 'languages', 'aiMl', 'web', 'databases', 'visualization', 'cloud', 'aiTools', 'specializations')",
        },
      },
      required: [],
    },
  },
  {
    name: "get_education",
    description: "Get Kedhar's education details including degree, university, and certifications",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_contact",
    description: "Get Kedhar's contact information",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_hobbies",
    description: "Get Kedhar's hobbies and interests",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_achievements",
    description: "Get Kedhar's key achievements and metrics",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_fun_facts",
    description: "Get fun facts about Kedhar",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_advice",
    description: "Get career advice from Kedhar",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_role_preferences",
    description: "Get Kedhar's target roles and job preferences",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_job_fit",
    description: "Get why Kedhar would be a good hire",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_favorite_project",
    description: "Get Kedhar's favorite project and why",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_favorite_tech",
    description: "Get Kedhar's favorite tech stack",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_location",
    description: "Get Kedhar's hometown and current location",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_age",
    description: "Get Kedhar's age range",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_future_plans",
    description: "Get Kedhar's future career plans",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
] as const;

export const needleToolsJson = JSON.stringify(needleTools);

export type NeedleToolName = (typeof needleTools)[number]["name"];

// Tool implementations that return data from the chatbot knowledge base
export const toolImplementations: Record<NeedleToolName, (args: Record<string, unknown>) => Promise<unknown>> = {
  get_profile: async () => {
    const { kedharProfile } = await import("./chatbotKnowledge");
    return {
      name: kedharProfile.name,
      nicknames: kedharProfile.nicknames,
      title: kedharProfile.title,
      location: kedharProfile.location,
      contact: kedharProfile.contact,
      personality: kedharProfile.personality,
    };
  },
  get_experience: async (args) => {
    const { kedharProfile } = await import("./chatbotKnowledge");
    const company = args.company as string | undefined;
    
    if (company) {
      const exp = kedharProfile.experience.find(
        (e) => e.company.toLowerCase().includes(company.toLowerCase()) ||
               company.toLowerCase().includes(e.company.toLowerCase())
      );
      if (exp) return exp;
      return { error: `No experience found for company: ${company}` };
    }
    
    return kedharProfile.experience;
  },
  get_projects: async (args) => {
    const { kedharProfile } = await import("./chatbotKnowledge");
    const project = args.project as string | undefined;
    
    if (project) {
      const proj = kedharProfile.projects.find(
        (p) => p.name.toLowerCase().includes(project.toLowerCase()) ||
               project.toLowerCase().includes(p.name.toLowerCase())
      );
      if (proj) return proj;
      return { error: `No project found for: ${project}` };
    }
    
    return kedharProfile.projects;
  },
  get_skills: async (args) => {
    const { kedharProfile } = await import("./chatbotKnowledge");
    const category = args.category as string | undefined;
    
    if (category && category in kedharProfile.skills) {
      return { [category]: (kedharProfile.skills as Record<string, unknown>)[category] };
    }
    
    return kedharProfile.skills;
  },
  get_education: async () => {
    const { kedharProfile } = await import("./chatbotKnowledge");
    return {
      education: kedharProfile.education,
      certifications: kedharProfile.certifications,
    };
  },
  get_contact: async () => {
    const { kedharProfile } = await import("./chatbotKnowledge");
    return kedharProfile.contact;
  },
  get_hobbies: async () => {
    const { kedharProfile } = await import("./chatbotKnowledge");
    return kedharProfile.hobbies;
  },
  get_achievements: async () => {
    const { kedharProfile } = await import("./chatbotKnowledge");
    return kedharProfile.achievements;
  },
  get_fun_facts: async () => {
    const { kedharProfile } = await import("./chatbotKnowledge");
    return kedharProfile.funFacts;
  },
  get_advice: async () => {
    const { kedharProfile } = await import("./chatbotKnowledge");
    // Return advice from the chatbot responses
    return {
      advice: [
        "Build something that solves real pain, deploy it, and learn from production feedback.",
        "Master fundamentals first, then ship. Pretty demos are easy. Reliable systems under real load are hard.",
        "Pick one real problem you personally find annoying, solve it end-to-end, deploy it, and write about the tradeoffs.",
      ],
    };
  },
  get_role_preferences: async () => {
    return {
      targetRoles: ["AI Engineer", "Full-Stack AI Developer", "Product Engineer"],
      preferences: "High-ownership environments where shipping matters more than meetings. Want to build the pipeline, design the API, and polish the UI.",
    };
  },
  get_job_fit: async () => {
    return {
      reasons: [
        "Ships real systems across the full stack - model training to pixel-perfect UI in one person",
        "Closes the gap between 'AI prototype' and 'product users love'",
        "Already shipped production AI at scale (60% manual work reduction at DiligenceVault)",
      ],
    };
  },
  get_favorite_project: async () => {
    return {
      project: "QuantumPDF",
      reason: "Solves a daily pain point (talking to PDFs instead of Ctrl+F-ing through them), forced serious work on retrieval quality, chunking strategy, and latency tradeoffs. 82% precision did not come easy.",
    };
  },
  get_favorite_tech: async () => {
    return {
      stack: "Python + TypeScript",
      details: "Python for AI backend (FastAPI, PyTorch, LangChain). TypeScript + React for the product layer. Tailwind for styling. Vector DBs for retrieval.",
    };
  },
  get_location: async () => {
    const { kedharProfile } = await import("./chatbotKnowledge");
    return kedharProfile.location;
  },
  get_age: async () => {
    return {
      age: "Early twenties",
      note: "Young enough to move fast, experienced enough to know when not to. Shipped more real products during university than most engineers do in their first two years of employment.",
    };
  },
  get_future_plans: async () => {
    return {
      nearTerm: "Keep building AI products with clear user value at DiligenceVault",
      mediumTerm: "Own harder product problems end-to-end",
      longTerm: "Build something that outlasts the hype cycle",
    };
  },
};