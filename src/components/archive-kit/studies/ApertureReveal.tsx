import { EASE_OPTIC, Readout, useScrollProgress, usePrefersReducedMotion, clamp, lerp } from "./_shared";

const BLADES = 6;

/** Hexagonal aperture as a clip-path, rotating as it opens like real blades. */
function apertureClip(openness: number) {
  const radius = lerp(4, 78, openness);
  const spin = lerp(28, 0, openness); // blades unwind as they retract
  const pts = Array.from({ length: BLADES }, (_, i) => {
    const a = ((i * 360) / BLADES + spin - 90) * (Math.PI / 180);
    // 0.56 corrects the hexagon for a landscape frame so it stays regular
    return `${(50 + radius * Math.cos(a) * 0.56).toFixed(2)}% ${(50 + radius * Math.sin(a)).toFixed(2)}%`;
  });
  return `polygon(${pts.join(", ")})`;
}

/** f-stop scale, wide open to stopped down. */
const STOPS = ["f/1.4", "f/2", "f/2.8", "f/4", "f/5.6", "f/8", "f/11", "f/16"];

export default function ApertureReveal() {
  const reduced = usePrefersReducedMotion();
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  // Reveal completes at 70% so the caption has room to land before the end.
  const openness = reduced ? 1 : clamp(progress / 0.7, 0, 1);
  const stop = STOPS[Math.min(STOPS.length - 1, Math.round((1 - openness) * (STOPS.length - 1)))];

  return (
    <div className="relative h-full w-full">
      {/* Focusable so the aperture is reachable by keyboard alone — a scroll
          container that can't take focus can't be scrolled without a pointer. */}
      <div
        ref={ref}
        tabIndex={0}
        role="region"
        aria-label="Aperture reveal — scroll to open the frame"
        className="h-full w-full overflow-y-auto overscroll-contain outline-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-foreground"
      >
        {/* Spacer drives the scroll range; the stage stays pinned in view. */}
        <div className="h-[220%] w-full">
          <div className="sticky top-0 flex h-[45vh] min-h-[18rem] flex-col justify-center px-6 py-8 md:px-10">
            <div className="relative mx-auto w-full max-w-lg">
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-foreground/[0.06]">
                <img
                  src="/projects/quantumpdf.webp"
                  alt="QuantumPDF interface"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    clipPath: apertureClip(openness),
                    // focus settles as the aperture opens
                    transform: `scale(${lerp(1.08, 1, openness)})`,
                    filter: `saturate(${lerp(0.4, 1, openness)})`,
                    transition: reduced ? "none" : `clip-path 120ms linear, transform 300ms ${EASE_OPTIC}`,
                  }}
                />
                {/* Blade edges catch light at the aperture rim */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 mix-blend-multiply"
                  style={{
                    clipPath: apertureClip(openness),
                    boxShadow: "inset 0 0 0 1px hsl(var(--foreground) / 0.22)",
                  }}
                />
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <Readout>{stop}</Readout>
                <div className="relative h-px flex-1 bg-border">
                  <div
                    className="absolute inset-y-0 left-0 bg-foreground/50"
                    style={{ width: `${openness * 100}%` }}
                  />
                </div>
                <Readout>{Math.round(openness * 100)}%</Readout>
              </div>

              <p
                className="mt-4 font-body text-sm leading-relaxed text-foreground/60"
                style={{
                  opacity: reduced ? 1 : clamp((progress - 0.55) / 0.25, 0, 1),
                  transform: reduced ? "none" : `translateY(${lerp(10, 0, clamp((progress - 0.55) / 0.25, 0, 1))}px)`,
                }}
              >
                The caption arrives only once the frame is fully open — the reveal
                paces the reading, not the other way around.
              </p>
            </div>
          </div>
        </div>
      </div>

      {!reduced && openness < 0.05 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/35">
            Scroll to open
          </span>
        </div>
      )}
    </div>
  );
}
