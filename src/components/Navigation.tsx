import { useState, useEffect } from "react";
import { ExternalLink, MoreHorizontal } from "lucide-react";

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Determine active section
      const sections = ["home", "projects", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuItems = [
    { id: "home", label: "HOME" },
    { id: "projects", label: "PROJECTS" },
    { id: "contact", label: "CONTACT" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-transparent transition-all duration-normal">
      <div className="container-portfolio">
        <div className="flex h-24 items-center justify-end">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="rounded-full border border-border/30 bg-background/60 p-2 text-foreground transition-all hover:border-primary hover:text-primary"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>

          <a
            href="https://know-me-henna.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group ml-3 flex items-center gap-2 font-heading text-lg font-bold text-primary transition-all hover:animate-glow-pulse"
          >
            సంచారి?
          </a>
        </div>
      </div>

      {menuOpen && (
        <div className="container-portfolio">
          <div className="mt-2 flex justify-end">
            <div className="w-56 overflow-hidden rounded-lg border border-border/20 bg-background/95 py-3 shadow-xl backdrop-blur-md">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left font-body text-sm font-semibold uppercase tracking-wider transition-colors duration-normal ${
                    activeSection === item.id ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && <span className="h-1 w-6 rounded-full bg-primary" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
