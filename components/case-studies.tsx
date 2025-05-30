"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { EnhancedProjectCard } from "./enhanced-project-card"
import { ProjectDetailModal } from "./project-detail-modal"

interface Project {
  id: number
  title: string
  description: string
  categories: string[]
  date: string
  image: string
  demoUrl?: string
  githubUrl?: string
  technologies: string[]
  objectives: string[]
  outcomes: string[]
  gallery?: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "Image to Sketch",
    description:
      "Developed a deep learning model to convert images into sketches, achieving 90% accuracy in sketch rendering and optimizing processing speed by 30%.",
    categories: ["Deep Learning", "Machine Learning"],
    date: "April 2025",
    image: "/projects/image-to-sketch.png",
    demoUrl: "https://image-to-sketch-wine.vercel.app/",
    githubUrl: "https://github.com/Kedhareswer/MLGeneFunction",
    technologies: ["Deep Learning", "Python", "TensorFlow", "OpenCV"],
    objectives: ["Convert images into sketches", "Optimize processing speed", "Maintain image quality"],
    outcomes: [
      "90% accuracy in sketch rendering",
      "30% optimization in processing speed",
      "Real-time processing capability",
    ],
    gallery: [
      "/projects/image-to-sketch.png",
      "/projects/image-to-sketch-dark.png",
      "/projects/image-to-sketch-convert.png",
    ],
  },
  {
    id: 2,
    title: "Endoscopy Image Enhancement",
    description:
      "Advanced medical imaging enhancement system using deep learning for improved endoscopic visualization and diagnosis accuracy.",
    categories: ["Deep Learning", "Machine Learning"],
    date: "May 2025",
    image: "/projects/endoscopy-image-enhancement.png",
    githubUrl: "https://github.com/Kedhareswer/endoscopy-enhancement",
    technologies: ["Deep Learning", "Computer Vision", "Python", "Medical Imaging"],
    objectives: ["Enhance endoscopic image quality", "Improve diagnostic accuracy", "Reduce noise and artifacts"],
    outcomes: ["Improved image clarity by 40%", "Enhanced diagnostic capabilities", "Reduced processing time"],
    gallery: ["/projects/endoscopy-image-enhancement.png", "/projects/endoscopy-image-enhancement-2.png"],
  },
  {
    id: 3,
    title: "Digit Classifier",
    description:
      "A modern web-based digit recognition application that uses Deep Learning to classify handwritten digits. Built with Next.js, FastAPI, and TensorFlow.",
    categories: ["Deep Learning", "Machine Learning"],
    date: "May 2025",
    image: "/projects/digit.png",
    githubUrl: "https://github.com/Kedhareswer/Digit_Classifier_DeepLearning",
    technologies: ["Deep Learning", "Next.js", "FastAPI", "TensorFlow"],
    objectives: ["Classify handwritten digits", "Create web interface", "Implement real-time prediction"],
    outcomes: ["99% accuracy on test dataset", "Real-time digit recognition", "User-friendly web interface"],
    gallery: ["/projects/digit.png", "/projects/digit-2.png", "/projects/digit-interface.jpeg"],
  },
  {
    id: 4,
    title: "Collaborative Research Hub",
    description:
      "A comprehensive real-time collaborative workspace designed for research teams, integrating advanced AI capabilities with robust team collaboration features.",
    categories: ["Machine Learning", "Data Science"],
    date: "March 2025",
    image: "/projects/research-bolt.png",
    githubUrl: "https://github.com/Kedhareswer/ai-project-planner",
    technologies: ["Machine Learning", "React", "Node.js", "WebSocket"],
    objectives: ["Create collaborative workspace", "Integrate AI capabilities", "Enable real-time collaboration"],
    outcomes: ["Seamless team collaboration", "AI-powered research assistance", "Real-time document editing"],
    gallery: ["/projects/research-bolt.png", "/projects/research-bolt-2.png"],
  },
  {
    id: 5,
    title: "Artify AI - Image to Oil Paint",
    description:
      "AI-powered art transformation system that converts photographs into stunning oil painting style artworks.",
    categories: ["Deep Learning", "Machine Learning"],
    date: "February 2025",
    image: "/projects/image-to-sketch-dark.png",
    githubUrl: "https://github.com/Kedhareswer/Image-to-Oil_Paint",
    technologies: ["Deep Learning", "Python", "Neural Style Transfer", "Computer Vision"],
    objectives: ["Transform photos to oil paintings", "Preserve artistic quality", "Optimize processing speed"],
    outcomes: ["High-quality artistic transformations", "Fast processing pipeline", "Multiple artistic styles"],
    gallery: ["/projects/image-to-sketch-dark.png", "/projects/image-to-sketch.png"],
  },
  {
    id: 6,
    title: "Web Development - 100 Mini Projects",
    description:
      "A comprehensive collection of 100 web development projects showcasing modern frontend technologies, responsive design patterns, and interactive user interfaces.",
    categories: ["Other Projects"],
    date: "March 2023",
    image: "/projects/web-dev-projects.png",
    demoUrl: "https://v0-vintage-web-development-app.vercel.app/",
    githubUrl: "https://github.com/Kedhareswer/web-dev-projects",
    technologies: ["HTML", "CSS", "JavaScript", "React", "Vue.js"],
    objectives: ["Create diverse web projects", "Showcase frontend skills", "Implement responsive designs"],
    outcomes: ["100 completed projects", "Modern UI/UX patterns", "Cross-browser compatibility"],
    gallery: ["/projects/web-dev-projects.png", "/projects/web-dev-projects-1.png"],
  },
]

const categories = ["All", "Machine Learning", "Deep Learning", "Data Science", "Other Projects"]

export default function CaseStudies() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((project) => project.categories.includes(selectedCategory))

  const handleViewDetails = (project: any) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

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
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-gray-900">Featured Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore my portfolio of data science and AI projects, showcasing innovative solutions across various domains
            and technologies.
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
                className={`text-sm min-h-[44px] min-w-[44px] px-4 py-2 transition-all duration-200 font-medium ${
                  selectedCategory === category
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                }`}
              >
                {category}
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project, index) => (
            <EnhancedProjectCard
              key={project.id}
              project={{
                ...project,
                featured: index < 2, // Mark first 2 as featured
              }}
              index={index}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            asChild
            className="bg-black text-white hover:bg-gray-800 min-h-[44px] px-6 py-3 text-base font-medium transition-all duration-200 hover:shadow-lg"
          >
            <a href="/projects">
              View All Projects
              <ChevronRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </motion.div>
      </div>

      <ProjectDetailModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  )
}
