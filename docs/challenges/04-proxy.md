# Lab 04 — Redirect unauthenticated requests before rendering

**Difficulty:** Intermediate · **Code:** `apps/web/proxy.ts`, `apps/web/src/lib/session.ts` · **Test:** `apps/web/src/tests/04-proxy.challenge.test.ts`

## Business problem

The dashboard and settings pages contain private information. Right now, `proxy.ts` lets all requests through. Their page-level guards still protect content, but the request-boundary experience is wrong.

## Reproduce

Visit `/dashboard` without a session and inspect the route. Unlock the proxy test and run it.

## Implement

1. Read the cookie named `session` from the incoming request.
2. Use the existing `verifySessionToken` helper; **do not** merely check whether a cookie exists.
3. Redirect invalid or missing sessions to `/login`.
4. Let verified sessions proceed and keep the matcher restricted to protected paths.
5. Keep page/data authorization: the proxy is an early gate, not the sole authorization check.

## Acceptance

- Missing session redirects; a verified mocked session continues.
- Public routes and static files are not unnecessarily proxied.
- Existing page guards remain in place.

## Next.js version warning

The multiple-choice question refers to Edge `middleware.ts`. This repo uses **Next.js 16**, where the convention is `proxy.ts` with the **Node.js runtime**. Do not set an Edge runtime on this file. Stretch: add redirect-back-to-original-path behavior while avoiding open redirects.
