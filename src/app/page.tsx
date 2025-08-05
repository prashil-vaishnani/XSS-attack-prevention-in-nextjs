// app/page.tsx
"use client";

import Link from "next/link";

const routes = [
  {
    label: "Stored XSS",
    insecure: "/insecure-store-xss",
    secure: "/secure-store-xss",
  },
  {
    label: "Reflected XSS (Query)",
    insecure: "/insecure",
    secure: "/secure",
  },
  {
    label: "DOM-based XSS (Hash)",
    insecure: "/insecure-dom-xss",
    secure: "/secure-dom-xss",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          🧪 XSS Proof of Concept Dashboard
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Navigate to insecure and secure examples to understand how XSS works
          and how to prevent it.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {routes.map(({ label, insecure, secure }, index) => (
            <div
              key={index + "-" + label}
              className="border p-4 rounded-lg bg-white shadow"
            >
              <h2 className="text-xl font-semibold mb-3">{label}</h2>
              <div className="flex gap-4">
                <Link
                  href={insecure}
                  className="flex-1 text-center bg-red-100 text-red-700 px-4 py-2 rounded hover:bg-red-200 transition"
                >
                  🚨 Insecure
                </Link>
                <Link
                  href={secure}
                  className="flex-1 text-center bg-green-100 text-green-700 px-4 py-2 rounded hover:bg-green-200 transition"
                >
                  ✅ Secure
                </Link>
              </div>
            </div>
          ))}
          <div
              className="border p-4 rounded-lg bg-white shadow"
            >
              <h2 className="text-xl font-semibold mb-3">Example middleware config</h2>
              <div className="flex gap-4">
                <Link
                  href={'/middleware-config'}
                  className="flex-1 text-center bg-green-100 text-green-700 px-4 py-2 rounded hover:bg-green-200 transition"
                >
                  ✅ Secure
                </Link>
              </div>
            </div>
        </div>
      </div>
    </main>
  );
}
