"use client"

import type React from "react"
import { useEffect, useRef, useState, useCallback } from "react"

interface TextPressureProps {
  text?: string
  fontSize?: number
  fontWeight?: number
  color?: string
  className?: string
  intensity?: number
  enableTypewriter?: boolean
  typewriterSpeed?: number
}

const TextPressure: React.FC<TextPressureProps> = ({
  text = "Loading",
  fontSize = 96,
  fontWeight = 900,
  color = "#000000",
  className = "",
  intensity = 0.3,
  enableTypewriter = false,
  typewriterSpeed = 100,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [displayText, setDisplayText] = useState("")
  const [typewriterIndex, setTypewriterIndex] = useState(0)
  const animationRef = useRef<number>()
  const resizeObserverRef = useRef<ResizeObserver>()
  const lastFrameTime = useRef(0)
  const resizeTimeoutRef = useRef<NodeJS.Timeout>()

  // Typewriter effect
  useEffect(() => {
    if (!enableTypewriter) {
      setDisplayText(text)
      return
    }

    if (typewriterIndex < text.length) {
      const timer = setTimeout(
        () => {
          setDisplayText(text.slice(0, typewriterIndex + 1))
          setTypewriterIndex(typewriterIndex + 1)

          // Play typing sound (using Web Audio API)
          try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()

            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)

            oscillator.frequency.setValueAtTime(800 + Math.random() * 200, audioContext.currentTime)
            oscillator.type = "square"

            gainNode.gain.setValueAtTime(0.05, audioContext.currentTime)
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

            oscillator.start()
            oscillator.stop(audioContext.currentTime + 0.1)
          } catch (e) {
            // Fallback if Web Audio API is not available
          }
        },
        typewriterSpeed + Math.random() * 50,
      ) // Add some randomness

      return () => clearTimeout(timer)
    }
  }, [text, typewriterIndex, enableTypewriter, typewriterSpeed])

  // Reset typewriter when text changes
  useEffect(() => {
    if (enableTypewriter) {
      setTypewriterIndex(0)
      setDisplayText("")
    }
  }, [text, enableTypewriter])

  // Debounced resize handler
  const debouncedResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current)
    }

    resizeTimeoutRef.current = setTimeout(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      try {
        const rect = canvas.getBoundingClientRect()
        if (rect.width > 0 && rect.height > 0) {
          const dpr = Math.min(window.devicePixelRatio || 1, 2)
          const ctx = canvas.getContext("2d")
          if (!ctx) return

          canvas.width = rect.width * dpr
          canvas.height = rect.height * dpr
          ctx.scale(dpr, dpr)
          canvas.style.width = rect.width + "px"
          canvas.style.height = rect.height + "px"
        }
      } catch (error) {
        console.warn("Canvas resize error:", error)
      }
    }, 100) // 100ms debounce
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
      powerPreference: "high-performance",
    })
    if (!ctx) return

    let animationId: number
    const textureCache = new Map<string, HTMLCanvasElement>()

    // Responsive font sizing
    const getResponsiveFontSize = () => {
      const rect = canvas.getBoundingClientRect()
      const baseSize = fontSize
      const scaleFactor = Math.min(rect.width / 500, rect.height / 200, 1.5)
      return Math.max(baseSize * scaleFactor, 24)
    }

    // Initial canvas setup
    const setupCanvas = () => {
      try {
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const rect = canvas.getBoundingClientRect()

        if (rect.width > 0 && rect.height > 0) {
          canvas.width = rect.width * dpr
          canvas.height = rect.height * dpr
          ctx.scale(dpr, dpr)
          canvas.style.width = rect.width + "px"
          canvas.style.height = rect.height + "px"
        }
      } catch (error) {
        console.warn("Canvas setup error:", error)
      }
    }

    // Create or get cached text texture
    const getTextTexture = (text: string, fontSize: number) => {
      const cacheKey = `${text}-${fontSize}-${fontWeight}-${color}`

      if (textureCache.has(cacheKey)) {
        return textureCache.get(cacheKey)!
      }

      try {
        const offscreen = document.createElement("canvas")
        const offCtx = offscreen.getContext("2d")
        if (!offCtx) return null

        offCtx.font = `${fontWeight} ${fontSize}px Arial, sans-serif`
        const metrics = offCtx.measureText(text)

        offscreen.width = Math.ceil(metrics.width) + 40
        offscreen.height = fontSize + 40

        offCtx.font = `${fontWeight} ${fontSize}px Arial, sans-serif`
        offCtx.fillStyle = color
        offCtx.textBaseline = "middle"
        offCtx.textAlign = "center"
        offCtx.fillText(text, offscreen.width / 2, offscreen.height / 2)

        textureCache.set(cacheKey, offscreen)
        return offscreen
      } catch (error) {
        console.warn("Text texture creation error:", error)
        return null
      }
    }

    // Optimized animation loop with frame rate limiting
    const animate = (currentTime: number) => {
      try {
        // Limit to 60fps
        if (currentTime - lastFrameTime.current < 16.67) {
          animationId = requestAnimationFrame(animate)
          return
        }
        lastFrameTime.current = currentTime

        const rect = canvas.getBoundingClientRect()
        if (rect.width === 0 || rect.height === 0) {
          animationId = requestAnimationFrame(animate)
          return
        }

        ctx.clearRect(0, 0, rect.width, rect.height)

        const currentFontSize = getResponsiveFontSize()
        const textTexture = getTextTexture(displayText, currentFontSize)
        if (!textTexture) {
          animationId = requestAnimationFrame(animate)
          return
        }

        const currentIntensity = isHovering ? intensity * 2 : intensity
        const fuzzAmount = currentIntensity * 15

        // Optimized fuzzy effect with reduced iterations
        const step = Math.max(1, Math.floor(textTexture.height / 50))
        for (let i = 0; i < textTexture.height; i += step) {
          const offset = (Math.random() - 0.5) * fuzzAmount
          ctx.drawImage(
            textTexture,
            0,
            i,
            textTexture.width,
            step,
            (rect.width - textTexture.width) / 2 + offset,
            (rect.height - textTexture.height) / 2 + i,
            textTexture.width,
            step,
          )
        }

        animationId = requestAnimationFrame(animate)
      } catch (error) {
        console.warn("Animation error:", error)
        animationId = requestAnimationFrame(animate)
      }
    }

    // Setup ResizeObserver with error handling
    try {
      resizeObserverRef.current = new ResizeObserver((entries) => {
        // Use requestAnimationFrame to avoid ResizeObserver loop
        requestAnimationFrame(() => {
          try {
            for (const entry of entries) {
              if (entry.target === canvas) {
                debouncedResize()
                break
              }
            }
          } catch (error) {
            console.warn("ResizeObserver callback error:", error)
          }
        })
      })

      resizeObserverRef.current.observe(canvas)
    } catch (error) {
      console.warn("ResizeObserver setup error:", error)
      // Fallback to window resize event
      window.addEventListener("resize", debouncedResize)
    }

    setupCanvas()
    animationId = requestAnimationFrame(animate)

    // Mouse events
    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    canvas.addEventListener("mouseenter", handleMouseEnter)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      if (resizeObserverRef.current) {
        try {
          resizeObserverRef.current.disconnect()
        } catch (error) {
          console.warn("ResizeObserver disconnect error:", error)
        }
      }
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
      canvas.removeEventListener("mouseenter", handleMouseEnter)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("resize", debouncedResize)
      textureCache.clear()
    }
  }, [displayText, fontSize, fontWeight, color, intensity, isHovering, debouncedResize])

  return (
    <canvas
      ref={canvasRef}
      className={`block ${className}`}
      style={{
        width: "100%",
        height: "100%",
        cursor: "pointer",
        maxHeight: "300px",
      }}
    />
  )
}

export default TextPressure
