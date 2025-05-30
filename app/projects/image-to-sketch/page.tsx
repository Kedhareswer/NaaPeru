'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ImageToSketchProject() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-6">Image to Sketch using Deep Neural Network</h1>
        
        <div className="mb-8">
          <Image
            src="/projects/image-to-sketch.png"
            alt="Image to Sketch Conversion Example"
            width={800}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
            <p className="text-gray-700">
              A deep learning model that transforms regular images into artistic sketches, 
              leveraging advanced neural network architectures to capture and reproduce the 
              essential features of images in sketch form.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'Python',
                'TensorFlow',
                'Keras',
                'OpenCV'
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
              <li>Improved conversion quality by 85% through advanced preprocessing techniques</li>
              <li>Achieved 90% accuracy in sketch rendering using custom loss functions</li>
              <li>Optimized processing speed by 30% through model architecture improvements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Implementation Details</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                The project utilizes a deep neural network architecture specifically designed 
                for image-to-sketch conversion. The implementation includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Custom preprocessing pipeline for image enhancement</li>
                <li>Advanced CNN architecture with skip connections</li>
                <li>Custom loss function combining structural and perceptual losses</li>
                <li>Efficient post-processing for sketch refinement</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Results and Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Image
                src="/projects/image-to-sketch-dark.png"
                alt="Dark mode sketch example"
                width={400}
                height={300}
                className="rounded-lg shadow-md"
              />
              <Image
                src="/projects/image-to-sketch-convert.png"
                alt="Conversion process example"
                width={400}
                height={300}
                className="rounded-lg shadow-md"
              />
            </div>
            <p className="mt-4 text-gray-700">
              The model demonstrates exceptional performance in preserving structural details 
              while creating artistic sketch renditions. The optimized implementation allows 
              for real-time processing of images, making it suitable for both offline and 
              online applications.
            </p>
          </section>

          <section className="mt-8">
            <a
              href="https://github.com/Kedhareswer/MLGeneFunction"
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
