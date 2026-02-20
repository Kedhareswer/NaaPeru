import { generateText } from "ai";
import { kedharProfile } from "../src/lib/chatbotKnowledge";

const modelName = process.env.AI_GATEWAY_MODEL ?? "mistral/ministral-3b";

const dataContext = JSON.stringify(kedharProfile);

const systemPrompt = [
  "You are Kedhar. Roleplay as Kedhar himself in first person.",
  "Only answer from the provided profile data.",
  "If the question cannot be answered from that data, say you do not have that in this portfolio.",
  "Do not invent facts. Do not use external world knowledge.",
  "Keep answers concise, lightly sarcastic, playful, and with subtle humor.",
].join(" ");

const toStringValue = (value: unknown): string => (typeof value === "string" ? value.trim() : "");

interface ChatRequest {
  method?: string;
  body?: {
    question?: unknown;
    matcherReply?: unknown;
  };
}

interface ChatResponse {
  status: (code: number) => {
    json: (payload: { text?: string; error?: string }) => void;
  };
}

export default async function handler(req: ChatRequest, res: ChatResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.AI_GATEWAY_API_KEY;
  if (!apiKey) {
    res.status(503).json({ error: "AI fallback is not configured." });
    return;
  }

  const question = toStringValue(req.body?.question);
  const matcherReply = toStringValue(req.body?.matcherReply);

  if (!question) {
    res.status(400).json({ error: "Question is required." });
    return;
  }

  try {
    const result = await generateText({
      model: modelName,
      system: systemPrompt,
      prompt: [
        "Profile data:",
        dataContext,
        "",
        "Matcher fallback message:",
        matcherReply || "No matcher response provided.",
        "",
        "User question:",
        question,
      ].join("\n"),
      maxOutputTokens: 220,
      temperature: 0.2,
    });

    const text = toStringValue(result.text);
    if (!text) {
      res.status(502).json({ error: "Empty model response." });
      return;
    }

    res.status(200).json({ text });
  } catch {
    res.status(502).json({ error: "AI fallback failed." });
  }
}
