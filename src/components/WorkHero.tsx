export const WorkHero = () => {
  const experiences = [
    {
      year: "Current",
      company: "DiligenceVault",
      role: "Software Developer",
      url: "https://www.diligencevault.com/",
    },
    {
      year: "2025",
      company: "upGrad",
      role: "Research Intern",
      url: "https://www.upgrad.com/",
    },
    {
      year: "2024",
      company: "Outlier.AI",
      role: "AI Evaluator & Trainer",
      url: "https://outlier.ai/",
    },
    {
      year: "2024",
      company: "Psyliq",
      role: "Data Analyst Intern",
      url: "https://www.linkedin.com/company/psyliq/?originalSubdomain=in",
    },
    {
      year: "2023",
      company: "AIESEC",
      role: "Senior Manager",
      url: "https://aiesec.org/",
    },
  ];

  return (
    <section className="relative min-h-[60vh] flex items-center bg-background pt-40 pb-16 md:pt-48 md:pb-20">
      <div className="container-portfolio">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Intro Statement */}
          <div className="space-y-6">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
              I'm{" "}
              <span className="text-primary">Kedhar</span>, an AI engineer who{" "}
              <span className="italic font-light">designs</span>.
            </h1>
          </div>

          {/* Right: Experience Timeline */}
          <div className="space-y-5 md:space-y-2">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="grid grid-cols-[56px_1fr] md:grid-cols-[70px_200px_1fr] gap-x-6 md:gap-x-8 py-3 md:py-2 items-start transition-all hover:translate-x-1"
              >
                {/* Year */}
                <span className="font-body text-sm text-foreground/40 tabular-nums leading-6 md:leading-normal">
                  {exp.year}
                </span>

                {/* Mobile: Company + Role stacked */}
                <div className="md:hidden -mt-0.5">
                  {exp.url ? (
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-[15px] font-medium text-foreground leading-6 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/60"
                    >
                      {exp.company}
                    </a>
                  ) : (
                    <div className="font-body text-[15px] font-medium text-foreground leading-6">
                      {exp.company}
                    </div>
                  )}
                  <div className="font-body text-sm text-foreground/55 leading-6">
                    {exp.role}
                  </div>
                </div>

                {/* Desktop: Inline company and role */}
                {exp.url ? (
                  <a
                    href={exp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:inline font-body text-base font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/60"
                  >
                    {exp.company}
                  </a>
                ) : (
                  <span className="hidden md:block font-body text-base font-medium text-foreground">
                    {exp.company}
                  </span>
                )}
                <span className="hidden md:block font-body text-sm text-foreground/50">
                  {exp.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial from-primary/5 via-background to-background" />
    </section>
  );
};
