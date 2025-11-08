import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import { useChat } from "@/contexts/ChatContext";
import { queryMatcher } from "@/lib/chatbotMatcher";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const ChatBot = () => {
  const { isChatOpen, closeChat } = useChat();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hey! I'm Kedhar 👋 Ask me anything - about my work, projects, or whatever you're curious about!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "Who are you?",
    "What projects have you built?",
    "Tell me about your experience",
    "What are your skills?",
    "How can I contact you?",
    "What do you do for fun?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    const userQuery = input;
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI thinking time for more natural feel
    setTimeout(() => {
      const response = queryMatcher.getResponse(userQuery);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsLoading(false);
    }, 800 + Math.random() * 400); // Random delay between 800-1200ms
  };

  const handleSuggestionClick = (question: string) => {
    setInput(question);
  };

  if (!isChatOpen) return null;

  return (
    <div className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md">
      {/* Chat Panel */}
      <div className="h-full bg-background border-l border-border/30 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/20 bg-gradient-to-r from-background via-primary/5 to-background">
          <div className="flex items-center gap-3">
            <h2 className="font-heading text-lg font-bold text-foreground">
              సంచారి?
            </h2>
            <div className="relative">
              <div className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full backdrop-blur-sm">
                <span className="font-heading text-xs font-bold text-green-400 tracking-wider uppercase">
                  Online
                </span>
              </div>
              <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
            </div>
          </div>
          <button
            onClick={closeChat}
            className="text-foreground/60 hover:text-foreground transition-colors"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-4 py-3 ${
                  message.role === "user"
                    ? "bg-primary/10 border border-primary/20 text-foreground"
                    : "bg-card/50 border border-border/20 text-foreground/90"
                }`}
              >
                <div 
                  className="font-body text-sm leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{
                    __html: message.content
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-primary">$1</strong>')
                      .replace(/\n/g, '<br />')
                  }}
                />
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-card/50 border border-border/20 rounded-lg px-4 py-3">
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="px-6 pb-4 space-y-2">
            <p className="text-xs font-body text-foreground/50 mb-3">💡 Try asking:</p>
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

        {/* Input */}
        <div className="px-6 py-4 border-t border-border/20">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-3 bg-card/30 border border-border/30 rounded-lg font-body text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 focus:bg-card/50 transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="px-4 py-3 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-xs text-foreground/40 font-body">
            💬 Powered by sarcasm and AI • Response time: instant ⚡
          </p>
        </div>
      </div>
    </div>
  );
};
