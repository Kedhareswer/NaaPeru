"use client"

import { motion, AnimatePresence } from "framer-motion"

type HobbyImagesProps = {
  hobby: string
  isVisible: boolean
}

const hobbyPatterns = {
  Reading: [
    `<pattern id="book-pattern" patternUnits="userSpaceOnUse" width="60" height="60" viewBox="0 0 60 60">
      <path d="M10 10h40v40h-40z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M20 20h20v20h-20z" fill="currentColor" opacity="0.2"/>
    </pattern>`,
    `<pattern id="glasses-pattern" patternUnits="userSpaceOnUse" width="60" height="60" viewBox="0 0 60 60">
      <circle cx="20" cy="30" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="40" cy="30" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M30 30h10" stroke="currentColor" strokeWidth="2"/>
    </pattern>`,
    `<pattern id="bookmark-pattern" patternUnits="userSpaceOnUse" width="60" height="60" viewBox="0 0 60 60">
      <path d="M20 10v40l10-10 10 10v-40z" fill="none" stroke="currentColor" strokeWidth="2"/>
    </pattern>`
  ],
  Music: [
    `<pattern id="note-pattern" patternUnits="userSpaceOnUse" width="60" height="60" viewBox="0 0 60 60">
      <circle cx="30" cy="40" r="8" fill="currentColor"/>
      <path d="M38 40v-25" stroke="currentColor" strokeWidth="2"/>
      <path d="M38 15h10" stroke="currentColor" strokeWidth="2"/>
    </pattern>`,
    `<pattern id="wave-pattern" patternUnits="userSpaceOnUse" width="60" height="60" viewBox="0 0 60 60">
      <path d="M5 30 Q15 20 25 30 T45 30" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M5 40 Q15 30 25 40 T45 40" fill="none" stroke="currentColor" strokeWidth="2"/>
    </pattern>`,
    `<pattern id="headphone-pattern" patternUnits="userSpaceOnUse" width="60" height="60" viewBox="0 0 60 60">
      <path d="M20 30a10 10 0 0 1 20 0" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M15 30v10h10v-10" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M35 30v10h10v-10" fill="none" stroke="currentColor" strokeWidth="2"/>
    </pattern>`
  ],
  Photography: [
    `<pattern id="camera-pattern" patternUnits="userSpaceOnUse" width="60" height="60" viewBox="0 0 60 60">
      <rect x="10" y="20" width="40" height="30" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="30" cy="35" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M20 20v-5h20v5" stroke="currentColor" strokeWidth="2"/>
    </pattern>`,
    `<pattern id="lens-pattern" patternUnits="userSpaceOnUse" width="60" height="60" viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="15" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="30" cy="30" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="30" cy="30" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
    </pattern>`,
    `<pattern id="frame-pattern" patternUnits="userSpaceOnUse" width="60" height="60" viewBox="0 0 60 60">
      <rect x="15" y="15" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M15 25h30M25 15v30" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
    </pattern>`
  ],
  Cycling: [
    `<pattern id="bike-pattern" patternUnits="userSpaceOnUse" width="60" height="60" viewBox="0 0 60 60">
      <circle cx="20" cy="40" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="40" cy="40" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M20 40l20-20h10M30 40l-10-20" stroke="currentColor" strokeWidth="2"/>
    </pattern>`,
    `<pattern id="wheel-pattern" patternUnits="userSpaceOnUse" width="60" height="60" viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="20" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M30 10v40M10 30h40M20 20l20 20M20 40l20-20" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
    </pattern>`,
    `<pattern id="path-pattern" patternUnits="userSpaceOnUse" width="60" height="60" viewBox="0 0 60 60">
      <path d="M5 40c10-20 40-20 50 0" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="30" cy="30" r="3" fill="currentColor"/>
    </pattern>`
  ],
  Handcraft: [
    `<pattern id="tools-pattern" patternUnits="userSpaceOnUse" width="60" height="60" viewBox="0 0 60 60">
      <path d="M20 20l20 20M40 20l-20 20" stroke="currentColor" strokeWidth="2"/>
      <circle cx="20" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="40" cy="40" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
    </pattern>`,
    `<pattern id="needle-pattern" patternUnits="userSpaceOnUse" width="60" height="60" viewBox="0 0 60 60">
      <path d="M30 10v40M25 15h10l-5 5-5-5" fill="none" stroke="currentColor" strokeWidth="2"/>
    </pattern>`,
    `<pattern id="scissors-pattern" patternUnits="userSpaceOnUse" width="60" height="60" viewBox="0 0 60 60">
      <path d="M20 20c0 10 20 10 20 20M20 40c0-10 20-10 20-20" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="15" cy="25" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="15" cy="35" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
    </pattern>`
  ]
}

export default function HobbyImages({ hobby, isVisible }: HobbyImagesProps) {
  const patterns = hobbyPatterns[hobby as keyof typeof hobbyPatterns] || []

  const positions = [
    { x: '15%', y: '20%', rotate: -15, scale: 1.2 },
    { x: '55%', y: '25%', rotate: 10, scale: 1 },
    { x: '35%', y: '60%', rotate: -5, scale: 1.1 }
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="relative w-full h-full">
            <svg width="0" height="0" className="absolute">
              <defs>
                {patterns.map((pattern, index) => (
                  <g key={index} dangerouslySetInnerHTML={{ __html: pattern }} />
                ))}
              </defs>
            </svg>

            {patterns.map((_, index) => {
              const position = positions[index]
              return (
                <motion.div
                  key={index}
                  className="absolute w-16 h-16 md:w-20 md:h-20"
                  initial={{
                    opacity: 0,
                    scale: 0.5,
                    x: position.x,
                    y: position.y,
                    rotate: position.rotate
                  }}
                  animate={{
                    opacity: 0.8,
                    scale: position.scale,
                    x: position.x,
                    y: position.y,
                    rotate: position.rotate
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                    rotate: position.rotate - 20
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: index * 0.1
                  }}
                >
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 60 60"
                    style={{
                      filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                    }}
                  >
                    <rect
                      width="60"
                      height="60"
                      fill={`url(#${hobby.toLowerCase()}-${index + 1})`}
                      className="text-black dark:text-white transition-colors duration-300"
                    />
                  </svg>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}