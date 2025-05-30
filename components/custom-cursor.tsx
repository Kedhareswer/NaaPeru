"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, useSpring, AnimatePresence } from "framer-motion"

interface CursorState {
  isPointer: boolean
  isText: boolean
  isDragging: boolean
  isLoading: boolean
  elementType: string
  isHovering: boolean
}

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  color: string
}

interface RippleEffect {
  id: number
  x: number
  y: number
  timestamp: number
}

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 })
  const [cursorState, setCursorState] = useState<CursorState>({
    isPointer: false,
    isText: false,
    isDragging: false,
    isLoading: false,
    elementType: "default",
    isHovering: false,
  })
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [magnetTarget, setMagnetTarget] = useState<{ x: number; y: number } | null>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [ripples, setRipples] = useState<RippleEffect[]>([])
  const [trailPoints, setTrailPoints] = useState<Array<{ x: number; y: number; timestamp: number }>>([])

  const particleId = useRef(0)
  const rippleId = useRef(0)
  const lastSoundTime = useRef(0)

  // Smooth cursor movement with springs
  const cursorX = useSpring(0, { stiffness: 400, damping: 25 })
  const cursorY = useSpring(0, { stiffness: 400, damping: 25 })

  // Audio context for sound feedback
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    } catch (e) {
      console.log("Web Audio API not supported")
    }
  }, [])

  // Play cursor sound
  const playSound = useCallback((frequency: number, duration: number, volume = 0.1) => {
    if (!audioContextRef.current) return

    const now = Date.now()
    if (now - lastSoundTime.current < 50) return // Throttle sounds
    lastSoundTime.current = now

    try {
      const oscillator = audioContextRef.current.createOscillator()
      const gainNode = audioContextRef.current.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContextRef.current.destination)

      oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)
      oscillator.type = "sine"

      gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime)
      gainNode.gain.linearRampToValueAtTime(volume, audioContextRef.current.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + duration)

      oscillator.start()
      oscillator.stop(audioContextRef.current.currentTime + duration)
    } catch (e) {
      // Silently fail if audio context is not available
    }
  }, [])

  // Create click particles
  const createClickParticles = useCallback((x: number, y: number, type: string) => {
    const particleCount = type === "button" ? 12 : 8
    const colors = {
      button: ["#10B981", "#059669", "#047857"],
      link: ["#3B82F6", "#2563EB", "#1D4ED8"],
      text: ["#F59E0B", "#D97706", "#B45309"],
      default: ["#6B7280", "#4B5563", "#374151"],
    }

    const colorSet = colors[type as keyof typeof colors] || colors.default

    const newParticles = Array.from({ length: particleCount }, () => ({
      id: particleId.current++,
      x: x + (Math.random() - 0.5) * 30,
      y: y + (Math.random() - 0.5) * 30,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8,
      life: 1,
      color: colorSet[Math.floor(Math.random() * colorSet.length)],
    }))

    setParticles((prev) => [...prev, ...newParticles])
  }, [])

  // Create ripple effect
  const createRipple = useCallback((x: number, y: number) => {
    const newRipple = {
      id: rippleId.current++,
      x,
      y,
      timestamp: Date.now(),
    }
    setRipples((prev) => [...prev, newRipple])
  }, [])

  // Update trail points
  const updateTrail = useCallback((x: number, y: number) => {
    const now = Date.now()
    setTrailPoints((prev) => [
      { x, y, timestamp: now },
      ...prev.filter((point) => now - point.timestamp < 500).slice(0, 15),
    ])
  }, [])

  // Get element information and magnetic effect
  const getElementInfo = useCallback((target: HTMLElement, clientX: number, clientY: number) => {
    const isButton = target.tagName === "BUTTON" || target.closest("button")
    const isLink = target.tagName === "A" || target.closest("a")
    const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.contentEditable === "true"
    const isClickable = isButton || isLink || target.classList.contains("clickable")
    const isLoading = target.classList.contains("loading") || target.closest(".loading")

    let elementType = "default"
    if (isButton) elementType = "button"
    else if (isLink) elementType = "link"
    else if (isInput) elementType = "text"

    // Magnetic effect calculation
    let magnetTarget = null
    if (isClickable) {
      const rect = target.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distance = Math.sqrt(Math.pow(clientX - centerX, 2) + Math.pow(clientY - centerY, 2))

      const magnetRadius = Math.min(rect.width, rect.height) + 30
      if (distance < magnetRadius) {
        const magnetStrength = Math.max(0, 1 - distance / magnetRadius) * 0.4
        magnetTarget = { x: centerX, y: centerY }

        return {
          magnetTarget,
          adjustedX: clientX + (centerX - clientX) * magnetStrength,
          adjustedY: clientY + (centerY - clientY) * magnetStrength,
          cursorState: {
            isPointer: Boolean(isClickable),
            isText: Boolean(isInput),
            isDragging: false,
            isLoading: Boolean(isLoading),
            elementType,
            isHovering: true,
          },
        }
      }
    }

    return {
      magnetTarget: null,
      adjustedX: clientX,
      adjustedY: clientY,
      cursorState: {
        isPointer: Boolean(isClickable),
        isText: Boolean(isInput),
        isDragging: false,
        isLoading: Boolean(isLoading),
        elementType,
        isHovering: Boolean(isClickable),
      },
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const elementInfo = getElementInfo(target, e.clientX, e.clientY)

      setTargetPosition({ x: elementInfo.adjustedX, y: elementInfo.adjustedY })
      setPosition({ x: e.clientX, y: e.clientY })
      setMagnetTarget(elementInfo.magnetTarget)
      setCursorState(elementInfo.cursorState)

      cursorX.set(elementInfo.adjustedX)
      cursorY.set(elementInfo.adjustedY)

      updateTrail(e.clientX, e.clientY)

      // Play hover sound for interactive elements
      if (elementInfo.cursorState.isPointer && !cursorState.isPointer) {
        playSound(800, 0.1, 0.05)
      }

      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true)
      createClickParticles(e.clientX, e.clientY, cursorState.elementType)
      createRipple(e.clientX, e.clientY)

      // Play click sound
      const frequency = cursorState.elementType === "button" ? 1200 : cursorState.elementType === "link" ? 1000 : 800
      playSound(frequency, 0.15, 0.08)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
      playSound(600, 0.1, 0.05)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
      setCursorState((prev) => ({ ...prev, isHovering: false }))
    }

    // Particle animation loop
    const animateParticles = () => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vx: particle.vx * 0.98,
            vy: particle.vy * 0.98 + 0.1, // gravity
            life: particle.life - 0.02,
          }))
          .filter((particle) => particle.life > 0),
      )

      // Clean up old ripples
      const now = Date.now()
      setRipples((prev) => prev.filter((ripple) => now - ripple.timestamp < 1000))

      requestAnimationFrame(animateParticles)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    animateParticles()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [
    isVisible,
    cursorState,
    updateTrail,
    createClickParticles,
    createRipple,
    playSound,
    getElementInfo,
    cursorX,
    cursorY,
  ])

  const getCursorSize = () => {
    if (cursorState.isText) return 1.3
    if (cursorState.isPointer) return 2.0
    if (cursorState.isLoading) return 1.6
    return 1
  }

  const getCursorColor = () => {
    if (cursorState.isText) return "#F59E0B"
    if (cursorState.elementType === "button") return "#10B981"
    if (cursorState.elementType === "link") return "#3B82F6"
    return "#374151"
  }

  return (
    <>
      {/* Trail effect */}
      {trailPoints.map((point, index) => {
        const age = Date.now() - point.timestamp
        const opacity = Math.max(0, 1 - age / 500) * 0.4
        const scale = 1 - (age / 500) * 0.8

        return (
          <motion.div
            key={`trail-${point.timestamp}-${index}`}
            className="fixed top-0 left-0 pointer-events-none z-40"
            style={{
              x: point.x - 2,
              y: point.y - 2,
              opacity,
              scale,
            }}
          >
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: getCursorColor() }} />
          </motion.div>
        )
      })}

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="fixed top-0 left-0 pointer-events-none z-45 border-2 rounded-full"
            style={{
              x: ripple.x - 25,
              y: ripple.y - 25,
              borderColor: getCursorColor(),
            }}
            initial={{ width: 0, height: 0, opacity: 0.8 }}
            animate={{ width: 50, height: 50, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          x: targetPosition.x - 20,
          y: targetPosition.y - 20,
          scale: isClicking ? 0.7 : getCursorSize(),
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
          mass: 0.4,
        }}
      >
        <motion.div
          className="w-10 h-10 rounded-full border-2 relative overflow-hidden"
          style={{
            borderColor: getCursorColor(),
            backgroundColor: cursorState.isPointer ? `${getCursorColor()}40` : "transparent",
          }}
          animate={{
            borderWidth: isClicking ? "4px" : "2px",
            rotate: cursorState.isLoading ? 360 : 0,
          }}
          transition={{
            rotate: {
              duration: 1,
              repeat: cursorState.isLoading ? Number.POSITIVE_INFINITY : 0,
              ease: "linear",
            },
            borderWidth: { duration: 0.15 },
          }}
        >
          {/* Context-specific inner elements */}
          <AnimatePresence mode="wait">
            {cursorState.isText && (
              <motion.div
                key="text-cursor"
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <motion.div
                  className="w-0.5 h-4 rounded-full"
                  style={{ backgroundColor: getCursorColor() }}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>
            )}

            {cursorState.isPointer && (
              <motion.div
                key="pointer-cursor"
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: getCursorColor() }}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Drag indicator */}
          {cursorState.isDragging && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Center dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          backgroundColor: getCursorColor(),
          x: position.x - 3,
          y: position.y - 3,
        }}
        animate={{
          scale: isClicking ? 0.3 : cursorState.isPointer ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 400,
          mass: 0.2,
        }}
      />

      {/* Magnetic target indicator */}
      <AnimatePresence>
        {magnetTarget && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-40 border rounded-full"
            style={{
              x: magnetTarget.x - 20,
              y: magnetTarget.y - 20,
              borderColor: `${getCursorColor()}60`,
            }}
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{
              width: 40,
              height: 40,
              opacity: 0.5,
              scale: [1, 1.1, 1],
            }}
            exit={{ width: 0, height: 0, opacity: 0 }}
            transition={{
              scale: {
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
          />
        )}
      </AnimatePresence>

      {/* Click particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-50"
            style={{
              backgroundColor: particle.color,
              x: particle.x,
              y: particle.y,
            }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              opacity: particle.life,
              scale: [1, 0.3],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </>
  )
}
