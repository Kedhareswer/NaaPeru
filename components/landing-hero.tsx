"use client"

import { LayoutGroup, motion } from "framer-motion"
import Floating, { FloatingElement } from "@/components/ui/parallax-floating"

const exampleImages = [
  {
    url: "https://images.unsplash.com/photo-1727341554370-80e0fe9ad082?q=80&w=2276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Branislav Rodman",
    title: "A Black and White Photo of a Woman Brushing Her Teeth",
  },
  {
    url: "https://images.unsplash.com/photo-1640680608781-2e4199dd1579?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/a-painting-of-a-palm-leaf-on-a-multicolored-background-AaNPwrSNOFE",
    title: "Neon Palm",
    author: "Tim Mossholder",
  },
  {
    url: "https://images.unsplash.com/photo-1726083085160-feeb4e1e5b00?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/a-blurry-photo-of-a-crowd-of-people-UgbxzloNGsc",
    author: "ANDRII SOLOK",
    title: "A blurry photo of a crowd of people",
  },
  {
    url: "https://images.unsplash.com/photo-1562016600-ece13e8ba570?q=80&w=2838&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/rippling-crystal-blue-water-9-OCsKoyQlk",
    author: "Wesley Tingey",
    title: "Rippling Crystal Blue Water",
  },
  {
    url: "https://images.unsplash.com/photo-1624344965199-ed40391d20f2?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/de/fotos/mann-im-schwarzen-hemd-unter-blauem-himmel-m8RDNiuEXro",
    author: "Serhii Tyaglovsky",
    title: "Mann im schwarzen Hemd unter blauem Himmel",
  },
  {
    url: "https://images.unsplash.com/photo-1689553079282-45df1b35741b?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/a-woman-with-a-flower-crown-on-her-head-0S3muIttbsY",
    author: "Vladimir Yelizarov",
    title: "A women with a flower crown on her head",
  },
  {
    url: "https://images.unsplash.com/photo-1721968317938-cf8c60fccd1a?q=80&w=2728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "A blurry photo of white flowers in a field",
    author: "Eugene Golovesov",
    link: "https://unsplash.com/photos/a-blurry-photo-of-white-flowers-in-a-field-6qbx0lzGPyc",
  },
  {
    url: "https://images.unsplash.com/photo-1677338354108-223e807fb1bd?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Mathilde Langevin",
    link: "https://unsplash.com/photos/a-table-topped-with-two-wine-glasses-and-plates-Ig0gRAHspV0",
    title: "A table topped with two wine glasses and plates",
  },
]

type Profile = {
  personalInfo?: { name?: string; title?: string }
  hobbies?: { name: string }[]
  currentFocus?: string[]
  summary?: string
}

type LandingHeroProps = {
  profile?: Profile
}

function LandingHero({ profile }: LandingHeroProps) {
  const fullName = profile?.personalInfo?.name || "Friend"
  const firstName = fullName.split(" ")[0]
  const title = profile?.personalInfo?.title
  const focus = (profile?.currentFocus && profile.currentFocus[1]) ||
    "building innovative AI solutions"
  const hobbies = (profile?.hobbies || []).map(h => h.name)
  const topHobbies = hobbies.slice(0, 3)

  return (
    <section className="w-full h-screen overflow-hidden md:overflow-visible flex flex-col items-center justify-center relative">
      <Floating sensitivity={-0.5} className="h-full">
        <FloatingElement
          depth={0.5}
          className="top-[15%] left-[2%] md:top-[25%] md:left-[5%]"
        >
          <motion.img
            src={exampleImages[0].url}
            alt={exampleImages[0].title}
            className="w-16 h-12 sm:w-24 sm:h-16 md:w-28 md:h-20 lg:w-32 lg:h-24 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-[3deg] shadow-2xl rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          />
        </FloatingElement>

        <FloatingElement
          depth={1}
          className="top-[0%] left-[8%] md:top-[6%] md:left-[11%]"
        >
          <motion.img
            src={exampleImages[1].url}
            alt={exampleImages[1].title}
            className="w-40 h-28 sm:w-48 sm:h-36 md:w-56 md:h-44 lg:w-60 lg:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-12 shadow-2xl rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          />
        </FloatingElement>

        <FloatingElement
          depth={4}
          className="top-[90%] left-[6%] md:top-[80%] md:left-[8%]"
        >
          <motion.img
            src={exampleImages[2].url}
            alt={exampleImages[2].title}
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-64 lg:h-64 object-cover -rotate-[4deg] hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          />
        </FloatingElement>

        <FloatingElement
          depth={2}
          className="top-[0%] left-[87%] md:top-[2%] md:left-[83%]"
        >
          <motion.img
            src={exampleImages[3].url}
            alt={exampleImages[3].title}
            className="w-40 h-36 sm:w-48 sm:h-44 md:w-60 md:h-52 lg:w-64 lg:h-56 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[6deg] rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          />
        </FloatingElement>

        <FloatingElement
          depth={1}
          className="top-[78%] left-[83%] md:top-[68%] md:left-[83%]"
        >
          <motion.img
            src={exampleImages[4].url}
            alt={exampleImages[4].title}
            className="w-44 h-44 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[19deg] rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          />
        </FloatingElement>
      </Floating>

      <div className="flex flex-col justify-center items-center w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] z-50 pointer-events-auto">
        <LayoutGroup>
          <motion.div
            className="space-y-4 md:space-y-6 lg:space-y-8"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.3 }}
          >
            {/* Line 1 - Animated greeting */}
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-zinc-500 font-serif"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Hey there, I'm
              <motion.span 
                className="mx-2 text-zinc-900 font-semibold cursor-pointer"
                whileHover={{ 
                  scale: 1.05,
                  color: "#3b82f6",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {firstName}
              </motion.span>
              <motion.span 
                className="ml-1"
                animate={{ 
                  rotate: [0, 20, -20, 0],
                  transition: { 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }
                }}
              >
                👋
              </motion.span>
              {title && (
                <>
                  <span className="ml-3">—</span>
                  <motion.span 
                    className="ml-3 text-zinc-900 font-semibold cursor-pointer"
                    whileHover={{ 
                      scale: 1.02,
                      color: "#059669",
                      transition: { duration: 0.2 }
                    }}
                  >
                    {title}
                  </motion.span>
                </>
              )}
            </motion.p>

            {/* Line 2 - Building things */}
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-zinc-500 font-serif"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              I love
              <motion.span 
                className="mx-2 text-zinc-900 font-semibold cursor-pointer"
                whileHover={{ 
                  scale: 1.05,
                  color: "#dc2626",
                  transition: { duration: 0.2 }
                }}
              >
                building
              </motion.span>
              things that make a difference, currently focused on
              <motion.span 
                className="mx-2 text-zinc-900 font-semibold cursor-pointer"
                whileHover={{ 
                  scale: 1.02,
                  color: "#7c3aed",
                  transition: { duration: 0.2 }
                }}
              >
                {focus}
              </motion.span>
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                  transition: { 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 4
                  }
                }}
              >
                ✨
              </motion.span>
            </motion.p>

            {/* Line 3 - Hobbies */}
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-zinc-500 font-serif"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              When I'm not coding, you'll find me
              {topHobbies.length > 0 && topHobbies.map((hobby, i) => (
                <motion.span 
                  key={hobby}
                  className="mx-1 text-zinc-900 font-semibold cursor-pointer"
                  whileHover={{ 
                    scale: 1.05,
                    color: "#ea580c",
                    transition: { duration: 0.2 }
                  }}
                >
                  {hobby.toLowerCase()}
                  {i < topHobbies.length - 1 ? 
                    (i === topHobbies.length - 2 ? " or " : ", ") : ""}
                </motion.span>
              ))}
              <motion.span
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  transition: { 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 5
                  }
                }}
              >
                🎮
              </motion.span>
            </motion.p>

            {/* Line 4 - Digital garden */}
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-zinc-500 font-serif"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              Welcome to my
              <motion.span 
                className="mx-2 underline decoration-dotted decoration-zinc-400 cursor-pointer"
                whileHover={{ 
                  scale: 1.05,
                  color: "#16a34a",
                  textDecorationColor: "#16a34a",
                  transition: { duration: 0.2 }
                }}
              >
                digital garden
              </motion.span>
              <motion.span 
                className="ml-1"
                animate={{ 
                  y: [0, -5, 0],
                  transition: { 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }
                }}
              >
                🌱
              </motion.span>
              — a place to learn, experiment, and grow together.
            </motion.p>

            {/* Line 5 - Glassmorphism Social Icons */}
            <motion.div 
              className="flex items-center justify-center gap-6 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              {/* Mail Icon */}
              <motion.a
                href="mailto:your@email.com"
                aria-label="Email"
                className="group relative w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md backdrop-saturate-[180%] border border-white/80 shadow-[0_8px_32px_rgba(31,38,135,0.2)] hover:shadow-[0_12px_48px_rgba(31,38,135,0.3)] transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
              >
                {/* Liquid shine effect */}
                <div className="absolute inset-0 rounded-2xl bg-white/10 shadow-[inset_-10px_-8px_0px_-11px_rgba(255,255,255,1),inset_0px_-9px_0px_-8px_rgba(255,255,255,1)] opacity-60 pointer-events-none" />
                
                {/* Icon */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-zinc-700 group-hover:text-blue-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </motion.a>

              {/* GitHub Icon */}
              <motion.a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group relative w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md backdrop-saturate-[180%] border border-white/80 shadow-[0_8px_32px_rgba(31,38,135,0.2)] hover:shadow-[0_12px_48px_rgba(31,38,135,0.3)] transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                {/* Liquid shine effect */}
                <div className="absolute inset-0 rounded-2xl bg-white/10 shadow-[inset_-10px_-8px_0px_-11px_rgba(255,255,255,1),inset_0px_-9px_0px_-8px_rgba(255,255,255,1)] opacity-60 pointer-events-none" />
                
                {/* Icon */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-zinc-700 group-hover:text-black transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </div>
              </motion.a>

              {/* LinkedIn Icon */}
              <motion.a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group relative w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md backdrop-saturate-[180%] border border-white/80 shadow-[0_8px_32px_rgba(31,38,135,0.2)] hover:shadow-[0_12px_48px_rgba(31,38,135,0.3)] transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                {/* Liquid shine effect */}
                <div className="absolute inset-0 rounded-2xl bg-white/10 shadow-[inset_-10px_-8px_0px_-11px_rgba(255,255,255,1),inset_0px_-9px_0px_-8px_rgba(255,255,255,1)] opacity-60 pointer-events-none" />
                
                {/* Icon */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-zinc-700 group-hover:text-[#0077b5] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
              </motion.a>

              {/* Kaggle Icon */}
              <motion.a
                href="https://kaggle.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kaggle"
                className="group relative w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md backdrop-saturate-[180%] border border-white/80 shadow-[0_8px_32px_rgba(31,38,135,0.2)] hover:shadow-[0_12px_48px_rgba(31,38,135,0.3)] transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
              >
                {/* Liquid shine effect */}
                <div className="absolute inset-0 rounded-2xl bg-white/10 shadow-[inset_-10px_-8px_0px_-11px_rgba(255,255,255,1),inset_0px_-9px_0px_-8px_rgba(255,255,255,1)] opacity-60 pointer-events-none" />
                
                {/* Icon */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-zinc-700 group-hover:text-[#20beff] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.248.495-.248h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.358"/>
                  </svg>
                </div>
              </motion.a>
            </motion.div>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  )
}

export { LandingHero }
