# Lab 09 — Eliminate an Express EventEmitter leak

**Difficulty:** Beginner–Intermediate · **Code:** `apps/api/src/challenges/listeners.ts`, `apps/api/src/app.ts` · **Test:** `apps/api/src/tests/09-listeners.challenge.test.ts`

## Business problem

Each SSE client registers a global price listener capturing the response object. If the client disconnects, the listener remains attached and retains memory.

## Reproduce

Start the API; request `GET /events` and close the connection repeatedly. Inspect `priceEmitter.listenerCount("price")` in a debugger. Unlock the test and observe that invoking the returned cleanup function does nothing.

## Implement

1. Make `registerPriceListener` return a real unsubscribe callback.
2. In the `/events` route, wire the HTTP response's `close` event to unsubscribe.
3. Verify repeated subscriptions/disconnections return listener counts to baseline.
4. Do not use `removeAllListeners` since that would remove other clients' listeners.
5. Add an integration test for route disconnects.

## Acceptance

- The test confirms no retained listener and no callback invocation after cleanup.
- The SSE route cleans up even if the client disconnects without a price event.
- You can explain why `emitter.once()` is not a complete fix.

## Hints and stretch

Use the listener instance with `off("price", callback)`. Stretch: connect with multiple HTTP clients, emit prices, disconnect half, and inspect V8 heap snapshots. Avoid adding listeners to a singleton without bounded lifetime.
