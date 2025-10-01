"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { SocialTooltip, SocialItem } from "@/components/ui/social-media"

interface SocialHoverProps {
  email?: string
  github?: string
  linkedin?: string
  kaggle?: string
}

export function SocialHover({ email, github, linkedin, kaggle }: SocialHoverProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const defaults = {
    email: "kedhareswer.12110626@gmail.com",
    github: "https://github.com/Kedhareswer",
    linkedin: "https://www.linkedin.com/in/kedhareswernaidu/",
    kaggle: "https://www.kaggle.com/kedhareswernaidu",
  }

  const socialLinks: SocialItem[] = [
    {
      href: linkedin || defaults.linkedin,
      ariaLabel: "LinkedIn",
      tooltip: "LinkedIn",
      color: "#0077b5",
      svgUrl: "https://svgl.app/library/linkedin.svg",
    },
    {
      href: `mailto:${email || defaults.email}`,
      ariaLabel: "Email",
      tooltip: "Email",
      color: "#ea4335",
      svgUrl: "https://svgl.app/library/gmail.svg",
    },
    {
      href: github || defaults.github,
      ariaLabel: "GitHub",
      tooltip: "GitHub",
      color: "#000000",
      svgUrl: "https://svgl.app/library/github.svg",
    },
    {
      href: kaggle || defaults.kaggle,
      ariaLabel: "Kaggle",
      tooltip: "Kaggle",
      color: "#20beff",
      svgUrl: "https://svgl.app/library/kaggle.svg",
    },
  ]

  return (
    <motion.div
      className="relative flex items-center justify-center pb-6"
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      {/* Container that expands */}
      <motion.div
        className="relative flex items-center justify-center gap-3 px-4 py-2 bg-zinc-200/60 backdrop-blur-sm rounded-full shadow-sm"
        animate={{
          width: isExpanded ? "auto" : "80px",
          paddingLeft: isExpanded ? "1.5rem" : "1rem",
          paddingRight: isExpanded ? "1.5rem" : "1rem",
        }}
        transition={{
          duration: 0.5,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        {/* Three dots (visible when collapsed) */}
        <motion.div
          className="absolute flex items-center justify-center gap-1"
          animate={{
            opacity: isExpanded ? 0 : 1,
            scale: isExpanded ? 0.5 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-zinc-500"
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
          animate={{
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.3, delay: isExpanded ? 0.15 : 0 }}
        >
          <SocialTooltip items={socialLinks} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
