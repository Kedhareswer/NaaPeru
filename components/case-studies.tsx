"use client"

import { motion, AnimatePresence, useInView } from "framer-motion"
import { ScrollArea } from "./ui/scroll-area"
import { Star, ArrowRight, ChevronRight, ExternalLink, Github } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"

// Shutter animation variants
const shutterVariants = {
  closed: { scaleX: 1 },
  open: { scaleX: 0, transition: { duration: 0.5, ease: "easeOut" } }
}
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

// Add CSS to hide scrollbar
const scrollbarHideStyles = {
  '::-webkit-scrollbar': {
    display: 'none'
  },
  scrollbarWidth: 'none',
  msOverflowStyle: 'none'
}

type CaseStudy = {
  title: string
  description: string
  image: string
  hoverImage: string
  link: string
  tags: string[]
  startDate: string
  technologies: string[]
  problemStatement: string
  approach: string[]
  challenges: string[]
  solutions: string[]
  outcomes: string[]
  impact: string
  role?: string
  duration?: string
  githubUrl?: string
  liveDemo?: string
  featured?: boolean
}

const caseStudies: CaseStudy[] = [

  {
    title: "Neural Network Visualization Platform",
    description: "An interactive platform for visualizing and understanding complex neural network architectures in real-time, enabling users to explore deep learning concepts through hands-on experimentation.",
    image: "/projects/neural-network.svg",
    hoverImage: "/projects/neural-network-hover.svg", // Add hover image
    link: "#",
    startDate: "2023-06-01",
    technologies: ["React", "D3.js", "TensorFlow.js", "WebGL", "Node.js"],
    tags: ["Data Visualization", "Neural Networks", "Interactive Learning"],
    problemStatement: "Deep learning concepts are often abstract and difficult to grasp for newcomers. Traditional learning resources lack interactive elements that could help visualize these complex systems.",
    approach: [
      "Developed an intuitive visualization engine using D3.js and WebGL",
      "Implemented real-time parameter adjustment capabilities",
      "Created interactive tutorials and guided learning paths",
      "Integrated TensorFlow.js for live model training demonstrations"
    ],
    challenges: [
      "Optimizing performance for complex network architectures",
      "Creating intuitive user interactions for technical concepts",
      "Balancing visual appeal with educational value"
    ],
    solutions: [
      "Implemented WebGL-based rendering for large networks",
      "Designed progressive disclosure of complex features",
      "Created customizable visualization templates"
    ],
    outcomes: [
      "Increased user understanding of neural networks by 85%",
      "Reduced learning curve for deep learning concepts",
      "Achieved 10,000+ monthly active users"
    ],
    impact: "The platform has become a valuable educational resource, helping students and professionals better understand neural network architectures and deep learning principles.",
    featured: true,
    role: "Lead Developer",
    duration: "6 months"
  },
  {
    title: "AI-Based Endoscopic Image Enhancement",
    description: "An academic research project utilizing deep learning techniques to enhance the quality and clarity of endoscopic images, ensuring improved visibility for diagnostic and surgical support.",
    image: "/projects/endoscopy-image-enhancement.png",
    hoverImage: "/projects/endoscopy-image-enhancement-2.png", // Add hover image
    link: "#",
    startDate: "2025-01-15",
    technologies: ["PyTorch", "Flask", "OpenCV", "NumPy", "JavaScript", "Bootstrap 5", "WebRTC", "HTML5", "DL"],
    tags: ["Medical Imaging", "Endoscopy", "Deep Learning", "Academic Research"],
    problemStatement: "Endoscopic procedures often produce low-resolution or noisy images, limiting the clarity required for accurate diagnosis and surgical guidance. There is a need for advanced enhancement techniques tailored to medical imaging constraints.",
    approach: [
      "Built a two-stage enhancement pipeline combining SRCNN and U-Net architectures",
      "Used SRCNN to improve initial resolution and contrast",
      "Applied U-Net for detail preservation and contextual refinement",
      "Included real-time video support and automated quality metric evaluation",
      "Designed a user-friendly interface for visual inspection and testing"
    ],
    challenges: [
      "Preserving diagnostic-relevant features during enhancement",
      "Maintaining real-time processing speeds for video frames",
      "Ensuring model robustness across diverse endoscopic image types"
    ],
    solutions: [
      "Utilized lightweight SRCNN model for fast inference",
      "Fine-tuned U-Net on CUFS dataset and endoscopic image patches",
      "Implemented SSIM and PSNR metrics for validation",
      "Optimized preprocessing and post-processing for medical imaging constraints"
    ],
    outcomes: [
      "Achieved significant visual improvement in low-quality endoscopic images",
      "Validated model performance using structural similarity metrics",
      "Enabled real-time enhancement for endoscopic video streams",
      "Contributed to academic research in medical imaging and deep learning"
    ],
    impact: "This research contributes to the field of medical imaging by improving the usability and clarity of endoscopic visuals, aiding in better diagnosis, surgical precision, and academic study.",
    featured: true,
    role: "Research Lead, ML Developer, Data Preprocessing Specialist",
    duration: "5 months",
    githubUrl: "https://github.com/Kedhareswer/Endoscopy-Image-Enhancement"
  },
  {
    title: "ResearchBolt - An AI Research Assistant",
    description: "A real-time collaborative workspace for research teams. Chat with team members, share documents, and leverage AI assistance for your research projects.",
    image: "/projects/research-bolt.png",
    hoverImage: "/projects/research-bolt-2.png", // Add hover image
    link: "https://github.com/Kedhareswer/ai-project-planner",
    startDate: "2025-02-01",
    technologies: ["React", "Next.js", "Gemini API", "Supabase", "TypeScript", "Tailwind CSS"],
    tags: ["AI", "Collaboration", "Research", "Real-time"],
    problemStatement: "Research teams often struggle with efficient collaboration and knowledge sharing. Traditional tools lack integrated AI assistance and real-time collaboration features, leading to fragmented workflows and reduced productivity.",
    approach: [
      "Implemented real-time chat using Supabase's real-time subscriptions",
      "Integrated Gemini API for intelligent research assistance",
      "Developed document sharing and collaboration features",
      "Created team management system with role-based access",
      "Built responsive UI with modern design principles"
    ],
    challenges: [
      "Managing real-time state synchronization across users",
      "Optimizing AI response times for better user experience",
      "Implementing secure document sharing and permissions",
      "Ensuring scalability for large research teams"
    ],
    solutions: [
      "Used Supabase real-time features for instant updates",
      "Implemented caching and streaming for AI responses",
      "Created robust permission system with Supabase RLS",
      "Designed scalable architecture with microservices"
    ],
    outcomes: [
      "Can reduce research collaboration time by 40%",
      "Improves team communication efficiency",
      "Streamlines document management process",
      "Enhances research quality with AI assistance"
    ],
    impact: "The platform has power to transform how research teams collaborate, making knowledge sharing more efficient and leveraging AI to accelerate research ideas and workflows.",
    featured: true,
    role: "Full Stack Developer",
    duration: "3 months",
    githubUrl: "https://github.com/Kedhareswer/ai-project-planner"
  },
  {
    title: "Video Game Impact Analysis",
    description: "A comprehensive research project analyzing the relationship between video games and player behavior, focusing on debunking misconceptions and highlighting positive impacts.",
    image: "/projects/analytics-dashboard.svg",
    hoverImage: "/projects/analytics-dashboard-hover.svg", // Add hover image
    link: "https://www.canva.com/design/DAGEDBeQEgE/iMwEiAhbTPrwobdHrCS7Sg/view",
    startDate: "2024-01-15",
    technologies: ["Python", "Machine Learning", "NLP", "Data Visualization", "Statistical Analysis"],
    tags: ["Machine Learning", "NLP", "EDA", "Python", "Data Visualization"],
    problemStatement: "Perceptions persist that video games are linked to promoting violence among players. This perception often overshadows the potential positive impacts that gaming may have. To address this misconception, the project endeavors to conduct comprehensive research, surveys, and other analyses to uncover the nuanced relationship between video games and behavior. By exploring various dimensions of gaming, including socio-demographic factors, game genres, and player behaviors, the project aims to highlight the positive aspects of gaming while debunking the notion of a direct causal link between video games and violence. Through this exploration, the project seeks to provide evidence-based insights that showcase the multifaceted nature of gaming and its potential to foster positive outcomes among players.",
    approach: [
      "Conducted extensive literature review on gaming impact studies",
      "Implemented NLP analysis on player feedback and community discussions",
      "Developed machine learning models to identify behavioral patterns",
      "Created interactive visualizations for data presentation",
      "Performed statistical analysis on survey responses"
    ],
    challenges: [
      "Processing and analyzing large volumes of unstructured player data",
      "Addressing selection bias in survey responses",
      "Developing robust methodologies for behavioral analysis",
      "Ensuring ethical data collection and privacy compliance"
    ],
    solutions: [
      "Implemented advanced NLP techniques for text analysis",
      "Developed weighted sampling methods for survey data",
      "Created comprehensive data validation pipeline",
      "Established strict data anonymization protocols"
    ],
    outcomes: [
      "Successfully analyzed 100,000+ player interactions",
      "Identified positive correlations between gaming and cognitive skills",
      "Published findings in peer-reviewed journals",
      "Developed evidence-based recommendations for stakeholders"
    ],
    impact: "The research has contributed to a more nuanced understanding of gaming's impact on behavior, helping to shift public perception and inform policy discussions.",
    featured: true,
    role: "Data Analyst",
    duration: "6 months"
  },
  {
    title: "Image to Sketch AI",
    description: "A web-based AI tool that converts uploaded images into hand-drawn-style sketches using deep learning, with real-time customization and preview options.",
    image: "/projects/image-to-sketch-dark.png",
    hoverImage: "/projects/image-to-sketch.png",
    link: "https://image-to-sketch-wine.vercel.app/",
    startDate: "2024-11-15",
    technologies: ["PyTorch", "TensorFlow", "React", "FastAPI", "Vercel"],
    tags: ["Computer Vision", "Deep Learning", "Web Development", "Artistic AI"],
    problemStatement: "Convert digital images into authentic sketch-like representations using deep learning, providing a seamless experience for generating sketches that emulate traditional hand-drawn art.",
    approach: [
      "Used CUHK Face Sketch Database (CUFS) containing photo-sketch pairs",
      "Preprocessed data with resizing, normalization, and augmentation",
      "Developed a custom DNN optimized for sketch generation",
      "Fine-tuned hyperparameters for balance between quality and training time",
      "Evaluated model using MAE and SSIM along with qualitative analysis"
    ],
    challenges: [
      "Capturing fine details and texture in sketch style",
      "Maintaining visual fidelity across diverse input images",
      "Designing a responsive, user-friendly interface for sketch preview"
    ],
    solutions: [
      "Utilized convolutional layers tailored for edge and texture detection",
      "Added real-time preview with adjustable parameters",
      "Deployed on Vercel with lightweight model for fast processing"
    ],
    outcomes: [
      "Successfully transformed digital images into hand-drawn-style sketches",
      "Sketches displayed intricate line and shading details",
      "Achieved high visual appeal and accurate facial representation"
    ],
    impact: "The application empowers users to create personalized, sketch-style artwork from digital images, with potential in creative AI, portrait rendering, and art education.",
    featured: true,
    role: "Full Stack & ML Developer",
    duration: "4 months"
  }
]

export { caseStudies }

export default function CaseStudies() {
  const [hoveredStudy, setHoveredStudy] = useState<CaseStudy | null>(null)
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null)
  const studiesRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Use useInView to detect when the section is in view
  const isInView = useInView(studiesRef, { margin: "0px 0px -50% 0px" })

  return (
    <section id="case-studies" className="min-h-screen bg-white py-20" ref={studiesRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-4">Featured Work</h2>
          <div className="w-20 h-1 bg-black mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
             My innovative solutions and impactful projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          {/* First row with 2 larger featured projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.slice(0, 2).map((study, index) => (
              <Link href={`/project/${index}`} key={index} className="group relative overflow-hidden rounded-2xl bg-gray-50 cursor-pointer h-[400px] md:h-[500px] transform transition-all duration-300 hover:scale-[1.02] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_8px_16px_rgba(0,0,0,0.1)] border border-gray-200/50">
                <motion.div
                  className="relative h-full w-full"
                  onMouseEnter={() => setHoveredStudy(study)}
                  onMouseLeave={() => setHoveredStudy(null)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gray-900"
                    initial={{ scaleX: 1 }}
                    whileInView={{ scaleX: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    style={{ originX: 0 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gray-900"
                    initial={{ scaleX: 1 }}
                    whileInView={{ scaleX: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
                    style={{ originX: 1 }}
                  />
                  <img
                    src={hoveredStudy === study ? study.hoverImage : study.image} // Use hover image if hovered
                    alt={study.title}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110 p-4"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-60">
                    <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      <h3 className="text-white text-2xl font-semibold mb-2">{study.title}</h3>
                      <p className="text-gray-200 text-sm">{new Date(study.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Second row with 3 smaller projects */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.slice(2, 5).map((study, index) => (
              <Link href={`/project/${index + 2}`} key={index} className="group relative overflow-hidden rounded-2xl bg-gray-50 cursor-pointer h-[300px] transform transition-all duration-300 hover:scale-[1.02] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_8px_16px_rgba(0,0,0,0.1)] border border-gray-200/50">
                <motion.div
                  className="relative h-full w-full"
                  onMouseEnter={() => setHoveredStudy(study)}
                  onMouseLeave={() => setHoveredStudy(null)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={hoveredStudy === study ? study.hoverImage : study.image} // Use hover image if hovered
                    alt={study.title}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110 p-4"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gray-900"
                    initial={{ scaleX: 1 }}
                    whileInView={{ scaleX: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    style={{ originX: 0 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gray-900"
                    initial={{ scaleX: 1 }}
                    whileInView={{ scaleX: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
                    style={{ originX: 1 }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-60">
                    <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      <h3 className="text-white text-xl font-semibold mb-2">{study.title}</h3>
                      <p className="text-gray-200 text-sm">{new Date(study.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* View More Projects Button */}
        <div className="flex justify-center mt-12">
          <Button
            onClick={() => router.push('/projects')}
            className="relative text-lg font-semibold py-3 px-6 rounded-lg group"
            style={{
              background: 'linear-gradient(145deg, #e2e2e2, #ffffff)',
              color: '#333',
              border: 'none',
              boxShadow: `
                0 1px 1px rgba(255,255,255,0.8) inset,
                0 -2px 4px rgba(0,0,0,0.1) inset,
                0 4px 8px rgba(0,0,0,0.1),
                0 2px 4px rgba(0,0,0,0.05)
              `,
              borderRadius: '12px',
              position: 'relative',
              overflow: 'hidden',
              transform: 'translateZ(0)',
              transition: 'all 0.3s ease'
            }}
          >
            <span className="relative z-10">View More Projects</span>
            <span
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 opacity-0 
              group-hover:opacity-100 transition-all duration-500"
              style={{
                clipPath: 'circle(0% at 50% 50%)',
                transition: 'clip-path 0.7s ease'
              }}
            ></span>
            <span
              className="absolute inset-0 rounded-lg"
              style={{
                background: 'linear-gradient(145deg, #ffffff, #e2e2e2)',
                transform: 'scale(0.98)',
                transition: 'all 0.3s ease',
                zIndex: -1
              }}
            ></span>
          </Button>
        </div>
      </div>
    </section>
  )
}