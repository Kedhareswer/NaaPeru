"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function WebDevProjects() {
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

        <h1 className="text-4xl font-bold mb-6">Web Development - 100 Mini Projects</h1>
        
        <div className="mb-8">
          <Image
            src="/projects/web-dev-projects.png"
            alt="Web Development Projects"
            width={800}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
            <p className="text-gray-700">
              A comprehensive collection of 100 web development projects showcasing modern frontend technologies,
              responsive design patterns, and interactive user interfaces. This project serves as a learning resource
              and inspiration for developers looking to enhance their skills in web development.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["HTML", "CSS", "JavaScript", "React", "Vue", "Angular", "Node.js", "Express"].map((tech) => (
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
              <li>100 unique web development projects</li>
              <li>Responsive design patterns</li>
              <li>Interactive user interfaces</li>
              <li>Modern frontend technologies</li>
              <li>Comprehensive documentation and tutorials</li>
            </ul>
          </section>

          <section className="mt-8">
            <a
              href="https://github.com/Kedhareswer/v0-vintage-web-development-app"
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
