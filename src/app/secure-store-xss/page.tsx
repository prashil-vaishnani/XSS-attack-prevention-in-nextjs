"use client";

import { useState } from "react";
import DOMPurify from "dompurify";
import BackToHomeButton from "../components/BackToHomeButton";

export default function SecurePage() {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = DOMPurify.sanitize(input); // ✅ Sanitize input
    setSubmitted(clean);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-green-700 mb-4">
          ✅ Secure XSS Demo
        </h1>
        <p className="mb-2 text-sm text-gray-600">
          Try this payload:{" "}
          <code className="bg-gray-200 px-1 py-0.5 rounded">{`<img src="x" onerror="alert('XSS')">`}</code>
        </p>

        <form onSubmit={handleSubmit} className="mb-6">
          <input
            type="text"
            placeholder="Try injecting HTML/JS..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Submit
          </button>
        </form>

        <div>
          <p className="font-semibold mb-2 text-gray-700">
            Rendered Output (sanitized):
          </p>
          <div
            className="border border-gray-300 rounded p-4 bg-gray-50 min-h-[60px]"
            dangerouslySetInnerHTML={{ __html: submitted }}
          />
        </div>
        <BackToHomeButton />
      </div>
    </main>
  );
}
