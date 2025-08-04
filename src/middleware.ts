import { NextRequest, NextResponse } from "next/server";
/*
 This middleware is included only to demonstrate XSS attacks for educational purposes. 
 In a real production environment, strict Content Security Policy (CSP) headers should be applied to all responses to prevent such vulnerabilities.
*/
export function middleware(request: NextRequest): NextResponse {
  const pathname = request.nextUrl.pathname;

  // Don't apply CSP on demo XSS routes
  const isInsecure = pathname.startsWith("/insecure");
  if (isInsecure) {
    return NextResponse.next(); // no CSP
  }
  const nonce: string = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader: string = `
        script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https: http: 'unsafe-eval';
        style-src 'self' 'unsafe-inline';
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
    `;
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue: string = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|insecure|insecure-dom-xss|danger|test-xss).*)",
  ],
};
