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
    suggestionsEnabled: false,
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
  const [suggestions, setSuggestions] = useState<string[]>([])
  // Rotating placeholder prompts
  const placeholderPrompts = [
    "Tell me about his background",
    "What are his technical skills?",
    "Show me his projects",
    "How can I contact him?"
  ]
  const [placeholderIndex, setPlaceholderIndex] = useState(0)

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
      // Enhanced conversation context (include the just-added userMessage to compute history)
      const conversation = [...messages, userMessage]
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
        const enhancedPrompt = `You are Kedhareswer's AI assistant. Provide PRECISE and CONCISE responses with these strict guidelines:

1. **Be extremely concise** - Keep responses under 3-4 sentences maximum
2. **Focus on key facts only** - No unnecessary details or fluff
3. **Use bullet points when possible** - For lists and multiple points
4. **Be direct and specific** - Answer the question directly without preamble
5. **Use minimal emojis** - Only when absolutely necessary for clarity
6. **Avoid repetition** - Don't restate information already mentioned
7. **Prioritize accuracy** - Ensure all information is factually correct
8. **Use simple language** - Avoid complex jargon unless specifically asked
9. **When listing multiple items** (certifications, hobbies, skills, education), format them as a Markdown table when it improves clarity

User question: ${input}

Context about Kedhareswer:
- Full name: Marlakunta Kedhareswer Naidu
- Role: AI/ML & Data Science Enthusiast
- Location: Madanapalle, India
- Expertise: Machine Learning, Data Science, Computer Vision, NLP
- Current status: Developing Thesis Flow Platform
- Available for: New opportunities and collaborations

Provide a direct, concise answer to the user's question.`

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            message: enhancedPrompt,
            // Exclude the freshest user message; server will use rawUserInput as latest
            conversation: conversation.slice(0, -1),
            mode: conversationMode,
            settings: settings,
            rawUserInput: input
          }),
        })

        if (!response.ok) {
          // Try to surface server-provided safe message (e.g., rate limit or refusal)
          let errorData: any = null
          try { errorData = await response.json() } catch {}
          const fallbackContent = errorData?.choices?.[0]?.message?.content
          if (fallbackContent) {
            const responseTime = Date.now() - startTime
            addMessage({
              role: "assistant",
              content: fallbackContent,
              metadata: { category: errorData?.category || 'system', responseTime }
            })
            updateAnalytics(responseTime)
            return
          }
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

        // Generate new suggestions based on the conversation
        const conversationHistory = messages.map(msg => msg.content)
        const newSuggestions = generateSuggestions(input, conversationHistory)
        setSuggestions(newSuggestions)

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

  // Generate context-relevant suggestions based on conversation
  const generateSuggestions = useCallback((lastMessage: string, conversationHistory: string[]) => {
    const suggestionsMap = {
      background: [
        "Tell me about his education",
        "What's his work experience?",
        "Where is he located?"
      ],
      skills: [
        "What programming languages does he know?",
        "What AI/ML frameworks does he use?",
        "What are his technical strengths?"
      ],
      projects: [
        "Show me his data science projects",
        "What are his most recent projects?",
        "Tell me about his research work"
      ],
      contact: [
        "How can I schedule a meeting?",
        "What's his email address?",
        "Is he available for opportunities?"
      ],
      general: [
        "Tell me about his background",
        "What makes him unique?",
        "What are his current projects?"
      ]
    }

    const lowerMessage = lastMessage.toLowerCase()
    const lowerHistory = conversationHistory.join(' ').toLowerCase()

    // Determine context based on message content
    if (lowerMessage.includes('background') || lowerMessage.includes('education') || lowerMessage.includes('experience')) {
      return suggestionsMap.background
    } else if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('programming')) {
      return suggestionsMap.skills
    } else if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('research')) {
      return suggestionsMap.projects
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('meet') || lowerMessage.includes('email')) {
      return suggestionsMap.contact
    } else {
      return suggestionsMap.general
    }
  }, [])

  // Welcome message - only add once when component mounts
  useEffect(() => {
    if (messages.length === 0 && !welcomeMessageAdded.current) {
      welcomeMessageAdded.current = true
      addMessage({
        role: "assistant",
        content: "👋 Hi there! I'm Kedhareswer's AI assistant, and I'm excited to help you learn more about him! \n\nFeel free to ask me anything about his background, skills, projects, or how to get in touch. I'm here to help! 😊",
        metadata: { category: 'welcome' }
      })
    }
  }, [messages.length])

  // Cycle placeholder every 3 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderPrompts.length)
    }, 3000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
                  },
                  ul: ({ node, ...props }) => <ul className="list-disc pl-5 space-y-1" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal pl-5 space-y-1" {...props} />,
                  li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                  a: ({ node, ...props }) => <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                  h1: ({ node, ...props }) => <h3 className="text-xl font-semibold" {...props} />,
                  h2: ({ node, ...props }) => <h4 className="text-lg font-semibold" {...props} />,
                  h3: ({ node, ...props }) => <h5 className="text-base font-semibold" {...props} />,
                  blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-3 italic text-gray-600 my-2" {...props} />,
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-collapse border border-gray-200" {...props} />
                    </div>
                  ),
                  th: ({ node, ...props }) => <th className="border border-gray-200 px-3 py-2 text-left bg-gray-50 font-semibold" {...props} />, 
                  td: ({ node, ...props }) => <td className="border border-gray-200 px-3 py-2" {...props} />,
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

      {/* Suggestions (disabled by default) */}
      {settings.suggestionsEnabled && suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-gray-200 p-4 bg-gray-50"
        >
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setInput(suggestion)
                  setSuggestions([]) // Hide suggestions when one is clicked
                }}
                className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`${placeholderPrompts[placeholderIndex]}...`}
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