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
  contact: string          // Required
  name?: string           // Optional, defaults to "Guest"
  subject?: string        // Optional, defaults to "General Discussion"
  date?: string          // Optional, auto-generated
  time?: string          // Optional, auto-generated
  timezone?: string      // New field for timezone
  preferences?: string   // New field for any special requirements
  status: 'pending' | 'confirmed' | 'cancelled'  // Track appointment status
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [pendingAppointment, setPendingAppointment] = useState<AppointmentData | null>(null)
  const { toast } = useToast()

  // Get user's timezone
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

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
          content: "Please provide your contact information (email or phone number) to schedule an appointment. Other details like name, subject, date and time are optional.",
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
          // Extract contact information and auto-generate other details
          const contact = input.trim()
          const appointmentData: AppointmentData = {
            contact,
            name: 'Guest',
            subject: 'General Discussion',
            date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
            time: '14:00', // 2 PM default
            timezone: userTimezone,
            status: 'pending'
          }
          
          // Validate contact information
          if (!contact.includes('@') && !/^\+?[1-9]\d{1,14}$/.test(contact)) {
            throw new Error('Please provide a valid email or phone number')
          }

          // Set pending appointment and show confirmation dialog
          setPendingAppointment(appointmentData)
          setShowConfirmation(true)
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

  const handleConfirmAppointment = async () => {
    if (!pendingAppointment) return

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pendingAppointment)
      })

      const result = await response.json()

      if (!response.ok) {
        toast({
          title: 'Error',
          description: result.error || 'Failed to schedule appointment',
          variant: 'destructive'
        })
        throw new Error(result.error || 'Failed to schedule appointment')
      }

      const confirmationMessage = {
        role: 'assistant' as const,
        content: `Great! Your appointment has been scheduled. Here are the details:\n\nName: ${pendingAppointment.name}\nContact: ${pendingAppointment.contact}\nSubject: ${pendingAppointment.subject}\nDate: ${pendingAppointment.date}\nTime: ${pendingAppointment.time}\nTimezone: ${pendingAppointment.timezone}\n\nYou will receive a confirmation email shortly.`
      }
      setMessages(prev => [...prev, confirmationMessage])
      
      toast({
        title: 'Success',
        description: 'Appointment scheduled successfully!',
        variant: 'default'
      })
    } catch (error) {
      console.error('Error scheduling appointment:', error)
      const errorMessage = {
        role: 'assistant' as const,
        content: 'Sorry, there was an error scheduling your appointment. Please try again or contact directly via email.'
      }
      setMessages(prev => [...prev, errorMessage])
    }

    setShowConfirmation(false)
    setPendingAppointment(null)
    setLoading(false)
  }

  const quickReplies = [
    'Book an appointment',
    'Tell me about your experience',
    'What are your skills?',
    'Show me your projects'
  ]

  return (
    <>
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Appointment</DialogTitle>
          </DialogHeader>
          <div className="p-4 space-y-4">
            <p>Please confirm your appointment details:</p>
            {pendingAppointment && (
              <div className="space-y-2">
                <p><strong>Name:</strong> {pendingAppointment.name}</p>
                <p><strong>Contact:</strong> {pendingAppointment.contact}</p>
                <p><strong>Subject:</strong> {pendingAppointment.subject}</p>
                <p><strong>Date:</strong> {pendingAppointment.date}</p>
                <p><strong>Time:</strong> {pendingAppointment.time}</p>
                <p><strong>Timezone:</strong> {pendingAppointment.timezone}</p>
              </div>
            )}
            <div className="flex justify-end space-x-2 pt-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAppointment}
                className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-black/90"
              >
                Confirm
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div ref={chatRef} className="w-full max-w-2xl mx-auto bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden border border-gray-100 backdrop-blur-lg">
        <div className="h-[500px] overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-black/10 scrollbar-track-transparent hover:scrollbar-thumb-black/20 transition-colors">
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
              className={`max-w-[80%] rounded-2xl p-4 ${message.role === 'user' ? 'bg-gradient-to-br from-black to-gray-800 text-white shadow-xl ring-1 ring-white/10' : 'bg-white/90 border border-gray-100 shadow-lg ring-1 ring-black/5'} backdrop-blur-md transition-all duration-200 hover:scale-[1.01]`}
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
                  animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                  className="w-2 h-2 bg-black/60 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.2, ease: "easeInOut" }}
                  className="w-2 h-2 bg-black/60 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.4, ease: "easeInOut" }}
                  className="w-2 h-2 bg-black/60 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-gray-50/50">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setInput(reply)}
                className="px-4 py-2 text-sm bg-white/80 hover:bg-black hover:text-white border border-gray-100 rounded-full transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1 backdrop-blur-sm"
              >
                {reply}
              </button>
            ))}
          </div>
          <div className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-white/90 backdrop-blur-md border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition-all duration-300 text-[15px] shadow-md hover:shadow-lg"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-black to-gray-800 text-white px-6 py-3 rounded-xl flex items-center space-x-2 hover:from-gray-800 hover:to-black transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 ring-1 ring-white/10"
              disabled={loading}
            >
              <span className="text-[15px]">Send</span>
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </form>
    </div>
    </>
  )
}