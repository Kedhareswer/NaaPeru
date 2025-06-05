"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "@/components/header"
import Intro from "@/components/intro"
import About from "@/components/about"
import SkillsParticipations from "@/components/skills-participations"
import CaseStudies from "@/components/case-studies"
import Contact from "@/components/contact"
import CustomCursor from "@/components/custom-cursor"
import LoadingScreen from "@/components/loading-screen"
import Testimonials from "@/components/testimonials"
import Blog from "@/components/blog"
import Footer from "@/components/footer"
import GitHubActivity from "@/components/github-activity"
import LinkedinActivity from "@/components/linkedin-activity"
import ProjectMetrics from "@/components/project-metrics"
import CodeSnippetSharing from "@/components/code-snippet-sharing"
import InteractiveProjectDemo from "@/components/interactive-project-demo"
import ScheduleMeeting from "@/components/schedule-meeting"
import SkillsEndorsement from "@/components/skills-endorsement"
import AvailabilityStatus from "@/components/availability-status"
import LiveStatistics from "@/components/live-statistics"

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
            
            <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Dynamic Content & Integrations</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                <GitHubActivity />
                <LinkedinActivity />
              </div>
              <LiveStatistics />
            </section>
            
            <CaseStudies />
            
            <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Interactive Project Showcase</h2>
              <ProjectMetrics />
              <div className="mt-16">
                <CodeSnippetSharing />
              </div>
              <div className="mt-16">
                <InteractiveProjectDemo />
              </div>
            </section>
            
            <Testimonials />
            <Blog />
            
            <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Let's Connect</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                <AvailabilityStatus onScheduleMeeting={() => document.getElementById('schedule-meeting')?.scrollIntoView({ behavior: 'smooth' })} />
                <div id="schedule-meeting">
                  <ScheduleMeeting />
                </div>
              </div>
            </section>
            
            <Contact />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
