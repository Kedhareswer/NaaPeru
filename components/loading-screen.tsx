"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface LoadingScreenProps {
  onLoadingComplete?: () => void
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Counter animation
    const counterInterval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(counterInterval)
          return 100
        }
        return prev + 1
      })
    }, 25)

    // Minimum 3 seconds display
    const timer = setTimeout(() => {
      setIsLoading(false)
      if (onLoadingComplete) {
        onLoadingComplete()
      }
    }, 3200)

    return () => {
      clearInterval(counterInterval)
      clearTimeout(timer)
    }
  }, [onLoadingComplete])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Minimal brutalist loader */}
          <div className="relative flex flex-col items-center">
            {/* Animated Counter */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Large Counter Display */}
              <div className="text-[15vw] sm:text-[12vw] md:text-[10vw] font-bold text-black leading-none tracking-tighter font-mono">
                {String(count).padStart(2, '0')}
              </div>
              
              {/* Percentage sign */}
              <motion.span 
                className="absolute -right-8 top-0 text-4xl font-bold text-zinc-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                %
              </motion.span>
            </motion.div>

            {/* Minimal loading bar */}
            <motion.div
              className="w-64 h-0.5 bg-zinc-200 mt-12 relative overflow-hidden"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 256 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                className="absolute left-0 top-0 h-full bg-black"
                initial={{ width: "0%" }}
                animate={{ width: `${count}%` }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>

            {/* Text label */}
            <motion.p
              className="mt-8 text-xs font-medium tracking-[0.3em] text-zinc-400 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Loading
            </motion.p>

            {/* Corner ornaments */}
            <div className="fixed inset-0 pointer-events-none">
              {/* Top left */}
              <motion.div
                className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-zinc-200"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
              {/* Top right */}
              <motion.div
                className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-zinc-200"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
              {/* Bottom left */}
              <motion.div
                className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-zinc-200"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
              {/* Bottom right */}
              <motion.div
                className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-zinc-200"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
