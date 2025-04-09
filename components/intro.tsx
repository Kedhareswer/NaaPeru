"use client"
import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring, AnimatePresence } from "framer-motion"
import { ArrowDown, Code, Sparkles, Database } from "lucide-react"

export default function Intro() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [textReveal, setTextReveal] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  // Scroll progress for parallax and fade effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Smooth spring animation for scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Transform values based on scroll position
  const opacity = useTransform(smoothProgress, [0, 0.4], [1, 0])
  const scale = useTransform(smoothProgress, [0, 0.4], [1, 0.8])
  const y = useTransform(smoothProgress, [0, 0.4], [0, -50])
  
  // Parallax effects for different elements
  const imageY = useTransform(smoothProgress, [0, 1], [0, 100])
  const backgroundY = useTransform(smoothProgress, [0, 1], [0, -50])
  
  // Trigger text reveal animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => setTextReveal(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Track scroll position to trigger animations
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.05 && !scrolled) {
      setScrolled(true)
    } else if (latest <= 0.05 && scrolled) {
      setScrolled(false)
    }
  })

  // Character animation for text reveal
  const nameChars = "Kedhareswer".split("")
  
  return (
    <section
      id="intro"
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-800"
    >
      {/* Background elements with parallax effect */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,rgba(255,255,255,0)_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(30,30,30,0.8)_0%,rgba(30,30,30,0)_70%)] z-0" />
      </motion.div>
      
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
      
      {/* Floating icons with random movement */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[Code, Database, Sparkles].map((Icon, i) => (
          <motion.div 
            key={i}
            className="absolute text-zinc-300/20 dark:text-zinc-600/20"
            style={{
              left: `${20 + i * 25}%`,
              top: `${30 + i * 15}%`,
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, i % 2 === 0 ? 10 : -10, 0],
              rotate: [0, i % 2 === 0 ? 10 : -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4 + i,
              ease: "easeInOut",
              repeatType: "mirror",
            }}
          >
            <Icon size={24 + i * 12} />
          </motion.div>
        ))}
      </div>

      {/* Main content with scroll-based animations */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12" 
        style={{ opacity, scale, y }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full max-w-7xl mx-auto">
          {/* Left column - Text content */}
          <motion.div
            ref={textRef}
            className="p-4 sm:p-6 lg:p-8 flex flex-col justify-center space-y-4 sm:space-y-6 lg:space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="overflow-hidden">
              <motion.h2
                className="text-sm sm:text-base uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 font-light"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Data Scientist & AI Enthusiast
              </motion.h2>
            </div>
            
            <div className="overflow-hidden">
              <motion.h1
                className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extralight leading-[1.1] sm:leading-tight tracking-tighter"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="block">
                  <span className="inline-block mr-4 text-zinc-400 dark:text-zinc-500">Hey,</span>
                  <span className="inline-block">I'm</span>
                </span>
                <div className="mt-2 sm:mt-4 overflow-hidden">
                  <div className="flex">
                    {nameChars.map((char, index) => (
                      <motion.span 
                        key={index}
                        className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-900 dark:from-zinc-100 dark:via-zinc-400 dark:to-zinc-100"
                        initial={{ y: 100, opacity: 0 }}
                        animate={textReveal ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.6 + index * 0.05,
                          ease: [0.33, 1, 0.68, 1]
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.h1>
            </div>

            <div className="overflow-hidden">
              <motion.p
                className="text-sm sm:text-base lg:text-lg xl:text-xl font-normal max-w-sm sm:max-w-xl lg:max-w-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                A driven B.Tech CSE student who embarked on an exciting journey into Data Science and AI. Through innovative thinking and technical expertise, Kedhareswer transformed complex data challenges into powerful insights that made a real difference.
              </motion.p>
            </div>

            <motion.div
              className="mt-6 lg:mt-12 space-y-4 lg:space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="overflow-hidden">
                <motion.p 
                  className="text-base xs:text-lg sm:text-xl font-medium text-zinc-800 dark:text-zinc-200 tracking-tight"
                  initial={{ y: 40 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                >
                  Creating Impact Through Data
                </motion.p>
              </div>
              
              <div className="overflow-hidden">
                <motion.p 
                  className="text-xs xs:text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-light tracking-wide"
                  initial={{ y: 40 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  Ready to explore data-driven possibilities? Connect with Kedhareswer!
                </motion.p>
              </div>
              
              <motion.div 
                className="flex flex-wrap gap-3 sm:gap-4 mt-4 sm:mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                {[
                  { label: "Email", href: "mailto:Kedhareswer.12110626@gmail.com" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/kedhareswernaidu/", external: true },
                  { label: "GitHub", href: "https://github.com/Kedhareswer", external: true },
                  { label: "Download CV", href: "/Kedhareswer_Feb_update.pdf", download: true, primary: true }
                ].map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    download={link.download}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className={`inline-flex items-center px-4 py-2 text-sm sm:text-base border-2 rounded-lg transition-all duration-300 ${link.primary ? 
                      'border-zinc-900 dark:border-zinc-100 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-transparent hover:text-zinc-900 dark:hover:bg-transparent dark:hover:text-zinc-100' : 
                      'border-zinc-900 dark:border-zinc-100 hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1.5 + (i * 0.1) }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right column - Profile image with effects */}
          <motion.div
            className="relative w-full aspect-[4/5] lg:aspect-square flex items-center justify-center p-4 sm:p-6 lg:p-8 mx-auto max-w-[320px] sm:max-w-[500px] lg:max-w-none"
            style={{ y: imageY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-zinc-100/50 to-zinc-300/50 dark:from-zinc-800/50 dark:to-zinc-900/50 rounded-2xl sm:rounded-3xl transform rotate-[-4deg] scale-[0.96] z-0"
              initial={{ opacity: 0, rotate: -8, scale: 0.9 }}
              animate={{ opacity: 1, rotate: -4, scale: 0.96 }}
              transition={{ duration: 1, delay: 0.7 }}
            />
            
            <motion.div
              className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 dark:border-zinc-700/50 shadow-2xl backdrop-blur-sm z-10"
              initial={{ opacity: 0, scale: 0.9, rotate: 4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              whileHover={{ scale: 1.02, rotate: -1 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/30 dark:from-zinc-800/10 dark:to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 1 }}
              />
              
              <motion.div 
                className="w-full h-full relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
              >
                <img
                  src="/me.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover transition-transform duration-700"
                />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-3 sm:-bottom-4 -right-3 sm:-right-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl shadow-xl backdrop-blur-sm border border-white/20 dark:border-zinc-900/50 z-20"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2, type: "spring" }}
                whileHover={{ y: -4, scale: 1.05 }}
              >
              </motion.div>
            </motion.div>
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-zinc-200 dark:bg-zinc-700 rounded-full z-0"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.5 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            />
            <motion.div 
              className="absolute -top-4 -right-4 w-24 h-24 bg-zinc-200 dark:bg-zinc-700 rounded-full z-0"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator with animation */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            className="absolute bottom-6 sm:bottom-8 lg:bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 2 }}
          >
            <motion.a
              href="#about"
              className="flex flex-col items-center clickable group"
              animate={{ y: [0, 10, 0] }}
              transition={{
                y: { repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatType: "reverse" },
              }}
            >
              <span className="text-xs tracking-widest uppercase mb-2 opacity-70 group-hover:opacity-100 transition-opacity">Scroll</span>
              <motion.div 
                className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 group-hover:border-zinc-900 dark:group-hover:border-zinc-300 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <ArrowDown className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </motion.div>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

