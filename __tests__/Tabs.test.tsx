import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Tabs } from "../app/playground/components/Tabs";

const tabs = [
  { id: "tab1", label: "Tab 1", content: <p>Content 1</p> },
  { id: "tab2", label: "Tab 2", content: <p>Content 2</p> },
  { id: "tab3", label: "Tab 3", content: <p>Content 3</p> },
];

describe("Tabs", () => {
  it("renders all tabs", () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByRole("tab", { name: "Tab 1" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Tab 2" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Tab 3" })).toBeInTheDocument();
  });

  it("shows first tab content by default", () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });

  it("switches tab on click", () => {
    render(<Tabs tabs={tabs} />);
    fireEvent.click(screen.getByRole("tab", { name: "Tab 2" }));
    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });

  it("has correct ARIA attributes", () => {
    render(<Tabs tabs={tabs} />);
    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab1).toHaveAttribute("aria-controls", "panel-tab1");
  });

  it("navigates with arrow keys", () => {
    render(<Tabs tabs={tabs} />);
    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    fireEvent.keyDown(tab1, { key: "ArrowRight" });
    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveFocus();
  });
});
