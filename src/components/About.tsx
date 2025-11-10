import { ArrowUpRight, Github, Linkedin, ChevronDown } from "lucide-react";
import { useState } from "react";

export const About = () => {

  const focusStreams = [
    "Applied AI platforms",
    "Data storytelling & insights",
    "Community-driven learning",
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

  const educationData = [
    {
      institution: "Lovely Professional University",
      degree: "Bachelor of Technology - Computer Science and Engineering",
      specialization: "Data Science (AI & ML)",
      period: "Sep 2021 - JUL 2025",
      location: "Phagwara, Punjab, India",
      grade: "CGPA: 7.74",
      status: "Completed",
      description: "Specialized in Data Science with focus on Artificial Intelligence and Machine Learning. Comprehensive coursework in algorithms, data structures, and advanced AI techniques."
    },
    {
      institution: "Sri Siddhartha Junior College",
      degree: "Intermediate",
      specialization: "Science Stream",
      period: "Jul 2019 - Jun 2021",
      location: "Madanapalli, Andhra Pradesh, India",
      grade: "Marks: 889",
      status: "Completed",
      description: "Strong foundation in mathematics, physics, and chemistry. Developed analytical thinking and problem-solving skills essential for technical education."
    },
    {
      institution: "Vijaya Bharathi English Medium High School",
      degree: "Matriculation",
      specialization: "General Studies",
      period: "Jun 2018 - Mar 2019",
      location: "Madanapalli, Andhra Pradesh, India",
      grade: "GPA: 9.5",
      status: "Completed",
      description: "Excellent academic performance with strong foundation in core subjects. Developed communication skills and leadership qualities through various activities."
    }
  ];

  return (
    <div className="relative bg-background py-3xl md:py-4xl overflow-x-hidden overflow-y-visible">
      <div className="container-portfolio">
        {/* My Presence Section - REDESIGNED */}
        <section className="mb-32 space-y-12 overflow-hidden">
          
          {/* Header with Ghost Typography */}
          <div className="relative">
            <h2 
              className="font-heading text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[14rem] leading-none tracking-tighter text-foreground/5 select-none"
            >
              ABOUT
            </h2>
            <div className="absolute inset-0 flex items-center">
              <div className="space-y-4">
                <span className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
                  My Presence
                </span>
                <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground max-w-4xl">
                  Marlakunta Kedhareswer Naidu
                </h3>
              </div>
            </div>
          </div>

          {/* Bio & Stats Grid */}
          <div className="grid gap-8 lg:grid-cols-[1.5fr,1fr]">
            {/* Left: Bio */}
            <div className="space-y-6">
              <p className="font-body text-lg sm:text-xl text-gray-light leading-relaxed max-w-3xl">
                I don't fit into one box — I'm a <span className="text-foreground font-semibold">Data Scientist</span>, <span className="text-foreground font-semibold">AI Engineer</span>, <span className="text-foreground font-semibold">Designer</span>, and relentless experimenter.
              </p>
              <p className="font-body text-base sm:text-lg text-gray-light/80 leading-relaxed max-w-3xl">
                I design intelligence and shape it into experiences people actually feel. Exploring how AI-driven systems and human-centered design can coexist beautifully — and meaningfully.
              </p>
              
              {/* Status Indicator */}
              <div className="flex items-center gap-3 pt-4">
                <span className="font-body text-sm uppercase tracking-[0.3em] text-foreground/80">Open to Collaborate</span>
                <div className="relative">
                  <div className="h-3 w-3 rounded-full bg-primary animate-ping absolute" />
                  <div className="h-3 w-3 rounded-full bg-primary" />
                </div>
              </div>
            </div>

            {/* Right: Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border-l-2 border-primary/50 pl-4 space-y-1">
                <p className="font-heading text-4xl text-foreground">1+</p>
                <p className="font-body text-xs uppercase tracking-[0.3em] text-gray-light/70">Years</p>
              </div>
              <div className="border-l-2 border-primary/30 pl-4 space-y-1">
                <p className="font-heading text-4xl text-foreground">10+</p>
                <p className="font-body text-xs uppercase tracking-[0.3em] text-gray-light/70">Projects</p>
              </div>
              <div className="border-l-2 border-primary/30 pl-4 space-y-1">
                <p className="font-heading text-4xl text-foreground">4</p>
                <p className="font-body text-xs uppercase tracking-[0.3em] text-gray-light/70">Domains</p>
              </div>
              <div className="border-l-2 border-primary/30 pl-4 space-y-1">
                <p className="font-heading text-4xl text-foreground">∞</p>
                <p className="font-body text-xs uppercase tracking-[0.3em] text-gray-light/70">Ideas</p>
              </div>
            </div>
          </div>

          {/* Expertise & Focus Grid */}
          <div className="grid gap-8 lg:grid-cols-2">
            
            {/* Expertise */}
            <div className="border border-border/25 bg-card/30 p-8 backdrop-blur">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-primary/50" />
                  <span className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">Expertise</span>
                </div>
                
                <div className="space-y-4">
                  <div className="group">
                    <h4 className="font-heading text-lg text-foreground group-hover:text-primary transition-colors">AI & Machine Learning</h4>
                    <p className="font-body text-sm text-gray-light/70 mt-1">LLMs · RAG Systems · Prompt Engineering · Model Fine-tuning</p>
                  </div>
                  <div className="h-px bg-border/20" />
                  
                  <div className="group">
                    <h4 className="font-heading text-lg text-foreground group-hover:text-primary transition-colors">Data Science</h4>
                    <p className="font-body text-sm text-gray-light/70 mt-1">Analytics · Visualization · Statistical Modeling · Storytelling</p>
                  </div>
                  <div className="h-px bg-border/20" />
                  
                  <div className="group">
                    <h4 className="font-heading text-lg text-foreground group-hover:text-primary transition-colors">Product Design</h4>
                    <p className="font-body text-sm text-gray-light/70 mt-1">UX Research · Interface Design · Prototyping · Design Systems</p>
                  </div>
                  <div className="h-px bg-border/20" />
                  
                  <div className="group">
                    <h4 className="font-heading text-lg text-foreground group-hover:text-primary transition-colors">Full-Stack Development</h4>
                    <p className="font-body text-sm text-gray-light/70 mt-1">React · Node.js · Python · FastAPI · Cloud Platforms</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Focus & Current Work */}
            <div className="space-y-8">
              {/* Focus Streams */}
              <div className="border border-border/25 bg-card/30 p-8 backdrop-blur">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-primary/50" />
                    <span className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">Focus Streams</span>
                  </div>
                  <div className="space-y-3">
                    {focusStreams.map((stream, index) => (
                      <div key={stream} className="flex items-start gap-3">
                        <span className="font-heading text-primary text-sm mt-0.5">{String(index + 1).padStart(2, '0')}</span>
                        <p className="font-body text-sm text-foreground">{stream}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Currently Building */}
              <div className="border border-border/25 bg-card/30 p-8 backdrop-blur">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-primary/50" />
                    <span className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">Currently Building</span>
                  </div>
                  <div className="space-y-2">
                    <p className="font-body text-sm text-foreground">→ ThesisFlow-AI</p>
                    <p className="font-body text-sm text-foreground">→ Quater Master</p>
                    <p className="font-body text-sm text-foreground">→ Legal Ease</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* Education Section */}
        <div className="mb-24 space-y-8">
          <div className="space-y-6">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
              Education
            </span>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr),minmax(0,1.4fr)]">
              <h2
                className="font-heading text-3xl sm:text-4xl md:text-5xl text-transparent"
                style={{ WebkitTextStroke: "1.25px rgba(255,255,255,0.2)", color: "transparent" }}
              >
                Academic Chronicle
              </h2>
              <p className="font-body text-base sm:text-lg text-gray-light">
                My academic background in computer science, data science, and artificial intelligence with specialized focus on machine learning.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {educationData.map((edu, index) => (
              <div
                key={index}
                className="group relative overflow-hidden border border-border/20 bg-card/40 backdrop-blur transition-all duration-normal hover:border-primary/40 hover:bg-card/60"
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-primary/60" />
                <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr),minmax(0,1.35fr)]">
                  <div className="flex flex-col justify-between gap-6">
                    <div className="space-y-1.5">
                      <h3 className="font-body text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                        {edu.institution}
                      </h3>
                      <div className="space-y-1">
                        <p className="font-body text-xs uppercase tracking-[0.3em] text-gray-light/70">
                          {edu.period}
                        </p>
                        <p className="font-body text-xs text-gray-light/60">
                          {edu.location}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-heading text-xl sm:text-2xl font-semibold text-foreground leading-tight">
                        {edu.degree}
                      </h4>
                      {edu.specialization && (
                        <p className="font-body text-sm text-primary/80">
                          {edu.specialization}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col justify-between gap-6">
                    <p className="font-body text-sm sm:text-base text-gray-light leading-relaxed">
                      {edu.description}
                    </p>
                    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr),auto] sm:items-center">
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                        <span className="inline-flex h-px w-8 bg-primary/40" />
                        <span className="relative inline-block h-16 w-16 sm:h-18 sm:w-18 select-none text-[#0b7a52]" aria-label={`${edu.status} stamp`} title={edu.status}>
                          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
                            <defs>
                              <filter id="roughen" x="-10%" y="-10%" width="120%" height="120%">
                                <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="3" result="noise" />
                                <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" xChannelSelector="R" yChannelSelector="G" />
                              </filter>
                            </defs>
                            <g filter="url(#roughen)">
                              {/* faint ink fill */}
                              <circle cx="50" cy="50" r="48" fill="currentColor" opacity="0.12" />
                              {/* main ring */}
                              <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="3.25" fill="none" opacity="0.95" />
                              {/* secondary imperfect ring */}
                              <g transform="translate(1 1)">
                                <circle cx="49" cy="49" r="41" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 2" fill="none" opacity="0.55" />
                              </g>
                              {/* text */}
                              <g transform="rotate(-8 50 50)">
                                <text
                                  x="50"
                                  y="53"
                                  textAnchor="middle"
                                  fill="currentColor"
                                  fontWeight="900"
                                  dominantBaseline="middle"
                                  fontSize={(edu.status?.length ?? 6) > 10 ? 10 : (edu.status?.length ?? 6) > 7 ? 12 : 15}
                                  style={{ letterSpacing: (edu.status?.length ?? 6) > 10 ? '0.8px' : (edu.status?.length ?? 6) > 7 ? '1.2px' : '1.8px' }}
                                >
                                  {(edu.status?.toUpperCase?.() || 'STATUS') as unknown as string}
                                </text>
                              </g>
                            </g>
                          </svg>
                        </span>
                      </div>
                      <span className="font-body text-sm font-semibold text-foreground sm:text-base">
                        {edu.grade}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
