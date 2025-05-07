"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, Search, Filter } from "lucide-react"
import Header from "@/components/header"

interface Project {
  id: number
  title: string
  description: string
  categories: string[]
  date: string
  image: string
  technologies: string[]
  objectives: string[]
  outcomes: string[]
  githubUrl?: string
  liveDemo?: string
}

const allProjects: Project[] = [
  {
    id: 1,
    title: "Email Classification",
    description: "A robust machine learning system designed to accurately classify emails as spam or legitimate while minimizing false positives, featuring an intuitive web interface for real-time classification.",
    categories: ["Machine Learning", "Data Science"],
    date: "March 2024",
    image: "/projects/email-insight-2.png",
    technologies: ["Next.js", "React", "Tailwind CSS", "Python", "scikit-learn"],
    objectives: [
      "Build a robust email classification system",
      "Implement feature engineering for email content",
      "Create an intuitive web interface",
      "Minimize false positive classifications"
    ],
    outcomes: [
      "98% classification accuracy",
      "Real-time email analysis capability",
      "User-friendly web interface",
      "Successful spam detection system"
    ],
    githubUrl: "https://github.com/Kedhareswer/Mail_Classification_Case_Study",
    liveDemo: "https://mail-classification-case-study-6izg753sg.vercel.app/"
  },
  {
    id: 2,
    title: "Predictive Machine Learning",
    description: "Advanced predictive analytics system using machine learning algorithms for accurate forecasting and decision support.",
    categories: ["Machine Learning", "Data Science"],
    date: "January 2025",
    image: "/projects/neural-network.svg",
    technologies: ["Python", "TensorFlow", "scikit-learn", "FastAPI"],
    objectives: [
      "Develop accurate forecasting models",
      "Implement decision support algorithms",
      "Create real-time prediction system"
    ],
    outcomes: [
      "85% prediction accuracy",
      "Reduced decision-making time by 40%",
      "Successfully deployed in production"
    ],
    githubUrl: "https://github.com/Kedhareswer/Predictive-Maintenance-Classification-"
  },
  {
    id: 3,
    title: "Traffic Monitoring System",
    description: "The Traffic Monitoring System is an advanced computer vision solution that enables real-time monitoring and analysis of traffic flow through multiple video streams. The system leverages state-of-the-art object detection and tracking capabilities to identify vehicles, pedestrians, and other traffic participants, providing valuable insights for traffic management and analysis. It features both a desktop application and a web interface, making it versatile for different deployment scenarios.",
    categories: ["Computer Vision"],
    date: "January 2024",
    image: "/projects/traffic-monitoring-system.png",
    technologies: ["OpenCV", "YOLOv8", "PyTorch", "Python 3.7+", "PyQt5", "Flask", "Flask-SocketIO", "HTML/CSS"],
    objectives: [
      "Implement multi-threaded video capture for efficient stream handling",
      "Develop real-time frame processing with OpenCV",
      "Integrate YOLOv8 for robust object detection",
      "Create a responsive desktop application using PyQt5",
      "Develop a web interface for remote access using Flask"
    ],
    outcomes: [
      "Successfully implemented real-time traffic monitoring with up to 4 simultaneous video streams",
      "Achieved accurate vehicle and pedestrian detection using YOLOv8",
      "Created user-friendly interfaces for both desktop and web platforms"
    ],
    githubUrl: "https://github.com/yourusername/traffic-monitoring-system"
  },
  {
    id: 4,
    title: "Image to Sketch",
    description: "Developed a deep learning model to convert images into sketches, achieving 90% accuracy in sketch rendering and optimizing processing speed by 30%.",
    categories: ["Deep Learning", "Machine Learning"],
    date: "November 2024",
    image: "/projects/image-to-sketch.png",
    technologies: ["Deep Learning"],
    objectives: [
      "Convert images into sketches",
      "Optimize processing speed"
    ],
    outcomes: [
      "90% accuracy in sketch rendering",
      "30% optimization in processing speed"
    ],
    githubUrl: "https://github.com/Kedhareswer/MLGeneFunction",
    liveDemo: "https://image-to-sketch-wine.vercel.app/"
  },
  {
    id: 5,
    title: "Digit Classifier",
    description: "A modern web-based digit recognition application that uses Deep Learning to classify handwritten digits. Built with Next.js, FastAPI, and TensorFlow.",
    categories: ["Deep Learning", "Machine Learning"],
    date: "Present",
    image: "/projects/digit.png",
    technologies: ["Deep Learning"],
    objectives: [
      "Classify handwritten digits",
      "Use Deep Learning"
    ],
    outcomes: [
      "Modern web-based application",
      "Built with Next.js, FastAPI, and TensorFlow"
    ],
    githubUrl: "https://github.com/Kedhareswer/Digit_Classifier_DeepLearning"
  },
  {
    id: 6,
    title: "Artify AI - Image to Oil Paint",
    description: "AI-powered art transformation system that converts photographs into stunning oil painting style artworks.",
    categories: ["Deep Learning", "Machine Learning"],
    date: "February 2025",
    image: "/projects/image-to-sketch-dark.png",
    technologies: ["Deep Learning"],
    objectives: [
      "Convert photographs into oil painting style artworks"
    ],
    outcomes: [
      "AI-powered art transformation system"
    ],
    githubUrl: "https://github.com/Kedhareswer/Image-to-Oil_Paint"
  },
  {
    id: 7,
    title: "Collaborative Research Hub",
    description: "A comprehensive real-time collaborative workspace designed for research teams, integrating advanced AI capabilities with robust team collaboration features.",
    categories: ["Machine Learning", "Data Science"],
    date: "March 2025",
    image: "/projects/research-bolt.png",
    technologies: ["Machine Learning"],
    objectives: [
      "Real-time collaborative workspace",
      "Integrate advanced AI capabilities"
    ],
    outcomes: [
      "Robust team collaboration features"
    ],
    githubUrl: "https://github.com/Kedhareswer/ai-project-planner"
  }
]

const categories = ["Machine Learning", "Deep Learning", "Data Science", "Others"]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProjects = allProjects
    .filter(project => selectedCategory === "All" || project.categories.includes(selectedCategory))
    .filter(project =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-6 py-20">
        <div className="flex items-center mb-8">
          <Button variant="ghost" className="mr-4" asChild>
            <a href="/#case-studies">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Featured
            </a>
          </Button>
          <h1 className="text-3xl font-bold">All Projects</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search projects..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <div className="aspect-video relative bg-gray-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold">{project.title}</h2>
                    <span className="text-sm text-gray-500">{project.date}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map(tech => (
                          <span
                            key={tech}
                            className="text-sm bg-gray-100 px-3 py-1 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Key Objectives</h3>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {project.objectives.map((objective, i) => (
                          <li key={i}>{objective}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Outcomes</h3>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {project.outcomes.map((outcome, i) => (
                          <li key={i}>{outcome}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between items-center">
                    <div className="flex gap-2 flex-wrap">
                      {project.categories.map((cat, idx) => (
                        <span key={idx} className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            GitHub
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}