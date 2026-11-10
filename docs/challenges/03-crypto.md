# Lab 03 — Keep Express responsive during expensive cryptography

**Difficulty:** Intermediate · **Code:** `apps/api/src/challenges/crypto.ts` · **Test:** `apps/api/src/tests/03-crypto.challenge.test.ts`

## Business problem

An API endpoint synchronously runs expensive PBKDF2 and blocks the JavaScript event loop. While it runs, other requests cannot be handled.

## Reproduce

Start the API with `pnpm --filter @lab/api dev`. Compare GET `/health` responsiveness while invoking POST `/crypto/hash` with JSON `{"password":"example"}`. Unlock and run the lab test.

## Implement

1. Identify the synchronous `pbkdf2Sync` call.
2. Make the function return a Promise and perform work outside the event-loop thread.
3. Prefer Node's native asynchronous `pbkdf2` callback as the simple first fix; it already uses libuv workers. Alternatively, build a **bounded** `worker_threads` pool for JavaScript CPU workloads.
4. Handle errors and limit concurrent work; do not create unlimited workers for untrusted requests.
5. Add a concurrency test that makes a health request while hashing.

## Acceptance

- `deriveKey` returns a Promise resolving to a 64-character hex digest.
- The unlocked tests pass; the API health endpoint still works.
- You can explain why `setImmediate` alone and a huge `UV_THREADPOOL_SIZE` are not complete solutions.

## Hints and stretch

Use `node:crypto`'s callback-based async API or `node:worker_threads`. In real authentication prefer an established password hashing library and tuned cost factors. Stretch: compare latency, throughput, queue depth, and event-loop delay under parallel load. Keep the workload small on laptops.
