"use client"

import { useState, useEffect } from "react"
import { LoadingScreen } from "./loading-screen"
import { motion, AnimatePresence } from "framer-motion"

interface PageWrapperProps {
  children: React.ReactNode
}

export function PageWrapper({ children }: PageWrapperProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Check if user has already seen the loading screen in this session
    const hasSeenLoader = sessionStorage.getItem("hasSeenLoader")
    
    if (hasSeenLoader === "true") {
      setIsLoading(false)
      setShowContent(true)
    }
  }, [])

  const handleLoadingComplete = () => {
    sessionStorage.setItem("hasSeenLoader", "true")
    setIsLoading(false)
    // Small delay before showing content for smooth transition
    setTimeout(() => {
      setShowContent(true)
    }, 300)
  }

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      
      <AnimatePresence mode="wait">
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
