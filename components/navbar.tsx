"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Link from "next/link"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md border-b border-zinc-200" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              className="text-xl md:text-2xl font-bold text-black tracking-wider"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              M.K.N
            </motion.div>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <a
                href="https://your-main-portfolio-url.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-black transition-colors group"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <span>जानकारी</span>
                <motion.span
                  className="text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showTooltip ? 1 : 0 }}
                >
                  ?
                </motion.span>
              </a>
              
              {/* Tooltip */}
              <motion.div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-black text-white text-xs rounded-md whitespace-nowrap pointer-events-none"
                initial={{ opacity: 0, y: -10 }}
                animate={{ 
                  opacity: showTooltip ? 1 : 0,
                  y: showTooltip ? 0 : -10
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="font-semibold mb-1">जानकारी (jānkārī)</div>
                <div className="text-zinc-300">Hindi: Information, knowledge</div>
                <div className="text-zinc-400 text-[10px] mt-1">Know more about me</div>
                {/* Arrow */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45" />
              </motion.div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2">
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  )
}
