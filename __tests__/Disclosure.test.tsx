import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Disclosure } from "../app/playground/components/Disclosure";

describe("Disclosure", () => {
  it("renders with label", () => {
    render(
      <Disclosure label="Toggle">
        <p>Content</p>
      </Disclosure>
    );
    expect(screen.getByRole("button", { name: "Toggle" })).toBeInTheDocument();
  });

  it("hides content when closed", () => {
    render(
      <Disclosure label="Toggle">
        <p>Content</p>
      </Disclosure>
    );
    expect(screen.queryByText("Content")).not.toBeVisible();
  });

  it("shows content when clicked", () => {
    render(
      <Disclosure label="Toggle">
        <p>Content</p>
      </Disclosure>
    );
    fireEvent.click(screen.getByRole("button", { name: "Toggle" }));
    expect(screen.getByText("Content")).toBeVisible();
  });

  it("toggles with Enter key", () => {
    render(
      <Disclosure label="Toggle">
        <p>Content</p>
      </Disclosure>
    );
    const button = screen.getByRole("button", { name: "Toggle" });
    fireEvent.keyDown(button, { key: "Enter" });
    expect(screen.getByText("Content")).toBeVisible();
    fireEvent.keyDown(button, { key: "Enter" });
    expect(screen.queryByText("Content")).not.toBeVisible();
  });

  it("has correct ARIA attributes", () => {
    render(
      <Disclosure label="Toggle">
        <p>Content</p>
      </Disclosure>
    );
    const button = screen.getByRole("button", { name: "Toggle" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-controls", "disclosure-panel");
  });

  it("starts open when defaultOpen is true", () => {
    render(
      <Disclosure label="Toggle" defaultOpen>
        <p>Content</p>
      </Disclosure>
    );
    expect(screen.getByText("Content")).toBeVisible();
    expect(screen.getByRole("button", { name: "Toggle" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
  });
});
