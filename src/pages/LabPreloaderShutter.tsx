import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { PreloaderShutter } from "@/components/preloaders/PreloaderShutter";

/**
 * Lab: Direction D — Film shutter dossier.
 * Plays through count → slam → open, then offers replay.
 */
const LabPreloaderShutter = () => {
  const [playId, setPlayId] = useState(0);
  const [held, setHeld] = useState(false);

  const handleComplete = useCallback(() => setHeld(true), []);
  const replay = () => {
    setHeld(false);
    setPlayId((n) => n + 1);
  };

  return (
    <div className="relative min-h-[100dvh] bg-black">
      {!held && (
        <PreloaderShutter key={playId} onComplete={handleComplete} autoExit />
      )}

      {held && (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-8 px-6 text-center">
          <p className="font-body text-[10px] uppercase tracking-[0.4em] text-foreground/40">
            Lab · Direction D · Shutter dossier
          </p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Shutter open
          </h1>
          <p className="max-w-md font-body text-sm text-foreground/50">
            That was the full count → slam → reveal. Replay or compare with ink.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={replay}
              className="border border-primary bg-primary px-6 py-3 font-body text-xs uppercase tracking-[0.25em] text-primary-foreground transition-[transform] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Replay shutter
            </button>
            <Link
              to="/lab/preloader-ink"
              className="border border-border/40 px-6 py-3 font-body text-xs uppercase tracking-[0.25em] text-foreground/80 hover:border-primary/50"
            >
              Try ink
            </Link>
            <Link
              to="/"
              className="px-4 py-3 font-body text-xs uppercase tracking-[0.25em] text-foreground/40 hover:text-foreground/70"
            >
              Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabPreloaderShutter;
