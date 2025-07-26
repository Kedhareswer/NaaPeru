"use client"

import { useState } from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Trophy, Award, Medal, Music, Book, Gamepad, Plane } from "lucide-react"
import { FloatingLogo, generateRandomPosition, logoMap } from "./floating-logos"

const hobbies = [
  {
    name: "Gaming",
    icon: Gamepad,
    description: "Strategic gaming and virtual world exploration",
  },
  {
    name: "Reading",
    icon: Book,
    description: "Science fiction and Fantasy literature enthusiast",
  },
  {
    name: "Music",
    icon: Music,
    description: "Listening to music",
  }
]

const skills = [
  {
    category: "Technical Skills",
    items: [
      "Python",
      "SQL",
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "NLP",
      "Data Analysis",
      "Statistical Modeling",
      "Agentic AI",
      "Autonomous Agents",
      "Image Processing",
    ],
  },
  {
    category: "Tools & Platforms",
    items: [
      "Power BI",
      "Tableau",
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "GitHub",
      "OpenCV",
      "FastAPI",
      "MySQL",
      "Node.js",
      "Next.js",
      "React",
    ],
  },
  {
    category: "AI Tools",
    items: [
      "Gemini",
      "ChatGPT",
      "Claude",
      "AutoGen",
      "CrewAI",
      "LangChain",
      "LlamaIndex",
      "LangGraph",
      "MetaGPT",
      "OpenAgents",
      "Hugging Face",
      "Neo4j",
      "Supabase",
      "Neon",
      "Vercel",
      "AWS",
    ],
  },
  {
    category: "Soft Skills",
    items: [
      "Problem Solving",
      "Team Leadership",
      "Project Management",
      "Communication",
      "Critical Thinking",
      "Adaptability",
    ],
  },
]

const participations = [
  {
    title: "Hackathons & Competitions",
    items: [
      {
        name: "World's Largest Hackathon",
        description: "Bolt.new - June 2025",
        icon: Trophy,
      },
      {
        name: "Red-Bus Data Decode Hackathon 2025",
        description: "Analytics Vidhya - June 2025",
        icon: Trophy,
      },
      {
        name: "Predicting Optimal Fertilizers",
        description: "Kaggle - May 2025",
        icon: Trophy,
      },
    ],
  },
]

// Separate certifications from participations
const certifications = [
  {
    name: "Neo4j Certified Professional",
    description: "Neo4j - July 2025",
    icon: Medal,
  },
  {
    name: "Python for Data Science",
    description: "Infosys - May 2025",
    icon: Medal,
  },
      {
        name: "AWS APAC - Solutions Architecture Job Simulation",
        description: "Forage - December 2024",
        icon: Medal,
      },
      {
        name: "Certified Data Science Essentials",
        description: "RF Skilling Academy - December 2024",
        icon: Medal,
      },
      {
        name: "Introduction to Responsible AI",
        description: "Google - November 2024",
        icon: Medal,
      },
]

// Remove Certifications from participations array
const participationsOnly = [participations[0]]

export default function SkillsParticipations() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [isHoveredSkills, setIsHoveredSkills] = useState<Record<string, boolean>>({})

  return (
    <section ref={ref} className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-light text-gray-900">Skills</h2>
              <div className="h-px bg-black flex-grow" />
            </div>

            <div className="space-y-8">
              {skills.map((category, index) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-medium mb-4 text-gray-900">{category.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill, skillIndex) => {
                      return (
                        <div key={skill} className="relative">
                          <motion.span
                            className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm relative overflow-hidden transition-all duration-300 hover:shadow-lg font-medium text-gray-800"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, delay: index * 0.1 + skillIndex * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                            onMouseEnter={() => setIsHoveredSkills((prev) => ({ ...prev, [skill]: true }))}
                            onMouseLeave={() => setIsHoveredSkills((prev) => ({ ...prev, [skill]: false }))}
                            style={{
                              background: isHoveredSkills[skill]
                                ? "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)"
                                : "white",
                            }}
                          >
                            {skill}
                          </motion.span>
                          {isHoveredSkills[skill] &&
                            skill in logoMap &&
                            [...Array(3).keys()].map((i) => {
                              const { x, y } = generateRandomPosition(100, 100)
                              return <FloatingLogo key={`${skill}-${i}`} x={x} y={y} delay={i * 0.2} skill={skill} />
                            })}
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Participations Section (center column) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-light text-gray-900">Participations</h2>
              <div className="h-px bg-black flex-grow" />
            </div>

            <div className="space-y-8">
              {/* Only Hackathons & Competitions */}
              {participationsOnly.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.2 + sectionIndex * 0.1 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
                  <div className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <motion.div
                        key={item.name}
                        className="flex items-start space-x-4 p-4 bg-white border border-gray-200 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, delay: 0.3 + sectionIndex * 0.1 + itemIndex * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="p-2 bg-gray-50 rounded-full">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Hobbies Section (now in center column) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-light text-gray-900">Hobbies</h2>
              <div className="h-px bg-black flex-grow" />
            </div>
            <div className="space-y-4">
              {hobbies.map((hobby, index) => (
                <motion.div
                  key={hobby.name}
                  className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-50 rounded-full">
                      <hobby.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{hobby.name}</h4>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">{hobby.description}</p>
                    </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Certifications Section (now rightmost column) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-light text-gray-900">Certifications</h2>
              <div className="h-px bg-black flex-grow" />
            </div>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  className="flex items-start space-x-4 p-4 bg-white border border-gray-200 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="p-2 bg-gray-50 rounded-full">
                    <cert.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{cert.name}</h4>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{cert.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
