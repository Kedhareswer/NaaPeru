"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingScreen() {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm flex items-center justify-center z-[100]"
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
          <div className="relative w-40 h-40">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute border-[1.5px] border-zinc-800/60 dark:border-zinc-200/60"
                style={{
                  width: "100%",
                  height: "100%",
                  top: "0%",
                  left: "0%",
                  rotate: `${i * (360 / 5)}deg`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                  rotate: [`${i * (360 / 5)}deg`, `${i * (360 / 5) + 360}deg`],
                  scale: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
          >
            <motion.span
              className="text-lg font-light tracking-[0.3em] uppercase text-black/70"
              animate={{
                opacity: [0.5, 0.9, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Loading
            </motion.span>
            <motion.div
              className="flex space-x-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-black/70"
                  animate={{
                    scale: [0.85, 1.15, 0.85],
                    opacity: [0.5, 0.9, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}