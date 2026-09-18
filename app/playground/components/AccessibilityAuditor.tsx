"use client";

import { useState } from "react";

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

const SAMPLE_CODE = `<!-- Paste your HTML/JSX here -->
<div>
  <img src="photo.jpg">
  <div onclick="handleClick">Click me</div>
  <input type="text">
  <div style="color: #aaa; background: white">Low contrast text</div>
</div>`;

export function AccessibilityAuditor() {
  const [code, setCode] = useState(SAMPLE_CODE);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAudit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Audit failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "error":
        return "bg-red-100 text-red-800 border-red-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Paste your HTML/JSX code:
        </label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 p-4 font-mono text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Paste your code here..."
        />
      </div>

      <button
        onClick={handleAudit}
        disabled={loading || !code.trim()}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Analyzing...
          </>
        ) : (
          "Audit Accessibility"
        )}
      </button>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor(result.score)}`}>
                {result.score}
              </div>
              <div className="text-sm text-gray-600">Score</div>
            </div>
            <div className="flex-1">
              <p className="text-gray-700">{result.summary}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">
              Issues Found ({result.issues.length})
            </h3>
            <div className="space-y-3">
              {result.issues.map((issue, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-lg border ${getSeverityColor(issue.severity)}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-medium">{issue.rule}</div>
                      <div className="text-sm mt-1">{issue.description}</div>
                      <div className="text-sm mt-2 font-medium">
                        Fix: {issue.fix}
                      </div>
                    </div>
                    <span className="text-xs uppercase font-medium px-2 py-1 rounded">
                      {issue.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
