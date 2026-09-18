import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Code is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: `You are an accessibility expert. Analyze this React/HTML code for WCAG 2.1 AA compliance issues.

Code:
${code}

Provide your analysis in this exact JSON format:
{
  "issues": [
    {
      "severity": "error|warning|info",
      "rule": "WCAG rule name",
      "description": "What's wrong",
      "fix": "How to fix it",
      "line": "approximate line or element"
    }
  ],
  "score": 0-100,
  "summary": "One paragraph overview"
}

Focus on:
- Missing alt text on images
- Missing ARIA labels
- Color contrast issues
- Keyboard accessibility
- Focus management
- Semantic HTML usage
- Screen reader compatibility

Be specific and actionable. Return only valid JSON.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Claude API error:", error);
      return NextResponse.json(
        { error: "Failed to analyze code" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const content = data.content[0].text;

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "Invalid response format" },
        { status: 500 }
      );
    }

    const result = JSON.parse(jsonMatch[0]);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Audit error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
