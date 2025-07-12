"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, X, Calendar, MessageSquare, Sparkles } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { useIsMobile } from "@/hooks/use-mobile"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { initEmailJS } from "@/lib/email-service"

interface Message {
  role: "user" | "assistant"
  content: string
  id?: string
  timestamp?: Date
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [pendingAppointment, setPendingAppointment] = useState<any>(null)
  const [showChat, setShowChat] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const isMobile = useIsMobile()

  // Generate unique ID for messages
  const generateMessageId = () => `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Initialize EmailJS and add welcome message when component mounts
  useEffect(() => {
    // Initialize EmailJS
    try {
      initEmailJS();
      console.log('EmailJS initialized successfully');
    } catch (error) {
      console.error('Failed to initialize EmailJS:', error);
    }

    if (messages.length === 0) {
      const welcomeMessage: Message = {
        role: "assistant" as const,
        content: "👋 Hi there! I'm Kedhareswer's enhanced virtual assistant. I can help you learn about his background, schedule appointments, and answer any questions. How can I assist you today?",
        id: generateMessageId(),
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const startTime = Date.now()
    const userMessage: Message = { 
      role: "user" as const, 
      content: input,
      id: generateMessageId(),
      timestamp: new Date()
    }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setLoading(true)

    try {
      // Convert messages to the format expected by the API
      const conversation = updatedMessages
        .filter((msg): msg is Message => 
          msg.role === 'user' || msg.role === 'assistant'
        )
        .map(({ role, content }) => ({ role, content }))
      // Check if the message is about booking an appointment
      if (
        input.toLowerCase().includes("appointment") ||
        input.toLowerCase().includes("book") ||
        input.toLowerCase().includes("schedule") ||
        input.toLowerCase().includes("meet")
      ) {
        const responseTime = Date.now() - startTime
        const assistantMessage: Message = {
          role: "assistant" as const,
          content:
            "I'd be happy to help you schedule an appointment with Kedhareswer! 🎥\n\n**Required Information:**\n1. Your name\n2. Contact information (email or phone)\n3. Subject or purpose of the meeting\n4. Preferred date (YYYY-MM-DD)\n5. Preferred time\n6. Your timezone\n\nPlease share your details, and I'll take care of everything!",
          id: generateMessageId(),
          timestamp: new Date()
        }
        setMessages((prev) => [...prev, assistantMessage])
      } else {
        // Process with our secure API endpoint
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            message: input,
            conversation: conversation.slice(0, -1), // Exclude the current user message
          }),
        })

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Groq API Error:", errorData);
          throw new Error(`Failed to get response: ${response.status} ${response.statusText}`);
        }

        const data = await response.json()
        const responseTime = Date.now() - startTime
        const assistantMessage: Message = { 
          role: "assistant" as const, 
          content: data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again.",
          id: generateMessageId(),
          timestamp: new Date()
        }
        setMessages((prev) => [...prev, assistantMessage])
      }
    } catch (error) {
      console.error("Chat Error:", error);
      const responseTime = Date.now() - startTime
      
      let errorMessage = "I'm sorry, I'm currently unable to process your request. "
        + "The AI assistant feature is temporarily unavailable. "
        + "Please try again later or contact me directly through other means.";
      
      // More specific error message for API key issues
      if (error instanceof Error && error.message.includes('GROQ_API_KEY')) {
        errorMessage = "I'm sorry, the AI assistant feature is not properly configured. "
          + "Please contact the website administrator to enable this feature.";
      }
      
      const errorAssistantMessage: Message = { 
        role: "assistant" as const, 
        content: errorMessage,
        id: generateMessageId(),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorAssistantMessage]);
    } finally {
      setLoading(false);
    }
  }

  // Function to parse appointment details from user message
  useEffect(() => {
    const lastUserMessage = messages[messages.length - 2]
    const lastAssistantMessage = messages[messages.length - 1]

    if (
      lastUserMessage?.role === "user" &&
      lastAssistantMessage?.role === "assistant" &&
      lastAssistantMessage.content.includes("schedule an appointment")
    ) {
      // Wait for the next user message with appointment details
      const handleNextMessage = (newMessages: typeof messages) => {
        const newestMessage = newMessages[newMessages.length - 1]
        if (newestMessage?.role === "user") {
          try {
            // Simple parsing logic - this could be more sophisticated
            const lines = newestMessage.content.split("\n")
            if (lines.length >= 4) {
              const appointmentData: any = {}

              // Extract name
              const nameMatch = newestMessage.content.match(/name:?\s*([^\n]+)/i) || lines[0].match(/([\w\s]+)/)
              if (nameMatch) appointmentData.name = nameMatch[1].trim()

              // Extract contact
              const contactMatch =
                newestMessage.content.match(/contact:?\s*([^\n]+)/i) ||
                newestMessage.content.match(/email:?\s*([^\n]+)/i) ||
                newestMessage.content.match(/phone:?\s*([^\n]+)/i) ||
                lines.find((line) => line.includes("@") || line.match(/\d{10}/))
              if (contactMatch)
                appointmentData.contact =
                  typeof contactMatch === "string" ? contactMatch.trim() : contactMatch[1].trim()

              // Extract subject
              const subjectMatch =
                newestMessage.content.match(/subject:?\s*([^\n]+)/i) ||
                newestMessage.content.match(/purpose:?\s*([^\n]+)/i) ||
                newestMessage.content.match(/regarding:?\s*([^\n]+)/i)
              if (subjectMatch) appointmentData.subject = subjectMatch[1].trim()

              // Extract date
              const dateMatch =
                newestMessage.content.match(/date:?\s*([^\n]+)/i) || newestMessage.content.match(/(\d{4}-\d{2}-\d{2})/)
              if (dateMatch) appointmentData.date = dateMatch[1].trim()

              // Extract time
              const timeMatch =
                newestMessage.content.match(/time:?\s*([^\n]+)/i) ||
                newestMessage.content.match(/(\d{1,2}:\d{2}\s*[ap]m)/i)
              if (timeMatch) appointmentData.time = timeMatch[1].trim()

              // Extract timezone
              const timezoneMatch =
                newestMessage.content.match(/timezone:?\s*([^\n]+)/i) ||
                newestMessage.content.match(/(GMT[+-]\d+|[A-Z]{3,4})/i)
              if (timezoneMatch) appointmentData.timezone = timezoneMatch[1].trim()

              // Extract duration (optional)
              const durationMatch =
                newestMessage.content.match(/duration:?\s*(\d+)\s*minutes?/i) ||
                newestMessage.content.match(/(\d+)\s*minutes?\s*meeting/i) ||
                newestMessage.content.match(/(\d+)\s*mins?/i)
              if (durationMatch) appointmentData.duration = parseInt(durationMatch[1])

              // Validate appointment data
              if (appointmentData.name && appointmentData.contact && appointmentData.subject && appointmentData.date) {
                setPendingAppointment(appointmentData)
                setShowConfirmation(true)
                return
              }
            }

            // If we couldn't parse the appointment details
            const followUpMessage: Message = {
              role: "assistant" as const,
              content:
                "I couldn't fully understand the appointment details. Please provide your information in this format:\n\nName: Your Name\nContact: your.email@example.com\nSubject: Brief description\nDate: YYYY-MM-DD\nTime: HH:MM AM/PM\nTimezone: Your timezone (e.g., EST, GMT+1)",
              id: generateMessageId(),
              timestamp: new Date()
            }
            setMessages((prev) => [...prev, followUpMessage])
          } catch (error) {
            console.error("Error parsing appointment:", error)
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
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pendingAppointment),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        // Successful appointment with emails sent
        const confirmationMessage: Message = {
          role: "assistant" as const,
          content: `Great! Your appointment has been scheduled successfully. Here are the details:\n\n📅 **Appointment Details:**\n• **Name:** ${pendingAppointment.name}\n• **Contact:** ${pendingAppointment.contact}\n• **Subject:** ${pendingAppointment.subject}\n• **Date:** ${pendingAppointment.date}\n• **Time:** ${pendingAppointment.time}\n• **Timezone:** ${pendingAppointment.timezone}\n• **Duration:** ${pendingAppointment.duration || 60} minutes\n• **Platform:** ${pendingAppointment.meeting_platform === 'zoom' ? 'Zoom' : 'Google Meet'}\n\n🎥 **Video Meeting:**\n• Meeting link and details included in your email\n• Calendar invitation available\n• Join instructions provided\n\n✅ **Confirmation emails sent to:**\n• You (${pendingAppointment.contact})\n• Kedhareswer (kedhareswer.12110626@gmail.com)\n\n📧 **Check your email for:**\n• Video meeting link\n• Calendar invitation\n• Meeting agenda\n• Join instructions\n\nKedhareswer will respond within 24-48 hours to confirm. Thank you!`,
          id: generateMessageId(),
          timestamp: new Date()
        }
        setMessages((prev) => [...prev, confirmationMessage])

        toast({
          title: "Success",
          description: "Appointment scheduled and confirmation emails sent!",
          variant: "default",
        })
      } else if (response.status === 207 && result.data) {
        // Partial success - appointment received but email issues
        const { emailStatus } = result.data;
        const confirmationMessage: Message = {
          role: "assistant" as const,
          content: `Your appointment request has been received! Here are the details:\n\n📅 **Appointment Details:**\n• **Name:** ${pendingAppointment.name}\n• **Contact:** ${pendingAppointment.contact}\n• **Subject:** ${pendingAppointment.subject}\n• **Date:** ${pendingAppointment.date}\n• **Time:** ${pendingAppointment.time}\n• **Timezone:** ${pendingAppointment.timezone}\n\n📧 **Email Status:**\n• Your confirmation: ${emailStatus.userEmail ? '✅ Sent' : '❌ Failed'}\n• Owner notification: ${emailStatus.ownerEmail ? '✅ Sent' : '❌ Failed'}\n\n${result.message}\n\nFor direct contact: kedhareswer.12110626@gmail.com`,
          id: generateMessageId(),
          timestamp: new Date()
        }
        setMessages((prev) => [...prev, confirmationMessage])

        toast({
          title: "Appointment Received",
          description: result.message,
          variant: "default",
        })
      } else {
        // Error case
        throw new Error(result.message || result.error || "Failed to schedule appointment")
      }
    } catch (error) {
      console.error("Error scheduling appointment:", error)
      const errorMessage: Message = {
        role: "assistant" as const,
        content: `Sorry, there was an error processing your appointment request. Please try one of these alternatives:\n\n📧 **Direct Email:** kedhareswer.12110626@gmail.com\n📞 **Phone:** +91-9398911432\n\nPlease include the following details in your direct message:\n• Your name and contact information\n• Subject: ${pendingAppointment.subject}\n• Preferred date and time: ${pendingAppointment.date} at ${pendingAppointment.time} (${pendingAppointment.timezone})\n\nThank you for your understanding!`,
        id: generateMessageId(),
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, errorMessage])

      toast({
        title: "Error",
        description: "Failed to schedule appointment. Please contact directly.",
        variant: "destructive",
      })
    }

    setShowConfirmation(false)
    setPendingAppointment(null)
    setLoading(false)
  }

  const quickReplies = [
    "Book an appointment with Kedhareswer",
    "Tell me about his experience",
    "What are his skills?",
    "Show me his projects"
  ]

  // Chat toggle animation variants
  const chatButtonVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        type: "spring" as const, 
        stiffness: 300, 
        damping: 20 
      } 
    },
    hover: { 
      scale: 1.05, 
      transition: { 
        duration: 0.2 
      } 
    },
    tap: { 
      scale: 0.95 
    },
  }

  const chatContainerVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 25,
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: { 
        duration: 0.2 
      },
    },
  }

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring" as const, 
        stiffness: 300, 
        damping: 25 
      } 
    },
  }

  return (
    <>
      {/* Appointment Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="w-[95vw] max-w-sm mx-auto bg-white border border-zinc-200 shadow-lg rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-base font-medium">Confirm Appointment</DialogTitle>
          </DialogHeader>
          <div className="p-4 space-y-3">
            <p className="text-sm text-zinc-600">Please confirm your appointment details:</p>
            {pendingAppointment && (
              <div className="space-y-1 bg-zinc-50 p-3 rounded-lg border border-zinc-100">
                <p className="text-sm">
                  <span className="font-medium text-zinc-800">Name:</span>{" "}
                  <span className="text-zinc-600">{pendingAppointment.name}</span>
                </p>
                <p className="text-sm">
                  <span className="font-medium text-zinc-800">Contact:</span>{" "}
                  <span className="text-zinc-600">{pendingAppointment.contact}</span>
                </p>
                <p className="text-sm">
                  <span className="font-medium text-zinc-800">Subject:</span>{" "}
                  <span className="text-zinc-600">{pendingAppointment.subject}</span>
                </p>
                <p className="text-sm">
                  <span className="font-medium text-zinc-800">Date:</span>{" "}
                  <span className="text-zinc-600">{pendingAppointment.date}</span>
                </p>
                <p className="text-sm">
                  <span className="font-medium text-zinc-800">Time:</span>{" "}
                  <span className="text-zinc-600">{pendingAppointment.time}</span>
                </p>
                <p className="text-sm">
                  <span className="font-medium text-zinc-800">Timezone:</span>{" "}
                  <span className="text-zinc-600">{pendingAppointment.timezone}</span>
                </p>
              </div>
            )}
            <div className="flex justify-end space-x-2 pt-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-sm font-medium text-zinc-700 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAppointment}
                className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-zinc-800 transition-colors flex items-center gap-2"
              >
                <span>Confirm</span>
                <Calendar className="w-3 h-3" />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Chat Toggle Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors ${showChat ? "bg-zinc-800 text-white" : "bg-black text-white"}`}
        aria-label={showChat ? "Close chat" : "Open chat"}
      >
        {showChat ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
      </button>

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
            <div
              ref={chatRef}
              className="w-full h-full flex flex-col bg-white rounded-lg shadow-lg border border-zinc-200 overflow-hidden"
            >
              {/* Chat Header */}
              <div className="p-3 border-b border-zinc-200 bg-zinc-50">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white">
                    <Sparkles className="w-3 h-3" />
                    </div>
                    <div>
                    <h3 className="text-sm font-medium text-zinc-900">Enhanced Assistant</h3>
                      <p className="text-xs text-zinc-500">
                        {messages.length > 1 ? `${messages.length - 1} messages` : 'Ask me anything about Kedhareswer'}
                      </p>
                  </div>
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-[400px]">
                <AnimatePresence initial={false}>
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      {message.role === "assistant" && (
                        <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-700 mr-2 border border-zinc-200">
                          <Sparkles className="w-3 h-3" />
                        </div>
                      )}
                      <div className="max-w-[80%]">
                        <div className={`rounded-lg p-3 text-sm ${
                            message.role === "user"
                            ? "bg-black text-white"
                            : "bg-zinc-100 border border-zinc-200 text-zinc-800"
                        }`}>
                          <div className="prose prose-xs max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-headings:my-1 prose-headings:font-medium prose-code:bg-zinc-200 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                code({node, className, children, ...props}: any) {
                                  const match = className ? /language-(\w+)/.exec(className) : null;
                                  const inline = props.inline;
                                  
                                  if (inline || !match) {
                                    return (
                                      <code className={className} {...props}>
                                        {children}
                                      </code>
                                    );
                                  }
                                  
                                  return (
                                    <SyntaxHighlighter
                                      style={oneDark}
                                      language={match[1]}
                                      PreTag="div"
                                      className="text-sm rounded-lg"
                                      {...props}
                                    >
                                      {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                  )
                                },
                                ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-1" {...props} />,
                                ol: ({node, ...props}) => <ol className="list-decimal pl-5 space-y-1" {...props} />,
                                li: ({node, ...props}) => <li className="pl-1" {...props} />,
                                a: ({node, ...props}) => <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                                h1: ({node, ...props}) => <h3 className="text-xl font-semibold" {...props} />,
                                h2: ({node, ...props}) => <h4 className="text-lg font-semibold" {...props} />,
                                h3: ({node, ...props}) => <h5 className="text-base font-semibold" {...props} />,
                                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-zinc-300 pl-3 italic text-zinc-600 my-2" {...props} />,
                                table: ({node, ...props}) => <div className="overflow-x-auto"><table className="min-w-full border-collapse border border-zinc-200" {...props} /></div>,
                                th: ({node, ...props}) => <th className="border border-zinc-200 px-3 py-2 text-left bg-zinc-50 font-semibold" {...props} />,
                                td: ({node, ...props}) => <td className="border border-zinc-200 px-3 py-2" {...props} />,
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          </div>
                        </div>
                      </div>
                      {message.role === "user" && (
                        <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white ml-2">
                          <span className="text-xs font-medium">U</span>
                        </div>
                      )}
                    </div>
                  ))}
                </AnimatePresence>

                {/* Loading Indicator */}
                {loading && (
                  <div className="flex justify-start">
                    <div className="flex items-center space-x-2 bg-zinc-100 rounded-lg p-3 border border-zinc-200">
                      <div className="flex space-x-1">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse"
                            style={{ animationDelay: `${i * 0.2}s` }}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-zinc-500">Thinking...</span>
                    </div>
                  </div>
                )}

                {/* Invisible div for auto-scrolling */}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {messages.length <= 1 && (
                <div className="px-3 py-2 border-t border-zinc-200 bg-zinc-50">
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => setInput(reply)}
                        className="text-xs bg-white border border-zinc-200 rounded-full px-3 py-1 text-zinc-700 hover:bg-zinc-50 transition-colors"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="border-t border-zinc-200 p-3 bg-white">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-400 transition-colors"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    className="bg-black text-white p-2 rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading || !input.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
