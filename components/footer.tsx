"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Professional Networks */}
          <div>
            <h3 className="text-xl font-medium tracking-wide mb-6">Connect</h3>
            <div className="space-y-4 text-gray-600">
              <a
                href="https://github.com/Kedhareswer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-black transition-colors duration-300"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/kedhareswernaidu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-black transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-medium tracking-wide mb-6">Portfolio</h3>
            <div className="space-y-4 text-gray-600">
              <Link
                href="/#case-studies"
                className="block hover:text-black transition-colors duration-300"
              >
                Case Studies
              </Link>
              <Link
                href="/#about"
                className="block hover:text-black transition-colors duration-300"
              >
                Skills & Expertise
              </Link>
              <Link
                href="/#contact"
                className="block hover:text-black transition-colors duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm tracking-wide">
          <p>© {new Date().getFullYear()} Thank You for Visiting My Portfolio.</p>
        </div>
      </div>
    </footer>
  )
}