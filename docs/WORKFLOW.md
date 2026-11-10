# How to learn with this repo

## The red / green / refactor loop

**Red**: Read one lab, change its `describe.skip` to `describe`, and run that package's tests. The new failures are the acceptance criteria.

**Green**: Write only enough code to satisfy the requirements. Keep the test unchanged. Prefer small, reviewable commits.

**Refactor**: Improve naming, error handling and separation of concerns. Re-run both tests and TypeScript checks.

## Recommended order

1. Start with 02 (React callbacks), 08 (hydration), and 09 (event listener cleanup) for quick wins.
2. Continue with 01, 04, 05, and 07 for routing, caching, SQL and state.
3. Finish with 03, 06, and 10 for concurrency and authentication.

Each lesson has a **reproduce** step, **change** guidance, **tests**, a **manual check**, and a **stretch goal**. Write a test for at least one additional edge case in every exercise.

## Helpful commands

```bash
npm run dev                   # starts Next.js + Express
npm run test --workspace=@lab/web
npm run test --workspace=@lab/api
npm run test --workspace=@lab/database
npm run typecheck
npm run db:up                 # Docker only
npm run db:seed
npm run db:explain
npm run db:down
```

To check one test by name, use `npm exec --workspace=@lab/web -- vitest run src/tests/02-memo.challenge.test.tsx` (after unlocking it).

## Submit evidence, not just code

In each issue, record:

- The test that failed before your change.
- Why the original approach was wrong.
- Which code paths you modified.
- Which tests and manual checks now pass.
- Any caveat (especially security and performance).

## Why some tests inspect source

Caching configuration, PostgreSQL migrations, and Next.js route matching require runtime or database integration testing for complete proof. Their starter tests intentionally verify a narrow invariant; **manual EXPLAIN / production-like experiments are part of the exercise**. Avoid overinterpreting a regex-based test as a full performance guarantee.

## Safety boundaries

Use only fake data and tokens. Run Express bound to `127.0.0.1`; the PostgreSQL container publishes only on loopback. Do not use real accounts, real payment details, production credentials, or public deployments while the starter code is incomplete.
