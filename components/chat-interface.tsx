"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'

interface Message {
  role: 'user' | 'assistant'
  content: string
  isAppointment?: boolean
}

interface AppointmentData {
  name: string
  contact: string
  subject: string
  date: string
  time: string
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const { toast } = useToast()

  const chatRef = useRef(null)
  const isInView = useInView(chatRef, { once: true })

  useEffect(() => {
    if (isInView) {
      const welcomeMessage = {
        role: 'assistant' as const,
        content: `Hi there! 👋 I'm Kedhareswer's AI assistant. I can tell you all about his work, projects, and experience in data science and AI. How can I help you today?`
      }
      setMessages([welcomeMessage])
    }
  }, [isInView])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: 'user' as const, content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      // Check if the user is asking about booking an appointment
      if (/book an appointment/i.test(input)) {
        const appointmentMessage = {
          role: 'assistant' as const,
          content: "To book an appointment, please provide the following information:\n1. Your Name\n2. Contact Information (email/phone)\n3. Subject of Meeting\n4. Preferred Date (YYYY-MM-DD)\n5. Preferred Time",
          isAppointment: true
        }
        setMessages(prev => [...prev, appointmentMessage])
        setLoading(false)
        return
      }

      // Check if this is an appointment booking response
      const lastMessage = messages[messages.length - 1]
      if (lastMessage?.isAppointment) {
        try {
          // Extract appointment details from user input
          const lines = input.split('\n')
          const appointmentData: AppointmentData = {
            name: lines[0]?.trim() || '',
            contact: lines[1]?.trim() || '',
            subject: lines[2]?.trim() || '',
            date: lines[3]?.trim() || '',
            time: lines[4]?.trim() || ''
          }

          // Submit appointment
          const response = await fetch('/api/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appointmentData)
          })

          const result = await response.json()

          if (!response.ok) {
            throw new Error(result.error || 'Failed to schedule appointment')
          }

          const confirmationMessage = {
            role: 'assistant' as const,
            content: `Great! Your appointment has been scheduled. Here are the details:\n\nName: ${appointmentData.name}\nContact: ${appointmentData.contact}\nSubject: ${appointmentData.subject}\nDate: ${appointmentData.date}\nTime: ${appointmentData.time}\n\nYou will receive a confirmation email shortly.`
          }
          setMessages(prev => [...prev, confirmationMessage])
          setLoading(false)
          return
        } catch (error) {
          console.error('Error scheduling appointment:', error)
          const errorMessage = {
            role: 'assistant' as const,
            content: 'Sorry, there was an error scheduling your appointment. Please try again or contact directly via email.'
          }
          setMessages(prev => [...prev, errorMessage])
          setLoading(false)
          return
        }
      }

      // Proceed with the API call for other queries
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          'x-goog-api-key': process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''
        }),
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an assistant of Kedhareswer, help his clients book appointments with him. Keep it concise and clear. Respond to: ${input}\n\nContext: ${JSON.stringify({
                about: "A passionate data science student with a strong foundation in AI and machine learning, dedicated to solving real-world problems through data-driven solutions.",
                education: {
                  current: "Bachelor of Technology in Computer Science (Data Science) at Lovely Professional University",
                  cgpa: 7.55
                },
                experience: [
                  {
                    role: "AI Evaluator & Trainer",
                    company: "Outlier.AI, Data Annotation, Soul.AI",
                    duration: "November 2024 - Present",
                    highlights: ["Evaluated AI-generated mathematical content", "Assessed factuality and quality of AI text"]
                  },
                  {
                    role: "Data Analyst Intern",
                    company: "PSYLIQ",
                    duration: "January 2024 - February 2024",
                    highlights: ["Analyzed HR data", "Created visualizations using MySQL, Python, and Power BI"]
                  }
                ],
                projects: [
                  {
                    title: "AI-Based Endoscopic Image Enhancement",
                    tech: ["PyTorch", "Flask", "OpenCV"],
                    outcome: "Enhanced quality of medical imaging for diagnostic support"
                  },
                  {
                    title: "Neural Network Visualization Platform",
                    tech: ["React", "D3.js", "TensorFlow.js"],
                    outcome: "Increased neural network understanding by 85%"
                  }
                ],
                skills: {
                  technical: ["Python", "Machine Learning", "Natural Language Processing", "MySQL", "Power BI"],
                  tools: ["Jupyter Notebook", "Google Collab", "Tableau"]
                },
                contact: {
                  email: "<a href='mailto:kedhareswer.12110626@gmail.com'>kedhareswer.12110626@gmail.com</a>",
                  linkedin: "<a href='https://www.linkedin.com/in/kedhareswernaidu'>LinkedIn</a>",
                  github: "<a href='https://github.com/Kedhareswer'>GitHub</a>"
                }
              })}\n\nBe friendly and professional. Provide concise yet detailed responses based on the context. Ensure that it is "know more about him," not "learn more about him." Additionally, assist in booking an appointment with him. Please ensure that the output is formatted correctly and free of inconsistencies. Do not give information if it is not asked directly.`
            }]
          }]
        })
      })

      const data = await response.json()
      
      // Check if response has the expected structure
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      if (!data || !Array.isArray(data.candidates) || data.candidates.length === 0) {
        throw new Error('Invalid API response: missing candidates array')
      }

      const candidate = data.candidates[0]
      if (!candidate?.content?.parts?.[0]?.text) {
        throw new Error('Invalid API response: missing content text')
      }

      const aiMessage = {
        role: 'assistant' as const,
        content: data.candidates[0].content.parts[0].text
      }
      
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }])
    }

    setLoading(false)
  }

  return (
    <div ref={chatRef} className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] overflow-hidden border border-gray-200">
      <div className="h-[400px] overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 rounded-full mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l3 3" />
                <path d="M6 12h6" />
              </svg>
            )}
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${message.role === 'user' ? 'bg-black text-white' : 'bg-gray-50 border border-gray-200'} shadow-[inset_0_0_5px_rgba(0,0,0,0.2)]`}
            >
              <p className="text-[15px] leading-relaxed">{message.content}</p>
            </div>
            {message.role === 'user' && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 rounded-full ml-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M14.5 11.5a3.5 3.5 0 0 1-7 0" />
                <path d="M12 15v1" />
              </svg>
            )}
          </motion.div>
        ))}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 shadow-[inset_0_0_5px_rgba(0,0,0,0.2)]">
              <div className="flex space-x-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                  className="w-2 h-2 bg-black/40 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.2, ease: "easeInOut" }}
                  className="w-2 h-2 bg-black/40 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.4, ease: "easeInOut" }}
                  className="w-2 h-2 bg-black/40 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-gray-50/50">
        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors text-[15px]"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-black text-white px-6 py-3 rounded-xl flex items-center space-x-2 hover:bg-black/90 transition-colors"
            disabled={loading}
          >
            <span className="text-[15px]">Send</span>
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
      </form>
    </div>
  )
}