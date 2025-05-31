"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingScreen() {
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    document.body.style.overflow = "hidden"

    // Complete loading after 3 seconds
    const timer = setTimeout(() => {
      setIsComplete(true)
    }, 3000)

    return () => {
      document.body.style.overflow = "auto"
      clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          className="fixed inset-0 bg-white z-[100] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="min-h-screen bg-white">
            {/* Header Skeleton */}
            <motion.div
              className="w-full px-4 md:px-8 py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex justify-between items-center max-w-7xl mx-auto">
                {/* Logo skeleton */}
                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />

                {/* Navigation skeleton */}
                <div className="hidden md:flex space-x-8">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>

                {/* Mobile menu skeleton */}
                <div className="md:hidden h-6 w-6 bg-gray-200 rounded animate-pulse" />
              </div>
            </motion.div>

            {/* Hero Section Skeleton */}
            <motion.div
              className="px-4 md:px-8 py-16 md:py-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Text content skeleton */}
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                      <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
                      <div className="h-12 w-4/5 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="flex space-x-4 pt-4">
                      <div className="h-12 w-32 bg-gray-200 rounded animate-pulse" />
                      <div className="h-12 w-28 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>

                  {/* Image skeleton */}
                  <div className="relative">
                    <div className="aspect-square w-full max-w-md mx-auto bg-gray-200 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Skills Section Skeleton */}
            <motion.div
              className="px-4 md:px-8 py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <div className="h-8 w-48 bg-gray-200 rounded mx-auto animate-pulse" />
                </div>

                {/* Skills grid skeleton */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex flex-col items-center space-y-3 p-4"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                    >
                      <div className="w-12 h-12 bg-gray-200 rounded animate-pulse" />
                      <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Projects Section Skeleton */}
            <motion.div
              className="px-4 md:px-8 py-16 bg-gray-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <div className="h-8 w-56 bg-gray-200 rounded mx-auto animate-pulse" />
                </div>

                {/* Projects grid skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="bg-white rounded-lg overflow-hidden shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <div className="aspect-video bg-gray-200 animate-pulse" />
                      <div className="p-6 space-y-3">
                        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
                        <div className="space-y-2">
                          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                          <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
                        </div>
                        <div className="flex space-x-2 pt-2">
                          <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                          <div className="h-6 w-12 bg-gray-200 rounded animate-pulse" />
                          <div className="h-6 w-14 bg-gray-200 rounded animate-pulse" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Testimonials Section Skeleton */}
            <motion.div
              className="px-4 md:px-8 py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <div className="h-8 w-64 bg-gray-200 rounded mx-auto animate-pulse" />
                </div>

                {/* Testimonials grid skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="bg-white p-6 rounded-lg shadow-sm space-y-4"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
                        <div className="space-y-1">
                          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                          <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Footer Skeleton */}
            <motion.div
              className="px-4 md:px-8 py-12 bg-gray-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="space-y-4">
                    <div className="h-6 w-32 bg-gray-700 rounded animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-gray-700 rounded animate-pulse" />
                      <div className="h-4 w-4/5 bg-gray-700 rounded animate-pulse" />
                    </div>
                  </div>
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-4">
                      <div className="h-5 w-24 bg-gray-700 rounded animate-pulse" />
                      <div className="space-y-2">
                        {[...Array(4)].map((_, j) => (
                          <div key={j} className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Loading indicator */}
            <motion.div
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg">
                <div className="flex space-x-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 1.5,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-medium">Loading...</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
