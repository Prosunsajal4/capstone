"use client";

import { useState, useRef, ReactNode } from "react";

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTabId?: string;
}

export function Tabs({ tabs, defaultTabId }: TabsProps) {
  const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0]?.id);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    let newIndex = currentIndex;

    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        newIndex = (currentIndex + 1) % tabs.length;
        break;
      case "ArrowLeft":
        e.preventDefault();
        newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case "Home":
        e.preventDefault();
        newIndex = 0;
        break;
      case "End":
        e.preventDefault();
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    const newTab = tabs[newIndex];
    setActiveTabId(newTab.id);
    tabRefs.current.get(newTab.id)?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Sample tabs" className="flex border-b">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => {
              if (el) tabRefs.current.set(tab.id, el);
            }}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTabId === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTabId === tab.id ? 0 : -1}
            onClick={() => setActiveTabId(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`px-4 py-2 -mb-px font-medium transition-colors
              ${
                activeTabId === tab.id
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTabId !== tab.id}
          tabIndex={0}
          className="p-4 focus:outline-none"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
