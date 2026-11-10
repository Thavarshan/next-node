# Lab 02 — Stop unchanged product rows from re-rendering

**Difficulty:** Beginner · **Code:** `apps/web/src/components/ItemPicker.tsx` · **Test:** `apps/web/src/tests/02-memo.challenge.test.tsx`

## Business problem

The parent tracks an unrelated counter. Every click redraws three memoized child rows although their product IDs are unchanged. On a list of thousands of items this becomes expensive.

## Reproduce

Open `/products`. Click **Increment unrelated counter**. The test's `onRowRender` callback records how many rows render. Unlock the test by removing `.skip` and verify it fails.

## Implement

1. Find where the parent creates `onItemClick`.
2. Stabilize its function identity across unrelated renders; list dependencies correctly.
3. Ensure the child is still wrapped in `memo`, and keep `onRowRender` optional and stable.
4. Verify selecting `p2` still updates the parent's selected value.
5. Add a test for multiple unrelated counter clicks.

## Acceptance

- No child row render is triggered by an unrelated parent counter update.
- A real selection still works.
- The test passes without deleting the render probe.

## Hints and stretch

Use the `useCallback` hook. Avoid stale closures by using dependencies or functional state updates. Stretch: profile a thousand rows with React DevTools and explain when `memo` itself adds overhead.
