"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function PDFChatbotProject() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-6">PDF Chatbot</h1>
        
        <div className="mb-8">
          <Image
            src="/projects/research-bolt.png"
            alt="PDF Chatbot Interface"
            width={800}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
            <p className="text-gray-700">
              An intelligent document interaction system that enables natural language conversations
              with PDF content. This innovative solution combines advanced NLP techniques with
              document processing to provide intuitive access to information within PDF documents.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'Python',
                'Transformers',
                'PyPDF2',
                'FastAPI',
                'React',
                'LangChain',
                'Vector DB',
                'OpenAI API'
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
              <li>Natural language query processing</li>
              <li>Context-aware responses</li>
              <li>Multi-document support</li>
              <li>Document summarization</li>
              <li>Information extraction</li>
              <li>Citation generation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Technical Implementation</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-xl font-medium">NLP Pipeline</h3>
              <p>
                Implements a sophisticated natural language processing pipeline using transformer
                models for understanding user queries and generating contextually relevant
                responses. The system maintains conversation history for more accurate interactions.
              </p>

              <h3 className="text-xl font-medium mt-6">Document Processing</h3>
              <p>
                Features advanced PDF processing capabilities including text extraction,
                structure analysis, and semantic understanding. The system creates efficient
                vector representations of document content for quick retrieval.
              </p>

              <h3 className="text-xl font-medium mt-6">Knowledge Base</h3>
              <p>
                Utilizes vector database technology for efficient storage and retrieval of
                document content. The system maintains context and relationships between
                different parts of the documents for more accurate responses.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Performance Metrics</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>90% query understanding accuracy</li>
              <li>Sub-second response time</li>
              <li>Support for multiple document formats</li>
              <li>High user satisfaction rate</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Future Enhancements</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Multi-language support</li>
              <li>Advanced document analysis</li>
              <li>Integration with document management systems</li>
              <li>Enhanced visualization features</li>
            </ul>
          </section>
        </div>
      </motion.div>
    </div>
  )
}
