import { responseGenerator } from "./chatbotResponses";

// Intelligent query matching with multiple patterns
export class QueryMatcher {
  private normalizeQuery(query: string): string {
    return query.toLowerCase().trim();
  }

  private matchesAny(query: string, patterns: string[]): boolean {
    const normalized = this.normalizeQuery(query);
    return patterns.some(pattern => {
      // Use word boundary matching for better accuracy
      const regex = new RegExp(`\\b${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      return regex.test(normalized) || normalized.includes(pattern);
    });
  }

  private matchesExact(query: string, patterns: string[]): boolean {
    const normalized = this.normalizeQuery(query);
    return patterns.some(pattern => {
      const regex = new RegExp(`\\b${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      return regex.test(normalized);
    });
  }

  private getDetailedExperience(company: string): string {
    const { experienceJourney } = require("./chatbotKnowledge").kedharProfile;
    const exp = experienceJourney[company];
    
    if (!exp) return responseGenerator.getExperience();

    return `**${exp.role}** at ${company.replace(/([A-Z])/g, ' $1').trim()}\n\n` +
      `**My Journey:**\n${exp.journey}\n\n` +
      `**What I Learned:**\n${exp.whatILearned.map((item: string) => `• ${item}`).join('\n')}\n\n` +
      `**How I Felt:**\n${exp.howIFelt}\n\n` +
      `**Impact:**\n${exp.impact} 🎯`;
  }

  private getDetailedProject(projectKey: string): string {
    const { projectJourney } = require("./chatbotKnowledge").kedharProfile;
    const project = projectJourney[projectKey];
    
    if (!project) return responseGenerator.getProjects();

    return `**${project.name}**\n\n` +
      `**My Journey:**\n${project.journey}\n\n` +
      `**What I Learned:**\n${project.whatILearned.map((item: string) => `• ${item}`).join('\n')}\n\n` +
      `**How I Felt:**\n${project.howIFelt}\n\n` +
      `**Impact:**\n${project.impact}\n\n` +
      `**Technical Highlights:**\n${project.technicalHighlights} 🚀`;
  }

  getResponse(query: string): string {
    const normalized = this.normalizeQuery(query);

    // Experience/Work (check BEFORE about to avoid conflicts)
    // More specific patterns for experience
    if (this.matchesAny(normalized, [
      "experience", "work history", "work experience", "job", "career", "worked", "working",
      "employment", "intern", "internship", "company", "companies",
      "diligencevault", "upgrad", "outlier", "psyliq", "aiesec",
      "current job", "current work", "where do you work", "where u work",
      "what's your job", "your job", "tell me about your experience",
      "about your experience", "your experience", "work"
    ]) && !this.matchesExact(normalized, ["your work", "my work", "show me your work"])) {
      // Exclude if it's asking about projects ("your work" often means projects)
      if (!normalized.includes("built") && !normalized.includes("project")) {
        return responseGenerator.getExperience();
      }
    }

    // Projects (check early to catch "your work" meaning projects)
    if (this.matchesAny(normalized, [
      "project", "projects", "built", "build", "created", "made",
      "thesisflow", "quantumpdf", "portfolio", "work samples",
      "what have you built", "github projects", "your projects",
      "show me projects", "what did you build", "show me your work",
      "your work", "my work"
    ]) && (normalized.includes("project") || normalized.includes("built") || 
           normalized.includes("build") || normalized.includes("created") ||
           normalized.includes("made"))) {
      return responseGenerator.getProjects();
    }

    // Greetings (simple, unambiguous)
    if (this.matchesExact(normalized, [
      "hi", "hello", "hey", "yo", "sup", "greetings", "namaste", "hola", "hii", "heya"
    ]) && normalized.split(" ").length <= 2) {
      return responseGenerator.getGreeting();
    }

    // About/Who are you (more specific patterns)
    if (this.matchesAny(normalized, [
      "who are you", "who r u", "tell me about yourself", 
      "introduce yourself", "who's this", "who is kedhar", "who is this",
      "about yourself", "your background"
    ]) && !normalized.includes("experience") && !normalized.includes("work")) {
      return responseGenerator.getAbout();
    }

    // What do you do - could be about OR experience, use context
    if (this.matchesAny(normalized, ["what do you do", "what u do"])) {
      // If they mention work/job context, give experience
      if (normalized.includes("work") || normalized.includes("job")) {
        return responseGenerator.getExperience();
      }
      return responseGenerator.getAbout();
    }

    // Detailed experience journey questions
    if (this.matchesAny(normalized, [
      "tell me about diligencevault", "diligencevault experience", "diligencevault journey",
      "what did you learn at diligencevault", "how was diligencevault"
    ])) {
      return this.getDetailedExperience("diligenceVault");
    }

    if (this.matchesAny(normalized, [
      "tell me about upgrad", "upgrad experience", "upgrad journey",
      "what did you learn at upgrad", "how was upgrad"
    ])) {
      return this.getDetailedExperience("upGrad");
    }

    if (this.matchesAny(normalized, [
      "tell me about outlier", "outlier experience", "outlier journey",
      "what did you learn at outlier", "how was outlier"
    ])) {
      return this.getDetailedExperience("outlierAI");
    }

    if (this.matchesAny(normalized, [
      "tell me about psyliq", "psyliq experience", "psyliq journey",
      "what did you learn at psyliq", "how was psyliq"
    ])) {
      return this.getDetailedExperience("psyliq");
    }

    if (this.matchesAny(normalized, [
      "tell me about aiesec", "aiesec experience", "aiesec journey",
      "what did you learn at aiesec", "how was aiesec"
    ])) {
      return this.getDetailedExperience("aiesec");
    }

    // Detailed project journey questions
    if (this.matchesAny(normalized, [
      "tell me about thesisflow", "thesisflow journey", "how did you build thesisflow",
      "what did you learn from thesisflow", "thesisflow experience"
    ])) {
      return this.getDetailedProject("thesisFlow");
    }

    if (this.matchesAny(normalized, [
      "tell me about quantumpdf", "quantumpdf journey", "how did you build quantumpdf",
      "what did you learn from quantumpdf", "quantumpdf experience"
    ])) {
      return this.getDetailedProject("quantumPDF");
    }

    if (this.matchesAny(normalized, [
      "tell me about data notebook", "data notebook journey", "how did you build data notebook",
      "what did you learn from data notebook"
    ])) {
      return this.getDetailedProject("dataNotebook");
    }

    if (this.matchesAny(normalized, [
      "tell me about image to sketch", "sketch project", "image conversion project",
      "what did you learn from image to sketch"
    ])) {
      return this.getDetailedProject("imageToSketch");
    }

    // Fallback for work/experience if not caught above
    if (this.matchesAny(normalized, ["work", "job", "career"])) {
      return responseGenerator.getExperience();
    }

    // Skills/Technologies
    if (this.matchesAny(normalized, [
      "skill", "skills", "technology", "technologies", "tech stack",
      "programming", "languages", "framework", "frameworks", "tools",
      "python", "javascript", "react", "ai", "ml", "machine learning",
      "expertise", "proficient", "good at", "your skills", "tech",
      "what technologies", "what languages", "what frameworks"
    ])) {
      return responseGenerator.getSkills();
    }
    
    // "What can you do" - context-dependent
    if (this.matchesAny(normalized, ["what can you do"])) {
      // If asking about technical abilities, show skills
      if (normalized.includes("tech") || normalized.includes("code") || normalized.includes("program")) {
        return responseGenerator.getSkills();
      }
      // Otherwise show about
      return responseGenerator.getAbout();
    }

    // Education
    if (this.matchesAny(normalized, [
      "education", "study", "studied", "university", "college", "degree",
      "graduation", "graduated", "school", "academic", "cgpa", "gpa",
      "certification", "certifications", "certified", "course", "courses",
      "where did you study", "your education", "lpu", "lovely professional"
    ])) {
      return responseGenerator.getEducation();
    }

    // Resume / CV
    if (this.matchesAny(normalized, [
      "resume", "cv", "curriculum vitae", "your cv", "your resume",
      "download resume", "download your resume", "pdf resume", "cv link"
    ])) {
      return responseGenerator.getResume();
    }

    // Portfolio / website
    if (this.matchesAny(normalized, [
      "portfolio", "your portfolio", "this portfolio", "website", "web site",
      "your site", "this site", "portfolio site", "portfolio website"
    ])) {
      return responseGenerator.getPortfolio();
    }

    // Favorite project / Most proud of
    if (this.matchesAny(normalized, [
      "favorite project", "favourite project", "best project", "most proud",
      "proudest", "which project", "top project", "favorite work"
    ])) {
      return responseGenerator.getFavoriteProject();
    }

    // Favorite tech stack / preferences
    if (this.matchesAny(normalized, [
      "favorite tech", "favourite tech", "favorite stack", "tech stack",
      "preferred stack", "what stack", "technologies you use", "favorite language",
      "best tech", "go-to stack"
    ])) {
      return responseGenerator.getFavoriteTech();
    }

    // Why hire / Job fit
    if (this.matchesAny(normalized, [
      "why hire", "why should we hire", "why hire you", "what makes you",
      "why you", "your value", "what do you bring", "why choose you",
      "convince me", "sell yourself"
    ])) {
      return responseGenerator.getJobFit();
    }

    // What roles looking for
    if (this.matchesAny(normalized, [
      "what role", "what roles", "looking for", "seeking", "job search",
      "what position", "what kind of job", "what type of role",
      "ideal role", "dream job", "next role"
    ])) {
      return responseGenerator.getRolesLookingFor();
    }

    // Contact
    if (this.matchesAny(normalized, [
      "contact", "reach", "email", "phone", "call", "message",
      "linkedin", "github", "social", "connect", "get in touch",
      "how to contact", "how can i reach", "hire", "hiring",
      "available", "availability", "reach you", "contact you"
    ])) {
      return responseGenerator.getContact();
    }

    // Hobbies/Interests
    if (this.matchesAny(normalized, [
      "hobby", "hobbies", "interest", "interests", "fun", "free time",
      "do for fun", "outside work", "personal", "like to do",
      "gaming", "reading", "music", "travel", "traveling", "hobbies"
    ])) {
      return responseGenerator.getHobbies();
    }

    // Achievements
    if (this.matchesAny(normalized, [
      "achievement", "achievements", "accomplish", "accomplished",
      "award", "awards", "recognition", "success", "won", "winner",
      "proud of", "best work", "highlight", "highlights"
    ])) {
      return responseGenerator.getAchievements();
    }

    // Fun facts
    if (this.matchesAny(normalized, [
      "fun fact", "fun facts", "interesting", "random", "tell me something",
      "surprise me", "cool fact", "did you know", "trivia", "something interesting"
    ])) {
      return responseGenerator.getFunFacts();
    }

    // Jokes
    if (this.matchesAny(normalized, [
      "joke", "funny", "make me laugh", "humor", "comedy", "tell me a joke"
    ])) {
      return responseGenerator.getJoke();
    }

    // Location (more specific patterns)
    if (this.matchesAny(normalized, [
      "where are you from", "where r u from", "location", "live", "based", 
      "city", "place", "where are you", "where do you live", "hometown"
    ]) && !normalized.includes("work") && !normalized.includes("study")) {
      return `I'm originally from **Madanapalli, Andhra Pradesh, India** 🏠 but currently studying in **Punjab, India** 🎓. That's like a 2000km journey! I'm basically a nomad at this point 😄`;
    }

    // Age
    if (this.matchesAny(normalized, [
      "age", "old", "young", "born", "birthday", "how old"
    ])) {
      return `I graduated in July 2025 from a 4-year program starting in 2021, so you do the math! 😏 Let's just say I'm young, ambitious, and already have more experience than some 30-year-olds! 🚀`;
    }

    // Salary/Money (cheeky response)
    if (this.matchesAny(normalized, [
      "salary", "pay", "money", "earn", "income", "wage", "compensation"
    ])) {
      return `Nice try! 😏 That's between me and my bank account. But I can tell you I'm open to opportunities! Want my contact info instead? 📧`;
    }

    // Relationship status (funny response)
    if (this.matchesAny(normalized, [
      "girlfriend", "boyfriend", "relationship", "single", "married", "dating"
    ])) {
      return `My relationship status? It's complicated... with my code 😂 But seriously, I'm here to talk about my professional life! Ask me about my projects or skills instead! 💼`;
    }

    // Favorite things
    if (this.matchesAny(normalized, [
      "favorite", "favourite", "like", "love", "prefer", "best"
    ])) {
      return `I love:\n\n💻 Building AI systems that actually work\n🎨 Clean, minimalist design\n🎮 Strategic gaming\n📚 Sci-fi and tech books\n🎵 Exploring new music genres\n☕ Coffee (probably too much)\n\nI'm passionate about the intersection of AI and UX - making intelligent systems that people actually want to use! 🚀`;
    }

    // Why AI/ML
    if (this.matchesAny(normalized, [
      "why ai", "why ml", "why machine learning", "why artificial intelligence",
      "why choose", "why did you", "motivation", "inspired"
    ])) {
      return `Why AI/ML? Because I believe in building intelligent systems that solve real problems! 🤖\n\nI'm fascinated by:\n- The potential of AI to transform industries\n- Making complex technology accessible\n- The intersection of AI and user experience\n- Solving real-world problems with data\n\nPlus, teaching computers to be smart is way cooler than just writing regular code 😎`;
    }

    // Strengths
    if (this.matchesAny(normalized, [
      "strength", "strengths", "good at", "strong point", "advantage"
    ])) {
      return `My superpowers:\n\n🎯 **Technical Excellence:** Full-stack AI/ML development\n🎨 **Design Sense:** I make things work AND look good\n⚡ **Fast Learner:** I pick up new tech like it's nothing\n🤝 **Team Player:** Leadership experience from AIESEC\n💡 **Problem Solver:** I turn complex challenges into elegant solutions\n📊 **Data-Driven:** I make decisions based on metrics, not feelings\n\nBasically, I'm the complete package! 📦`;
    }

    // Weaknesses (sarcastic)
    if (this.matchesAny(normalized, [
      "weakness", "weaknesses", "bad at", "weak point", "disadvantage"
    ])) {
      return `Weaknesses? Let me think... 🤔\n\n- Sometimes I code for 12 hours straight (is that a weakness or dedication?)\n- I might have too many side projects\n- My GitHub commits might exceed my gym visits\n- I occasionally forget to eat when debugging\n\nBut hey, nobody's perfect! 😅 Want to know about my strengths instead?`;
    }

    // Future plans
    if (this.matchesAny(normalized, [
      "future", "plan", "plans", "goal", "goals", "next", "aspiration",
      "dream", "vision", "want to", "going to"
    ])) {
      return `My future plans:\n\n🚀 **Short-term:**\n- Continue building innovative AI solutions\n- Contribute to open-source projects\n- Explore new AI technologies\n\n🎯 **Long-term:**\n- Build AI systems that make a real impact\n- Work on cutting-edge ML research\n- Maybe start my own AI company someday?\n\n💼 **Currently:**\n- Open to new opportunities\n- Looking for roles in AI/ML engineering\n- Ready to make a difference!\n\nI'm ambitious and ready to take on the world! 🌍`;
    }

    // Advice
    if (this.matchesAny(normalized, [
      "advice", "tip", "tips", "suggestion", "recommend", "should i"
    ])) {
      return `Want advice? Here's what I'd say:\n\n💡 **For aspiring AI engineers:**\n- Build projects, not just tutorials\n- Learn by doing, not just watching\n- Deploy your work (GitHub stars don't count if it doesn't work)\n- Stay curious and keep learning\n\n🎯 **For career:**\n- Focus on solving real problems\n- Build a strong portfolio\n- Network and collaborate\n- Don't be afraid to fail\n\n🚀 **General wisdom:**\n- Code is poetry (make it beautiful)\n- AI is a tool, not magic\n- Always be learning\n- Coffee helps ☕\n\nNeed more specific advice? Ask away! 😊`;
    }

    // Thank you
    if (this.matchesAny(normalized, [
      "thank", "thanks", "appreciate", "grateful"
    ])) {
      return `You're welcome! 😊 Glad I could help! Want to know anything else? Or ready to reach out? 📧`;
    }

    // Goodbye
    if (this.matchesAny(normalized, [
      "bye", "goodbye", "see you", "later", "gtg", "gotta go"
    ])) {
      return `See you later! 👋 Feel free to come back if you have more questions. Or better yet, reach out to me directly! 📧\n\nEmail: kedhareswer.12110626@gmail.com\nLinkedIn: linkedin.com/in/kedhareswernaidu`;
    }

    // Confused/unclear
    if (normalized.length < 3 || normalized.split(" ").length < 2) {
      return responseGenerator.getConfused();
    }

    // Default response
    return responseGenerator.getDefault();
  }
}

export const queryMatcher = new QueryMatcher();
