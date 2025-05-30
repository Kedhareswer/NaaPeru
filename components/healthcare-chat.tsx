"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mic, MicOff, Send, Volume2, VolumeX, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSpeechSynthesis } from "@/hooks/use-speech-synthesis"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { LanguageSelector } from "@/components/language-selector"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function HealthcareChat() {
  const [language, setLanguage] = useState("en-US")
  const [autoSpeak, setAutoSpeak] = useState(true)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    body: {
      language,
    },
  })
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { speak, cancel, availableLanguages, hasSynthesisSupport } = useSpeechSynthesis({ language })
  const { isListening, transcript, startListening, stopListening, hasRecognitionSupport, supportedLanguages } =
    useSpeechRecognition({ language })

  // Combine languages from both speech hooks
  const allLanguages = [
    ...new Map([...availableLanguages, ...supportedLanguages].map((lang) => [lang.code, lang])).values(),
  ]

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Speak the last assistant message if not muted
  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage?.role === "assistant" && !isMuted && autoSpeak) {
      setIsSpeaking(true)
      speak(lastMessage.content, () => setIsSpeaking(false))
    }

    return () => {
      cancel()
    }
  }, [messages, speak, cancel, isMuted, autoSpeak])

  // Update input with transcript
  useEffect(() => {
    if (transcript) {
      handleInputChange({ target: { value: transcript } } as React.ChangeEvent<HTMLInputElement>)
    }
  }, [transcript, handleInputChange])

  const toggleMute = () => {
    if (isSpeaking) {
      cancel()
      setIsSpeaking(false)
    }
    setIsMuted(!isMuted)
  }

  const handleVoiceInput = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isListening) {
      stopListening()
    }
    handleSubmit(e)
  }

  const speakMessage = (text: string) => {
    if (!isMuted) {
      setIsSpeaking(true)
      speak(text, () => setIsSpeaking(false))
    }
  }

  return (
    <Card className="flex h-[600px] flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="AI Assistant" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">Healthcare Assistant</h2>
            <p className="text-xs text-slate-500">Always available to help</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Settings">
                <Settings className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h3 className="font-medium">Chat Settings</h3>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <LanguageSelector languages={allLanguages} value={language} onValueChange={setLanguage} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-speak">Auto-speak responses</Label>
                  <Switch id="auto-speak" checked={autoSpeak} onCheckedChange={setAutoSpeak} />
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button variant="ghost" size="icon" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center p-8 text-center">
              <div>
                <h3 className="mb-2 text-lg font-medium">Welcome to your Healthcare Assistant</h3>
                <p className="text-sm text-slate-500">
                  Ask me about your health concerns, medication information, or manage your records.
                </p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === "user" ? "bg-slate-200 text-slate-900" : "bg-slate-800 text-white"
                  }`}
                >
                  {message.content}
                  {message.role === "assistant" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 h-6 w-6 rounded-full p-0 text-slate-300 hover:text-white"
                      onClick={() => speakMessage(message.content)}
                      disabled={isSpeaking || isMuted}
                    >
                      <Volume2 className="h-3 w-3" />
                      <span className="sr-only">Speak this message</span>
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <form onSubmit={onSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder={`Type your message in ${allLanguages.find((l) => l.code === language)?.name || "English"} or click the mic to speak...`}
            className="flex-1"
            disabled={isLoading}
          />
          {hasRecognitionSupport && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleVoiceInput}
              disabled={isLoading}
              className={isListening ? "bg-red-100" : ""}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
          )}
          <Button type="submit" size="icon" disabled={isLoading || !input}>
            <Send className="h-5 w-5" />
          </Button>
        </form>
        {isListening && <p className="mt-2 text-xs text-slate-500">Listening... {transcript}</p>}
      </div>
    </Card>
  )
}
