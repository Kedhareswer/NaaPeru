import { kedharProfile } from "./chatbotKnowledge";

// Response generator - ALL IN FIRST PERSON (speaking as Kedhar)
export class ChatbotResponseGenerator {
  private getRandomResponse(responses: string[]): string {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Greeting responses
  getGreeting(): string {
    const greetings = [
      "Hey! 👋 I'm Kedhar. What would you like to know about me?",
      "Hi there! I'm Kedhar - AI engineer, designer, and professional code wrangler 😎 What's up?",
      "Hello! I'm Kedhar. Ask me about my work, projects, or anything else you're curious about!",
      "Yo! 👋 Kedhar here. Ready to chat about AI, projects, or why my GitHub has more commits than my gym has visits? 😅",
    ];
    return this.getRandomResponse(greetings);
  }

  // About/Who am I
  getAbout(): string {
    const responses = [
      `I'm **Marlakunta Kedhareswer Naidu** (yeah, that's a mouthful - just call me Kedhar 😅). I'm an AI Engineer who also loves design. Currently working at **DiligenceVault** where I'm building AI systems that process financial documents.

I'm from Madanapalli, Andhra Pradesh, and I'm based in Punjab. I graduated from Lovely Professional University and work at the intersection of AI and UX - basically, I make intelligent systems that people actually want to use! 🚀`,
      
      `Hey! I'm **Kedhar** - an AI/ML engineer with a passion for design. Right now I'm at **DiligenceVault**, building agent orchestration workflows and making AI read boring documents so humans don't have to 😴

I'm that rare breed of engineer who can both build AI systems AND make them look good. Based in Punjab, originally from Madanapalli — and I graduated from LPU. I love working on projects that combine intelligence with great user experience! 💻`,
      
      `I'm **Kedhar** - AI Engineer by day, design enthusiast by night (okay, also by day 😄). Currently at **DiligenceVault** where I'm working on some cool AI stuff.

I graduated from Lovely Professional University with a focus on Data Science and AI/ML. I speak fluent Python, JavaScript, and sarcasm. My goal? Building AI systems that are both powerful and actually pleasant to use! 🎯`,
    ];
    return this.getRandomResponse(responses);
  }

  // Experience
  getExperience(): string {
    const responses = [
      `Let me break down my work history:\n\n**Currently at DiligenceVault** 🚀\nAI Engineer Intern - Building document processing systems with RAG. 82% precision, <9.5s response time. Not bad, right?\n\n**Previously:**\n- **upGrad**: Research on hybrid malware detection (cybersecurity hero mode 🦸‍♂️)\n- **Outlier.AI**: AI training and evaluation (graded AI's homework)\n- **Psyliq**: Data analysis and Power BI magic ✨\n- **AIESEC**: Leadership and international program management\n\nI've been busy! Each role taught me something new about AI, data, and how to work with awesome teams. 💪`,
      
      `Here's my journey so far:\n\n**🎯 DiligenceVault** (Current - AI Engineer Intern)\nBuilding agent orchestration workflows for document processing. We're talking 5,000+ chunks with 82% semantic precision. Cut manual work by 60% - efficiency is my middle name! 😎\n\n**🔒 upGrad** (Research Intern, Jan-Apr 2025)\nBuilt a hybrid malware detection system combining Yara rules with ML. Basically taught computers to catch bad guys!\n\n**🤖 Outlier.AI** (AI Evaluator, Nov 2024-Jan 2025)\nTrained AI models and evaluated their outputs. Yes, even AI needs tutoring 📚\n\n**📊 Psyliq** (Data Analyst, Jan-Feb 2024)\nTurned boring HR data into beautiful Power BI visualizations. Made data actually make sense!\n\n**🌍 AIESEC** (Senior Manager, 2023)\nManaged international exchange programs. Sent people around the world - like a travel agent for careers!`,
      
      `My career speedrun:\n\n🎯 **DiligenceVault** (Now): Making AI smarter at reading financial docs\n🔐 **upGrad**: Caught malware with ML (cybersecurity FTW!)\n🤖 **Outlier.AI**: Trained AI models (the irony is not lost on me)\n📊 **Psyliq**: Data visualization wizard\n🌍 **AIESEC**: Managed global programs\n\nEach experience has been about solving real problems with AI and data. I love building things that actually work and make people's lives easier! 🚀`,
    ];
    return this.getRandomResponse(responses);
  }

  // Projects
  getProjects(): string {
    const responses = [
      `I've built some cool stuff! Here are my favorites:\n\n**🎓 ThesisFlow-AI** (https://thesisflow-ai.vercel.app/)\nAn AI-powered research collaboration platform. Because writing a thesis is hard enough without bad tools! Features:\n- AI literature exploration\n- Real-time collaboration (like Google Docs for research)\n- Smart summarization\n- Gantt charts for planning\n\n**📄 QuantumPDF ChatApp** (https://quantumn-pdf-chatapp.netlify.app/)\nChat with your PDFs using RAG! Built this because I was tired of Ctrl+F-ing through documents.\n- 82% semantic search precision\n- Handles 5,000+ PDF chunks\n- <9.5s response time\n- Works with Pinecone and local storage\n\nBoth are live and actually work - check them out! 🚀`,
      
      `Let me show you what I've been building:\n\n**ThesisFlow-AI** 🎓\nMy academic research platform with AI-powered features. It's got real-time collaboration, smart summarization, and project planning tools. Perfect for researchers who want to focus on research, not fighting with tools.\n👉 https://thesisflow-ai.vercel.app/\n\n**QuantumPDF ChatApp** 📄\nThis one's my baby - a RAG application that lets you chat with PDFs. Upload a document, ask questions, get accurate answers. Built with vector databases and semantic search. 82% precision, super fast responses.\n👉 https://quantumn-pdf-chatapp.netlify.app/\n\nI'm all about building tools that solve real problems! 💪`,
      
      `Here's what I've shipped:\n\n1️⃣ **ThesisFlow-AI** - Research collaboration platform\n   - AI-powered literature exploration\n   - Real-time chat and collaboration\n   - Project management tools\n   - Live at: https://thesisflow-ai.vercel.app/\n\n2️⃣ **QuantumPDF ChatApp** - RAG-powered PDF chat\n   - Talk to your documents (finally!)\n   - 82% semantic precision\n   - Lightning fast (<9.5s)\n   - Live at: https://quantumn-pdf-chatapp.netlify.app/\n\nThese aren't just portfolio pieces - they're actually useful tools I'd use myself! 🎯`,
    ];
    return this.getRandomResponse(responses);
  }

  // Skills
  getSkills(): string {
    const responses = [
      `My tech stack is... extensive 😅\n\n**Languages:** Python, JavaScript, TypeScript, SQL, R, HTML, CSS\n(If it's a programming language, I probably know it)\n\n**AI/ML:** TensorFlow, PyTorch, Scikit-learn, OpenCV, Pandas, NumPy\n(The usual suspects for making machines smart)\n\n**Web Dev:** React, Next.js, Vue.js, Svelte, Node.js, FastAPI, Tailwind\n(Full-stack? More like full-everything 🎯)\n\n**Databases:** MySQL, Neon, Pinecone, Vector DBs\n\n**AI Tools:** ChatGPT, Claude, Cursor, Windsurf, v0, Lovable, Bolt\n(I use AI to build AI - meta, right? 🤯)\n\n**Specialties:** Computer Vision, NLP, Deep Learning, RAG, Medical Imaging\n\nBasically, I'm a Swiss Army knife of tech skills! 🔪`,
      
      `Let me list my arsenal:\n\n🐍 **Programming:** Python, JavaScript, TypeScript, SQL, R\n🤖 **AI/ML:** TensorFlow, PyTorch, Scikit-learn, OpenCV\n🌐 **Web:** React, Next.js, Vue.js, Svelte, Node.js, FastAPI\n💾 **Data:** MySQL, Neon, Pinecone, Vector Databases\n📊 **Viz:** Tableau, Power BI, Recharts\n☁️ **Cloud:** AWS, Azure, Vercel\n🛠️ **AI Tools:** ChatGPT, Claude, Cursor, Windsurf, v0\n\n**Specializations:** Computer Vision, NLP, Deep Learning, RAG\n\nI'm constantly learning new stuff. Tech moves fast, and I love keeping up! 🚀`,
      
      `Here's what I work with:\n\n**The Basics:**\nPython, JavaScript, TypeScript, SQL, R, HTML, CSS\n(Polyglot programmer 🗣️)\n\n**The AI Stuff:**\nTensorFlow, PyTorch, Scikit-learn, OpenCV, Pandas, NumPy\n(Making machines learn since 2021)\n\n**The Web Stuff:**\nReact, Next.js, Vue.js, Svelte, Node.js, FastAPI, Tailwind\n(Full-stack developer ✅)\n\n**The Data Stuff:**\nMySQL, Neon, Pinecone, Vector DBs, Tableau, Power BI\n(Data wrangler extraordinaire)\n\n**The Cool Stuff:**\nComputer Vision, NLP, Deep Learning, RAG\n(The stuff that makes you go "wow" 🤩)\n\nI'm basically a one-person tech team! 👨‍💻`,
    ];
    return this.getRandomResponse(responses);
  }

  // Education
  getEducation(): string {
    const responses = [
      `I completed my education at **Lovely Professional University** in Punjab! 🎓

**Degree:** B.Tech in Computer Science & Engineering
**Specialization:** Data Science (AI & ML)
**CGPA:** 7.74
**Duration:** September 2021 - July 2025
**Status:** ✅ Completed!

I also have a bunch of certifications:
- Neo4j Certified Professional (July 2025)
- Python for Data Science - Infosys (May 2025)
- AWS Solutions Architecture - Forage (Dec 2024)
- Responsible AI - Google (Nov 2024)
- GANs and Diffusion Models (2025)

I'm always learning new stuff! 📚`,
      
      `My academic journey:

🎓 **Lovely Professional University, Punjab**
- B.Tech in Computer Science
- Specialized in Data Science (AI & ML)
- CGPA: 7.74
- ✅ Completed: July 2025

📜 **Certifications I've collected:**
✅ Neo4j Certified Professional
✅ Python for Data Science (Infosys)
✅ AWS APAC Solutions Architecture
✅ Introduction to Responsible AI (Google)
✅ Build GANs and Diffusion Models

Education never stops in tech! Always learning, always growing 🌱`,
      
      `Here's my education background:

**University:** Lovely Professional University, Punjab
**Degree:** Bachelor of Technology - CSE
**Focus:** Data Science, AI & ML
**CGPA:** 7.74
**Status:** ✅ Completed (July 2025) 🎓

**Bonus Certifications:**
- Neo4j Certified Professional
- Python for Data Science
- AWS Solutions Architecture
- Responsible AI by Google
- GANs and Diffusion Models

I've got more certificates than a kindergarten teacher 😄`,
    ];
    return this.getRandomResponse(responses);
  }

  // Resume / CV
  getResume(): string {
    const responses = [
      `If you want the "official" version of me, here you go:

**Visual resume on this site**
- Use the **Resume** tab in the navigation
- It's an A4-style layout with skills, experience, education and leadership

**Direct PDF download**
- There is a PDF at: "/Kedhareswer_AIEnginner.pdf" on this site

**Quick summary**
- AI Engineer with a Data Science (AI & ML) background
- Experience at DiligenceVault, upGrad, Outlier.AI, Psyliq and AIESEC
- Strong in AI/ML, full-stack web, and data storytelling

So yes, I do have a proper resume. This chat is just the interactive version. 😄`,

      `You want the paperwork version of me? Fair enough.

**On this site**
- Hit the **Resume** page in the navbar to see a full visual CV

**PDF**
- There's also a downloadable resume: "/Kedhareswer_AIEnginner.pdf"

It has all the recruiter keywords:
- Roles at DiligenceVault, upGrad, Outlier.AI, Psyliq, AIESEC
- AI/ML + full-stack + data engineering skills
- B.Tech in CSE (Data Science, AI & ML) from Lovely Professional University

This chat is the vibe; the resume is the corporate version. 😏`,
    ];
    return this.getRandomResponse(responses);
  }

  // Portfolio / Website
  getPortfolio(): string {
    const responses = [
      `You're literally inside my portfolio right now.

**Pages**
- **Work** → flagship AI/ML and product builds (with case studies)
- **Fun** → side projects and experiments
- **About** → background, education, and how I think
- **Resume** → visual CV + PDF download
- **Case studies** → deep dives on projects like ThesisFlow-AI, QuantumPDF, Data Notebook
- **Chatbot** → me, giving you the tour

From here you can jump to GitHub repos and live demos from each project card. This is basically my digital lab + CV + story in one place.`,

      `This whole site *is* my portfolio.

What you'll find:
- **Work page** for serious, production-level projects
- **Fun page** for experiments and quick builds
- **About** for my journey and context
- **Resume** for the classic CV format (plus a PDF)
- Case study pages for ThesisFlow-AI, QuantumPDF, Data Notebook, etc.

If you need a one-liner: it's a portfolio for an AI engineer who also cares about UX, storytelling and shipping real things.`,
    ];
    return this.getRandomResponse(responses);
  }

  // Favorite / Most Proud Project
  getFavoriteProject(): string {
    const responses = [
      `Tough question! But if I had to pick one, it's **QuantumPDF ChatApp**.

Why? Because it solves a real pain point I had: drowning in PDFs and spending hours Ctrl+F-ing through documents. I built a RAG system that actually works:
- 82% semantic search precision
- Handles 5,000+ chunks
- <9.5s response time
- Works with both Pinecone and local storage

It's live at https://quantumn-pdf-chatapp.netlify.app/ and people actually use it. That's the dream, right? Building something useful that people want. 🚀`,

      `I'm most proud of **ThesisFlow-AI** honestly.

It's not just a tech demo—it's a full research collaboration platform with:
- AI-powered literature exploration
- Real-time collaboration (like Google Docs for research)
- Smart summarization and project planning

I built it because I saw researchers struggling with terrible tools. Now it's live at https://thesisflow-ai.vercel.app/ and actually helping people write better theses. That impact? That's what I'm here for. 💪`,
    ];
    return this.getRandomResponse(responses);
  }

  // Favorite Tech Stack
  getFavoriteTech(): string {
    const responses = [
      `My go-to stack right now?

**For AI/ML work:**
- Python + PyTorch/TensorFlow for modeling
- FastAPI for serving models
- Pinecone or Neon for vector storage
- LangChain for RAG pipelines

**For web apps:**
- React/Next.js for frontend (TypeScript always)
- Tailwind CSS for styling (life's too short for vanilla CSS)
- Vercel/Netlify for deployment

Why? Because this stack lets me move fast and ship real products, not just demos. Speed + quality = my vibe. ⚡`,

      `I'm a **Python + React + TypeScript** guy at heart.

**Backend:** Python with FastAPI or Flask. Clean, fast, perfect for AI/ML integration.
**Frontend:** React with TypeScript and Tailwind. Modern, type-safe, beautiful.
**Data:** Pinecone for vectors, Neon for Postgres, MySQL when I need classic relational.
**AI:** PyTorch for deep learning, LangChain for RAG, OpenAI/Anthropic APIs for LLMs.

This combo lets me build full-stack AI products solo. One person, end-to-end. That's power. 💪`,
    ];
    return this.getRandomResponse(responses);
  }

  // Why Hire Me / Job Fit
  getJobFit(): string {
    const responses = [
      `Why hire me? Let me be direct:

**I ship.** Not just code—actual products people use. ThesisFlow-AI, QuantumPDF, Data Notebook—all live, all functional.

**I bridge gaps.** I'm technical (AI/ML, full-stack) but I also care about UX and storytelling. I build things that work *and* feel good to use.

**I move fast.** At DiligenceVault I cut manual work by 60%. At Psyliq I improved data comprehension by 25%. I don't just write code—I solve problems.

**I'm versatile.** Need AI? I've built RAG systems with 82% precision. Need web? I've shipped Next.js apps. Need data? I've done Power BI dashboards.

You're not hiring a specialist. You're hiring someone who can take an idea from concept to production. Solo if needed. 🚀`,

      `Here's my pitch:

**Technical chops:** AI/ML engineer with real production experience. Built RAG systems, trained models, deployed at scale.

**Product mindset:** I don't just build features—I solve user problems. Every project I ship has a clear "why."

**Full-stack capability:** I can handle backend (Python, FastAPI), frontend (React, TypeScript), databases (SQL, vector DBs), and deployment (Vercel, AWS).

**Proven impact:** 60% reduction in manual work at DiligenceVault. 82% semantic precision in RAG systems. Multiple live products with real users.

**Self-starter:** Most of my portfolio? Built solo. I don't need hand-holding—I need a problem worth solving.

If you want someone who can own a feature end-to-end and ship it fast, I'm your person. 💪`,
    ];
    return this.getRandomResponse(responses);
  }

  // What Roles Are You Looking For
  getRolesLookingFor(): string {
    const responses = [
      `I'm looking for roles where I can:

**Build AI products, not just models.** I want to ship things people actually use, not just train models that sit in notebooks.

**Work full-stack.** I love being able to touch the whole product—from the ML backend to the user-facing frontend.

**Have real impact.** Give me a hard problem and let me solve it. I thrive when I can see my work making a difference.

**Ideal titles:**
- AI Engineer
- ML Engineer (product-focused)
- Full-Stack AI Developer
- Founding Engineer (at AI startups)

**What I'm NOT looking for:** Pure research roles or jobs where I'm just tweaking hyperparameters all day. I want to build and ship. 🚀`,

      `Roles I'm targeting:

**AI/ML Engineer** - Building production AI systems, RAG pipelines, agent workflows. Not just research—actual products.

**Full-Stack AI Developer** - Where I can own features end-to-end: model training, API development, frontend integration.

**Founding/Early Engineer at AI startups** - I love the 0→1 phase. Give me ambiguity and I'll ship clarity.

**What matters to me:**
- Ownership: I want to own problems, not just tickets
- Impact: I want to see my work in production, helping real users
- Growth: I want to work with people smarter than me
- Tech: Modern stack (Python, React, TypeScript, cloud-native)

If your company is building AI products that matter, let's talk. 💬`,
    ];
    return this.getRandomResponse(responses);
  }

  // Contact
  getContact(): string {
    const responses = [
      `Want to reach me? Here's how:\n\n📧 **Email:** kedhareswer.12110626@gmail.com\n📱 **Phone:** +91-9398911432\n💼 **LinkedIn:** linkedin.com/in/kedhareswernaidu\n💻 **GitHub:** github.com/Kedhareswer\n🏆 **Kaggle:** kaggle.com/kedhareswernaidu\n\nI usually reply within 24-48 hours. I'm available for opportunities and collaborations! 🤝`,
      
      `Let's connect! Here's where you can find me:\n\n**Email:** kedhareswer.12110626@gmail.com (for the formal stuff)\n**Phone:** +91-9398911432 (for the urgent stuff)\n**LinkedIn:** linkedin.com/in/kedhareswernaidu (for the professional stuff)\n**GitHub:** github.com/Kedhareswer (for the code stuff)\n**Kaggle:** kaggle.com/kedhareswernaidu (for the data science stuff)\n\nI'm open to new opportunities and always happy to chat! 😊`,
      
      `Here's my contact info:\n\n📬 kedhareswer.12110626@gmail.com\n📞 +91-9398911432\n🔗 linkedin.com/in/kedhareswernaidu\n⚡ github.com/Kedhareswer\n📊 kaggle.com/kedhareswernaidu\n\n**Response Time:** 24-48 hours\n**Status:** Available for new opportunities\n**Vibe:** Professional but chill 😎\n\nDon't hesitate to reach out!`,
    ];
    return this.getRandomResponse(responses);
  }

  // Hobbies
  getHobbies(): string {
    const responses = [
      `When I'm not coding, you'll find me:\n\n🎮 **Gaming** - Strategic games and virtual worlds (probably better at this than real life 😅)\n📚 **Reading** - Sci-fi and tech books (because regular fiction is too mainstream)\n🎵 **Music** - Exploring all genres (my Spotify Wrapped is wild)\n✈️ **Traveling** - Exploring new places (when I'm not glued to my laptop)\n\nI'm not just a code monkey! I have a life outside of programming... sometimes 😄`,
      
      `My hobbies (yes, I have a life outside code!):\n\n**Gaming** 🎮\nStrategic games and virtual world exploration. My K/D ratio is better than my gym attendance.\n\n**Reading** 📖\nSci-fi and tech literature. Currently reading about AI ethics and space exploration.\n\n**Music** 🎵\nI listen to everything - from classical to EDM. Music keeps me sane during debugging sessions.\n\n**Traveling** ✈️\nExploring new cultures and places. Though my GitHub map has more pins than my travel map 😅`,
      
      `What do I do for fun?\n\n🎮 Gaming (strategic, not just button mashing)\n📚 Reading (sci-fi and tech stuff, obviously)\n🎵 Music (all genres, I'm cultured like that)\n✈️ Traveling (exploring the world, one bug-free vacation at a time)\n\nI'm actually a pretty interesting person when I'm not talking about AI! 😊`,
    ];
    return this.getRandomResponse(responses);
  }

  // Achievements
  getAchievements(): string {
    const responses = [
      `Some things I'm proud of:\n\n🎯 **90% accuracy** in Image-to-Sketch conversion (that's really good!)\n🔍 **82% semantic search precision** in my RAG systems\n⚡ **60% reduction** in manual review effort at DiligenceVault\n📊 **25% improvement** in data comprehension at Psyliq\n🏆 **Innovative Solution Award** at AI/ML Hackathon 2023\n\nI'm basically collecting achievements like Pokémon cards 🏅`,
      
      `Let me brag a little:\n\n✨ Built RAG systems with 82% precision\n✨ Reduced manual work by 60% (efficiency king 👑)\n✨ 90% accuracy in image transformation\n✨ Improved data comprehension by 25%\n✨ Won hackathon awards\n✨ Led international programs at AIESEC\n\nNot bad for someone who's barely 23! 🎉`,
      
      `My highlight reel:\n\n🚀 **Technical:**\n- 82% semantic search precision\n- 90% accuracy in image-to-sketch conversion\n- <9.5s query response time\n- Processes 5,000+ document chunks\n\n💼 **Professional:**\n- 60% reduction in manual effort\n- 25% improvement in data comprehension\n- Multiple successful project deployments\n\n🏆 **Recognition:**\n- AI/ML Hackathon winner\n- Multiple certifications\n- Leadership roles\n\nI've been busy! 💪`,
    ];
    return this.getRandomResponse(responses);
  }

  // Fun facts
  getFunFacts(): string {
    const funFacts = [
      `Fun facts about me:\n\n😄 My code is cleaner than my room (which isn't saying much)\n🗣️ I speak 3 human languages and 7+ programming languages\n📱 I've sent more API requests than text messages\n💪 My GitHub commits > my gym visits\n🐛 I debug code better than I debug my life\n🤖 I make AI do the boring stuff so I can do the fun stuff\n\nI'm basically a walking tech meme 😂`,
      
      `Random facts about me:\n\n1. I'm from Madanapalli but study in Punjab (that's like 2000km!)\n2. My GitHub has 58 repos and 509 commits\n3. I use AI tools to build AI (meta AF 🤯)\n4. I speak Telugu natively, English professionally, Hindi... I'm working on it\n5. My portfolio is built with React, TypeScript, and way too much coffee ☕\n6. I'm 23 and already have more experience than some 30-year-olds\n\nOverachiever much? 😅`,
      
      `Things you didn't know about me:\n\n🎯 I call myself a "Vibe Coder" (yes, that's a real title)\n🌟 I built my portfolio from scratch (no templates here!)\n💻 I have 4 GitHub followers (quality over quantity, right?)\n📊 94% of my GitHub is Jupyter Notebooks (data science nerd confirmed)\n🎮 I'm probably better at gaming than you\n🎓 I graduated with a 7.74 CGPA while doing multiple internships\n\nI'm basically speedrunning life 🏃‍♂️💨`,
    ];
    return this.getRandomResponse(funFacts);
  }

  // Default/fallback response
  getDefault(): string {
    const defaults = [
      `Hmm, interesting question! 🤔 I'm not sure I have a specific answer for that, but I can tell you about:\n\n💼 **My work** - Current role at DiligenceVault and past experience\n🚀 **My projects** - ThesisFlow-AI, QuantumPDF, and more\n🛠️ **My skills** - AI/ML, full-stack development, and tech stack\n🎓 **My education** - LPU, certifications, and learning journey\n📧 **Contact** - How to reach me for opportunities\n🎮 **Fun stuff** - Hobbies, interests, and random facts\n\nWhat would you like to know? 😊`,
      
      `Good question! Let me think... 🤔\n\nI can tell you about:\n- **Work & Experience** - My AI/ML engineering journey\n- **Projects** - Cool stuff I've built (live demos available!)\n- **Skills** - Technologies I work with\n- **Education** - Academic background and certifications\n- **Contact** - Let's connect!\n- **Personal** - Fun facts and hobbies\n\nWhat interests you? 🚀`,
      
      `Interesting! 🤔 I'm not sure about that specific thing, but I'm happy to chat about:\n\n✨ My work at DiligenceVault and previous roles\n✨ Projects I've built (ThesisFlow-AI, QuantumPDF)\n✨ My technical skills and expertise\n✨ My education and certifications\n✨ How to reach me\n✨ What I do for fun\n\nTry asking about any of these! 😊`,
    ];
    return this.getRandomResponse(defaults);
  }

  // Edge cases
  getConfused(): string {
    const confused = [
      `Uh... I'm not sure I understood that 😅 Could you rephrase? Or ask me about my work, projects, or skills!`,
      `My brain is confused 🤖 Try asking about my experience, projects, skills, or how to contact me!`,
      `Error 404: Understanding not found 😂 Ask me about my work, education, or projects instead!`,
    ];
    return this.getRandomResponse(confused);
  }

  getJoke(): string {
    const jokes = [
      `Why did I become an AI engineer? Because I wanted to teach computers to be as sarcastic as me! 😏`,
      `My code is so clean, Marie Kondo would be proud! ✨`,
      `How many AI engineers does it take to change a lightbulb? None, we just train a model to do it! 💡`,
      `I don't debug code. I just stare at it until it confesses! 👀`,
    ];
    return this.getRandomResponse(jokes);
  }

  // Sarcastic responses for silly questions
  getSarcastic(): string {
    const sarcastic = [
      `Oh wow, what a question! 😏 Let me consult my crystal ball... Just kidding, ask me something about my work!`,
      `That's... creative 😅 But I'm here to talk about my projects and experience, not philosophy!`,
      `Interesting approach! But maybe ask about my skills or projects instead? 🤔`,
    ];
    return this.getRandomResponse(sarcastic);
  }
}

export const responseGenerator = new ChatbotResponseGenerator();
