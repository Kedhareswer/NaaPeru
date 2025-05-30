"use client"

import { useCallback, useEffect, useState } from "react"
import type { Language } from "@/types/patient"

interface UseSpeechSynthesisProps {
  language?: string
}

export function useSpeechSynthesis({ language = "en-US" }: UseSpeechSynthesisProps = {}) {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [hasSynthesisSupport, setHasSynthesisSupport] = useState(false)
  const [availableLanguages, setAvailableLanguages] = useState<Language[]>([])

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setHasSynthesisSupport(true)

      // Get available voices
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices()
        setVoices(availableVoices)

        // Extract unique languages from voices
        const languageMap = new Map<string, Language>()

        availableVoices.forEach((voice) => {
          const langCode = voice.lang.split("-")[0]
          const fullLangCode = voice.lang

          if (!languageMap.has(langCode)) {
            // Get native name for language
            const nativeName = new Intl.DisplayNames([langCode], { type: "language" }).of(langCode) || voice.lang

            languageMap.set(langCode, {
              code: fullLangCode,
              name: new Intl.DisplayNames(["en"], { type: "language" }).of(langCode) || voice.lang,
              nativeName,
              voiceSupported: true,
              recognitionSupported: ["en", "fr", "es", "de", "it", "pt", "nl", "ja", "zh", "ru"].includes(langCode),
            })
          }
        })

        setAvailableLanguages(Array.from(languageMap.values()))
      }

      loadVoices()

      // Chrome loads voices asynchronously
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices
      }
    }
  }, [])

  const speak = useCallback(
    (text: string, onEnd?: () => void) => {
      if (!hasSynthesisSupport) return

      // Cancel any ongoing speech
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)

      // Try to find a voice for the selected language
      const langPrefix = language.split("-")[0]

      // First try to find a natural sounding voice in the exact language
      const preferredVoice =
        voices.find((voice) => voice.lang === language && voice.name.includes("Natural")) ||
        voices.find((voice) => voice.lang === language) ||
        voices.find((voice) => voice.lang.startsWith(langPrefix) && voice.name.includes("Natural")) ||
        voices.find((voice) => voice.lang.startsWith(langPrefix)) ||
        voices.find((voice) => voice.lang.includes("en") && voice.name.includes("Natural")) ||
        voices.find((voice) => voice.lang.includes("en"))

      if (preferredVoice) {
        utterance.voice = preferredVoice
        utterance.lang = preferredVoice.lang
      } else {
        utterance.lang = language
      }

      utterance.rate = 1.0
      utterance.pitch = 1.0

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => {
        setIsSpeaking(false)
        if (onEnd) onEnd()
      }
      utterance.onerror = () => {
        setIsSpeaking(false)
        if (onEnd) onEnd()
      }

      window.speechSynthesis.speak(utterance)
    },
    [hasSynthesisSupport, voices, language],
  )

  const cancel = useCallback(() => {
    if (hasSynthesisSupport) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }, [hasSynthesisSupport])

  return {
    speak,
    cancel,
    isSpeaking,
    voices,
    hasSynthesisSupport,
    availableLanguages,
  }
}
