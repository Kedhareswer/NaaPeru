'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function CollaborativeResearchHubProject() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Button variant="ghost" asChild className="mb-6">
          <a href="/projects">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </a>
        </Button>

        <h1 className="text-4xl font-bold mb-6">Collaborative Research Hub</h1>
        
        <div className="mb-8">
          <Image
            src="/projects/research-hub.png"
            alt="Collaborative Research Hub Project"
            width={800}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
            <p className="text-gray-700">
              A comprehensive real-time collaborative workspace designed for research teams.
              This platform integrates advanced AI capabilities with robust team collaboration
              features, enabling seamless document sharing, team communication, and intelligent
              research assistance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Next.js",
                "React",
                "TypeScript",
                "Supabase",
                "OpenAI",
                "Tailwind CSS",
                "WebSocket",
                "PostgreSQL"
              ].map((tech) => (
                <div
                  key={tech}
                  className="bg-gray-100 rounded-lg p-3 text-center font-medium"
                >
                  {tech}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Real-time team chat with AI-powered assistance</li>
              <li>Document collaboration with version control</li>
              <li>Team member management and role-based access</li>
              <li>OpenAI integration for intelligent research support</li>
              <li>Real-time updates and notifications</li>
              <li>Modern, responsive user interface</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Implementation Details</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                The project implements a comprehensive collaborative platform with these key components:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Supabase backend with PostgreSQL database for robust data management</li>
                <li>OpenAI integration for intelligent research assistance</li>
                <li>Next.js and React frontend with responsive Tailwind CSS design</li>
                <li>Real-time updates via WebSocket connections</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Results and Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Image
                src="/projects/research-bolt.png"
                alt="Research hub interface"
                width={400}
                height={300}
                className="rounded-lg shadow-md"
              />
              <div>
                <ul className="list-disc list-inside space-y-3 text-gray-700">
                  <li>Streamlined research collaboration process</li>
                  <li>Reduced documentation time by 40%</li>
                  <li>Enhanced team communication efficiency</li>
                  <li>Improved research quality through AI assistance</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-gray-700">
              The platform has significantly improved research team productivity and collaboration,
              enabling more efficient knowledge sharing and accelerating research outcomes.
            </p>
          </section>

          <section className="mt-8">
            <a
              href="https://github.com/yourusername/collaborative-research-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View on GitHub
            </a>
          </section>
        </div>
      </motion.div>
    </div>
  )
}