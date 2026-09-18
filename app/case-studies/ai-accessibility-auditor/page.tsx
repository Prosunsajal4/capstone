export default function CaseStudyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">AI Accessibility Auditor</h1>
      <p className="text-gray-500 mb-8">September 2026 · AI Integration</p>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Problem</h2>
        <p>
          Frontend developers often ship inaccessible code without realizing it. 
          Manual WCAG audits are time-consuming and require specialized knowledge. 
          Most devs don&apos;t catch accessibility issues until a user complains—or worse, 
          until a lawsuit arrives.
        </p>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">What I Did</h2>
        <p>
          Built an AI-powered accessibility auditor that analyzes HTML/JSX code in real-time. 
          Used Claude API (Haiku model) with a structured prompt to return actionable WCAG 2.1 AA 
          violations. Added a fallback rule-based analyzer for when no API key is configured.
        </p>
        <ul className="list-disc list-inside mt-4 text-gray-700">
          <li>Designed structured JSON output for consistent parsing</li>
          <li>Implemented rule-based fallback (missing alt, keyboard issues, contrast)</li>
          <li>Added severity levels (error/warning/info) with specific fix suggestions</li>
          <li>Built error boundaries for graceful failure</li>
        </ul>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Results</h2>
        <p>
          The auditor catches common accessibility violations instantly. It&apos;s live at 
          /playground and has been used to audit component code during development. 
          When an API key is configured, it provides deeper AI-powered analysis.
        </p>
      </section>
    </main>
  );
}
