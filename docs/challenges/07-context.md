# Lab 07 — Make frequent stock updates selective

**Difficulty:** Intermediate · **Code:** `apps/web/src/components/StockBoard.tsx` · **Test:** `apps/web/src/tests/07-context.challenge.test.tsx`

## Business problem

A global Context value contains both AAPL and MSFT. Updating AAPL forces the MSFT consumer to render even though its own price is unchanged. With a hundred tickers updating multiple times per second, this becomes expensive.

## Reproduce

Open `/stocks`; click **Update AAPL**. Unlock the test and observe the unexpected MSFT render via the render probe.

## Implement

1. Trace what causes the Context provider's value reference to change.
2. Selectively subscribe each row to only its own symbol's price.
3. You may use the included `zustand` package with per-symbol selectors, split providers, or implement `useSyncExternalStore`.
4. Preserve the button behavior, `StockBoard` props, and price display.
5. Make sure two updates to AAPL do not re-render the unchanged MSFT row.

## Acceptance

- AAPL displays `$101` after one click.
- The MSFT render count is unchanged.
- Add one new test for updating the same ticker twice.

## Hints and stretch

`React.memo` does **not** stop Context updates. Avoid creating new derived objects in selectors unless you provide stable equality semantics. Stretch: drive updates with an interval, graph React Profiler commits, and throttle paint frequency without dropping important data.
