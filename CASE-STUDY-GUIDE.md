# How to Add the Next Case Study

## The Three-Beat Shape

Every case study follows this structure:

1. **Problem** — What was broken, missing, or needed? Who felt the pain?
2. **What You Did** — Your specific actions, decisions, and technical choices. Not "we built a thing." What did YOU do?
3. **What Came Of It** — Results, metrics, learnings, or outcomes.

---

## Steps to Add a New Case Study

### 1. Create the Case Study Page

```bash
# In your project directory
mkdir -p app/case-studies/[slug]
```

Create `app/case-studies/[slug]/page.tsx`:

```tsx
export default function CaseStudyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">[Case Study Title]</h1>
      <p className="text-gray-500 mb-8">[Date] · [Category]</p>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Problem</h2>
        <p>[What was broken or needed?]</p>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">What I Did</h2>
        <p>[Your specific actions and decisions]</p>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Results</h2>
        <p>[What came of it? Metrics, outcomes, learnings.]</p>
      </section>
    </main>
  );
}
```

### 2. Add to Navigation

Edit `app/layout.tsx` and add a link:

```tsx
<Link href="/case-studies/[slug]" className="text-gray-900 hover:text-blue-600">
  Case Studies
</Link>
```

### 3. Add to Home Page (Optional)

Add a "Featured Work" section to `app/page.tsx`:

```tsx
<section className="mb-12">
  <h2 className="text-2xl font-semibold mb-4">Featured Work</h2>
  <a href="/case-studies/[slug]" className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100">
    <h3 className="font-semibold">[Case Study Title]</h3>
    <p className="text-gray-600 mt-2">[One-line summary]</p>
  </a>
</section>
```

### 4. Deploy

```bash
git add .
git commit -m "Add case study: [title]"
git push
```

Vercel auto-deploys on push.

---

## Writing Checklist

- [ ] Problem is specific (not "users needed better UX")
- [ ] Your role is clear (not "we built")
- [ ] Technical decisions are explained (not just listed)
- [ ] Results are quantified where possible
- [ ] Learnings are honest (what would you do differently?)

---

## Keep It Cheap

Your Claude Project already knows:
- Your voice and writing style
- Your tech stack (Next.js, Tailwind, etc.)
- Your identity kit (colors, fonts, tone)

Just start a conversation: "Write a case study about [project] using the three-beat shape." It's a short conversation, not a rebuild.
