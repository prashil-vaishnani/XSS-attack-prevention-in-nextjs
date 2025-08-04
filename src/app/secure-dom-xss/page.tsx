"use client";
import { useState, useEffect } from "react";
import BackToHomeButton from "../components/BackToHomeButton";

export default function SecureDomXssPage() {
  const [maliciousUrl, setMaliciousUrl] = useState("Loading URL...");

  useEffect(() => {
    const userInput = window.location.hash.substring(1);
    const greetingElement = document.getElementById("greeting");

    if (greetingElement) {
      // ✅ Use textContent to prevent XSS
      greetingElement.textContent = `Hello, ${userInput}`;
    }

    setMaliciousUrl(
      `${window.location.origin}/secure-dom-xss#<img src=x onerror="alert('XSS triggered')">`
    );
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-green-700 mb-4">
          ✅ Secure DOM-Based XSS Page
        </h1>

        <p className="text-gray-700 mb-4">
          This page is secure. It uses{" "}
          <code className="bg-gray-200 px-1 py-0.5 rounded">textContent</code>{" "}
          to insert user input as plain text, preventing script execution.
        </p>

        <div
          id="greeting"
          className="border border-gray-300 p-4 rounded bg-gray-50 text-gray-800 text-lg font-medium mb-6"
        >
          {/* Content will be injected here by useEffect */}
        </div>

        <p className="mb-2 text-gray-700">
          Try visiting this URL (no script will run):
        </p>
        <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm text-gray-800">
          <code>{maliciousUrl}</code>
        </pre>
      <BackToHomeButton />
      </div>
    </main>
  );
}
