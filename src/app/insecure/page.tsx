import BackToHomeButton from "../components/BackToHomeButton";

export default async function InsecurePage({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ q?: string }>;
}>) {
  const { q: userInput = "no query provided" } = await searchParams;

  return (
    <main className="min-h-screen bg-red-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl w-full border border-red-300">
        <h1 className="text-2xl font-bold text-red-700 mb-4">
          🚨 Insecure Reflected XSS Page
        </h1>

        <p className="text-gray-700 mb-4">
          This page is{" "}
          <span className="text-red-600 font-semibold">vulnerable to XSS</span>{" "}
          via query parameters. It dangerously uses{" "}
          <code className="bg-gray-100 px-1 py-0.5 rounded">
            dangerouslySetInnerHTML
          </code>
          .
        </p>

        <div className="border border-gray-300 bg-gray-50 p-4 rounded mb-6">
          <p className="font-semibold text-gray-700 mb-2">Search result for:</p>
          <span
            className="text-gray-800 text-lg font-medium break-words"
            dangerouslySetInnerHTML={{ __html: userInput }}
          />
        </div>

        <p className="text-gray-700 mb-2">
          Try visiting this URL (⚠️ script will execute):
        </p>
        <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm text-gray-800">
          <code>
            {`https://xss-attack-prevention-in-nextjs.vercel.app/insecure?q=<script>alert('XSS Attack!');</script>`}
          </code>
        </pre>
        <BackToHomeButton />
      </div>
    </main>
  );
}
