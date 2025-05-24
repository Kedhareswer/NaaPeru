"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, X, Calendar, ArrowRight, MessageSquare, Sparkles } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { useMediaQuery } from "@/hooks/use-mobile"

export default function ChatInterface() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [pendingAppointment, setPendingAppointment] = useState<any>(null)
  const [showChat, setShowChat] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Add welcome message when component mounts
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = {
        role: 'assistant' as const,
        content: "👋 Hi there! I'm Kedhareswer's virtual assistant. How can I help you today? You can ask me about his projects, skills, or schedule an appointment."
      }
      setMessages([welcomeMessage])
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = { role: 'user' as const, content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      // Check if the message is about booking an appointment
      if (input.toLowerCase().includes('appointment') || input.toLowerCase().includes('book') || input.toLowerCase().includes('schedule') || input.toLowerCase().includes('meet')) {
        const assistantMessage = {
          role: 'assistant' as const,
          content: "I'd be happy to help you schedule an appointment with Kedhareswer. Please provide the following details:\n\n1. Your name\n2. Contact information (email or phone)\n3. Subject or purpose of the meeting\n4. Preferred date (YYYY-MM-DD)\n5. Preferred time\n6. Your timezone"
        }
        setMessages(prev => [...prev, assistantMessage])
      } else {
        // Process with Gemini API
        const response = await fetch('/api/gemini', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: input })
        })

        if (!response.ok) {
          throw new Error('Failed to get response')
        }

        const data = await response.json()
        const assistantMessage = { role: 'assistant' as const, content: data.response }
        setMessages(prev => [...prev, assistantMessage])
      }
    } catch (error) {
      console.error('Error:', error)
      const errorMessage = {
        role: 'assistant' as const,
        content: "I'm sorry, I encountered an error processing your request. Please try again later."
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  // Function to parse appointment details from user message
  useEffect(() => {
    const lastUserMessage = messages[messages.length - 2]
    const lastAssistantMessage = messages[messages.length - 1]

    if (
      lastUserMessage?.role === 'user' &&
      lastAssistantMessage?.role === 'assistant' &&
      lastAssistantMessage.content.includes('schedule an appointment')
    ) {
      // Wait for the next user message with appointment details
      const handleNextMessage = (newMessages: typeof messages) => {
        const newestMessage = newMessages[newMessages.length - 1]
        if (newestMessage?.role === 'user') {
          try {
            // Simple parsing logic - this could be more sophisticated
            const lines = newestMessage.content.split('\n')
            if (lines.length >= 4) {
              const appointmentData: any = {}
              
              // Extract name
              const nameMatch = newestMessage.content.match(/name:?\s*([^\n]+)/i) || 
                               lines[0].match(/([\w\s]+)/) 
              if (nameMatch) appointmentData.name = nameMatch[1].trim()
              
              // Extract contact
              const contactMatch = newestMessage.content.match(/contact:?\s*([^\n]+)/i) ||
                                 newestMessage.content.match(/email:?\s*([^\n]+)/i) ||
                                 newestMessage.content.match(/phone:?\s*([^\n]+)/i) ||
                                 lines.find(line => line.includes('@') || line.match(/\d{10}/))
              if (contactMatch) appointmentData.contact = typeof contactMatch === 'string' ? contactMatch.trim() : contactMatch[1].trim()
              
              // Extract subject
              const subjectMatch = newestMessage.content.match(/subject:?\s*([^\n]+)/i) ||
                                 newestMessage.content.match(/purpose:?\s*([^\n]+)/i) ||
                                 newestMessage.content.match(/regarding:?\s*([^\n]+)/i)
              if (subjectMatch) appointmentData.subject = subjectMatch[1].trim()
              
              // Extract date
              const dateMatch = newestMessage.content.match(/date:?\s*([^\n]+)/i) ||
                              newestMessage.content.match(/(\d{4}-\d{2}-\d{2})/)
              if (dateMatch) appointmentData.date = dateMatch[1].trim()
              
              // Extract time
              const timeMatch = newestMessage.content.match(/time:?\s*([^\n]+)/i) ||
                              newestMessage.content.match(/(\d{1,2}:\d{2}\s*[ap]m)/i)
              if (timeMatch) appointmentData.time = timeMatch[1].trim()
              
              // Extract timezone
              const timezoneMatch = newestMessage.content.match(/timezone:?\s*([^\n]+)/i) ||
                                  newestMessage.content.match(/(GMT[+-]\d+|[A-Z]{3,4})/i)
              if (timezoneMatch) appointmentData.timezone = timezoneMatch[1].trim()
              
              // Validate appointment data
              if (appointmentData.name && appointmentData.contact && appointmentData.subject && appointmentData.date) {
                setPendingAppointment(appointmentData)
                setShowConfirmation(true)
                return
              }
            }
            
            // If we couldn't parse the appointment details
            const followUpMessage = {
              role: 'assistant' as const,
              content: "I couldn't fully understand the appointment details. Please provide your information in this format:\n\nName: Your Name\nContact: your.email@example.com or phone number\nSubject: Brief description of meeting purpose\nDate: YYYY-MM-DD\nTime: HH:MM AM/PM\nTimezone: Your timezone (e.g., EST, GMT+1)"
            }
            setMessages(prev => [...prev, followUpMessage])
          } catch (error) {
            console.error('Error parsing appointment:', error)
          }
        }
      }

      // Set up a one-time effect to handle the next message
      const unsubscribe = () => {
        handleNextMessage(messages)
      }

      // Clean up the effect when component unmounts or when messages change
      return unsubscribe
    }
  }, [messages])

  const handleConfirmAppointment = async () => {
    setLoading(true)

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

  // Chat toggle animation variants
  const chatButtonVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  }

  const chatContainerVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25,
        delayChildren: 0.2,
        staggerChildren: 0.1
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: 20,
      transition: { duration: 0.2 } 
    }
  }

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
  }

  return (
    <>
      {/* Appointment Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="w-[95vw] max-w-md mx-auto bg-white/95 backdrop-blur-md border border-zinc-200 shadow-xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-medium">Confirm Appointment</DialogTitle>
          </DialogHeader>
          <div className="p-4 md:p-6 space-y-4">
            <p className="text-zinc-600">Please confirm your appointment details:</p>
            {pendingAppointment && (
              <div className="space-y-2 bg-zinc-50/80 p-4 rounded-xl border border-zinc-100">
                <p><span className="font-medium text-zinc-800">Name:</span> <span className="text-zinc-600">{pendingAppointment.name}</span></p>
                <p><span className="font-medium text-zinc-800">Contact:</span> <span className="text-zinc-600">{pendingAppointment.contact}</span></p>
                <p><span className="font-medium text-zinc-800">Subject:</span> <span className="text-zinc-600">{pendingAppointment.subject}</span></p>
                <p><span className="font-medium text-zinc-800">Date:</span> <span className="text-zinc-600">{pendingAppointment.date}</span></p>
                <p><span className="font-medium text-zinc-800">Time:</span> <span className="text-zinc-600">{pendingAppointment.time}</span></p>
                <p><span className="font-medium text-zinc-800">Timezone:</span> <span className="text-zinc-600">{pendingAppointment.timezone}</span></p>
              </div>
            )}
            <div className="flex justify-end space-x-3 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowConfirmation(false)}
                className="min-h-[44px] min-w-[80px] px-5 py-3 text-sm font-medium text-zinc-700 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 hover:border-zinc-300 transition-all duration-200 shadow-sm"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirmAppointment}
                className="min-h-[44px] min-w-[80px] px-5 py-3 text-sm font-medium text-white bg-gradient-to-r from-black to-zinc-800 rounded-xl hover:from-zinc-900 hover:to-black transition-all duration-200 shadow-md flex items-center justify-center gap-2"
              >
                <span>Confirm</span>
                <Calendar className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Chat Toggle Button */}
      <motion.button
        variants={chatButtonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        onClick={() => setShowChat(!showChat)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${showChat ? 'bg-zinc-800 text-white' : 'bg-black text-white'}`}
        aria-label={showChat ? "Close chat" : "Open chat"}
      >
        {showChat ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
        <span className="sr-only">{showChat ? "Close chat" : "Open chat"}</span>
      </motion.button>

      {/* Chat Interface */}
      <AnimatePresence>
        {showChat && (
          <motion.div 
            className="fixed bottom-24 right-6 z-40 w-[95vw] sm:w-[400px] md:w-[450px] max-h-[600px] flex flex-col"
            variants={chatContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div ref={chatRef} className="w-full h-full flex flex-col bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden">
              {/* Chat Header */}
              <div className="p-4 border-b border-zinc-100 bg-gradient-to-r from-zinc-50 to-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-black to-zinc-700 flex items-center justify-center text-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-medium text-zinc-900">Virtual Assistant</h3>
                    <p className="text-xs text-zinc-500">Ask me anything about Kedhareswer</p>
                  </div>
                </div>
              </div>
              
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-transparent hover:scrollbar-thumb-zinc-300 transition-colors">
                <AnimatePresence initial={false}>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.role === 'assistant' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 flex items-center justify-center text-zinc-700 mr-2 shadow-sm border border-zinc-100">
                          <Sparkles className="w-4 h-4" />
                        </div>
                      )}
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className={`max-w-[80%] rounded-2xl p-4 min-h-[44px] ${message.role === 'user' ? 
                          'bg-gradient-to-br from-black to-zinc-800 text-white shadow-lg' : 
                          'bg-zinc-100/90 border border-zinc-200 text-zinc-800 shadow-sm'}`}
                      >
                        <p className="text-[15px] leading-relaxed whitespace-pre-line">{message.content}</p>
                      </motion.div>
                      {message.role === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-black flex items-center justify-center text-white ml-2 shadow-sm">
                          <span className="text-xs font-medium">You</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {/* Loading Indicator */}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center space-x-2 bg-zinc-100 rounded-2xl p-4 border border-zinc-200 shadow-sm">
                      <div className="flex space-x-1.5">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ 
                              scale: [1, 1.2, 1], 
                              opacity: [0.4, 1, 0.4],
                              y: [0, -3, 0]
                            }}
                            transition={{ 
                              repeat: Infinity, 
                              duration: 1.2, 
                              delay: i * 0.2, 
                              ease: "easeInOut" 
                            }}
                            className="w-2.5 h-2.5 bg-zinc-400 rounded-full"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-zinc-500">Thinking...</span>
                    </div>
                  </motion.div>
                )}
                
                {/* Invisible div for auto-scrolling */}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Quick Replies */}
              {messages.length < 3 && (
                <div className="px-4 py-3 border-t border-zinc-100 bg-zinc-50/50">
                  <p className="text-xs text-zinc-500 mb-2">Suggested questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((reply, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        type="button"
                        onClick={() => setInput(reply)}
                        className="text-xs px-3 py-2 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-full transition-all duration-200 shadow-sm hover:shadow text-zinc-700 flex items-center gap-1.5"
                      >
                        <span>{reply}</span>
                        <ArrowRight className="w-3 h-3" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Input Form */}
              <form onSubmit={handleSubmit} className="border-t border-zinc-100 p-3 bg-white">
                <div className="flex space-x-2">
                  <motion.input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 min-h-[48px] focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 transition-all duration-200 text-[15px] shadow-sm"
                    disabled={loading}
                    whileFocus={{ scale: 1.01 }}
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-black to-zinc-800 text-white p-3 min-h-[48px] min-w-[48px] rounded-xl flex items-center justify-center hover:from-zinc-800 hover:to-black transition-all duration-200 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={loading || !input.trim()}
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}