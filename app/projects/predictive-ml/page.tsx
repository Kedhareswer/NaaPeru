"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function PredictiveMLProject() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-6">Predictive Machine Learning</h1>
        
        <div className="mb-8">
          <Image
            src="/projects/neural-network.svg"
            alt="Predictive ML Architecture"
            width={800}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
            <p className="text-gray-700">
              An advanced predictive analytics system that leverages machine learning algorithms
              to provide accurate forecasting and decision support. The system processes complex
              data patterns to generate actionable insights and predictions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'Python',
                'Scikit-learn',
                'TensorFlow',
                'Pandas',
                'NumPy',
                'Docker',
                'FastAPI',
                'PostgreSQL'
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
              <li>Time series forecasting</li>
              <li>Anomaly detection</li>
              <li>Pattern recognition</li>
              <li>Automated model selection</li>
              <li>Real-time predictions</li>
              <li>Interactive dashboards</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Technical Implementation</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-xl font-medium">Machine Learning Pipeline</h3>
              <p>
                The system implements a sophisticated machine learning pipeline that includes
                data preprocessing, feature engineering, model training, and evaluation. Multiple
                algorithms are employed to ensure optimal prediction accuracy for different
                types of data and use cases.
              </p>

              <h3 className="text-xl font-medium mt-6">Model Architecture</h3>
              <p>
                Utilizes ensemble learning techniques combining multiple models including
                gradient boosting, random forests, and neural networks. The system automatically
                selects and tunes the best model based on the specific prediction task.
              </p>

              <h3 className="text-xl font-medium mt-6">API Integration</h3>
              <p>
                Features a RESTful API built with FastAPI for seamless integration with
                existing systems. The API supports both batch and real-time prediction
                requests with comprehensive documentation.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Performance Metrics</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>95% prediction accuracy on benchmark datasets</li>
              <li>Sub-second response time for real-time predictions</li>
              <li>Scalable to handle millions of records</li>
              <li>Robust error handling and monitoring</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Future Enhancements</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Advanced feature selection algorithms</li>
              <li>Automated hyperparameter optimization</li>
              <li>Extended API capabilities</li>
              <li>Enhanced visualization tools</li>
            </ul>
          </section>
        </div>
      </motion.div>
    </div>
  )
}
