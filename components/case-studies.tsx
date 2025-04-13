"use client"

import { motion, AnimatePresence, useInView } from "framer-motion"
import { ScrollArea } from "./ui/scroll-area"
import { Star, ArrowRight, ChevronRight, ExternalLink, Github } from "lucide-react"
import { useState, useEffect, useRef } from "react"

// Shutter animation variants
const shutterVariants = {
  closed: { scaleX: 1 },
  open: { scaleX: 0, transition: { duration: 0.5, ease: "easeOut" } }
}
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

// Add CSS to hide scrollbar
const scrollbarHideStyles = {
  '::-webkit-scrollbar': {
    display: 'none'
  },
  scrollbarWidth: 'none',
  msOverflowStyle: 'none'
}

type CaseStudy = {
  title: string
  description: string
  image: string
  link: string
  tags: string[]
  startDate: string
  technologies: string[]
  problemStatement: string
  approach: string[]
  challenges: string[]
  solutions: string[]
  outcomes: string[]
  impact: string
  role?: string
  duration?: string
  githubUrl?: string
  liveDemo?: string
  featured?: boolean
}

const caseStudies: CaseStudy[] = [
  {
    title: "AI-Powered Image Style Transfer",
    description: "A web application that transforms ordinary photos into artistic masterpieces using advanced deep learning algorithms for style transfer.",
    image: "/projects/image-to-oil-paint.svg",
    link: "#",
    startDate: "2023-08-01",
    technologies: ["PyTorch", "FastAPI", "React", "TensorFlow", "Docker"],
    tags: ["Computer Vision", "Deep Learning", "Web Development"],
    problemStatement: "Artists and content creators need efficient tools to transform images into different artistic styles while maintaining the original content's integrity.",
    approach: [
      "Implemented custom CNN architecture for style transfer",
      "Developed real-time processing pipeline",
      "Created intuitive user interface for style selection",
      "Optimized model for web deployment"
    ],
    challenges: [
      "Balancing style transfer quality with processing speed",
      "Handling various image formats and sizes",
      "Implementing efficient model deployment"
    ],
    solutions: [
      "Used model quantization for faster inference",
      "Implemented adaptive image preprocessing",
      "Developed containerized deployment solution"
    ],
    outcomes: [
      "Achieved style transfer in under 5 seconds",
      "Processed over 100,000 images",
      "4.8/5 user satisfaction rating"
    ],
    impact: "The platform has enabled artists and content creators to explore new creative possibilities and streamline their workflow.",
    featured: true,
    role: "ML Engineer",
    duration: "4 months"
  },
  {
    title: "Real-time Emotion Recognition System",
    description: "An advanced computer vision system that detects and analyzes facial expressions in real-time, providing emotional insights for various applications.",
    image: "/projects/emotion-recognition.svg",
    link: "#",
    startDate: "2023-04-15",
    technologies: ["OpenCV", "TensorFlow", "Flask", "WebRTC", "Redis"],
    tags: ["Computer Vision", "Real-time Processing", "Machine Learning"],
    problemStatement: "Traditional emotion recognition systems lack real-time capabilities and accuracy in diverse environments.",
    approach: [
      "Developed custom CNN for facial expression recognition",
      "Implemented real-time video processing pipeline",
      "Created scalable backend architecture",
      "Integrated WebRTC for live video streaming"
    ],
    challenges: [
      "Achieving real-time performance",
      "Handling varying lighting conditions",
      "Ensuring privacy compliance"
    ],
    solutions: [
      "Optimized model architecture for speed",
      "Implemented adaptive preprocessing",
      "Developed on-device processing"
    ],
    outcomes: [
      "95% accuracy in emotion detection",
      "30ms average processing time",
      "Successfully deployed in 5 commercial applications"
    ],
    impact: "The system has revolutionized human-computer interaction and emotional intelligence applications.",
    featured: true,
    role: "Lead Developer",
    duration: "8 months"
  },
  {
    title: "Neural Network Visualization Platform",
    description: "An interactive platform for visualizing and understanding complex neural network architectures in real-time, enabling users to explore deep learning concepts through hands-on experimentation.",
    image: "/projects/neural-network.svg",
    link: "#",
    startDate: "2023-06-01",
    technologies: ["React", "D3.js", "TensorFlow.js", "WebGL", "Node.js"],
    tags: ["Data Visualization", "Neural Networks", "Interactive Learning"],
    problemStatement: "Deep learning concepts are often abstract and difficult to grasp for newcomers. Traditional learning resources lack interactive elements that could help visualize these complex systems.",
    approach: [
      "Developed an intuitive visualization engine using D3.js and WebGL",
      "Implemented real-time parameter adjustment capabilities",
      "Created interactive tutorials and guided learning paths",
      "Integrated TensorFlow.js for live model training demonstrations"
    ],
    challenges: [
      "Optimizing performance for complex network architectures",
      "Creating intuitive user interactions for technical concepts",
      "Balancing visual appeal with educational value"
    ],
    solutions: [
      "Implemented WebGL-based rendering for large networks",
      "Designed progressive disclosure of complex features",
      "Created customizable visualization templates"
    ],
    outcomes: [
      "Increased user understanding of neural networks by 85%",
      "Reduced learning curve for deep learning concepts",
      "Achieved 10,000+ monthly active users"
    ],
    impact: "The platform has become a valuable educational resource, helping students and professionals better understand neural network architectures and deep learning principles.",
    featured: true,
    role: "Lead Developer",
    duration: "6 months"
  },
  {
    title: "Medical Imaging AI Assistant",
    description: "An advanced computer vision system that assists medical professionals in analyzing diagnostic imaging, leveraging deep learning for accurate anomaly detection and classification.",
    image: "/projects/medical-imaging.svg",
    link: "#",
    startDate: "2023-01-01",
    technologies: ["Python", "PyTorch", "OpenCV", "Flask", "React"],
    tags: ["Medical Imaging", "Computer Vision", "Healthcare AI"],
    problemStatement: "Medical professionals face challenges in quickly and accurately analyzing large volumes of diagnostic images, leading to potential delays in diagnosis and treatment.",
    approach: [
      "Developed custom CNN architectures for medical image analysis",
      "Implemented transfer learning from established medical imaging models",
      "Created an intuitive web interface for result visualization",
      "Integrated with existing medical imaging systems"
    ],
    challenges: [
      "Ensuring high accuracy in anomaly detection",
      "Processing diverse types of medical imaging formats",
      "Meeting strict healthcare data security requirements"
    ],
    solutions: [
      "Implemented ensemble learning for improved accuracy",
      "Created unified image processing pipeline",
      "Developed HIPAA-compliant data handling system"
    ],
    outcomes: [
      "Achieved 95% accuracy in anomaly detection",
      "Reduced image analysis time by 60%",
      "Successfully processed 50,000+ images"
    ],
    impact: "The system has significantly improved diagnostic efficiency and accuracy, leading to faster patient care and better treatment outcomes.",
    featured: true,
    role: "Machine Learning Engineer",
    duration: "12 months"
  },
  {
    title: "Intelligent Document Analysis System",
    description: "A sophisticated document processing platform that leverages NLP and machine learning to extract, analyze, and organize information from various document types.",
    image: "/projects/chatbot.svg",
    link: "https://kedhareswer.github.io/PDFChatBot/",
    startDate: "2023-02-28",
    technologies: ["Python", "HuggingFace", "FAISS", "KeyBERT", "React"],
    tags: ["Natural Language Processing", "Document Processing", "AI Chatbot"],
    problemStatement: "Organizations struggle with efficient processing and analysis of large document collections, leading to time-consuming manual review processes.",
    approach: [
      "Implemented advanced NLP models for text understanding",
      "Developed efficient document indexing system",
      "Created conversational interface for document queries",
      "Built automated summary generation system"
    ],
    challenges: [
      "Handling diverse document formats and structures",
      "Maintaining context in long conversations",
      "Optimizing search and retrieval performance"
    ],
    solutions: [
      "Created unified document processing pipeline",
      "Implemented context-aware conversation system",
      "Optimized vector search with FAISS"
    ],
    outcomes: [
      "90% accuracy in information extraction",
      "60% reduction in document processing time",
      "Successfully processed 100,000+ pages"
    ],
    impact: "The system has transformed document management processes, significantly reducing manual effort and improving information accessibility.",
    githubUrl: "https://kedhareswer.github.io/PDFChatBot/",
    liveDemo: "https://kedhareswer.github.io/PDFChatBot/"
  }
]

export { caseStudies }

export default function CaseStudies() {
  const router = useRouter()
  const [hoveredStudy, setHoveredStudy] = useState<CaseStudy | null>(null)
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null)
  const studiesRef = useRef<HTMLDivElement>(null)

  return (
    <section id="case-studies" className="min-h-screen bg-white py-20" ref={studiesRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-4">Featured Work</h2>
          <div className="w-20 h-1 bg-black mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            A collection of innovative solutions and impactful projects.
          </p>
        </div>
        </div>
        <div className="grid grid-cols-1 gap-8">
          {/* First row with 2 larger featured projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.slice(0, 2).map((study, index) => (
              <motion.div
                key={index}
                className="group relative aspect-[16/9] overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
                onClick={() => router.push(`/project/${index}`)}
                onMouseEnter={() => setHoveredStudy(study)}
                onMouseLeave={() => setHoveredStudy(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative h-full w-full">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gray-900 origin-right"
                    initial="closed"
                    whileInView="open"
                    viewport={{ once: true }}
                    variants={shutterVariants}
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-60">
                  <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <h3 className="text-white text-2xl font-semibold mb-2">{study.title}</h3>
                    <p className="text-gray-200 text-sm">{new Date(study.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Second row with 3 smaller projects */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.slice(2, 5).map((study, index) => (
            <motion.div
              key={index}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
              onClick={() => router.push(`/project/${index}`)}
              onMouseEnter={() => setHoveredStudy(study)}
              onMouseLeave={() => setHoveredStudy(null)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative h-full w-full">
                <img
                  src={study.image}
                  alt={study.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <motion.div
                  className="absolute inset-0 bg-gray-900 origin-right"
                  initial="closed"
                  whileInView="open"
                  viewport={{ once: true }}
                  variants={shutterVariants}
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-60">
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <h3 className="text-white text-xl font-semibold mb-2">{study.title}</h3>
                  <p className="text-gray-200 text-sm">{new Date(study.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        </div>

        <AnimatePresence>
          {selectedStudy && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <ScrollArea className="h-[90vh]">
                  <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                          {selectedStudy.title}
                        </h2>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          {selectedStudy.role && (
                            <span>Role: {selectedStudy.role}</span>
                          )}
                          {selectedStudy.duration && (
                            <span>Duration: {selectedStudy.duration}</span>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedStudy(null)}
                      >
                        ×
                      </Button>
                    </div>
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Problem Statement</h3>
                        <p className="text-gray-600">{selectedStudy.problemStatement.split(/\b(Deep Learning|Neural Networks|Medical Imaging|Document Processing|NLP|Computer Vision)\b/).map((part: string, i: number) => {
                          const isKeyword = /^(Deep Learning|Neural Networks|Medical Imaging|Document Processing|NLP|Computer Vision)$/.test(part);
                          return isKeyword ? 
                            <span key={i} className="font-medium text-primary">{part}</span> : 
                            <span key={i}>{part}</span>;
                        })}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">Approach</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                          {selectedStudy.approach.map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Challenges</h3>
                          <ul className="list-disc list-inside space-y-2 text-gray-600">
                            {selectedStudy.challenges.map((challenge, i) => (
                              <li key={i}>{challenge}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Solutions</h3>
                          <ul className="list-disc list-inside space-y-2 text-gray-600">
                            {selectedStudy.solutions.map((solution, i) => (
                              <li key={i}>{solution}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">Outcomes & Impact</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                          {selectedStudy.outcomes.map((outcome, i) => (
                            <li key={i}>{outcome}</li>
                          ))}
                        </ul>
                        <p className="text-gray-600">{selectedStudy.impact.split(/\b(Neural Network|Deep Learning|Patient Care|Treatment|Document Management|Information)\b/).map((part, i) => {
                          const isKeyword = /^(Neural Network|Deep Learning|Patient Care|Treatment|Document Management|Information)$/.test(part);
                          return isKeyword ? 
                            <span key={i} className="font-medium text-primary">{part}</span> : 
                            <span key={i}>{part}</span>;
                        })}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedStudy.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4">
                        {selectedStudy.githubUrl && (
                          <Button
                            variant="outline"
                            className="flex items-center gap-2"
                            onClick={() => window.open(selectedStudy.githubUrl, '_blank')}
                          >
                            <Github className="w-4 h-4" /> View on GitHub
                          </Button>
                        )}
                        {selectedStudy.liveDemo && (
                          <Button
                            className="flex items-center gap-2"
                            onClick={() => window.open(selectedStudy.liveDemo, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4" /> Live Demo
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        </section>
  )
}