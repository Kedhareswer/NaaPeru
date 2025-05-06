'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter, useParams } from 'next/navigation'
import { caseStudies } from '@/components/case-studies'
import { GlossaryTooltip } from '@/components/ui/glossary-tooltip'
import Link from 'next/link'

export default function ProjectPage() {
  const router = useRouter()
  const params = useParams()
  const [project, setProject] = useState<typeof caseStudies[0] | null>(null)
  const [emailInsightLoaded, setEmailInsightLoaded] = useState(false)
  const [imageSketchLoaded, setImageSketchLoaded] = useState(false)

  useEffect(() => {
    if (params?.id) {
      const projectId = parseInt(params.id as string)
      // Get project from caseStudies or mnistProject
      const allProjects = [
        ...caseStudies,
        {
          title: "MNIST Digit Recognition Model",
          description: "An interactive platform for handwritten digit recognition using a convolutional neural network (CNN) trained on the MNIST dataset, achieving 98.7% accuracy on test data.",
          image: "/projects/digit-interface.jpeg",
          hoverImage: "/projects/digit-model-info (1).jpeg",
          link: "https://github.com/Kedhareswer/Digit_Classifier_DeepLearning",
          githubUrl: "https://github.com/Kedhareswer/Digit_Classifier_DeepLearning",
          startDate: "2024-03-15",
          technologies: ["PyTorch", "TensorFlow", "CNN", "Python", "NumPy"],
          tags: ["Deep Learning", "Computer Vision", "Neural Networks"],
          problemStatement: "Deep learning concepts are often abstract and difficult to grasp. This project demonstrates practical application through digit recognition.",
          approach: [
            "Implemented CNN architecture with TensorFlow",
            "Trained model on 60,000 MNIST examples",
            "Optimized model for web deployment",
            "Achieved 98.7% accuracy on test set"
          ],
          challenges: [
            "Balancing model size and accuracy",
            "Optimizing for web deployment",
            "Handling different writing styles",
            "Managing computational resources"
          ],
          solutions: [
            "Used model compression techniques",
            "Implemented efficient CNN architecture",
            "Applied data augmentation",
            "Optimized for browser execution"
          ],
          outcomes: [
            "98.7% accuracy on test dataset",
            "Optimized model size (~200 KB)",
            "Successful web integration",
            "Robust across different writing styles"
          ],
          impact: "Created an accessible platform for understanding neural networks through practical digit recognition, while maintaining high accuracy and efficient deployment.",
          featured: true,
          role: "ML Engineer",
          duration: "2 months"
        },
        {
          title: "Personal Portfolio Website",
          description: "A modern, responsive portfolio website showcasing my data science projects, skills, and professional journey. Built with Next.js and Tailwind CSS for optimal performance and user experience.",
          image: "/projects/portfolio-image.jpeg",
          hoverImage: "/projects/portfolio-hover.jpeg",
          link: "https://github.com/Kedhareswer/portfolio",
          githubUrl: "https://github.com/Kedhareswer/portfolio",
          startDate: "2024-03-01",
          technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "TypeScript", "Vercel"],
          tags: ["Web Development", "Portfolio", "Responsive Design"],
          problemStatement: "Create a professional online presence that effectively communicates my data science expertise, projects, and skills to potential employers and collaborators.",
          approach: [
            "Designed modern UI with Next.js and Tailwind CSS",
            "Implemented responsive layouts and animations",
            "Created dynamic project showcase components",
            "Optimized performance and accessibility"
          ],
          challenges: [
            "Ensuring cross-browser compatibility",
            "Optimizing performance with animations",
            "Managing complex state and routing",
            "Implementing responsive design patterns"
          ],
          solutions: [
            "Used CSS-in-JS for styling consistency",
            "Leveraged Framer Motion for smooth animations",
            "Implemented efficient state management",
            "Applied mobile-first design principles"
          ],
          outcomes: [
            "Developed a fully responsive, modern portfolio website",
            "Implemented smooth animations and transitions for enhanced UX",
            "Integrated dynamic project showcases with live demos"
          ],
          impact: "Created a professional portfolio that effectively showcases technical expertise and project work, leading to increased visibility and engagement with potential collaborators.",
          role: "Web Developer",
          duration: "1 month"
        }
      ]
      // Find and set the project based on projectId
      const foundProject = allProjects[projectId];
      if (foundProject) {
        setProject(foundProject);
      }
    }
  }, [params?.id])
  
  // Handle iframe loading timeouts
  useEffect(() => {
    if (project?.title === "EmailInsight Project") {
      // Set a timeout to check if the iframe has loaded
      const timer = setTimeout(() => {
        if (!emailInsightLoaded) {
          // If not loaded after timeout, show fallback
          const iframe = document.querySelector('iframe[title="EmailInsight Project"]') as HTMLIFrameElement;
          const fallback = iframe?.nextElementSibling as HTMLElement;
          
          if (iframe && fallback) {
            iframe.style.display = 'none';
            fallback.style.display = 'flex';
          }
        }
      }, 5000); // 5 second timeout
      
      return () => clearTimeout(timer);
    }
    
    if (project?.title === "Image to Sketch AI") {
      // Set a timeout to check if the iframe has loaded
      const timer = setTimeout(() => {
        if (!imageSketchLoaded) {
          // If not loaded after timeout, show fallback
          const iframe = document.querySelector('iframe[title="Image to Sketch Project"]') as HTMLIFrameElement;
          const fallback = iframe?.nextElementSibling as HTMLElement;
          
          if (iframe && fallback) {
            iframe.style.display = 'none';
            fallback.style.display = 'flex';
          }
        }
      }, 5000); // 5 second timeout
      
      return () => clearTimeout(timer);
    }
  }, [project, emailInsightLoaded, imageSketchLoaded])

  if (!project) {
    return null
  }

  // Redesigned layout and styling
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/#case-studies">
          <Button
            variant="ghost"
            className="mb-8 hover:bg-gray-200 text-sm font-medium tracking-wide transition-all duration-300 border border-transparent hover:border-gray-300 rounded-md"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </Link>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight leading-tight text-gray-800">{project.title}</h1>
            <div className="mb-10">
              <div className="mb-12">
                <h2 className="text-xl font-medium mb-4 tracking-tight text-gray-700">Overview</h2>
                <p className="text-gray-600 leading-relaxed max-w-2xl text-base">
                  {project.description} {project.problemStatement}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-b border-gray-300 py-8">
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-medium mb-3 text-gray-500">Year</h3>
                  <p className="text-gray-800 font-medium">{new Date(project.startDate).getFullYear()}</p>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-medium mb-3 text-gray-500">Role</h3>
                  <p className="text-gray-800 font-medium">{project.role || 'Lead Data Scientist'}</p>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-medium mb-3 text-gray-500">Client</h3>
                  <p className="text-gray-800 font-medium">Research Project</p>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-xs uppercase tracking-wider font-medium mb-3 text-gray-500">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags && project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs uppercase tracking-wider font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main featured image or embedded website */}
          <div className="aspect-[16/9] relative overflow-hidden rounded-md mb-20 bg-gray-200 shadow-lg">
            {project.title === "EmailInsight Project" ? (
              <>
                <iframe 
                  src="https://mail-classification-case-study-6izg753sg.vercel.app/"
                  title="EmailInsight Project"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="no-referrer"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  onLoad={() => setEmailInsightLoaded(true)}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const nextElementSibling = e.currentTarget.nextElementSibling as HTMLElement;
                    if (nextElementSibling) {
                      nextElementSibling.style.display = 'flex';
                    }
                  }}
                />
                <div className="hidden w-full h-full flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-lg font-medium mb-3">Unable to load the interactive demo</h3>
                  <p className="mb-4">The EmailInsight project demo is currently unavailable. Please visit the GitHub repository for more information.</p>
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      className="justify-center hover:bg-gray-200 transition-colors rounded-md border-gray-300"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      View on GitHub
                    </Button>
                  )}
                </div>
              </>
            ) : project.title === "Image to Sketch AI" ? (
              <>
                <iframe 
                  src="https://image-to-sketch-wine.vercel.app/"
                  title="Image to Sketch Project"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="no-referrer"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  onLoad={() => setImageSketchLoaded(true)}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const nextElementSibling = e.currentTarget.nextElementSibling as HTMLElement;
                    if (nextElementSibling) {
                      nextElementSibling.style.display = 'flex';
                      const projectImage = document.createElement('img');
                      projectImage.src = project.image;
                      projectImage.alt = project.title;
                      projectImage.className = 'max-w-md w-full object-contain mt-4';
                      nextElementSibling.appendChild(projectImage);
                    }
                  }}
                />
                <div className="hidden w-full h-full flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-lg font-medium mb-3">Unable to load the interactive demo</h3>
                  <p className="mb-4">The Image to Sketch AI project demo is currently unavailable. Please check back later or view the project image below.</p>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="max-w-md w-full object-contain mt-4"
                  />
                </div>
              </>
            ) : (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            )}
          </div>

          {/* Project details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative mb-20">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-xl font-medium mb-6 tracking-tight border-b border-gray-300 pb-3">Approach</h2>
                <ul className="list-disc list-outside ml-5 space-y-3 text-gray-600">
                  {project.approach.map((item, i) => (
                    <li key={i} className="leading-relaxed">
                      <GlossaryTooltip term="Methodology" definition="The systematic approach and techniques used to address the project's challenges.">
                        {item}
                      </GlossaryTooltip>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-medium mb-6 tracking-tight border-b border-gray-300 pb-3">Outcomes & Impact</h2>
                <ul className="list-disc list-outside ml-5 space-y-3 text-gray-600 mb-5">
                  {project.outcomes.map((outcome, i) => (
                    <li key={i}>{outcome}</li>
                  ))}
                </ul>
                <p className="text-gray-600">{project.impact}</p>
              </div>
            </div>

            <div className="space-y-12 lg:sticky lg:top-24 lg:self-start">
              <div>
                <h2 className="text-xl font-medium mb-6 tracking-tight border-b border-gray-300 pb-3">Technologies</h2>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs uppercase tracking-wider font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-medium mb-6 tracking-tight border-b border-gray-300 pb-3">Challenges & Solutions</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-3">Challenges</h3>
                    <ul className="list-disc list-outside ml-5 space-y-3 text-gray-600">
                      {project.challenges.map((challenge, i) => (
                        <li key={i}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-3">Solutions</h3>
                    <ul className="list-disc list-outside ml-5 space-y-3 text-gray-600">
                      {project.solutions.map((solution, i) => (
                        <li key={i}>{solution}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {(project.githubUrl || project.link) && (
                <div>
                  <h2 className="text-xl font-medium mb-6 tracking-tight border-b border-gray-300 pb-3">Links</h2>
                  <div className="flex flex-col gap-3">
                    {project.githubUrl && (
                      <Button
                        variant="outline"
                        className="w-full justify-start hover:bg-gray-200 transition-colors rounded-md border-gray-300"
                        onClick={() => window.open(project.githubUrl, '_blank')}
                      >
                        View on GitHub
                      </Button>
                    )}
                    {project.link && project.link !== '#' && (
                      <Button
                        className="w-full justify-start bg-black hover:bg-gray-800 text-white transition-colors rounded-md"
                        onClick={() => window.open(project.link, '_blank')}
                      >
                        Visit Project
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Gallery section */}
          <h2 className="text-xl font-medium mb-8 tracking-tight border-b border-gray-300 pb-3">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="aspect-square overflow-hidden rounded-md bg-gray-200 shadow-lg group">
              <img 
                src={project.hoverImage || project.image} 
                alt="Project gallery 1" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[30%] hover:grayscale-0"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-md bg-gray-200 shadow-lg group">
              <img 
                src={project.image} 
                alt="Project gallery 2" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[30%] hover:grayscale-0"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-md bg-gray-200 shadow-lg group">
              <img 
                src={project.hoverImage || project.image} 
                alt="Project gallery 3" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[30%] hover:grayscale-0"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}