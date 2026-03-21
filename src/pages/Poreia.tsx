import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Navigation } from "@/components/Navigation";
import { TransitionLink } from "@/components/TransitionLink";
import { Seo } from "@/components/Seo";

interface Milestone {
  id: number;
  domain: string;
  month: number;
  status: "done" | "active" | "planned";
  title: string;
  desc: string;
  aim: string;
  progress: number;
  ideas: string[];
  date: string;
  cat: string;
}

interface SkillEntry {
  name: string;
  now: number;
  target: number;
  miracle: number;
}

interface SkillGroup {
  domain: string;
  skills: SkillEntry[];
}

interface PoreiaData {
  hero: { heading: string; headingAccent: string; subtitle: string };
  timeline: { totalMonths: number; currentMonth: number; domains: string[] };
  milestones: Milestone[];
  radar: {
    title: string;
    titleAccentWord: string;
    subtitle: string;
    domains: string[];
    now: number[];
    target: number[];
    miracle: number[];
  };
  skills: {
    title: string;
    titleAccentWords: string;
    subtitle: string;
    groups: SkillGroup[];
  };
  marquee: { words1: string[]; words2: string[] };
  closing: { label: string; quote: string; quoteAccent: string; meta: string; updatedDate: string };
}

function AnimatedCounter({ value, duration = 1.2 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);
  useEffect(() => { if (!inView) return; let s = 0; const step = Math.ceil(value / (duration * 60)); const iv = setInterval(() => { s += step; if (s >= value) { setDisplay(value); clearInterval(iv); } else setDisplay(s); }, 1000 / 60); return () => clearInterval(iv); }, [inView, value, duration]);
  return <span ref={ref}>{display}</span>;
}

function PoreiaMarquee({ words, reverse = false }: { words: string[]; reverse?: boolean }) {
  const items = [...words, ...words, ...words, ...words];
  return (
    <div className="relative w-full overflow-hidden border-y border-border/10 py-4 bg-card/20">
      <div className="flex whitespace-nowrap" style={{ animation: `poreia-marquee 25s linear infinite${reverse ? " reverse" : ""}` }}>
        {[...items, ...items].map((w, i) => (<span key={i} className="inline-flex items-center mx-8"><span className="font-heading text-xs font-bold tracking-[0.4em] uppercase text-foreground/[0.06]">{w}</span><span className="ml-8 text-primary/20 text-xs">&middot;</span></span>))}
      </div>
      <style>{`@keyframes poreia-marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </div>
  );
}

function RadarChart({ domains, now, target, miracle }: { domains: string[]; now: number[]; target: number[]; miracle: number[] }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const cx = 190, cy = 190, maxR = 140, n = domains.length;
  const pol = (angle: number, r: number): [number, number] => [
    cx + r * Math.cos(angle - Math.PI / 2),
    cy + r * Math.sin(angle - Math.PI / 2),
  ];
  const makePolygon = (values: number[]) =>
    values.map((v, i) => pol((2 * Math.PI * i) / n, maxR * (v / 100)).join(",")).join(" ");
  const origin = `${cx}px ${cy}px`;

  return (
    <svg ref={ref} className="w-full max-w-[380px] h-auto" viewBox="0 0 380 380" role="img" aria-label="Radar chart showing current vs target vs miracle skill levels">
      {[25, 50, 75, 100].map((lv) => {
        const pts = Array.from({ length: n }, (_, i) => pol((2 * Math.PI * i) / n, maxR * (lv / 100)).join(",")).join(" ");
        return (
          <g key={lv}>
            <polygon points={pts} fill="none" stroke={lv === 100 ? "hsla(0,0%,30%,0.4)" : "hsla(0,0%,20%,0.15)"} strokeWidth={lv === 100 ? 1 : 0.5} />
            <text x={pol(0, maxR * (lv / 100))[0] + 8} y={pol(0, maxR * (lv / 100))[1]} fill="hsla(0,0%,100%,0.15)" fontSize={8} fontFamily="Inter">{lv}%</text>
          </g>
        );
      })}
      {domains.map((d, i) => {
        const angle = (2 * Math.PI * i) / n;
        const [ex, ey] = pol(angle, maxR);
        const [lx, ly] = pol(angle, maxR + 22);
        return (
          <g key={d}>
            <line x1={cx} y1={cy} x2={ex} y2={ey} stroke="hsla(0,0%,20%,0.1)" strokeWidth={0.5} />
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fill="hsl(0,0%,50%)" fontSize={9} fontFamily="Space Grotesk,sans-serif" fontWeight={600}>{d}</text>
          </g>
        );
      })}
      <polygon points={makePolygon(miracle)} fill="hsla(45,80%,55%,0.04)" stroke="hsl(45,80%,55%)" strokeWidth={1} strokeDasharray="3 4" opacity={inView ? 0.4 : 0} style={{ transform: inView ? "scale(1)" : "scale(0)", transformOrigin: origin, transition: "all 1.2s cubic-bezier(0.25,0.46,0.45,0.94) 0.6s" }} />
      {miracle.map((v, i) => { const [dx, dy] = pol((2 * Math.PI * i) / n, maxR * (v / 100)); return <circle key={`m-${i}`} cx={dx} cy={dy} r={2.5} fill="hsl(45,80%,55%)" opacity={inView ? 0.35 : 0} style={{ transition: `opacity 0.4s ease ${0.8 + i * 0.05}s` }} />; })}
      <polygon points={makePolygon(target)} fill="hsla(210,65%,55%,0.08)" stroke="hsl(210,65%,55%)" strokeWidth={1.5} strokeDasharray="6 3" opacity={inView ? 1 : 0} style={{ transform: inView ? "scale(1)" : "scale(0)", transformOrigin: origin, transition: "all 1s cubic-bezier(0.25,0.46,0.45,0.94) 0.3s" }} />
      {target.map((v, i) => { const [dx, dy] = pol((2 * Math.PI * i) / n, maxR * (v / 100)); return <circle key={`t-${i}`} cx={dx} cy={dy} r={3.5} fill="hsl(210,65%,55%)" opacity={inView ? 0.7 : 0} style={{ transition: `opacity 0.4s ease ${0.5 + i * 0.05}s` }} />; })}
      <polygon points={makePolygon(now)} fill="hsla(5,78%,42%,0.15)" stroke="hsl(5,78%,42%)" strokeWidth={2} opacity={inView ? 1 : 0} style={{ transform: inView ? "scale(1)" : "scale(0)", transformOrigin: origin, transition: "all 0.8s cubic-bezier(0.25,0.46,0.45,0.94)" }} />
      {now.map((v, i) => { const [dx, dy] = pol((2 * Math.PI * i) / n, maxR * (v / 100)); return <circle key={`c-${i}`} cx={dx} cy={dy} r={4} fill="hsl(5,78%,42%)" opacity={inView ? 1 : 0} style={{ transition: `opacity 0.4s ease ${0.2 + i * 0.05}s` }} />; })}
    </svg>
  );
}

function SkillBar({ skill, delay = 0 }: { skill: SkillEntry; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="flex items-center gap-3 mb-[0.65rem]">
      <div className="font-heading text-[0.78rem] font-medium w-[100px]">{skill.name}</div>
      <div className="flex-1 relative h-3 flex items-center">
        <div className="absolute top-1/2 left-0 right-0 h-[3px] -translate-y-1/2 bg-[hsla(0,0%,20%,0.2)]" />
        <div className="absolute h-[3px] top-1/2 -translate-y-1/2 bg-[hsl(210,65%,55%)] opacity-35 z-[1]" style={{ left: `${skill.now}%`, width: inView ? `${skill.target - skill.now}%` : "0%", transition: `width 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${delay + 0.3}s` }} />
        <div className="absolute h-[3px] top-1/2 -translate-y-1/2 bg-[hsl(45,80%,55%)] opacity-15 z-[1]" style={{ left: `${skill.target}%`, width: inView ? `${skill.miracle - skill.target}%` : "0%", transition: `width 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${delay + 0.5}s` }} />
        <div className="absolute h-[3px] top-1/2 -translate-y-1/2 bg-primary z-[2]" style={{ width: inView ? `${skill.now}%` : "0%", transition: `width 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s` }} />
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[10px] bg-[hsl(210,65%,55%)] z-[3] opacity-80" style={{ left: `${skill.target}%` }} />
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[8px] bg-[hsl(45,80%,55%)] z-[3] opacity-40" style={{ left: `${skill.miracle}%` }} />
      </div>
      <div className="flex gap-[0.4rem] min-w-[90px] justify-end items-center">
        <span className="font-heading text-[10px] font-bold text-primary">{skill.now}</span>
        <span className="text-[9px] text-[hsl(0,0%,28%)]">&rarr;</span>
        <span className="font-heading text-[10px] font-semibold text-[hsl(210,65%,55%)]">{skill.target}</span>
        <span className="text-[9px] text-[hsl(0,0%,28%)]">&rarr;</span>
        <span className="font-heading text-[10px] font-medium text-[hsl(45,80%,55%)] opacity-50">{skill.miracle}</span>
      </div>
    </div>
  );
}

function DetailPanel({ milestone }: { milestone: Milestone | null }) {
  if (!milestone) {
    return (
      <div className="border border-border/20 bg-card/40 min-h-[240px] flex items-center justify-center">
        <span className="text-sm text-[hsl(0,0%,28%)]">Click a milestone to see details</span>
      </div>
    );
  }
  const m = milestone;
  const statusLabel = m.status === "done" ? "\u25CF Shipped" : m.status === "active" ? "\u25C9 Building" : "\u25CB Planned";
  const statusColor = m.status === "done" ? "text-primary" : m.status === "active" ? "text-[hsl(5,90%,55%)]" : "text-muted-foreground";

  return (
    <AnimatePresence mode="wait">
      <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="border border-border/20 bg-card/40 min-h-[240px] grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        <div className="p-8 lg:border-r border-border/10">
          <div className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] mb-3 ${statusColor}`}>{statusLabel}</div>
          <h3 className="font-heading text-[1.75rem] font-bold tracking-tight leading-tight mb-2">{m.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">{m.desc}</p>
          <div className="flex gap-8">
            {[{ label: "When", value: m.date }, { label: "Domain", value: m.domain }, { label: "Type", value: m.cat }].map((meta) => (
              <div key={meta.label}>
                <div className="text-[8px] uppercase tracking-[0.25em] text-[hsl(0,0%,28%)] mb-0.5">{meta.label}</div>
                <div className="font-heading text-[0.95rem] font-semibold">{meta.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="font-heading text-2xl font-bold text-primary min-w-[55px]">{m.progress}%</div>
            <div className="flex-1 h-1 bg-[hsla(0,0%,20%,0.3)] relative">
              <motion.div className="h-full bg-primary" initial={{ width: 0 }} animate={{ width: `${m.progress}%` }} transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }} />
            </div>
          </div>
          <div className="text-[0.95rem] italic text-foreground leading-relaxed mb-6 pl-4 border-l-2 border-primary">{m.aim}</div>
          <div className="text-[9px] uppercase tracking-[0.25em] text-primary font-semibold mb-2">What&apos;s involved</div>
          <div className="flex flex-col gap-2">
            {m.ideas.map((idea, i) => (
              <div key={i} className="flex gap-2 items-start text-[0.82rem] text-muted-foreground leading-snug">
                <div className="w-1 h-1 bg-primary opacity-60 mt-1.5 flex-shrink-0" />
                {idea}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function TimelineNode({ milestone, totalMonths, isSelected, onClick }: { milestone: Milestone; totalMonths: number; isSelected: boolean; onClick: () => void }) {
  const left = `${(milestone.month / totalMonths) * 100}%`;
  const dotClass = milestone.status === "done" ? "bg-primary" : milestone.status === "active" ? "bg-[hsl(5,90%,55%)] shadow-[0_0_12px_hsla(5,90%,55%,0.5)]" : "bg-transparent border-[1.5px] border-[hsl(0,0%,28%)]";

  return (
    <button type="button" className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-[5] p-2 group" style={{ left }} onClick={onClick} aria-label={`View milestone: ${milestone.title}`}>
      <div className={`w-4 h-4 transition-all duration-200 relative ${dotClass} ${isSelected ? "scale-150 shadow-[0_0_14px_hsl(5,78%,42%)]" : "group-hover:scale-150"}`}>
        {milestone.status === "active" && <span className="absolute inset-[-5px] border border-[hsl(5,90%,55%)] animate-ping" />}
      </div>
      <div className={`absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 whitespace-nowrap font-heading text-[10px] font-semibold bg-[hsl(220,20%,13%)] px-2 py-1 border border-border/25 transition-opacity pointer-events-none ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
        {milestone.title}
      </div>
    </button>
  );
}

function FeaturedCallout({ milestone }: { milestone: Milestone }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="container-portfolio mb-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative border border-primary/20 bg-card/40 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-primary/60 to-transparent" />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-0">
          <div className="p-10 lg:p-12">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-4">
              <span className="w-2 h-2 bg-[hsl(5,90%,55%)] shadow-[0_0_10px_hsl(5,90%,55%)] animate-pulse" />
              Currently Building
            </div>
            <h3 className="font-heading text-[clamp(1.6rem,3vw,2.2rem)] font-bold tracking-tight leading-tight mb-3">{milestone.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-[520px]">{milestone.desc}</p>
            <div className="flex items-center gap-5 mb-8">
              <div className="font-heading text-3xl font-bold text-primary">{milestone.progress}%</div>
              <div className="flex-1 max-w-[280px] h-[6px] bg-[hsla(0,0%,20%,0.3)] relative overflow-hidden">
                <motion.div className="h-full bg-primary" initial={{ width: 0 }} animate={inView ? { width: `${milestone.progress}%` } : {}} transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }} />
              </div>
            </div>
            <div className="text-[0.95rem] italic text-foreground/80 leading-relaxed pl-4 border-l-2 border-primary/60">{milestone.aim}</div>
          </div>
          <div className="p-10 lg:p-12 lg:border-l border-border/10 bg-card/20">
            <div className="text-[9px] uppercase tracking-[0.25em] text-primary font-semibold mb-4">What&apos;s involved</div>
            <div className="flex flex-col gap-3">
              {milestone.ideas.map((idea, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                  className="flex gap-3 items-start text-[0.82rem] text-muted-foreground leading-snug"
                >
                  <div className="w-1.5 h-1.5 bg-primary opacity-60 mt-1.5 flex-shrink-0" />
                  {idea}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function ClosingManifesto({ closing }: { closing: PoreiaData["closing"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="container-portfolio mb-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="border border-border/15 bg-card/30 py-16 px-8 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-transparent pointer-events-none" />
        <div className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-6">{closing.label}</div>
        <p className="font-heading text-[clamp(1.4rem,3vw,2rem)] font-bold tracking-tight leading-snug max-w-[600px] mx-auto mb-6">
          {closing.quote} <em className="italic text-primary">{closing.quoteAccent}</em>
        </p>
        <div className="text-[11px] text-muted-foreground">
          {closing.meta} <span className="text-foreground/30 mx-2">&middot;</span> <span className="text-primary/60">{closing.updatedDate}</span>
        </div>
      </motion.div>
    </section>
  );
}

export default function Poreia() {
  const [data, setData] = useState<PoreiaData | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-60px" });

  useEffect(() => {
    fetch("/poreia-data.json")
      .then((r) => r.json())
      .then((d: PoreiaData) => {
        setData(d);
        const firstActive = d.milestones.find((m) => m.status === "active");
        if (firstActive) setSelectedId(firstActive.id);
      });
  }, []);

  const selectedMilestone = useMemo(() => data?.milestones.find((m) => m.id === selectedId) ?? null, [data, selectedId]);
  const featuredMilestone = useMemo(() => data?.milestones.find((m) => m.status === "active") ?? null, [data]);
  const stats = useMemo(() => {
    if (!data) return { total: 0, shipped: 0, building: 0, planned: 0 };
    const ms = data.milestones;
    return { total: ms.length, shipped: ms.filter((m) => m.status === "done").length, building: ms.filter((m) => m.status === "active").length, planned: ms.filter((m) => m.status === "planned").length };
  }, [data]);
  const handleSelect = useCallback((id: number) => setSelectedId(id), []);

  if (!data) return null;

  const monthMarkers = [
    { i: 0, l: "Jan '26" }, { i: 2, l: "\u25CF Now", active: true }, { i: 5, l: "Jun '26" },
    { i: 8, l: "Sep '26" }, { i: 11, l: "Dec '26" }, { i: 14, l: "Mar '27" }, { i: 17, l: "Jun '27" },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Seo
        title="Kedhar's Journey (Poreia) | AI Engineer Growth Roadmap"
        description="Follow Kedhar's (Marlakunta Kedhareswer Naidu) growth roadmap as an AI Engineer — milestones, skills, and learning journey from 2026 onwards."
        path="/poreia"
        image="/og-work.png"
        imageAlt="Kedhar Kedhareswer Naidu career growth and learning journey"
      />
      <Navigation />
      <section className="container-portfolio relative pt-32 pb-12 overflow-hidden">
        <div className="font-heading text-[clamp(6rem,15vw,16rem)] font-bold tracking-tighter leading-none text-white/[0.02] select-none absolute top-16 right-[-2rem]" aria-hidden="true">ΠΟΡΕΙΑ</div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-[11px] uppercase tracking-[0.35em] text-primary opacity-80 mb-4">Πορεία — The Path</motion.div>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }} className="w-[60px] h-[3px] bg-primary mb-8 origin-left" />
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tight leading-[1.08] mb-4">
          {data.hero.heading}<br /><em className="italic text-primary">{data.hero.headingAccent}</em>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }} className="text-[1.05rem] text-muted-foreground max-w-[560px] leading-relaxed">{data.hero.subtitle}</motion.p>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="flex gap-8 sm:gap-12 mt-10 pt-6 border-t border-border/10">
          {[{ num: stats.total, label: "Milestones" }, { num: stats.shipped, label: "Shipped" }, { num: stats.building, label: "In Progress" }, { num: stats.planned, label: "Planned" }].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.7 + i * 0.08 }} className="border border-border/15 bg-card/30 px-5 py-3">
              <div className="font-heading text-2xl font-bold text-primary leading-none"><AnimatedCounter value={s.num} /></div>
              <div className="text-[9px] uppercase tracking-[0.3em] text-[hsl(0,0%,28%)] mt-1">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {featuredMilestone && <FeaturedCallout milestone={featuredMilestone} />}

      <PoreiaMarquee words={data.marquee.words1} />

      <section ref={timelineRef} className="container-portfolio mt-16 mb-8" aria-label="18-month roadmap timeline">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-heading text-xl font-bold">18-Month Roadmap</h2>
          <div className="flex gap-6">
            {[{ cls: "bg-primary", label: "Shipped" }, { cls: "bg-[hsl(5,90%,55%)] shadow-[0_0_8px_hsl(5,90%,55%)]", label: "Building" }, { cls: "bg-transparent border-[1.5px] border-muted-foreground", label: "Planned" }].map((l) => (
              <div key={l.label} className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-wider">
                <div className={`w-2 h-2 ${l.cls}`} />{l.label}
              </div>
            ))}
          </div>
        </div>
        {data.timeline.domains.map((domain, di) => {
          const domainMs = data.milestones.filter((m) => m.domain === domain).sort((a, b) => a.month - b.month);
          const doneOrActive = domainMs.filter((m) => m.status === "done" || m.status === "active");
          const fillStart = doneOrActive.length ? Math.min(...doneOrActive.map((m) => m.month)) : 0;
          const fillEnd = doneOrActive.length ? Math.max(...doneOrActive.map((m) => m.month)) : 0;
          return (
            <motion.div
              key={domain}
              className="mb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={timelineInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: di * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="text-[9px] uppercase tracking-[0.3em] text-[hsl(0,0%,28%)] mb-2">{domain}</div>
              <div className="relative h-14">
                <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-border/10 -translate-y-1/2" />
                {doneOrActive.length > 0 && (
                  <div className="absolute top-1/2 h-[3px] bg-primary opacity-30 -translate-y-1/2" style={{ left: `${(fillStart / data.timeline.totalMonths) * 100}%`, width: `${((fillEnd - fillStart) / data.timeline.totalMonths) * 100}%` }} />
                )}
                {domainMs.map((m) => (
                  <TimelineNode key={m.id} milestone={m} totalMonths={data.timeline.totalMonths} isSelected={selectedId === m.id} onClick={() => handleSelect(m.id)} />
                ))}
              </div>
            </motion.div>
          );
        })}
        <div className="flex justify-between mt-4 pt-3 border-t border-border/5">
          {monthMarkers.map((km) => (
            <div key={km.i} className={`text-[9px] uppercase tracking-wider ${km.active ? "text-primary font-bold" : "text-[hsl(0,0%,28%)]"}`}>{km.l}</div>
          ))}
        </div>
      </section>

      <section className="container-portfolio mb-12" aria-label="Milestone details">
        <DetailPanel milestone={selectedMilestone} />
      </section>

      <PoreiaMarquee words={data.marquee.words2} reverse />

      <section className="container-portfolio mb-20 mt-16 grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12 items-start" aria-label="Skills assessment">
        <div>
          <h2 className="font-heading text-xl font-bold mb-2">Am <span className="text-primary">{data.radar.titleAccentWord}</span> Good?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">{data.radar.subtitle}</p>
          <RadarChart domains={data.radar.domains} now={data.radar.now} target={data.radar.target} miracle={data.radar.miracle} />
          <div className="flex gap-6 mt-4">
            <div className="flex items-center gap-2 text-[10px] font-heading font-semibold"><div className="w-5 h-1 bg-primary" /><span className="text-primary">Now (Mar 2026)</span></div>
            <div className="flex items-center gap-2 text-[10px] font-heading font-semibold"><div className="w-5 h-1 bg-[hsl(210,65%,55%)] opacity-70" /><span className="text-[hsl(210,65%,55%)]">Target (Mid 2027)</span></div>
            <div className="flex items-center gap-2 text-[10px] font-heading font-semibold"><div className="w-5 h-1 bg-[hsl(45,80%,55%)] opacity-40" /><span className="text-[hsl(45,80%,55%)] opacity-50">Miracle</span></div>
          </div>
        </div>
        <div>
          <h2 className="font-heading text-xl font-bold mb-2">Where I Am &rarr; Where I <span className="text-primary">{data.skills.titleAccentWords}</span></h2>
          <p className="text-sm text-muted-foreground mb-6">{data.skills.subtitle}</p>
          {data.skills.groups.map((group) => (
            <div key={group.domain} className="mb-6">
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3 pb-1.5 border-b border-border/10">{group.domain}</div>
              {group.skills.map((sk, si) => (<SkillBar key={sk.name} skill={sk} delay={si * 0.08} />))}
            </div>
          ))}
        </div>
      </section>

      <ClosingManifesto closing={data.closing} />
    </main>
  );
}
