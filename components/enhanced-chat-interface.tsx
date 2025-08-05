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
  const welcomeMessageAdded = useRef<boolean>(false)
  
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
          content: "I'd be happy to help you schedule an appointment with Kedhareswer! 🎥\n\n**To get started, could you please share:**\n\n1. **Your name** - What should I call you?\n2. **Contact info** - Your email or phone number\n3. **Meeting purpose** - What would you like to discuss?\n4. **Preferred date** - When works best for you? (YYYY-MM-DD)\n5. **Preferred time** - Any specific time of day?\n6. **Your timezone** - So we can coordinate properly\n\nOnce you provide these details, I'll set everything up for you! 😊",
          metadata: { category: 'appointment' }
        })
      } else {
        // Enhanced API call with conversation mode and better prompting
        const enhancedPrompt = `You are Kedhareswer's friendly AI assistant. Respond in a warm, conversational tone with these guidelines:

1. **Be friendly and engaging** - Use emojis and conversational language
2. **Ask follow-up questions** - Show genuine interest in the user's needs
3. **Avoid redundancy** - Don't repeat information unnecessarily
4. **Be helpful and specific** - Provide actionable insights
5. **Use markdown formatting** - Make responses visually appealing
6. **Keep responses concise but informative** - Balance detail with readability

User question: ${input}

Context about Kedhareswer:
- Full name: Marlakunta Kedhareswer Naidu
- Role: AI/ML & Data Science Enthusiast
- Location: Madanapalle, India (currently studying in Punjab)
- Expertise: Machine Learning, Data Science, Computer Vision, NLP
- Current status: Final year student at Lovely Professional University
- Available for: New opportunities and collaborations

Respond as if you're having a friendly conversation with someone interested in Kedhareswer's work and background.`

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            message: enhancedPrompt,
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
          content: data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response right now. Could you try rephrasing your question? 🤔",
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
        content: "Oops! I'm having a bit of trouble right now. 😅 Could you try asking your question again, or maybe rephrase it slightly? I'm here to help! 🤖",
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
      "Tell me about Kedhareswer's background",
      "What makes him unique as a candidate?",
      "What are his current projects?"
    ],
    professional: [
      "How can I schedule a meeting?",
      "What's his leadership experience?",
      "What opportunities is he looking for?"
    ],
    technical: [
      "What's his AI/ML expertise?",
      "Can you show me his data science projects?",
      "What programming languages does he know?"
    ]
  }

  // Auto-scroll effect
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Welcome message - only add once when component mounts
  useEffect(() => {
    if (messages.length === 0 && !welcomeMessageAdded.current) {
      welcomeMessageAdded.current = true
      addMessage({
        role: "assistant",
        content: "👋 Hi there! I'm Kedhareswer's AI assistant, and I'm excited to help you learn more about him! \n\n**What would you like to know?** 🤔\n\n• His background and experience\n• Technical skills and expertise\n• Projects and achievements\n• How to get in touch\n• Or anything else you're curious about!\n\nJust ask away - I'm here to help! 😊",
        metadata: { category: 'welcome' }
      })
    }
  }, [messages.length])

  // Rest of the component would include the enhanced UI components...
  // This is a foundational structure for the enhanced chat interface

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Chat Messages */}
      <div 
        ref={chatRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {filteredMessages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '')
                    const isInline = !match
                    return !isInline ? (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  }
                }}
              >
                {message.content}
              </ReactMarkdown>
              
              {/* Message Actions */}
              <div className="flex items-center gap-2 mt-2 opacity-0 hover:opacity-100 transition-opacity">
                <button
                  onClick={() => copyMessage(message.content)}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <Copy className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleMessageFeedback(message.id, 'positive')}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <ThumbsUp className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleMessageFeedback(message.id, 'negative')}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <ThumbsDown className="w-3 h-3" />
                </button>
                <button
                  onClick={() => toggleBookmark(message.id)}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <Bookmark className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about Kedhareswer..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              disabled={loading}
            />
            {isRecording && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={loading}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
            
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 