"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Send, X, Calendar, ArrowRight, MessageSquare, Sparkles, 
  Download, Search, RefreshCw, ThumbsUp, ThumbsDown,
  Copy, Share2, Bookmark, Settings, MoreVertical,
  Mic, MicOff, Volume2, VolumeX, Zap, Brain
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { useIsMobile } from "@/hooks/use-mobile"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

// Enhanced message type with metadata
interface EnhancedMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  metadata?: {
    confidence?: number
    sources?: string[]
    responseTime?: number
    feedback?: 'positive' | 'negative'
    bookmarked?: boolean
    category?: string
  }
}

// Conversation analytics
interface ConversationAnalytics {
  totalMessages: number
  averageResponseTime: number
  topTopics: string[]
  userSatisfaction: number
  sessionDuration: number
}

// Enhanced chat settings
interface ChatSettings {
  theme: 'light' | 'dark' | 'auto'
  fontSize: 'small' | 'medium' | 'large'
  soundEnabled: boolean
  voiceEnabled: boolean
  suggestionsEnabled: boolean
  analyticsEnabled: boolean
}

export default function EnhancedChatInterface() {
  // Enhanced state management
  const [messages, setMessages] = useState<EnhancedMessage[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [pendingAppointment, setPendingAppointment] = useState<any>(null)
  const [showChat, setShowChat] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [settings, setSettings] = useState<ChatSettings>({
    theme: 'light',
    fontSize: 'medium',
    soundEnabled: true,
    voiceEnabled: false,
    suggestionsEnabled: true,
    analyticsEnabled: true
  })
  const [analytics, setAnalytics] = useState<ConversationAnalytics>({
    totalMessages: 0,
    averageResponseTime: 0,
    topTopics: [],
    userSatisfaction: 0,
    sessionDuration: 0
  })
  const [showSettings, setShowSettings] = useState(false)
  const [conversationMode, setConversationMode] = useState<'standard' | 'detailed' | 'creative'>('standard')

  // Refs
  const chatRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const sessionStartTime = useRef<Date>(new Date())
  
  const { toast } = useToast()
  const isMobile = useIsMobile()

  // Utility functions
  const generateId = () => `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  const updateAnalytics = useCallback((responseTime?: number) => {
    setAnalytics(prev => ({
      ...prev,
      totalMessages: prev.totalMessages + 1,
      averageResponseTime: responseTime ? 
        (prev.averageResponseTime + responseTime) / 2 : prev.averageResponseTime,
      sessionDuration: Date.now() - sessionStartTime.current.getTime()
    }))
  }, [])

  // Enhanced message handling
  const addMessage = useCallback((message: Omit<EnhancedMessage, 'id' | 'timestamp'>) => {
    const newMessage: EnhancedMessage = {
      ...message,
      id: generateId(),
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
    return newMessage
  }, [])

  // Voice recording functionality
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      
      const audioChunks: Blob[] = []
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data)
      }
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
        // Here you would typically send to speech-to-text API
        // For now, we'll just set a placeholder
        setInput("Voice message transcription would go here...")
      }
      
      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      toast({
        title: "Microphone Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive"
      })
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
      setIsRecording(false)
    }
  }

  // Enhanced submit with analytics and better error handling
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const startTime = Date.now()
    const userMessage = addMessage({ role: "user", content: input })
    setInput("")
    setLoading(true)

    try {
      // Enhanced conversation context
      const conversation = messages
        .filter((msg): msg is EnhancedMessage => 
          msg.role === 'user' || msg.role === 'assistant'
        )
        .map(({ role, content }) => ({ role, content }))

      // Check for appointment booking
      if (
        input.toLowerCase().includes("appointment") ||
        input.toLowerCase().includes("book") ||
        input.toLowerCase().includes("schedule") ||
        input.toLowerCase().includes("meet")
      ) {
        const assistantMessage = addMessage({
          role: "assistant",
          content: "I'd be happy to help you schedule an appointment with Kedhareswer. Please provide the following details:\n\n1. Your name\n2. Contact information (email or phone)\n3. Subject or purpose of the meeting\n4. Preferred date (YYYY-MM-DD)\n5. Preferred time\n6. Your timezone",
          metadata: { category: 'appointment' }
        })
      } else {
        // Enhanced API call with conversation mode
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            message: input,
            conversation: conversation.slice(0, -1),
            mode: conversationMode,
            settings: settings
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          console.error("Chat API Error:", errorData)
          throw new Error(`Failed to get response: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        const responseTime = Date.now() - startTime
        
        const assistantMessage = addMessage({ 
          role: "assistant", 
          content: data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again.",
          metadata: {
            confidence: data.confidence || 0.8,
            sources: data.sources || [],
            responseTime,
            category: data.category || 'general'
          }
        })

        updateAnalytics(responseTime)
      }
    } catch (error) {
      console.error("Chat Error:", error)
      const errorMessage = addMessage({
        role: "assistant",
        content: "I'm sorry, I'm currently unable to process your request. The AI assistant feature is temporarily unavailable. Please try again later or contact me directly through other means.",
        metadata: { category: 'error' }
      })
    } finally {
      setLoading(false)
    }
  }

  // Message feedback handling
  const handleMessageFeedback = (messageId: string, feedback: 'positive' | 'negative') => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, metadata: { ...msg.metadata, feedback } }
        : msg
    ))
    
    // Update satisfaction analytics
    setAnalytics(prev => ({
      ...prev,
      userSatisfaction: feedback === 'positive' ? 
        Math.min(5, prev.userSatisfaction + 0.1) : 
        Math.max(0, prev.userSatisfaction - 0.1)
    }))

    toast({
      title: "Feedback Received",
      description: `Thank you for your ${feedback} feedback!`,
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

  // Bookmark message
  const toggleBookmark = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, metadata: { ...msg.metadata, bookmarked: !msg.metadata?.bookmarked } }
        : msg
    ))
  }

  // Search functionality
  const filteredMessages = searchQuery 
    ? messages.filter(msg => 
        msg.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages

  // Export conversation
  const exportConversation = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      analytics,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp,
        metadata: msg.metadata
      }))
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `conversation_${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Enhanced quick replies with categories
  const quickReplies = {
    general: [
      "Tell me about Kedhareswer's experience",
      "What are his technical skills?",
      "Show me his projects"
    ],
    professional: [
      "Book an appointment",
      "What makes him a good candidate?",
      "His leadership experience"
    ],
    technical: [
      "His AI/ML expertise",
      "Data science projects",
      "Programming experience"
    ]
  }

  // Auto-scroll effect
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Welcome message
  useEffect(() => {
    if (messages.length === 0) {
      addMessage({
        role: "assistant",
        content: "👋 Hi there! I'm Kedhareswer's enhanced virtual assistant. How can I assist you today?",
        metadata: { category: 'welcome' }
      })
    }
  }, [])

  // Rest of the component would include the enhanced UI components...
  // This is a foundational structure for the enhanced chat interface

  return (
    <div className="enhanced-chat-interface">
      {/* The component would continue with enhanced UI elements */}
      {/* Including settings panel, analytics dashboard, search functionality, etc. */}
    </div>
  )
} 