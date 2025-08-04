"use client";
import { useState, useEffect } from "react";
import BackToHomeButton from "../components/BackToHomeButton";

export default function InsecureDomXssPage() {
  const [maliciousUrl, setMaliciousUrl] = useState("Loading URL...");

  useEffect(() => {
    const urlHash = window.location.hash.substring(1);
    const userInput = decodeURIComponent(urlHash);
    const greetingElement = document.getElementById("greeting");
    if (greetingElement) {
      // ⚠️ Vulnerable to DOM-based XSS
      greetingElement.innerHTML = `Hello, ${userInput}`;
    }

    setMaliciousUrl(
      `${window.location.origin}/insecure-dom-xss#<img src=x onerror="alert('XSS triggered')">`
    );
  }, []);

  return (
    <main className="min-h-screen bg-red-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl w-full border border-red-300">
        <h1 className="text-2xl font-bold text-red-700 mb-4">
          🚨 Insecure DOM-Based XSS Page
        </h1>

        <p className="text-gray-700 mb-4">
          This page is{" "}
          <span className="text-red-600 font-semibold">vulnerable to XSS</span>{" "}
          via the URL hash. It uses{" "}
          <code className="bg-gray-100 px-1 py-0.5 rounded">innerHTML</code>{" "}
          with unsanitized input.
        </p>

        <div
          id="greeting"
          className="border border-gray-300 p-4 rounded bg-gray-50 text-lg text-gray-800 font-medium mb-6"
        >
          {/* Injected user input will appear here */}
        </div>

        <p className="text-gray-700 mb-2">
          To test the vulnerability, paste this in your address bar:
        </p>
        <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm text-gray-800">
          <code>{maliciousUrl}</code>
        </pre>
        <BackToHomeButton />
      </div>
    </main>
  );
}
