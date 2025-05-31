"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CursorState {
  isPointer: boolean
  isText: boolean
  isLoading: boolean
  elementType: string
}

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [cursorState, setCursorState] = useState<CursorState>({
    isPointer: false,
    isText: false,
    isLoading: false,
    elementType: "default",
  })
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  // Get element information for cursor adaptation
  const getElementInfo = useCallback((target: HTMLElement) => {
    const isButton = target.tagName === "BUTTON" || target.closest("button")
    const isLink = target.tagName === "A" || target.closest("a")
    const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.contentEditable === "true"
    const isClickable = isButton || isLink || target.classList.contains("clickable")
    const isLoading = target.classList.contains("loading") || target.closest(".loading")

    let elementType = "default"
    if (isButton) elementType = "button"
    else if (isLink) elementType = "link"
    else if (isInput) elementType = "text"

    return {
      isPointer: Boolean(isClickable),
      isText: Boolean(isInput),
      isLoading: Boolean(isLoading),
      elementType,
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      const target = e.target as HTMLElement
      const elementInfo = getElementInfo(target)
      setCursorState(elementInfo)

      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isVisible, getElementInfo])

  const getCursorSize = () => {
    if (cursorState.isText) return 24
    if (cursorState.isPointer) return 40
    return 32
  }

  const getCursorVariant = () => {
    if (cursorState.isText) return "text"
    if (cursorState.isPointer) return "pointer"
    if (cursorState.isLoading) return "loading"
    return "default"
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: position.x - getCursorSize() / 2,
          y: position.y - getCursorSize() / 2,
          scale: isClicking ? 0.8 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 400,
          mass: 0.5,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={getCursorVariant()}
            className="relative flex items-center justify-center"
            style={{
              width: getCursorSize(),
              height: getCursorSize(),
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Default cursor */}
            {getCursorVariant() === "default" && (
              <div className="w-8 h-8 border-2 border-black rounded-full bg-white/20" />
            )}

            {/* Pointer cursor */}
            {getCursorVariant() === "pointer" && (
              <div className="relative">
                <div className="w-10 h-10 border-2 border-black rounded-full bg-white/30" />
                <motion.div
                  className="absolute inset-0 border-2 border-black rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </div>
            )}

            {/* Text cursor */}
            {getCursorVariant() === "text" && (
              <div className="relative">
                <div className="w-6 h-6 border-2 border-black rounded-full bg-white/20" />
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-4 bg-black"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </div>
            )}

            {/* Loading cursor */}
            {getCursorVariant() === "loading" && (
              <div className="relative">
                <motion.div
                  className="w-8 h-8 border-2 border-black rounded-full border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-black rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: position.x - 2,
          y: position.y - 2,
          scale: isClicking ? 0.5 : cursorState.isPointer ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 400,
          mass: 0.2,
        }}
      />

      {/* Click ripple effect */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-40"
            style={{
              x: position.x - 25,
              y: position.y - 25,
            }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="w-12 h-12 border border-black rounded-full mix-blend-difference" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
