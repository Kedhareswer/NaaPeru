"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

type Experience = {
  role: string
  company: string
  duration: string
  location?: string
  description: string[]
  technologies?: string[]
  achievements?: string[]
}

type Profile = {
  personalInfo?: { 
    name?: string
    title?: string
    email?: string
    linkedin?: string
    github?: string
  }
  experience?: Experience[]
  projects?: any[]
}

type ExperienceSectionProps = {
  profile?: Profile
}

function ExperienceSection({ profile }: ExperienceSectionProps) {
  const [activeJobIndex, setActiveJobIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const fullName = profile?.personalInfo?.name || "Your Name"
  const experiences = profile?.experience || []

  // Mock experience data if none provided
  const mockExperiences: Experience[] = [
    {
      role: "Senior AI/ML Engineer",
      company: "TechCorp",
      duration: "2023 - Present",
      location: "Remote",
      description: [
        "Led development of machine learning models for predictive analytics",
        "Implemented MLOps pipelines using Docker and Kubernetes",
        "Collaborated with cross-functional teams to deliver AI solutions"
      ],
      technologies: ["Python", "TensorFlow", "AWS", "Docker"],
      achievements: [
        "Improved model accuracy by 25%",
        "Reduced inference time by 40%",
        "Mentored 3 junior developers"
      ]
    },
    {
      role: "Data Scientist",
      company: "DataFlow Inc",
      duration: "2021 - 2023",
      location: "Bangalore, India",
      description: [
        "Developed predictive models for customer behavior analysis",
        "Created data visualization dashboards using Tableau",
        "Performed statistical analysis on large datasets"
      ],
      technologies: ["Python", "R", "SQL", "Tableau"],
      achievements: [
        "Increased customer retention by 15%",
        "Built automated reporting system",
        "Published 2 research papers"
      ]
    },
    {
      role: "Junior Developer",
      company: "StartupXYZ",
      duration: "2020 - 2021",
      location: "Mumbai, India",
      description: [
        "Built responsive web applications using React",
        "Integrated APIs and third-party services",
        "Participated in agile development processes"
      ],
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      achievements: [
        "Delivered 5 major features",
        "Reduced bug reports by 30%",
        "Improved page load times by 50%"
      ]
    }
  ]

  const displayExperiences = experiences.length > 0 ? experiences : mockExperiences

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const container = containerRef.current
      const scrollTop = container.scrollTop
      const containerHeight = container.clientHeight
      
      // Each job takes exactly one full viewport height
      const jobHeight = containerHeight
      
      // Calculate current job index based on which viewport is most visible
      const currentJobIndex = Math.round(scrollTop / jobHeight)
      
      // Only change active job when we've scrolled to a new full viewport
      if (currentJobIndex !== activeJobIndex && currentJobIndex >= 0 && currentJobIndex < displayExperiences.length) {
        setActiveJobIndex(currentJobIndex)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true })
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [activeJobIndex, displayExperiences.length])

  return (
    <section className="w-full h-screen flex overflow-hidden">
      {/* Left Column - 10% - Profile (Fixed) */}
      <div className="w-[10%] bg-gray-50 flex flex-col items-center justify-start pt-8 px-2 sticky top-0 h-screen">
        <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center mb-4">
          <span className="text-white font-bold text-lg md:text-xl lg:text-2xl">
            {fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </span>
        </div>
        
        <div className="flex flex-col space-y-2 text-xs">
          <motion.button 
            className="text-gray-600 hover:text-purple-600 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Full case studies
          </motion.button>
          <motion.button 
            className="text-gray-600 hover:text-purple-600 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Get CV
          </motion.button>
        </div>

        <div className="mt-8 space-y-2">
          <div className="text-xs font-semibold text-gray-800">Career Journey</div>
          <div className="text-xs text-gray-600">Professional Growth</div>
          
          <div className="mt-4 space-y-1 text-xs text-gray-600">
            <div>Connect on LN</div>
            <div>Email</div>
            <div>Whatsapp</div>
          </div>
        </div>
      </div>

      {/* Middle Column - 20% - Section Header (Sticky) */}
      <div className="w-[20%] bg-white border-r border-gray-200 relative">
        <div className="sticky top-0 h-screen flex flex-col">
          {/* Experience Section Header */}
          <motion.div 
            className={`p-6 transition-all duration-500 flex-1`}
          >
            <div className="sticky top-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Experience</h2>
              <motion.div
                key={activeJobIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <p className="text-sm text-gray-600 mb-4">
                  {displayExperiences[activeJobIndex]?.role} at {displayExperiences[activeJobIndex]?.company}
                  {displayExperiences[activeJobIndex]?.location && ` - ${displayExperiences[activeJobIndex].location}`}
                </p>
                
                <div className="text-xs text-blue-600 hover:underline cursor-pointer mb-6">
                  See case study →
                </div>

                <div className="space-y-4">
                  <div className="text-xs font-semibold text-gray-800">Highlights</div>
                  <div className="space-y-3 text-xs text-gray-700">
                    {displayExperiences[activeJobIndex]?.achievements?.map((achievement, idx) => (
                      <div key={idx} className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>{achievement}</span>
                      </div>
                    ))}
                    {displayExperiences[activeJobIndex]?.description?.map((desc, idx) => (
                      <div key={`desc-${idx}`} className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>{desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Right Column - 70% - Scrollable Content */}
      <div 
        ref={containerRef}
        className="w-[70%] overflow-y-auto h-screen snap-y snap-mandatory"
        style={{ 
          scrollBehavior: 'smooth',
          scrollSnapType: 'y mandatory'
        }}
      >
        {/* Experience Cards */}
        {displayExperiences.map((experience, index) => (
          <div key={index} className="h-screen relative snap-start bg-gradient-to-br from-blue-500 to-blue-700 overflow-hidden">
            {/* Header */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-start text-white z-10">
              <div>
                <div className="text-sm font-medium">WORK SNIPPETS</div>
                <div className="text-xs opacity-80 mt-1">{experience.role}</div>
              </div>
              <div className="text-right">
                <div className="text-xs opacity-80">@{fullName.split(' ')[0]} Platform ({experience.company})</div>
                <div className="text-xs opacity-80 mt-1">{experience.duration}</div>
              </div>
            </div>

            {/* Company Badge */}
            <div className="absolute top-20 left-6 bg-white bg-opacity-20 backdrop-blur-sm rounded px-3 py-1 z-10">
              <div className="text-white text-xs font-medium">{fullName.split(' ')[0]}</div>
              <div className="text-white text-xs opacity-80">/{experience.company.slice(0, 4)}</div>
            </div>

            {/* Main Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-2xl px-6">
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {experience.company}
                </motion.h1>
                <motion.p 
                  className="text-lg md:text-xl lg:text-2xl opacity-90 mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  {experience.technologies ? 
                    `${experience.technologies.slice(0, 3).join(' + ')} development for ${experience.role.toLowerCase()}` :
                    `${experience.role} contributing to innovative solutions`
                  }
                </motion.p>
              </div>
            </div>

            {/* Mock Dashboard/Interface */}
            <motion.div 
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-[85%] max-w-4xl"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
                {/* Browser Header */}
                <div className="bg-gray-100 px-4 py-2 flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-600">
                    {experience.company.toLowerCase().replace(/\s+/g, '')}.com/dashboard
                  </div>
                </div>
                
                {/* Mock Dashboard Content */}
                <div className="bg-white p-6 h-64 relative">
                  {/* Dashboard Header */}
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{experience.company} Dashboard</h3>
                      <p className="text-sm text-gray-600">{experience.role} Interface</p>
                    </div>
                    <div className="flex space-x-2">
                      {(experience.technologies || ['React', 'Node.js', 'Python']).slice(0, 3).map((tech, i) => (
                        <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Mock Charts/Data */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                      <div className="w-full h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded opacity-80"></div>
                      <div className="mt-2 text-xs text-gray-600">Performance Metrics</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                      <div className="w-full h-16 bg-gradient-to-r from-green-400 to-green-600 rounded opacity-80"></div>
                      <div className="mt-2 text-xs text-gray-600">Data Processing</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                      <div className="w-full h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded opacity-80"></div>
                      <div className="mt-2 text-xs text-gray-600">Analytics</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white bg-opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white bg-opacity-5 rounded-full translate-y-24 -translate-x-24"></div>
            
            {/* Bottom Info */}
            <div className="absolute bottom-6 left-6 text-white">
              <div className="text-xs opacity-80">{fullName.split(' ')[0]}</div>
              <div className="text-xs opacity-60">/{experience.company}</div>
            </div>
          </div>
        ))}

      </div>
    </section>
  )
}

export { ExperienceSection }
