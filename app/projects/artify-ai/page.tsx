"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function ArtifyAIProject() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-6">Artify AI - Image to Oil Paint</h1>
        
        <div className="mb-8">
          <Image
            src="/projects/image-to-sketch-dark.png"
            alt="Artify AI Transformation Example"
            width={800}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
            <p className="text-gray-700">
              An innovative AI-powered system that transforms regular photographs into stunning
              oil painting style artworks. Using advanced deep learning techniques, Artify AI
              captures the essence of oil painting techniques and applies them to digital images.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'Python',
                'PyTorch',
                'GANs',
                'Style Transfer',
                'React',
                'FastAPI',
                'Docker',
                'Cloud GPU'
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
            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Multiple oil painting styles</li>
              <li>Real-time preview</li>
              <li>High-resolution output</li>
              <li>Style customization options</li>
              <li>Batch processing support</li>
              <li>Color palette optimization</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Technical Implementation</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-xl font-medium">Neural Style Transfer</h3>
              <p>
                Implements advanced neural style transfer techniques using generative adversarial
                networks (GANs) to create realistic oil painting effects. The system analyzes both
                content and style features to generate authentic-looking artwork.
              </p>

              <h3 className="text-xl font-medium mt-6">Image Processing Pipeline</h3>
              <p>
                Features a sophisticated image processing pipeline that includes color analysis,
                texture mapping, and brush stroke simulation. The system maintains image quality
                while applying artistic transformations.
              </p>

              <h3 className="text-xl font-medium mt-6">Cloud Infrastructure</h3>
              <p>
                Utilizes cloud-based GPU infrastructure for efficient processing of large images
                and batch transformations. The system is designed to scale based on demand while
                maintaining consistent performance.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Performance Metrics</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Average processing time under 30 seconds</li>
              <li>Support for images up to 4K resolution</li>
              <li>Multiple concurrent transformations</li>
              <li>High user satisfaction ratings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Future Enhancements</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Additional artistic styles</li>
              <li>Mobile application development</li>
              <li>Advanced customization options</li>
              <li>Video transformation support</li>
            </ul>
          </section>
        </div>
      </motion.div>
    </div>
  )
}
