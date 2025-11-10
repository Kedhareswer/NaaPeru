import { useState, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useChat } from "@/contexts/ChatContext";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { openChat } = useChat();

  useEffect(() => {
    const handleScroll = () => {
      // Collapse navigation after scrolling 100px
      setIsScrolled(window.scrollY > 100);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const menuItems = [
    { path: "/", label: "WORK" },
    { path: "/fun", label: "FUN" },
    { path: "/about", label: "ABOUT" },
    { path: "/resume", label: "RESUME" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-transparent transition-all duration-slow">
      <div className="container-portfolio">
        <div
          className={`flex items-center transition-all duration-slow ${
            isScrolled ? "h-20 justify-between" : "h-24 justify-between"
          }`}
        >
          {/* Left Side - Brand Info */}
          {!isScrolled && (
            <div className="flex flex-col gap-0.5 animate-fade-in">
              <h1 className="font-heading text-lg md:text-xl font-bold text-primary">KEDHAR</h1>
              <p className="font-body text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.25em] text-foreground/50">
                AI Engineer + Developer
              </p>
            </div>
          )}
          
          {/* Scrolled - Just show minimal spacing */}
          {isScrolled && <div className="md:hidden" />}

          {/* Center - Desktop Navigation - Expanded (only visible when NOT scrolled) */}
          {!isScrolled && (
            <div className="hidden md:flex items-center gap-10 animate-fade-in absolute left-1/2 -translate-x-1/2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative font-body text-sm font-medium uppercase tracking-wider transition-colors duration-normal group ${
                    isActive(item.path) ? "text-primary" : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  {item.label}
                  {/* Active indicator */}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-normal ${
                      isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </div>
          )}

          {/* Right - Desktop (when not scrolled) */}
          {!isScrolled && (
            <div className="hidden md:flex items-center gap-3 ml-auto">
              <button
                onClick={openChat}
                className="group flex items-center gap-2 font-heading text-base font-bold text-primary transition-all hover:animate-glow-pulse cursor-pointer"
              >
                సంచారి?
              </button>
            </div>
          )}

          {/* Collapsed Navigation with Dropdown (only visible when scrolled OR on mobile) */}
          {(isScrolled || isMobile) && (
            <div className="flex items-center gap-3 animate-fade-in ml-auto">
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                className="rounded-full border border-border/30 bg-background/60 p-2 text-foreground transition-all hover:border-primary hover:text-primary"
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
              >
                <MoreHorizontal className="h-5 w-5" />
              </button>

              <button
                onClick={openChat}
                className="group flex items-center gap-2 font-heading text-base sm:text-lg font-bold text-primary transition-all hover:animate-glow-pulse cursor-pointer"
              >
                సంచారి?
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="container-portfolio animate-fade-in">
          <div className="mt-2 flex justify-end">
            <div className="w-56 overflow-hidden rounded-lg border border-border/20 bg-background/95 py-3 shadow-xl backdrop-blur-md">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left font-body text-sm font-semibold uppercase tracking-wider transition-colors duration-normal ${
                    isActive(item.path) ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                  {isActive(item.path) && <span className="h-1 w-6 rounded-full bg-primary" />}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
