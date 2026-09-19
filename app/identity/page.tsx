export default function IdentityPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-sm uppercase tracking-widest text-gray-500 mb-8">Identity Kit</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Typography</h2>
          <div className="space-y-2">
            <p className="text-lg">
              <span className="font-bold">Headings & Body:</span> Geist Sans
            </p>
            <p className="text-gray-600 text-sm">One font family. Weight variations for hierarchy.</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Palette</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <div className="w-full h-16 rounded-lg" style={{ backgroundColor: "#0a0a0a" }} />
              <p className="text-sm font-mono mt-2">Text</p>
              <p className="text-xs text-gray-500">#0a0a0a</p>
            </div>
            <div>
              <div className="w-full h-16 rounded-lg" style={{ backgroundColor: "#fafafa" }} />
              <p className="text-sm font-mono mt-2">Background</p>
              <p className="text-xs text-gray-500">#fafafa</p>
            </div>
            <div>
              <div className="w-full h-16 rounded-lg" style={{ backgroundColor: "#2563eb" }} />
              <p className="text-sm font-mono mt-2">Primary</p>
              <p className="text-xs text-gray-500">#2563eb</p>
            </div>
            <div>
              <div className="w-full h-16 rounded-lg" style={{ backgroundColor: "#16a34a" }} />
              <p className="text-sm font-mono mt-2">Accent</p>
              <p className="text-xs text-gray-500">#16a34a</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Logo</h2>
          <div className="flex items-center gap-3">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="8" fill="#2563eb" />
              <text x="20" y="27" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="Geist Sans, sans-serif">S</text>
            </svg>
            <p className="text-xl font-bold" style={{ fontFamily: "Geist Sans, sans-serif" }}>Sajal&apos;s Portfolio</p>
          </div>
        </section>

        <section className="mb-12 p-6 bg-gray-100 rounded-lg">
          <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-3">Style Note</h2>
          <p className="text-lg leading-relaxed">
            <span className="font-mono text-sm">Geist Sans · #0a0a0a · #fafafa · #2563eb · #16a34a</span>
          </p>
          <p className="text-gray-600 mt-2">
            Clear, professional, and calm. The work speaks; the design stays out of the way.
          </p>
        </section>
      </div>
    </main>
  );
}
