"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ReactNode } from "react"

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="min-h-screen w-full"
        initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
        animate={{ 
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          transition: {
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1]
          }
        }}
        exit={{ 
          opacity: 0,
          clipPath: "inset(100% 0 0 0)",
          transition: {
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1]
          }
        }}
      >
        <motion.main
          initial={{ opacity: 0, y: 40 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.8,
              delay: 0.2,
              ease: [0.76, 0, 0.24, 1]
            }
          }}
          className="relative z-10"
        >
          {children}
        </motion.main>
      </motion.div>
    </AnimatePresence>
  )
}