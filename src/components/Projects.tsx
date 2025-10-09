import { ArrowUpRight, Github, Linkedin, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { motion } from "framer-motion";
import { useState } from "react";

export const Projects = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollTrigger({ threshold: 0.3 });
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;

  const projects = [
    {
      number: "01",
      category: "AI Research Platform",
      title: "ThesisFlow-AI",
      description:
        "Collaborative research workspace with AI-assisted literature review, project planning, and real-time team workflows powered by Gemini, OpenAI, and Groq integrations.",
      tags: ["React", "Node.js", "AI Agents", "WebSocket"],
      image: "/projects/research-bolt.png",
      type: "WEB",
      github: "https://github.com/Kedhareswer/ai-project-planner",
      demo: "https://thesisflow-ai.vercel.app/",
      projectDate: "Jul 2025",
    },
    {
      number: "02",
      category: "RAG Application",
      title: "QuantumPDF Chat App",
      description:
        "PDF intelligence assistant with RAG, adaptive chunking, and Vector DB support for instant, accurate document conversations.",
      tags: ["Next.js 15", "Tailwind", "Vector DB", "LLM"],
      image: "/projects/quantumpdf.jpeg",
      type: "APP",
      github: "https://github.com/Kedhareswer/QuantumPDF_ChatApp_VectorDB",
      demo: "https://quantumn-pdf-chatapp.netlify.app/",
      projectDate: "Jun 2025",
    },
    {
      number: "03",
      category: "Data Experience",
      title: "Data Notebook",
      description:
        "Interactive data analysis notebook with rich visualizations, code execution, and multi-format data ingestion for analysts and teams.",
      tags: ["Next.js", "Radix UI", "Recharts", "TypeScript"],
      image: "/projects/data-notebook.png",
      type: "WEB",
      github: "https://github.com/Kedhareswer/Data_Science_Platform",
      demo: "https://data-science-platform.vercel.app/",
      projectDate: "Apr 2025",
    },
  ];

  const openSourceContributions = [
    {
      name: "LangChain Multi-Provider Chat",
      summary: "Unified AI chat stack with adapters for OpenAI, Anthropic, Groq, Gemini, and more.",
      href: "https://github.com/Kedhareswer/langchain-projects",
    },
    {
      name: "PromptForger",
      summary: "Prompt optimization lab featuring scoring, token analytics, and persona templates.",
      href: "https://github.com/Kedhareswer/platform-prompt-alchemy-lab",
    },
    {
      name: "Data Notebook",
      summary: "Interactive data analysis workspace with code execution and visualization tooling.",
      href: "https://github.com/Kedhareswer/Data_Science_Platform",
    },
  ];

  const spotlightProject = projects[0];
  const supportingProjects = projects.slice(1);

  // Poster system controls
  const marqueeSpeedSec = 32; // tune marquee speed here (seconds per loop)
  const marqueeItems = [" Experimental", "Applied AI", "Data Products", "UI/UX"];

  // Optional video preview for spotlight poster (auto-muted loop). Provide an mp4/webm path in /public.
  // Example: 
  // const spotlightVideo: string | undefined = "/projects/thesisflow-preview.mp4";
  const spotlightVideo: string | undefined = undefined;

  // Additional mockups/screens per project (used in poster grid and spotlight)
  const projectMockups: Record<string, string[]> = {
    "QuantumPDF Chat App": [
      "/projects/quantumpdf.jpeg",
      "/projects/email-insight.png",
      "/projects/email-insight-2.png",
    ],
    "Data Notebook": [
      "/projects/data-notebook.png",
      "/projects/ml-notebook.png",
    ],
    "ThesisFlow-AI": [
      "/projects/research-bolt.png",
      "/projects/research-bolt-2.png",
    ],
  };

  const focusStreams = [
    "Applied AI platforms",
    "Data storytelling & insights",
    "Community-driven learning",
  ];

  const moreProjects = [
    {
      title: "Multi-Provider AI Chat Application",
      description:
        "Chat platform bridging OpenAI, Anthropic, Groq, Gemini, DeepSeek, and Fireworks with unified conversations, model switching, and persistent settings.",
      demo: "https://langchain-projects.vercel.app/",
      status: "Live",
      category: "AI Chat",
      date: "Aug 2025",
    },
    {
      title: "PromptForger",
      description:
        "Prompt optimization lab delivering real-time scoring, token savings, and persona-based templates to tune prompts for every LLM stack.",
      demo: "https://prompt-enhancer-hazel.vercel.app/",
      status: "Live",
      category: "Web Development",
      date: "Jul 2025",
    },
    {
      title: "Portfolio Nexus",
      description:
        "Auto-updating portfolio experience with dark mode UI, live repository sync, smart search, and rating-based discovery across featured builds.",
      demo: "https://kedhareswer.github.io/My_Portfolio_Designs/",
      status: "Live",
      category: "Web Development",
      date: "Jul 2025",
    },
    {
      title: "ChefSpeak",
      description:
        "Voice-first cooking companion with multilingual narration, shopping lists, and ingredient detection powered by ElevenLabs and Supabase.",
      demo: "https://chef-speaks.netlify.app/",
      status: "Shelved",
      category: "Voice AI",
      date: "Jun 2025",
    },
    {
      title: "ML-Notebook",
      description:
        "Hands-on ML education workspace featuring model comparisons, dynamic visualizations, and live parameter tuning for learners.",
      demo: "https://ml-notebook.vercel.app/",
      status: "Live",
      category: "Machine Learning",
      date: "May 2025",
    },
    {
      title: "Digit Classifier",
      description:
        "Next.js + FastAPI application delivering real-time digit recognition with TensorFlow models achieving 99% accuracy.",
      demo: "https://ai-classifier.netlify.app/",
      status: "Live",
      category: "Deep Learning",
      date: "May 2025",
    },
    {
      title: "Endoscopy Image Enhancement",
      description:
        "Medical imaging enhancer leveraging deep learning pipelines to clarify endoscopy footage with 40% quality gain.",
      demo: "https://huggingface.co/spaces/Kedhareswer/EndoscopyImageEnhancement",
      status: "Research",
      category: "Medical Imaging",
      date: "May 2025",
    },
    {
      title: "Image to Sketch",
      description:
        "GAN-assisted transformation engine turning photos into sketches with 90% fidelity and 30% faster processing.",
      demo: "https://image-to-sketch-wine.vercel.app/",
      status: "Live",
      category: "Computer Vision",
      date: "Apr 2025",
    },
    {
      title: "Web Development - 100 Mini Projects",
      description:
        "Archive of 100 responsive micro-applications showcasing modern frontend and interaction patterns across frameworks.",
      demo: "https://v0-vintage-web-development-app.vercel.app/",
      status: "Live",
      category: "Web Development",
      date: "Mar 2023",
    },
  ];

  return (
    <section id="projects" className="relative bg-background py-3xl md:py-4xl overflow-hidden">
      <div className="container-portfolio">
        {/* Presence Section */}
        <div className="mb-24 grid gap-12 lg:grid-cols-[minmax(0,1.7fr),minmax(0,1fr)]">
          <div className="space-y-8">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
              My Presence
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground">
              Marlakunta Kedhareswer Naidu
            </h2>
            <p className="max-w-2xl font-body text-lg text-gray-light">
            I don’t fit into one box — I’m a Data Scientist, AI Engineer, Designer, and relentless experimenter.
I design intelligence and shape it into experiences people actually feel.
Exploring how AI-driven systems and human-centered design can coexist beautifully — and meaningfully.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: <Linkedin className="h-5 w-5" />,
                  label: "LinkedIn",
                  handle: "linkedin.com/in/kedhareswernaidu",
                  href: "https://www.linkedin.com/in/kedhareswernaidu/",
                },
                {
                  icon: <Github className="h-5 w-5" />,
                  label: "GitHub",
                  handle: "github.com/Kedhareswer",
                  href: "https://github.com/Kedhareswer",
                },
                {
                  icon: (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-heading text-xs font-bold text-primary">
                      K
                    </span>
                  ),
                  label: "Kaggle",
                  handle: "kaggle.com/kedhareswernaidu",
                  href: "https://www.kaggle.com/kedhareswernaidu",
                },
                {
                  icon: <ArrowUpRight className="h-5 w-5" />,
                  label: "21st.dev",
                  handle: "21st.dev/kedhareswer",
                  href: "https://21st.dev/community/kedhar",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-lg border border-border/20 bg-card/50 p-5 transition-all duration-normal hover:border-primary/50 hover:bg-card/70"
                >
                  <div className="flex items-center gap-3 font-body">
                    <span className="rounded-full border border-primary/30 p-2 text-primary/90">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-gray-light/80">{item.label}</p>
                      <p className="text-base font-semibold text-foreground">{item.handle}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-primary transition-transform duration-normal group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              ))}
            </div>

            <div className="space-y-3 pt-2">
              <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-gray-light/70">
                Focus Streams
              </span>
              <div className="grid gap-3 md:grid-cols-3">
                {focusStreams.map((stream) => (
                  <div
                    key={stream}
                    className="rounded-lg border border-border/20 bg-card/40 p-4 shadow-sm backdrop-blur transition-all duration-normal hover:border-primary/40 hover:bg-card/60"
                  >
                    <p className="font-body text-sm font-semibold text-foreground">{stream}</p>
                    <span className="mt-2 block h-0.5 w-12 bg-primary/40" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-primary/10 blur-3xl" />
            <div className="relative flex h-full flex-col justify-between rounded-xl border border-border/25 bg-black/40 p-8 backdrop-blur">
              <div className="space-y-3">
                <span className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">Availability</span>
                <p className="font-heading text-2xl text-foreground">Open for applied AI & data leadership mandates.</p>
                <p className="font-body text-sm text-gray-light">
                  Collaborating with teams building intelligent research platforms, data products, and developer tooling.
                </p>
              </div>

              <div className="space-y-4 pt-6">
                <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-gray-light/70">Open source contributions</span>
                <div className="space-y-3">
                  {openSourceContributions.map((contrib) => (
                    <a
                      key={contrib.name}
                      href={contrib.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start justify-between gap-6 rounded-lg border border-border/20 bg-card/35 p-4 transition-all duration-normal hover:border-primary/40 hover:bg-card/60"
                    >
                      <div className="space-y-1">
                        <p className="font-body text-sm font-semibold uppercase tracking-[0.25em] text-foreground">{contrib.name}</p>
                        <p className="font-body text-xs text-gray-light/80">{contrib.summary}</p>
                      </div>
                      <ArrowUpRight className="mt-1 h-4 w-4 text-primary transition-transform duration-normal group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-gray-light/70">Currently shipping</span>
                <p className="mt-2 font-body text-sm text-gray-light">
                  ThesisFlow-AI · Quater Master · Legal Ease
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Work — Magazine/Poster Redesign */}
        <style>
          {`
            @keyframes marqueeX { from { transform: translateX(0); } to { transform: translateX(-100%); } }
            @keyframes revealUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
          `}
        </style>

        {/* Header with kinetic strip */}
        <div
          ref={headerRef}
          className={`mb-10 md:mb-16 transition-all ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="space-y-4">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">Selected Work</span>
            <div className="relative">
              <motion.h2
                className="text-section leading-[0.9]"
                style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.18)", color: "transparent" }}
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
              >
                {"Signature Projects".split(" ").map((word) => (
                  <motion.span
                    key={word}
                    className="inline-block pr-3"
                    variants={{ hidden: { y: 18, opacity: 0 }, show: { y: 0, opacity: 1 } }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h2>
              <span className="absolute -left-3 top-3 h-2 w-2 bg-primary" />
            </div>
            <motion.p
              className="max-w-2xl font-body text-lg text-gray-light"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              A curated mix of product, brand, and experimental builds crafted to deliver immediate impact and long-term value.
            </motion.p>
          </div>
          {/* kinetic marquee */}
          <div className="relative left-1/2 mt-8 w-screen -translate-x-1/2 overflow-hidden border border-border/20 bg-card/30 py-4">
            <div
              className="flex whitespace-nowrap text-2xl md:text-3xl font-heading text-foreground/70"
              style={{ animation: `marqueeX ${marqueeSpeedSec}s linear infinite` }}
              aria-hidden
            >
              {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((label, itemIndex) => (
                <span key={itemIndex} className="inline-flex items-center gap-4 px-6">
                  {label}
                  <span className="h-1 w-1 bg-primary/60" />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Poster */}
        <div className="relative overflow-hidden border border-border/30 bg-[#050506] shadow-[0_40px_90px_-50px_rgba(0,0,0,0.85)]">
          <div className="absolute left-0 top-0 hidden h-full w-14 border-r border-border/20 bg-black/60 lg:flex flex-col items-center justify-center gap-6">
            <span className="font-body text-[10px] uppercase tracking-[0.4em] text-gray-light/70 [writing-mode:vertical-rl]">
              Ongoing Series
            </span>
            <span className="h-12 w-px bg-border/30" />
            <span className="font-body text-[10px] uppercase tracking-[0.4em] text-primary/70 [writing-mode:vertical-rl]">
              Issue · 2025
            </span>
          </div>
          <div className="relative grid gap-0 lg:grid-cols-12">
            <div className="col-span-12 lg:col-span-6 space-y-8 p-8 md:p-12 lg:pl-20">
              <div className="space-y-3">
                <span className="font-heading text-4xl font-semibold uppercase tracking-[0.3em] text-primary/80">{spotlightProject.number}</span>
                <div className="flex items-center gap-4">
                  <span className="font-body text-xs uppercase tracking-[0.45em] text-gray-light/70">{spotlightProject.category}</span>
                  <span className="h-px flex-1 bg-border/40" />
                  <span className="font-body text-xs uppercase tracking-[0.35em] text-primary/70">{spotlightProject.projectDate}</span>
                </div>
              </div>
              <motion.h3
                className="font-heading text-[3.6rem] leading-[0.88] md:text-[4.6rem] lg:text-[5.2rem]"
                style={{ WebkitTextStroke: "2px rgba(255,255,255,0.22)", color: "transparent" }}
                initial={{ y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
              >
                {spotlightProject.title}
              </motion.h3>
              <p className="max-w-xl font-body text-sm md:text-base text-gray-light/85">{spotlightProject.description}</p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a href={spotlightProject.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 border border-border/40 px-5 py-3 font-body text-xs font-semibold uppercase tracking-[0.32em] text-primary transition-colors hover:border-primary/70">
                  View live demo
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href={spotlightProject.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-border/30 px-5 py-3 font-body text-xs uppercase tracking-[0.28em] text-gray-light/90 hover:text-primary">
                  Source dossier
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6 relative border-t lg:border-l border-border/20">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                {spotlightVideo ? (
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    src={spotlightVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={spotlightProject.image}
                  />
                ) : (
                  <img src={spotlightProject.image} alt={spotlightProject.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-l from-black/75 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Poster Grid with alternating editorial templates */}
        <div className="mt-12 md:mt-16 grid grid-cols-12 gap-6 md:gap-8">
          {supportingProjects.map((project, index) => {
            const template = index % 3; // 0,1,2 => three different editorial layouts
            const mocks = projectMockups[project.title] ?? [project.image, "/placeholder.svg"]; 
            const primary = mocks[0] ?? project.image;
            const secondary = mocks[1] ?? "/placeholder.svg";
            const delay = `${120 * (index + 1)}ms`;
            const isQuantumProject = project.title === "QuantumPDF Chat App";

            if (template === 0) {
              // Template A: Dual-mockup landscape poster
              return (
                <article
                  key={project.number}
                  className={`col-span-12 md:col-span-7 group relative flex h-full flex-col overflow-hidden border border-border/25 bg-[#070709] shadow-[0_30px_60px_-45px_rgba(0,0,0,0.8)]`}
                  style={{ animation: `revealUp 700ms ease both`, animationDelay: delay }}
                >
                  <div className="absolute left-0 top-6 -translate-x-1/2 origin-left -rotate-90 border border-border/30 bg-[#050507] px-3 py-1 text-[10px] tracking-[0.4em] text-gray-light/75">{project.category}</div>
                  <div className="flex items-center justify-between px-6 md:px-8 pt-6">
                    <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.4em] text-primary/80">{project.projectDate}</span>
                    <span className="font-heading text-5xl md:text-6xl font-extrabold text-primary/8">{project.number}</span>
                  </div>
                  <div className="px-6 md:px-8 pt-3 pb-2">
                    <motion.h4
                      className="font-heading text-2xl md:text-[2.75rem] font-semibold uppercase tracking-tight text-foreground leading-tight"
                      whileHover={{ letterSpacing: "0.08em" }}
                      transition={{ duration: 0.35 }}
                    >
                      {project.title}
                    </motion.h4>
                    <p className="mt-4 font-body text-sm md:text-base leading-[1.6] text-foreground/90">{project.description}</p>
                  </div>
                  <div className="relative mt-6 border-t border-border/20">
                    {isQuantumProject ? (
                      <div className="px-8 py-5 space-y-4">
                        <div className="relative aspect-[16/9] w-full overflow-hidden border border-border/10">
                          <img src={primary} alt={`${project.title} primary mockup`} className="absolute inset-0 h-full w-full object-contain bg-black/40 transition-transform duration-[800ms] group-hover:scale-[1.03]" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          {[secondary, mocks[2]].filter(Boolean).map((mock, mockIndex) => (
                            <div key={mockIndex} className="relative aspect-[16/10] overflow-hidden border border-border/10">
                              <img src={mock as string} alt={`${project.title} detail ${mockIndex + 1}`} className="absolute inset-0 h-full w-full object-contain bg-black/40 transition-transform duration-[800ms] group-hover:scale-[1.04]" />
                              <div className="absolute inset-0 border border-white/5" />
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-12 gap-3 px-8 py-5">
                        <div className="col-span-7 relative aspect-[16/10] overflow-hidden">
                          <img src={primary} alt={`${project.title} mockup`} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[800ms] group-hover:scale-[1.03]" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>
                        <div className="col-span-5 relative aspect-[16/12] overflow-hidden">
                          <img src={secondary} alt={`${project.title} screen`} className="absolute inset-0 h-full w-full object-cover opacity-95 transition-transform duration-[800ms] group-hover:scale-[1.04]" />
                          <div className="absolute inset-0 border border-white/10" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-auto flex items-center justify-between px-8 pb-6">
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[0.32em] text-primary">
                      View project
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <span className="text-[11px] uppercase tracking-[0.35em] text-gray-light/60">{project.type}</span>
                  </div>
                </article>
              );
            }

            if (template === 1) {
              // Template B: Portrait cover with big masthead and side meta
              return (
                <article
                  key={project.number}
                  className="col-span-12 md:col-span-5 group relative flex h-full flex-col overflow-hidden border border-border/25 bg-gradient-to-b from-[#070709] to-black/80 shadow-[0_30px_60px_-45px_rgba(0,0,0,0.8)]"
                  style={{ animation: `revealUp 700ms ease both`, animationDelay: delay }}
                >
                  <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
                  <div className="relative px-8 pt-6 pb-5">
                    <div className="flex items-center justify-between">
                      <span className="font-body text-[10px] uppercase tracking-[0.35em] text-primary">{project.projectDate}</span>
                      <span className="font-heading text-6xl font-black text-primary/8">{project.number}</span>
                    </div>
                    <motion.h4
                      className="mt-4 font-heading text-[2.4rem] md:text-[2.6rem] font-bold uppercase tracking-tight leading-[0.95] text-foreground"
                      whileHover={{ letterSpacing: "0.06em" }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.title}
                    </motion.h4>
                    <p className="mt-4 font-body text-sm leading-[1.65] text-foreground/90">{project.description}</p>
                  </div>
                  <div className="relative mx-8 mb-6 overflow-hidden aspect-[3/4] border border-border/20">
                    <img src={primary} alt={`${project.title} cover`} className="absolute inset-0 h-full w-full object-contain bg-black/40 transition-transform duration-[850ms] group-hover:scale-[1.04]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute right-3 top-3 border border-primary/20 bg-black/60 backdrop-blur-sm px-3 py-1.5 text-[10px] uppercase tracking-[0.4em] text-primary/90">{project.category}</div>
                    <div className="absolute left-4 bottom-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-foreground/80">
                      <span className="h-px w-6 bg-primary/70" />
                      {project.type}
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between px-8 pb-6">
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.32em] text-primary">
                      Explore
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <span className="text-[11px] uppercase tracking-[0.35em] text-gray-light/60">{project.type}</span>
                  </div>
                </article>
              );
            }

            // Template C: Split poster with media left, copy right
            return (
              <article
                key={project.number}
                className="col-span-12 group relative overflow-hidden border border-border/25 bg-[#070709] shadow-[0_30px_60px_-45px_rgba(0,0,0,0.8)] md:col-span-12"
                style={{ animation: `revealUp 700ms ease both`, animationDelay: delay }}
              >
                <div className="grid grid-cols-12 gap-0">
                  <div className="col-span-12 md:col-span-6 relative border-r border-border/20">
                    <div className="relative aspect-[16/10] md:aspect-[4/3] overflow-hidden">
                      <img src={primary} alt={`${project.title} media`} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[850ms] group-hover:scale-[1.03]" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 flex h-full flex-col px-8 py-6 md:px-8 md:py-8">
                    <div className="flex items-center justify-between">
                      <span className="font-body text-[10px] uppercase tracking-[0.35em] text-gray-light/80">{project.category}</span>
                      <span className="font-body text-[10px] uppercase tracking-[0.35em] text-primary/70">{project.projectDate}</span>
                    </div>
                    <div className="mt-3 space-y-3">
                    <motion.h4
                      className="font-heading text-3xl md:text-[2.8rem] font-semibold uppercase tracking-tight text-foreground"
                      whileHover={{ letterSpacing: "0.05em" }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.title}
                    </motion.h4>
                    <p className="font-body text-sm md:text-base text-gray-light/90">{project.description}</p>
                    <div className="border-l border-border/40 pl-4">
                      <p className="font-heading text-sm uppercase tracking-[0.4em] text-primary/70">Pull Quote</p>
                      <p className="mt-2 font-body text-xs text-gray-light/70">
                        "{project.title.split(" ").slice(0, 3).join(" ")}" delivers future-facing interactions for strategic teams.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.tags.map((tag) => (
                        <span key={tag} className="border border-primary/15 bg-primary/10 px-3 py-1 font-body text-[10px] md:text-xs uppercase tracking-[0.25em] text-primary/90">{tag}</span>
                      ))}
                    </div>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-6">
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.32em] text-primary">
                      View case
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                      <span className="text-[11px] uppercase tracking-[0.35em] text-gray-light/60">{project.type}</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* More Projects */}
        <div className="mt-20 space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
                More Projects
              </span>
              <h3 className="font-heading text-3xl md:text-4xl text-foreground">Beyond the spotlight</h3>
            </div>
            <div className="flex items-center gap-6">
              <span className="font-body text-xs uppercase tracking-[0.3em] text-gray-light/70">
                {moreProjects.length} initiatives
              </span>
              <div className="flex items-center gap-3">
                <span className="font-body text-xs uppercase tracking-[0.3em] text-gray-light/60">
                  Page {currentPage} of {Math.ceil(moreProjects.length / projectsPerPage)}
                </span>
              </div>
            </div>
          </div>

          <div className="overflow-hidden border border-border/30 bg-card/40 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur">
            <div className="overflow-x-hidden">
              <table className="w-full divide-y divide-border/20">
                <colgroup>
                  <col className="w-[18%]" />
                  <col className="w-[38%]" />
                  <col className="w-[16%]" />
                  <col className="w-[14%]" />
                  <col className="w-[14%]" />
                </colgroup>
                <thead className="sticky top-0 z-10 bg-black/80 text-left uppercase tracking-[0.35em] text-xs text-gray-light backdrop-blur border-b border-border/30">
                  <tr>
                    <th className="px-6 md:px-8 py-6 font-semibold text-primary/90">Project</th>
                    <th className="px-6 md:px-8 py-6 font-semibold text-primary/90">Overview</th>
                    <th className="px-6 md:px-8 py-6 font-semibold text-primary/90">Focus</th>
                    <th className="px-6 md:px-8 py-6 font-semibold text-primary/90 text-center">Live</th>
                    <th className="px-6 md:px-8 py-6 font-semibold text-primary/90 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {moreProjects.slice((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage).map((project, idx) => (
                    <tr key={project.title} className="group transition-all duration-300 hover:bg-primary/[0.03] border-b border-border/10">
                      <td className="px-6 md:px-8 py-8 align-top font-body text-sm font-semibold uppercase tracking-[0.25em] text-foreground">
                        <div className="flex items-start gap-3">
                          <span className="font-heading text-2xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                            {String((currentPage - 1) * projectsPerPage + idx + 1).padStart(2, '0')}
                          </span>
                          <div>
                            {project.title}
                            <div className="mt-2 text-xs uppercase tracking-[0.3em] text-primary/70">{project.date}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 md:px-8 py-8 align-top font-body text-sm text-gray-light md:max-w-2xl leading-relaxed break-words">
                        {project.description}
                      </td>
                      <td className="whitespace-nowrap px-6 md:px-8 py-8 align-top">
                        <span className="inline-block border-l-2 border-primary/40 pl-3 font-body text-xs uppercase tracking-[0.3em] text-foreground/90">
                          {project.category}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 md:px-8 py-8 align-top text-center">
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:translate-x-1"
                        >
                          Visit
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-6 md:px-8 py-8 align-top text-center">
                        <span className={`inline-flex border px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.25em] ${
                          project.status === 'Live'
                            ? 'border-primary/30 bg-primary/10 text-primary'
                            : project.status === 'Research'
                            ? 'border-gray-light/30 bg-gray-light/10 text-gray-light'
                            : 'border-muted/30 bg-muted/10 text-muted-foreground'
                        }`}>
                          {project.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between border-t border-border/30 bg-black/60 px-8 py-6 backdrop-blur">
              <div className="flex items-center gap-2">
                <span className="font-body text-xs uppercase tracking-[0.3em] text-gray-light/60">
                  Showing {((currentPage - 1) * projectsPerPage) + 1} to {Math.min(currentPage * projectsPerPage, moreProjects.length)} of {moreProjects.length}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="group flex items-center gap-2 border border-border/40 bg-card/30 px-5 py-3 font-body text-xs font-semibold uppercase tracking-[0.3em] text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-border/40 disabled:hover:bg-card/30"
                >
                  <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Prev
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.ceil(moreProjects.length / projectsPerPage) }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`border px-4 py-3 font-body text-xs font-bold uppercase tracking-[0.3em] transition-all duration-300 ${
                        currentPage === page
                          ? 'border-primary bg-primary/20 text-primary'
                          : 'border-border/40 bg-card/30 text-gray-light hover:border-primary/50 hover:bg-primary/5'
                      }`}
                    >
                      {String(page).padStart(2, '0')}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(moreProjects.length / projectsPerPage)))}
                  disabled={currentPage === Math.ceil(moreProjects.length / projectsPerPage)}
                  className="group flex items-center gap-2 border border-border/40 bg-card/30 px-5 py-3 font-body text-xs font-semibold uppercase tracking-[0.3em] text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-border/40 disabled:hover:bg-card/30"
                >
                  Next
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Particles - Ambient Micro Interaction */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-2 w-2 animate-float rounded-full bg-primary/20" style={{ animationDelay: "0s" }} />
        <div className="absolute top-3/4 right-1/4 h-3 w-3 animate-float rounded-full bg-primary/10" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-3/4 h-1.5 w-1.5 animate-float rounded-full bg-primary/30" style={{ animationDelay: "4s" }} />
      </div>
    </section>
  );
};
