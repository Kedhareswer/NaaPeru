"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Briefcase, GraduationCap, Coffee, Code, BookOpen, Music, Camera, Bike } from "lucide-react"
import SkillGrid from "./skill-grid"



const skills = [
  {
    category: "Programming & Development",
    items: ["Python", "R", "SQL", "HTML", "CSS"],
  },
  {
    category: "Machine Learning & Deep Learning",
    items: ["Deep Learning", "Machine Learning", "Neural Networks", "CNN", "NLP", "Transfer Learning"],
  },
  {
    category: "Data Science & Analytics",
    items: ["Exploratory Data Analysis", "Data Visualization", "Business Intelligence", "Trend Analysis", "Data Ethics"],
  },
  {
    category: "Tools & Technologies",
    items: ["Tableau", "Power BI","Azure","Figma"],
  }
]

const education = [
  {
    institution: "Lovely Professional University",
    location: "Phagwara, Punjab, India",
    degree: "Bachelor of Technology - Computer Science and Engineering",
    specialization: "Data Science (AI & ML)",
    cgpa: 7.55,
    period: "Since September 2021",
    icon: GraduationCap,
  },
  {
    institution: "Sri Siddhartha Junior College",
    location: "Madanapalle, Andhra Pradesh, India",
    degree: "Intermediate",
    marks: 889,
    period: "July 2019 - June 2021",
    icon: GraduationCap,
  },
  {
    institution: "Vijaya Bharathi English Medium High School",
    location: "Madanapalle, Andhra Pradesh, India",
    degree: "Matriculation",
    cgpa: 9.5,
    period: "June 2018 - March 2019",
    icon: GraduationCap,
  },
]

const experiences = [
  {
    title: "AI Evaluator & Trainer",
    company: "Outlier.AI, Data Annotation, Soul.AI",
    period: "Nov 2024 - Present",
    description:
      "Contributing to AI model improvement by evaluating mathematical content, assessing factuality and quality of AI-generated text, and crafting subject-specific questions to enhance accuracy.",
    icon: Briefcase,
  },
  {
    title: "Solutions Architecture Virtual Experience",
    company: "AWS APAC (The Forage)",
    period: "Dec 2024 - Jan 2025",
    description:
      "Designed scalable hosting architecture using Elastic Beanstalk for high-growth clients, focusing on performance optimization and clear cost communication.",
    icon: Code,
  },
  {
    title: "Data Analyst Intern",
    company: "PSYLIQ",
    period: "Jan 2024 - Feb 2024",
    description:
      "Analyzed HR data using MySQL, Python, and Power BI to create compelling visualizations, improving data comprehension by 25% and enhancing decision-making processes.",
    icon: Code,
  },
  {
    title: "Senior & Junior Manager",
    company: "AIESEC in Jalandhar",
    period: "Jul 2022 - Jan 2023",
    description:
      "Managed outbound professional exchange programs and led team interactions, demonstrating strong leadership in program execution and team building through collaborative projects.",
    icon: GraduationCap,
  },
]

const achievements = [
  {
    title: "AI/ML Research Paper",
    description: "Published research on advanced neural network architectures in computer vision applications",
    date: "2024",
    icon: BookOpen,
    category: "Academic",
  },
  {
    title: "Hackathon Champion",
    description: "Won first place in National Level AI Hackathon for innovative healthcare solution",
    date: "2023",
    icon: Code,
    category: "Technical",
  },
  {
    title: "Data Science Competition",
    description: "Secured top 5% rank in international data science competition on Kaggle",
    date: "2023",
    icon: Briefcase,
    category: "Competition",
  },
  {
    title: "Research Grant",
    description: "Received research grant for work on AI in healthcare diagnostics",
    date: "2024",
    icon: GraduationCap,
    category: "Academic",
  },
]

const hobbies = [
  {
    name: "Reading",
    description:
      "Exploring books on AI ethics, futurism, and science fiction to stay inspired about technology's potential.",
    icon: BookOpen,
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "Music",
    description: "Listening to music and exploring new genres to unwind and relax.",
    icon: Music,
    color: "from-purple-500 to-pink-600",
  },
  {
    name: "Photography",
    description: "Capturing urban landscapes and experimenting with computational photography techniques.",
    icon: Camera,
    color: "from-amber-500 to-orange-600",
  },
  {
    name: "Cycling",
    description: "Exploring the city and countryside on two wheels to clear my mind and stay active.",
    icon: Bike,
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "Handcraft",
    description: "Creating handmade crafts and accessories to express my creativity.",
    icon: Coffee,
    color: "from-red-500 to-rose-600",
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="about" className="py-24 md:py-32 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header with balanced spacing */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div className="flex-1 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-light">About & Skills</h2>
              <div className="w-16 h-px bg-black mt-4"></div>
            </div>
          </div>

          {/* About & Data Visualization - Balanced 2-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* About Me Column */}
            <div className="flex-1 space-y-8">
              <h3 className="text-2xl font-light">About Me</h3>
              <div className="space-y-6 prose prose-gray max-w-none">
                <p className="text-gray-800 leading-relaxed">
                  As a dedicated <span className="font-medium text-primary">final year student</span>, I am in the midst of completing my studies while preparing for the transition into the professional world. With a strong academic foundation in <span className="font-medium text-primary">Data Science</span> and <span className="font-medium text-primary">AI/ML</span>, I am eager to apply my knowledge and skills in real-world scenarios.
                </p>
                <p className="text-gray-800 leading-relaxed">
                  Throughout my academic journey, I have developed expertise in building <span className="font-medium text-primary">intelligent systems</span> and optimizing <span className="font-medium text-primary">machine learning workflows</span>, with a focus on <span className="font-medium text-primary">computer vision</span>, <span className="font-medium text-primary">NLP</span>, and <span className="font-medium text-primary">AI-driven automation</span>. I actively balance coursework, projects, and extracurricular activities, embracing the challenges and opportunities that come with my final year.
                </p>
                <p className="text-gray-800 leading-relaxed">
                  My passion for learning and commitment to personal growth continue to drive me as I approach graduation. I am particularly interested in leveraging <span className="font-medium text-primary">advanced AI techniques</span> to solve <span className="font-medium text-primary">complex business challenges</span> and look forward to making meaningful contributions in the professional world.
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <SkillGrid skills={skills} isInView={isInView} />
          </div>
        </motion.div>

        {/* Main Content Grid - 2 columns on large screens for balanced layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
          {/* Left Column - Education & Experience */}
          <div className="space-y-16">
            {/* Education Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-light">Education</h3>
                <motion.div 
                  className="h-px bg-black" 
                  style={{ width: 0 }}
                  animate={isInView ? { width: 80 } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <div className="space-y-8">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    className="flex gap-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="mt-1 flex-shrink-0">
                      <div className="p-2 border border-black rounded-full">
                        <edu.icon className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-medium mb-1">{edu.institution}</h4>
                      <p className="text-gray-600 text-sm mb-2">{edu.location}</p>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm mb-3">
                        <span className="text-gray-700 font-medium">{edu.degree}</span>
                        <span className="text-gray-500 mt-1 md:mt-0">{edu.period}</span>
                      </div>
                      {edu.specialization && (
                        <p className="text-gray-600 leading-relaxed mb-2">Specialization: {edu.specialization}</p>
                      )}
                      {edu.cgpa && (
                        <p className="text-gray-600 leading-relaxed">CGPA: {edu.cgpa}</p>
                      )}
                      {edu.marks && (
                        <p className="text-gray-600 leading-relaxed">Marks: {edu.marks}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Experience Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-light">Relevant Experience</h3>
                <motion.div 
                  className="h-px bg-black" 
                  style={{ width: 0 }}
                  animate={isInView ? { width: 80 } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    className="flex gap-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="mt-1 flex-shrink-0">
                      <div className="p-2 border border-black rounded-full">
                        <exp.icon className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-medium mb-2">{exp.title}</h4>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm mb-3">
                        <span className="text-gray-700 font-medium">{exp.company}</span>
                        <span className="text-gray-500 mt-1 md:mt-0">{exp.period}</span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Skills, Achievements & Hobbies */}
          <div className="space-y-16">
            {/* Achievements Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-light">Participations & Achievements</h3>
                <motion.div 
                  className="h-px bg-black" 
                  style={{ width: 0 }}
                  animate={isInView ? { width: 80 } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="group relative overflow-hidden border border-black p-4 hover:bg-black hover:text-white transition-colors duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0">
                        <div className="p-2 border border-current rounded-full group-hover:border-white">
                          <achievement.icon className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-medium">{achievement.title}</h4>
                          <span className="text-sm opacity-70">{achievement.date}</span>
                        </div>
                        <p className="text-sm opacity-80">{achievement.description}</p>
                        <span className="inline-block mt-2 text-xs px-2 py-1 border border-current rounded">
                          {achievement.category}
                        </span>
                      </div>
                    </div>
                    <motion.div 
                      className="absolute inset-0 bg-black opacity-0"
                      whileHover={{ opacity: 0.05 }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
            {/* Hobbies Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-light">Hobbies & Interests</h3>
                <motion.div 
                  className="h-px bg-black" 
                  style={{ width: 0 }}
                  animate={isInView ? { width: 80 } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              
              {/* Balanced 3-column grid for hobbies */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {hobbies.map((hobby, index) => {
                  const [isHovered, setIsHovered] = useState(false);
                  const [currentImageIndex, setCurrentImageIndex] = useState(0);
                  return (
                    <motion.div
                      key={index}
                      className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      onHoverStart={() => setIsHovered(true)}
                      onHoverEnd={() => setIsHovered(false)}
                      whileHover={{ scale: 1.02 }}
                    >
                      {/* Background gradient that appears on hover */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-black to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      <div className="p-4 sm:p-5 relative z-10 h-full flex flex-col">
                        <motion.div 
                          className="flex items-center mb-3 group-hover:text-white transition-colors duration-300"
                          animate={{ y: isHovered ? -5 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="p-2 rounded-full bg-black group-hover:bg-white transition-colors duration-300 shadow-lg">
                            <hobby.icon className="w-4 h-4 text-white group-hover:text-black transition-colors duration-300" />
                          </div>
                          <h4 className="text-base ml-3 font-medium tracking-wide">{hobby.name}</h4>
                        </motion.div>
                        
                        <motion.p 
                          className="text-xs sm:text-sm leading-relaxed opacity-90 group-hover:text-white transition-colors duration-300 flex-grow"
                          animate={{ 
                            opacity: isHovered ? 1 : 0.8,
                            y: isHovered ? 0 : 5
                          }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          {hobby.description}
                        </motion.p>
                        
                        {/* Visual indicator */}
                        <motion.div 
                          className="flex items-center space-x-1 mt-3"
                          animate={{ 
                            opacity: isHovered ? 1 : 0.6
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {[...Array(3)].map((_, i) => (
                            <motion.div 
                              key={i}
                              className="h-1 bg-black group-hover:bg-white transition-colors duration-300"
                              initial={{ width: 5 }}
                              animate={{ 
                                width: isHovered ? 15 - (i * 3) : 5,
                              }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                            />
                          ))}
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>


      </div>
    </section>
  )
}

