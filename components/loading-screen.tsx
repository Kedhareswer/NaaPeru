"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface LoadingScreenProps {
  onLoadingComplete?: () => void
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Minimum 5 seconds display for full animation
    const timer = setTimeout(() => {
      setIsLoading(false)
      if (onLoadingComplete) {
        onLoadingComplete()
      }
    }, 5000)

    return () => {
      clearTimeout(timer)
    }
  }, [onLoadingComplete])

  const letters = ["K", "e", "d", "h", "a", "r"]

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Main content container */}
          <motion.div
            className="relative flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -50 }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated Kedhar Typography */}
            <div className="relative mb-16">
              <motion.div 
                className="flex items-center justify-center"
                style={{ perspective: "1000px" }}
              >
                {letters.map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      opacity: 0,
                      y: 100,
                      rotateX: -90,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      scale: 1,
                    }}
                    transition={{
                      delay: 0.1 * index,
                      duration: 0.8,
                      type: "spring",
                      damping: 25,
                      stiffness: 100,
                    }}
                    className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[6vw] xl:text-[5vw] 
                             font-black text-slate-900 leading-none tracking-tight
                             drop-shadow-sm transform-gpu"
                    style={{
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
                
                {/* Animated accent dot */}
                <motion.span
                  initial={{ 
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    scale: [0, 1.2, 1],
                    opacity: 1,
                  }}
                  transition={{
                    delay: 1.2,
                    duration: 0.6,
                  }}
                  className="w-[2.5vw] h-[2.5vw] sm:w-[2vw] sm:h-[2vw] md:w-[1.5vw] md:h-[1.5vw] 
                           lg:w-[1.2vw] lg:h-[1.2vw] xl:w-[1vw] xl:h-[1vw]
                           bg-gradient-to-r from-blue-500 to-purple-600 rounded-full 
                           ml-2 shadow-lg transform-gpu"
                />
              </motion.div>

              {/* Subtle glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                         blur-3xl -z-10 rounded-full"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.5 }}
                transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
              />
            </div>

            {/* Modern progress indicator */}
            <motion.div
              className="relative w-64 h-1 bg-slate-200 rounded-full overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-slate-900 to-slate-700 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  delay: 0.5,
                  duration: 2.5,
                }}
              />
              
              {/* Progress glow */}
              <motion.div
                className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
                animate={{ x: [-32, 256] }}
                transition={{
                  delay: 0.8,
                  duration: 2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </motion.div>

            {/* Elegant loading text */}
            <motion.p
              className="mt-8 text-sm font-medium tracking-[0.2em] text-slate-500 uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              Portfolio Loading
            </motion.p>
          </motion.div>

          {/* Minimalist corner elements */}
          <div className="fixed inset-0 pointer-events-none">
            {/* Top corners */}
            <motion.div
              className="absolute top-8 left-8 w-12 h-12 border-l border-t border-slate-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
            />
            <motion.div
              className="absolute top-8 right-8 w-12 h-12 border-r border-t border-slate-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.1, duration: 0.5 }}
            />
            
            {/* Bottom corners */}
            <motion.div
              className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-slate-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.2, duration: 0.5 }}
            />
            <motion.div
              className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-slate-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.3, duration: 0.5 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
