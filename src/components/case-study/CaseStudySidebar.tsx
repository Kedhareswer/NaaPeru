import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type CaseStudyNavItem = { id: string; label: string };

/** Fixed sticky scroll-spy "Contents" nav (large screens). Extracted from the per-page duplicate. */
export function CaseStudySidebar({ sections }: { sections: CaseStudyNavItem[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const handleScroll = () => {
      const els = sections.map((s) => document.getElementById(s.id));
      const y = window.scrollY + 200;
      for (let i = els.length - 1; i >= 0; i--) {
        const el = els[i];
        if (el && el.offsetTop <= y) {
          setActive(sections[i].id);
          break;
        }
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
  };

  return (
    <aside className="hidden lg:block fixed left-8 top-40 w-44 z-30">
      <p className="font-body text-[8px] uppercase tracking-[0.45em] text-foreground/25 mb-4">Contents</p>
      <nav className="border-l border-border/15">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className={cn(
              "block w-full text-left pl-3 pr-2 py-1.5 font-body text-[11px] tracking-wide transition-colors",
              active === s.id
                ? "text-primary font-semibold border-l-2 border-primary -ml-px"
                : "text-foreground/35 hover:text-foreground/60"
            )}
          >
            {s.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
