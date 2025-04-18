"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import ChatInterface from "./chat-interface"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="contact" className="py-24 md:py-32 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-light">Contact</h2>
          <div className="w-16 h-px bg-black mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            {/* Placeholder Section */}
            <h3 className="text-xl font-light mb-6">Placeholder Section</h3>
            <p className="text-gray-800 mb-8">
              This is a placeholder for future content or functionality.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
          >
            <ChatInterface />
          </motion.div>
        </div>
      </div>
    </section>
  )
}