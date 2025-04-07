"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"

export default function LoadingScreen() {
  useEffect(() => {
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div className="flex flex-col items-center gap-12">
        <motion.div className="relative w-32 h-32">
          {/* Animated squares */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 left-0 w-16 h-16 border-2 border-black"
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{
                x: i % 2 === 0 ? 0 : 16,
                y: i < 2 ? 0 : 16,
                opacity: 0.5,
                rotate: [0, 90, 180, 270, 360],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        <motion.p
          className="text-base tracking-[0.4em] uppercase font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          Loading
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

