# Lab 06 — Separate access and refresh tokens safely

**Difficulty:** Advanced · **Code:** `apps/api/src/challenges/session.ts` · **Test:** `apps/api/src/tests/06-tokens.challenge.test.ts`

## Business problem

A browser application needs a short-lived access token for API calls, plus a long-lived refresh token without exposing it to JavaScript. The two auth endpoints intentionally return HTTP 501 until implemented.

## Reproduce

Run the API, POST to `/auth/demo-login`, and observe 501. Unlock the tests. **Do not** treat this demo endpoint as a real login: it has no credential verification.

## Implement

1. Configure a local-only signing secret; fail closed if the secret is missing or weak.
2. Generate short-lived signed access tokens and independent high-entropy refresh tokens.
3. Return only the access token in JSON. Put the refresh token in a scoped cookie with `HttpOnly`, `Secure`, `SameSite=Strict`, `Path=/auth/refresh`.
4. Store refresh-token *hashes* or identifiers server-side and track expiry, revocation, and single use.
5. Implement `/auth/refresh`: reject missing, expired, or already consumed refresh tokens; issue a new pair and invalidate the old token.
6. Explicitly consider CSRF, XSS, browser refresh behavior, logout, and stolen-token reuse. Add origin checks or CSRF tokens where the threat model requires them.

## Acceptance

- JSON never includes the refresh token.
- The cookie flags are present.
- Refresh-token rotation passes; old tokens cannot be replayed.
- All tests run with **fake users only**.

## Hints and stretch

Use `jose` for signed access JWTs and `node:crypto.randomBytes` for opaque refresh tokens. An in-memory map is acceptable for learning, but not production session storage. Stretch: prevent simultaneous refresh races and implement logout/revocation.
