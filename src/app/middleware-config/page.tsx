// app/page.tsx
import { headers } from "next/headers";

export default async function Page() {
  const nonce = (await headers()).get("x-nonce"); // Provided by middleware

  const codeExample = `
<script nonce="${nonce}">
  alert('This is safe script using CSP nonce!');
</script>`;
  const csp = [
    `default-src 'self';`,
    `script-src 'nonce-${nonce}' 'strict-dynamic';`,
    `object-src 'none';`,
    `base-uri 'none';`,
    `style-src 'self';`,
  ].join("\n");
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6">
        <h1 className="text-3xl font-bold text-blue-600">
          XSS Protection Demo
        </h1>

        <p className="text-gray-700">
          This page is protected with a <strong>Content-Security-Policy</strong>{" "}
          using a dynamic{" "}
          <code className="bg-gray-200 px-1 rounded text-sm">nonce</code>.
          Scripts without the valid nonce are blocked.
        </p>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            Example &lt;code&gt; block with nonce
          </h2>
          <pre className="bg-black text-green-300 p-4 rounded overflow-auto whitespace-pre-wrap">
            <code>{codeExample}</code>
          </pre>
        </div>
        <p className="text-gray-700">
          Below is an example of the <strong>Content-Security-Policy</strong>{" "}
          that was applied to this page using{" "}
          <code className="bg-gray-200 px-1 rounded text-sm">
            middleware.ts
          </code>{" "}
          and a dynamically generated nonce:
        </p>

        <div>
          <h2 className="text-xl font-semibold mb-2">Applied CSP Header</h2>
          <pre className="bg-black text-green-400 p-4 rounded overflow-auto whitespace-pre-wrap text-sm">
            <code>{csp}</code>
          </pre>
        </div>
        <p className="text-sm text-gray-500">
          View page source and dev tools → &quot;Headers&quot; tab to verify CSP
          with nonce.
        </p>
      </div>
    </main>
  );
}
