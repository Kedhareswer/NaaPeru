"use client"

import { useCallback, useEffect, useState } from "react"
import type { Language } from "@/types/patient"

interface UseSpeechRecognitionProps {
  language?: string
}

export function useSpeechRecognition({ language = "en-US" }: UseSpeechRecognitionProps = {}) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [hasRecognitionSupport, setHasRecognitionSupport] = useState(false)
  const [recognition, setRecognition] = useState<any>(null)
  const [supportedLanguages, setSupportedLanguages] = useState<Language[]>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check for browser support
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition

      if (SpeechRecognition) {
        setHasRecognitionSupport(true)
        const recognitionInstance = new SpeechRecognition()

        recognitionInstance.continuous = true
        recognitionInstance.interimResults = true
        recognitionInstance.lang = language

        recognitionInstance.onresult = (event: any) => {
          let finalTranscript = ""
          let interimTranscript = ""

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i]
            if (result.isFinal) {
              finalTranscript += result[0].transcript
            } else {
              interimTranscript += result[0].transcript
            }
          }

          setTranscript(finalTranscript || interimTranscript)
        }

        recognitionInstance.onerror = (event: any) => {
          console.error("Speech recognition error", event.error)
          setIsListening(false)
        }

        recognitionInstance.onend = () => {
          setIsListening(false)
        }

        setRecognition(recognitionInstance)

        // Set supported languages
        // These are common languages supported by most browsers
        const commonLanguages: Language[] = [
          {
            code: "en-US",
            name: "English (US)",
            nativeName: "English (US)",
            voiceSupported: true,
            recognitionSupported: true,
          },
          {
            code: "en-GB",
            name: "English (UK)",
            nativeName: "English (UK)",
            voiceSupported: true,
            recognitionSupported: true,
          },
          { code: "es-ES", name: "Spanish", nativeName: "Español", voiceSupported: true, recognitionSupported: true },
          { code: "fr-FR", name: "French", nativeName: "Français", voiceSupported: true, recognitionSupported: true },
          { code: "de-DE", name: "German", nativeName: "Deutsch", voiceSupported: true, recognitionSupported: true },
          { code: "it-IT", name: "Italian", nativeName: "Italiano", voiceSupported: true, recognitionSupported: true },
          {
            code: "pt-BR",
            name: "Portuguese",
            nativeName: "Português",
            voiceSupported: true,
            recognitionSupported: true,
          },
          { code: "zh-CN", name: "Chinese", nativeName: "中文", voiceSupported: true, recognitionSupported: true },
          { code: "ja-JP", name: "Japanese", nativeName: "日本語", voiceSupported: true, recognitionSupported: true },
          { code: "ru-RU", name: "Russian", nativeName: "Русский", voiceSupported: true, recognitionSupported: true },
        ]

        setSupportedLanguages(commonLanguages)
      }
    }

    return () => {
      if (recognition) {
        recognition.stop()
      }
    }
  }, [])

  // Update language when it changes
  useEffect(() => {
    if (recognition) {
      recognition.lang = language
    }
  }, [language, recognition])

  const startListening = useCallback(() => {
    if (recognition && !isListening) {
      try {
        recognition.start()
        setIsListening(true)
        setTranscript("")
      } catch (error) {
        console.error("Error starting speech recognition:", error)
      }
    }
  }, [recognition, isListening])

  const stopListening = useCallback(() => {
    if (recognition && isListening) {
      recognition.stop()
      setIsListening(false)
    }
  }, [recognition, isListening])

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    hasRecognitionSupport,
    supportedLanguages,
  }
}
