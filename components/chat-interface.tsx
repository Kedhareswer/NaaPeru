"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, X, Calendar, ArrowRight, MessageSquare, Sparkles, Search, ThumbsUp, ThumbsDown, Copy, MoreVertical, Settings } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { useIsMobile } from "@/hooks/use-mobile"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { initEmailJS } from "@/lib/email-service"

// Enhanced message interface with metadata
interface EnhancedMessage {
  role: "user" | "assistant"
  content: string
  id?: string
  timestamp?: Date
  feedback?: 'positive' | 'negative' | null
  responseTime?: number
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<EnhancedMessage[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [pendingAppointment, setPendingAppointment] = useState<any>(null)
  const [showChat, setShowChat] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [conversationMode, setConversationMode] = useState<'standard' | 'detailed' | 'creative'>('standard')
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

  // Message feedback handling
  const handleMessageFeedback = (messageId: string, feedback: 'positive' | 'negative') => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, feedback }
        : msg
    ))
    
    toast({
      title: "Feedback Received",
      description: `Thank you for your ${feedback} feedback! This helps improve responses.`,
    })
  }

  // Copy message content
  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    toast({
      title: "Copied",
      description: "Message copied to clipboard",
    })
  }

  // Search functionality
  const filteredMessages = searchQuery 
    ? messages.filter(msg => 
        msg.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages

  // Export conversation functionality
  const exportConversation = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      totalMessages: messages.length,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp,
        feedback: msg.feedback,
        responseTime: msg.responseTime
      }))
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `kedhareswer_conversation_${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    
    toast({
      title: "Conversation Exported",
      description: "Your conversation has been downloaded as a JSON file.",
    })
  }

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
      const welcomeMessage: EnhancedMessage = {
        role: "assistant" as const,
        content: "👋 Hi there! I'm Kedhareswer's enhanced virtual assistant. I can help you learn about his background, schedule appointments, and answer any questions. How can I assist you today?",
        id: generateMessageId(),
        timestamp: new Date(),
        feedback: null
      }
      setMessages([welcomeMessage])
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const startTime = Date.now()
    const userMessage: EnhancedMessage = { 
      role: "user" as const, 
      content: input,
      id: generateMessageId(),
      timestamp: new Date(),
      feedback: null
    }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setLoading(true)

    try {
      // Convert messages to the format expected by the API
      const conversation = updatedMessages
        .filter((msg): msg is EnhancedMessage => 
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
        const assistantMessage: EnhancedMessage = {
          role: "assistant" as const,
          content:
            "I'd be happy to help you schedule an appointment with Kedhareswer! 🎥 I'll automatically create a video meeting link for your convenience.\n\n**Required Information:**\n1. **Your name**\n2. **Contact information** (email or phone)\n3. **Subject or purpose** of the meeting\n4. **Preferred date** (YYYY-MM-DD)\n5. **Preferred time**\n6. **Your timezone**\n\n**Optional Information:**\n7. **Meeting duration** (default: 60 minutes)\n8. **Video platform preference** (Google Meet or Zoom - default: Google Meet)\n\n💡 **What I'll provide:**\n• Video meeting link (Google Meet or Zoom)\n• Calendar invitation link\n• Email confirmations to both parties\n• Meeting agenda and instructions\n\nPlease share your details, and I'll take care of everything!",
          id: generateMessageId(),
          timestamp: new Date(),
          feedback: null,
          responseTime
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
            mode: conversationMode
          }),
        })

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Groq API Error:", errorData);
          throw new Error(`Failed to get response: ${response.status} ${response.statusText}`);
        }

        const data = await response.json()
        const responseTime = Date.now() - startTime
        const assistantMessage: EnhancedMessage = { 
          role: "assistant" as const, 
          content: data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again.",
          id: generateMessageId(),
          timestamp: new Date(),
          feedback: null,
          responseTime
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
      
      const errorAssistantMessage: EnhancedMessage = { 
        role: "assistant" as const, 
        content: errorMessage,
        id: generateMessageId(),
        timestamp: new Date(),
        feedback: null,
        responseTime
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

              // Extract meeting platform preference (optional)
              const platformMatch =
                newestMessage.content.match(/platform:?\s*(google\s*meet|zoom)/i) ||
                newestMessage.content.match(/(google\s*meet|zoom)/i)
              if (platformMatch) {
                const platform = platformMatch[1].toLowerCase().replace(/\s+/g, '-')
                if (platform === 'google-meet' || platform === 'zoom') {
                  appointmentData.meeting_platform = platform
                }
              }

              // Validate appointment data
              if (appointmentData.name && appointmentData.contact && appointmentData.subject && appointmentData.date) {
                setPendingAppointment(appointmentData)
                setShowConfirmation(true)
                return
              }
            }

            // If we couldn't parse the appointment details
            const followUpMessage = {
              role: "assistant" as const,
              content:
                "I couldn't fully understand the appointment details. Please provide your information in this format:\n\n**Required:**\nName: Your Name\nContact: your.email@example.com or phone number\nSubject: Brief description of meeting purpose\nDate: YYYY-MM-DD\nTime: HH:MM AM/PM\nTimezone: Your timezone (e.g., EST, GMT+1)\n\n**Optional:**\nDuration: 60 minutes (or your preference)\nPlatform: Google Meet or Zoom\n\n💡 I'll create the video meeting link and send invitations automatically!",
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
        const confirmationMessage: EnhancedMessage = {
          role: "assistant" as const,
          content: `Great! Your appointment has been scheduled successfully. Here are the details:\n\n📅 **Appointment Details:**\n• **Name:** ${pendingAppointment.name}\n• **Contact:** ${pendingAppointment.contact}\n• **Subject:** ${pendingAppointment.subject}\n• **Date:** ${pendingAppointment.date}\n• **Time:** ${pendingAppointment.time}\n• **Timezone:** ${pendingAppointment.timezone}\n• **Duration:** ${pendingAppointment.duration || 60} minutes\n• **Platform:** ${pendingAppointment.meeting_platform === 'zoom' ? 'Zoom' : 'Google Meet'}\n\n🎥 **Video Meeting:**\n• Meeting link and details included in your email\n• Calendar invitation available\n• Join instructions provided\n\n✅ **Confirmation emails sent to:**\n• You (${pendingAppointment.contact})\n• Kedhareswer (kedhareswer.12110626@gmail.com)\n\n📧 **Check your email for:**\n• Video meeting link\n• Calendar invitation\n• Meeting agenda\n• Join instructions\n\nKedhareswer will respond within 24-48 hours to confirm. Thank you!`,
          id: generateMessageId(),
          timestamp: new Date(),
          feedback: null
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
        const confirmationMessage: EnhancedMessage = {
          role: "assistant" as const,
          content: `Your appointment request has been received! Here are the details:\n\n📅 **Appointment Details:**\n• **Name:** ${pendingAppointment.name}\n• **Contact:** ${pendingAppointment.contact}\n• **Subject:** ${pendingAppointment.subject}\n• **Date:** ${pendingAppointment.date}\n• **Time:** ${pendingAppointment.time}\n• **Timezone:** ${pendingAppointment.timezone}\n\n📧 **Email Status:**\n• Your confirmation: ${emailStatus.userEmail ? '✅ Sent' : '❌ Failed'}\n• Owner notification: ${emailStatus.ownerEmail ? '✅ Sent' : '❌ Failed'}\n\n${result.message}\n\nFor direct contact: kedhareswer.12110626@gmail.com`,
          id: generateMessageId(),
          timestamp: new Date(),
          feedback: null
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
      const errorMessage: EnhancedMessage = {
        role: "assistant" as const,
        content: `Sorry, there was an error processing your appointment request. Please try one of these alternatives:\n\n📧 **Direct Email:** kedhareswer.12110626@gmail.com\n📞 **Phone:** +91-9398911432\n\nPlease include the following details in your direct message:\n• Your name and contact information\n• Subject: ${pendingAppointment.subject}\n• Preferred date and time: ${pendingAppointment.date} at ${pendingAppointment.time} (${pendingAppointment.timezone})\n\nThank you for your understanding!`,
        id: generateMessageId(),
        timestamp: new Date(),
        feedback: null
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
    "Explain me his projects",
    "Why is he a suitable candidate for any opportunity"
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
        <DialogContent className="w-[95vw] max-w-md mx-auto bg-white/95 backdrop-blur-md border border-zinc-200 shadow-xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-medium">Confirm Appointment</DialogTitle>
          </DialogHeader>
          <div className="p-4 md:p-6 space-y-4">
            <p className="text-zinc-600">Please confirm your appointment details:</p>
            {pendingAppointment && (
              <div className="space-y-2 bg-zinc-50/80 p-4 rounded-xl border border-zinc-100">
                <p>
                  <span className="font-medium text-zinc-800">Name:</span>{" "}
                  <span className="text-zinc-600">{pendingAppointment.name}</span>
                </p>
                <p>
                  <span className="font-medium text-zinc-800">Contact:</span>{" "}
                  <span className="text-zinc-600">{pendingAppointment.contact}</span>
                </p>
                <p>
                  <span className="font-medium text-zinc-800">Subject:</span>{" "}
                  <span className="text-zinc-600">{pendingAppointment.subject}</span>
                </p>
                <p>
                  <span className="font-medium text-zinc-800">Date:</span>{" "}
                  <span className="text-zinc-600">{pendingAppointment.date}</span>
                </p>
                <p>
                  <span className="font-medium text-zinc-800">Time:</span>{" "}
                  <span className="text-zinc-600">{pendingAppointment.time}</span>
                </p>
                <p>
                  <span className="font-medium text-zinc-800">Timezone:</span>{" "}
                  <span className="text-zinc-600">{pendingAppointment.timezone}</span>
                </p>
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
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${showChat ? "bg-zinc-800 text-white" : "bg-black text-white"}`}
        aria-label={showChat ? "Close chat" : "Open chat"}
      >
        {showChat ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
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
            <div
              ref={chatRef}
              className="w-full h-full flex flex-col bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden"
            >
              {/* Chat Header */}
              <div className="p-4 border-b border-zinc-100 bg-gradient-to-r from-zinc-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-black to-zinc-700 flex items-center justify-center text-white">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-medium text-zinc-900">Enhanced Assistant</h3>
                      <p className="text-xs text-zinc-500">
                        {messages.length > 1 ? `${messages.length - 1} messages` : 'Ask me anything about Kedhareswer'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Header Actions */}
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowSearch(!showSearch)}
                      className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                      title="Search conversation"
                    >
                      <Search className="w-4 h-4 text-zinc-600" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={exportConversation}
                      className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                      title="Export conversation"
                      disabled={messages.length <= 1}
                    >
                      <MoreVertical className="w-4 h-4 text-zinc-600" />
                    </motion.button>
                  </div>
                </div>

                {/* Search Bar */}
                <AnimatePresence>
                  {showSearch && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 pt-3 border-t border-zinc-100"
                    >
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search messages..."
                          className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      {searchQuery && (
                        <p className="text-xs text-zinc-500 mt-2">
                          {filteredMessages.length} of {messages.length} messages match
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-transparent hover:scrollbar-thumb-zinc-300 transition-colors">
                <AnimatePresence initial={false}>
                  {filteredMessages.map((message, index) => (
                    <motion.div
                      key={index}
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.role === "assistant" && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 flex items-center justify-center text-zinc-700 mr-2 shadow-sm border border-zinc-100">
                          <Sparkles className="w-4 h-4" />
                        </div>
                      )}
                      <div className="relative group max-w-[80%]">
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          className={`rounded-2xl p-4 min-h-[44px] ${
                            message.role === "user"
                              ? "bg-gradient-to-br from-black to-zinc-800 text-white shadow-lg"
                              : "bg-zinc-100/90 border border-zinc-200 text-zinc-800 shadow-sm"
                          }`}
                        >
                          <div className="prose prose-sm max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-ol:my-1.5 prose-headings:my-2 prose-headings:font-medium prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-zinc-100 prose-pre:p-3 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-blockquote:border-l-4 prose-blockquote:border-zinc-300 prose-blockquote:pl-3 prose-blockquote:italic prose-blockquote:text-zinc-600 prose-blockquote:my-2">
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
                                      style={oneDark as any}
                                      language={match[1]}
                                      PreTag="div"
                                      customStyle={{
                                        margin: 0,
                                        backgroundColor: 'rgb(244, 244, 245)',
                                        fontSize: '0.875rem',
                                        lineHeight: '1.25rem',
                                        borderRadius: '0.5rem'
                                      }}
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
                        </motion.div>

                        {/* Message Actions */}
                        {message.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`absolute ${
                              message.role === "user" ? "left-0" : "right-0"
                            } -bottom-8 flex items-center gap-1 bg-white border border-zinc-200 rounded-lg px-2 py-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
                          >
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => copyMessage(message.content)}
                              className="p-1 hover:bg-zinc-100 rounded transition-colors"
                              title="Copy message"
                            >
                              <Copy className="w-3 h-3 text-zinc-500" />
                            </motion.button>
                            
                            {message.role === "assistant" && (
                              <>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleMessageFeedback(message.id!, 'positive')}
                                  className={`p-1 hover:bg-zinc-100 rounded transition-colors ${
                                    message.feedback === 'positive' ? 'text-green-600' : 'text-zinc-500'
                                  }`}
                                  title="Good response"
                                >
                                  <ThumbsUp className="w-3 h-3" />
                                </motion.button>
                                
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleMessageFeedback(message.id!, 'negative')}
                                  className={`p-1 hover:bg-zinc-100 rounded transition-colors ${
                                    message.feedback === 'negative' ? 'text-red-600' : 'text-zinc-500'
                                  }`}
                                  title="Poor response"
                                >
                                  <ThumbsDown className="w-3 h-3" />
                                </motion.button>
                              </>
                            )}
                            
                            {/* Response time indicator */}
                            {message.responseTime && (
                              <span className="text-[10px] text-zinc-400 ml-1">
                                {message.responseTime}ms
                              </span>
                            )}
                          </motion.div>
                        )}
                      </div>
                      {message.role === "user" && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-black flex items-center justify-center text-white ml-2 shadow-sm">
                          <span className="text-xs font-medium">You</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Loading Indicator */}
                {loading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="flex items-center space-x-2 bg-zinc-100 rounded-2xl p-4 border border-zinc-200 shadow-sm">
                      <div className="flex space-x-1.5">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.4, 1, 0.4],
                              y: [0, -3, 0],
                            }}
                            transition={{
                              repeat: Number.POSITIVE_INFINITY,
                              duration: 1.2,
                              delay: i * 0.2,
                              ease: "easeInOut",
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
