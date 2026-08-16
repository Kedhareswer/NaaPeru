import { cn } from "@/lib/utils";
import type { OracleCardData } from "@/lib/archive/oracle";

const RARITY_RING: Record<OracleCardData["rarity"], string> = {
  common: "border-border/30",
  rare: "border-primary/50",
  legendary: "border-primary shadow-[0_0_12px_hsl(var(--primary)/0.35)]",
};

interface OracleCollectionProps {
  deck: OracleCardData[];
  revealedIds: Set<number>;
}

export function OracleCollection({ deck, revealedIds }: OracleCollectionProps) {
  return (
    <div className="pointer-events-none fixed bottom-20 left-1/2 z-30 hidden -translate-x-1/2 lg:block">
      <div className="flex gap-1 border border-border/25 bg-background/85 px-2 py-2 backdrop-blur">
        {deck.map((card) => {
          const revealed = revealedIds.has(card.projectId);
          return (
            <div
              key={card.projectId}
              title={revealed ? card.arcana : "?"}
              className={cn(
                "h-8 w-5 border transition-all duration-300",
                revealed ? RARITY_RING[card.rarity] + " bg-primary/20" : "border-border/20 bg-card/40",
              )}
            />
          );
        })}
      </div>
      <p className="mt-1 text-center font-body text-[8px] uppercase tracking-[0.2em] text-foreground/30">
        Collection
      </p>
    </div>
  );
}
