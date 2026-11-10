# Lab 01 — Make product pages fast without leaving prices stale

**Difficulty:** Beginner · **Estimated focus:** Next.js caching · **Code:** `apps/web/src/app/products/page.tsx` · **Test:** `apps/web/src/tests/01-isr.challenge.test.ts`

## Business problem

An online store has product descriptions and images updated weekly, but price changes hourly. The starter route forces every page request to render dynamically, wasting work when most content is unchanged.

## Reproduce

Run `pnpm dev` and open `http://localhost:3000/products`. Inspect the route's `dynamic` export. Open the test and switch `describe.skip` to `describe`; run `pnpm --filter @lab/web test`.

## Implement

1. Identify why `force-dynamic` prevents static regeneration.
2. Remove the conflicting opt-out and configure route regeneration at 3600 seconds.
3. Keep the product fixture in `src/lib/catalog.ts` so this lab works offline.
4. Explain in a comment or PR what happens when the first request arrives **after** the revalidation period and why prices may still be temporarily stale.
5. Add one test that enforces a useful stale-price policy (e.g. a checkout service must revalidate price).

## Acceptance

- The unlocked tests check the hourly policy and removal of forced dynamic rendering.
- `pnpm --filter @lab/web test` and `pnpm typecheck` pass.
- You can explain why regeneration is **not** an exact hourly schedule.

## Hints and stretch

Look for the App Router's `revalidate` route segment configuration. Stretch: model independent caches for descriptions and prices, add a mock API response changing over time, and validate current prices at checkout rather than trusting the displayed price.
