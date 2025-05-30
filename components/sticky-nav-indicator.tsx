"use client"

import { useState } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { usePathname } from "next/navigation"

export default function StickyNavIndicator() {
  const [isSticky, setIsSticky] = useState(false)
  const { scrollY } = useScroll()
  const pathname = usePathname()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const heroHeight = typeof window !== "undefined" ? window.innerHeight * 0.8 : 800
    setIsSticky(latest > heroHeight)
  })

  // Only show on home page
  if (pathname !== "/") return null

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-black via-gray-600 to-black z-[45] origin-left"
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{
        scaleX: isSticky ? 1 : 0,
        opacity: isSticky ? 1 : 0,
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    />
  )
}
