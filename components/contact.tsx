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
  const formRef = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const isMobile = useIsMobile()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false)
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      }, 3000)
    }, 1500)
  }

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

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      subtitle: "Primary contact method",
      value: "Kedhareswer.12110626@gmail.com",
      href: "mailto:Kedhareswer.12110626@gmail.com",
      responseTime: "Within 24 hours",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      subtitle: "Professional networking",
      value: "Connect & Message",
      href: "https://www.linkedin.com/in/kedhareswernaidu/",
      responseTime: "Within 12 hours",
    },
    {
      icon: Github,
      title: "GitHub",
      subtitle: "Code collaboration",
      value: "View Projects & Contribute",
      href: "https://github.com/Kedhareswer",
      responseTime: "For technical discussions",
    },
  ]

  const quickInfo = [
    { icon: MapPin, label: "Location", value: "Madanapalle, India" },
    { icon: Clock, label: "Timezone", value: "IST (UTC+5:30)" },
    { icon: User, label: "Status", value: "Available for opportunities" },
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="lg:col-span-2"
          >
            <motion.div
              variants={staggerChildren}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8"
            >
              <motion.h3 variants={childVariants} className="text-2xl font-light mb-8 text-zinc-900">
                Send a Message
              </motion.h3>

              <motion.form ref={formRef} onSubmit={handleSubmit} className="space-y-6" variants={childVariants}>
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      className="bg-white border border-zinc-200 rounded-xl p-8 text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <motion.div
                        className="w-16 h-16 bg-zinc-900 text-white rounded-full mx-auto flex items-center justify-center mb-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <CheckCircle className="w-8 h-8" />
                      </motion.div>
                      <h4 className="text-xl font-medium mb-2 text-zinc-900">Message Sent Successfully</h4>
                      <p className="text-zinc-600">Thank you for reaching out. I'll respond within 24 hours.</p>
                    </motion.div>
                  ) : (
                    <motion.div className="space-y-6" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div variants={childVariants}>
                          <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-2">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200 bg-white"
                            placeholder="Your full name"
                          />
                        </motion.div>
                        <motion.div variants={childVariants}>
                          <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200 bg-white"
                            placeholder="your.email@example.com"
                          />
                        </motion.div>
                      </div>
                      <motion.div variants={childVariants}>
                        <label htmlFor="subject" className="block text-sm font-medium text-zinc-700 mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formState.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200 bg-white"
                          placeholder="What would you like to discuss?"
                        />
                      </motion.div>
                      <motion.div variants={childVariants}>
                        <label htmlFor="message" className="block text-sm font-medium text-zinc-700 mb-2">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200 bg-white resize-none"
                          placeholder="Tell me about your project, goals, or how we can collaborate..."
                        />
                      </motion.div>
                      <motion.div variants={childVariants}>
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-zinc-900 text-white py-4 px-6 rounded-xl hover:bg-zinc-800 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed font-medium"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <span>Send Message</span>
                              <Send className="w-5 h-5" />
                            </>
                          )}
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>
            </motion.div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-8"
          >
            {/* Quick Info */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6">
              <h3 className="text-lg font-medium mb-6 text-zinc-900">Quick Information</h3>
              <div className="space-y-4">
                {quickInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-zinc-200 rounded-lg flex items-center justify-center">
                      <info.icon className="w-4 h-4 text-zinc-600" />
                    </div>
                    <div>
                      <div className="text-sm text-zinc-500">{info.label}</div>
                      <div className="text-sm font-medium text-zinc-900">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Methods */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6">
              <h3 className="text-lg font-medium mb-6 text-zinc-900">Contact Methods</h3>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={index}
                    href={method.href}
                    target={method.href.startsWith("http") ? "_blank" : undefined}
                    rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-white transition-all duration-200 group"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-10 h-10 bg-zinc-200 rounded-lg flex items-center justify-center">
                      <method.icon className="w-5 h-5 text-zinc-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-zinc-900">{method.title}</div>
                      <div className="text-sm text-zinc-500">{method.subtitle}</div>
                      <div className="text-xs text-zinc-400">{method.responseTime}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <AvailabilityStatus
              onScheduleMeeting={() =>
                document.getElementById("schedule-meeting")?.scrollIntoView({ behavior: "smooth" })
              }
            />
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-20">
          {/* Schedule Meeting */}
          <motion.div
            id="schedule-meeting"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <ScheduleMeeting />
          </motion.div>

          {/* AI Chat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6"
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
        </div>
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
