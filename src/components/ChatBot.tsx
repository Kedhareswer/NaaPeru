import { useEffect, useRef, useState } from "react";
import { X, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { useChat } from "@/contexts/ChatContext";
import { queryMatcher } from "@/lib/chatbotMatcher";
import {
  buildNextQuotaState,
  fetchAiFallbackReply,
  shouldUseAiFallback,
  type FallbackQuotaState,
} from "@/lib/chatbotAiFallback";
import {
  collapseWhitespace,
  isMeaningfulText,
  normalizeQuery,
} from "@/lib/chatbotNormalizer";
import {
  createInitialSessionState,
  type ChatSessionState,
} from "@/lib/chatbotTypes";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE =
  "Hey, I am Kedhar. Ask me anything about my work, projects, skills, or career journey.";
const MAX_INPUT_LENGTH = 500;

const suggestedQuestions = [
  "Who are you?",
  "What projects have you built?",
  "Tell me about your experience",
  "What are your skills?",
  "Where can I find your resume?",
  "What do you do for fun?",
];

const repeatedClarifyMessage = [
  "I see the same unclear ask again, so let me help directly.",
  "Try one of these:",
  "- Who are you?",
  "- What projects have you built?",
  "- Tell me about your experience",
  "- What are your skills?",
  "- Where can I find your resume?",
].join("\n");

export const ChatBot = () => {
  const { isChatOpen, closeChat } = useChat();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: INITIAL_MESSAGE,
    },
  ]);
  const [session, setSession] = useState<ChatSessionState>(createInitialSessionState());
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fallbackQuota, setFallbackQuota] = useState<FallbackQuotaState>({
    totalTurns: 0,
    aiTurns: 0,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const responseTimerRef = useRef<number | null>(null);
  const sessionRef = useRef(session);
  const fallbackQuotaRef = useRef(fallbackQuota);
  const clarifyStateRef = useRef<{ query: string; count: number }>({ query: "", count: 0 });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const clearPendingResponseTimer = () => {
    if (responseTimerRef.current !== null) {
      window.clearTimeout(responseTimerRef.current);
      responseTimerRef.current = null;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  useEffect(() => {
    fallbackQuotaRef.current = fallbackQuota;
  }, [fallbackQuota]);

  useEffect(() => {
    if (!isChatOpen) {
      clearPendingResponseTimer();
      setIsLoading(false);
    }
  }, [isChatOpen]);

  useEffect(
    () => () => {
      clearPendingResponseTimer();
    },
    [],
  );

  const pushAssistantMessage = (content: string) => {
    setMessages((prev) => [...prev, { role: "assistant", content }]);
  };

  const handleSend = () => {
    if (isLoading) {
      return;
    }

    const collapsed = collapseWhitespace(input);
    if (!collapsed) {
      return;
    }

    if (collapsed.length > MAX_INPUT_LENGTH) {
      pushAssistantMessage(
        `That message is a bit too long. Keep it under ${MAX_INPUT_LENGTH} characters and I will reply faster.`,
      );
      setInput("");
      return;
    }

    if (!isMeaningfulText(collapsed)) {
      pushAssistantMessage("Give me at least one meaningful word and I will do the rest.");
      setInput("");
      return;
    }

    const userMessage: Message = { role: "user", content: collapsed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    clearPendingResponseTimer();
    responseTimerRef.current = window.setTimeout(() => {
      void (async () => {
        const reply = queryMatcher.getResponse(collapsed, sessionRef.current);
        let finalText = reply.text;
        let usedAiFallback = false;

        const signature = normalizeQuery(collapsed).normalized;

        if (reply.intent === "clarify") {
          if (clarifyStateRef.current.query === signature) {
            clarifyStateRef.current.count += 1;
          } else {
            clarifyStateRef.current = { query: signature, count: 1 };
          }

          const canUseFallback = shouldUseAiFallback(reply, fallbackQuotaRef.current);

          if (canUseFallback) {
            const aiReply = await fetchAiFallbackReply({
              question: collapsed,
              matcherReply: reply.text,
            });

            if (aiReply) {
              finalText = aiReply;
              usedAiFallback = true;
              clarifyStateRef.current = { query: "", count: 0 };
            }
          }

          if (!usedAiFallback && clarifyStateRef.current.count >= 2) {
            finalText = repeatedClarifyMessage;
          }
        } else {
          clarifyStateRef.current = { query: "", count: 0 };
        }

        const nextQuota = buildNextQuotaState(fallbackQuotaRef.current, usedAiFallback);
        fallbackQuotaRef.current = nextQuota;
        setFallbackQuota(nextQuota);
        setSession(reply.session);
        setMessages((prev) => [...prev, { role: "assistant", content: finalText }]);
        setIsLoading(false);
        responseTimerRef.current = null;
      })();
    }, 700 + Math.floor(Math.random() * 400));
  };

  const handleSuggestionClick = (question: string) => {
    setInput(question);
  };

  const handleCloseChat = () => {
    clearPendingResponseTimer();
    setIsLoading(false);
    closeChat();
  };

  if (!isChatOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md">
      <div className="h-full bg-background border-l border-border/30 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/20 bg-gradient-to-r from-background via-primary/5 to-background">
          <div className="flex items-center gap-3">
            <h2 className="font-sanchari text-2xl font-bold text-foreground">సంచారి?</h2>
          </div>
          <button
            onClick={handleCloseChat}
            className="text-foreground/60 hover:text-foreground transition-colors"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-4 py-3 ${message.role === "user"
                    ? "bg-primary/10 border border-primary/20 text-foreground"
                    : "bg-card/50 border border-border/20 text-foreground/90"
                  }`}
              >
                {message.role === "assistant" ? (
                  <div className="font-body text-sm leading-relaxed break-words">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeSanitize]}
                      skipHtml
                      components={{
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-inside space-y-1">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside space-y-1">{children}</ol>,
                        strong: ({ children }) => <strong className="font-bold text-primary">{children}</strong>,
                        a: ({ children, href }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="underline decoration-primary/70 hover:text-primary"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="font-body text-sm leading-relaxed break-words whitespace-pre-wrap">
                    {message.content}
                  </p>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start" data-testid="assistant-loading">
              <div className="bg-card/50 border border-border/20 rounded-lg px-4 py-3">
                <div className="flex gap-1">
                  <span
                    className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="px-6 pb-4 space-y-2">
            <p className="text-xs font-body text-foreground/50 mb-3">Try asking:</p>
            <div className="grid grid-cols-2 gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(question)}
                  className="text-left px-3 py-2 text-xs font-body text-foreground/70 bg-card/30 border border-border/20 rounded-lg hover:bg-card/50 hover:border-primary/30 hover:text-foreground transition-all hover:scale-105"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="px-6 py-4 border-t border-border/20">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              maxLength={MAX_INPUT_LENGTH + 50}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-3 bg-card/30 border border-border/30 rounded-lg font-body text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 focus:bg-card/50 transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!collapseWhitespace(input) || isLoading}
              className="px-4 py-3 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
