"use client"

import * as React from "react"
import { AnimatePresence, motion, MotionProps } from "motion/react"

import { cn } from "@/lib/utils"

interface ShiftCardProps
  extends Omit<MotionProps, "onAnimationStart" | "onAnimationComplete"> {
  className?: string
  topContent?: React.ReactNode
  middleContent?: React.ReactNode
  topAnimateContent?: React.ReactNode
  bottomContent?: React.ReactNode
}

const ShiftCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => (
  <div ref={ref} {...props}>
    {children}
  </div>
))
ShiftCardHeader.displayName = "ShiftCardHeader"

interface ShiftCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  isHovered: boolean
}
const ShiftCardContent = React.forwardRef<
  HTMLDivElement,
  ShiftCardContentProps
>(({ isHovered, children, ...divProps }, ref) => {
  const motionProps: MotionProps = {
    initial: { opacity: 0, height: 0 },
    animate: isHovered
      ? { opacity: 1, height: "auto" }
      : { opacity: 1, height: 38 },
    transition: { duration: 0.3, delay: 0.1, ease: "circIn" },
  }

  return (
    <motion.div
      key="shift-card-content"
      ref={ref}
      {...motionProps}
      className={divProps.className}
    >
      {children}
    </motion.div>
  )
})
ShiftCardContent.displayName = "ShiftCardContent"

const ShiftCard = React.forwardRef<HTMLDivElement, ShiftCardProps>(
  (
    {
      className,
      topContent,
      topAnimateContent,
      middleContent,
      bottomContent,
      ...props
    },
    ref
  ) => {
    const [isHovered, setHovered] = React.useState(false)
    const handleMouseEnter = () => setHovered(true)
    const handleMouseLeave = () => setHovered(false)
    // On touch: toggle so the card stays open after tap, tap again to close
    const handleTap = () => setHovered((prev) => !prev)

    return (
      <motion.div
        ref={ref}
        className={cn(
          "min-h-[240px] w-[280px] md:min-h-[300px] md:w-[300px]",
          "group relative flex flex-col items-start justify-between overflow-hidden rounded-none p-3 text-sm",
          "hover:cursor-pointer bg-card",
          "shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]",
          "dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]",
          className
        )}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ scale: 1.02 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTap={handleTap}
        {...props}
      >
        {/* Header — always visible */}
        <ShiftCardHeader className="flex w-full flex-col relative text-primary-foreground">
          <div className="w-full">
            {topContent}
            <AnimatePresence>
              {isHovered ? <>{topAnimateContent}</> : null}
            </AnimatePresence>
          </div>
        </ShiftCardHeader>

        {/* Middle — image, centered, hidden on hover */}
        <div className="flex flex-1 w-full items-center justify-center py-2">
          <AnimatePresence>
            {!isHovered ? <>{middleContent}</> : null}
          </AnimatePresence>
        </div>

        {/* Bottom — slides up on hover */}
        <ShiftCardContent
          isHovered={isHovered}
          className="absolute bottom-0 left-0 right-0 flex flex-col overflow-hidden"
        >
          <motion.div className="flex w-full flex-col">
            {bottomContent}
          </motion.div>
        </ShiftCardContent>
      </motion.div>
    )
  }
)

ShiftCard.displayName = "ShiftCard"

export { ShiftCard, ShiftCardHeader, ShiftCardContent }
export default ShiftCard
