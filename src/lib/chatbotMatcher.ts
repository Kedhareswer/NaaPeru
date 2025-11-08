import { responseGenerator } from "./chatbotResponses";

// Intelligent query matching with multiple patterns
export class QueryMatcher {
    private normalizeQuery(query: string): string {
        return query.toLowerCase().trim();
    }

    private matchesAny(query: string, patterns: string[]): boolean {
        const normalized = this.normalizeQuery(query);
        return patterns.some(pattern => normalized.includes(pattern));
    }

    getResponse(query: string): string {
        const normalized = this.normalizeQuery(query);

        // Greetings
        if (this.matchesAny(normalized, [
            "hi", "hello", "hey", "yo", "sup", "greetings", "namaste", "hola"
        ])) {
            return responseGenerator.getGreeting();
        }

        // About/Who is Kedhar
        if (this.matchesAny(normalized, [
            "who are you", "who is kedhar", "tell me about", "about kedhar",
            "introduce", "who's kedhar", "what do you do", "what does kedhar do",
            "about yourself", "tell me about yourself", "who is this"
        ])) {
            return responseGenerator.getAbout();
        }

        // Experience/Work
        if (this.matchesAny(normalized, [
            "experience", "work", "job", "career", "worked", "working",
            "employment", "intern", "internship", "company", "companies",
            "diligencevault", "upgrad", "outlier", "psyliq", "aiesec",
            "current job", "current work", "where do you work", "where does he work"
        ])) {
            return responseGenerator.getExperience();
        }

        // Projects
        if (this.matchesAny(normalized, [
            "project", "projects", "built", "build", "created", "made",
            "thesisflow", "quantumpdf", "portfolio", "work samples",
            "what have you built", "what has he built", "github projects",
            "show me projects", "your work"
        ])) {
            return responseGenerator.getProjects();
        }

        // Skills/Technologies
        if (this.matchesAny(normalized, [
            "skill", "skills", "technology", "technologies", "tech stack",
            "programming", "languages", "framework", "frameworks", "tools",
            "python", "javascript", "react", "ai", "ml", "machine learning",
            "what can you do", "what can he do", "expertise", "proficient",
            "know", "familiar with", "good at"
        ])) {
            return responseGenerator.getSkills();
        }

        // Education
        if (this.matchesAny(normalized, [
            "education", "study", "studied", "university", "college", "degree",
            "graduation", "graduated", "school", "academic", "cgpa", "gpa",
            "certification", "certifications", "certified", "course", "courses",
            "where did you study", "where did he study", "lpu", "lovely professional"
        ])) {
            return responseGenerator.getEducation();
        }

        // Contact
        if (this.matchesAny(normalized, [
            "contact", "reach", "email", "phone", "call", "message",
            "linkedin", "github", "social", "connect", "get in touch",
            "how to contact", "how can i reach", "hire", "hiring",
            "available", "availability"
        ])) {
            return responseGenerator.getContact();
        }

        // Hobbies/Interests
        if (this.matchesAny(normalized, [
            "hobby", "hobbies", "interest", "interests", "fun", "free time",
            "do for fun", "outside work", "personal", "like to do",
            "gaming", "reading", "music", "travel", "traveling"
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
            "surprise me", "cool fact", "did you know", "trivia"
        ])) {
            return responseGenerator.getFunFacts();
        }

        // Jokes
        if (this.matchesAny(normalized, [
            "joke", "funny", "make me laugh", "humor", "comedy"
        ])) {
            return responseGenerator.getJoke();
        }

        // Location
        if (this.matchesAny(normalized, [
            "where", "location", "from", "live", "based", "city", "place"
        ])) {
            return `Kedhar is originally from **Madanapalli, Andhra Pradesh, India** 🏠 but currently studying in **Punjab, India** 🎓. That's like a 2000km journey! He's basically a nomad at this point 😄`;
        }

        // Age
        if (this.matchesAny(normalized, [
            "age", "old", "young", "born", "birthday"
        ])) {
            return `Kedhar graduated in July 2025 from a 4-year program starting in 2021, so you do the math! 😏 Let's just say he's young, ambitious, and already has more experience than some 30-year-olds! 🚀`;
        }

        // Salary/Money (cheeky response)
        if (this.matchesAny(normalized, [
            "salary", "pay", "money", "earn", "income", "wage", "compensation"
        ])) {
            return `Nice try! 😏 That's between Kedhar and his bank account. But I can tell you he's open to opportunities! Want his contact info instead? 📧`;
        }

        // Relationship status (funny response)
        if (this.matchesAny(normalized, [
            "girlfriend", "boyfriend", "relationship", "single", "married", "dating"
        ])) {
            return `His relationship status? It's complicated... with his code 😂 But seriously, I'm here to talk about his professional life! Ask me about his projects or skills instead! 💼`;
        }

        // Favorite things
        if (this.matchesAny(normalized, [
            "favorite", "favourite", "like", "love", "prefer", "best"
        ])) {
            return `Kedhar loves:\n\n💻 Building AI systems that actually work\n🎨 Clean, minimalist design\n🎮 Strategic gaming\n📚 Sci-fi and tech books\n🎵 Exploring new music genres\n☕ Coffee (probably too much)\n\nHe's passionate about the intersection of AI and UX - making intelligent systems that people actually want to use! 🚀`;
        }

        // Why AI/ML
        if (this.matchesAny(normalized, [
            "why ai", "why ml", "why machine learning", "why artificial intelligence",
            "why choose", "why did you", "motivation", "inspired"
        ])) {
            return `Why AI/ML? Because Kedhar believes in building intelligent systems that solve real problems! 🤖\n\nHe's fascinated by:\n- The potential of AI to transform industries\n- Making complex technology accessible\n- The intersection of AI and user experience\n- Solving real-world problems with data\n\nPlus, teaching computers to be smart is way cooler than just writing regular code 😎`;
        }

        // Strengths
        if (this.matchesAny(normalized, [
            "strength", "strengths", "good at", "strong point", "advantage"
        ])) {
            return `Kedhar's superpowers:\n\n🎯 **Technical Excellence:** Full-stack AI/ML development\n🎨 **Design Sense:** Makes things work AND look good\n⚡ **Fast Learner:** Picks up new tech like it's nothing\n🤝 **Team Player:** Leadership experience from AIESEC\n💡 **Problem Solver:** Turns complex challenges into elegant solutions\n📊 **Data-Driven:** Makes decisions based on metrics, not feelings\n\nBasically, he's the complete package! 📦`;
        }

        // Weaknesses (sarcastic)
        if (this.matchesAny(normalized, [
            "weakness", "weaknesses", "bad at", "weak point", "disadvantage"
        ])) {
            return `Weaknesses? Let me think... 🤔\n\n- Sometimes codes for 12 hours straight (is that a weakness or dedication?)\n- Might have too many side projects\n- His GitHub commits might exceed his gym visits\n- Occasionally forgets to eat when debugging\n\nBut hey, nobody's perfect! 😅 Want to know about his strengths instead?`;
        }

        // Future plans
        if (this.matchesAny(normalized, [
            "future", "plan", "plans", "goal", "goals", "next", "aspiration",
            "dream", "vision", "want to", "going to"
        ])) {
            return `Kedhar's future plans:\n\n🚀 **Short-term:**\n- Continue building innovative AI solutions\n- Contribute to open-source projects\n- Explore new AI technologies\n\n🎯 **Long-term:**\n- Build AI systems that make a real impact\n- Work on cutting-edge ML research\n- Maybe start his own AI company someday?\n\n💼 **Currently:**\n- Open to new opportunities\n- Looking for roles in AI/ML engineering\n- Ready to make a difference!\n\nHe's ambitious and ready to take on the world! 🌍`;
        }

        // Advice
        if (this.matchesAny(normalized, [
            "advice", "tip", "tips", "suggestion", "recommend", "should i"
        ])) {
            return `Want advice from Kedhar? Here's what he'd probably say:\n\n💡 **For aspiring AI engineers:**\n- Build projects, not just tutorials\n- Learn by doing, not just watching\n- Deploy your work (GitHub stars don't count if it doesn't work)\n- Stay curious and keep learning\n\n🎯 **For career:**\n- Focus on solving real problems\n- Build a strong portfolio\n- Network and collaborate\n- Don't be afraid to fail\n\n🚀 **General wisdom:**\n- Code is poetry (make it beautiful)\n- AI is a tool, not magic\n- Always be learning\n- Coffee helps ☕\n\nNeed more specific advice? Ask away! 😊`;
        }

        // Thank you
        if (this.matchesAny(normalized, [
            "thank", "thanks", "appreciate", "grateful"
        ])) {
            return `You're welcome! 😊 Glad I could help! Want to know anything else about Kedhar? Or ready to reach out to him? 📧`;
        }

        // Goodbye
        if (this.matchesAny(normalized, [
            "bye", "goodbye", "see you", "later", "gtg", "gotta go"
        ])) {
            return `See you later! 👋 Feel free to come back if you have more questions about Kedhar. Or better yet, reach out to him directly! 📧\n\nEmail: kedhareswer.12110626@gmail.com\nLinkedIn: linkedin.com/in/kedhareswernaidu`;
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
