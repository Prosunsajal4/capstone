import Anthropic from "@anthropic-ai/sdk";

// ============================================
// Model Configuration — single source of truth
// All model settings live here. Extend this
// module when adding new AI features.
// ============================================
export const modelConfig = {
  // Model used for all AI interactions
  model: "claude-3-haiku-20240307",
  // Creativity: 0.0 = deterministic, 1.0 = creative
  temperature: 0.7,
  // Maximum tokens in response
  maxTokens: 4096,
  // System prompt — defines the AI's role and behavior
  systemPrompt: `You are an accessibility expert. Analyze code and provide actionable feedback for WCAG 2.1 AA compliance. Be concise and specific. Format your responses with clear sections and use markdown for readability.`,
} as const;

// Factory function — ensures API key is read at runtime, not build time
export function createAnthropicClient(): Anthropic {
  return new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
}
