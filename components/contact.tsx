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
} from "lucide-react"
import ChatInterface from "./chat-interface"
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
    <section id="contact" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 sm:mb-6 text-black leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Let's Connect & Collaborate
          </motion.h2>

          <motion.div
            className="w-12 sm:w-16 h-px bg-black mx-auto mb-6 sm:mb-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: isMobile ? 48 : 64 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          <motion.p
            className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0"
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
          className="mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {collaborationTypes.map((type, index) => (
              <motion.div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 text-center hover:border-black transition-all duration-300 group min-h-[280px] sm:min-h-[320px] flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-black text-white rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <type.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium mb-3 text-black">{type.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">{type.description}</p>
                </div>
                <ul className="space-y-2">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-gray-500 flex items-center justify-center">
                      <div className="w-1 h-1 bg-gray-400 rounded-full mr-2 flex-shrink-0" />
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {/* Direct Contact */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-medium mb-6 text-black flex items-center gap-3">
              <Mail className="w-5 h-5 flex-shrink-0" />
              Direct Contact
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-gray-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-black mb-1">Email</p>
                  <a
                    href="mailto:Kedhareswer.12110626@gmail.com"
                    className="text-gray-600 hover:text-black transition-colors break-all sm:break-normal text-sm sm:text-base"
                  >
                    Kedhareswer.12110626@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gray-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-black mb-1">Location</p>
                  <p className="text-gray-600 text-sm sm:text-base">Madanapalle, Andhra Pradesh, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-gray-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-black mb-1">Response Time</p>
                  <p className="text-gray-600 text-sm sm:text-base">Usually within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="https://www.linkedin.com/in/kedhareswernaidu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm sm:text-base min-h-[48px]"
                >
                  <Linkedin className="w-4 h-4 flex-shrink-0" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Kedhareswer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-4 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base min-h-[48px]"
                >
                  <Github className="w-4 h-4 flex-shrink-0" />
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* AI Assistant */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-medium mb-6 text-black flex items-center gap-3">
              <MessageSquare className="w-5 h-5 flex-shrink-0" />
              AI Assistant
            </h3>
            <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
              Get instant answers about my experience, projects, or technical expertise through the AI assistant.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-3 font-medium">Try asking:</p>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="leading-relaxed">"Tell me about your machine learning projects"</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="leading-relaxed">"What are your technical skills?"</span>
                </li>

              </ul>
            </div>

            <div className="h-[300px] sm:h-[350px]">
              <ChatInterface />
            </div>
          </div>
        </motion.div>



        {/* Call to Action */}
        <motion.div
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed px-4 sm:px-0">
            Prefer a different way to connect? I'm always open to new opportunities and collaborations.
          </p>
          <a
            href="mailto:Kedhareswer.12110626@gmail.com"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm sm:text-base min-h-[48px]"
          >
            <Send className="w-4 h-4 flex-shrink-0" />
            Send Direct Email
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
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
