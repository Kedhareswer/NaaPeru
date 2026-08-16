import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SCHIZO_VARIANTS, type SchizoVariantId } from "@/lib/archive/schizotech";

export function SchizoSwitcher({
  current,
  badge,
  subtitle,
}: {
  current: SchizoVariantId;
  badge: string;
  subtitle: string;
}) {
  return (
    <>
      <div className="pointer-events-none fixed left-6 top-28 z-30">
        <div className="pointer-events-auto border border-primary/40 bg-background/85 px-4 py-2 backdrop-blur">
          <p className="font-body text-[10px] uppercase tracking-[0.35em] text-primary">{badge}</p>
          <p className="font-body text-[10px] text-foreground/50">{subtitle}</p>
        </div>
      </div>

      <div className="fixed bottom-6 left-1/2 z-30 flex max-w-[95vw] -translate-x-1/2 gap-1 border border-border/30 bg-background/90 p-1 backdrop-blur">
        {SCHIZO_VARIANTS.map((m) => (
          <Link
            key={m.id}
            to={`/archive/${m.id}`}
            className={cn(
              "group px-2.5 py-2 text-center transition-colors sm:px-3",
              current === m.id ? "bg-primary text-background" : "text-foreground/60 hover:text-foreground",
            )}
          >
            <span className="block font-body text-[10px] font-bold uppercase tracking-[0.2em]">{m.label}</span>
            <span className="block font-body text-[8px] uppercase tracking-[0.15em] opacity-70">{m.name}</span>
          </Link>
        ))}
        <Link
          to="/archive"
          className="border-l border-border/30 px-2.5 py-2 font-body text-[9px] uppercase tracking-[0.15em] text-foreground/50 hover:text-foreground sm:px-3"
        >
          Pick
        </Link>
      </div>
    </>
  );
}
