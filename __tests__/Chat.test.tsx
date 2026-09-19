import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Chat from "../app/playground/components/Chat";

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("Chat", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input and send button", () => {
    render(<Chat />);
    expect(screen.getByPlaceholderText("Ask about accessibility...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
  });

  it("renders empty state message", () => {
    render(<Chat />);
    expect(screen.getByText("Start a conversation")).toBeInTheDocument();
  });

  it("has a stop button while streaming", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      body: {
        getReader: () => ({
          read: async () => ({ done: true, value: undefined }),
        }),
      },
    } as any);

    render(<Chat />);

    const input = screen.getByPlaceholderText("Ask about accessibility...");
    fireEvent.change(input, { target: { value: "Hello" } });
    fireEvent.click(screen.getByRole("button", { name: "Send" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Stop" })).toBeInTheDocument();
    });
  });

  it("shows streaming indicator after sending", async () => {
    let resolveRead: any;
    const readerPromise = new Promise<any>((resolve) => {
      resolveRead = resolve;
    });

    mockFetch.mockResolvedValue({
      ok: true,
      body: {
        getReader: () => ({
          read: async () => {
            await readerPromise;
            return { done: true, value: undefined };
          },
        }),
      },
    } as any);

    render(<Chat />);

    const input = screen.getByPlaceholderText("Ask about accessibility...");
    fireEvent.change(input, { target: { value: "Test message" } });
    fireEvent.click(screen.getByRole("button", { name: "Send" }));

    await waitFor(() => {
      expect(screen.getByText("Streaming...")).toBeInTheDocument();
    });

    resolveRead();
  });
});
