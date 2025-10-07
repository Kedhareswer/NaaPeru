"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const pathname = usePathname()

  if (pathname?.startsWith("/project/")) {
    return null
  }

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
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-xl md:text-2xl font-black text-black tracking-tight">
                K
              </span>
              <motion.span
                className="w-1.5 h-1.5 bg-blue-500 rounded-full ml-1"
                animate={{ 
                  scale: [1, 1.3, 1],
                  transition: { 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }
                }}
              />
            </motion.div>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <a
                href="https://know-me-henna.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black transition-colors duration-200 group"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <span>సంచారి</span>
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
                className="absolute top-full right-0 mt-2 px-3 py-2 bg-black text-white text-xs rounded-md whitespace-nowrap pointer-events-none z-[60]"
                initial={{ opacity: 0, y: -10 }}
                animate={{ 
                  opacity: showTooltip ? 1 : 0,
                  y: showTooltip ? 0 : -10
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="font-semibold mb-1">సంచారి (sanchāri)</div>
                <div className="text-zinc-300">Telugu: Explorer</div>
                <div className="text-zinc-400 text-[10px] mt-1">Know more about me</div>
                {/* Arrow */}
                <div className="absolute -top-1 right-4 w-2 h-2 bg-black rotate-45" />
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
