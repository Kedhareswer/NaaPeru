"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface LoadingScreenProps {
  onLoadingComplete?: () => void
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 30)

    // Minimum 3 seconds display
    const timer = setTimeout(() => {
      setIsLoading(false)
      if (onLoadingComplete) {
        onLoadingComplete()
      }
    }, 3000)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(timer)
    }
  }, [onLoadingComplete])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="relative flex flex-col items-center justify-center">
            {/* Main Logo Animation */}
            <motion.div
              className="mb-8 flex items-center justify-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Animated Letters */}
              <div className="flex items-center space-x-1">
                {["M", ".", "K", ".", "N"].map((letter, index) => (
                  <motion.span
                    key={index}
                    className="text-6xl sm:text-7xl md:text-8xl font-bold text-black"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + index * 0.1,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <p className="text-sm sm:text-base font-medium text-zinc-600 tracking-wider uppercase">
                AI/ML Engineer
              </p>
            </motion.div>

            {/* Geometric Loading Animation */}
            <div className="relative w-64 h-1 bg-zinc-200 rounded-full overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-black rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Progress Percentage */}
            <motion.div
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1 }}
            >
              <span className="text-xs font-mono text-zinc-400">
                {progress.toFixed(0)}%
              </span>
            </motion.div>

            {/* Floating Geometric Shapes */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Top Left Square */}
              <motion.div
                className="absolute top-20 left-10 w-16 h-16 border-2 border-zinc-200"
                initial={{ rotate: 0, opacity: 0 }}
                animate={{
                  rotate: 360,
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Top Right Circle */}
              <motion.div
                className="absolute top-32 right-20 w-12 h-12 rounded-full border-2 border-zinc-200"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{
                  scale: [0.5, 1, 0.5],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Bottom Left Triangle */}
              <motion.div
                className="absolute bottom-24 left-16 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[40px] border-b-zinc-200"
                initial={{ rotate: 0, opacity: 0 }}
                animate={{
                  rotate: -360,
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Bottom Right Square */}
              <motion.div
                className="absolute bottom-20 right-12 w-14 h-14 border-2 border-zinc-200"
                initial={{ rotate: 45, opacity: 0 }}
                animate={{
                  rotate: 405,
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>

            {/* Pulsing Dots */}
            <motion.div
              className="absolute bottom-8 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.2 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-zinc-400"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
