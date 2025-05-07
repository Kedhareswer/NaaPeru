'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function DigitClassifierProject() {
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

        <h1 className="text-4xl font-bold mb-6">Digit Classifier Deep Learning</h1>
        
        <div className="mb-8">
          <Image
            src="/projects/digit-classifier.png"
            alt="Digit Classifier Project"
            width={800}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
            <p className="text-gray-700">
              A modern web-based digit recognition application that leverages Deep Learning
              to classify handwritten digits with high accuracy. The project combines
              cutting-edge web technologies with powerful machine learning capabilities to
              create an interactive and educational platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Next.js",
                "FastAPI",
                "TensorFlow",
                "Python",
                "React",
                "Deep Learning"
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
            <h2 className="text-2xl font-semibold mb-4">Key Achievements</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Real-time digit recognition with canvas drawing interface</li>
              <li>Convolutional Neural Network (CNN) model with 99% accuracy</li>
              <li>Interactive visualization of model predictions</li>
              <li>Responsive design for mobile and desktop devices</li>
              <li>Fast API backend with efficient model serving</li>
              <li>Comprehensive error handling and user feedback</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Implementation Details</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                The project utilizes a deep neural network architecture specifically designed 
                for digit recognition. The implementation includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Frontend built with Next.js and React, featuring a canvas-based drawing interface</li>
                <li>FastAPI backend for efficient image processing and model inference</li>
                <li>Custom CNN architecture trained on the MNIST dataset</li>
                <li>Real-time prediction updates and intuitive user interactions</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Results and Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Image
                src="/projects/digit-result.png"
                alt="Digit classification results"
                width={400}
                height={300}
                className="rounded-lg shadow-md"
              />
              <div>
                <ul className="list-disc list-inside space-y-3 text-gray-700">
                  <li>Achieved 99% accuracy on test dataset</li>
                  <li>Average inference time of 50ms per prediction</li>
                  <li>Successfully deployed and serving 1000+ daily users</li>
                  <li>Positive user feedback on interface usability</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-gray-700">
              The model demonstrates exceptional performance in recognizing handwritten digits,
              making it suitable for educational purposes and real-world applications.
            </p>
          </section>

          <section className="mt-8">
            <a
              href="https://github.com/yourusername/digit-classifier"
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