import { useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";

interface ProjectCardProps {
  number: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  layout?: "full" | "half" | "large";
  delay?: number;
}

export const ProjectCard = ({
  number,
  category,
  title,
  description,
  tags,
  image,
  layout = "half",
  delay = 0,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const { ref, isVisible } = useScrollTrigger({ threshold: 0.2 });

  const isFullLayout = layout === "full";
  const isLargeLayout = layout === "large";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleClick = () => {
    // Micro interaction: quick scale feedback
    const card = ref.current;
    if (card) {
      card.style.transform = "scale(0.98)";
      setTimeout(() => {
        card.style.transform = "";
      }, 100);
    }
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      className={`group relative overflow-hidden rounded bg-card shadow-md transition-all duration-normal cursor-pointer ${
        isFullLayout
          ? "col-span-4 md:col-span-8 lg:col-span-12"
          : isLargeLayout
          ? "col-span-4 md:col-span-8"
          : "col-span-4"
      } ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-12"
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionProperty: "opacity, transform, box-shadow, scale",
      }}
    >
      {/* Custom Cursor Follower - Micro Interaction */}
      {isHovered && (
        <div
          className="pointer-events-none absolute z-30 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-xs font-bold uppercase tracking-wider text-primary-foreground opacity-0 mix-blend-difference transition-opacity duration-300 group-hover:opacity-100"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          VIEW
        </div>
      )}

      {/* Image Container with Parallax Effect */}
      <div
        className={`relative overflow-hidden ${isFullLayout ? "aspect-[21/9]" : "aspect-[4/3]"}`}
      >
        <img
          src={image}
          alt={title}
          className={`h-full w-full object-cover transition-all duration-slow ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          style={{
            filter: isHovered ? "grayscale(0%) contrast(1.1)" : "grayscale(80%) contrast(1.1)",
            transform: isHovered ? `translate(${(cursorPos.x - 500) * 0.02}px, ${(cursorPos.y - 300) * 0.02}px) scale(1.1)` : "scale(1)",
          }}
        />
        
        {/* Gradient Overlays - Macro Interaction */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent mix-blend-multiply transition-opacity duration-normal ${
            isHovered ? "opacity-20" : "opacity-70"
          }`}
        />
        
        {/* Reveal overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent transition-opacity duration-normal ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Animated Border on Hover - Micro Interaction */}
        <div
          className={`absolute inset-0 border-2 border-primary transition-all duration-normal ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        />
      </div>

      {/* Content Overlay */}
      <div
        className={`absolute inset-0 flex flex-col justify-end p-6 md:p-8 transition-all duration-normal ${
          isFullLayout ? "" : isHovered ? "translate-y-0" : "translate-y-4"
        }`}
      >
        {/* Project Number with Parallax */}
        <div
          className="absolute top-6 right-6 md:top-8 md:right-8 font-heading text-6xl md:text-8xl font-bold text-primary transition-all duration-slow"
          style={{
            opacity: isHovered ? 0.4 : 0.2,
            transform: isHovered ? "scale(1.1) rotate(-5deg)" : "scale(1) rotate(0deg)",
          }}
        >
          {number}
        </div>

        <div className="relative space-y-3 md:space-y-4">
          {/* Category with slide animation */}
          <div
            className={`font-body text-xs font-medium uppercase tracking-[0.1em] text-foreground transition-all duration-normal ${
              isHovered ? "translate-x-2 text-primary" : "translate-x-0"
            }`}
          >
            {category}
          </div>

          {/* Title */}
          <h3
            className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground transition-all duration-normal ${
              isHovered ? "translate-x-2" : "translate-x-0"
            }`}
          >
            {title}
          </h3>

          {/* Description - Fade in with stagger */}
          <p
            className={`max-w-2xl font-body text-base md:text-lg text-gray-light transition-all duration-slow ${
              isFullLayout || isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isHovered ? "100ms" : "0ms" }}
          >
            {description}
          </p>

          {/* Tags with staggered animation */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={tag}
                className={`rounded bg-primary/10 px-3 py-1 font-body text-sm font-medium text-primary transition-all duration-normal hover:bg-primary hover:text-primary-foreground hover:scale-110 ${
                  isHovered ? "opacity-100 translate-y-0" : "opacity-70 translate-y-2"
                }`}
                style={{
                  transitionDelay: isHovered ? `${150 + index * 50}ms` : "0ms",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA with icon animation */}
          <button
            className={`group/btn mt-4 flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-wider transition-all duration-normal ${
              isHovered
                ? "text-primary translate-x-2 opacity-100"
                : "text-foreground translate-x-0 opacity-70"
            }`}
          >
            VIEW PROJECT
            <ExternalLink
              className={`h-4 w-4 transition-all duration-normal ${
                isHovered ? "translate-x-1 -translate-y-1 rotate-12" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Glow effect on hover - Micro Interaction */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-slow ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `radial-gradient(circle 300px at ${cursorPos.x}px ${cursorPos.y}px, rgba(255, 0, 0, 0.15), transparent)`,
        }}
      />
    </div>
  );
};
