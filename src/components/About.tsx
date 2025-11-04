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
        {/* My Presence Section */}
        <section className="mb-24 grid gap-12 lg:grid-cols-[minmax(0,1.7fr),minmax(0,1fr)] overflow-hidden">
          <div className="space-y-8 overflow-hidden">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
              My Presence
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground break-words">
              Marlakunta Kedhareswer Naidu
            </h2>
            <p className="max-w-2xl font-body text-base sm:text-lg text-gray-light">
              I don't fit into one box — I'm a Data Scientist, AI Engineer, Designer, and relentless experimenter.
              I design intelligence and shape it into experiences people actually feel.
              Exploring how AI-driven systems and human-centered design can coexist beautifully — and meaningfully.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 overflow-hidden">
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
                  className="group flex items-center justify-between rounded-lg border border-border/20 bg-card/50 p-4 sm:p-5 transition-all duration-normal hover:border-primary/50 hover:bg-card/70 overflow-hidden"
                >
                  <div className="flex items-center gap-2 sm:gap-3 font-body min-w-0 flex-1">
                    <span className="rounded-full border border-primary/30 p-2 text-primary/90 flex-shrink-0">
                      {item.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-light/80">{item.label}</p>
                      <p className="text-sm sm:text-base font-semibold text-foreground truncate">{item.handle}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-primary transition-transform duration-normal group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0 ml-2" />
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

          <div className="relative overflow-hidden">
            <div className="absolute inset-0 rounded-xl bg-primary/10 blur-3xl" />
            <div className="relative flex h-full flex-col justify-between rounded-xl border border-border/25 bg-black/40 p-6 sm:p-8 backdrop-blur overflow-hidden">
              <div className="space-y-3">
                <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] sm:tracking-[0.35em] text-primary/80">Availability</span>
                <p className="font-heading text-xl sm:text-2xl text-foreground break-words">Open for applied AI & data leadership mandates.</p>
                <p className="font-body text-sm text-gray-light">
                  Collaborating with teams building intelligent research platforms, data products, and developer tooling.
                </p>
              </div>

              <div className="space-y-4 pt-6">
                <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-gray-light/70">Open source contributions</span>
                <div className="space-y-3">
                  {openSourceContributions.map((contrib) => (
                    <a
                      key={contrib.name}
                      href={contrib.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start justify-between gap-3 sm:gap-6 rounded-lg border border-border/20 bg-card/35 p-3 sm:p-4 transition-all duration-normal hover:border-primary/40 hover:bg-card/60 overflow-hidden"
                    >
                      <div className="space-y-1 min-w-0 flex-1">
                        <p className="font-body text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-foreground break-words">{contrib.name}</p>
                        <p className="font-body text-xs text-gray-light/80">{contrib.summary}</p>
                      </div>
                      <ArrowUpRight className="mt-1 h-4 w-4 text-primary transition-transform duration-normal group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0" />
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
                        <span className="font-body text-xs uppercase tracking-[0.3em] text-primary/70">
                          {edu.status}
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
