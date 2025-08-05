"use client"

import { motion } from "framer-motion"
import { SafariWithTabs } from "@/components/ui/safari"

// Start with 3 default tabs including showcase and 2 featured projects
const projectTabs = [
  {
    id: '1',
    title: 'Project Showcase',
    url: 'about:blank',
    src: '/projects/image-to-sketch.png',
    favicon: '🚀',
    description: 'Welcome to my project showcase! Click the "+" button above to explore my projects from the database.',
    technologies: ['Interactive', 'Dynamic', 'Database'],
    github: null,
    demo: null,
    category: 'Welcome',
    date: 'Now'
  },
  {
    id: '2',
    title: 'Bolt Research Hub',
    url: 'ai-project-planner.vercel.app',
    src: '/projects/research-bolt.png',
    favicon: '🔬',
    description: 'Bolt Research Hub is a comprehensive platform for academic research, offering literature exploration, intelligent summarization, project management, and real-time team collaboration. It integrates advanced AI (Google Gemini, OpenAI, Groq), NLP pipelines, and Python-based backend for multi-source academic search, content analysis, and research assistance. Features include project planner, real-time chat, Gantt charts, persistent sessions, and secure collaboration.',
    technologies: ['Machine Learning', 'React', 'Node.js', 'WebSocket', 'AI Integration'],
    github: 'https://github.com/Kedhareswer/ai-project-planner',
    demo: 'https://ai-project-planner.vercel.app/',
    category: 'Web Development',
    date: 'July 2025'
  },
  {
    id: '3',
    title: 'QuantumPDF ChatApp VectorDB',
    url: 'quantumn-pdf-chatapp.netlify.app',
    src: '/projects/quantumpdf.png',
    favicon: '📄',
    description: 'AI-powered chat platform for intelligent conversations with PDF documents, using Retrieval-Augmented Generation (RAG), adaptive chunking, and vector search to provide accurate, context-aware answers. Supports 20+ AI providers, client-side PDF processing, and real-time quality metrics.',
    technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'PDF.js', 'Tesseract.js', 'Pinecone', 'ChromaDB', 'Weaviate', 'OpenAI', 'Anthropic', 'Google AI', 'Groq', 'Ollama'],
    github: 'https://github.com/Kedhareswer/QuantumPDF_ChatApp_VectorDB',
    demo: 'https://quantumn-pdf-chatapp.netlify.app/',
    category: 'Deep Learning',
    date: 'Jun 2025'
  }
]

export default function SafariSection() {
  return (
    <section id="featured-projects" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore my latest projects through an interactive browser experience. 
            Projects are loaded dynamically from my Neon database. Click the "+" button to add more projects.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <SafariWithTabs 
            initialTabs={projectTabs}
            className="w-full shadow-2xl"
            height={600}
          />
        </motion.div>

        
      </div>
    </section>
  )
} 