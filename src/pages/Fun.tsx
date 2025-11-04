import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const Fun = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;

  const moreProjects = [
    {
      title: "Portfolio Nexus",
      description:
        "Auto-updating portfolio experience with dark mode UI, live repository sync, smart search, and rating-based discovery across featured builds.",
      demo: "https://kedhareswer.github.io/My_Portfolio_Designs/",
      status: "Live",
      category: "Web Development",
      date: "Ongoing",
    },
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
      title: "ChefSpeak",
      description:
        "Voice-first cooking companion with multilingual narration, shopping lists, and ingredient detection powered by ElevenLabs and Supabase.",
      demo: "https://chef-speaks.netlify.app/",
      status: "Shelved",
      category: "Voice AI",
      date: "Jun 2025",
    },
    {
      title: "Endoscopy Image Enhancement",
      description:
        "Medical imaging enhancer leveraging deep learning pipelines to clarify endoscopy footage with 40% quality gain.",
      demo: "https://huggingface.co/spaces/Kedhareswer/EndoscopyImageEnhancement",
      status: "Research",
      category: "Medical Imaging",
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
      title: "Image to Sketch",
      description:
        "GAN-assisted transformation engine turning photos into sketches with 90% fidelity and 30% faster processing.",
      demo: "https://image-to-sketch-wine.vercel.app/",
      status: "Live",
      category: "Computer Vision",
      date: "Jan 2025",
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

  const totalPages = Math.ceil(moreProjects.length / projectsPerPage);
  const paginatedProjects = moreProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  return (
    <div className="overflow-x-hidden">
      <Navigation />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container-portfolio">
          <div className="mb-12 space-y-4">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">More Projects</span>
            <h2
              className="font-heading text-4xl md:text-5xl text-transparent"
              style={{ WebkitTextStroke: "1.25px rgba(255,255,255,0.2)", color: "transparent" }}
            >
              Extended Portfolio
            </h2>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 md:gap-6">
              {paginatedProjects.map((project, index) => (
                <article
                  key={index}
                  className="group relative overflow-hidden border border-border/20 bg-card/30 backdrop-blur transition-all duration-normal hover:border-primary/40 hover:bg-card/50"
                >
                  <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[minmax(0,1fr),minmax(0,1.5fr),auto]">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-heading text-2xl text-primary/60">{String(index + 1 + (currentPage - 1) * projectsPerPage).padStart(2, '0')}</span>
                        <span
                          className={`font-body text-xs uppercase tracking-[0.3em] px-2 py-1 ${project.status === 'Live'
                            ? 'text-green-400/80 border border-green-400/30 bg-green-400/10'
                            : project.status === 'Research'
                              ? 'text-blue-400/80 border border-blue-400/30 bg-blue-400/10'
                              : 'text-gray-400/80 border border-gray-400/30 bg-gray-400/10'
                            }`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground leading-tight">{project.title}</h3>
                      <p className="font-body text-xs uppercase tracking-[0.25em] text-gray-light/70">{project.category}</p>
                    </div>

                    <p className="font-body text-sm md:text-base text-gray-light leading-relaxed">{project.description}</p>

                    <div className="flex items-center justify-end">
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-wider text-primary transition-all hover:gap-3"
                      >
                        View
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 pt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="group flex items-center gap-1 sm:gap-2 border border-border/40 bg-card/30 px-3 sm:px-5 py-2 sm:py-3 font-body text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-border/40 disabled:hover:bg-card/30"
              >
                <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:-translate-x-1" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              <div className="flex gap-1 sm:gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`border px-3 sm:px-4 py-2 sm:py-3 font-body text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] transition-all duration-300 ${currentPage === page
                      ? 'border-primary bg-primary/20 text-primary'
                      : 'border-border/40 bg-card/30 text-gray-light hover:border-primary/50 hover:bg-primary/5'
                      }`}
                  >
                    {String(page).padStart(2, '0')}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="group flex items-center gap-1 sm:gap-2 border border-border/40 bg-card/30 px-3 sm:px-5 py-2 sm:py-3 font-body text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-border/40 disabled:hover:bg-card/30"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer quote="Even the smallest idea, acted upon daily, outshines the greatest one never started" />
    </div>
  );
};

export default Fun;
