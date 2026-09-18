export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-6xl font-bold text-gray-300 mb-4">404</h2>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Page not found
        </h3>
        <p className="text-gray-600 mb-6">
          The page you&apos;re looking for doesn&apos; exist.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go home
        </a>
      </div>
    </div>
  );
}
