import React, { useState, useRef, useEffect } from "react";
import { Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Liquid } from "./liquid";

/*
 * An interactive node canvas (680x300 coordinate space, horizontally
 * scrollable on small screens). Nodes are draggable; wires and ports are
 * derived from node positions, so everything re-routes live while you drag.
 */

type NodeId = "visitor" | "profile" | "needle" | "reply";
type Phase = "idle" | "prep" | "seg1" | "tools" | "prep2" | "seg2" | "type" | "done";

const CANVAS = { w: 680, h: 300 };
const NODE_W: Record<NodeId, number> = { visitor: 150, profile: 150, needle: 190, reply: 176 };
/* Port anchors relative to a node's top-left corner */
const ANCHORS = {
  visitorOut: [NODE_W.visitor, 44],
  profileOut: [NODE_W.profile, 56],
  needleIn1: [0, 40],
  needleIn2: [0, 66],
  needleOut: [NODE_W.needle, 53],
  replyIn: [0, 34],
} as const;

const TOOLS = ["profile.read()", "projects.search()", "skills.match()"];
const SPECS = ["17 local tools", "14 MB · in your tab", "offline · no network"];
const REPLY = "React? Shipped ThesisFlow with it. Answered by a 14 MB model in your tab — zero network calls.";

const wire = (a: [number, number], b: [number, number]) => {
  const c = Math.max(28, Math.abs(b[0] - a[0]) * 0.45);
  return `M${a[0]} ${a[1]} C${a[0] + c} ${a[1]}, ${b[0] - c} ${b[1]}, ${b[0]} ${b[1]}`;
};

export interface LiquidNeedleGraphProps {
  className?: string;
  blur?: number;
  contrast?: number;
}

/**
 * The chatbot's offline brain as a live node canvas: drag the cards around
 * and the wires re-route; ask the question and a droplet of inference rides
 * the wire into Needle 2, the tool trace lights up, and the answer types
 * itself out — the liquid trails the droplet the whole way (liquid-gooey
 * "move" + "morph" ports).
 */
export const LiquidNeedleGraph: React.FC<LiquidNeedleGraphProps> = ({
  className,
  blur = 5,
  contrast = 18,
}) => {
  const [pos, setPos] = useState<Record<NodeId, { x: number; y: number }>>({
    visitor: { x: 0, y: 26 },
    profile: { x: 6, y: 168 },
    needle: { x: 246, y: 58 },
    reply: { x: 504, y: 84 },
  });
  const [phase, setPhase] = useState<Phase>("idle");
  const [toolIndex, setToolIndex] = useState(-1);
  const [typed, setTyped] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [dragId, setDragId] = useState<NodeId | null>(null);

  const dragRef = useRef({ dx: 0, dy: 0 });
  const timersRef = useRef<number[]>([]);
  const later = (fn: () => void, ms: number) => timersRef.current.push(window.setTimeout(fn, ms));

  useEffect(() => () => timersRef.current.forEach(window.clearTimeout), []);

  /* ---- derived geometry ---- */
  const pt = (node: NodeId, anchor: keyof typeof ANCHORS): [number, number] => [
    pos[node].x + ANCHORS[anchor][0],
    pos[node].y + ANCHORS[anchor][1],
  ];
  const visitorOut = pt("visitor", "visitorOut");
  const profileOut = pt("profile", "profileOut");
  const needleIn1 = pt("needle", "needleIn1");
  const needleIn2 = pt("needle", "needleIn2");
  const needleOut = pt("needle", "needleOut");
  const replyIn = pt("reply", "replyIn");

  const P1 = wire(visitorOut, needleIn1);
  const PB = wire(profileOut, needleIn2);
  const P2 = wire(needleOut, replyIn);
  const apiChip = { x: pos.needle.x + NODE_W.needle / 2 - 58, y: pos.needle.y + 176 };
  const PF = `M${pos.needle.x + NODE_W.needle / 2} ${pos.needle.y + (collapsed ? 60 : 128)} L${
    pos.needle.x + NODE_W.needle / 2
  } ${apiChip.y - 4}`;

  const ports: Array<[number, number]> = [visitorOut, profileOut, needleIn1, needleIn2, needleOut, replyIn];

  /* ---- node dragging ---- */
  const startDrag = (id: NodeId) => (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* pointer capture unsupported */
    }
    dragRef.current = { dx: e.clientX - pos[id].x, dy: e.clientY - pos[id].y };
    setDragId(id);
  };

  const moveDrag = (e: React.PointerEvent) => {
    if (!dragId) return;
    const x = Math.min(CANVAS.w - NODE_W[dragId], Math.max(0, e.clientX - dragRef.current.dx));
    // Needle keeps room below for its fallback chip
    const maxY = dragId === "needle" ? CANVAS.h - 202 : CANVAS.h - 90;
    const y = Math.min(maxY, Math.max(0, e.clientY - dragRef.current.dy));
    setPos((p) => ({ ...p, [dragId]: { x, y } }));
  };

  /* ---- run sequence ---- */
  const busy = phase !== "idle" && phase !== "done";

  const run = () => {
    if (busy) return;
    setTyped("");
    setToolIndex(-1);
    setPhase("prep");
    requestAnimationFrame(() => requestAnimationFrame(() => setPhase("seg1")));
    later(() => {
      setPhase("tools");
      TOOLS.forEach((_, i) => later(() => setToolIndex(i), i * 300));
    }, 650);
    later(() => {
      setToolIndex(-1);
      setPhase("prep2");
      requestAnimationFrame(() => requestAnimationFrame(() => setPhase("seg2")));
    }, 650 + TOOLS.length * 300 + 150);
    later(() => setPhase("type"), 650 + TOOLS.length * 300 + 150 + 550);
  };

  /* typewriter */
  useEffect(() => {
    if (phase !== "type") return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 2;
      setTyped(REPLY.slice(0, i));
      if (i >= REPLY.length) {
        window.clearInterval(id);
        setPhase("done");
      }
    }, 24);
    return () => window.clearInterval(id);
  }, [phase]);

  /* droplet — parked at a port while not travelling, unmounted at idle */
  const droplet =
    phase === "prep"
      ? { path: P1, dist: 0, animate: false }
      : phase === "seg1"
      ? { path: P1, dist: 100, animate: true }
      : phase === "tools" || phase === "prep2"
      ? { path: phase === "tools" ? P1 : P2, dist: phase === "tools" ? 100 : 0, animate: false }
      : { path: P2, dist: phase === "seg2" || phase === "type" || phase === "done" ? 100 : 0, animate: phase === "seg2" };

  const nodeBase =
    "absolute border bg-card/90 backdrop-blur-[2px] shadow-[0_2px_8px_rgba(0,0,0,0.35)] transition-[border-color,box-shadow] duration-200";
  const nodeStyle = (id: NodeId) => ({
    left: pos[id].x,
    top: pos[id].y,
    width: NODE_W[id],
    zIndex: dragId === id ? 30 : 10,
  });
  const headerBase =
    "flex cursor-grab items-center gap-2 border-b border-border/60 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] active:cursor-grabbing";

  return (
    <div className={cn("w-full overflow-x-auto overflow-y-hidden", className)}>
      <Liquid
        blur={blur}
        contrast={contrast}
        variant="primary"
        filterPadding={24}
        className="relative mx-auto h-[300px] w-[680px] shrink-0 select-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--foreground) / 0.07) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        onPointerMove={moveDrag}
        onPointerUp={() => setDragId(null)}
        onPointerCancel={() => setDragId(null)}
      >
        {/* Wires — re-route live while nodes drag */}
        <svg className="pointer-events-none absolute inset-0" width={CANVAS.w} height={CANVAS.h} aria-hidden>
          {[P1, PB, P2].map((d, i) => (
            <path key={i} d={d} fill="none" stroke="hsl(var(--foreground) / 0.25)" strokeWidth="1.5" />
          ))}
          <path d={PF} fill="none" stroke="hsl(var(--foreground) / 0.18)" strokeWidth="1.5" strokeDasharray="3 4" />
        </svg>

        {/* Visitor node */}
        <div
          className={cn(nodeBase, dragId === "visitor" ? "border-primary/50 shadow-lg" : "border-border hover:border-foreground/30")}
          style={nodeStyle("visitor")}
          onPointerDown={startDrag("visitor")}
        >
          <p className={cn(headerBase, "text-foreground/50")}>Visitor</p>
          <div className="flex items-center gap-2 p-2.5">
            <p className="flex-1 bg-background/50 px-2 py-1.5 font-body text-[10px] leading-snug text-foreground/80">
              do you know react?
            </p>
            <button
              type="button"
              onClick={run}
              disabled={busy}
              className={cn(
                "cursor-pointer border px-1.5 py-1 font-mono text-[9px] uppercase tracking-wider transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.95] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
                busy
                  ? "border-border/30 text-foreground/30"
                  : "border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground"
              )}
            >
              Ask
            </button>
          </div>
        </div>

        {/* profile.json node */}
        <div
          className={cn(nodeBase, dragId === "profile" ? "border-primary/50 shadow-lg" : "border-border hover:border-foreground/30")}
          style={nodeStyle("profile")}
          onPointerDown={startDrag("profile")}
        >
          <p className={cn(headerBase, "text-foreground/50")}>profile.json</p>
          <div className="space-y-1 p-2.5 font-body text-[10px] text-foreground/60">
            {["profile", "projects", "skills"].map((row) => (
              <p key={row} className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-foreground/30" />
                {row}
              </p>
            ))}
          </div>
        </div>

        {/* Needle node */}
        <div
          className={cn(nodeBase, dragId === "needle" ? "border-primary/50 shadow-lg" : "border-border hover:border-foreground/30")}
          style={nodeStyle("needle")}
          onPointerDown={startDrag("needle")}
        >
          <div className={cn(headerBase, "justify-between text-foreground/70")}>
            <span className="flex items-center gap-2">
              <span className={cn("h-1.5 w-1.5 rounded-full bg-primary", busy && "animate-pulse")} />
              Needle 2 · WASM
            </span>
            <button
              type="button"
              onClick={() => setCollapsed((c) => !c)}
              aria-label={collapsed ? "Expand node" : "Collapse node"}
              className="cursor-pointer p-0.5 text-foreground/40 transition-colors hover:text-foreground"
            >
              <Minus className={cn("h-3 w-3 transition-transform duration-200", collapsed && "rotate-90")} />
            </button>
          </div>
          {!collapsed && (
            <>
              <div className="space-y-1 p-2.5">
                {SPECS.map((spec, i) => {
                  const showTool = phase === "tools" && toolIndex >= i;
                  return (
                    <p key={spec} className="flex h-4 items-center gap-1.5 font-body text-[10px]">
                      {showTool ? (
                        <>
                          <span className={cn("h-1 w-1 rounded-full bg-primary", toolIndex === i && "animate-pulse")} />
                          <span className="animate-fade-in font-mono text-[9px] text-foreground/90">{TOOLS[i]}</span>
                          {toolIndex > i && <span className="font-mono text-[9px] text-primary/70">ok</span>}
                        </>
                      ) : (
                        <span className="text-foreground/60">{spec}</span>
                      )}
                    </p>
                  );
                })}
              </div>
              <p className="border-t border-border/60 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.2em] text-foreground/30">
                api fallback ↓
              </p>
            </>
          )}
        </div>

        {/* Reply node */}
        <div
          className={cn(nodeBase, dragId === "reply" ? "border-primary/50 shadow-lg" : "border-border hover:border-foreground/30")}
          style={nodeStyle("reply")}
          onPointerDown={startDrag("reply")}
        >
          <p className={cn(headerBase, "text-primary/80")}>సంచారి</p>
          <div className="min-h-[64px] p-2.5">
            {phase === "type" || phase === "done" ? (
              <p className="font-body text-[10px] leading-relaxed text-foreground/80">
                {typed}
                {phase === "type" && <span className="animate-pulse text-primary">▌</span>}
              </p>
            ) : (
              <p className="font-mono text-[10px] text-foreground/25">
                {busy ? "thinking…" : "awaiting query"}
              </p>
            )}
          </div>
        </div>

        {/* API fallback chip — rides with the Needle node */}
        <div
          className="absolute w-[116px] border border-dashed border-border px-3 py-1.5 text-center"
          style={{ left: apiChip.x, top: apiChip.y }}
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/35">/api/chat</span>
        </div>

        {/* Gooey ports — follow their nodes, swell on hover.
            Positioning lives on the child: Liquid.Item renders display:contents. */}
        {ports.map(([x, y], i) => (
          <Liquid.Item key={i} observe>
            <div
              className="absolute z-20 h-3.5 w-3.5 cursor-crosshair rounded-full transition-transform duration-150 ease-out hover:scale-150"
              style={{ left: x - 7, top: y - 7 }}
            />
          </Liquid.Item>
        ))}

        {/* The droplet of inference — rides the live wire paths.
            Unmounted at idle: the silhouette blob ignores content opacity. */}
        {phase !== "idle" && (
          <Liquid.Item effect="move">
            <div
              className="absolute z-20 h-4 w-4 rounded-full"
              style={{
                offsetPath: `path('${droplet.path}')`,
                offsetDistance: `${droplet.dist}%`,
                offsetRotate: "0deg",
                transition: droplet.animate ? "offset-distance 600ms cubic-bezier(0.45, 0, 0.25, 1)" : "none",
              }}
            />
          </Liquid.Item>
        )}
      </Liquid>
    </div>
  );
};
