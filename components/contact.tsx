"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, Phone, MapPin, Github, Linkedin, MessageSquare } from "lucide-react"
import ChatInterface from "./chat-interface"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const isMobile = useIsMobile()

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
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

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 sm:mb-6 text-black leading-tight"
            variants={fadeIn}
          >
            Contact
          </motion.h2>

          <motion.div
            className="w-12 sm:w-16 h-px bg-black mx-auto mb-6 sm:mb-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: isMobile ? 48 : 64 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          <motion.p
            className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed"
            variants={fadeIn}
          >
            Let's connect and explore opportunities for collaboration.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerChildren}
        >
          {/* Contact Information */}
          <motion.div className="lg:col-span-1" variants={childVariants}>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-medium mb-6 text-black">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Email</p>
                      <a
                        href="mailto:Kedhareswer.12110626@gmail.com"
                        className="text-gray-600 hover:text-black transition-colors text-sm sm:text-base break-all sm:break-normal"
                      >
                        Kedhareswer.12110626@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Phone</p>
                      <a
                        href="tel:+919876543210"
                        className="text-gray-600 hover:text-black transition-colors text-sm sm:text-base"
                      >
                        +91 98765 43210
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Location</p>
                      <p className="text-gray-600 text-sm sm:text-base">Madanapalle, Andhra Pradesh, India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-6 border-t border-gray-200">
                <h4 className="font-medium text-black mb-4">Connect Online</h4>
                <div className="flex gap-3">
                  <a
                    href="https://www.linkedin.com/in/kedhareswernaidu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span className="sr-only">LinkedIn Profile</span>
                  </a>
                  <a
                    href="https://github.com/Kedhareswer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span className="sr-only">GitHub Profile</span>
                  </a>
                </div>
              </div>

              {/* Availability Status */}
              <div className="pt-6 border-t border-gray-200">
                <h4 className="font-medium text-black mb-4">Availability</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-gray-700 text-sm">Available for new opportunities</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    <p className="text-gray-700 text-sm">Response within 24-48 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* AI Assistant */}
          <motion.div className="lg:col-span-2" variants={childVariants}>
            <div className="border border-gray-200 rounded-2xl p-6 sm:p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-black">AI Assistant</h3>
                  <p className="text-gray-600 text-sm">Get instant answers about my experience and projects</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-3 font-medium">Try asking:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="leading-relaxed">"What are your technical skills?"</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="leading-relaxed">"Tell me about your projects"</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="leading-relaxed">"What's your experience?"</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="leading-relaxed">"How can we collaborate?"</span>
                  </div>
                </div>
              </div>

              <div className="h-[400px] sm:h-[450px]">
                <ChatInterface />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Divider */}
        <motion.div
          className="w-full h-px bg-gray-200 mt-16 sm:mt-20"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />

        {/* Simple Call to Action */}
        <motion.div
          className="text-center mt-12 sm:mt-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <p className="text-gray-600 mb-6 leading-relaxed max-w-2xl mx-auto">
            Ready to discuss your next project or explore collaboration opportunities?
          </p>
          <a
            href="mailto:Kedhareswer.12110626@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            <Mail className="w-5 h-5" />
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  )
}
