"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, Search, ExternalLink, Github, Eye, Star, Filter } from "lucide-react"
import Header from "@/components/header"
import { ProjectDetailModal } from "@/components/project-detail-modal"

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
  stats?: {
    views: number
    stars: number
  }
}

const allProjects: Project[] = [
  {
    id: 1,
    title: "Email Classification",
    description:
      "A robust machine learning system designed to accurately classify emails as spam or legitimate while minimizing false positives, featuring an intuitive web interface for real-time classification.",
    categories: ["Machine Learning", "Data Science"],
    date: "March 2024",
    image: "/projects/email-insight-2.png",
    technologies: ["Next.js", "React", "Tailwind CSS", "Python", "scikit-learn"],
    objectives: [
      "Build a robust email classification system",
      "Implement feature engineering for email content",
      "Create an intuitive web interface",
      "Minimize false positive classifications",
    ],
    outcomes: [
      "98% classification accuracy",
      "Real-time email analysis capability",
      "User-friendly web interface",
      "Successful spam detection system",
    ],
    githubUrl: "https://github.com/Kedhareswer/Mail_Classification_Case_Study",
    liveDemo: "https://mail-classification-case-study-6izg753sg.vercel.app/",
    stats: { views: 1250, stars: 42 },
  },
  {
    id: 2,
    title: "Predictive Machine Learning",
    description:
      "Advanced predictive analytics system using machine learning algorithms for accurate forecasting and decision support.",
    categories: ["Machine Learning", "Data Science"],
    date: "January 2025",
    image: "/projects/neural-network.svg",
    technologies: ["Python", "TensorFlow", "scikit-learn", "FastAPI"],
    objectives: [
      "Develop accurate forecasting models",
      "Implement decision support algorithms",
      "Create real-time prediction system",
    ],
    outcomes: ["85% prediction accuracy", "Reduced decision-making time by 40%", "Successfully deployed in production"],
    githubUrl: "https://github.com/Kedhareswer/Predictive-Maintenance-Classification-",
    stats: { views: 890, stars: 28 },
  },
  {
    id: 3,
    title: "Traffic Monitoring System",
    description:
      "The Traffic Monitoring System is an advanced computer vision solution that enables real-time monitoring and analysis of traffic flow through multiple video streams.",
    categories: ["Computer Vision"],
    date: "January 2024",
    image: "/projects/traffic-monitoring-system.png",
    technologies: ["OpenCV", "YOLOv8", "PyTorch", "Python 3.7+", "PyQt5", "Flask", "Flask-SocketIO", "HTML/CSS"],
    objectives: [
      "Implement multi-threaded video capture for efficient stream handling",
      "Develop real-time frame processing with OpenCV",
      "Integrate YOLOv8 for robust object detection",
      "Create a responsive desktop application using PyQt5",
      "Develop a web interface for remote access using Flask",
    ],
    outcomes: [
      "Successfully implemented real-time traffic monitoring with up to 4 simultaneous video streams",
      "Achieved accurate vehicle and pedestrian detection using YOLOv8",
      "Created user-friendly interfaces for both desktop and web platforms",
    ],
    githubUrl: "https://github.com/Kedhareswer/Object-Detection-and-Tracking",
    stats: { views: 2100, stars: 67 },
  },
  {
    id: 4,
    title: "Image to Sketch",
    description:
      "Developed a deep learning model to convert images into sketches, achieving 90% accuracy in sketch rendering and optimizing processing speed by 30%.",
    categories: ["Deep Learning", "Machine Learning"],
    date: "November 2024",
    image: "/projects/image-to-sketch.png",
    technologies: ["Deep Learning", "Python", "TensorFlow", "OpenCV"],
    objectives: ["Convert images into sketches", "Optimize processing speed"],
    outcomes: ["90% accuracy in sketch rendering", "30% optimization in processing speed"],
    githubUrl: "https://github.com/Kedhareswer/MLGeneFunction",
    liveDemo: "https://image-to-sketch-wine.vercel.app/",
    stats: { views: 1580, stars: 35 },
  },
  {
    id: 5,
    title: "Digit Classifier",
    description:
      "A modern web-based digit recognition application that uses Deep Learning to classify handwritten digits. Built with Next.js, FastAPI, and TensorFlow.",
    categories: ["Deep Learning", "Machine Learning"],
    date: "Present",
    image: "/projects/digit.png",
    technologies: ["Deep Learning", "Next.js", "FastAPI", "TensorFlow"],
    objectives: ["Classify handwritten digits", "Use Deep Learning"],
    outcomes: ["Modern web-based application", "Built with Next.js, FastAPI, and TensorFlow"],
    githubUrl: "https://github.com/Kedhareswer/Digit_Classifier_DeepLearning",
    stats: { views: 920, stars: 23 },
  },
  {
    id: 6,
    title: "Artify AI - Image to Oil Paint",
    description:
      "AI-powered art transformation system that converts photographs into stunning oil painting style artworks.",
    categories: ["Deep Learning", "Machine Learning"],
    date: "February 2025",
    image: "/projects/image-to-sketch-dark.png",
    technologies: ["Deep Learning", "Python", "Neural Style Transfer"],
    objectives: ["Convert photographs into oil painting style artworks"],
    outcomes: ["AI-powered art transformation system"],
    githubUrl: "https://github.com/Kedhareswer/Image-to-Oil_Paint",
    stats: { views: 750, stars: 19 },
  },
  {
    id: 7,
    title: "Collaborative Research Hub",
    description:
      "A comprehensive real-time collaborative workspace designed for research teams, integrating advanced AI capabilities with robust team collaboration features.",
    categories: ["Machine Learning", "Data Science"],
    date: "March 2025",
    image: "/projects/research-bolt.png",
    technologies: ["Machine Learning", "React", "Node.js", "WebSocket"],
    objectives: ["Real-time collaborative workspace", "Integrate advanced AI capabilities"],
    outcomes: ["Robust team collaboration features"],
    githubUrl: "https://github.com/Kedhareswer/ai-project-planner",
    stats: { views: 1100, stars: 31 },
  },
]

const categories = ["All", "Machine Learning", "Deep Learning", "Data Science", "Computer Vision", "Others"]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredProjects = allProjects
    .filter((project) => selectedCategory === "All" || project.categories.includes(selectedCategory))
    .filter(
      (project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  const handleViewDetails = (project: any) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-6 py-20">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            className="mr-4 min-h-[44px] min-w-[44px] text-gray-600 hover:text-black hover:bg-gray-50"
            asChild
          >
            <a href="/#case-studies">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Featured
            </a>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">All Projects</h1>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search projects..."
              className="pl-10 min-h-[44px] border-gray-200 focus:border-gray-400 focus:ring-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap min-h-[44px] min-w-[44px] transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredCard(project.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Card
                className="h-full flex flex-col bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg group"
                onClick={() => handleViewDetails(project)}
              >
                {/* Image */}
                <div className="aspect-video relative bg-gray-50 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full"
                    animate={{
                      scale: hoveredCard === project.id ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Stats Overlay */}
                  {project.stats && (
                    <div className="absolute top-3 right-3 flex gap-2">
                      <div className="bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {project.stats.views}
                      </div>
                      <div className="bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {project.stats.stars}
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-black transition-colors">
                      {project.title}
                    </h2>
                    <span className="text-sm text-gray-500 font-medium whitespace-nowrap ml-4">{project.date}</span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{project.description}</p>

                  {/* Technologies */}
                  <div className="mb-4">
                    <h3 className="font-medium mb-2 text-gray-900">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-xs text-gray-500 px-2 py-1">+{project.technologies.length - 4} more</span>
                      )}
                    </div>
                  </div>

                  {/* Key Objectives */}
                  <div className="mb-4">
                    <h3 className="font-medium mb-2 text-gray-900">Key Objectives</h3>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {project.objectives.slice(0, 2).map((objective, i) => (
                        <li key={i} className="line-clamp-1">
                          {objective}
                        </li>
                      ))}
                      {project.objectives.length > 2 && (
                        <li className="text-gray-500">+{project.objectives.length - 2} more objectives</li>
                      )}
                    </ul>
                  </div>

                  {/* Outcomes */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-2 text-gray-900">Outcomes</h3>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {project.outcomes.slice(0, 2).map((outcome, i) => (
                        <li key={i} className="line-clamp-1">
                          {outcome}
                        </li>
                      ))}
                      {project.outcomes.length > 2 && (
                        <li className="text-gray-500">+{project.outcomes.length - 2} more outcomes</li>
                      )}
                    </ul>
                  </div>

                  {/* Footer */}
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 flex-wrap">
                        {project.categories.slice(0, 2).map((cat, idx) => (
                          <span
                            key={idx}
                            className="text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        {project.githubUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 hover:text-black hover:bg-gray-50 p-2"
                            asChild
                          >
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                        {project.liveDemo && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 hover:text-black hover:bg-gray-50 p-2"
                            asChild
                          >
                            <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>
      <ProjectDetailModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}
