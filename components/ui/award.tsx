"use client"

import type React from "react"
 
import { Award, Star } from "lucide-react"

import { cn } from "@/lib/utils"

export interface AwardsComponentProps {
  variant?: "stamp" | "award" | "certificate" | "badge" | "sticker" | "id-card"
  title: string
  subtitle?: string
  description?: string
  date?: string
  recipient?: string
  level?: "bronze" | "silver" | "gold" | "platinum"
  className?: string
  showIcon?: boolean
  customIcon?: React.ReactNode
}

const levelColors = {
  bronze: "from-amber-600 to-amber-800",
  silver: "from-gray-400 to-gray-600",
  gold: "from-yellow-400 to-yellow-600",
  platinum: "from-slate-300 to-slate-500",
}

export function Awards({
  variant = "badge",
  title,
  subtitle,
  description,
  date,
  recipient,
  level = "gold",
  className,
  showIcon = true,
}: AwardsComponentProps) {
  // Stamp Variant
  if (variant === "stamp") {
    const createSerratedPath = () => {
      const radius = 100 // Increased for larger stamps
      const teeth = 50 // More teeth for better detail
      const innerRadius = radius - 10
      const outerRadius = radius

      let path = ""
      for (let i = 0; i < teeth; i++) {
        const angle = (i / teeth) * 2 * Math.PI
        const r = i % 2 === 0 ? outerRadius : innerRadius
        const x = Math.cos(angle) * r + radius
        const y = Math.sin(angle) * r + radius

        if (i === 0) {
          path += `M ${x} ${y}`
        } else {
          path += ` L ${x} ${y}`
        }
      }
      path += " Z"
      return path
    }

    // Create curved text path with adjusted radius
    const createTextPath = (radius: number, id: string) => {
      const centerX = 100
      const centerY = 100
      return `M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`
    }

    // Function to truncate text if too long
    const truncateText = (text: string | undefined, maxLength: number = 20) => {
      if (!text || text.length <= maxLength) return text || ""
      return text.substring(0, maxLength - 3) + "..."
    }
    
    return (
      <div
        className={cn(
          "relative mx-auto flex h-48 w-48 items-center justify-center", // Increased size
          className
        )}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 200 200" // Increased viewBox
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Define paths for curved text with adjusted radius */}
            <path
              id="top-curve"
              d={createTextPath(75, "top-curve")} // Increased radius
              fill="none"
            />
            <path
              id="bottom-curve"
              d={createTextPath(80, "bottom-curve")} // Increased radius
              fill="none"
              transform="rotate(180 100 100)" // Updated center point
            />
          </defs>

          {/* Serrated border */}
          <path
            d={createSerratedPath()}
            strokeWidth="0.2"
            className="fill-white stroke-black dark:fill-black dark:stroke-white"
          />

          {/* Inner circle */}
          <circle
            cx="100"
            cy="100"
            r="80" // Increased radius
            className="fill-white stroke-black dark:fill-black dark:stroke-white"
            strokeWidth="0.2"
          />

          {/* Curved text - top */}
          <text className="fill-white text-lg font-bold"> {/* Increased text size */}
            <textPath
              href="#top-curve"
              startOffset="50%"
              textAnchor="middle"
              className="fill-black dark:fill-white"
            >
              {truncateText(title, 25)} {/* Truncate if too long */}
            </textPath>
          </text>

          {/* Curved text - bottom */}
          <text className="text-sm tracking-wider"> {/* Increased text size */}
            <textPath
              href="#bottom-curve"
              startOffset="50%"
              textAnchor="middle"
              className="fill-black dark:fill-white"
            >
              {truncateText(subtitle, 30)} {/* Truncate if too long */}
            </textPath>
          </text>
        </svg>

        <div className="relative z-10 text-center">
          {showIcon && (
            <div className="mb-2 flex justify-center text-center text-2xl"> {/* Increased icon size */}
              {<Star className="text-primary fill-primary" />}
            </div>
          )}
          {/* Removed recipient name to use space better */}
          {date && <div className="text-sm italic">{date}</div>} {/* Increased text size */}
        </div>
      </div>
    )
  }

  // Certificate Variant
  if (variant === "certificate") {
    const Badge = () => (
      <svg
        className={cn("fill-primary -mt-2 h-4 w-full overflow-hidden")}
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
      </svg>
    )
    return (
      <div
        className={cn(
          "relative z-0",
          "flex flex-col items-center justify-center rounded-lg border-2 border-dotted p-1",
          "overflow-hidden w-full max-w-2xl",
          className
        )}
      >
        <div className="bg-card z-10 rounded-sm border p-3 px-8 text-center w-full">
          <Badge />
          <h1
            className={cn(
              "mt-1 grid text-sm leading-4 font-bold tracking-tight uppercase"
            )}
          >
            Certificate
            <span className="text-xs font-light tracking-tight">
              {" "}
              of {title}
            </span>
          </h1>

          <p className="text-muted-foreground mt-1 mb-1 text-xs">
            This is to certify that
          </p>
          <h1
            className={cn(
              "text-primary mb-1 border-b text-xs font-semibold tracking-tight"
            )}
          >
            {recipient}
          </h1>

          <p className="text-muted-foreground mb-1 text-xs">{subtitle}</p>
          <div className="mt-1 flex justify-center">
            <Award strokeWidth={1} className="h-2 w-2" />
          </div>
          <div className={cn("mt-1 text-xs")}>Awarded on: {date}</div>
        </div>
      </div>
    )
  }

  // Default fallback for other variants
  return (
    <div className={cn("p-4 border rounded-lg", className)}>
      <div className="flex items-center space-x-3">
        {showIcon && <Award className="w-5 h-5" />}
        <div>
          <h3 className="font-medium">{title}</h3>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          {date && <p className="text-xs text-muted-foreground">{date}</p>}
        </div>
      </div>
    </div>
  )
} 