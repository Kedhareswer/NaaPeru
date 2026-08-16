import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface InspoShellProps {
  children: React.ReactNode;
  className?: string;
}

/** Paper-editorial chrome for /inspo — scoped away from the dark portfolio shell. */
export function InspoShell({ children, className }: InspoShellProps) {
  return (
    <div className={cn("inspo-surface min-h-screen", className)}>
      <header className="border-b border-inspo-ink">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 sm:px-6 md:px-10">
          <Link
            to="/inspo"
            className="font-inspo-mono text-[11px] uppercase tracking-[0.22em] text-inspo-ink transition-opacity hover:opacity-60"
          >
            Inspo Library
          </Link>
          <nav className="flex items-center gap-5">
            <Link
              to="/"
              className="font-inspo-mono text-[11px] uppercase tracking-[0.18em] text-inspo-ink/55 transition-colors hover:text-inspo-ink"
            >
              Portfolio
            </Link>
            <span className="font-inspo-mono text-[11px] uppercase tracking-[0.18em] text-inspo-coral">
              Curated
            </span>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
