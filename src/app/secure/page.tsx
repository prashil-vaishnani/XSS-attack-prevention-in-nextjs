import BackToHomeButton from "../components/BackToHomeButton";

export default async function SecurePage({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ q?: string }>;
}>) {
  const { q: userInput = "no query provided" } = await searchParams;

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-green-700 mb-4">
          ✅ Secure Reflected XSS Page
        </h1>

        <p className="text-gray-700 mb-4">
          This page prevents XSS by relying on React&apos;s automatic escaping
          mechanism.
        </p>

        <div className="border border-gray-300 bg-gray-50 p-4 rounded mb-6">
          <p className="font-semibold text-gray-700 mb-2">Search result for:</p>
          <span className="text-gray-800 text-lg font-medium break-words">
            {userInput}
          </span>
        </div>

        <p className="text-gray-700 mb-2">
          Try this malicious URL. The script won&apos;t execute:
        </p>
        <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm text-gray-800">
          <code>
            {`http://localhost:3000/secure?q=<script>alert('XSS Attack!');</script>`}
          </code>
        </pre>
        <BackToHomeButton />
      </div>
    </main>
  );
}
