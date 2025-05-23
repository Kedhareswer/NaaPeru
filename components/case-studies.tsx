"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  categories: string[]
  date: string
  image: string
  link: string
  demoUrl?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Image to Sketch",
    description: "Developed a deep learning model to convert images into sketches, achieving 90% accuracy in sketch rendering and optimizing processing speed by 30%.",
    categories: ["Deep Learning", "Machine Learning"],
    date: "April 2025",
    image: "/projects/image-to-sketch.png",
    link: "/projects/image-to-sketch",
    demoUrl: "https://image-to-sketch-wine.vercel.app/"
  },
  {
    id: 2,
    title: "Endoscopy Image Enhancement",
    description: "Advanced medical imaging enhancement system using deep learning for improved endoscopic visualization and diagnosis accuracy.",
    categories: ["Deep Learning", "Machine Learning"],
    date: "May 2025",
    image: "/projects/endoscopy-image-enhancement.png",
    link: "/projects/endoscopy-enhancement"
  },
  {
    id: 3,
    title: "Digit Classifier",
    description: "A modern web-based digit recognition application that uses Deep Learning to classify handwritten digits. Built with Next.js, FastAPI, and TensorFlow.",
    categories: ["Deep Learning", "Machine Learning"],
    date: "May 2025",
    image: "/projects/digit.png",
    link: "/projects/digit-classifier"
  },
  {
    id: 4,
    title: "Collaborative Research Hub",
    description: "A comprehensive real-time collaborative workspace designed for research teams, integrating advanced AI capabilities with robust team collaboration features.",
    categories: ["Machine Learning", "Data Science"],
    date: "March 2025",
    image: "/projects/research-bolt.png",
    link: "/projects/collaborative-research-hub"
  },
  {
    id: 5,
    title: "Artify AI - Image to Oil Paint",
    description: "AI-powered art transformation system that converts photographs into stunning oil painting style artworks.",
    categories: ["Deep Learning", "Machine Learning"],
    date: "February 2025",
    image: "/projects/image-to-sketch-dark.png",
    link: "/projects/artify-ai"
  },
  {
    id: 6,
    title: "Web Development - 100 Mini Projects",
    description: "A comprehensive collection of 100 web development projects showcasing modern frontend technologies, responsive design patterns, and interactive user interfaces.",
    categories: ["Other Projects"],
    date: "March 2023",
    image: "/projects/web-dev-projects.png",
    link: "/projects/web-dev-projects",
    demoUrl: "https://v0-vintage-web-development-app.vercel.app/"
  }
]

const categories = ["Machine Learning", "Deep Learning", "Data Science", "Other Projects"]

export default function CaseStudies() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(project => project.categories.includes(selectedCategory))

  return (
    <section id="case-studies" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore my portfolio of data science and AI projects, showcasing innovative solutions
            across various domains and technologies.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Button
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="text-sm min-h-[44px] min-w-[44px] px-3 sm:px-4"
              >
                {category}
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <div className="aspect-[16/9] relative bg-gray-100 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold leading-tight line-clamp-2">{project.title}</h3>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">{project.date}</span>
                  </div>
                  <p className="text-gray-600 mb-6 flex-grow line-clamp-3">{project.description}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.categories.map((category, idx) => (
                        <span key={idx} className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">
                          {category}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {project.demoUrl && (
                        <Button variant="ghost" size="sm" className="group hover:bg-gray-50 min-h-[44px] min-w-[44px]" asChild>
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            Live Demo
                            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </a>
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="group hover:bg-gray-50 min-h-[44px] min-w-[44px]" asChild>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          View Details
                          <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild className="min-h-[44px] min-w-[44px] px-4 py-2">
            <a href="/projects">
              View All Projects
              <ChevronRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}