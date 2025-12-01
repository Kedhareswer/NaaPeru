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

    // Personal details - full name
    if (this.matchesAny(normalized, [
      "full name", "your full name", "what is your name", "what's your name",
      "whats your name", "real name", "complete name", "name please"
    ])) {
      return `I'm **Marlakunta Kedhareswer Naidu** but everyone just calls me **Kedhar**. Shorter, easier, and much kinder to forms 😄`;
    }

    // Personal details - parents' names (keep private, witty reply)
    if (this.matchesAny(normalized, [
      "father name", "fathers name", "father's name", "dad name", "dad's name",
      "mother name", "mothers name", "mother's name", "mom name", "mom's name",
      "parents name", "parents' names"
    ])) {
      return `If I start dropping my parents' full details on a public portfolio site, they'll personally unplug my Wi0Fi 😅\n\nLet's keep this chat focused on my **work, projects, and skills** instead.`;
    }

    // Personal details - address / current location privacy
    if (this.matchesAny(normalized, [
      "address", "current address", "home address", "house address", "door number",
      "street", "where do you stay", "where is your house", "exact location",
      "full address", "residential address"
    ])) {
      return `Nice try stalking skills 👀 but I'm not dropping my full address on a public website.\n\nYou can think of me as **internet-based with strong Andhra roots**. If you want to talk work, my contact info is on the site though!`;
    }

    // Personal details - phone number asked directly (keep playful + redirect)
    if (this.matchesAny(normalized, [
      "phone number", "your phone", "whats your phone", "what is your phone",
      "mobile number", "whats your mobile", "contact number", "call you"
    ])) {
      return `Dropping raw phone numbers in a chat is how you speedrun spam calls 💀\n\nIf you genuinely want to reach out, use the **Contact** section on this site it has all the professional ways to get in touch.`;
    }

    // Current status / what are you doing now
    if (this.matchesAny(normalized, [
      "what are you doing now", "what r you doing now", "what r u doing now",
      "what are you upto", "what are you up to", "what r u upto", "what r u up to",
      "what do you do now", "current status", "what are you doing these days"
    ])) {
      return `Right now I'm an **AI Engineer** focused on building real-world AI products.
\nDay to day I'm:
- Working on document-intelligence systems at **DiligenceVault**
- Experimenting with multi-agent and RAG setups
- Polishing projects like ThesisFlow-AI and this portfolio itself
\nSo short version: shipping AI things, breaking them, then making them better 🚀`;
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

    // Favourite game / book / music / place to travel (specific or combined)
    if (this.matchesAny(normalized, [
      "favorite game", "favourite game", "game you like", "game do you like",
      "favorite book", "favourite book", "book you like", "book do you like",
      "favorite music", "favourite music", "music you like", "music do you like",
      "favorite place to travel", "favourite place to travel", "favorite travel place",
      "favourite travel place", "place to travel", "place you like to travel"
    ]) || (
      (normalized.includes("favorite") || normalized.includes("favourite")) &&
      (normalized.includes("game") || normalized.includes("book") || normalized.includes("music") || normalized.includes("travel"))
    )) {
      const wantsGame = normalized.includes("game");
      const wantsBook = normalized.includes("book");
      const wantsMusic = normalized.includes("music");
      const wantsTravel = normalized.includes("travel") || normalized.includes("place to travel");

      const parts: string[] = [];

      // Light randomization so answers vary between calls
      const variant = Math.floor(Math.random() * 2);

      if (wantsGame || (!wantsBook && !wantsMusic && !wantsTravel)) {
        parts.push(
          variant === 0
            ? "🎮 **Favourite game:** Strategy / tactical games where I can out-think opponents, not just spam buttons."
            : "🎮 **Favourite games:** Anything that makes me think – strategy, tactics, and games where one clever move changes everything."
        );
      }
      if (wantsBook || (!wantsGame && !wantsMusic && !wantsTravel)) {
        parts.push(
          variant === 0
            ? "📚 **Favourite kind of books:** Sci‑fi and tech/non‑fiction – I like stories that bend reality but still teach me something."
            : "📚 **Books I gravitate to:** Sci‑fi, tech, and creator/entrepreneur books – anything that mixes imagination with systems thinking."
        );
      }
      if (wantsMusic || (!wantsGame && !wantsBook && !wantsTravel)) {
        parts.push(
          variant === 0
            ? "🎵 **Favourite music:** A mix of lo‑fi, electronic and chill beats – perfect for deep‑work coding sessions."
            : "🎵 **Music vibe:** No single genre – I rotate between lo‑fi, electronic, Indian indie, and whatever makes debugging less painful."
        );
      }
      if (wantsTravel || (!wantsGame && !wantsBook && !wantsMusic)) {
        parts.push(
          variant === 0
            ? "✈️ **Favourite kind of place to travel:** Quiet hill-ish places with good views and better coffee."
            : "✈️ **Travel favourites:** Scenic, slightly cold places where I can walk a lot, think clearly, and find at least one great café."
        );
      }

      return parts.join("\n\n") + "\n\nAsk about any one of them directly if you want more details 👀";
    }

    // Hobbies/Interests (exclude explicit favourite + fun-fact questions)
    if (this.matchesAny(normalized, [
      "hobby", "hobbies", "interest", "interests", "fun", "free time",
      "do for fun", "outside work", "personal", "like to do",
      "gaming", "reading", "music", "travel", "traveling", "hobbies"
    ]) && !normalized.includes("favorite") && !normalized.includes("favourite") && !normalized.includes("fun fact")) {
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
      return `I'm originally from **Madanapalli, Andhra Pradesh, India** 🏠 and I graduated from university in July 2025. These days you can think of me as an **AI engineer based in India**, moving wherever interesting problems are 😄`;
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

    // Out of scope - general knowledge, unrelated topics, or things clearly not about Kedhar
    if (this.matchesAny(normalized, [
      // General knowledge / trivia
      "capital of", "president of", "prime minister", "who invented", "what is the",
      "how does", "explain", "define", "meaning of", "history of", "when was",
      "how many", "how much", "calculate", "solve", "equation",
      // Current events / news
      "news", "latest", "today", "yesterday", "election", "politics", "war",
      "stock", "market", "crypto", "bitcoin", "weather",
      // Other people / celebrities
      "elon musk", "mark zuckerberg", "jeff bezos", "bill gates", "sam altman",
      "taylor swift", "celebrity", "famous", "actor", "actress", "singer",
      // Random requests
      "write me", "write a", "generate", "create a story", "poem", "essay",
      "code for", "help me with", "can you make", "build me",
      // Philosophy / existential
      "meaning of life", "god", "religion", "believe in", "afterlife", "soul",
      // Medical / legal advice
      "doctor", "medical", "symptom", "disease", "lawyer", "legal", "sue",
      // Recipes / how-to unrelated
      "recipe", "cook", "how to make food", "ingredients",
      // Comparisons with others
      "better than", "vs", "versus", "compared to",
      // Meta questions about AI in general
      "are you sentient", "are you conscious", "do you have feelings", "are you real",
      "chatgpt", "openai", "anthropic", "gemini", "llama", "gpt-4", "gpt-5"
    ])) {
      return responseGenerator.getOutOfScope();
    }

    // Default response
    return responseGenerator.getDefault();
  }
}

export const queryMatcher = new QueryMatcher();
