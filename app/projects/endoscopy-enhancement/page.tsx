"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function EndoscopyEnhancementProject() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-6">Endoscopy Image Enhancement</h1>
        
        <div className="mb-8">
          <Image
            src="/projects/endoscopy-image-enhancement.png"
            alt="Endoscopy Image Enhancement Example"
            width={800}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
            <p className="text-gray-700">
              An advanced medical imaging system that enhances endoscopic images using deep learning
              techniques. The system improves visibility and detail in endoscopic footage, aiding
              in more accurate medical diagnoses and procedures.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'Python',
                'PyTorch',
                'OpenCV',
                'CUDA',
                'Medical Imaging Libraries',
                'Deep Learning'
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
              <li>Real-time image enhancement</li>
              <li>Noise reduction and clarity improvement</li>
              <li>Contrast enhancement</li>
              <li>Edge preservation and sharpening</li>
              <li>Support for multiple endoscope formats</li>
              <li>DICOM format compatibility</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Technical Details</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                The system employs a custom-designed deep learning architecture specifically
                optimized for medical imaging enhancement. It includes multiple processing
                stages for different aspects of image quality improvement.
              </p>
              <p>
                Key technical achievements include:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Advanced denoising algorithms</li>
                <li>Adaptive contrast enhancement</li>
                <li>Real-time processing capabilities</li>
                <li>Medical standard compliance</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Impact and Results</h2>
            <div className="space-y-4 text-gray-700">
              <ul className="list-disc list-inside space-y-2">
                <li>40% improvement in image clarity</li>
                <li>30% reduction in image noise</li>
                <li>Positive feedback from medical professionals</li>
                <li>Successful implementation in multiple medical facilities</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Future Development</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Integration with more endoscope systems</li>
              <li>Enhanced AI-based feature detection</li>
              <li>Mobile application development</li>
              <li>Cloud-based processing capabilities</li>
            </ul>
          </section>
        </div>
      </motion.div>
    </div>
  )
}
