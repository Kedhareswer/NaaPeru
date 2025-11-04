import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles } from "lucide-react";
import { useChat } from "@/contexts/ChatContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const ChatBot = () => {
  const { isChatOpen, closeChat } = useChat();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hey, what would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "What are your favorite parts of design?",
    "What inspires you?",
    "What projects have you worked on?",
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
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const responses: Record<string, string> = {
        design: "I love the intersection of aesthetics and functionality. Design for me is about creating experiences that feel intuitive and delightful.",
        inspire: "I'm inspired by the potential of AI to solve real-world problems, clean minimalist interfaces, and the work of designers who push boundaries.",
        projects: "I've worked on ThesisFlow-AI (research collaboration platform), QuantumPDF Chat App (RAG application), and Data Notebook (interactive data analysis tool). Check out my Work section for more details!",
        default: "That's a great question! I'm Kedhar, an AI engineer who designs. I work at the intersection of artificial intelligence and user experience, building intelligent systems that people actually want to use.",
      };

      let response = responses.default;
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes("design") || lowerInput.includes("favorite")) {
        response = responses.design;
      } else if (lowerInput.includes("inspire") || lowerInput.includes("inspiration")) {
        response = responses.inspire;
      } else if (lowerInput.includes("project") || lowerInput.includes("work")) {
        response = responses.projects;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsLoading(false);
    }, 1000);
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
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/20">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="font-heading text-lg font-bold text-foreground">
                సంచారి?
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-body text-xs text-foreground/50">Online</span>
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
                <p className="font-body text-sm leading-relaxed">{message.content}</p>
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
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(question)}
                className="w-full text-left px-4 py-2 text-sm font-body text-foreground/70 bg-card/30 border border-border/20 rounded-lg hover:bg-card/50 hover:border-primary/30 hover:text-foreground transition-all"
              >
                {question}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-6 py-4 border-t border-border/20">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about me..."
              className="flex-1 px-4 py-3 bg-card/30 border border-border/30 rounded-lg font-body text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 focus:bg-card/50 transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="px-4 py-3 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-xs text-foreground/40 font-body">
            Start by writing your hand history.
          </p>
        </div>
      </div>
    </div>
  );
};
