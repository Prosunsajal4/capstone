import { NextRequest } from "next/server";
import { modelConfig } from "../../config/model";
import Anthropic from "@anthropic-ai/sdk";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const { messages }: { messages: Array<{ role: string; content: string }> } =
      await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response("Missing messages", { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: "API key not configured",
          fallback: true,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const client = new Anthropic({ apiKey });

    const stream = await client.messages.stream(
      {
        model: modelConfig.model,
        system: modelConfig.systemPrompt,
        messages: messages as any,
        temperature: modelConfig.temperature,
        max_tokens: modelConfig.maxTokens,
      } as any
    );

    const encoder = new TextEncoder();

    const streamData = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream as any) {
          if (chunk.type === "content_block_delta" && chunk.delta?.text) {
            const data = JSON.stringify({ type: "token", text: chunk.delta.text });
            controller.enqueue(encoder.encode(data + "\n"));
          }
          if (chunk.type === "message_stop") {
            controller.enqueue(encoder.encode(JSON.stringify({ type: "done" }) + "\n"));
            break;
          }
        }
        controller.close();
      },
    });

    return new Response(streamData, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
