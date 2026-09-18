import { NextRequest, NextResponse } from "next/server";

interface AuditIssue {
  severity: "error" | "warning" | "info";
  rule: string;
  description: string;
  fix: string;
  line: string;
}

interface AuditResult {
  issues: AuditIssue[];
  score: number;
  summary: string;
}

function analyzeCodeLocally(code: string): AuditResult {
  const issues: AuditIssue[] = [];
  let score = 100;

  const imgRegex = /<img[^>]*>/gi;
  const imgMatches = code.match(imgRegex) || [];
  for (const img of imgMatches) {
    if (!img.includes("alt=")) {
      issues.push({
        severity: "error",
        rule: "WCAG 1.1.1 - Non-text Content",
        description: "Image missing alt attribute",
        fix: 'Add alt="descriptive text" to the img element',
        line: img.substring(0, 50),
      });
      score -= 15;
    }
  }

  const onclickDivs = code.match(/<div[^>]*onClick[^>]*>/gi) || [];
  for (const div of onclickDivs) {
    issues.push({
      severity: "error",
      rule: "WCAG 4.1.2 - Name, Role, Value",
      description: "Clickable div missing keyboard support",
      fix: "Use a <button> element instead, or add tabIndex, onKeyDown, and role='button'",
      line: div.substring(0, 50),
    });
    score -= 15;
  }

  const onclickSpans = code.match(/<span[^>]*onClick[^>]*>/gi) || [];
  for (const span of onclickSpans) {
    issues.push({
      severity: "error",
      rule: "WCAG 4.1.2 - Name, Role, Value",
      description: "Clickable span missing keyboard support",
      fix: "Use a <button> element instead, or add tabIndex, onKeyDown, and role='button'",
      line: span.substring(0, 50),
    });
    score -= 15;
  }

  const lowContrastRegex = /color:\s*#[a-fA-F0-9]{3,6}[^;]*;\s*background:\s*#[a-fA-F0-9]{3,6}/gi;
  if (lowContrastRegex.test(code)) {
    issues.push({
      severity: "warning",
      rule: "WCAG 1.4.3 - Contrast (Minimum)",
      description: "Potential color contrast issue detected",
      fix: "Ensure text has at least 4.5:1 contrast ratio against background",
      line: "Inline styles",
    });
    score -= 10;
  }

  const inputRegex = /<input[^>]*>/gi;
  const inputMatches = code.match(inputRegex) || [];
  for (const input of inputMatches) {
    if (!input.includes("aria-label") && !input.includes("id=")) {
      issues.push({
        severity: "warning",
        rule: "WCAG 1.3.1 - Info and Relationships",
        description: "Input element may lack accessible label",
        fix: "Add aria-label or associate with a <label> element",
        line: input.substring(0, 50),
      });
      score -= 5;
    }
  }

  const hasRole = code.includes("role=");
  const hasAriaLabel = code.includes("aria-label");
  if (!hasRole && !hasAriaLabel && code.includes("<div")) {
    issues.push({
      severity: "info",
      rule: "WCAG 4.1.2 - Name, Role, Value",
      description: "No ARIA roles or labels found in the code",
      fix: "Consider adding role and aria-label attributes for better screen reader support",
      line: "General",
    });
    score -= 5;
  }

  const buttons = code.match(/<button[^>]*>[^<]*<\/button>/gi) || [];
  for (const btn of buttons) {
    const text = btn.replace(/<[^>]*>/g, "").trim();
    if (!text && !btn.includes("aria-label")) {
      issues.push({
        severity: "warning",
        rule: "WCAG 4.1.2 - Name, Role, Value",
        description: "Button has no visible text or aria-label",
        fix: "Add text content or aria-label to the button",
        line: btn.substring(0, 50),
      });
      score -= 5;
    }
  }

  score = Math.max(0, score);

  let summary = "";
  if (score >= 80) {
    summary = "This code has good accessibility fundamentals with minor improvements possible.";
  } else if (score >= 50) {
    summary = "This code has several accessibility issues that should be addressed for WCAG 2.1 AA compliance.";
  } else {
    summary = "This code has significant accessibility issues that will prevent many users from interacting with it.";
  }

  if (issues.length === 0) {
    summary = "No obvious accessibility issues found. For a thorough audit, configure an Anthropic API key for AI-powered analysis.";
  }

  return { issues, score, summary };
}

async function analyzeWithClaude(code: string, apiKey: string): Promise<AuditResult> {
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
    throw new Error("Claude API error");
  }

  const data = await response.json();
  const content = data.content[0].text;

  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Invalid response format");
  }

  return JSON.parse(jsonMatch[0]);
}

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

    let result: AuditResult;

    if (apiKey) {
      result = await analyzeWithClaude(code, apiKey);
    } else {
      result = analyzeCodeLocally(code);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Audit error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
