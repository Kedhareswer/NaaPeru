"use client"

import { Github, Linkedin, MapPin, BarChart2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 py-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Motivation Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <h3 className="text-xl font-light mb-4 text-gray-900">Motivation</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              "AI is just the person dreaming bigger"
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="font-light">Madanapalle, Andhra Pradesh, India</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-light mb-4 text-gray-900">Quick Links</h3>
            <div className="space-y-3">
              <Link
                href="/#case-studies"
                className="block text-gray-600 hover:text-blue-600 transition-colors duration-200 font-light"
              >
                Case Studies
              </Link>
              <Link
                href="/#about"
                className="block text-gray-600 hover:text-blue-600 transition-colors duration-200 font-light"
              >
                Skills & Expertise
              </Link>
              <Link
                href="/#testimonials"
                className="block text-gray-600 hover:text-blue-600 transition-colors duration-200 font-light"
              >
                Testimonials
              </Link>
              <Link
                href="/#contact"
                className="block text-gray-600 hover:text-blue-600 transition-colors duration-200 font-light"
              >
                Contact
              </Link>
            </div>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-light mb-4 text-gray-900">Connect</h3>
            <div className="space-y-3">
              <a
                href="https://github.com/Kedhareswer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 font-light"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/kedhareswernaidu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 font-light"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
              <a
                href="https://www.kaggle.com/kedhareswernaidu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 font-light"
              >
                <BarChart2 className="w-5 h-5" />
                Kaggle
              </a>
            </div>
          </motion.div>
        </div>

        
      </div>
    </footer>
  )
}
