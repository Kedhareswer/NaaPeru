import { useEffect, useRef, useState, useCallback } from "react";
import { X, Send, ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { motion, AnimatePresence } from "motion/react";
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
  type IntentId,
} from "@/lib/chatbotTypes";

/* ─── types ────────────────────────────────────────────────── */

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

/* ─── constants ────────────────────────────────────────────── */

const INITIAL_MESSAGE =
  "Hey, I am Kedhar. Ask me anything about my work, projects, skills, or career journey.";
const MAX_INPUT_LENGTH = 500;

let nextMsgId = 1;
const makeId = () => nextMsgId++;

const INITIAL_SUGGESTIONS = [
  "Who are you?",
  "What projects have you built?",
  "Tell me about your experience",
  "What are your skills?",
];

const CONTEXTUAL_FOLLOW_UPS: Partial<Record<IntentId, string[]>> = {
  greeting: ["What projects have you built?", "Tell me about your experience", "What are your skills?"],
  about: ["What projects have you built?", "Tell me about your experience", "What are your skills?"],
  experience: ["Tell me about DiligenceVault", "What projects have you built?", "What are your skills?"],
  project: ["Tell me about QuantumPDF", "Tell me about ThesisFlow", "What tech do you use?"],
  skill: ["Which projects use AI?", "What's your favorite tech stack?", "Tell me about your experience"],
  education: ["What skills did you develop?", "Tell me about your projects", "Any certifications?"],
  resume: ["What's your experience?", "What skills do you have?", "What projects did you build?"],
  portfolio: ["What projects have you built?", "Tell me about your experience", "Where is the resume?"],
  contact: ["Tell me about your experience", "What projects have you built?", "What are your skills?"],
  future: ["What roles are you looking for?", "Why should I hire you?", "What's your best project?"],
  role: ["Why hire you?", "What are your best skills?", "Tell me about your projects"],
  job_fit: ["What are your skills?", "Tell me about your projects", "What's your experience?"],
  hobby: ["What do you read?", "Any fun side projects?", "What kind of games?"],
  achievement: ["What projects have you built?", "Tell me about your experience", "What are your skills?"],
  location: ["Tell me about your experience", "What projects have you built?", "What are your skills?"],
  age: ["What's your experience?", "What projects have you built?", "What are your skills?"],
  advice: ["What's your experience?", "What roles are you targeting?", "Tell me about your projects"],
  favorite_project: ["Tell me about QuantumPDF", "Tell me about ThesisFlow", "What tech do you use?"],
  favorite_tech: ["What projects use these?", "Tell me about your experience", "What are your skills?"],
  joke: ["Tell me another joke", "What projects have you built?", "What do you do for fun?"],
  clarify: ["Who are you?", "What projects have you built?", "What are your skills?"],
};

const repeatedClarifyMessage = [
  "I see the same unclear ask again, so let me help directly.",
  "Try one of these:",
  "- Who are you?",
  "- What projects have you built?",
  "- Tell me about your experience",
  "- What are your skills?",
  "- Where can I find your resume?",
].join("\n");

const THINKING_LABELS = [
  "thinking...",
  "cooking up a response...",
  "processing...",
  "let me think...",
  "one sec...",
];

const pickThinkingLabel = () =>
  THINKING_LABELS[Math.floor(Math.random() * THINKING_LABELS.length)];

/* ─── component ────────────────────────────────────────────── */

export const ChatBot = () => {
  const { isChatOpen, closeChat } = useChat();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      content: INITIAL_MESSAGE,
      timestamp: new Date(),
      suggestions: INITIAL_SUGGESTIONS,
    },
  ]);
  const [session, setSession] = useState<ChatSessionState>(createInitialSessionState());
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fallbackQuota, setFallbackQuota] = useState<FallbackQuotaState>({
    totalTurns: 0,
    aiTurns: 0,
  });
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [thinkingLabel, setThinkingLabel] = useState("thinking...");

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const responseTimerRef = useRef<number | null>(null);
  const sessionRef = useRef(session);
  const fallbackQuotaRef = useRef(fallbackQuota);
  const clarifyStateRef = useRef<{ query: string; count: number }>({ query: "", count: 0 });

  /* ─── helpers ──────────────────────────────────────────── */

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleContainerScroll = useCallback(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > 100);
  }, []);

  const clearPendingResponseTimer = () => {
    if (responseTimerRef.current !== null) {
      window.clearTimeout(responseTimerRef.current);
      responseTimerRef.current = null;
    }
  };

  /* ─── effects ──────────────────────────────────────────── */

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

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
    // Auto-focus input when chat opens
    if (isChatOpen) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isChatOpen]);

  useEffect(
    () => () => {
      clearPendingResponseTimer();
    },
    [],
  );

  /* ─── message helpers ──────────────────────────────────── */

  const pushAssistantMessage = (content: string, suggestions?: string[]) => {
    setMessages((prev) => [
      ...prev,
      { id: makeId(), role: "assistant", content, timestamp: new Date(), suggestions },
    ]);
  };

  /* ─── send logic ───────────────────────────────────────── */

  const handleSend = (overrideText?: string) => {
    if (isLoading) return;

    const raw = overrideText ?? input;
    const collapsed = collapseWhitespace(raw);
    if (!collapsed) return;

    if (collapsed.length > MAX_INPUT_LENGTH) {
      pushAssistantMessage(
        `That message is a bit too long. Keep it under ${MAX_INPUT_LENGTH} characters and I will reply faster.`,
      );
      if (overrideText === undefined) setInput("");
      return;
    }

    if (!isMeaningfulText(collapsed)) {
      pushAssistantMessage("Give me at least one meaningful word and I will do the rest.");
      if (overrideText === undefined) setInput("");
      return;
    }

    setMessages((prev) => [
      ...prev,
      { id: makeId(), role: "user", content: collapsed, timestamp: new Date() },
    ]);
    if (overrideText === undefined) setInput("");
    setIsLoading(true);
    setThinkingLabel(pickThinkingLabel());

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

        const followUps = CONTEXTUAL_FOLLOW_UPS[reply.intent];
        pushAssistantMessage(finalText, followUps?.slice(0, 3));
        setIsLoading(false);
        responseTimerRef.current = null;
      })();
    }, 700 + Math.floor(Math.random() * 400));
  };

  const handleSuggestionClick = (question: string) => {
    if (isLoading) return;
    handleSend(question);
  };

  const handleCloseChat = () => {
    clearPendingResponseTimer();
    setIsLoading(false);
    closeChat();
  };

  /* ─── derived state ────────────────────────────────────── */

  const remaining = MAX_INPUT_LENGTH - input.length;
  const showCounter = input.length > MAX_INPUT_LENGTH * 0.6;

  /* ─── render ───────────────────────────────────────────── */

  return (
    <AnimatePresence>
      {isChatOpen && (
        <>
          {/* Mobile backdrop */}
          <motion.div
            key="chatbot-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleCloseChat}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] md:bg-black/20 md:backdrop-blur-0"
          />

          {/* Slide-in panel */}
          <motion.div
            key="chatbot-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 24, stiffness: 260 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md"
          >
            <div className="h-full bg-background border-l border-border/30 flex flex-col shadow-2xl overflow-hidden relative">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent pointer-events-none z-10" />

              {/* ─── Header ─────────────────────────────── */}
              <div className="flex items-center justify-between px-5 py-5 border-b border-border/20">
                <div className="relative">
                  <motion.h2
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300, delay: 0.05 }}
                    className="font-sanchari text-2xl font-bold text-foreground"
                  >
                    సంచారి?
                  </motion.h2>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.3, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ originX: 0 }}
                    className="h-px bg-gradient-to-r from-primary/70 to-transparent mt-0.5"
                  />
                </div>
                <motion.button
                  onClick={handleCloseChat}
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="p-2 text-foreground/40 hover:text-foreground transition-colors flex-shrink-0"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </div>

              {/* ─── Messages ───────────────────────────── */}
              <div
                ref={messagesContainerRef}
                onScroll={handleContainerScroll}
                className="flex-1 overflow-y-auto px-5 py-5 space-y-4"
                style={{ scrollbarWidth: "thin", scrollbarColor: "hsl(0 0% 100% / 0.08) transparent" }}
              >
                <AnimatePresence initial={false}>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{
                        opacity: 0,
                        x: message.role === "user" ? 20 : -20,
                        scale: 0.96,
                      }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ type: "spring", damping: 18, stiffness: 280 }}
                      className={`flex flex-col gap-1 ${message.role === "user" ? "items-end" : "items-start"}`}
                    >
                      {/* Message bubble */}
                      <div
                        className={`max-w-[87%] px-4 py-3 ${
                          message.role === "user"
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
                                ul: ({ children }) => (
                                  <ul className="list-disc list-inside space-y-1">{children}</ul>
                                ),
                                ol: ({ children }) => (
                                  <ol className="list-decimal list-inside space-y-1">{children}</ol>
                                ),
                                li: ({ children }) => (
                                  <li className="[&>p]:inline [&>p]:m-0">{children}</li>
                                ),
                                strong: ({ children }) => (
                                  <strong className="font-bold text-primary">{children}</strong>
                                ),
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

                      {/* Timestamp */}
                      <span className="font-body text-[10px] text-foreground/25 px-1 select-none">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>

                      {/* Contextual follow-up suggestions — only on the latest assistant message */}
                      {message.role === "assistant" &&
                        message.suggestions &&
                        message.suggestions.length > 0 &&
                        index === messages.length - 1 && (
                          <div className="flex flex-wrap gap-1.5 max-w-[87%] mt-1">
                            {message.suggestions.map((suggestion, i) => (
                              <motion.button
                                key={suggestion}
                                initial={{ opacity: 0, y: 10, scale: 0.92 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{
                                  delay: 0.1 + i * 0.08,
                                  type: "spring",
                                  damping: 16,
                                  stiffness: 300,
                                }}
                                whileHover={{ scale: 1.04, y: -1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleSuggestionClick(suggestion)}
                                disabled={isLoading}
                                className="text-left px-2.5 py-1.5 text-xs font-body text-foreground/50 bg-card/25 border border-border/15 hover:bg-primary/8 hover:border-primary/25 hover:text-foreground/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                              >
                                {suggestion}
                              </motion.button>
                            ))}
                          </div>
                        )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing indicator */}
                <AnimatePresence>
                  {isLoading && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ type: "spring", damping: 20, stiffness: 300 }}
                      className="flex items-center gap-3 px-1 py-1"
                      data-testid="assistant-loading"
                    >
                      <div className="flex items-end gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="w-2 h-2 rounded-full bg-primary/60 block"
                            animate={{ y: [0, -7, 0], opacity: [0.45, 1, 0.45] }}
                            transition={{
                              duration: 0.75,
                              repeat: Infinity,
                              delay: i * 0.14,
                              ease: "easeInOut",
                            }}
                          />
                        ))}
                      </div>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.35 }}
                        className="font-body text-[10px] text-foreground/35 italic"
                      >
                        {thinkingLabel}
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>

              {/* ─── Scroll-to-bottom button ────────────── */}
              <AnimatePresence>
                {showScrollBtn && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.7, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.7, y: 8 }}
                    transition={{ type: "spring", damping: 16, stiffness: 340 }}
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToBottom}
                    className="absolute bottom-[4.5rem] right-5 z-10 p-2 bg-card border border-border/40 text-foreground/50 hover:text-foreground hover:border-primary/30 transition-colors shadow-lg"
                    aria-label="Scroll to bottom"
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* ─── Input area ─────────────────────────── */}
              <div className="px-5 py-4 border-t border-border/20">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      maxLength={MAX_INPUT_LENGTH + 50}
                      onChange={(event) => setInput(event.target.value)}
                      onKeyDown={(event) => event.key === "Enter" && !event.shiftKey && handleSend()}
                      placeholder="Ask me anything..."
                      className="w-full px-4 py-3 bg-card/30 border border-border/30 font-body text-sm text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-primary/50 focus:bg-card/50 transition-all"
                      style={{ paddingRight: showCounter ? "3rem" : undefined }}
                    />
                    {showCounter && (
                      <span
                        className={`absolute right-3 top-1/2 -translate-y-1/2 font-body text-[10px] tabular-nums pointer-events-none select-none ${
                          remaining < 50 ? "text-primary" : "text-foreground/30"
                        }`}
                      >
                        {remaining}
                      </span>
                    )}
                  </div>
                  <motion.button
                    onClick={() => handleSend()}
                    disabled={!collapseWhitespace(input) || isLoading}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.88 }}
                    transition={{ type: "spring", damping: 14, stiffness: 400 }}
                    className="px-4 py-3 bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
