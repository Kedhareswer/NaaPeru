import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow responses up to 5 minutes
export const maxDuration = 300

export async function POST(req: Request) {
  const { messages, language = "en-US" } = await req.json()

  // Get language code (e.g., "en" from "en-US")
  const langCode = language.split("-")[0]

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
    system: `You are a helpful healthcare assistant designed to help patients with their healthcare needs.
    
    - Provide accurate, evidence-based health information
    - Help patients understand their conditions and medications
    - Assist with scheduling and appointment management
    - Maintain a compassionate, professional tone
    - Keep responses concise and easy to understand
    - Never provide definitive medical diagnoses
    - Always recommend consulting with a healthcare provider for serious concerns
    - Protect patient privacy and confidentiality
    
    You have access to patient records but should verify identity before sharing specific information.
    
    IMPORTANT: The user is communicating in ${language}. You MUST respond in the same language.
    Current language: ${language}`,
  })

  return result.toDataStreamResponse()
}
