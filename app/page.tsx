"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "@/components/header"
import Intro from "@/components/intro"
import About from "@/components/about"
import SkillsParticipations from "@/components/skills-participations"
import CaseStudies from "@/components/case-studies"
import CustomCursor from "@/components/custom-cursor"
import LoadingScreen from "@/components/loading-screen"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"
import SkillsEndorsement from "@/components/skills-endorsement"
import LatestInsights from "@/components/latest-insights"
// Removed SafariSection; using CaseStudies for projects
import FloatingChatBot from "@/components/floating-chat-bot"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative bg-white text-black">
      <CustomCursor />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Header />
            <Intro />
            <About />
            <SkillsParticipations />
            <SkillsEndorsement />
            <LatestInsights />
            <CaseStudies />
            <Testimonials />
            <FloatingChatBot />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
