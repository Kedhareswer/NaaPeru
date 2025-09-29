"use client"

import { motion } from "framer-motion"
import Image from "next/image"

type Project = {
  title: string
  description: string
  technologies: string[]
  github?: string
  demo?: string
  image?: string
  date?: string
  category?: string
}

type Profile = {
  personalInfo?: { 
    name?: string
    title?: string
    email?: string
    linkedin?: string
    github?: string
  }
  projects?: Project[]
  skills?: {
    programmingLanguages?: string[]
    aiMlFrameworks?: string[]
    webTechnologies?: string[]
  }
}

type WorkSectionProps = {
  profile?: Profile
}

function WorkSection({ profile }: WorkSectionProps) {
  const fullName = profile?.personalInfo?.name || "Your Name"
  const title = profile?.personalInfo?.title || "Developer"
  const email = profile?.personalInfo?.email
  const linkedin = profile?.personalInfo?.linkedin
  const github = profile?.personalInfo?.github
  
  // Get featured project (first one)
  const featuredProject = profile?.projects?.[0] || {
    title: "Featured Project",
    description: "An amazing project showcasing modern web development techniques.",
    technologies: ["React", "Next.js", "TypeScript"],
    date: "2024"
  }

  const skills = [
    ...(profile?.skills?.programmingLanguages?.slice(0, 3) || []),
    ...(profile?.skills?.webTechnologies?.slice(0, 3) || []),
    ...(profile?.skills?.aiMlFrameworks?.slice(0, 2) || [])
  ].slice(0, 6)

  return (
    <section className="w-full min-h-screen bg-white flex">
      {/* Left Column - 10% - Profile Image */}
      <motion.div 
        className="w-[10%] bg-gray-50 flex flex-col items-center justify-start pt-8 px-2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center mb-4">
          <span className="text-white font-bold text-lg md:text-xl lg:text-2xl">
            {fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </span>
        </div>
        
        <div className="flex flex-col space-y-2 text-xs">
          <motion.button 
            className="text-gray-600 hover:text-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Full case studies
          </motion.button>
          <motion.button 
            className="text-gray-600 hover:text-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Get CV
          </motion.button>
        </div>

        <div className="mt-8 space-y-2">
          <div className="text-xs font-semibold text-gray-800">Work snippets</div>
          <div className="text-xs text-gray-600">Why hire me</div>
          
          <div className="mt-4 space-y-1 text-xs text-gray-600">
            <div>Connect on LN</div>
            <div>Email</div>
            <div>Whatsapp</div>
          </div>
        </div>
      </motion.div>

      {/* Middle Column - 20% - Project Info */}
      <motion.div 
        className="w-[20%] bg-white p-6 border-r border-gray-200"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-900 mb-2">
            {featuredProject.description}
          </h2>
          <div className="text-xs text-gray-600 mb-4">
            See case study →
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-900 mb-3">Highlights</h3>
          <div className="space-y-3 text-xs text-gray-700">
            <div className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Conceptualized, delivered and iterated on cross-platform UX/UI, and 17 major updates.</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Helped the sales team grow from 0 to a stable sales pipeline, and onboard major academia and B2B customers.</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Created a brand system to amplify messaging, and allow internal delegation.</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Created a Tailwind-based design system to help save team's time for back-end development.</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-xs text-gray-700 mb-2">
            <span className="text-green-600">✓</span> {featuredProject.title} won top industrial awards: Intel Ignite "Most Transformed", Open Bosch, SPIE Prism, Innovuissae "Scale-Up".
          </div>
        </div>
      </motion.div>

      {/* Right Column - 70% - Project Showcase */}
      <motion.div 
        className="w-[70%] bg-gradient-to-br from-blue-500 to-blue-700 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {/* Header */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start text-white z-10">
          <div>
            <div className="text-sm font-medium">WORK SNIPPETS</div>
            <div className="text-xs opacity-80 mt-1">{title}</div>
          </div>
          <div className="text-right">
            <div className="text-xs opacity-80">@{fullName.split(' ')[0]} Platform ({featuredProject.category || 'Web App'})</div>
            <div className="text-xs opacity-80 mt-1">{featuredProject.date} → Now</div>
          </div>
        </div>

        {/* Project Badge */}
        <div className="absolute top-20 left-6 bg-white bg-opacity-20 backdrop-blur-sm rounded px-3 py-1 z-10">
          <div className="text-white text-xs font-medium">{fullName.split(' ')[0]}</div>
          <div className="text-white text-xs opacity-80">/Auto</div>
        </div>

        {/* Main Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-md">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {featuredProject.title}
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl opacity-90 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {featuredProject.technologies.slice(0, 3).join(' + ')} solution for modern web development
            </motion.p>
          </div>
        </div>

        {/* Mock Browser Window */}
        <motion.div 
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-[80%] max-w-2xl"
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
                {featuredProject.demo || `${featuredProject.title.toLowerCase().replace(/\s+/g, '-')}.vercel.app`}
              </div>
            </div>
            
            {/* Mock Content */}
            <div className="bg-white p-6 h-48 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {featuredProject.title.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div className="text-gray-800 font-semibold mb-2">{featuredProject.title}</div>
                <div className="text-gray-600 text-sm">{featuredProject.description.slice(0, 60)}...</div>
                <div className="flex justify-center space-x-2 mt-4">
                  {featuredProject.technologies.slice(0, 3).map((tech, i) => (
                    <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {tech}
                    </span>
                  ))}
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
          <div className="text-xs opacity-60">/Solution</div>
        </div>
      </motion.div>
    </section>
  )
}

export { WorkSection }
