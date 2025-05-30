"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface TextPressureProps {
  text?: string
  fontSize?: number
  fontWeight?: number
  color?: string
  className?: string
  intensity?: number
}

const TextPressure: React.FC<TextPressureProps> = ({
  text = "Loading",
  fontSize = 96,
  fontWeight = 900,
  color = "#000000",
  className = "",
  intensity = 0.3,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set up canvas
    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      ctx.scale(dpr, dpr)
      canvas.style.width = rect.width + "px"
      canvas.style.height = rect.height + "px"
    }

    // Create text texture
    const createTextTexture = () => {
      const offscreen = document.createElement("canvas")
      const offCtx = offscreen.getContext("2d")
      if (!offCtx) return null

      offCtx.font = `${fontWeight} ${fontSize}px Arial, sans-serif`
      const metrics = offCtx.measureText(text)

      offscreen.width = Math.ceil(metrics.width) + 20
      offscreen.height = fontSize + 20

      offCtx.font = `${fontWeight} ${fontSize}px Arial, sans-serif`
      offCtx.fillStyle = color
      offCtx.textBaseline = "middle"
      offCtx.fillText(text, 10, offscreen.height / 2)

      return offscreen
    }

    setupCanvas()
    const textTexture = createTextTexture()
    if (!textTexture) return

    // Animation loop
    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      const currentIntensity = isHovering ? intensity * 2 : intensity
      const fuzzAmount = currentIntensity * 20

      // Draw fuzzy text effect
      for (let i = 0; i < textTexture.height; i += 2) {
        const offset = (Math.random() - 0.5) * fuzzAmount
        ctx.drawImage(
          textTexture,
          0,
          i,
          textTexture.width,
          2,
          (rect.width - textTexture.width) / 2 + offset,
          (rect.height - textTexture.height) / 2 + i,
          textTexture.width,
          2,
        )
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Mouse events
    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    canvas.addEventListener("mouseenter", handleMouseEnter)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      canvas.removeEventListener("mouseenter", handleMouseEnter)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [text, fontSize, fontWeight, color, intensity, isHovering])

  return (
    <canvas
      ref={canvasRef}
      className={`block ${className}`}
      style={{
        width: "100%",
        height: "200px",
        cursor: "pointer",
      }}
    />
  )
}

export default TextPressure
