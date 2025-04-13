"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Professional Networks */}
          <div>
            <h3 className="text-xl font-light mb-4">Connect</h3>
            <div className="space-y-2 text-gray-600">
              <a
                href="https://github.com/Kedhareswer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-black transition-colors"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/kedhareswernaidu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-black transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-light mb-4">Portfolio</h3>
            <div className="space-y-2 text-gray-600">
              <Link
                href="/#case-studies"
                className="block hover:text-black transition-colors"
              >
                Case Studies
              </Link>
              <Link
                href="/#about"
                className="block hover:text-black transition-colors"
              >
                Skills & Expertise
              </Link>
              <Link
                href="/#contact"
                className="block hover:text-black transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Thank You for Visiting My Portfolio.</p>
        </div>
      </div>
    </footer>
  )
}