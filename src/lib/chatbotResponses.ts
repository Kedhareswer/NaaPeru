import { kedharProfile } from "./chatbotKnowledge";

// Response generator with multiple variations and sarcastic humor
export class ChatbotResponseGenerator {
  private getRandomResponse(responses: string[]): string {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Greeting responses
  getGreeting(): string {
    const greetings = [
      "Hey there! 👋 Ready to know about the guy who makes AI do his bidding?",
      "Yo! What's up? Want to know about Kedhar? Spoiler: He's pretty cool 😎",
      "Hello! I'm here to spill all the tea about Kedhar. What do you want to know? ☕",
      "Hi! Ask me anything about Kedhar. I promise to be only 70% sarcastic 😏",
      "Greetings, human! Ready to learn about an AI engineer who actually knows what he's doing?",
    ];
    return this.getRandomResponse(greetings);
  }

  // About/Who is Kedhar
  getAbout(): string {
    const responses = [
      `Meet ${kedharProfile.name} (but everyone calls him Kedhar because, let's be honest, that's easier to pronounce 😅). He's an AI Engineer who designs - basically, he makes computers smart AND pretty. Currently working at DiligenceVault, making AI read boring financial documents so humans don't have to. Living the dream in Punjab, India! 🇮🇳`,
      
      `Kedhar is that rare breed of engineer who can both build AI systems AND make them look good. He's currently at DiligenceVault, teaching machines to understand documents better than most humans. Based in Punjab, but his code travels worldwide 🌍`,
      
      `So there's this guy named ${kedharProfile.name} (Kedhar for short). He's an AI/ML engineer who decided that just making things work wasn't enough - they had to look good too. Currently making AI smarter at DiligenceVault. Think of him as the person who makes robots less... robotic 🤖`,
      
      `Kedhar? Oh, he's the guy who speaks fluent Python, JavaScript, AND sarcasm. AI Engineer by day, design enthusiast by night. Currently at DiligenceVault, where he's building systems that process 5,000+ document chunks like it's nothing. No big deal 💅`,
    ];
    return this.getRandomResponse(responses);
  }

  // Experience
  getExperience(): string {
    const responses = [
      `Kedhar's been around the block! 🏃‍♂️\n\n**Currently:** AI Engineer Intern at DiligenceVault (the fancy finance AI place)\n- Building agent orchestration workflows (sounds cool, right?)\n- 82% semantic retrieval precision (that's actually impressive)\n- Cut manual work by 60% (lazy? No, efficient! 😎)\n\n**Previously:**\n- Research Intern at upGrad (caught malware with ML)\n- AI Evaluator at Outlier.AI (graded AI's homework 📚)\n- Data Analyst at Psyliq (made pretty charts)\n- Senior Manager at AIESEC (sent people around the world 🌍)\n\nBasically, he's done everything except take a break 😅`,
      
      `Let me break down Kedhar's career journey:\n\n🎯 **DiligenceVault** (Current): Making AI read financial docs. Someone's gotta do it!\n\n🔒 **upGrad**: Built a hybrid malware detection system. Like antivirus, but cooler.\n\n🤖 **Outlier.AI**: Trained AI models. Yes, even AI needs tutoring.\n\n📊 **Psyliq**: Turned boring data into beautiful visualizations.\n\n🌍 **AIESEC**: Managed international programs. Travel agent for careers!\n\nThe guy doesn't sit still, does he? 🏃‍♂️`,
      
      `Kedhar's work history reads like a tech bro's dream resume:\n\n**DiligenceVault** - Currently teaching AI to understand finance (good luck with that 💸)\n**upGrad** - Caught bad guys with ML (cybersecurity hero 🦸‍♂️)\n**Outlier.AI** - Made AI smarter (ironic, right?)\n**Psyliq** - Data analysis wizard 🧙‍♂️\n**AIESEC** - Leadership and stuff 👔\n\nHe's basically speedrunning the tech career ladder 🪜`,
    ];
    return this.getRandomResponse(responses);
  }

  // Projects
  getProjects(): string {
    const responses = [
      `Kedhar's projects are actually pretty cool (don't tell him I said that):\n\n**🎓 ThesisFlow-AI** (thesisflow-ai.vercel.app)\nBecause writing a thesis is hard enough without bad tools. It's got:\n- AI-powered literature exploration\n- Real-time collaboration (like Google Docs, but for research)\n- Gantt charts (for people who like planning)\n- Smart summarization (TL;DR on steroids)\n\n**📄 QuantumPDF ChatApp** (quantumn-pdf-chatapp.netlify.app)\nTalk to your PDFs. They finally talk back!\n- 82% semantic search precision (that's good, trust me)\n- Handles 5,000+ PDF chunks\n- <9.5s response time (faster than your ex's replies 😏)\n- RAG-powered (Retrieval Augmented Generation, not the clothing)\n\nBoth are live and actually work. Shocking, I know! ✨`,
      
      `Let me show you what Kedhar's been building:\n\n**ThesisFlow-AI** 🎓\nAn academic research platform that doesn't suck. Features:\n- Literature exploration with AI\n- Real-time collaboration\n- Project planning tools\n- Smart summarization\nCheck it out: thesisflow-ai.vercel.app\n\n**QuantumPDF ChatApp** 📄\nChat with your PDFs (yes, really):\n- 82% accuracy in finding stuff\n- Processes thousands of pages\n- Super fast responses\n- Works with vector databases\nTry it: quantumn-pdf-chatapp.netlify.app\n\nBoth projects are deployed and functional. He actually finishes what he starts! 🎉`,
      
      `Kedhar's portfolio projects:\n\n1️⃣ **ThesisFlow-AI** - Research collaboration platform\n   - AI-powered everything\n   - Real-time chat & collaboration\n   - Gantt charts for the organized folks\n   - Live at: thesisflow-ai.vercel.app\n\n2️⃣ **QuantumPDF ChatApp** - RAG application\n   - Talk to PDFs (finally!)\n   - 82% semantic precision\n   - Lightning fast (<9.5s)\n   - Live at: quantumn-pdf-chatapp.netlify.app\n\nThese aren't just "hello world" projects. They're actually useful! 🚀`,
    ];
    return this.getRandomResponse(responses);
  }

  // Skills
  getSkills(): string {
    const responses = [
      `Kedhar's skill set is... extensive 😅\n\n**Languages:** Python, JavaScript, TypeScript, SQL, R, HTML, CSS\n(Basically, if it's a programming language, he probably knows it)\n\n**AI/ML:** TensorFlow, PyTorch, Scikit-learn, OpenCV, Pandas, NumPy\n(The usual suspects for making machines smart)\n\n**Web Dev:** React, Next.js, Vue.js, Svelte, Node.js, FastAPI, Tailwind\n(Full-stack? More like full-everything 🎯)\n\n**Databases:** MySQL, Neon, Pinecone, Vector DBs\n(Where the data lives)\n\n**AI Tools:** ChatGPT, Claude, Cursor, Windsurf, v0, Lovable, Bolt\n(He uses AI to build AI. Meta, right? 🤯)\n\n**Specializations:** Computer Vision, NLP, Deep Learning, RAG\n(The fancy stuff)\n\nTL;DR: He knows a lot. Like, a LOT. 📚`,
      
      `Let me list Kedhar's tech stack (grab some coffee, this'll take a while ☕):\n\n🐍 **Programming:** Python, JavaScript, TypeScript, SQL, R\n🤖 **AI/ML:** TensorFlow, PyTorch, Scikit-learn, OpenCV\n🌐 **Web:** React, Next.js, Vue.js, Svelte, Node.js, FastAPI\n💾 **Data:** MySQL, Neon, Pinecone, Vector Databases\n📊 **Viz:** Tableau, Power BI, Recharts\n☁️ **Cloud:** AWS, Azure, Vercel\n🛠️ **AI Tools:** ChatGPT, Claude, Cursor, Windsurf, v0, Lovable\n\n**Specialties:** Computer Vision, NLP, Deep Learning, RAG\n\nHe's basically a Swiss Army knife of tech skills 🔪`,
      
      `Kedhar's skills? Oh boy, here we go:\n\n**The Basics:**\nPython, JavaScript, TypeScript, SQL, R, HTML, CSS\n(You know, just casual polyglot things 🗣️)\n\n**The AI Stuff:**\nTensorFlow, PyTorch, Scikit-learn, OpenCV, Pandas, NumPy\n(Making machines learn since 2021)\n\n**The Web Stuff:**\nReact, Next.js, Vue.js, Svelte, Node.js, FastAPI, Tailwind\n(Full-stack developer? Check ✅)\n\n**The Data Stuff:**\nMySQL, Neon, Pinecone, Vector DBs, Tableau, Power BI\n(Data wrangler extraordinaire)\n\n**The Cool Stuff:**\nComputer Vision, NLP, Deep Learning, RAG, Medical Imaging\n(The stuff that makes you go "wow" 🤩)\n\nHe's basically a one-person tech team 👨‍💻`,
    ];
    return this.getRandomResponse(responses);
  }

  // Education
  getEducation(): string {
    const responses = [
      `Kedhar studied at **Lovely Professional University** in Punjab, India 🎓\n\n**Degree:** B.Tech in Computer Science & Engineering\n**Specialization:** Data Science (AI & ML)\n**CGPA:** 7.74\n**Duration:** September 2021 - July 2025\n**Status:** Completed! 🎉\n\nHe also has a bunch of certifications:\n- Neo4j Certified Professional\n- Python for Data Science (Infosys)\n- AWS Solutions Architecture (Forage)\n- Responsible AI (Google)\n- GANs and Diffusion Models\n\nBasically, he's been collecting certificates like Pokémon cards 📜`,
      
      `Education breakdown:\n\n🎓 **Lovely Professional University**\n- B.Tech in Computer Science\n- Specialized in Data Science (AI & ML)\n- CGPA: 7.74 (not bad!)\n- Graduated: July 2025\n\n📜 **Certifications:**\n- Neo4j Certified Professional (July 2025)\n- Python for Data Science - Infosys (May 2025)\n- AWS APAC Solutions Architecture (Dec 2024)\n- Introduction to Responsible AI - Google (Nov 2024)\n- Build GANs and Diffusion Models (2025)\n\nHe's been busy! 📚`,
      
      `Kedhar's academic journey:\n\n**University:** Lovely Professional University, Punjab\n**Degree:** Bachelor of Technology - CSE\n**Focus:** Data Science, AI & ML\n**CGPA:** 7.74\n**Graduated:** July 2025 🎓\n\n**Bonus Certifications:**\n✅ Neo4j Certified Professional\n✅ Python for Data Science\n✅ AWS Solutions Architecture\n✅ Responsible AI by Google\n✅ GANs and Diffusion Models\n\nHe's got more certificates than a kindergarten teacher 😄`,
    ];
    return this.getRandomResponse(responses);
  }

  // Contact
  getContact(): string {
    const responses = [
      `Want to reach Kedhar? Here's how:\n\n📧 **Email:** kedhareswer.12110626@gmail.com\n📱 **Phone:** +91-9398911432\n💼 **LinkedIn:** linkedin.com/in/kedhareswernaidu\n💻 **GitHub:** github.com/Kedhareswer\n🏆 **Kaggle:** kaggle.com/kedhareswernaidu\n\nHe's pretty responsive (unlike some people 👀). Usually replies within 24-48 hours!`,
      
      `Here's how to stalk... I mean, contact Kedhar:\n\n**Email:** kedhareswer.12110626@gmail.com (for the formal stuff)\n**Phone:** +91-9398911432 (for the urgent stuff)\n**LinkedIn:** linkedin.com/in/kedhareswernaidu (for the professional stuff)\n**GitHub:** github.com/Kedhareswer (for the code stuff)\n**Kaggle:** kaggle.com/kedhareswernaidu (for the data science stuff)\n\nHe's available for opportunities and collaborations! 🤝`,
      
      `Kedhar's contact info (he said it's okay to share):\n\n📬 kedhareswer.12110626@gmail.com\n📞 +91-9398911432\n🔗 linkedin.com/in/kedhareswernaidu\n⚡ github.com/Kedhareswer\n📊 kaggle.com/kedhareswernaidu\n\n**Response Time:** 24-48 hours\n**Status:** Available for new opportunities\n**Vibe:** Professional but chill 😎`,
    ];
    return this.getRandomResponse(responses);
  }

  // Hobbies
  getHobbies(): string {
    const responses = [
      `When Kedhar's not coding, he's:\n\n🎮 **Gaming** - Strategic gaming and virtual world exploration (probably better at this than real life)\n📚 **Reading** - Science fiction and technical literature (nerd alert! 🤓)\n🎵 **Music** - Exploring new genres (his Spotify Wrapped is probably wild)\n✈️ **Traveling** - Exploring new cultures (when he's not glued to his laptop)\n\nBasically, he's a well-rounded human being. Shocking, I know! 😄`,
      
      `Kedhar's hobbies (yes, he has a life outside of code):\n\n**Gaming** 🎮\nStrategic games and virtual worlds. Probably has better stats there than in real life.\n\n**Reading** 📖\nSci-fi and tech books. Because regular fiction is too mainstream.\n\n**Music** 🎵\nExploring new genres. His playlist is probably as diverse as his tech stack.\n\n**Traveling** ✈️\nExploring new places. When he's not debugging code, he's debugging life.\n\nHe's not just a code monkey! 🐵`,
      
      `What does Kedhar do for fun?\n\n🎮 Gaming (strategic, not just button mashing)\n📚 Reading (sci-fi and tech stuff, obviously)\n🎵 Music (all genres, he's cultured like that)\n✈️ Traveling (exploring the world, one bug-free vacation at a time)\n\nHe's actually a pretty interesting person when he's not talking about AI 😅`,
    ];
    return this.getRandomResponse(responses);
  }

  // Achievements
  getAchievements(): string {
    const responses = [
      `Kedhar's flex-worthy achievements:\n\n🎯 **90% accuracy** in Image-to-Sketch conversion (that's really good!)\n🔍 **82% semantic search precision** in RAG systems (better than most)\n⚡ **60% reduction** in manual review effort (efficiency king 👑)\n📊 **25% improvement** in data comprehension (made data make sense)\n🏆 **Innovative Solution Award** at AI/ML Hackathon 2023\n\nHe's basically collecting achievements like they're going out of style 🏅`,
      
      `Let me brag about Kedhar for a sec:\n\n✨ Built RAG systems with 82% precision\n✨ Reduced manual work by 60% (lazy = efficient)\n✨ 90% accuracy in image transformation\n✨ Improved data comprehension by 25%\n✨ Won hackathon awards\n✨ Managed international programs at AIESEC\n\nNot bad for someone who's barely 23! 🎉`,
      
      `Kedhar's highlight reel:\n\n🚀 **Technical:**\n- 82% semantic search precision\n- 90% accuracy in image-to-sketch conversion\n- <9.5s query response time\n- Processes 5,000+ document chunks\n\n💼 **Professional:**\n- 60% reduction in manual effort\n- 25% improvement in data comprehension\n- Multiple successful project deployments\n\n🏆 **Recognition:**\n- AI/ML Hackathon winner\n- Multiple certifications\n- Leadership roles at AIESEC\n\nHe's been busy! 💪`,
    ];
    return this.getRandomResponse(responses);
  }

  // Fun facts
  getFunFacts(): string {
    const funFacts = [
      `Fun facts about Kedhar:\n\n😄 His code is cleaner than his room (which isn't saying much)\n🗣️ Speaks 3 human languages and 7+ programming languages\n📱 Sent more API requests than text messages\n💪 GitHub commits > gym visits\n🐛 Debugs code better than he debugs his life\n🤖 Makes AI do the boring stuff so humans can do the fun stuff\n\nHe's basically a walking tech meme 😂`,
      
      `Random Kedhar facts:\n\n1. He's from Madanapalli but studies in Punjab (that's like 2000km!)\n2. His GitHub has 58 repos and 509 commits\n3. He uses AI tools to build AI (meta AF 🤯)\n4. Speaks Telugu natively, English professionally, Hindi... he's working on it\n5. His portfolio is built with React, TypeScript, and way too much coffee ☕\n6. He's 23 and already has more experience than some 30-year-olds\n\nOverachiever much? 😅`,
      
      `Things you didn't know about Kedhar:\n\n🎯 He's a "Vibe Coder" (yes, that's a real title)\n🌟 Built his portfolio from scratch (no templates here!)\n💻 Has 4 GitHub followers (quality over quantity, right?)\n📊 94% of his GitHub is Jupyter Notebooks (data science nerd confirmed)\n🎮 Probably better at gaming than you\n🎓 Graduated with a 7.74 CGPA while doing multiple internships\n\nHe's basically speedrunning life 🏃‍♂️💨`,
    ];
    return this.getRandomResponse(funFacts);
  }

  // Default/fallback response
  getDefault(): string {
    const defaults = [
      `Hmm, that's an interesting question! 🤔 I'm Kedhar's AI assistant (ironic, right? An AI engineer with an AI assistant). \n\nI can tell you about:\n- His experience and projects\n- His skills and education\n- How to contact him\n- His hobbies and fun facts\n\nWhat would you like to know? 😊`,
      
      `Good question! I'm not sure I have a specific answer for that, but I can tell you all about Kedhar:\n\n💼 His work experience\n🚀 His cool projects\n🛠️ His technical skills\n🎓 His education\n📧 How to reach him\n🎮 What he does for fun\n\nWhat interests you? 🤓`,
      
      `Interesting! Let me think... 🤔\n\nI'm here to answer questions about Kedhar. I know about:\n- His AI/ML work\n- His projects (ThesisFlow-AI, QuantumPDF)\n- His skills and certifications\n- His contact info\n- Random fun facts\n\nWhat would you like to explore? 🚀`,
    ];
    return this.getRandomResponse(defaults);
  }

  // Edge cases
  getConfused(): string {
    const confused = [
      `Uh... I'm not sure I understood that 😅 Could you rephrase? Or ask me something about Kedhar's work, projects, or skills!`,
      `My AI brain is confused 🤖 Try asking about Kedhar's experience, projects, skills, or how to contact him!`,
      `Error 404: Understanding not found 😂 Ask me about Kedhar's work, education, or projects instead!`,
    ];
    return this.getRandomResponse(confused);
  }

  getJoke(): string {
    const jokes = [
      `Why did Kedhar become an AI engineer? Because he wanted to teach computers to be as sarcastic as him! 😏`,
      `Kedhar's code is so clean, Marie Kondo would be proud! ✨`,
      `How many AI engineers does it take to change a lightbulb? None, they just train a model to do it! 💡`,
      `Kedhar doesn't debug code. He just stares at it until it confesses! 👀`,
    ];
    return this.getRandomResponse(jokes);
  }

  // Sarcastic responses for silly questions
  getSarcastic(): string {
    const sarcastic = [
      `Oh wow, what a question! 😏 Let me consult my crystal ball... Just kidding, ask me something about Kedhar!`,
      `That's... creative 😅 But I'm here to talk about Kedhar's work, not philosophy!`,
      `Interesting approach! But maybe ask about his projects or skills instead? 🤔`,
    ];
    return this.getRandomResponse(sarcastic);
  }
}

export const responseGenerator = new ChatbotResponseGenerator();
