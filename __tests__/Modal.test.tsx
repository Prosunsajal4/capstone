import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "../app/playground/components/Modal";

describe("Modal", () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    title: "Test Modal",
    children: <p>Modal content</p>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders when open", () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onClose when Escape is pressed", () => {
    const onClose = jest.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText("Close dialog"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("has correct ARIA attributes", () => {
    render(<Modal {...defaultProps} />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");
  });

  it("focuses the dialog content on open", () => {
    render(<Modal {...defaultProps} />);
    const focusable = screen.getByRole("dialog").querySelector("[tabindex]");
    expect(focusable).toHaveFocus();
  });
});
