import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import heroImage from "@/assets/me.webp";

export const Hero = () => {
  const KaggleIcon = ({ className = "" }: { className?: string }) => (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Stylized 'K' */}
      <path d="M6 4v16" />
      <path d="M6 12l12-8" />
      <path d="M10 12l8 8" />
    </svg>
  );
  const Dev21Icon = ({ className = "" }: { className?: string }) => (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Stylized '2' */}
      <path d="M7 8c0-2 1.5-3 3.5-3S14 6 14 8c0 1.6-1 2.4-3 3.5C9 12.8 8 13.5 8 16h8" />
      {/* Stylized '1' */}
      <path d="M18 5v14" />
      <path d="M16 7l2-2 2 2" />
    </svg>
  );
  const tickerWords = ["CREATE", "INNOVATE", "DESIGN", "EXPERIMENT",""];
  const tickerRepeatCount = 8;
  const legacyRoles = ["GEN AI", "DESIGNER", "DEVELOPER", "DATA SCIENTIST"];
  const legacyRolesLine = legacyRoles.join(" / ");
  const socials = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/kedhareswernaidu/",
      icon: Linkedin,
    },
    {
      label: "Email",
      href: "mailto:kedhareswer.12110626@gmail.com",
      icon: Mail,
    },
    {
      label: "GitHub",
      href: "https://github.com/Kedhareswer",
      icon: Github,
    },
    {
      label: "Kaggle",
      href: "https://www.kaggle.com/kedhareswernaidu",
      icon: KaggleIcon,
    },
    {
      label: "21st.dev",
      href: "https://21st.dev/community/kedhar",
      icon: Dev21Icon,
    },
  ];

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-start overflow-x-hidden overflow-y-visible bg-background pt-20 pb-12 sm:pt-24 sm:pb-16 lg:flex-row lg:items-center lg:pt-0 lg:pb-0"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-background to-background" />

      {/* Full-width Ticker Strip */}
      <div className="pointer-events-none absolute inset-x-0 top-[32%] z-0 xs:top-[34%] sm:top-[32%] md:top-[28%] lg:top-[29%]">
        <div className="transform-gpu sm:-rotate-1 lg:-rotate-3">
          <div className="ticker-strip">
            <div className="ticker-content flex w-max items-center whitespace-nowrap py-2 sm:py-3 md:py-4 text-[0.6rem] sm:text-xs md:text-sm font-semibold uppercase tracking-[0.25em] sm:tracking-[0.35em] text-black animate-ticker">
              {[0, 1].map((duplicateIndex) => (
                <div key={duplicateIndex} className="flex shrink-0 items-center gap-4 sm:gap-6 md:gap-8">
                  {Array.from({ length: tickerRepeatCount }).map((_, blockIndex) => (
                    <span key={`${duplicateIndex}-${blockIndex}`} className="flex items-center gap-4 sm:gap-6 md:gap-8">
                      {tickerWords.map((word, wordIndex) => (
                        <span key={`${duplicateIndex}-${blockIndex}-${word}-${wordIndex}`} className="flex items-center gap-4 sm:gap-6 md:gap-8">
                          {word}
                          {wordIndex < tickerWords.length - 1 && <span className="text-black">•</span>}
                        </span>
                      ))}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container-portfolio relative z-10">
        <div className="grid-12 items-start gap-6 sm:gap-8 md:gap-10 lg:items-center lg:gap-12">
          {/* Left Content */}
          <div className="order-2 col-span-4 w-full mt-16 sm:mt-24 md:mt-32 lg:mt-40 xl:mt-48 space-y-4 sm:space-y-5 md:col-span-8 md:space-y-6 lg:order-1 lg:col-span-7 lg:space-y-8">
            {/* Headline */}
            <h1
              className="animate-slide-up max-w-3xl text-lg sm:text-xl md:text-2xl font-normal leading-snug sm:leading-tight"
              style={{ animationDelay: "200ms", color: "#ffffff" }}
            >
              <span className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-primary">I</span> design and build intelligent systems & beautiful interfaces. Currently exploring the intersection of AI-driven products and human-centered design.
            </h1>

            <p
              className="animate-slide-up max-w-2xl font-normal italic text-sm sm:text-base"
              style={{ animationDelay: "600ms", fontFamily: "Inter, sans-serif", color: "#8a8a8a" }}
            >
              Building experiences powered by intelligence, driven by design.
            </p>

            <div
              className="animate-slide-up flex flex-wrap items-center gap-4 pt-2"
              style={{ animationDelay: "800ms" }}
            >
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="group rounded-full border border-foreground/20 p-2 transition-all duration-300 hover:border-primary/60"
                >
                  <Icon className="h-5 w-5 text-foreground/60 transition-colors duration-300 group-hover:text-primary fill-transparent group-hover:fill-primary" />
                </a>
              ))}
            </div>

          </div>

          {/* Right Visual */}
          <div className="order-1 col-span-4 w-full md:col-span-8 lg:order-2 lg:col-span-5 relative">
            <div
              className="relative aspect-[3/4] overflow-hidden rounded sm:aspect-[4/3] lg:aspect-[3/4]"
            >
              {/* Top Right - HEIGHT */}
              <div className="absolute right-3 top-3 sm:right-4 sm:top-4 md:right-6 md:top-6 z-20 flex flex-col items-end gap-0.5 sm:gap-1">
                <span className="font-heading text-[0.6rem] sm:text-xs uppercase tracking-widest text-primary/70">
                  HEIGHT
                </span>
                <span className="font-heading text-sm sm:text-base md:text-lg font-medium text-primary" style={{
                  letterSpacing: '0.02em'
                }}>
                  175 CM
                </span>
              </div>

              <img
                src={heroImage}
                alt="Professional portrait"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="h-full w-full object-cover"
                style={{
                  filter: "grayscale(100%) contrast(1.2)",
                  opacity: 0.9,
                  maskImage:
                    "radial-gradient(circle at 32% 30%, rgba(255,255,255,1) 48%, rgba(255,255,255,0.55) 70%, rgba(255,255,255,0) 92%)",
                  WebkitMaskImage:
                    "radial-gradient(circle at 32% 30%, rgba(255,255,255,1) 48%, rgba(255,255,255,0.55) 70%, rgba(255,255,255,0) 92%)",
                  maskSize: "140% 140%",
                  WebkitMaskSize: "140% 140%",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-transparent to-transparent mix-blend-multiply" />

              {/* Circular Badge */}
              <div className="absolute left-4 bottom-32 sm:left-6 sm:bottom-36 md:left-8 md:bottom-40 lg:left-10 lg:bottom-48 flex h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 rotate-[-8deg] items-center justify-center rounded-full border border-primary/60 bg-background/60 text-center font-heading text-[0.5rem] sm:text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-primary/90 shadow-[0_18px_40px_rgba(255,0,0,0.25)] backdrop-blur z-20">
                <div className="absolute inset-1 rounded-full border border-dashed border-primary/50" aria-hidden="true" />
                <span className="relative block px-2 sm:px-3 leading-tight">
                  Kedharewer
                </span>
              </div>

              {/* Bottom Left - AGE */}
              <div className="absolute left-3 bottom-3 sm:left-4 sm:bottom-4 md:left-6 md:bottom-6 z-20 flex flex-col gap-0.5 sm:gap-1">
                <span className="font-heading text-[0.6rem] sm:text-xs uppercase tracking-widest text-primary/70">
                  AGE
                </span>
                <span className="font-heading text-sm sm:text-base md:text-lg font-medium text-primary" style={{
                  letterSpacing: '0.02em'
                }}>
                  21 YRS
                </span>
              </div>

            </div>

            {/* Floating Element */}
            <div className="absolute right-0 top-0 sm:-right-4 sm:-top-4 h-24 w-24 sm:h-32 sm:w-32 animate-float rounded-full bg-primary/20 blur-3xl" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 sm:bottom-14 md:bottom-16 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 sm:gap-2">
        <span className="font-body text-[0.6rem] sm:text-xs uppercase tracking-wider text-foreground/60">SCROLL</span>
        <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 animate-bounce text-foreground/60" />
      </div>

      {/* Legacy Roles Strip */}
      <div className="absolute bottom-12 sm:bottom-14 md:bottom-16 left-0 hidden sm:block w-full">
        <div className="container-portfolio">
          <span className="font-heading text-[0.6rem] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary/70 whitespace-nowrap overflow-hidden text-ellipsis block">
            {legacyRolesLine}
          </span>
        </div>
      </div>
    </section>
  );
};
