'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GlossaryTooltipProps {
  term: string
  definition: string
  children: React.ReactNode
}

export function GlossaryTooltip({ term, definition, children }: GlossaryTooltipProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const tooltipRef = React.useRef<HTMLDivElement>(null)

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="border-b border-dashed border-gray-400 cursor-help">
        {children}
      </span>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            ref={tooltipRef}
            className="absolute z-50 w-64 p-4 text-sm bg-white rounded-lg shadow-lg border border-gray-200"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            style={{
              top: 'calc(100% + 5px)',
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          >
            <div className="font-medium text-gray-900 mb-1">{term}</div>
            <div className="text-gray-600">{definition}</div>
            <div
              className="absolute w-3 h-3 bg-white border-t border-l border-gray-200 transform -translate-x-1/2 -translate-y-1/2 rotate-45"
              style={{
                top: 0,
                left: '50%'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}