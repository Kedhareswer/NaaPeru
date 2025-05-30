"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring, AnimatePresence } from "framer-motion"
import { ArrowDown, Code, Sparkles, Database } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Intro() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [textReveal, setTextReveal] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const opacity = useTransform(smoothProgress, [0, 0.4], [1, 0])
  const scale = useTransform(smoothProgress, [0, 0.4], [1, 0.8])
  const y = useTransform(smoothProgress, [0, 0.4], [0, -50])
  const imageY = useTransform(smoothProgress, [0, 1], [0, isMobile ? 50 : 100])
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

    // Hide scroll indicator when user starts scrolling
    if (latest > 0.1) {
      setShowScrollIndicator(false)
    } else {
      setShowScrollIndicator(true)
    }
  })

  const nameChars = "Kedhareswer".split("")

  return (
    <section
      id="intro"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white"
    >
      {/* Background Elements */}
      <motion.div className="absolute inset-0 w-full h-full" style={{ y: backgroundY }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0)_70%)] z-0" />
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-25 z-10"
        style={{
          backgroundImage: "url(/textures/noise-texture.svg)",
          backgroundSize: isMobile ? "300px 300px" : "500px 500px",
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.25,
          scale: [1, 1.02, 0.98, 1],
        }}
        transition={{
          opacity: { duration: 1.5 },
          scale: { repeat: Number.POSITIVE_INFINITY, duration: 20, repeatType: "mirror" },
        }}
        aria-hidden="true"
      />

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[Code, Database, Sparkles].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute text-zinc-300/20"
            style={{
              left: isMobile ? `${15 + i * 30}%` : `${20 + i * 25}%`,
              top: isMobile ? `${25 + i * 20}%` : `${30 + i * 15}%`,
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, i % 2 === 0 ? 10 : -10, 0],
              rotate: [0, i % 2 === 0 ? 10 : -10, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 4 + i,
              ease: "easeInOut",
              repeatType: "mirror",
            }}
          >
            <Icon size={isMobile ? 12 + i * 4 : 24 + i * 12} />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-20 w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-8"
        style={{ opacity, scale, y }}
      >
        <div className="w-full max-w-7xl mx-auto">
          {/* Mobile Layout (< 768px) */}
          <div className="block md:hidden">
            <div className="flex flex-col items-center text-center space-y-6">
              {/* Profile Image - Mobile */}
              <motion.div
                className="relative w-32 h-32 xs:w-36 xs:h-36 sm:w-40 sm:h-40"
                style={{ y: imageY }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/50 to-zinc-200/50 rounded-2xl transform rotate-[-4deg] scale-[0.96] z-0"
                  initial={{ opacity: 0, rotate: -8, scale: 0.9 }}
                  animate={{ opacity: 1, rotate: -4, scale: 0.96 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                <motion.div
                  className="relative w-full h-full rounded-2xl overflow-hidden border border-white/20 shadow-xl backdrop-blur-sm z-10"
                  initial={{ opacity: 0, scale: 0.9, rotate: 4 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 1, delay: 0.7 }}
                  whileHover={{ scale: 1.05, rotate: -1 }}
                >
                  <img src="/me.jpg" alt="Profile" className="w-full h-full object-cover" />
                </motion.div>
              </motion.div>

              {/* Text Content - Mobile */}
              <motion.div
                ref={textRef}
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="overflow-hidden">
                  <motion.h2
                    className="text-[10px] xs:text-xs sm:text-sm uppercase tracking-[0.15em] xs:tracking-[0.2em] text-zinc-500 font-light"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Turning Data into Actionable Insights
                  </motion.h2>
                </div>

                <div className="overflow-hidden">
                  <motion.h1
                    className="text-xl xs:text-2xl sm:text-3xl font-extralight leading-tight tracking-tight"
                    initial={{ y: 50 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <span className="block mb-1">
                      <span className="text-zinc-400 mr-2">Hey,</span>
                      <span>I'm</span>
                    </span>
                    <div className="overflow-hidden">
                      <div className="flex flex-wrap justify-center">
                        {nameChars.map((char, index) => (
                          <motion.span
                            key={index}
                            className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-900"
                            initial={{ y: 50, opacity: 0 }}
                            animate={textReveal ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: 0.8 + index * 0.03,
                              ease: [0.33, 1, 0.68, 1],
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
                    className="text-xs xs:text-sm sm:text-base text-zinc-600 leading-relaxed max-w-sm mx-auto"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                  >
                    A passionate B.Tech CSE student with a natural talent for uncovering patterns in data. I transform
                    complex data challenges into clear, actionable insights.
                  </motion.p>
                </div>

                <motion.div
                  className="space-y-4 pt-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <div className="overflow-hidden">
                    <motion.p
                      className="text-sm xs:text-base sm:text-lg font-medium text-zinc-800"
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.5, delay: 1.3 }}
                    >
                      Let's Build Something Meaningful
                    </motion.p>
                  </div>

                  <div className="overflow-hidden">
                    <motion.p
                      className="text-xs xs:text-sm text-zinc-600 font-light"
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.5, delay: 1.4 }}
                    >
                      Have a data challenge? Let's collaborate together.
                    </motion.p>
                  </div>

                  {/* Action Buttons - Mobile */}
                  <motion.div
                    className="flex flex-col xs:flex-row gap-2 xs:gap-3 pt-4 justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.6 }}
                  >
                    {[
                      { label: "Download CV", href: "/Kedhareswer_May_update.pdf", download: true, primary: true },
                      { label: "Contact", href: "#contact", primary: false },
                    ].map((link, i) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        download={link.download}
                        className={`inline-flex items-center justify-center min-h-[44px] px-4 py-3 text-sm font-medium border-2 rounded-lg transition-all duration-300 ${
                          link.primary
                            ? "border-black bg-black text-white hover:bg-transparent hover:text-black"
                            : "border-black text-black hover:bg-black hover:text-white"
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 1.7 + i * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {link.label}
                      </motion.a>
                    ))}
                  </motion.div>

                  {/* Social Links - Mobile */}
                  <motion.div
                    className="flex gap-3 justify-center pt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.9 }}
                  >
                    {[
                      { label: "LinkedIn", href: "https://www.linkedin.com/in/kedhareswernaidu/" },
                      { label: "GitHub", href: "https://github.com/Kedhareswer" },
                      { label: "Email", href: "mailto:Kedhareswer.12110626@gmail.com" },
                    ].map((link, i) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-xs px-3 py-2 border border-zinc-300 rounded-full text-zinc-600 hover:border-zinc-600 hover:text-zinc-900 transition-all duration-200"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 2 + i * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {link.label}
                      </motion.a>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Desktop/Tablet Layout (>= 768px) */}
          <div className="hidden md:block">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-24 items-center min-h-[80vh]">
              {/* Text Content - Desktop */}
              <motion.div
                ref={textRef}
                className="order-2 lg:order-1 space-y-6 lg:space-y-8 text-center lg:text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="overflow-hidden">
                  <motion.h2
                    className="text-sm md:text-base lg:text-lg uppercase tracking-[0.2em] text-zinc-500 font-light"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Turning Data into Actionable Insights
                  </motion.h2>
                </div>

                <div className="overflow-hidden">
                  <motion.h1
                    className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extralight leading-tight tracking-tighter"
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <span className="block mb-2 lg:mb-4">
                      <span className="text-zinc-400 mr-3 lg:mr-4">Hey,</span>
                      <span>I'm</span>
                    </span>
                    <div className="overflow-hidden">
                      <div className="flex flex-wrap justify-center lg:justify-start">
                        {nameChars.map((char, index) => (
                          <motion.span
                            key={index}
                            className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-900"
                            initial={{ y: 100, opacity: 0 }}
                            animate={textReveal ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: 0.6 + index * 0.05,
                              ease: [0.33, 1, 0.68, 1],
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
                    className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 text-zinc-600 leading-relaxed"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    A passionate B.Tech CSE student with a natural talent for uncovering patterns in data. I combine
                    technical expertise with creative problem-solving to transform complex data challenges into clear,
                    actionable insights. My journey in Data Science and AI is driven by a genuine curiosity to make
                    technology more accessible and impactful.
                  </motion.p>
                </div>

                <motion.div
                  className="space-y-6 lg:space-y-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <div className="overflow-hidden">
                    <motion.p
                      className="text-lg md:text-xl lg:text-2xl font-medium text-zinc-800 tracking-tight"
                      initial={{ y: 40 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.5, delay: 1.1 }}
                    >
                      Let's Build Something Meaningful
                    </motion.p>
                  </div>

                  <div className="overflow-hidden">
                    <motion.p
                      className="text-sm md:text-base lg:text-lg text-zinc-600 font-light tracking-wide"
                      initial={{ y: 40 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                    >
                      Have a data challenge? Let's collaborate and create impactful solutions together.
                    </motion.p>
                  </div>

                  {/* Action Buttons - Desktop */}
                  <motion.div
                    className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4 pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                  >
                    {[
                      { label: "Email", href: "mailto:Kedhareswer.12110626@gmail.com" },
                      { label: "LinkedIn", href: "https://www.linkedin.com/in/kedhareswernaidu/", external: true },
                      { label: "GitHub", href: "https://github.com/Kedhareswer", external: true },
                      { label: "Download CV", href: "/Kedhareswer_May_update.pdf", download: true, primary: true },
                    ].map((link, i) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        download={link.download}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className={`inline-flex items-center min-h-[44px] min-w-[44px] px-4 md:px-6 py-3 text-sm md:text-base border-2 rounded-lg transition-all duration-300 ${
                          link.primary
                            ? "border-black bg-black text-white hover:bg-transparent hover:text-black"
                            : "border-black hover:bg-black hover:text-white"
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 1.5 + i * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {link.label}
                      </motion.a>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Profile Image - Desktop */}
              <motion.div
                className="order-1 lg:order-2 relative w-full max-w-md lg:max-w-lg xl:max-w-xl mx-auto aspect-square flex items-center justify-center"
                style={{ y: imageY }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/50 to-zinc-200/50 rounded-3xl lg:rounded-[2rem] transform rotate-[-4deg] scale-[0.96] z-0"
                  initial={{ opacity: 0, rotate: -8, scale: 0.9 }}
                  animate={{ opacity: 1, rotate: -4, scale: 0.96 }}
                  transition={{ duration: 1, delay: 0.7 }}
                />

                <motion.div
                  className="relative w-full h-full rounded-3xl lg:rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl backdrop-blur-sm z-10"
                  initial={{ opacity: 0, scale: 0.9, rotate: 4 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 1, delay: 0.9 }}
                  whileHover={{ scale: 1.02, rotate: -1 }}
                >
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

                {/* Decorative Elements */}
                <motion.div
                  className="absolute -bottom-6 -left-6 w-16 h-16 lg:w-24 lg:h-24 bg-zinc-200 rounded-full z-0"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.5 }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                />
                <motion.div
                  className="absolute -top-6 -right-6 w-20 h-20 lg:w-32 lg:h-32 bg-zinc-200 rounded-full z-0"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.3 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <AnimatePresence>
        {showScrollIndicator && !scrolled && (
          <motion.div
            className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 2 }}
          >
            <motion.a
              href="#about"
              className="flex flex-col items-center group"
              animate={{ y: [0, 8, 0] }}
              transition={{
                y: { repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatType: "reverse" },
              }}
            >
              <span className="text-[10px] xs:text-xs tracking-widest uppercase mb-2 opacity-70 group-hover:opacity-100 transition-opacity">
                Scroll
              </span>
              <motion.div
                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-zinc-300 group-hover:border-zinc-900 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
              </motion.div>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
