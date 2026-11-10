# Lab 08 — Make the first client render match the server

**Difficulty:** Beginner · **Code:** `apps/web/src/components/HydrationClock.tsx` · **Test:** `apps/web/src/tests/08-hydration.challenge.test.tsx`

## Business problem

The component renders `"unknown"` on the server and `window.innerWidth` in the browser's first render. React hydration sees different text and warns or recovers by client-rendering.

## Reproduce

Open `/hydration`, reload, and check the browser console. Unlock the test: it expects a stable loading placeholder in server output.

## Implement

1. Keep the component client-side but give it a deterministic initial state.
2. Read the actual browser width only inside an effect after hydration.
3. Render `Window width: Loading...` until the browser value is known.
4. Add resize-listener handling if you want the width to stay live; cleanup listeners on unmount.
5. Add a test verifying the browser value after effects run.

## Acceptance

- Deterministic SSR placeholder is present.
- The page hydrates without text mismatch.
- Client eventually displays browser width.

## Hints and stretch

Consider `useEffect` + `useState`. Do not hide the problem with `suppressHydrationWarning` unless the content is inherently impossible to align and you understand the tradeoff.
