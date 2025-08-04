"use client";

import { useState } from "react";
import BackToHomeButton from "../components/BackToHomeButton";

export default function InsecurePage() {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(input); // ⚠️ vulnerable usage
  };

  return (
    <main className="min-h-screen bg-red-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl w-full border border-red-300">
        <h1 className="text-2xl font-bold text-red-700 mb-4">
          🚨 Insecure XSS Demo
        </h1>

        <p className="text-gray-700 mb-2">
          This page is{" "}
          <span className="font-semibold text-red-600">vulnerable to XSS</span>.
          Try this payload:
        </p>
        <code className="bg-gray-100 px-2 py-1 rounded block mb-4">
          {`<img src="x" onerror="alert('XSS')">`}
        </code>

        <form onSubmit={handleSubmit} className="mb-6">
          <input
            type="text"
            placeholder="Enter some HTML/JS..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Submit
          </button>
        </form>

        <div>
          <p className="font-semibold text-gray-700 mb-2">
            Rendered Output (vulnerable):
          </p>
          <div
            className="border border-gray-300 rounded p-4 bg-gray-50 min-h-[60px] text-gray-800"
            dangerouslySetInnerHTML={{ __html: submitted }}
          />
        </div>
        <BackToHomeButton />
      </div>
    </main>
  );
}
