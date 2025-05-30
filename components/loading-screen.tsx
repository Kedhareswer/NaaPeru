"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import TextPressure from "./TextPressure"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + 2, 100)
        if (newProgress === 100) {
          clearInterval(interval)
          setTimeout(() => setIsComplete(true), 1000) // Wait 1 second after reaching 100%
        }
        return newProgress
      })
    }, 50) // Slower increment for smoother animation

    return () => {
      document.body.style.overflow = "auto"
      clearInterval(interval)
    }
  }, [])

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          className="fixed inset-0 bg-white backdrop-blur-sm flex items-center justify-center z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.div
            className="flex flex-col items-center space-y-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1.0, ease: "easeOut" }}
          >
            <div style={{ position: 'relative', height: '300px', width: '400px', filter: 'contrast(1.1)' }}>
              <TextPressure
                text="Loading..."
                flex={true}
                alpha={true}
                stroke={true}
                width={true}
                weight={true}
                italic={true}
                textColor="#000000"
                strokeColor="#333333"
                strokeWidth={1.5}
                minFontSize={96}
              />
            </div>
            <motion.div 
              className="w-64 h-1 bg-gray-100 rounded-full overflow-hidden shadow-inner relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <motion.div
                className="h-full bg-black rounded-full shadow-lg"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none"
                animate={{ x: [0, 192] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: "linear"
                }}
                style={{ zIndex: 2 }}
              />
            </motion.div>
            <motion.p
              className="text-sm text-gray-600 font-light tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              {Math.round(progress)}% Complete
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
