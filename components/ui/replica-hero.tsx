"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import profileData from "@/data/profile.json";

const heroImageFallback =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop";

export default function ReplicaHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const profile: any = profileData as any;

  const socials = {
    linkedin: profile?.personalInfo?.linkedin || "#",
    github: profile?.personalInfo?.github || "#",
    portfolio: profile?.personalInfo?.portfolio || "#",
    kaggle: profile?.personalInfo?.kaggle || "#",
  };

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { delay: i * 0.3, duration: 0.5 },
    }),
    hidden: { y: -16, opacity: 0, filter: "blur(8px)" },
  };

  return (
    <section className="bg-[#f5f5f7] py-8 px-4 sm:px-6 md:px-8" ref={heroRef}>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-md p-3 sm:p-4 md:p-6">
          {/* Tag */}
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wide text-gray-700 mb-3">
            <span className="text-red-500 leading-none -mt-[2px] animate-spin">✱</span>
            <span className="uppercase">Who I Am</span>
          </div>

          {/* Image with overlays */}
          <div className="relative">
            <div className="rounded-[28px] overflow-hidden ring-1 ring-gray-200 bg-gray-100">
              <img
                src={profile?.projects?.[0]?.image || heroImageFallback}
                alt="hero"
                className="w-full h-[260px] sm:h-[320px] md:h-[360px] object-cover"
              />
            </div>

            {/* Social bubble top-right */}
            <div className="absolute -top-3 right-3 sm:-top-4 sm:right-4">
              <div className="bg-white rounded-bl-[24px] rounded-tr-[24px] px-2.5 py-2 shadow-md ring-1 ring-black/5 flex items-center gap-2">
                {/* Facebook mimic (use portfolio) */}
                <TimelineContent
                  as="a"
                  animationNum={1}
                  timelineRef={heroRef}
                  customVariants={revealVariants}
                  href={socials.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-[#1877F2] flex items-center justify-center shadow text-white"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06c0 4.99 3.66 9.13 8.44 9.94v-7.03H7.9v-2.91h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34v7.03C18.34 21.19 22 17.05 22 12.06z"/></svg>
                </TimelineContent>
                {/* Instagram mimic (use kaggle) */}
                <TimelineContent
                  as="a"
                  animationNum={2}
                  timelineRef={heroRef}
                  customVariants={revealVariants}
                  href={socials.kaggle}
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center shadow text-white"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm6.5-2a1 1 0 1 0 1 1 1 1 0 0 0-1-1z"/></svg>
                </TimelineContent>
                {/* LinkedIn */}
                <TimelineContent
                  as="a"
                  animationNum={3}
                  timelineRef={heroRef}
                  customVariants={revealVariants}
                  href={socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-[#0A66C2] flex items-center justify-center shadow text-white"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.86v5.49H9.48V9h3.41v1.56h.05c.48-.9 1.66-1.85 3.42-1.85 3.66 0 4.33 2.41 4.33 5.54v6.2zM5.34 7.43a2.06 2.06 0 1 1 2.06-2.06 2.06 2.06 0 0 1-2.06 2.06zM7.12 20.45H3.57V9h3.55z"/></svg>
                </TimelineContent>
                {/* YouTube mimic (use github) */}
                <TimelineContent
                  as="a"
                  animationNum={4}
                  timelineRef={heroRef}
                  customVariants={revealVariants}
                  href={socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-[#FF0000] flex items-center justify-center shadow text-white"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.2 3.5 12 3.5 12 3.5s-7.2 0-9.4.6A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c2.2.6 9.4.6 9.4.6s7.2 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.8zM9.75 15.5V8.5l6.5 3.5z"/></svg>
                </TimelineContent>
              </div>
            </div>

            {/* Right metric bubble overlapping image */}
            <TimelineContent
              as="div"
              animationNum={5}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="hidden md:flex flex-col items-start gap-1 bg-white ring-1 ring-gray-200 shadow-md rounded-tl-[28px] rounded-br-[28px] p-5 w-64 absolute right-4 top-1/2 -translate-y-1/2"
            >
              <span className="text-red-600 font-extrabold text-2xl tracking-tight">100+ BRANDS</span>
              <span className="text-gray-600"><span className="text-red-600 font-semibold">30%</span> higher engagement</span>
            </TimelineContent>
          </div>

          {/* Stats row */}
          <TimelineContent
            as="div"
            animationNum={6}
            timelineRef={heroRef}
            customVariants={revealVariants}
            className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-700 mt-4"
          >
            <span><span className="text-red-600 font-bold">10+</span> years of experience</span>
            <span className="text-gray-300">|</span>
            <span><span className="text-red-600 font-bold">3 million</span> words</span>
          </TimelineContent>

          {/* Heading */}
          <h1 className="mt-2 sm:mt-3 md:mt-4 sm:text-4xl md:text-5xl text-2xl font-semibold text-gray-900">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.08}
              staggerFrom="first"
              reverse={false}
              transition={{ type: "spring", stiffness: 230, damping: 28, delay: 0.6 }}
            >
              Crafting Words That Make a Difference.
            </VerticalCutReveal>
          </h1>

          {/* Body and CTA */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-4">
            <TimelineContent
              as="div"
              animationNum={7}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="md:col-span-2 text-gray-600 space-y-4 sm:text-base text-sm"
            >
              <p>
                My journey began as a passionate writer and evolved into a strategic copywriting career. I
                specialize in transforming ideas into compelling content that helps brands grow.
              </p>
              <p>
                Every brand has a story, and I specialize in telling yours with clarity and impact. By blending
                creativity with strategy, I write content that resonates with audiences.
              </p>
            </TimelineContent>

            <div className="md:col-span-1">
              <div className="text-right">
                <TimelineContent
                  as="div"
                  animationNum={8}
                  timelineRef={heroRef}
                  customVariants={revealVariants}
                  className="text-red-600 text-xl font-bold mb-1"
                >
                  SANGVI
                </TimelineContent>
                <TimelineContent
                  as="div"
                  animationNum={9}
                  timelineRef={heroRef}
                  customVariants={revealVariants}
                  className="text-gray-600 text-xs sm:text-sm mb-5"
                >
                  Copywriter | Content Strategist
                </TimelineContent>

                <TimelineContent
                  as="a"
                  animationNum={10}
                  timelineRef={heroRef}
                  customVariants={revealVariants}
                  href={socials.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-black text-white px-5 py-3 rounded-xl shadow-lg shadow-neutral-400/20 hover:gap-3 transition-all"
                >
                  <span className="text-sm font-semibold">LET'S COLLABORATE</span>
                  <ArrowRight className="w-4 h-4" />
                </TimelineContent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
