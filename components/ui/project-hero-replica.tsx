import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

type ProjectHeroReplicaProps = {
  title: string;
  description: string;
  category: string;
  technologies: string[];
  githubUrl?: string;
  kaggleUrl?: string;
  demoUrl?: string;
  imageUrl: string;
};

export function ProjectHeroReplica({
  title,
  description,
  category,
  technologies,
  githubUrl,
  kaggleUrl,
  demoUrl,
  imageUrl,
}: ProjectHeroReplicaProps) {
  // Split description into two columns
  const [firstPara, secondPara] = splitDescription(description);
  const techText = technologies.join(" | ");

  return (
    <div className="min-h-screen bg-[#f9f9f9] font-sans">
      {/* Header */}
      <header className="container mx-auto px-6 pt-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <motion.span 
              className="text-red-500 text-2xl"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            >
              ✱
            </motion.span>
            <div className="text-sm">
              <span className="text-red-500 font-bold">{category}</span>
              <span className="text-gray-500 ml-1">category</span>
            </div>
          </div>
          <div className="w-8"></div> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative mt-8">
        {/* Curved Image Container */}
        <div className="relative h-[60vh] w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          
          {/* Social Icons */}
          <div className="absolute top-6 right-6 flex gap-3 z-10">
            {githubUrl && (
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/90 backdrop-blur-sm p-2 rounded-md shadow-md hover:bg-white transition-colors"
              >
                <img 
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" 
                  alt="GitHub" 
                  width={20} 
                  height={20} 
                />
              </a>
            )}
            {kaggleUrl && (
              <a 
                href={kaggleUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/90 backdrop-blur-sm p-2 rounded-md shadow-md hover:bg-white transition-colors"
              >
                <img 
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kaggle/kaggle-original.svg" 
                  alt="Kaggle" 
                  width={20} 
                  height={20} 
                />
              </a>
            )}
            {demoUrl && (
              <a 
                href={demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/90 backdrop-blur-sm p-2 rounded-md shadow-md hover:bg-white transition-colors"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </a>
            )}
          </div>
          
          {/* Details Text */}
          <div className="absolute bottom-10 right-10 text-right">
            <motion.div 
              className="text-5xl font-bold text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              DETAILS
            </motion.div>
          </div>
        </div>

        {/* Curved Bottom Edge */}
        <div className="relative -mt-1">
          <svg viewBox="0 0 1440 68" fill="none" className="w-full h-auto">
            <path 
              d="M0 0H1440V68C1440 68 1180 0 720 0C260 0 0 68 0 68V0Z" 
              fill="#f9f9f9"
            />
          </svg>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="md:col-span-2">
            <motion.h1 
              className="text-5xl font-bold text-gray-900 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {title}
            </motion.h1>
            
            <div className="grid md:grid-cols-2 gap-8 text-gray-700">
              <motion.p 
                className="leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {firstPara}
              </motion.p>
              <motion.p 
                className="leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {secondPara}
              </motion.p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <motion.div 
              className="sticky top-8 space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div>
                <h3 className="text-2xl font-bold text-red-500 mb-2">{category.toUpperCase()}</h3>
                <p className="text-gray-500 text-sm">Category</p>
              </div>
              
              <div>
                <p className="text-gray-800 font-medium">{techText}</p>
                <p className="text-gray-500 text-sm">Stack</p>
              </div>
              
              <div>
                <a 
                  href={demoUrl || githubUrl || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  {demoUrl ? 'View Live Demo' : 'View on GitHub'}
                  <ArrowRight size={18} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to split description into two columns
function splitDescription(text: string): [string, string] {
  if (!text) return ['', ''];
  
  const sentences = text.split(/(?<=[.!?])\s+/);
  const mid = Math.ceil(sentences.length / 2);
  
  return [
    sentences.slice(0, mid).join(' '),
    sentences.slice(mid).join(' ')
  ];
}
