"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  Send,
  Mail,
  Github,
  Linkedin,
  MessageSquare,
  Clock,
  CheckCircle,
  User,
  Briefcase,
  Coffee,
  Zap,
  ArrowRight,
  MapPin,
} from "lucide-react"
import ChatInterface from "./chat-interface"
import ScheduleMeeting from "./schedule-meeting"
import AvailabilityStatus from "./availability-status"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const isMobile = useIsMobile()

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  const collaborationTypes = [
    {
      icon: Briefcase,
      title: "Full-time Roles",
      description: "Data Scientist • ML Engineer • Research Scientist",
      features: ["Long-term commitment", "Team integration", "Strategic impact"],
    },
    {
      icon: Coffee,
      title: "Consulting",
      description: "Technical expertise • Project guidance • Problem solving",
      features: ["Flexible engagement", "Specialized knowledge", "Quick delivery"],
    },
    {
      icon: Zap,
      title: "Research",
      description: "Academic collaboration • Innovation projects • Publications",
      features: ["Cutting-edge work", "Knowledge sharing", "Impact-driven"],
    },
  ]

  return (
    <section id="contact" className="py-24 md:py-32 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-light mb-6 text-zinc-900"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Let's Connect & Collaborate
          </motion.h2>

          <motion.div
            className="w-16 h-px bg-zinc-900 mx-auto mb-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          <motion.p
            className="text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Ready to transform data challenges into breakthrough solutions? Let's discuss how we can create impactful
            results together.
          </motion.p>
        </motion.div>

        {/* Collaboration Types */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collaborationTypes.map((type, index) => (
              <motion.div
                key={index}
                className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8 text-center hover:bg-zinc-100 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-zinc-900 text-white rounded-xl flex items-center justify-center mx-auto mb-6">
                  <type.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-medium mb-3 text-zinc-900">{type.title}</h3>
                <p className="text-zinc-600 mb-6">{type.description}</p>
                <ul className="space-y-2">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-zinc-500 flex items-center justify-center">
                      <div className="w-1 h-1 bg-zinc-400 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* AI Chat */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 h-full"
          >
            <h3 className="text-lg font-medium mb-4 text-zinc-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-zinc-600" />
              AI Assistant
            </h3>
            <p className="text-sm text-zinc-600 mb-6">
              Get instant answers about my experience, projects, or technical expertise through the AI assistant.
            </p>
            <ChatInterface />
          </motion.div>

          {/* Availability */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 h-full"
          >
            <AvailabilityStatus
              onScheduleMeeting={() =>
                document.getElementById("schedule-meeting")?.scrollIntoView({ behavior: "smooth" })
              }
            />
          </motion.div>
        </div>

        {/* Schedule Meeting */}
        <motion.div
          id="schedule-meeting"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-20"
        >
          <ScheduleMeeting />
        </motion.div>
      </div>
    </section>
  )
}

// Missing components from lucide-react
function Loader2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}
