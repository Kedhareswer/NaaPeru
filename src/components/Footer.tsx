import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

export const Footer = () => {
  const socialLinks = [
    {
      label: "GitHub",
      href: "https://github.com/Kedhareswer",
      Icon: () => <Github className="h-5 w-5" />,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/kedhareswernaidu/",
      Icon: () => <Linkedin className="h-5 w-5" />,
    },
    {
      label: "Kaggle",
      href: "https://www.kaggle.com/kedhareswernaidu",
      Icon: () => (
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-heading text-xs font-bold text-primary">
          K
        </span>
      ),
    },
    {
      label: "21st.dev",
      href: "https://21st.dev/community/kedhar",
      Icon: () => (
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-primary/30 bg-primary/5 font-heading text-[10px] font-bold text-primary">
          21
        </span>
      ),
    },
  ];

  return (
    <footer id="contact" className="relative border-t border-border/10 bg-background">
      {/* Final CTA Section */}
      <div className="container-portfolio py-16 md:py-24">
        <div className="flex flex-col items-center gap-4 text-center lg:flex-row lg:items-center lg:justify-center lg:gap-8">
          <div className="relative flex items-center justify-center">
            <span className="pointer-events-none absolute h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,_rgba(255,84,58,0.45)_0%,_rgba(0,0,0,0)_70%)] blur-xl opacity-80 animate-[pulse_6s_ease-in-out_infinite] md:h-[26rem] md:w-[26rem] lg:h-[30rem] lg:w-[30rem]" />
            <span className="pointer-events-none absolute h-[28rem] w-[28rem] rounded-full border border-primary/20 opacity-50 animate-[ping_8s_ease-in-out_infinite] md:h-[32rem] md:w-[32rem] lg:h-[36rem] lg:w-[36rem]" />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#ff6243]/15 via-transparent to-[#05090f]/60 blur-3xl" />
            <img
              src="/elements4.png"
              alt="Decorative emblem"
              className="relative z-10 h-auto w-[24rem] md:w-[30rem] lg:w-[38rem] drop-shadow-[0_45px_120px_rgba(255,84,58,0.45)]"
            />
          </div>
        </div>
      </div>

      {/* Information Grid */}
      <div className="border-t border-border/10 bg-surface-subtle">
        <div className="container-portfolio py-12 md:py-16">
          <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-2 md:max-w-2xl">
              {/* Contact */}
              <div>
                <h3 className="mb-6 font-body text-xs font-medium uppercase tracking-[0.15em] text-primary">
                  CONTACT
                </h3>
                <div className="space-y-3">
                  <a
                    href="mailto:kedhareswer.12110626@gmail.com"
                    className="flex items-center gap-2 font-body text-base font-medium text-foreground transition-colors hover:text-primary"
                  >
                    <Mail className="h-4 w-4" />
                    kedhareswer.12110626@gmail.com
                  </a>
                  <a
                    href="tel:+919398911432"
                    className="flex items-center gap-2 font-body text-base text-foreground/70 transition-colors hover:text-primary"
                  >
                    <Phone className="h-4 w-4" />
                    +91 939 891 1432
                  </a>
                  <div className="flex items-center gap-2 font-body text-base text-foreground/70">
                    <MapPin className="h-4 w-4" />
                    Madanapalli, Andhra Pradesh, India
                  </div>
                </div>
              </div>

              {/* Connect */}
              <div>
                <h3 className="mb-6 font-body text-xs font-medium uppercase tracking-[0.15em] text-primary">
                  CONNECT
                </h3>
                <div className="space-y-3">
                  {socialLinks.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-body text-base text-foreground/70 transition-all hover:scale-105 hover:text-primary"
                    >
                      <Icon />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex w-full items-center justify-center md:w-auto md:justify-end">
              <img
                src="/elements3.png"
                alt="Stylized interface elements"
                className="w-full max-w-[10.5rem] md:max-w-[14rem]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border/10">
        <div className="container-portfolio py-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-center">
            <p className="max-w-3xl text-left font-body text-sm italic text-foreground/60 md:text-base">
              "Even the smallest idea, acted upon daily, outshines the greatest one never started"
            </p>
            <a
              href="https://know-me-henna.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-xl font-bold text-primary transition-all hover:animate-glow-pulse"
            >
              సంచారి?
            </a>
          </div>
        </div>
      </div>

      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
    </footer>
  );
};
