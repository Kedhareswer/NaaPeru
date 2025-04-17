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
    link: "#",
    startDate: "2025-01-15",
    technologies: ["PyTorch", "Flask", "OpenCV", "NumPy", "JavaScript", "Bootstrap 5", "WebRTC", "HTML5"],
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
    title: "Video Game Industry Analysis",
    description: "A comprehensive analysis of video game sales data to understand market trends, genre preferences, and publisher performance across different regions.",
    image: "/projects/analytics-dashboard.svg",
    link: "https://www.canva.com/design/DAFzfYIR8aU/HsNpIG8kX42bYTjky17DGQ/view",
    startDate: "2024-02-01",
    technologies: ["Python", "Pandas", "Tableau", "Statistical Analysis", "Data Visualization"],
    tags: ["EDA", "Data Analysis", "Data Visualization", "Tableau"],
    problemStatement: "To analyze video game sales data to understand genre preferences, regional trends, and publisher dominance in the gaming industry, and provide recommendations for companies and regions to enhance their market presence and performance.",
    approach: [
      "Collected and preprocessed comprehensive video game sales data",
      "Performed exploratory data analysis using Python and Pandas",
      "Created interactive visualizations using Tableau",
      "Conducted statistical analysis of market trends",
      "Generated actionable insights for stakeholders"
    ],
    challenges: [
      "Handling large-scale historical sales data",
      "Normalizing data from multiple sources",
      "Identifying meaningful patterns in complex market dynamics",
      "Creating clear visualizations for diverse stakeholders"
    ],
    solutions: [
      "Implemented efficient data processing pipelines",
      "Developed standardized data cleaning procedures",
      "Created custom visualization templates",
      "Designed interactive dashboards for easy exploration"
    ],
    outcomes: [
      "Identified key growth opportunities in emerging markets",
      "Mapped successful genre-region combinations",
      "Provided actionable recommendations for publishers",
      "Created reusable analysis framework for future studies"
    ],
    impact: "The analysis provided valuable insights for game publishers and developers, helping them make data-driven decisions about market entry, genre focus, and regional strategy.",
    role: "Data Analyst",
    duration: "1 month",
    featured: true
  },
  {
    title: "Video Game Impact Analysis",
    description: "A comprehensive research project analyzing the relationship between video games and player behavior, focusing on debunking misconceptions and highlighting positive impacts.",
    image: "/projects/analytics-dashboard.svg",
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
    image: "/projects/image-to-sketch.png",
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

  return (
    <section id="case-studies" className="min-h-screen bg-white py-20" ref={studiesRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-4">Featured Work</h2>
          <div className="w-20 h-1 bg-black mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            A collection of innovative solutions and impactful projects.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* First row with 2 larger featured projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.slice(0, 2).map((study, index) => (
              <Link href={`/project/${index}`} key={index} className="group relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer h-[400px] md:h-[500px]">
                <motion.div
                  className="relative h-full w-full"
                  onMouseEnter={() => setHoveredStudy(study)}
                  onMouseLeave={() => setHoveredStudy(null)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={study.image}
                    alt={study.title}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110 p-4"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gray-900 origin-right"
                    initial="closed"
                    whileInView="open"
                    viewport={{ once: true }}
                    variants={shutterVariants}
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
              <Link href={`/project/${index + 2}`} key={index} className="group relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer h-[300px]">
                <motion.div
                  className="relative h-full w-full"
                  onMouseEnter={() => setHoveredStudy(study)}
                  onMouseLeave={() => setHoveredStudy(null)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={study.image}
                    alt={study.title}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110 p-4"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gray-900 origin-right"
                    initial="closed"
                    whileInView="open"
                    viewport={{ once: true }}
                    variants={shutterVariants}
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
      </div>
    </section>
  )
}