# Reflection

## What Was Hardest?

**Focus management in the Modal component.** Getting the focus trap to work correctly—cycling through focusable elements, restoring focus on close, handling dynamic content—required understanding the browser's focus API deeply. The W3C spec describes the behavior clearly, but implementing it without a library meant handling edge cases like empty modals and conditionally rendered buttons.

**AI prompt engineering for structured output.** Getting Claude to return valid JSON with consistent fields (severity, rule, description, fix) took several iterations. The model sometimes added markdown formatting or explanatory text around the JSON, requiring post-processing to extract the actual data.

## What Would I Do Differently?

**Start with tests.** I built the components first and added tests later. Writing tests first would have caught the focus management issues earlier and given me confidence to refactor.

**Use a primitive library from the start.** After comparing my hand-coded components to shadcn/ui's, I realize that using `@base-ui/react` or similar would have saved time on accessibility while still letting me understand the patterns. Hand-coding was educational but not practical for production.

**Set up CI/CD earlier.** Deployment was manual until the end. Setting up GitHub Actions for tests and Vercel previews from day one would have caught integration issues sooner.

## One Thing That Surprised Me

**How much CSS matters for accessibility.** I focused on ARIA attributes and keyboard navigation, but the biggest accessibility wins came from simple CSS changes: ensuring sufficient color contrast, adding focus-visible outlines, and using `sr-only` text for screen readers. The technical ARIA work is necessary, but visual design is where users actually feel the difference.

## Key Takeaways

1. **Accessibility is not optional.** Building components without ARIA is like building forms without validation—it works until it doesn't, and the failure is invisible to the people who need it most.

2. **AI integration needs structure.** Sending "analyze this code" to an LLM gives vague results. Specifying the output format, focus areas, and severity levels turns a party trick into a useful tool.

3. **Testing reveals assumptions.** I thought my Modal was correct until I wrote a test for focus behavior. The test failed, revealing a bug I hadn't noticed.

4. **Deployment is part of the work.** A working local app is not a shipped product. The deployment checklist, error handling, and monitoring setup are what separate "it works on my machine" from "it works for everyone."
