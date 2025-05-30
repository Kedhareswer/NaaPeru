"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const loadingStages = [
  { text: "Initializing", progress: 0, duration: 800 },
  { text: "Loading", progress: 20, duration: 900 },
  { text: "Processing", progress: 40, duration: 800 },
  { text: "Optimizing", progress: 65, duration: 700 },
  { text: "Finalizing", progress: 85, duration: 600 },
  { text: "Ready", progress: 100, duration: 500 },
]

interface TypewriterTextProps {
  text: string
  speed?: number
  onComplete?: () => void
}

function TypewriterText({ text, speed = 80, onComplete }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    } catch (e) {
      // Silent fallback
    }
  }, [])

  useEffect(() => {
    setDisplayText("")
    setCurrentIndex(0)
  }, [text])

  const playSubtleSound = useCallback(() => {
    if (!audioContextRef.current) return

    try {
      const oscillator = audioContextRef.current.createOscillator()
      const gainNode = audioContextRef.current.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContextRef.current.destination)

      oscillator.frequency.setValueAtTime(800, audioContextRef.current.currentTime)
      oscillator.type = "sine"

      gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.008, audioContextRef.current.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.05)

      oscillator.start()
      oscillator.stop(audioContextRef.current.currentTime + 0.05)
    } catch (e) {
      // Silent fallback
    }
  }, [])

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(
        () => {
          setDisplayText(text.slice(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
          playSubtleSound()
        },
        speed + Math.random() * 20,
      )

      return () => clearTimeout(timer)
    } else if (onComplete) {
      onComplete()
    }
  }, [text, currentIndex, speed, onComplete, playSubtleSound])

  return (
    <div className="relative">
      <motion.h1
        className="text-2xl md:text-4xl lg:text-5xl font-light text-black text-center tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {displayText}
        <motion.span
          className="inline-block w-0.5 h-6 md:h-8 lg:h-10 bg-black ml-1"
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.2,
            ease: "easeInOut",
          }}
        />
      </motion.h1>
    </div>
  )
}

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [currentStageIndex, setCurrentStageIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const startTimeRef = useRef<number>(Date.now())

  const currentStage = loadingStages[Math.min(currentStageIndex, loadingStages.length - 1)]

  useEffect(() => {
    document.body.style.overflow = "hidden"
    startTimeRef.current = Date.now()

    // Main 5-second timer
    const mainTimer = setTimeout(() => {
      setIsComplete(true)
    }, 5000)

    // Progress animation - smooth progression over 5 seconds
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      const totalDuration = 5000
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100)
      setProgress(newProgress)

      // Advance stages based on progress
      const stageThresholds = [0, 15, 35, 55, 75, 90]
      const newStageIndex = stageThresholds.findIndex((threshold) => newProgress < threshold) - 1
      const calculatedStageIndex = newStageIndex === -1 ? stageThresholds.length - 1 : Math.max(0, newStageIndex)

      if (calculatedStageIndex !== currentStageIndex && calculatedStageIndex < loadingStages.length) {
        setCurrentStageIndex(calculatedStageIndex)
      }
    }, 50)

    return () => {
      document.body.style.overflow = "auto"
      clearTimeout(mainTimer)
      clearInterval(progressInterval)
    }
  }, [currentStageIndex])

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          className="fixed inset-0 bg-white flex items-center justify-center z-[100] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            className="flex flex-col items-center space-y-16 relative z-10 px-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            {/* Minimal typewriter text */}
            <div className="relative min-h-[60px] md:min-h-[80px] lg:min-h-[100px] flex items-center justify-center w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStageIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className="w-full"
                >
                  <TypewriterText text={currentStage?.text || "Loading"} speed={60} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Minimal progress section */}
            <motion.div
              className="w-full max-w-md space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {/* Simple stage indicators */}
              <div className="flex justify-center items-center space-x-3">
                {loadingStages.map((stage, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      index <= currentStageIndex ? "bg-black" : "bg-gray-300"
                    }`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: index === currentStageIndex ? 1.5 : 1 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  />
                ))}
              </div>

              {/* Clean progress bar */}
              <div className="relative">
                <div className="w-full h-0.5 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-black rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Minimal progress details */}
            <motion.div
              className="text-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <motion.div
                className="text-lg font-light text-gray-600 tabular-nums"
                key={`progress-${Math.floor(progress)}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {Math.round(progress)}%
              </motion.div>

              <motion.p
                className="text-sm text-gray-500 font-light tracking-wider uppercase"
                key={`stage-${currentStageIndex}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {currentStage?.text || "Loading"}
              </motion.p>
            </motion.div>

            {/* Minimal loading indicator */}
            <motion.div
              className="flex space-x-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.4 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 bg-gray-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.8,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
