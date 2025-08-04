# 🔐 XSS Demo App with Next.js 15

This project demonstrates common **Cross-Site Scripting (XSS)** vulnerabilities and their secure alternatives using **Next.js 15 (App Router)**. It includes both **secure** and **insecure** examples across different types of XSS attacks:

- **Reflected XSS**
- **Stored XSS**
- **DOM-based XSS**

---

## 🗂️ Pages Overview

| Route | Description | Security |
|-------|-------------|----------|
| `/` | Home page with navigation to all demos | ✅ Secure |
| `/insecure` | Reflected XSS via query param | ❌ Insecure |
| `/secure` | Safe alternative to `/insecure` | ✅ Secure |
| `/insecure-store-xss` | Stored XSS using `dangerouslySetInnerHTML` | ❌ Insecure |
| `/secure-store-xss` | Escaped rendering using React’s safe output | ✅ Secure |
| `/insecure-dom-xss` | DOM-based XSS via URL hash + `innerHTML` | ❌ Insecure |
| `/secure-dom-xss` | Secure DOM XSS handling using escaping | ✅ Secure |

---

## 🛡️ Middleware (Optional CSP)

You can add a `middleware.ts` file to inject a **Content Security Policy (CSP)** header and a dynamic `nonce` to all responses. However, for this demo, it is **intentionally disabled** on insecure routes to allow PoC testing.
```ts
// middleware.ts
// ⚠️ add CSP as per project's need in real production projects
import { NextRequest, NextResponse } from 'next/server'
 
export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()
 
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
 
  requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )
 
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )
 
  return response
}
```
In real-world applications, apply CSP globally and sanitize all user input.

🏃 Getting Started
1. Clone the repository
```bash
git clone https://github.com/your-username/xss-demo-next.git
cd xss-demo-next
```
2. Install dependencies
```bash
npm install
```
3. Run the app
```bash
npm run dev
```
Visit: http://localhost:3000

🎯 Testing XSS Vulnerabilities
Reflected XSS
```url
http://localhost:3000/insecure?q=<script>alert('XSS');</script>
```

Stored XSS
Submit this in the form:

```html
<img src=x onerror="alert('Stored XSS')" />
```
DOM-based XSS
Use this URL directly:

```url
http://localhost:3000/insecure-dom-xss#<img src=x onerror=alert('XSS Attack!')>
```

📁 Folder Structure
```
app/
│
├── components/
│   └── BackToHomeButton.tsx
│
├── insecure/
│   ├── page.tsx         ← Reflected XSS
│   └── store-xss.tsx    ← Stored XSS
│
├── secure/
│   ├── page.tsx         ← Secure reflected XSS
│   └── store-xss.tsx    ← Secure stored XSS
│
├── insecure-dom-xss/
│   └── page.tsx         ← DOM-based XSS
│
├── secure-dom-xss/
│   └── page.tsx         ← Secure DOM handling
│
└── page.tsx             ← Home page navigation
```

✅ Best Practices for XSS Prevention
- Use frameworks like React that auto-escape output
- Avoid dangerouslySetInnerHTML unless absolutely necessary
- Use CSP with nonce-based inline script control
- Sanitize and validate user input on both client & server sides

