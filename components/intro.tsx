"use client"
import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown } from "lucide-react"

export default function Intro() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <section
      id="intro"
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20"
    >
      {/* Primary noise texture overlay with subtle animation */}
      <motion.div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-25 z-10"
        style={{
          backgroundImage: 'url(/textures/noise-texture.svg)',
          backgroundSize: '500px 500px',
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 0.25,
          scale: [1, 1.02, 0.98, 1],
        }}
        transition={{
          opacity: { duration: 1.5 },
          scale: { repeat: Infinity, duration: 20, repeatType: "mirror" }
        }}
        aria-hidden="true"
      />
      
      {/* Secondary noise layer with different blend mode for depth */}
      <motion.div 
        className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-10 z-10"
        style={{
          backgroundImage: 'url(/textures/noise-texture.svg)',
          backgroundSize: '300px 300px',
          filter: 'contrast(120%) brightness(105%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 0.1,
          x: [0, 5, -5, 0],
          y: [0, -5, 5, 0],
        }}
        transition={{
          opacity: { duration: 2 },
          x: { repeat: Infinity, duration: 30, repeatType: "mirror" },
          y: { repeat: Infinity, duration: 25, repeatType: "mirror" }
        }}
        aria-hidden="true"
      />
      <motion.div 
        className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12" 
        style={{ opacity, scale }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full max-w-7xl mx-auto">
          {/* Left column */}
          <motion.div
            className="p-4 sm:p-6 lg:p-8 flex flex-col justify-center space-y-4 sm:space-y-6 lg:space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extralight leading-[1.1] sm:leading-tight tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Hey, I'm
              <br className="hidden sm:block" />
              <span className="inline-block mt-1 xs:mt-2">Kedhareswer</span>
            </motion.h1>

            <motion.p
              className="text-sm sm:text-base lg:text-lg xl:text-xl font-normal max-w-sm sm:max-w-xl lg:max-w-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              A driven B.Tech CSE student who embarked on an exciting journey into Data Science and AI. Through innovative thinking and technical expertise, Kedhareswer transformed complex data challenges into powerful insights that made a real difference.
            </motion.p>

            <motion.div
              className="mt-6 lg:mt-12 space-y-4 lg:space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="text-base xs:text-lg sm:text-xl font-medium text-zinc-800 dark:text-zinc-200 tracking-tight">Creating Impact Through Data</p>
              <p className="text-xs xs:text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-light tracking-wide">Ready to explore data-driven possibilities? Connect with Kedhareswer!</p>
              
              <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 sm:mt-6">
                <motion.a
                  href="mailto:Kedhareswer.12110626@gmail.com"
                  className="inline-flex items-center px-4 py-2 text-sm sm:text-base border-2 border-zinc-900 dark:border-zinc-100 rounded-lg hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Email
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/kedhareswernaidu/ "
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 text-sm sm:text-base border-2 border-zinc-900 dark:border-zinc-100 rounded-lg hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  LinkedIn
                </motion.a>
                <motion.a
                  href="https://github.com/Kedhareswer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 text-sm sm:text-base border-2 border-zinc-900 dark:border-zinc-100 rounded-lg hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  GitHub
                </motion.a>
                <motion.a
                  href="/Kedhareswer_Feb_update.pdf"
                  download
                  className="inline-flex items-center px-3 xs:px-4 py-1.5 xs:py-2 text-sm xs:text-base border-2 border-zinc-900 dark:border-zinc-100 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:bg-transparent hover:text-zinc-900 dark:hover:bg-transparent dark:hover:text-zinc-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download CV
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column */}
          <motion.div
            className="relative w-full aspect-[4/5] lg:aspect-square flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white/50 rounded-2xl sm:rounded-3xl shadow-xl backdrop-blur-sm mx-auto max-w-[320px] sm:max-w-[500px] lg:max-w-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              className="w-full h-full rounded-2xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 shadow-2xl ring-1 ring-zinc-900/5 dark:ring-white/10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="/me.jpeg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              className="absolute -bottom-3 sm:-bottom-4 -right-3 sm:-right-4 bg-black text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl shadow-xl backdrop-blur-sm"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="text-base sm:text-lg font-medium tracking-wide">Kedhareswer Naidu</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-6 sm:bottom-8 lg:bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3 }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center clickable"
          animate={{ y: [0, 10, 0] }}
          transition={{
            y: { repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatType: "reverse" },
          }}
        >
          <span className="text-xs tracking-widest uppercase mb-2">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.a>
      </motion.div>
    </section>
  );
}

