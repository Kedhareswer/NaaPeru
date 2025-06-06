"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  Send,
  Mail,
  Github,
  Linkedin,
  MessageSquare,
  Clock,
  User,
  Briefcase,
  Coffee,
  Zap,
  ArrowRight,
  MapPin,
  Calendar,
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
            className="text-4xl md:text-5xl font-light mb-6 text-black"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Let's Connect & Collaborate
          </motion.h2>

          <motion.div
            className="w-16 h-px bg-black mx-auto mb-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          <motion.p
            className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed"
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
                className="bg-white border border-gray-200 rounded-2xl p-8 text-center hover:border-black transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <type.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-medium mb-3 text-black">{type.title}</h3>
                <p className="text-gray-600 mb-6">{type.description}</p>
                <ul className="space-y-2">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-500 flex items-center justify-center">
                      <div className="w-1 h-1 bg-gray-400 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Information Cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {/* Direct Contact */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h3 className="text-xl font-medium mb-6 text-black flex items-center gap-3">
              <Mail className="w-5 h-5" />
              Direct Contact
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-black mb-1">Email</p>
                  <a
                    href="mailto:Kedhareswer.12110626@gmail.com"
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    Kedhareswer.12110626@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-black mb-1">Location</p>
                  <p className="text-gray-600">Madanapalle, Andhra Pradesh, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-black mb-1">Response Time</p>
                  <p className="text-gray-600">Usually within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/kedhareswernaidu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Kedhareswer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* AI Assistant */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h3 className="text-xl font-medium mb-6 text-black flex items-center gap-3">
              <MessageSquare className="w-5 h-5" />
              AI Assistant
            </h3>
            <p className="text-gray-600 mb-6">
              Get instant answers about my experience, projects, or technical expertise through the AI assistant.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-3">Try asking:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full" />
                  "Tell me about your machine learning projects"
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full" />
                  "What are your technical skills?"
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full" />
                  "Schedule an appointment"
                </li>
              </ul>
            </div>

            <ChatInterface />
          </div>
        </motion.div>

        {/* Schedule Meeting Section */}
        <motion.div
          id="schedule-meeting"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="bg-white border border-gray-200 rounded-2xl p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Meeting Info */}
            <div>
              <h3 className="text-xl font-medium mb-6 text-black flex items-center gap-3">
                <Calendar className="w-5 h-5" />
                Schedule a Meeting
              </h3>

              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  Ready to discuss your project or explore collaboration opportunities? Schedule a meeting that fits
                  your needs.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-black">Quick Chat</p>
                      <p className="text-sm text-gray-600">15 minutes • General discussion</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-black">Project Consultation</p>
                      <p className="text-sm text-gray-600">30 minutes • Technical discussion</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-black">Interview Discussion</p>
                      <p className="text-sm text-gray-600">45 minutes • Career opportunities</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    All meetings are conducted via Google Meet or Zoom. You'll receive a calendar invitation with the
                    meeting link.
                  </p>
                </div>
              </div>
            </div>

            {/* Availability Status */}
            <div>
              <AvailabilityStatus
                onScheduleMeeting={() =>
                  document.getElementById("schedule-meeting")?.scrollIntoView({ behavior: "smooth" })
                }
              />
            </div>
          </div>

          {/* Schedule Meeting Component */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <ScheduleMeeting />
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <p className="text-gray-600 mb-6">
            Prefer a different way to connect? I'm always open to new opportunities and collaborations.
          </p>
          <a
            href="mailto:Kedhareswer.12110626@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            <Send className="w-4 h-4" />
            Send Direct Email
            <ArrowRight className="w-4 h-4" />
          </a>
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
