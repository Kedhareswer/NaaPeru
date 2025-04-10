"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    
    // Demo message handling
    try {
      console.log('Form submitted with data:', formState)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Demo success handling
      alert('Message sent successfully! (Demo Mode)')
      setFormState({ name: '', email: '', message: '' }) // Reset form
      
    } catch (error) {
      console.error('Error in demo submission:', error)
      alert('Failed to send message. Please try again. (Demo Mode)')
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-light">Contact</h2>
          <div className="w-16 h-px bg-black mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl font-light mb-6">Get In Touch</h3>
            <p className="text-gray-800 mb-8">
              I'm currently available for research collaborations, internships, and project opportunities. Feel free to
              reach out if you'd like to connect.
            </p>

            <div className="space-y-4 mb-8">
              <p className="flex items-center">
                <Mail className="w-5 h-5 mr-3" />
                <span>kedhareswer.12110626@gmail.com</span>
              </p>
              <p>Phagwara, Punjab, India</p>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-wider mb-4">Connect</h4>
              <div className="flex space-x-4">
                <motion.a
                  href="https://github.com/Kedhareswer"
                  className="w-10 h-10 border border-black rounded-full flex items-center justify-center clickable"
                  whileHover={{ backgroundColor: "#000", color: "#fff" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/kedhareswernaidu"
                  className="w-10 h-10 border border-black rounded-full flex items-center justify-center clickable"
                  whileHover={{ backgroundColor: "#000", color: "#fff" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="mailto:kedhareswer.12110626@gmail.com"
                  className="w-10 h-10 border border-black rounded-full flex items-center justify-center clickable"
                  whileHover={{ backgroundColor: "#000", color: "#fff" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm mb-2">
                  Name
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full border border-black p-3 bg-transparent"
                  whileFocus={{ borderColor: "#000", borderWidth: "2px" }}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm mb-2">
                  Email
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full border border-black p-3 bg-transparent"
                  whileFocus={{ borderColor: "#000", borderWidth: "2px" }}
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm mb-2">
                  Message
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full border border-black p-3 bg-transparent"
                  whileFocus={{ borderColor: "#000", borderWidth: "2px" }}
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="px-6 py-3 bg-black text-white flex items-center clickable"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

