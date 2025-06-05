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
    description: "Science fiction and technical literature enthusiast",
  },
  {
    name: "Music",
    icon: Music,
    description: "Listening to music and exploring new genres",
  },
  {
    name: "Traveling",
    icon: Plane,
    description: "Exploring new cultures and destinations",
  },
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
    ],
  },
  {
    category: "Tools & Platforms",
    items: ["Power BI", "Tableau", "Hugging Face", "Git"],
  },
  {
    category: "AI Tools",
    items: ["Vercel", "Lovable", "Bolt", "Jules", "Cursor", "Windsurf", "Wix Studio", "Relume", "Gemini Studio"],
  },
  {
    category: "Soft Skills",
    items: [
      "Problem Solving",
      "Team Leadership",
      "Project Management",
      "Communication",
      "Critical Thinking",
      "Time Management",
    ],
  },
]

const participations = [
  {
    title: "Hackathons & Competitions",
    items: [
      {
        name: "AI/ML Hackathon 2023",
        description: "Developed an innovative solution for real-time emotion recognition",
        icon: Trophy,
      },
      {
        name: "Data Science Challenge",
        description: "Created predictive models for business optimization",
        icon: Award,
      },
    ],
  },
  {
    title: "Certifications",
    items: [
      {
        name: "AWS Machine Learning Specialty",
        description: "Advanced certification in cloud-based ML solutions",
        icon: Medal,
      },
      {
        name: "Google Data Analytics",
        description: "Professional certification in data analytics",
        icon: Medal,
      },
    ],
  },
]

export default function SkillsParticipations() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [isHoveredSkills, setIsHoveredSkills] = useState({})

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

          {/* Participations Section */}
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
              {participations.map((section, sectionIndex) => (
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
            </div>
          </motion.div>

          {/* Hobbies Section */}
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
      </div>
    </section>
  )
}
