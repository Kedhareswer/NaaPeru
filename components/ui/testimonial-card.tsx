"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star, Mail, Github, Linkedin, Users, Smile } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import profile from "@/data/profile.json";

// --- Type Definitions for props ---
export interface Stat {
  value: string;
  label: string;
}

export interface Testimonial {
  name: string;
  title: string;
  quote?: string;
  avatarSrc: string;
  rating: number;
}

export interface ClientsSectionProps {
  tagLabel: string;
  title: string;
  description: string;
  stats: Stat[];
  testimonials: Testimonial[];
  primaryActionLabel: string;
  secondaryActionLabel: string;
  className?: string;
}

// --- Internal Sub-Components ---

// Small helper to choose an icon based on the stat label
const getStatIcon = (label: string) => {
  if (/happy\s*clients/i.test(label)) {
    return <Users className="h-6 w-6 text-foreground" aria-hidden />;
  }
  if (/satisfaction/i.test(label)) {
    return <Smile className="h-6 w-6 text-green-500" fill="currentColor" aria-hidden />;
  }
  if (/average\s*rating/i.test(label)) {
    return <Star className="h-6 w-6 text-yellow-500" fill="currentColor" aria-hidden />;
  }
  return null;
};

// StatCard using shadcn variables
const StatCard = ({ value, label }: Stat) => (
  <Card className="bg-muted/50 border-border text-center">
    <CardContent className="p-4">
      <div className="flex items-center justify-center gap-2">
        <p className="text-3xl font-bold text-foreground">{value}</p>
        {getStatIcon(label)}
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </CardContent>
  </Card>
);

// A sticky testimonial card for the stacking effect.
const StickyTestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
  return (
    <motion.div
      className="w-full lg:sticky"
      style={{ top: `${20 + index * 24}px` }} // Staggered top position for stacking
    >
      <div className={cn(
        "p-4 md:p-6 shadow-lg flex flex-col h-auto w-full",
        "bg-card border border-border"
      )}>
        {/* Top section: Image and Author */}
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 md:w-14 md:h-14 bg-cover bg-center flex-shrink-0"
            style={{ backgroundImage: `url(${testimonial.avatarSrc})` }}
            aria-label={`Photo of ${testimonial.name}`}
          />
          <div className="flex-grow">
            <p className="font-semibold text-base md:text-lg text-foreground">{testimonial.name}</p>
            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
          </div>
        </div>

        {/* Middle section: Rating */}
        <div className="flex items-center gap-2 my-4">
          <span className="font-bold text-sm md:text-base text-foreground">{testimonial.rating.toFixed(1)}</span>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3 md:h-4 md:w-4",
                  i < Math.floor(testimonial.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-muted-foreground/30"
                )}
              />
            ))}
          </div>
        </div>

        {/* Bottom section: Quote */}
        {testimonial.quote && (
          <p className="text-sm md:text-base text-muted-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
        )}
      </div>
    </motion.div>
  );
};

// --- Main Exported Component ---

export const ClientsSection = ({
  tagLabel,
  title,
  description,
  stats,
  testimonials,
  primaryActionLabel,
  secondaryActionLabel,
  className,
}: ClientsSectionProps) => {
  const isMobile = useIsMobile();
  // Calculate a height for the scroll container to ensure all cards can stack
  const scrollContainerHeight = isMobile ? "auto" : `calc(100vh + ${testimonials.length * 100}px)`;

  return (
    <section className={cn("w-full bg-background text-foreground py-20 md:py-28", className)}>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        {/* Left Column: Sticky Content */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-20">
          <div className="inline-flex items-center gap-2 self-start border border-border bg-muted/50 px-3 py-1 text-sm">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-muted-foreground">{tagLabel}</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{title}</h2>
          <p className="text-lg text-muted-foreground">{description}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <Link href="mailto:Kedhareswer.12110626@gmail.com">
              <Button className="w-full sm:w-auto">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
            </Link>
            <Link
              href={(profile as any).personalInfo?.github ?? "https://github.com/Kedhareswer"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="w-full sm:w-auto">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
            </Link>
            <Link
              href={(profile as any).personalInfo?.linkedin ?? "https://www.linkedin.com/in/kedhareswernaidu/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="w-full sm:w-auto">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Container for the sticky card stack */}
        <div className="relative flex flex-col gap-4" style={{ height: scrollContainerHeight }}>
          {testimonials.map((testimonial, index) => (
            <StickyTestimonialCard
              key={testimonial.name}
              index={index}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
};