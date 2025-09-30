"use client"

import { LayoutGroup, motion } from "framer-motion"
import Floating, { FloatingElement } from "@/components/ui/parallax-floating"
import { ExpandableSocials } from "@/components/expandable-socials"

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
  personalInfo?: {
    name?: string
    title?: string
    email?: string
    github?: string
    linkedin?: string
    kaggle?: string
  }
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

            {/* Line 5 - Expandable Social Icons */}
            <div className="mt-12">
              <ExpandableSocials
                email={profile?.personalInfo?.email}
                github={profile?.personalInfo?.github}
                linkedin={profile?.personalInfo?.linkedin}
                kaggle={profile?.personalInfo?.kaggle}
              />
            </div>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  )
}

export { LandingHero }
