"use client"

// Fallback CSS gradient until @paper-design/shaders-react is installed
// Run: pnpm install to enable the shader version

export function GradientBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <div 
        className="w-full h-full animate-pulse"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, hsl(14, 100%, 57%) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, hsl(45, 100%, 51%) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, hsl(340, 82%, 52%) 0%, transparent 50%),
            linear-gradient(135deg, hsl(0, 0%, 0%) 0%, hsl(0, 0%, 10%) 100%)
          `
        }}
      />
    </div>
  )
}

// Uncomment below and comment above once dependencies are installed:
/*
import { GrainGradient } from "@paper-design/shaders-react"

export function GradientBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <GrainGradient
        style={{ height: "100%", width: "100%" }}
        colorBack="hsl(0, 0%, 0%)"
        softness={0.76}
        intensity={0.45}
        noise={0}
        shape="corners"
        offsetX={0}
        offsetY={0}
        scale={1}
        rotation={0}
        speed={1}
        colors={["hsl(14, 100%, 57%)", "hsl(45, 100%, 51%)", "hsl(340, 82%, 52%)"]}
      />
    </div>
  )
}
*/
