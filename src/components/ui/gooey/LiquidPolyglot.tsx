import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Liquid } from "./liquid";

interface PolyglotWord {
  word: string;
  lang: string;
  meaning: string;
}

/* The site's own tongues — chatbot, roadmap, playground */
const WORDS: PolyglotWord[] = [
  { word: "సంచారి", lang: "Telugu", meaning: "the wanderer" },
  { word: "Πορεία", lang: "Greek", meaning: "the path" },
  { word: "Experimentos", lang: "Spanish", meaning: "the play" },
];

export interface LiquidPolyglotProps {
  className?: string;
  blur?: number;
  contrast?: number;
}

/**
 * A pill that speaks three languages: tap it and the liquid mass flows toward
 * the new word, re-forming around its width like jelly (liquid-gooey
 * "morph.shape"). The library cross-blurs the content while the surface moves.
 */
export const LiquidPolyglot: React.FC<LiquidPolyglotProps> = ({
  className,
  blur = 6,
  contrast = 18,
}) => {
  const [index, setIndex] = useState(0);
  const current = WORDS[index];

  return (
    <div className={cn("flex select-none flex-col items-center gap-5", className)}>
      <Liquid blur={blur} contrast={contrast} variant="elevated" className="relative flex items-center">
        <Liquid.Item morph={{ shape: true, bounce: 0.4 }}>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % WORDS.length)}
            aria-label={`${current.word} — tap to switch language`}
            className="cursor-pointer rounded-full px-8 py-3.5 font-heading text-lg text-foreground transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary sm:text-xl"
          >
            {/* opacity-only swap — the liquid engine owns blur during the morph */}
            <span key={current.word} className="block animate-fade-in whitespace-nowrap">
              {current.word}
            </span>
          </button>
        </Liquid.Item>
      </Liquid>

      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40">
        {current.lang} — {current.meaning}
      </p>
    </div>
  );
};
