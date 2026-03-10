import { useEffect, useRef, useState } from "react";

const TELUGU_CHARS = ["క", "ఖ", "గ", "ఘ", "చ", "ట", "డ", "త", "న", "ప", "మ", "య", "ర", "ల", "వ", "శ", "స", "హ"];

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const teluguRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [teluguChar, setTeluguChar] = useState("");
  const [showTelugu, setShowTelugu] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(0);

  useEffect(() => {
    // Detect touch devices
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setIsTouch(true);
      return;
    }

    // Hide default cursor
    document.documentElement.style.cursor = "none";

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (dotRef.current) {
          dotRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%)`;
        }
        if (teluguRef.current) {
          teluguRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%)`;
        }
      });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a, button, [role='button'], input, textarea, select, [data-cursor='expand']") !== null;
      setIsHovering(isInteractive);

      // Telugu flash on Sanchari button
      const isSanchari = target.closest("[data-cursor='sanchari']") !== null;
      if (isSanchari && !showTelugu) {
        const char = TELUGU_CHARS[Math.floor(Math.random() * TELUGU_CHARS.length)];
        setTeluguChar(char);
        setShowTelugu(true);
        setTimeout(() => setShowTelugu(false), 600);
      }
    };

    const onMouseLeave = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = "translate(-100px, -100px)";
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [showTelugu]);

  if (isTouch) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000] will-change-transform"
        style={{ transform: "translate(-100px, -100px)" }}
      >
        <div
          className="rounded-full border transition-all duration-200 ease-smooth"
          style={{
            width: isHovering ? 28 : 8,
            height: isHovering ? 28 : 8,
            backgroundColor: isHovering ? "transparent" : "hsl(5, 78%, 42%)",
            borderColor: isHovering ? "hsl(5, 78%, 42%)" : "transparent",
            borderWidth: isHovering ? 2 : 0,
            opacity: 0.9,
          }}
        />
      </div>

      {/* Telugu character flash */}
      <div
        ref={teluguRef}
        className="pointer-events-none fixed left-0 top-0 z-[10001] will-change-transform"
        style={{
          transform: "translate(-100px, -100px)",
          opacity: showTelugu ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <span
          className="font-sanchari text-lg text-primary"
          style={{
            marginLeft: 20,
            marginTop: -20,
            display: "block",
            textShadow: "0 0 12px hsla(5, 78%, 42%, 0.5)",
          }}
        >
          {teluguChar}
        </span>
      </div>
    </>
  );
};
