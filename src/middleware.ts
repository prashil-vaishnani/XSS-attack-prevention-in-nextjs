// middleware.ts
import { NextResponse } from "next/server";

export function middleware() {
  const nonce: string = Buffer.from(crypto.randomUUID()).toString("base64");

  const res = NextResponse.next();

  res.headers.set("Content-Security-Policy", [
    `default-src 'self';`,
    `script-src 'nonce-${nonce}' 'strict-dynamic';`,
    `object-src 'none';`,
    `base-uri 'none';`,
    `style-src 'self';`,
  ].join(" "));

  res.headers.set("x-nonce", nonce);

  return res;
}

// Apply middleware only to /middleware-config route
export const config = {
  matcher: ["/middleware-config"],
};
