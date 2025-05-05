'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { caseStudies } from '@/components/case-studies'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

// Add the new MNIST project
const mnistProject = {
  title: "MNIST Digit Recognition Model",
  description: "An interactive platform for handwritten digit recognition using a convolutional neural network (CNN) trained on the MNIST dataset, achieving 98.7% accuracy on test data.",
  image: "/projects/mnist-recognition.svg",
  hoverImage: "/projects/mnist-recognition-hover.svg",
  link: "#",
  startDate: "2024-03-15",
  technologies: ["PyTorch", "TensorFlow", "CNN", "Python", "NumPy"],
  tags: ["Deep Learning", "Computer Vision", "Neural Networks"],
  problemStatement: "Deep learning concepts are often abstract and difficult to grasp. This project demonstrates practical application through digit recognition.",
  approach: [
    "Implemented CNN architecture with TensorFlow",
    "Trained model on 60,000 MNIST examples",
    "Optimized model for web deployment",
    "Achieved 98.7% accuracy on test set"
  ],
  challenges: [
    "Balancing model size and accuracy",
    "Optimizing for web deployment",
    "Handling different writing styles",
    "Managing computational resources"
  ],
  solutions: [
    "Used model compression techniques",
    "Implemented efficient CNN architecture",
    "Applied data augmentation",
    "Optimized for browser execution"
  ],
  outcomes: [
    "98.7% accuracy on test dataset",
    "Optimized model size (~200 KB)",
    "Successful web integration",
    "Robust across different writing styles"
  ],
  impact: "Created an accessible platform for understanding neural networks through practical digit recognition, while maintaining high accuracy and efficient deployment.",
  featured: true,
  role: "ML Engineer",
  duration: "2 months"
}

// Combine existing case studies with the new MNIST project
const allProjects = [...caseStudies, mnistProject]

// Project categories
const categories = {
  'ML': 'Machine Learning',
  'DL': 'Deep Learning',
  'Other': 'Other Projects'
}

type Category = keyof typeof categories

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All')

  // Categorize projects
  const categorizeProject = (project: typeof allProjects[0]) => {
    if (project.tags.some(tag => tag.includes('Deep Learning') || tag.includes('Neural Network'))) {
      return 'DL'
    }
    if (project.tags.some(tag => tag.includes('Machine Learning') || tag.includes('ML'))) {
      return 'ML'
    }
    return 'Other'
  }

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'All'
    ? allProjects
    : allProjects.filter(project => categorizeProject(project) === selectedCategory)

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <Link href="/#case-studies">
            <Button
              variant="ghost"
              className="hover:bg-gray-100 text-sm font-medium tracking-wide transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-light mb-4">All Projects</h1>
          <div className="w-20 h-1 bg-black mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore my complete portfolio of projects across different domains.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            variant={selectedCategory === 'All' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('All')}
            className="min-w-[120px]"
          >
            All Projects
          </Button>
          {Object.entries(categories).map(([key, label]) => (
            <Button
              key={key}
              variant={selectedCategory === key ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(key as Category)}
              className="min-w-[120px]"
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Link href={`/project/${index}`} key={index}>
              <motion.div
                className="group relative overflow-hidden rounded-2xl bg-gray-50 cursor-pointer h-[400px] transform transition-all duration-300 hover:scale-[1.02] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_8px_16px_rgba(0,0,0,0.1)] border border-gray-200/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110 p-4"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-60">
                  <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <h3 className="text-white text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-200 text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="bg-white/10 text-white px-2 py-1 rounded-md text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}