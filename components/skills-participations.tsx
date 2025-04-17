"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Trophy, Award, Medal, Heart, Music, Book, Camera, Gamepad, Plane } from "lucide-react"
import "../styles/shiny-button.css"

const hobbies = [
  {
    name: "Photography",
    icon: Camera,
    description: "Capturing moments and exploring visual storytelling"
  },
  {
    name: "Gaming",
    icon: Gamepad,
    description: "Strategic gaming and virtual world exploration"
  },
  {
    name: "Reading",
    icon: Book,
    description: "Science fiction and technical literature enthusiast"
  },
  {
    name: "Music",
    icon: Music,
    description: "Playing guitar and composing digital music"
  },
  {
    name: "Traveling",
    icon: Plane,
    description: "Exploring new cultures and destinations"
  }
]

const skills = [
  {
    category: "Technical Skills",
    items: [
      "Python", "R", "SQL", "Machine Learning", "Deep Learning",
      "Computer Vision", "NLP", "Data Analysis", "Statistical Modeling"
    ]
  },
  {
    category: "Tools & Platforms",
    items: [
      "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy",
      "Power BI", "Tableau", "Azure", "Git"
    ]
  },
  {
    category: "Soft Skills",
    items: [
      "Problem Solving", "Team Leadership", "Project Management",
      "Communication", "Critical Thinking", "Time Management"
    ]
  }
]

const participations = [
  {
    title: "Hackathons & Competitions",
    items: [
      {
        name: "AI/ML Hackathon 2023",
        description: "Developed an innovative solution for real-time emotion recognition",
        icon: Trophy
      },
      {
        name: "Data Science Challenge",
        description: "Created predictive models for business optimization",
        icon: Award
      }
    ]
  },
  {
    title: "Certifications",
    items: [
      {
        name: "AWS Machine Learning Specialty",
        description: "Advanced certification in cloud-based ML solutions",
        icon: Medal
      },
      {
        name: "Google Data Analytics",
        description: "Professional certification in data analytics",
        icon: Medal
      }
    ]
  }
]

export default function SkillsParticipations() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

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
              <h2 className="text-2xl font-light">Skills</h2>
              <div className="h-px bg-black flex-grow"/>
            </div>

            <div className="space-y-8">
              {skills.map((category, index) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-medium mb-4">{category.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm shiny-button"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + skillIndex * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
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
              <h2 className="text-2xl font-light">Participations</h2>
              <div className="h-px bg-black flex-grow"/>
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
                  <h3 className="text-lg font-medium">{section.title}</h3>
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
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
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
              <h2 className="text-2xl font-light">Hobbies</h2>
              <div className="h-px bg-black flex-grow"/>
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
                      <h4 className="font-medium">{hobby.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{hobby.description}</p>
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