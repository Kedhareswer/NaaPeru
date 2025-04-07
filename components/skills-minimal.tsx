"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimationControls } from "framer-motion"

type SkillsMinimalProps = {
  skills: {
    category: string
    items: string[]
  }[]
  isInView: boolean
}

export default function SkillsMinimal({ skills, isInView }: SkillsMinimalProps) {
  const [activeCategory, setActiveCategory] = useState(0)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Colors for different categories
  const categoryColors = [
    "from-blue-500 to-indigo-600",
    "from-purple-500 to-pink-600",
    "from-green-500 to-emerald-600",
    "from-amber-500 to-orange-600",
    "from-rose-500 to-red-600",
  ]
  
  // Auto-rotate through categories
  useEffect(() => {
    if (!isInView) return
    
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % skills.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isInView, skills.length])
  
  // Get current category and skills
  const currentCategory = skills[activeCategory]
  
  return (
    <motion.div
      ref={containerRef}
      className="relative p-6 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg shadow-sm min-h-[450px] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Minimal grid background */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none opacity-30">
        {[...Array(7)].map((_, i) => (
          <motion.div 
            key={`h-${i}`}
            className="col-span-full h-px bg-gray-200"
            style={{ gridRow: `${i + 1} / span 1` }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.1 + (i * 0.05) }}
          />
        ))}
        {[...Array(7)].map((_, i) => (
          <motion.div 
            key={`v-${i}`}
            className="row-span-full w-px bg-gray-200"
            style={{ gridColumn: `${i + 1} / span 1` }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8, delay: 0.1 + (i * 0.05) }}
          />
        ))}
      </div>
      
      {/* Title with animated underline */}
      <motion.h3 
        className="text-2xl font-light mb-8 relative z-10 flex items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.span className="mr-2 text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600">
          Skills & Expertise
        </motion.span>
        <motion.div 
          className="h-1 w-8 bg-black rounded-full ml-2"
          initial={{ width: 0 }}
          animate={isInView ? { width: 32 } : { width: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
      </motion.h3>

      {/* Category navigation */}
      <motion.div 
        className="flex mb-8 space-x-2 overflow-x-auto pb-2 scrollbar-hide"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {skills.map((category, index) => (
          <motion.button
            key={index}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeCategory === index ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveCategory(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
          >
            {category.category}
          </motion.button>
        ))}
      </motion.div>

      {/* Skills display area */}
      <div className="relative h-[250px]">
        {skills.map((category, categoryIndex) => (
          <motion.div
            key={categoryIndex}
            className="absolute inset-0 flex flex-wrap content-start gap-3"
            initial={{ opacity: 0, x: 50 }}
            animate={{
              opacity: activeCategory === categoryIndex ? 1 : 0,
              x: activeCategory === categoryIndex ? 0 : 50,
              pointerEvents: activeCategory === categoryIndex ? 'auto' : 'none'
            }}
            transition={{ duration: 0.5 }}
          >
            {category.items.map((skill, skillIndex) => {
              const isHovered = hoveredSkill === skill;
              const delay = skillIndex * 0.05;
              
              return (
                <motion.div
                  key={skillIndex}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView && activeCategory === categoryIndex ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.2 + delay }}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className={`py-2 px-4 rounded-full border ${isHovered ? 'bg-black text-white border-black' : 'border-gray-300 hover:border-gray-400'} transition-colors duration-200`}
                    animate={{
                      y: isHovered ? -3 : 0,
                    }}
                  >
                    <span className="text-sm font-medium whitespace-nowrap">{skill}</span>
                  </motion.div>
                </motion.div>
              )
            })}
            
            {/* Category description */}
            <motion.p
              className="w-full mt-8 text-sm text-gray-600 italic"
              initial={{ opacity: 0 }}
              animate={isInView && activeCategory === categoryIndex ? { opacity: 0.8 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              {getCategoryDescription(category.category)}
            </motion.p>
          </motion.div>
        ))}
      </div>
      
      {/* Progress indicator */}
      <motion.div 
        className="absolute bottom-6 left-6 right-6 h-1 bg-gray-100 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <motion.div 
          className={`h-full bg-gradient-to-r ${categoryColors[activeCategory % categoryColors.length]}`}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 5, ease: 'linear', repeat: 1, repeatType: 'reverse' }}
        />
      </motion.div>
      
      {/* Instruction hint */}
      <motion.div 
        className="absolute bottom-6 right-6 flex items-center gap-2 text-gray-500 text-xs font-medium bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-100"
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <motion.div 
          className="w-1.5 h-1.5 rounded-full bg-black"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        click categories to explore
      </motion.div>
    </motion.div>
  )
}

// Helper function to get category descriptions
function getCategoryDescription(category: string): string {
  switch(category) {
    case "Programming & Development":
      return "Core programming languages and development tools I use to build solutions and analyze data.";
    case "Machine Learning & Deep Learning":
      return "Advanced AI techniques I've mastered for creating intelligent systems and predictive models.";
    case "Data Science & Analytics":
      return "Methods and approaches I use to extract insights and value from complex datasets.";
    case "Tools & Technologies":
      return "Software platforms and technologies I leverage to create visualizations and deploy solutions.";
    default:
      return "Skills and expertise I've developed throughout my academic and professional journey.";
  }
}