"use client";

import { useState, useRef, ReactNode } from "react";

interface DisclosureProps {
  label: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function Disclosure({ label, children, defaultOpen = false }: DisclosureProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      <button
        ref={buttonRef}
        role="button"
        aria-expanded={isOpen}
        aria-controls="disclosure-panel"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="flex items-center gap-2 w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
      >
        <span
          className={`transition-transform ${isOpen ? "rotate-90" : ""}`}
          aria-hidden="true"
        >
          ▶
        </span>
        {label}
      </button>
      <div
        id="disclosure-panel"
        role="region"
        aria-labelledby="disclosure-button"
        hidden={!isOpen}
        className="p-4 border-l-2 border-gray-200 ml-2 mt-2"
      >
        {children}
      </div>
    </div>
  );
}
