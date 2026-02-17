import { useEffect } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatBot } from "@/components/ChatBot";
import { ChatProvider, useChat } from "@/contexts/ChatContext";
import { queryMatcher } from "@/lib/chatbotMatcher";
import { createInitialSessionState, type ChatbotReply, type IntentId } from "@/lib/chatbotTypes";

const makeReply = (text: string, intent: IntentId = "about"): ChatbotReply => ({
  text,
  intent,
  confidence: 0.9,
  entity: null,
  variantId: `${intent}:0`,
  suggestions: [],
  session: createInitialSessionState(),
  match: {
    intent,
    score: 5,
    secondBestScore: 1,
    confidence: 0.9,
    matchedEntity: null,
    debugHits: ["test"],
  },
});

const ChatHarness = () => {
  const { openChat, closeChat } = useChat();

  useEffect(() => {
    openChat();
  }, [openChat]);

  return (
    <>
      <button onClick={openChat}>open-chat</button>
      <button onClick={closeChat}>close-chat</button>
      <ChatBot />
    </>
  );
};

const renderChatbot = () =>
  render(
    <ChatProvider>
      <ChatHarness />
    </ChatProvider>,
  );

describe("ChatBot component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows loading indicator and appends assistant message", async () => {
    vi.spyOn(queryMatcher, "getResponse").mockReturnValue(makeReply("reply after typing"));
    const user = userEvent.setup();

    renderChatbot();
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Ask me anything...")).toBeInTheDocument();
    });

    await user.type(screen.getByPlaceholderText("Ask me anything..."), "who are you");
    await user.click(screen.getByLabelText("Send message"));

    expect(screen.getByTestId("assistant-loading")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId("assistant-loading")).not.toBeInTheDocument();
    }, { timeout: 2000 });
    expect(screen.getByText("reply after typing")).toBeInTheDocument();
  });

  it("clears pending response timer when chat closes", async () => {
    vi.spyOn(queryMatcher, "getResponse").mockReturnValue(makeReply("this should never render"));
    const user = userEvent.setup();

    renderChatbot();
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Ask me anything...")).toBeInTheDocument();
    });

    await user.type(screen.getByPlaceholderText("Ask me anything..."), "who are you");
    await user.click(screen.getByLabelText("Send message"));
    await user.click(screen.getByLabelText("Close chat"));
    await new Promise((resolve) => setTimeout(resolve, 1400));

    await user.click(screen.getByText("open-chat"));
    expect(screen.queryByText("this should never render")).not.toBeInTheDocument();
  });

  it("renders user message as plain text and does not inject HTML", async () => {
    vi.spyOn(queryMatcher, "getResponse").mockReturnValue(makeReply("safe response"));
    const user = userEvent.setup();

    const { container } = renderChatbot();
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Ask me anything...")).toBeInTheDocument();
    });

    const payload = "<img src=x onerror=alert(1)>";
    await user.type(screen.getByPlaceholderText("Ask me anything..."), payload);
    await user.click(screen.getByLabelText("Send message"));

    await waitFor(() => {
      expect(screen.getByText(payload)).toBeInTheDocument();
    }, { timeout: 2000 });
    expect(container.querySelector("img[src='x']")).toBeNull();
  });

  it("renders markdown safely for assistant responses", async () => {
    vi.spyOn(queryMatcher, "getResponse").mockReturnValue(
      makeReply("**Bold** and safe <script>window.__chatbotXss = true</script>"),
    );
    const user = userEvent.setup();

    const { container } = renderChatbot();
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Ask me anything...")).toBeInTheDocument();
    });

    await user.type(screen.getByPlaceholderText("Ask me anything..."), "test markdown");
    await user.click(screen.getByLabelText("Send message"));

    await waitFor(() => {
      expect(screen.getByText("Bold")).toBeInTheDocument();
    }, { timeout: 2000 });
    expect(screen.getByText("Bold").tagName).toBe("STRONG");
    expect(container.querySelector("script")).toBeNull();
    expect((window as Window & { __chatbotXss?: boolean }).__chatbotXss).toBeUndefined();
  });

  it("shows a guided message when the same unclear query repeats", async () => {
    vi.spyOn(queryMatcher, "getResponse").mockReturnValue(makeReply("not sure", "clarify"));
    const user = userEvent.setup();

    renderChatbot();
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Ask me anything...")).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText("Ask me anything...");
    const send = screen.getByLabelText("Send message");

    await user.type(input, "unclear question");
    await user.click(send);
    await waitFor(() => {
      expect(screen.getByText("not sure")).toBeInTheDocument();
    }, { timeout: 2000 });

    await user.type(input, "unclear question");
    await user.click(send);
    await waitFor(() => {
      expect(screen.getByText(/I see the same unclear ask again, so let me help directly\./i)).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});
