"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ScrollArea } from "./ui/scroll-area"
import { Star } from "lucide-react"
import { useState, useEffect, useRef } from "react"

type Project = {
  title: string
  description: string
  image: string
  link: string
  tags: string[]
  startDate: string
  technologies?: string[]
  problemStatement?: string
  problemsFaced?: string[]
  plan?: string[]
  outcomes?: string[]
  contributors?: string[]
  githubUrl?: string
  liveDemo?: string
  featured?: boolean
  role?: string
  duration?: string
}

const projects: Project[] = [
  // Featured projects
  {
    title: "Neural Network Visualization Platform",
    description: "A comprehensive web application that allows users to visualize complex neural network architectures in real-time. The platform enables users to adjust parameters, observe training processes, and understand how different architectures perform on various datasets.",
    image: "/projects/neural-network.svg",
    link: "#",
    startDate: "2023-06-01",
    technologies: ["React", "D3.js", "TensorFlow.js", "WebGL", "Node.js"],
    tags: ["Data Visualization", "Neural Networks", "Interactive Learning"],
    featured: true,
    role: "Lead Developer",
    duration: "6 months"
  },
  {
    title: "Predictive Analytics Dashboard",
    description: "A sophisticated analytics dashboard that provides real-time insights and predictive forecasting for business metrics. The system integrates with multiple data sources, applies advanced statistical models, and presents actionable intelligence through an intuitive interface.",
    image: "/projects/analytics-dashboard.svg",
    link: "#",
    startDate: "2023-04-01",
    technologies: ["Python", "React", "Redux", "Flask", "PostgreSQL"],
    tags: ["Data Analytics", "Business Intelligence", "Predictive Modeling"],
    featured: true,
    role: "Full Stack Developer",
    duration: "8 months"
  },
  {
    title: "Computer Vision for Medical Imaging",
    description: "An advanced computer vision system designed to assist medical professionals in analyzing and interpreting diagnostic imaging. The application uses state-of-the-art deep learning models to detect anomalies, classify conditions, and provide quantitative measurements.",
    image: "/projects/medical-imaging.svg",
    link: "#",
    startDate: "2023-01-01",
    technologies: ["Python", "PyTorch", "OpenCV", "Flask", "React"],
    tags: ["Medical Imaging", "Computer Vision", "Healthcare AI"],
    featured: true,
    role: "Machine Learning Engineer",
    duration: "12 months"
  },
  // Regular projects
  {
    title: "PDFChatBot",
    description: "Browser-based chatbot that processes PDFs, answers questions, and provides summaries.",
    image: "/projects/chatbot.svg",
    link: "https://kedhareswer.github.io/PDFChatBot/",
    startDate: "2025-02-28",
    technologies: ["HTML", "CSS", "JavaScript", "HuggingFace", "FAISS", "KeyBERT"],
    tags: ["Natural Language Processing", "Document Processing", "AI Chatbot"],
    problemStatement: "Organizations struggle with efficient document analysis and information retrieval from large PDF collections.",
    problemsFaced: [
      "Complex PDF parsing and text extraction",
      "Maintaining context in long conversations",
      "Optimizing response time for large documents"
    ],
    plan: [
      "Implement robust PDF parsing system",
      "Integrate advanced embedding techniques",
      "Develop context-aware response generation"
    ],
    outcomes: [
      "Achieved 90% accuracy in question answering",
      "Reduced document processing time by 60%",
      "Implemented real-time summary generation"
    ],
    githubUrl: "https://kedhareswer.github.io/PDFChatBot/"
  },
  {
    title: "Website Using OSINT Tools",
    description: "Advanced web platform leveraging OSINT techniques for detecting and analyzing misinformation in digital content.",
    image: "/projects/osint.svg",
    link: "#",
    startDate: "2025-02-10",
    technologies: ["FastAPI", "Python", "TensorFlow", "Keras", "OpenCV", "LSTM", "KeyBERT", "NLTK"],
    tags: ["OSINT", "Misinformation Detection", "NLP"],
    problemStatement: "The rapid spread of misinformation poses significant challenges to digital media credibility and public trust.",
    problemsFaced: [
      "Complex integration of multiple OSINT data sources",
      "Real-time processing of large-scale data streams",
      "Balancing accuracy with processing speed"
    ],
    plan: [
      "Implement robust data collection pipeline",
      "Develop advanced NLP models for content analysis",
      "Create user-friendly verification interface"
    ],
    outcomes: [
      "Achieved 85% accuracy in misinformation detection",
      "Reduced verification time by 70%",
      "Successfully processed over 10,000 articles"
    ]
  },
  {
    title: "Image-to-Oil-Paint Model",
    description: "Converts digital images into oil-paint-style artwork.",
    image: "/projects/image-to-oil-paint.svg",
    link: "#",
    startDate: "2025-01-10",
    technologies: ["Python", "TensorFlow", "OpenCV", "Streamlit", "CSS"],
    tags: ["Neural Style Transfer", "Deep Learning", "Image Processing"],
    outcomes: ["Efficient real-time processing", "High-quality output"]
  },
  {
    title: "Advanced Air Drawing",
    description: "Real-time hand-tracking drawing application using computer vision and gestures.",
    image: "/projects/air-drawing.svg",
    link: "#",
    startDate: "2024-11-10",
    technologies: ["Python", "OpenCV", "Scikit-Learn"],
    tags: ["Computer Vision", "Machine Learning", "Real-time Processing"],
    outcomes: ["Optimized frame processing", "Gesture-based controls", "Recording and saving capabilities"]
  },
  {
    title: "Real-Time Emotion Recognition",
    description: "Detects emotions in real-time using computer vision.",
    image: "/projects/emotion-recognition.svg",
    link: "#",
    startDate: "2024-12-31",
    technologies: ["Python", "TensorFlow", "Keras", "OpenCV"],
    tags: ["Deep Learning", "Computer Vision", "Emotion Analysis"],
    outcomes: ["Real-time accuracy", "Environmental adaptability for better emotion detection"]
  },
  {
    title: "Image-to-Sketch Model",
    description: "Converts digital images into realistic hand-drawn sketches.",
    image: "/projects/image-to-sketch.svg",
    link: "https://kedhareswer.github.io/MLGeneFunction/",
    startDate: "2024-09-29",
    technologies: ["Python", "TensorFlow", "Keras", "OpenCV"],
    tags: ["Computer Vision", "Image Processing", "AI Art"],
    outcomes: ["High-quality, detailed sketch conversion"],
    githubUrl: "https://kedhareswer.github.io/MLGeneFunction/"
  },
  {
    title: "Speech Emotion Recognition",
    description: "Advanced system that analyzes speech patterns to detect and classify emotional states.",
    image: "/projects/speech-emotion-recognition.svg",
    link: "#",
    startDate: "2024-04-28",
    technologies: ["Python", "TensorFlow", "Keras", "Librosa", "LSTM", "CNN/R-CNN"],
    tags: ["Speech Processing", "Emotion Analysis", "Machine Learning"],
    outcomes: ["Real-time, high-accuracy emotion recognition"]
  },
  {
    title: "Predictive Maintenance with ML",
    description: "Predicts machine failures using ML models.",
    image: "/projects/object-detection.svg",
    link: "https://github.com/Kedhareswer/Predictive-Maintenance-Classification-",
    startDate: "2024-05-01",
    technologies: ["Python", "Random Forest", "SVM", "EDA"],
    tags: ["Machine Learning", "Predictive Analytics", "Industrial IoT"],
    outcomes: ["96.5% accuracy", "Reduced downtime by 40%", "Robust feature engineering"],
    githubUrl: "https://github.com/Kedhareswer/Predictive-Maintenance-Classification-"
  }
]
    
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const projectsRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close project details
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (projectsRef.current && !projectsRef.current.contains(event.target as Node)) {
        setSelectedProject(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <section id="projects" className="py-24 bg-white text-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-left mb-16 md:mb-24"
        >
          <span className="text-sm uppercase tracking-wider text-gray-500">Selected Work</span>
          <h2 className="text-3xl md:text-4xl font-light mt-2 mb-4">Projects</h2>
          <div className="h-px w-24 bg-black/10"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" ref={projectsRef}>
          {/* Project List Sidebar */}
          <div className="lg:col-span-3 border-r border-gray-100 pr-6 relative">
            <div className="sticky top-0 z-10 bg-white py-3 mb-2 border-b border-gray-50 backdrop-blur-sm">
              <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">Project List</h3>
            </div>
            <ScrollArea className="h-[75vh] lg:h-[68vh]">
              <div className="space-y-2 pr-2">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20, y: 10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.1, 
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    whileHover={{ 
                      x: 6,
                      y: -3,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    className="overflow-hidden"
                  >
                    <motion.div 
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-300 relative ${selectedProject === project 
                        ? 'bg-gray-100 shadow-md border-l-4 border-l-black/20 pl-3' 
                        : 'hover:bg-gray-50 border-l-4 border-l-transparent pl-3 hover:shadow-sm'}`}
                      onClick={() => {
                        setIsTransitioning(true)
                        setSelectedProject(project)
                        setTimeout(() => setIsTransitioning(false), 600)
                      }}
                      onMouseEnter={() => setHoveredProject(project)}
                      onMouseLeave={() => setHoveredProject(null)}
                      layout
                      layoutId={`project-${index}`}
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2, ease: "easeOut" }
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-medium flex items-center gap-2 group">
                          {project.featured && (
                            <motion.span 
                              initial={{ scale: 1 }}
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                            >
                              <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                            </motion.span>
                          )}
                          <span className="group-hover:text-black transition-colors duration-300">{project.title}</span>
                        </h3>
                        <span className="text-xs font-medium px-2 py-1 bg-gray-50 rounded-md text-gray-500">
                          {new Date(project.startDate).getFullYear()}
                        </span>
                      </div>
                      
                      {/* Show details on hover */}
                      <AnimatePresence mode="wait">
                        {hoveredProject === project && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0, y: -10 }}
                            animate={{ 
                              opacity: 1, 
                              height: 'auto', 
                              y: 0,
                              transition: {
                                duration: 0.4,
                                ease: [0.25, 0.1, 0.25, 1],
                                staggerChildren: 0.1
                              }
                            }}
                            exit={{ 
                              opacity: 0, 
                              height: 0, 
                              y: -10,
                              transition: { duration: 0.3 }
                            }}
                            className="mt-3 overflow-hidden"
                          >
                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">{project.description}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {project.tags.slice(0, 2).map((tag, tagIndex) => (
                                <motion.span
                                  key={tagIndex}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.2, delay: tagIndex * 0.1 }}
                                  className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-medium border border-gray-100 hover:bg-gray-100 transition-colors duration-300"
                                >
                                  {tag}
                                </motion.span>
                              ))}
                              {project.tags.length > 2 && (
                                <motion.span 
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.2, delay: 0.2 }}
                                  className="text-xs text-gray-500 flex items-center gap-1 px-2 py-1"
                                >
                                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                  +{project.tags.length - 2} more
                                </motion.span>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {/* Selected indicator */}
                      {selectedProject === project && (
                        <motion.div 
                          className="absolute left-0 top-0 w-1 h-full bg-black/20"
                          layoutId="selected-indicator"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "100%" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                        />
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          {/* Project Details */}
          <div className="lg:col-span-9">
            {selectedProject ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                    when: "beforeChildren",
                    staggerChildren: 0.1
                  }
                }}
                exit={{ opacity: 0, y: -20 }}
                className={`bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 ${isTransitioning ? 'opacity-50' : ''}`}
              >
                {/* Project Header Section */}
                <div className="relative">
                  <div className="aspect-[21/9] overflow-hidden bg-gray-100 rounded-t-xl">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Overlay gradient for better text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 rounded-t-xl"></div>
                  
                  {/* Project title and metadata positioned over the image */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      {/* Featured badge */}
                      {selectedProject.featured && (
                        <div className="px-3 py-1 bg-yellow-400/90 backdrop-blur-sm rounded-full text-xs text-gray-800 font-medium shadow-sm border border-yellow-500/50 flex items-center gap-1.5">
                          <Star className="w-3.5 h-3.5" />
                          <span>Featured</span>
                        </div>
                      )}
                      
                      {/* Date badge */}
                      <div className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs text-gray-700 shadow-sm border border-gray-100/50">
                        {new Date(selectedProject.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </div>
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl font-light mb-2 text-white drop-shadow-sm flex items-center gap-2">
                      {selectedProject.title}
                      {selectedProject.featured && <Star className="w-6 h-6 text-yellow-400" fill="currentColor" />}
                    </h2>
                    
                    {/* Role and Duration */}
                    {(selectedProject.role || selectedProject.duration) && (
                      <p className="text-sm text-gray-100 mb-2">
                        {selectedProject.role}{selectedProject.role && selectedProject.duration && " • "}{selectedProject.duration}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Main Content Area */}
                <div className="p-8">
                  {/* Project Overview Section */}
                  <div className="mb-8 max-w-3xl">
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      {selectedProject.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-full text-sm font-medium border border-gray-100 transition-all duration-300 hover:bg-gray-100 hover:border-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Project Details Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content Column */}
                    <div className="lg:col-span-8 space-y-8">
                      {/* Problem Statement */}
                      {selectedProject.problemStatement && (
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-sm">
                          <h3 className="text-xl font-light mb-4 text-gray-800 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                            Problem Statement
                          </h3>
                          <p className="text-base text-gray-700 leading-relaxed">{selectedProject.problemStatement}</p>
                        </div>
                      )}
                      
                      {/* Two-column layout for Challenges and Implementation Plan when both exist */}
                      {(selectedProject.problemsFaced && selectedProject.problemsFaced.length > 0) && 
                       (selectedProject.plan && selectedProject.plan.length > 0) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Challenges */}
                          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-sm">
                            <h3 className="text-xl font-light mb-4 text-gray-800 flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                              Challenges Overcome
                            </h3>
                            <div className="space-y-3">
                              {selectedProject.problemsFaced.map((problem, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-300">
                                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2"></div>
                                  <p className="text-base text-gray-700">{problem}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Implementation Plan */}
                          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-sm">
                            <h3 className="text-xl font-light mb-4 text-gray-800 flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                              Implementation Plan
                            </h3>
                            <div className="space-y-3">
                              {selectedProject.plan.map((step, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-300">
                                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs font-medium shrink-0">{idx + 1}</div>
                                  <p className="text-base text-gray-700 pt-0.5">{step}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Single column layout for Challenges when Implementation Plan doesn't exist */}
                      {(selectedProject.problemsFaced && selectedProject.problemsFaced.length > 0) && 
                       !(selectedProject.plan && selectedProject.plan.length > 0) && (
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-sm">
                          <h3 className="text-xl font-light mb-4 text-gray-800 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            Challenges Overcome
                          </h3>
                          <div className="space-y-3">
                            {selectedProject.problemsFaced.map((problem, idx) => (
                              <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2"></div>
                                <p className="text-base text-gray-700">{problem}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Single column layout for Implementation Plan when Challenges doesn't exist */}
                      {!(selectedProject.problemsFaced && selectedProject.problemsFaced.length > 0) && 
                       (selectedProject.plan && selectedProject.plan.length > 0) && (
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-sm">
                          <h3 className="text-xl font-light mb-4 text-gray-800 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                            Implementation Plan
                          </h3>
                          <div className="space-y-3">
                            {selectedProject.plan.map((step, idx) => (
                              <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-300">
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs font-medium shrink-0">{idx + 1}</div>
                                <p className="text-base text-gray-700 pt-0.5">{step}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Outcomes */}
                      {selectedProject.outcomes && selectedProject.outcomes.length > 0 && (
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-sm">
                          <h3 className="text-xl font-light mb-4 text-gray-800 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            Project Outcomes
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {selectedProject.outcomes.map((outcome, idx) => (
                              <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2"></div>
                                <p className="text-base text-gray-700">{outcome}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Sidebar Column */}
                    <div className="lg:col-span-4">
                      <div className="sticky top-6 space-y-6">
                        {/* Technologies */}
                        {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-sm">
                            <h3 className="text-lg font-light mb-4 text-gray-800 flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path></svg>
                               Technologies
                             </h3>
                             <div className="flex flex-wrap gap-2">
                               {selectedProject.technologies.map((tech, idx) => (
                                 <span key={idx} className="px-3 py-1.5 bg-white text-gray-800 rounded-md text-sm font-medium border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300">
                                   {tech}
                                 </span>
                               ))}
                             </div>
                           </div>
                         )}
                         
                         {/* Contributors */}
                         {selectedProject.contributors && (
                           <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-sm">
                             <h3 className="text-lg font-light mb-4 text-gray-800 flex items-center gap-2">
                               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                               Contributors
                             </h3>
                             <p className="text-sm text-gray-700">{selectedProject.contributors.join(', ')}</p>
                           </div>
                         )}
                         
                         {/* Action buttons */}
                         <div className="flex flex-col gap-3 mt-6">
                           {selectedProject.githubUrl && (
                             <a
                               href={selectedProject.githubUrl}
                               target="_blank"
                               rel="noopener noreferrer"
                               className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-sm"
                             >
                               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                 <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                               </svg>
                               View on GitHub
                             </a>
                           )}
                           {selectedProject.link && (
                             <a
                               href={selectedProject.link}
                               target="_blank"
                               rel="noopener noreferrer"
                               className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-900 shadow-md hover:shadow-lg transition-all duration-300"
                             >
                               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                 <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                                 <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                               </svg>
                               View Live Demo
                             </a>
                           )}
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="h-full flex items-center justify-center p-12 text-center border border-gray-100 rounded-xl shadow-sm bg-gray-50/50"
              >
                <div className="max-w-md mx-auto py-12">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center blur-sm opacity-10">
                      <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
                    </div>
                    <img 
                      src="/projects/neural-network.svg" 
                      alt="Select a project" 
                      className="w-48 h-48 mx-auto relative z-10 drop-shadow-lg"
                    />
                  </div>
                  <h3 className="text-2xl font-light text-gray-700 mt-8">Select a project</h3>
                  <p className="text-gray-500 mt-3 max-w-md mx-auto leading-relaxed">
                    Browse through my data science and machine learning projects in the sidebar to view detailed information, technologies used, and outcomes.
                  </p>
                  <div className="mt-8 flex justify-center">
                    <div className="inline-flex items-center text-sm text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                      {projects.length} projects available
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}