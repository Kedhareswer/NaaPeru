"use client"

import React, { ElementType, useMemo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

type Variants = {
  visible: any
  hidden: any
}

type TimelineContentProps = {
  as?: ElementType
  animationNum?: number
  timelineRef?: React.RefObject<HTMLElement | null>
  customVariants?: Variants
  className?: string
  children?: React.ReactNode
} & Record<string, any>

export function TimelineContent({
  as,
  animationNum = 0,
  customVariants,
  className,
  children,
  ...rest
}: TimelineContentProps) {
  const localRef = useRef<HTMLElement | null>(null)
  const isInView = useInView(localRef as any, {
    once: false,
    margin: '-20% 0px -20% 0px',
  })

  const Tag = (as || 'div') as ElementType
  const MotionTag: any = useMemo(() => motion(Tag as any), [Tag])

  const variants: Variants =
    customVariants || {
      hidden: { opacity: 0, y: 12 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: animationNum * 0.08 },
      },
    }

  return (
    <MotionTag
      ref={localRef as any}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={animationNum}
      variants={variants as any}
      className={cn(className)}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
