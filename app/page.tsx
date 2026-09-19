import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
        <div className="flex items-center gap-3">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="8" fill="#2563eb" />
            <text x="20" y="27" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="Geist Sans, sans-serif">S</text>
          </svg>
          <h1 className="text-3xl font-bold tracking-tight">Sajal&apos;s Portfolio</h1>
        </div>

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <p className="max-w-md text-lg leading-8 text-foreground">
            Accessible frontend components, AI integration, and documented
            design decisions.
          </p>
          <p className="max-w-md text-gray-600">
            Built with Next.js, Tailwind CSS, and Claude API.
          </p>
        </div>

        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-white transition-colors hover:bg-blue-700 md:w-[158px]"
            href="/playground"
          >
            View Playground
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] md:w-[158px]"
            href="/case-studies/ai-accessibility-auditor"
          >
            View Case Study
          </a>
        </div>
      </main>
    </div>
  );
}
