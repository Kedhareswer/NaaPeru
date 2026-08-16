import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Liquid } from "./liquid";

interface Grade {
  id: string;
  label: string;
  filter: string;
}

const GRADES: Grade[] = [
  { id: "natural", label: "NAT", filter: "none" },
  { id: "silver", label: "B&W", filter: "grayscale(1) contrast(1.15)" },
  { id: "sepia", label: "SEP", filter: "sepia(0.85) contrast(1.05)" },
  { id: "push", label: "PUSH", filter: "contrast(1.4) saturate(1.5)" },
];

export interface LiquidGradeRackProps {
  printSrc?: string;
  printAlt?: string;
  className?: string;
  blur?: number;
  contrast?: number;
}

/**
 * A grading rack: one print, four grades. The chips are a single liquid bar —
 * hover one and it swells, bulging into its neighbours as the goo bridges
 * (liquid-gooey "morph"). Pick a grade and the print re-develops.
 */
export const LiquidGradeRack: React.FC<LiquidGradeRackProps> = ({
  printSrc = "/inspo/blossom-red.png",
  printAlt = "Print",
  className,
  blur = 7,
  contrast = 18,
}) => {
  const [activeId, setActiveId] = useState("natural");
  const active = GRADES.find((g) => g.id === activeId) ?? GRADES[0];

  return (
    <div className={cn("flex select-none flex-col items-center gap-6", className)}>
      {/* The print — grade crossfades in */}
      <div className="bg-white p-1">
        <img
          src={printSrc}
          alt={printAlt}
          className="h-36 w-44 object-cover sm:h-40 sm:w-52"
          style={{
            filter: active.filter,
            transition: "filter 350ms cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        />
      </div>

      {/* The rack — chips swell and bridge on hover */}
      <Liquid
        blur={blur}
        contrast={contrast}
        variant="elevated"
        filterPadding={32}
        className="relative flex items-center gap-2.5 px-1 py-1"
      >
        {GRADES.map((grade) => {
          const isActive = grade.id === activeId;
          return (
            <Liquid.Item key={grade.id} observe>
              <button
                type="button"
                onClick={() => setActiveId(grade.id)}
                aria-pressed={isActive}
                aria-label={`Grade: ${grade.label}`}
                className={cn(
                  "flex h-9 w-14 cursor-pointer items-center justify-center rounded-full font-mono text-[10px] tracking-[0.15em] transition-[transform,color] duration-200 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
                  "hover:scale-[1.3] active:scale-[1.15]",
                  isActive ? "text-primary" : "text-foreground/50 hover:text-foreground"
                )}
              >
                {grade.label}
              </button>
            </Liquid.Item>
          );
        })}
      </Liquid>

      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40">
        Grade · {active.label}
      </p>
    </div>
  );
};
