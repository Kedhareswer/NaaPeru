import { useState } from "react";
import { queryMatcher } from "@/lib/chatbotMatcher";
import { createInitialSessionState, type ChatSessionState } from "@/lib/chatbotTypes";

interface TestResult {
  query: string;
  response: string;
  category: string;
  timestamp: Date;
}

export default function ChatbotTest() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TestResult[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [session, setSession] = useState<ChatSessionState>(createInitialSessionState());

  const testQueries = {
    greeting: [
      "hi",
      "hello",
      "hey",
      "yo",
      "sup",
    ],
    about: [
      "who are you",
      "tell me about yourself",
      "introduce yourself",
      "what do you do",
    ],
    experience: [
      "tell me about your experience",
      "what's your work",
      "wahts your work",
      "my work",
      "your work",
      "where do you work",
      "current job",
      "work experience",
      "job",
      "experience",
    ],
    projects: [
      "what projects have you built?",
      "show me your projects",
      "what have you built",
      "your projects",
      "projects",
      "built",
    ],
    skills: [
      "what are your skills",
      "tech stack",
      "programming languages",
      "what technologies",
    ],
    education: [
      "where did you study",
      "your education",
      "university",
      "degree",
    ],
    contact: [
      "how can i contact you",
      "email",
      "linkedin",
      "contact",
    ],
    hobbies: [
      "what do you do for fun",
      "hobbies",
      "interests",
    ],
    location: [
      "where are you from",
      "where do you live",
      "location",
    ],
    age: [
      "how old are you",
      "your age",
      "age",
    ],
    future: [
      "what are your future plans",
      "goals",
      "plans",
    ],
  };

  const handleTest = (testQuery: string, category: string) => {
    const response = queryMatcher.getResponse(testQuery, session);
    setSession(response.session);
    const result: TestResult = {
      query: testQuery,
      response: response.text,
      category,
      timestamp: new Date(),
    };
    setResults((prev) => [result, ...prev]);
  };

  const handleCustomTest = () => {
    if (!query.trim()) return;
    handleTest(query, "custom");
    setQuery("");
  };

  const runAllTests = () => {
    setResults([]);
    Object.entries(testQueries).forEach(([category, queries]) => {
      queries.forEach((q) => {
        setTimeout(() => handleTest(q, category), 100);
      });
    });
  };

  const filteredResults = selectedCategory === "all" 
    ? results 
    : results.filter((r) => r.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-heading font-bold mb-8 text-foreground">
          🤖 Chatbot Testing Suite
        </h1>

        {/* Custom Query Input */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-heading font-bold mb-4 text-foreground">
            Test Custom Query
          </h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCustomTest()}
              placeholder="Enter your test query..."
              className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary"
            />
            <button
              onClick={handleCustomTest}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium transition-colors"
            >
              Test
            </button>
            <button
              onClick={runAllTests}
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 font-medium transition-colors"
            >
              Run All Tests
            </button>
          </div>
        </div>

        {/* Predefined Test Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {Object.entries(testQueries).map(([category, queries]) => (
            <div
              key={category}
              className="bg-card border border-border rounded-lg p-4"
            >
              <h3 className="text-lg font-heading font-bold mb-3 text-foreground capitalize">
                {category}
              </h3>
              <div className="space-y-2">
                {queries.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTest(q, category)}
                    className="w-full text-left px-3 py-2 text-sm bg-background border border-border rounded hover:bg-primary/10 hover:border-primary/30 transition-colors text-foreground/80"
                  >
                    "{q}"
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="mb-4">
          <label htmlFor="chatbot-category-filter" className="sr-only">
            Filter test results by category
          </label>
          <select
            id="chatbot-category-filter"
            aria-label="Filter test results by category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
          >
            <option value="all">All Categories</option>
            {Object.keys(testQueries).map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
            <option value="custom">Custom</option>
          </select>
          <span className="ml-4 text-foreground/60">
            {filteredResults.length} results
          </span>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {filteredResults.map((result, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-lg p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs font-medium text-primary">
                      {result.category}
                    </span>
                    <span className="text-xs text-foreground/40">
                      {result.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-lg font-medium text-foreground mb-1">
                    Query: "{result.query}"
                  </p>
                </div>
              </div>
              <div className="bg-background border border-border rounded-lg p-4">
                <p className="text-sm text-foreground/80 whitespace-pre-wrap">
                  {result.response}
                </p>
              </div>
            </div>
          ))}
        </div>

        {results.length === 0 && (
          <div className="text-center py-12 text-foreground/40">
            <p className="text-lg">No test results yet. Try testing some queries!</p>
          </div>
        )}
      </div>
    </div>
  );
}
