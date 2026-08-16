import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { PreloaderInk } from "@/components/preloaders/PreloaderInk";

/**
 * Lab: Direction C — Ink canvas preloader.
 * Holds the final frame so you can inspect composition, then replay.
 */
const LabPreloaderInk = () => {
  const [playId, setPlayId] = useState(0);
  const [held, setHeld] = useState(false);

  const handleComplete = useCallback(() => setHeld(true), []);
  const replay = () => {
    setHeld(false);
    setPlayId((n) => n + 1);
  };

  return (
    <div className="relative min-h-[100dvh] bg-[#0a0c10]">
      <PreloaderInk key={playId} onComplete={handleComplete} autoExit={false} />

      {held && (
        <div className="fixed bottom-0 left-0 right-0 z-[60] border-t border-border/20 bg-background/85 px-4 py-4 backdrop-blur-sm sm:px-8">
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="font-body text-[10px] uppercase tracking-[0.35em] text-foreground/45">
              Ink canvas · held on final frame
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={replay}
                className="border border-primary bg-primary px-5 py-2.5 font-body text-[10px] uppercase tracking-[0.25em] text-primary-foreground transition-[transform] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Replay
              </button>
              <Link
                to="/lab/preloader-shutter"
                className="border border-border/40 px-5 py-2.5 font-body text-[10px] uppercase tracking-[0.25em] text-foreground/80 hover:border-primary/50"
              >
                Try shutter
              </Link>
              <Link
                to="/"
                className="px-3 py-2.5 font-body text-[10px] uppercase tracking-[0.25em] text-foreground/40 hover:text-foreground/70"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabPreloaderInk;
