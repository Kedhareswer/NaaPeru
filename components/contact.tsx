"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Send, Mail, MapPin, Sparkles, Calendar, ExternalLink } from "lucide-react"
import ChatInterface from "./chat-interface"
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

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "Kedhareswer.12110626@gmail.com",
      href: "mailto:Kedhareswer.12110626@gmail.com",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Madanapalle, India",
      href: "https://maps.google.com/?q=Madanapalle,India",
    },
    {
      icon: Calendar,
      label: "Availability",
      value: "Open to opportunities",
      href: null,
    },
  ]

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-zinc-50 -z-10" />

      <motion.div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-25 -z-10"
        style={{
          backgroundImage: "url(/textures/noise-texture.svg)",
          backgroundSize: "500px 500px",
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.25,
          scale: [1, 1.02, 0.98, 1],
        }}
        transition={{
          opacity: { duration: 1.5 },
          scale: { repeat: Number.POSITIVE_INFINITY, duration: 20, repeatType: "mirror" },
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="mb-16 md:mb-24 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-light inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Contact
          </motion.h2>
          <motion.div
            className="w-16 h-px bg-black mt-4 mx-auto md:mx-0"
            initial={{ width: 0 }}
            animate={isInView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.p
            className="mt-6 text-zinc-600 max-w-xl mx-auto md:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Have a question or want to work together? Reach out through the form or chat with my virtual assistant.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              className="absolute -top-10 -left-10 w-20 h-20 bg-zinc-100 rounded-full opacity-50 -z-10"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />

            <motion.div
              className="absolute -bottom-10 -right-10 w-32 h-32 bg-zinc-100 rounded-full opacity-30 -z-10"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />

            <motion.div
              variants={staggerChildren}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="bg-white/80 backdrop-blur-sm border border-zinc-100 rounded-2xl p-6 md:p-8 shadow-xl"
            >
              <motion.h3 variants={childVariants} className="text-xl font-light mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-zinc-400" />
                <span>Get in Touch</span>
              </motion.h3>

              {/* Contact Information */}
              <motion.div className="space-y-6 mb-8" variants={childVariants}>
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4"
                    variants={childVariants}
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-zinc-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-zinc-400">{item.label}</h4>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-zinc-800 hover:text-black hover:underline flex items-center gap-1 group"
                        >
                          {item.value}
                          {item.href.startsWith("http") && (
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </a>
                      ) : (
                        <p className="text-zinc-800">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Contact Form */}
              <motion.form ref={formRef} onSubmit={handleSubmit} className="space-y-4" variants={childVariants}>
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-zinc-800 to-black rounded-full mx-auto flex items-center justify-center mb-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Check className="w-8 h-8 text-white" />
                      </motion.div>
                      <h4 className="text-xl font-medium mb-2">Message Sent!</h4>
                      <p className="text-zinc-600">Thank you for reaching out. I'll get back to you soon.</p>
                    </motion.div>
                  ) : (
                    <motion.div className="space-y-4" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.div variants={childVariants}>
                          <label htmlFor="name" className="block text-sm font-medium text-zinc-600 mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                          />
                        </motion.div>
                        <motion.div variants={childVariants}>
                          <label htmlFor="email" className="block text-sm font-medium text-zinc-600 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                          />
                        </motion.div>
                      </div>
                      <motion.div variants={childVariants}>
                        <label htmlFor="subject" className="block text-sm font-medium text-zinc-600 mb-1">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formState.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        />
                      </motion.div>
                      <motion.div variants={childVariants}>
                        <label htmlFor="message" className="block text-sm font-medium text-zinc-600 mb-1">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleInputChange}
                          required
                          rows={5}
                          className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 transition-all duration-200 bg-white/80 backdrop-blur-sm resize-none"
                        />
                      </motion.div>
                      <motion.div variants={childVariants}>
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-black to-zinc-800 text-white py-3 px-6 rounded-xl hover:from-zinc-900 hover:to-black transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
                              <Send className="w-4 h-4" />
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

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              className="absolute -top-16 -right-16 w-32 h-32 bg-zinc-100 rounded-full opacity-30 -z-10"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />

            <motion.div
              className="absolute -bottom-8 -left-8 w-16 h-16 bg-zinc-100 rounded-full opacity-50 -z-10"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />

            <motion.div
              className="bg-white/80 backdrop-blur-sm border border-zinc-100 rounded-2xl p-4 shadow-xl h-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="p-2">
                <motion.h3
                  className="text-xl font-light mb-4 flex items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <MessageSquare className="w-5 h-5 text-zinc-400" />
                  <span>Chat with AI Assistant</span>
                </motion.h3>
                <motion.p
                  className="text-sm text-zinc-600 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Get quick answers about my experience, projects, or schedule an appointment.
                </motion.p>
              </div>

              <ChatInterface />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Missing components from lucide-react
function Check(props: React.SVGProps<SVGSVGElement>) {
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

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

function MessageSquare(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
