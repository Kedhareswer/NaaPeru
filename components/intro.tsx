"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring, AnimatePresence } from "framer-motion"
import { ArrowDown, Code, Sparkles, Database } from "lucide-react"

export default function Intro() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [textReveal, setTextReveal] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const opacity = useTransform(smoothProgress, [0, 0.4], [1, 0])
  const scale = useTransform(smoothProgress, [0, 0.4], [1, 0.8])
  const y = useTransform(smoothProgress, [0, 0.4], [0, -50])
  const imageY = useTransform(smoothProgress, [0, 1], [0, 100])
  const backgroundY = useTransform(smoothProgress, [0, 1], [0, -50])
  
  useEffect(() => {
    const timer = setTimeout(() => setTextReveal(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.05 && !scrolled) {
      setScrolled(true)
    } else if (latest <= 0.05 && scrolled) {
      setScrolled(false)
    }
  })

  const nameChars = "Kedhareswer".split("")
  
  return (
    <section
      id="intro"
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-zinc-100 dark:from-black dark:to-zinc-900"
    >
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0)_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0)_70%)] z-0" />
      </motion.div>
      
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
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[Code, Database, Sparkles].map((Icon, i) => (
          <motion.div 
            key={i}
            className="absolute text-zinc-300/20 dark:text-zinc-700/20"
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

      <motion.div 
        className="absolute inset-0 flex items-center justify-center px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12" 
        style={{ opacity, scale, y }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 w-full max-w-7xl mx-auto">
          <motion.div
            ref={textRef}
            className="p-4 md:p-6 lg:p-8 flex flex-col justify-center space-y-4 md:space-y-6 lg:space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="overflow-hidden">
              <motion.h2
                className="text-sm md:text-base uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 font-light"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Turning Data into Actionable Insights
              </motion.h2>
            </div>
            
            <div className="overflow-hidden">
              <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extralight leading-tight tracking-tighter"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="block">
                  <span className="inline-block mr-2 md:mr-4 text-zinc-400 dark:text-zinc-500">Hey,</span>
                  <span className="inline-block">I'm</span>
                </span>
                <div className="mt-2 md:mt-4 overflow-hidden">
                  <div className="flex flex-wrap">
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
                className="text-sm md:text-base lg:text-lg max-w-xl text-zinc-600 dark:text-zinc-400 leading-relaxed"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                A passionate B.Tech CSE student with a natural talent for uncovering patterns in data. I combine technical expertise with creative problem-solving to transform complex data challenges into clear, actionable insights. My journey in Data Science and AI is driven by a genuine curiosity to make technology more accessible and impactful.
              </motion.p>
            </div>

            <motion.div
              className="mt-6 lg:mt-8 space-y-4 lg:space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="overflow-hidden">
                <motion.p 
                  className="text-lg md:text-xl font-medium text-zinc-800 dark:text-zinc-200 tracking-tight"
                  initial={{ y: 40 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                >
                  Let's Build Something Meaningful
                </motion.p>
              </div>
              
              <div className="overflow-hidden">
                <motion.p 
                  className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-light tracking-wide"
                  initial={{ y: 40 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  Have a data challenge? Let's collaborate and create impactful solutions together.
                </motion.p>
              </div>
              
              <motion.div 
                className="flex flex-wrap gap-3 md:gap-4 mt-4 md:mt-6"
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
                    className={`inline-flex items-center px-4 py-2 text-sm md:text-base border-2 rounded-lg transition-all duration-300 ${link.primary ? 
                      'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black hover:bg-transparent hover:text-black dark:hover:bg-transparent dark:hover:text-white' : 
                      'border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'}`}
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

          <motion.div
            className="relative w-full aspect-square max-w-[280px] md:max-w-[400px] lg:max-w-none mx-auto flex items-center justify-center p-4 md:p-6 lg:p-8"
            style={{ y: imageY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-white/50 to-zinc-200/50 dark:from-zinc-900/50 dark:to-black/50 rounded-2xl md:rounded-3xl transform rotate-[-4deg] scale-[0.96] z-0"
              initial={{ opacity: 0, rotate: -8, scale: 0.9 }}
              animate={{ opacity: 1, rotate: -4, scale: 0.96 }}
              transition={{ duration: 1, delay: 0.7 }}
            />
            
            <motion.div
              className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/20 dark:border-zinc-700/50 shadow-2xl backdrop-blur-sm z-10"
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
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-4 -left-4 w-12 md:w-16 h-12 md:h-16 bg-zinc-200 dark:bg-zinc-700 rounded-full z-0"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.5 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            />
            <motion.div 
              className="absolute -top-4 -right-4 w-16 md:w-24 h-16 md:h-24 bg-zinc-200 dark:bg-zinc-700 rounded-full z-0"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            />
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {!scrolled && (
          <motion.div
            className="absolute bottom-6 md:bottom-8 lg:bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 2 }}
          >
            <motion.a
              href="#about"
              className="flex flex-col items-center group"
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
  )
}