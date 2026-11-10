# Lab 10 — Treat Next.js Server Actions as public endpoints

**Difficulty:** Intermediate–Advanced · **Code:** `apps/web/src/app/settings/actions.ts` · **Test:** `apps/web/src/tests/10-actions.challenge.test.ts`

## Business problem

The settings form posts to a Server Action. UI guards alone cannot enforce permissions: anyone able to invoke the action must face authentication and validation inside that server function. The starter action throws TODO.

## Reproduce

Open the action and its test. Unlock the tests. They cover unauthenticated callers, invalid names, and writes scoped to the logged-in user.

## Implement

1. Call the existing `getAuthenticatedUserId` helper **inside** the action.
2. Reject anonymous requests before processing updates.
3. Parse the `FormData` field `name` with `zod` (2–100 characters after trimming).
4. Call `setDisplayName(userId, validatedName)`; NEVER trust a submitted `userId` field.
5. Run tests and add one attacker-style test: submit an arbitrary `userId` in `FormData`, then prove the other user's record stays untouched.

## Acceptance

- Unauthorized requests fail with a clear error.
- Invalid input is rejected.
- The authenticated user's profile is updated; another user's profile is not.
- The page continues doing a second server-side check for defense in depth.

## Hints and stretch

The `'use server'` directive is a network execution boundary, **not** an authorization guarantee. The fake `Map` persistence is for learning only; replace it with a database and object-level permission checks in a realistic app. Stretch: add audit logs, rate limits, and meaningful user-facing form error handling.
