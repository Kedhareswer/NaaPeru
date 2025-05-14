"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useScroll } from "framer-motion"
import { Menu, X } from "lucide-react"
import "../styles/navigation.css"

const navItems = [
  { name: "Intro", href: "#intro" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#case-studies" },
  { name: "Contact", href: "#contact" },
]

const variants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  })
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("intro")
  const { scrollY } = useScroll()

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50)
    
    // Update active section based on scroll position
    const sections = navItems.map(item => item.href.substring(1))
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
  }, [])

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

  const { scrollYProgress } = useScroll()

  return (
    <>
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
      />
      <motion.header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${scrolled ? "navbar-blur border-b border-black/10 shadow-sm" : "bg-transparent"}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          <motion.div className="text-sm font-light tracking-widest" whileHover={{ scale: 1.05 }}>
            <a href="#intro" className="clickable">
              DATA.SENSE
            </a>
          </motion.div>

          <nav className="hidden md:flex space-x-12">
            {navItems.map((item, i) => {
              const isActive = activeSection === item.href.substring(1)
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  custom={i}
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  className={`nav-link relative text-xs tracking-widest uppercase hover:font-medium clickable group ${isActive ? 'active font-medium' : ''}`}
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
                </motion.a>
              )
            })}
          </nav>

          <motion.button
            className="md:hidden clickable min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Menu className="w-6 h-6" />
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-50 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-6 py-6 flex justify-between items-center">
              <div className="text-sm font-light tracking-widest">DATA.SCIENCE</div>
              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="clickable min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 space-y-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="nav-item text-3xl tracking-widest uppercase hover:font-medium clickable"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

