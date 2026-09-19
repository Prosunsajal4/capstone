"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [showThinking, setShowThinking] = useState(false);
  const [userScrolled, setUserScrolled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const messageIdRef = useRef(0);

  const checkScrollPosition = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      100;
    setUserScrolled(!isNearBottom);
  }, []);

  const scrollToBottom = useCallback(
    (behavior: "auto" | "smooth" = "auto") => {
      const container = containerRef.current;
      if (container && container.scrollTo) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior,
        });
        setUserScrolled(false);
      }
    },
    []
  );

  useEffect(() => {
    if (!userScrolled && !isStreaming) {
      scrollToBottom("auto");
    }
  }, [messages, userScrolled, isStreaming, scrollToBottom]);

  const handleScroll = useCallback(() => {
    checkScrollPosition();
  }, [checkScrollPosition]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isStreaming) return;

      setError(null);
      setIsStreaming(true);
      setShowThinking(true);

      const userMsg: Message = {
        id: `user-${messageIdRef.current++}`,
        role: "user",
        content: text,
      };
      const assistantId = `assistant-${messageIdRef.current++}`;

      setMessages((prev) => [...prev, userMsg]);
      setInput("");

      const previousMessages = messages;

      try {
        abortControllerRef.current = new AbortController();

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              ...previousMessages.map((m) => ({
                role: m.role,
                content: m.content,
              })),
              { role: "user", content: text },
            ],
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          if (data.fallback) {
            const fallbackMsg: Message = {
              id: assistantId,
              role: "assistant",
              content:
                "AI analysis requires an API key. Configure ANTHROPIC_API_KEY to enable AI features.",
            };
            setMessages((prev) => [...prev, fallbackMsg]);
            setShowThinking(false);
            setIsStreaming(false);
            return;
          }
          throw new Error(data.error || "Request failed");
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error("No response body");
        }

        const decoder = new TextDecoder();
        let fullContent = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const text = decoder.decode(value);
          const lines = text.split("\n");

          for (const line of lines) {
            if (!line.trim()) continue;
            try {
              const parsed = JSON.parse(line);
              if (parsed.type === "token") {
                fullContent += parsed.text;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId
                      ? { ...m, content: fullContent }
                      : m
                  )
                );
                if (!userScrolled) {
                  scrollToBottom();
                }
              }
              if (parsed.type === "done") {
                setShowThinking(false);
                setIsStreaming(false);
                break;
              }
            } catch {
              // Skip non-JSON lines
            }
          }
        }

        setShowThinking(false);
        setIsStreaming(false);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
          setShowThinking(false);
          setIsStreaming(false);
        }
      }
    },
    [isStreaming, messages, userScrolled, scrollToBottom]
  );

  const handleStop = useCallback(() => {
    abortControllerRef.current?.abort();
    setIsStreaming(false);
    setShowThinking(false);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      sendMessage(input);
    },
    [input, sendMessage]
  );

  return (
    <div className="flex flex-col h-full">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0"
      >
        {messages.length === 0 && !showThinking && !error && (
          <div className="text-center text-gray-500 py-16">
            <p className="text-xl font-medium">Start a conversation</p>
            <p className="text-sm mt-2">Ask me anything about accessibility.</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-sm">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-2 text-sm text-red-600 underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-3 ${
                message.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
            </div>
          </div>
        ))}

        {showThinking && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex gap-1">
                  <span
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "-0.3s" }}
                  />
                  <span
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "-0.15s" }}
                  />
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                </span>
                <span className="text-sm text-gray-600">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          {userScrolled && messages.length > 0 && (
            <button
              onClick={() => scrollToBottom("smooth")}
              className="mb-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 shadow-lg"
            >
              Jump to latest ↓
            </button>
          )}
        </div>
      </div>

      {isStreaming && (
        <div className="px-4 pb-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Streaming...</span>
            <div className="w-20 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-blue-600 rounded-full animate-pulse" />
            </div>
          </div>
          <button
            onClick={handleStop}
            className="px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg hover:bg-gray-700 transition-colors"
          >
            Stop
          </button>
        </div>
      )}

      <div className="border-t bg-white p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about accessibility..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            autoComplete="off"
            disabled={isStreaming}
          />
          <button
            type="submit"
            disabled={!input.trim() || isStreaming}
            className="px-5 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
