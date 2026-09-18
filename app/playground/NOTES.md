# Playground Notes: Hand-coded vs shadcn/ui

## What I Built
- `Modal.tsx` — Dialog with focus trap, Escape to close, ARIA roles
- `Tabs.tsx` — Tabbed interface with arrow key navigation
- `Disclosure.tsx` — Expandable section with keyboard toggle

## What shadcn/ui Uses
- `@base-ui/react` primitives (Dialog, Tabs, Accordion)
- `class-variance-authority` for variant management
- Portal rendering for overlays
- `data-slot` attributes for styling hooks

---

## Gap 1: Portal Rendering

**My version:** Renders dialog inline in the DOM tree.

**shadcn's version:** Uses `DialogPortal` to render content outside the component hierarchy.

**Why it matters:** Inline rendering causes z-index and stacking context issues. A dialog inside a `position: relative` parent with a low z-index will render behind other elements. Portal ensures the dialog always appears on top.

---

## Gap 2: Focus Management Primitives

**My version:** Manually queries `querySelectorAll` for focusable elements and handles Tab cycling.

**shadcn's version:** Delegates to `@base-ui/react/dialog` which implements the full W3C focus trap spec, including:
- Handling dynamically added/removed focusable elements
- Correct behavior when no focusable elements exist
- Proper restore of focus to the triggering element on close

**Why it matters:** My manual implementation misses edge cases. If a child component conditionally renders a button, my focus trap might break. The primitive library handles this automatically.

---

## Gap 3: Animations and Transitions

**My version:** No animations. Dialog appears/disappears instantly.

**shadcn's version:** Uses `data-open`/`data-closed` attributes with CSS animations (fade-in, zoom-in-95, fade-out, zoom-out-95).

**Why it matters:** Animations provide visual feedback that helps users understand spatial relationships. Without them, the dialog feels jarring and disconnected from the trigger.

---

## Gap 4: Variant System

**My version:** Single style, hard-coded.

**shadcn's version:** Tabs support `default` (pill style) and `line` (underline) variants via `class-variance-authority`. Accordion supports customization through className overrides.

**Why it matters:** Real projects need visual flexibility. A variant system lets you adapt the same component to different contexts without duplicating code.

---

## Gap 5: Composability

**My version:** Monolithic. Modal is one component that handles everything.

**shadcn's version:** Decomposed into `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`.

**Why it matters:** Decomposition lets consumers compose layouts freely. A footer might contain a close button and a submit button. A header might include an icon. Monolithic components force you into one layout.

---

## What I Got Right

1. **ARIA roles:** Both versions use `role="dialog"`, `aria-modal`, `aria-labelledby`
2. **Keyboard navigation:** Arrow keys in tabs, Escape in modal
3. **Focus restoration:** Both return focus to the trigger element on close
4. **aria-expanded:** Both use it for disclosure/accordion state

---

## Verdict

My hand-coded components are functional for simple cases. shadcn's are production-ready. The biggest gaps are **portal rendering**, **edge-case focus handling**, and **composability**. For a portfolio site, my version works. For a design system used by a team, use shadcn.
