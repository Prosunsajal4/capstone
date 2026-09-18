# AI-Enhanced Portfolio & Accessibility Playground

A Next.js application featuring accessible components built from scratch, an AI-powered accessibility auditor, and production-ready deployment.

## Live Application

**URL:** https://foundation-next-azure.vercel.app

## Project Brief

This project solves the problem of accessibility compliance for frontend developers. It provides hand-built accessible components (Modal, Tabs, Disclosure) following W3C ARIA patterns, plus an AI-powered auditor that analyzes code for WCAG 2.1 AA violations. Built as a capstone project demonstrating accessible design, AI integration, testing, and production deployment.

## Features

- **Accessible Components** — Modal, Tabs, and Disclosure built from scratch with proper ARIA attributes and keyboard navigation
- **AI Accessibility Auditor** — Paste HTML/JSX code and get instant feedback powered by Claude AI
- **Health Check** — Live data fetching endpoint for monitoring
- **Error Handling** — Error boundaries, 404 page, graceful failure states

## Getting Started

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/foundation-next.git
cd foundation-next

# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Architecture

```
foundation-next/
├── app/
│   ├── api/audit/          # AI accessibility auditor API
│   ├── components/         # Shared components (ErrorBoundary)
│   ├── dashboard/          # Dashboard page
│   ├── health/             # Health check endpoint
│   ├── playground/         # Component demos + AI auditor
│   │   └── components/     # Modal, Tabs, Disclosure, Auditor
│   ├── profile/            # Profile page
│   ├── error.tsx           # Global error handler
│   ├── layout.tsx          # Root layout with navigation
│   ├── not-found.tsx       # 404 page
│   └── page.tsx            # Home page
├── __tests__/              # Unit tests
├── components/ui/          # shadcn/ui components (reference)
└── public/                 # Static assets
```

## AI Integration

### How It Works

The AI Accessibility Auditor uses the **Claude API** (Haiku model) to analyze HTML/JSX code for accessibility issues.

**Flow:**
1. User pastes code into the textarea
2. Code is sent to `/api/audit` endpoint
3. API calls Claude with a specialized prompt
4. Response is parsed and displayed with severity levels

**Prompt Strategy:**
- Role: Accessibility expert
- Task: Analyze code for WCAG 2.1 AA compliance
- Output: Structured JSON with issues, score, and summary
- Focus areas: ARIA attributes, keyboard access, color contrast, semantic HTML

**Why Claude:**
- Fast response time (Haiku model)
- Excellent at code analysis
- Structured output capability

### API Configuration

Set your Anthropic API key in `.env.local`:

```bash
ANTHROPIC_API_KEY=your_api_key_here
```

## Testing

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- __tests__/Modal.test.tsx
```

**Test Coverage:**
- Modal: 6 tests (rendering, keyboard, ARIA, focus)
- Tabs: 5 tests (rendering, navigation, ARIA)
- Disclosure: 6 tests (rendering, keyboard, ARIA, default state)

**Total: 17 tests passing**

## Accessibility

Built following W3C ARIA Authoring Practices:

| Component | Keyboard Support | ARIA Attributes |
|-----------|------------------|-----------------|
| Modal | Escape to close, Tab trapping | `role="dialog"`, `aria-modal`, `aria-labelledby` |
| Tabs | Arrow keys, Home/End | `role="tablist"`, `aria-selected`, `aria-controls` |
| Disclosure | Enter/Space to toggle | `aria-expanded`, `aria-controls` |

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full checklist.

**Quick deploy:**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## Known Limitations

- AI auditor requires a valid Anthropic API key
- No persistent storage for audit history
- Limited to client-side code analysis
- Rate limits apply to API calls

## Future Improvements

- [ ] Save audit history to local storage
- [ ] Add URL fetching for live site analysis
- [ ] Support for React component props analysis
- [ ] Integration with lighthouse for automated audits
- [ ] Batch analysis for multiple files

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS
- **AI:** Claude API (Haiku)
- **Testing:** Jest + React Testing Library
- **Deployment:** Vercel
- **Components:** shadcn/ui (reference)

## License

MIT
