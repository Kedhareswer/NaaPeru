"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Briefcase, GraduationCap } from "lucide-react"

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
    icon: Briefcase,
  },
  {
    title: "Data Analyst Intern",
    company: "PSYLIQ",
    period: "Jan 2024 - Feb 2024",
    description:
      "Analyzed HR data using MySQL, Python, and Power BI to create compelling visualizations, improving data comprehension by 25% and enhancing decision-making processes.",
    icon: Briefcase,
  },
  {
    title: "Senior & Junior Manager",
    company: "AIESEC in Jalandhar",
    period: "Jul 2022 - Jan 2023",
    description:
      "Managed outbound professional exchange programs and led team interactions, demonstrating strong leadership in program execution and team building through collaborative projects.",
    icon: Briefcase,
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="about" className="min-h-screen bg-gray-50" ref={ref}>
      <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto">
        {/* Left Column - About Me (Sticky) */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-0 lg:h-screen p-8 flex items-center">
          <motion.div
            className="space-y-8 max-w-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-light mb-4">About Me</h2>
              <div className="w-16 h-px bg-black"></div>
            </div>

            <div className="space-y-6 prose prose-gray max-w-none">
              <p className="text-gray-800 leading-relaxed">
                As a dedicated <span className="font-medium text-primary">final year student</span>, I am in the midst of completing my studies while preparing for the transition into the professional world. With a strong academic foundation in <span className="font-medium text-primary">Data Science</span> and <span className="font-medium text-primary">AI/ML</span>, I am eager to apply my knowledge and skills in real-world scenarios.
              </p>
              <p className="text-gray-800 leading-relaxed">
                Throughout my academic journey, I have developed expertise in building <span className="font-medium text-primary">intelligent systems</span> and optimizing <span className="font-medium text-primary">machine learning workflows</span>, with a focus on <span className="font-medium text-primary">computer vision</span>, <span className="font-medium text-primary">NLP</span>, and <span className="font-medium text-primary">AI-driven automation</span>.
              </p>
              <p className="text-gray-800 leading-relaxed">
                My passion for learning and commitment to personal growth continue to drive me as I approach graduation. I am particularly interested in leveraging <span className="font-medium text-primary">advanced AI techniques</span> to solve <span className="font-medium text-primary">complex business challenges</span>.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Education & Experience (Scrollable) */}
        <div className="w-full lg:w-1/2 p-8">
          <div className="space-y-16">
            {/* Education Section */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
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
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
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
        </div>
      </div>
    </section>
  )
}
