"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Skill = {
  name: string
  proficiency: number // 0-100
  category: string
  description?: string
}

type SkillGridProps = {
  skills: {
    category: string
    items: string[]
  }[]
  isInView: boolean
}

const skillsData: Skill[] = [
  // Programming & Development
  { name: "Python", proficiency: 90, category: "Programming & Development", description: "Advanced data analysis, ML/DL implementations" },
  { name: "R", proficiency: 85, category: "Programming & Development", description: "Statistical analysis, data visualization" },
  { name: "SQL", proficiency: 80, category: "Programming & Development", description: "Database management, complex queries" },
  { name: "HTML", proficiency: 75, category: "Programming & Development", description: "Web development fundamentals" },
  { name: "CSS", proficiency: 75, category: "Programming & Development", description: "Styling and responsive design" },

  // Machine Learning & Deep Learning
  { name: "Deep Learning", proficiency: 85, category: "Machine Learning & Deep Learning", description: "Neural network architectures, model optimization" },
  { name: "Machine Learning", proficiency: 90, category: "Machine Learning & Deep Learning", description: "Predictive modeling, algorithm implementation" },
  { name: "Neural Networks", proficiency: 85, category: "Machine Learning & Deep Learning", description: "Architecture design, training optimization" },
  { name: "CNN", proficiency: 80, category: "Machine Learning & Deep Learning", description: "Computer vision applications" },
  { name: "NLP", proficiency: 75, category: "Machine Learning & Deep Learning", description: "Text processing and analysis" },
  { name: "Transfer Learning", proficiency: 80, category: "Machine Learning & Deep Learning", description: "Model adaptation and fine-tuning" },

  // Data Science & Analytics
  { name: "Exploratory Data Analysis", proficiency: 90, category: "Data Science & Analytics", description: "Data insights and pattern discovery" },
  { name: "Data Visualization", proficiency: 85, category: "Data Science & Analytics", description: "Creating impactful visual representations" },
  { name: "Business Intelligence", proficiency: 80, category: "Data Science & Analytics", description: "Strategic data-driven insights" },
  { name: "Trend Analysis", proficiency: 85, category: "Data Science & Analytics", description: "Pattern identification and forecasting" },
  { name: "Data Ethics", proficiency: 75, category: "Data Science & Analytics", description: "Ethical considerations in data science" },

  // Tools & Technologies
  { name: "Tableau", proficiency: 85, category: "Tools & Technologies", description: "Interactive dashboard creation" },
  { name: "Power BI", proficiency: 80, category: "Tools & Technologies", description: "Business analytics and reporting" },
  { name: "Azure", proficiency: 75, category: "Tools & Technologies", description: "Cloud computing and services" },
  { name: "Figma", proficiency: 70, category: "Tools & Technologies", description: "UI/UX design and prototyping" }
]

export default function SkillGrid({ skills, isInView }: SkillGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(skillsData[0].category)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const categories = [...new Set(skillsData.map(skill => skill.category))]
  const filteredSkills = skillsData.filter(skill => skill.category === selectedCategory)

  return (
    <div className="space-y-8">
      {/* Title */}
      <motion.h2
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        Skills
      </motion.h2>

      {/* Category Navigation */}
      <motion.div 
        className="flex flex-wrap gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        {categories.map((category, index) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === category ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Skills Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AnimatePresence mode="wait">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="relative p-4 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.4 } }}
              transition={{ 
                duration: 0.4,
                delay: index * 0.05,
                ease: [0.4, 0, 0.2, 1]
              }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-medium">{skill.name}</h4>
                  <span className="text-sm font-medium">{skill.proficiency}%</span>
                </div>

                {/* Proficiency Bar */}
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-black"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.proficiency}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>

                {/* Description */}
                <AnimatePresence>
                  {hoveredSkill === skill.name && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm text-gray-600"
                    >
                      {skill.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Category Tag */}
              <div className="absolute top-2 right-2">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 rounded-full">
                  {skill.category.split(' & ')[0]}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}