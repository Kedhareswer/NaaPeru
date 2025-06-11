"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { MapPin, Calendar, Download, Mail, ArrowDown } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Intro() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const isInView = useInView(containerRef, { once: true })

  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

  const words = ["Data Scientist", "ML Engineer", "AI Specialist", "Problem Solver", "Vibe Coder"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  const imageVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
      filter: "grayscale(100%) contrast(120%)",
    },
    visible: {
      scale: 1,
      opacity: 1,
      filter: "grayscale(100%) contrast(120%)",
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const floatingElements = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
  }))

  return (
    <motion.section
      id="intro"
      ref={containerRef}
      className="relative w-full bg-white overflow-hidden"
      style={{
        y,
        opacity,
        // Proper spacing to avoid navbar collision
        paddingTop: "clamp(80px, 12vh, 120px)",
        minHeight: "100vh",
      }}
    >
      {/* Floating geometric elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute border border-black/10"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size}px`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: element.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
            linear-gradient(to right, black 1px, transparent 1px),
            linear-gradient(to bottom, black 1px, transparent 1px)
          `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Custom cursor follower */}
      {!isMobile && (
        <motion.div
          className="fixed w-4 h-4 border border-black rounded-full pointer-events-none z-50 mix-blend-difference"
          animate={{
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
            scale: isHovering ? 2 : 1,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
      )}

      <div className="relative z-10 flex items-center justify-center" style={{ minHeight: "calc(100vh - 120px)" }}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Layout */}
          <div className="block lg:hidden">
            <motion.div className="text-center space-y-6 sm:space-y-8 py-8" style={{ scale }}>
              {/* Status indicator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 border border-black/20 rounded-full"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-black/70">
                  Available for opportunities
                </span>
              </motion.div>

              {/* Main heading with typewriter effect */}
              <div className="space-y-3 sm:space-y-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight text-black">
                    {"Hello, I'm".split("").map((letter, i) => (
                      <motion.span
                        key={i}
                        custom={i}
                        variants={letterVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="inline-block"
                      >
                        {letter === " " ? "\u00A0" : letter}
                      </motion.span>
                    ))}
                  </h1>

                  <div className="relative h-12 sm:h-14 md:h-16 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.h2
                        key={currentWordIndex}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-black absolute inset-0"
                      >
                        {words[currentWordIndex]}
                      </motion.h2>
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* Decorative line */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "3rem" } : {}}
                  transition={{ duration: 1, delay: 1 }}
                  className="h-px bg-black mx-auto"
                />
              </div>

              {/* Profile image with mask effect */}
              <motion.div
                ref={imageRef}
                variants={imageVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto"
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
              >
                <div className="absolute inset-0 bg-black/5 rounded-full" />
                <motion.div
                  className="relative w-full h-full rounded-full overflow-hidden border-2 border-black/10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src="/me.jpg" alt="Kedhareswer" className="w-full h-full object-cover grayscale contrast-125" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Floating name tag */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="absolute -bottom-3 sm:-bottom-4 left-1/2 transform -translate-x-1/2 bg-white border border-black/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg"
                >
                  <span className="text-xs sm:text-sm font-medium text-black">Kedhareswer</span>
                </motion.div>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-sm sm:text-base text-black/70 leading-relaxed max-w-sm sm:max-w-md mx-auto px-4"
              >
                Transforming complex data challenges into clear, actionable insights that drive meaningful business
                results through innovative AI solutions.
              </motion.p>

              {/* Contact info - Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="grid grid-cols-1 xs:grid-cols-2 gap-4 max-w-sm mx-auto"
              >
                <div className="flex items-center justify-center xs:justify-start gap-3">
                  <div className="w-8 h-8 border border-black/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-black/70" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-medium text-black uppercase tracking-wider">Location</p>
                    <p className="text-xs text-black/70">Madanapalle, India</p>
                  </div>
                </div>

                <div className="flex items-center justify-center xs:justify-start gap-3">
                  <div className="w-8 h-8 border border-black/20 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-black/70" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-medium text-black uppercase tracking-wider">Status</p>
                    <p className="text-xs text-black/70">Open to opportunities</p>
                  </div>
                </div>
              </motion.div>

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 }}
                className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center max-w-sm mx-auto"
              >
                <motion.a
                  href="/Kedhareswer_May_update.pdf"
                  download
                  className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-black text-white rounded-none overflow-hidden min-h-[44px]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setIsHovering(true)}
                  onHoverEnd={() => setIsHovering(false)}
                >
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300 flex items-center gap-2 text-sm sm:text-base">
                    <Download className="w-4 h-4" />
                    Download CV
                  </span>
                </motion.a>

                <motion.a
                  href="#contact"
                  className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-black text-black rounded-none overflow-hidden min-h-[44px]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setIsHovering(true)}
                  onHoverEnd={() => setIsHovering(false)}
                >
                  <motion.div
                    className="absolute inset-0 bg-black"
                    initial={{ y: "100%" }}
                    whileHover={{ y: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2 text-sm sm:text-base">
                    <Mail className="w-4 h-4" />
                    Get in Touch
                  </span>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <motion.div
              className="grid grid-cols-12 gap-8 xl:gap-12 items-center py-12"
              style={{
                scale,
                minHeight: "calc(100vh - 200px)",
              }}
            >
              {/* Left content */}
              <div className="col-span-7 space-y-6 xl:space-y-8">
                {/* Status indicator */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="inline-flex items-center gap-3 px-6 py-3 border border-black/20 rounded-none"
                >
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm uppercase tracking-[0.3em] text-black/70 font-light">
                    Available for opportunities
                  </span>
                </motion.div>

                {/* Main heading */}
                <div className="space-y-4 xl:space-y-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 0.4 }}
                  >
                    <h1 className="text-5xl xl:text-6xl 2xl:text-7xl font-light leading-tight text-black">
                      {"Hello, I'm".split("").map((letter, i) => (
                        <motion.span
                          key={i}
                          custom={i}
                          variants={letterVariants}
                          initial="hidden"
                          animate={isInView ? "visible" : "hidden"}
                          className="inline-block"
                        >
                          {letter === " " ? "\u00A0" : letter}
                        </motion.span>
                      ))}
                    </h1>

                    <div className="relative h-16 xl:h-20 2xl:h-24 overflow-hidden mt-4">
                      <AnimatePresence mode="wait">
                        <motion.h2
                          key={currentWordIndex}
                          initial={{ y: 80, opacity: 0, rotateX: 90 }}
                          animate={{ y: 0, opacity: 1, rotateX: 0 }}
                          exit={{ y: -80, opacity: 0, rotateX: -90 }}
                          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-black absolute inset-0"
                        >
                          {words[currentWordIndex]}
                        </motion.h2>
                      </AnimatePresence>
                    </div>
                  </motion.div>

                  {/* Decorative elements */}
                  <div className="flex items-center gap-6 xl:gap-8">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: "6rem" } : {}}
                      transition={{ duration: 1.2, delay: 1 }}
                      className="h-px bg-black"
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: 1.2 }}
                      className="w-2 h-2 bg-black rounded-full"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: "3rem" } : {}}
                      transition={{ duration: 1.2, delay: 1.4 }}
                      className="h-px bg-black/50"
                    />
                  </div>
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="text-lg xl:text-xl text-black/70 leading-relaxed max-w-2xl font-light"
                >
                  Transforming complex data challenges into clear, actionable insights that drive meaningful business
                  results through innovative AI solutions and cutting-edge machine learning techniques.
                </motion.p>

                {/* Contact info */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="grid grid-cols-2 gap-6 xl:gap-8"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 border border-black/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-black/70" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black uppercase tracking-wider">Location</p>
                      <p className="text-sm text-black/70">Madanapalle, India</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 border border-black/20 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-black/70" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black uppercase tracking-wider">Status</p>
                      <p className="text-sm text-black/70">Open to opportunities</p>
                    </div>
                  </div>
                </motion.div>

                {/* Action buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="flex gap-4 xl:gap-6 pt-4"
                >
                  <motion.a
                    href="/Kedhareswer_May_update.pdf"
                    download
                    className="group relative inline-flex items-center justify-center px-8 xl:px-10 py-4 xl:py-5 bg-black text-white rounded-none overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onHoverStart={() => setIsHovering(true)}
                    onHoverEnd={() => setIsHovering(false)}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <span className="relative z-10 group-hover:text-black transition-colors duration-400 flex items-center gap-3 font-medium">
                      <Download className="w-5 h-5" />
                      Download CV
                    </span>
                  </motion.a>

                  <motion.a
                    href="#contact"
                    className="group relative inline-flex items-center justify-center px-8 xl:px-10 py-4 xl:py-5 border-2 border-black text-black rounded-none overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onHoverStart={() => setIsHovering(true)}
                    onHoverEnd={() => setIsHovering(false)}
                  >
                    <motion.div
                      className="absolute inset-0 bg-black"
                      initial={{ y: "100%" }}
                      whileHover={{ y: "0%" }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <span className="relative z-10 group-hover:text-white transition-colors duration-400 flex items-center gap-3 font-medium">
                      <Mail className="w-5 h-5" />
                      Get in Touch
                    </span>
                  </motion.a>
                </motion.div>
              </div>

              {/* Right content - Image */}
              <div className="col-span-5">
                <motion.div
                  ref={imageRef}
                  variants={imageVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="relative"
                  onHoverStart={() => setIsHovering(true)}
                  onHoverEnd={() => setIsHovering(false)}
                >
                  {/* Background geometric shapes */}
                  <motion.div
                    className="absolute -inset-6 xl:-inset-8 border border-black/10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute -inset-3 xl:-inset-4 border border-black/5"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />

                  {/* Main image container */}
                  <motion.div
                    className="relative aspect-square rounded-none overflow-hidden border-4 border-black/20"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img
                      src="/me.jpg"
                      alt="Kedhareswer - Data Science Specialist"
                      className="w-full h-full object-cover grayscale contrast-125"
                    />

                    {/* Overlay effects */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-transparent via-black/5 to-black/20"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    />

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-6 xl:w-8 h-6 xl:h-8 border-t-4 border-l-4 border-black" />
                    <div className="absolute top-0 right-0 w-6 xl:w-8 h-6 xl:h-8 border-t-4 border-r-4 border-black" />
                    <div className="absolute bottom-0 left-0 w-6 xl:w-8 h-6 xl:h-8 border-b-4 border-l-4 border-black" />
                    <div className="absolute bottom-0 right-0 w-6 xl:w-8 h-6 xl:h-8 border-b-4 border-r-4 border-black" />
                  </motion.div>

                  {/* Floating name tag */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="absolute -bottom-6 xl:-bottom-8 left-6 xl:left-8 bg-white border-2 border-black px-4 xl:px-6 py-2 xl:py-3 shadow-lg"
                  >
                    <span className="text-base xl:text-lg font-bold text-black tracking-wider">KEDHARESWER</span>
                    <div className="text-xs text-black/70 uppercase tracking-[0.2em] mt-1">Data Scientist</div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-black/50 font-light">
            Scroll to explore
          </span>
          <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 text-black/50" />
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
