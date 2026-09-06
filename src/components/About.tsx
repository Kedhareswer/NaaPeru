import { ArrowUpRight, Github, Linkedin, ChevronDown, Award, ExternalLink, BookmarkCheck, Download } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { GitHubActivity } from "./GitHubActivity";
import { ScrollScrubCounter } from "./ScrollScrubCounter";

export const About = () => {
  // Ghost ABOUT parallax — word translates horizontally as section scrolls past
  const ghostSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: ghostProgress } = useScroll({
    target: ghostSectionRef,
    offset: ["start end", "end start"],
  });
  const ghostX = useTransform(ghostProgress, [0, 1], ["8%", "-22%"]);

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

  const certifications = [
    {
      title: "Introduction to Model Context Protocol",
      issuer: "Anthropic Education",
      date: "August 05, 2025",
      verifyUrl: "#",
    },
    {
      title: "Project: Deep Research with LangGraph",
      issuer: "LangChain Academy",
      date: "August 24, 2025",
      verifyUrl: "#",
    },
    {
      title: "Neo4j Certified Professional",
      issuer: "Neo4j",
      date: "July 2025",
      verifyUrl: "#",
    },
    {
      title: "Python for Data Science",
      issuer: "Infosys",
      date: "May 2025",
      verifyUrl: "#",
    },
    {
      title: "Introduction to Responsible AI",
      issuer: "Google",
      date: "November 2024",
      verifyUrl: "#",
    },
  ];

  return (
    <div className="relative bg-background py-3xl md:py-4xl overflow-x-hidden overflow-y-visible">
      <div className="container-portfolio">
        {/* My Presence Section - REDESIGNED */}
        <section ref={ghostSectionRef} className="mb-32 space-y-12 overflow-visible md:overflow-hidden">

          {/* Header with Ghost Typography — ABOUT parallaxes horizontally as section scrolls */}
          <div className="relative overflow-hidden">
            <motion.h2
              className="font-heading text-[5rem] sm:text-[8rem] md:text-[12rem] lg:text-[14rem] leading-none tracking-tighter text-foreground/5 select-none whitespace-nowrap"
              style={{ x: ghostX }}
            >
              ABOUT
            </motion.h2>
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
                I build things across <span className="text-foreground font-semibold">AI</span>, <span className="text-foreground font-semibold">data</span>, and <span className="text-foreground font-semibold">design</span> — whatever the problem needs, that's the hat I wear.
              </p>
              <p className="font-body text-base sm:text-lg text-gray-light/80 leading-relaxed max-w-3xl">
                Most of my work sits at the intersection of machine learning and real products. I care about making AI useful, not just impressive — systems that people can actually work with day to day.
              </p>
              
              {/* Status Indicator + Resume CTA */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <span className="font-body text-sm uppercase tracking-[0.3em] text-foreground/80">Open to Collaborate</span>
                  <div className="relative h-3 w-3">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary"
                      initial={{ scale: 1, opacity: 1 }}
                      whileInView={{ scale: 2.6, opacity: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 1.4, ease: [0, 0, 0.2, 1] }}
                    />
                    <div className="absolute inset-0 rounded-full bg-primary" />
                  </div>
                </div>

                <a
                  href="/resume.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 border border-primary/50 px-5 py-2.5 font-body text-xs font-bold uppercase tracking-[0.25em] text-foreground transition-all duration-300 hover:border-primary hover:bg-primary hover:text-background"
                >
                  <Download className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
                  Resume
                </a>
              </div>
            </div>

            {/* Right: Quick Stats — counters scrub from 0 → target as section enters viewport */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border-l-2 border-primary/50 pl-4 space-y-1">
                <p className="font-heading text-4xl text-foreground">
                  <ScrollScrubCounter target={1} suffix="+" />
                </p>
                <p className="font-body text-xs uppercase tracking-[0.3em] text-gray-light/70">Years</p>
              </div>
              <div className="border-l-2 border-primary/30 pl-4 space-y-1">
                <p className="font-heading text-4xl text-foreground">
                  <ScrollScrubCounter target={10} suffix="+" />
                </p>
                <p className="font-body text-xs uppercase tracking-[0.3em] text-gray-light/70">Projects</p>
              </div>
              <div className="border-l-2 border-primary/30 pl-4 space-y-1">
                <p className="font-heading text-4xl text-foreground">
                  <ScrollScrubCounter target={4} />
                </p>
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

        {/* GitHub Activity Heatmap */}
        <GitHubActivity />

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
                Where I studied and what I studied — CS undergrad with a deep dive into data science and ML.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {educationData.map((edu, index) => {
              // "CGPA: 7.74" -> label + value, so the number can be set as a stat
              // instead of buried in a sentence fragment.
              const [gradeLabel, gradeValue] = edu.grade.includes(":")
                ? edu.grade.split(":").map((part) => part.trim())
                : ["Result", edu.grade];

              return (
                <article
                  key={index}
                  className="group relative overflow-hidden border border-border/20 bg-card/40 backdrop-blur transition-colors duration-fast ease-confident hover:border-primary/40 hover:bg-card/60"
                >
                  {/* Left rule thickens on hover — the one moving part, and it
                      moves 1px. Enough to acknowledge the pointer, not enough to
                      shift anything around it. */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-full w-[2px] bg-primary/50 transition-[width,background-color] duration-fast ease-confident group-hover:w-[3px] group-hover:bg-primary"
                  />

                  <div className="p-6 sm:p-8">
                    {/* Header rule: who, and when. The period was floating loose
                        under the institution; opposite it, the pair reads as one
                        line and the dates stay scannable down the column. */}
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border/15 pb-4">
                      <h3 className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-primary sm:text-sm">
                        {edu.institution}
                      </h3>
                      <p className="font-body text-[11px] uppercase tracking-[0.28em] text-gray-light/60">
                        {edu.period}
                      </p>
                    </div>

                    {/* Degree carries the weight; the grade sits opposite it as a
                        stat rather than as a stray label at the far edge of the
                        card, so the two things a reader actually scans for are on
                        the same line. */}
                    <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
                      <div className="min-w-0 space-y-1.5">
                        <h4 className="font-heading text-xl font-semibold leading-tight text-foreground sm:text-2xl">
                          {edu.degree}
                        </h4>
                        {edu.specialization && (
                          <p className="font-body text-sm text-primary/80">
                            {edu.specialization}
                          </p>
                        )}
                      </div>
                      <div className="shrink-0 sm:text-right">
                        <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gray-light/50">
                          {gradeLabel}
                        </p>
                        <p className="mt-1 font-heading text-2xl leading-none text-foreground sm:text-3xl">
                          {gradeValue}
                        </p>
                      </div>
                    </div>

                    <p className="mt-5 max-w-2xl font-body text-sm leading-relaxed text-gray-light sm:text-base">
                      {edu.description}
                    </p>

                    <p className="mt-5 font-body text-xs text-gray-light/50">
                      {edu.location}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="mb-24 space-y-8">
          <div className="space-y-6">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
              Certifications
            </span>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr),minmax(0,1.4fr)]">
              <h2
                className="font-heading text-3xl sm:text-4xl md:text-5xl text-transparent"
                style={{ WebkitTextStroke: "1.25px rgba(255,255,255,0.2)", color: "transparent" }}
              >
                Credentials
              </h2>
              <p className="font-body text-base sm:text-lg text-gray-light">
                Courses and exams I've completed — the ones that actually taught me something.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="grid grid-cols-3 gap-6" style={{ minWidth: "820px" }}>
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="group relative border-2 border-dashed border-foreground/20 bg-foreground/[0.03] backdrop-blur transition-all duration-normal hover:border-foreground/30"
              >
                <div className="p-6 lg:p-8 text-center space-y-3">
                  <BookmarkCheck className="h-6 w-6 text-foreground/60 mx-auto" />

                  <div className="space-y-1">
                    <p className="font-heading text-sm uppercase tracking-[0.4em] text-foreground/90 font-bold">
                      Certificate
                    </p>
                    <p className="font-body text-[10px] uppercase tracking-[0.35em] text-foreground/50">
                      of {cert.title}
                    </p>
                  </div>

                  <p className="font-body text-xs italic text-foreground/40">
                    This is to certify that
                  </p>
                  <p className="font-heading text-lg text-foreground font-semibold">
                    Kedhareswer
                  </p>

                  <div className="flex items-center justify-center gap-2">
                    <div className="h-px w-12 bg-foreground/20" />
                    <p className="font-body text-xs text-foreground/50">
                      {cert.issuer} — {cert.date}
                    </p>
                    <div className="h-px w-12 bg-foreground/20" />
                  </div>

                  <div className="pt-2">
                    <Award className="h-5 w-5 text-foreground/30 mx-auto mb-1" />
                    <p className="font-body text-[10px] uppercase tracking-[0.3em] text-foreground/40">
                      Awarded on: {cert.date}
                    </p>
                  </div>

                  {cert.verifyUrl && cert.verifyUrl !== "#" && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-body text-xs text-primary/70 hover:text-primary transition-colors"
                    >
                      Verify Certificate
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
