"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import TextPressure from "./TextPressure"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + Math.random() * 15, 100))
    }, 500)
    return () => {
      document.body.style.overflow = "auto"
      clearInterval(interval)
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
          <div style={{ position: 'relative', height: '300px', width: '400px' }}>
            <TextPressure
              text="Loading..."
              flex={true}
              alpha={true}
              stroke={true}
              width={true}
              weight={true}
              italic={true}
              textColor="#000000"
              strokeColor="#666666"
              strokeWidth={1}
              minFontSize={48}
            />
          </div>
          <motion.div 
            className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <motion.div
              className="h-full bg-blue-500 dark:bg-blue-400 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
          <motion.p
            className="text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            {Math.round(progress)}% Complete
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}