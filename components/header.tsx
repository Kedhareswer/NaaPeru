"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#case-studies" },
  { name: "Contact", href: "/#contact" },
]

const variants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [activeSection, setActiveSection] = useState("intro")
  const { scrollY } = useScroll()
  const router = useRouter()
  const pathname = usePathname()

  // Monitor scroll position for sticky behavior
  useMotionValueEvent(scrollY, "change", (latest) => {
    const heroHeight = typeof window !== "undefined" ? window.innerHeight * 0.8 : 800

    // Set scrolled state for background blur
    setScrolled(latest > 50)

    // Set sticky state after hero section
    setIsSticky(latest > heroHeight)
  })

  const handleScroll = useCallback(() => {
    // Only update active section on home page
    if (pathname === "/") {
      const sections = ["intro", "about", "case-studies", "contact"]
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }
  }, [pathname])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const handleNavClick = (href: string) => {
    setIsOpen(false)

    if (href === "/") {
      router.push("/")
      return
    }

    if (href.startsWith("/#")) {
      const sectionId = href.substring(2)

      if (pathname !== "/") {
        router.push("/")
        setTimeout(() => {
          const element = document.getElementById(sectionId)
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
            setActiveSection(sectionId)
          }
        }, 300)
      } else {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
          setActiveSection(sectionId)
        }
      }
    } else {
      router.push(href)
    }
  }

  const isActiveLink = (href: string) => {
    if (href === "/" && pathname === "/") {
      return activeSection === "intro"
    }
    if (href.startsWith("/#") && pathname === "/") {
      const sectionId = href.substring(2)
      return activeSection === sectionId
    }
    if (!href.includes("#")) {
      return pathname === href || pathname.startsWith(`${href}/`)
    }
    return pathname === href
  }

  const { scrollYProgress } = useScroll()

  // Determine if we should show the header based on page and scroll position
  const shouldShowHeader = pathname !== "/" || isSticky

  return (
    <>
      {/* Progress Bar - Always visible */}
      <motion.div
        className="fixed top-0 left-0 w-full h-0.5 bg-black z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Main Header */}
      <AnimatePresence>
        {shouldShowHeader && (
          <motion.header
            className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
              scrolled || pathname !== "/"
                ? "bg-white/95 backdrop-blur-md border-b border-black/10 shadow-lg"
                : "bg-white/80 backdrop-blur-sm"
            }`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              opacity: { duration: 0.2 },
            }}
          >
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
              <motion.div
                className="text-sm font-light tracking-widest"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <button onClick={() => handleNavClick("/")} className="cursor-pointer">
                  DATA.SENSE
                </button>
              </motion.div>

              <nav className="hidden md:flex space-x-8 lg:space-x-12">
                {navItems.map((item, i) => {
                  const isActive = isActiveLink(item.href)
                  return (
                    <motion.button
                      key={item.name}
                      onClick={() => handleNavClick(item.href)}
                      custom={i}
                      variants={variants}
                      initial="hidden"
                      animate="visible"
                      className={`relative text-xs tracking-widest uppercase hover:font-medium cursor-pointer group transition-all duration-200 ${
                        isActive ? "font-medium text-black" : "text-gray-700 hover:text-black"
                      }`}
                      whileHover={{ y: -1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      {item.name}
                      <motion.span
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-black origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isActive ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.span
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-black origin-left"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  )
                })}
              </nav>

              <motion.button
                className="md:hidden cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Initial Header for Home Page (before sticky) */}
      {pathname === "/" && !isSticky && (
        <motion.header
          className="fixed top-0 left-0 w-full z-40 transition-all duration-500 bg-transparent"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="container mx-auto px-6 py-6 flex justify-between items-center">
            <motion.div className="text-sm font-light tracking-widest text-black" whileHover={{ scale: 1.05 }}>
              <button onClick={() => handleNavClick("/")} className="cursor-pointer">
                DATA.SENSE
              </button>
            </motion.div>

            <nav className="hidden md:flex space-x-12">
              {navItems.map((item, i) => {
                const isActive = isActiveLink(item.href)
                return (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    custom={i}
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    className={`relative text-xs tracking-widest uppercase hover:font-medium cursor-pointer group ${
                      isActive ? "font-medium text-black" : "text-gray-700 hover:text-black"
                    }`}
                  >
                    {item.name}
                    <motion.span
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-black origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.span
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-black origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                )
              })}
            </nav>

            <motion.button
              className="md:hidden cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Menu className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.header>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-50 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-6 py-6 flex justify-between items-center border-b border-gray-100">
              <div className="text-sm font-light tracking-widest">DATA.SCIENCE</div>
              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 space-y-8">
              {navItems.map((item, i) => {
                const isActive = isActiveLink(item.href)
                return (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={`text-3xl tracking-widest uppercase hover:font-medium cursor-pointer transition-all duration-200 ${
                      isActive ? "font-medium text-black" : "text-gray-700 hover:text-black"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.button>
                )
              })}
            </div>

            {/* Mobile Menu Footer */}
            <div className="p-6 border-t border-gray-100">
              <div className="text-center text-sm text-gray-500">
                <p>© 2025 Kedhareswer Naidu</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
