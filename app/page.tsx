"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "@/components/header"
import Intro from "@/components/intro"
import About from "@/components/about"
import SkillsParticipations from "@/components/skills-participations"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import CustomCursor from "@/components/custom-cursor"
import LoadingScreen from "@/components/loading-screen"
import Testimonials from "@/components/testimonials"
import Blog from "@/components/blog"

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
            <Projects />
            <Testimonials />
            <Blog />
            <Contact />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

