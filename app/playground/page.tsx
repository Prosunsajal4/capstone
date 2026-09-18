"use client";

import { useState } from "react";
import { Modal } from "./components/Modal";
import { Tabs } from "./components/Tabs";
import { Disclosure } from "./components/Disclosure";
import { AccessibilityAuditor } from "./components/AccessibilityAuditor";
import { ErrorBoundary } from "../components/ErrorBoundary";

export default function Playground() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = [
    { id: "tab1", label: "Tab 1", content: <p>Content for Tab 1</p> },
    { id: "tab2", label: "Tab 2", content: <p>Content for Tab 2</p> },
    { id: "tab3", label: "Tab 3", content: <p>Content for Tab 3</p> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Playground - Accessible Components</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Modal Dialog</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Open Modal
        </button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Accessible Modal"
        >
          <p>This modal traps focus and can be closed with Escape.</p>
          <p className="mt-2">Tab cycles through focusable elements inside.</p>
          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </Modal>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Tabs</h2>
        <Tabs tabs={tabs} />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Disclosure</h2>
        <Disclosure label="Click to expand">
          <p>This content is revealed when the disclosure is opened.</p>
          <p>Use Enter or Space to toggle.</p>
        </Disclosure>
        <div className="mt-4">
          <Disclosure label="Another disclosure" defaultOpen>
            <p>This one starts open by default.</p>
          </Disclosure>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">AI Accessibility Auditor</h2>
        <p className="text-gray-600 mb-4">
          Paste your HTML/JSX code and get instant accessibility feedback powered by Claude AI.
        </p>
        <ErrorBoundary>
          <AccessibilityAuditor />
        </ErrorBoundary>
      </section>
    </div>
  );
}
