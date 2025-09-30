"use client"

import { motion } from "framer-motion"
import { useState } from "react"

type SocialLink = {
  icon: React.ReactNode
  label: string
  href: string
}

type ExpandableSocialsProps = {
  email?: string
  github?: string
  linkedin?: string
  kaggle?: string
}

export function ExpandableSocials({ email, github, linkedin, kaggle }: ExpandableSocialsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const socials: SocialLink[] = [
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      label: "Reach out",
      href: `mailto:${email || "your@email.com"}`,
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      label: "Twitter (X)",
      href: github || "https://twitter.com",
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm3.833 6.667c-.092 0-.183.034-.253.1L12 14.347l-3.58-3.58a.357.357 0 0 0-.506.506l3.833 3.833a.357.357 0 0 0 .506 0l3.833-3.833a.357.357 0 0 0-.253-.606z" />
        </svg>
      ),
      label: "Threads",
      href: linkedin || "https://threads.net",
    },
  ]

  return (
    <motion.div
      className="relative flex items-center justify-center pb-12"
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      {/* Container that expands */}
      <motion.div
        className="relative flex items-center justify-center gap-6 px-8 py-5 bg-zinc-200/70 backdrop-blur-sm rounded-full shadow-md"
        animate={{
          width: isExpanded ? "auto" : "140px",
          paddingLeft: isExpanded ? "2rem" : "2rem",
          paddingRight: isExpanded ? "2rem" : "2rem",
        }}
        transition={{
          duration: 0.5,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        {/* Three dots (visible when collapsed) */}
        <motion.div
          className="absolute flex items-center justify-center gap-2.5"
          animate={{
            opacity: isExpanded ? 0 : 1,
            scale: isExpanded ? 0.5 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-zinc-500"
              animate={{
                scale: !isExpanded ? [1, 1.15, 1] : 0.5,
                opacity: !isExpanded ? [0.6, 1, 0.6] : 0,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>

        {/* Social icons (visible when expanded) */}
        <motion.div
          className="flex items-center gap-8"
          animate={{
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.3, delay: isExpanded ? 0.15 : 0 }}
        >
          {socials.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isExpanded ? 1 : 0,
                y: isExpanded ? 0 : 10,
                scale: isExpanded ? 1 : 0.8,
              }}
              transition={{
                duration: 0.3,
                delay: isExpanded ? 0.1 + index * 0.08 : 0,
              }}
            >
              {/* Icon circle */}
              <motion.div
                className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-zinc-800 shadow-sm transition-colors duration-300"
                whileHover={{
                  backgroundColor:
                    index === 0
                      ? "#3b82f6"
                      : index === 1
                        ? "#000000"
                        : "#000000",
                  color: "#ffffff",
                  scale: 1.08,
                }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
              </motion.div>

              {/* Label */}
              <motion.span
                className="text-xs font-medium text-zinc-800 whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isExpanded ? 1 : 0,
                }}
                transition={{ delay: isExpanded ? 0.35 + index * 0.08 : 0 }}
              >
                {social.label}
              </motion.span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom text - "All Right Reserved" */}
      <motion.div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap"
        animate={{
          opacity: isExpanded ? 1 : 0,
          y: isExpanded ? 0 : -8,
        }}
        transition={{ duration: 0.3, delay: isExpanded ? 0.5 : 0 }}
      >
        <p className="text-sm text-zinc-500 font-light">All Right Reserved</p>
      </motion.div>
    </motion.div>
  )
}
