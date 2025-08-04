// app/components/BackToHomeButton.tsx
"use client";

import { useRouter } from "next/navigation";

interface BackToHomeButtonProps {
  variant?: "secure" | "insecure";
}

export default function BackToHomeButton({
  variant = "secure",
}: Readonly<BackToHomeButtonProps>) {
  const router = useRouter();

  const colors = {
    secure: {
      bg: "bg-green-600",
      hover: "hover:bg-green-700",
    },
    insecure: {
      bg: "bg-red-600",
      hover: "hover:bg-red-700",
    },
  };

  const { bg, hover } = colors[variant];

  return (
    <button
      onClick={() => router.push("/")}
      className={`mt-8 px-4 py-2 text-white rounded ${bg} ${hover}`}
    >
      ← Back to Home
    </button>
  );
}
