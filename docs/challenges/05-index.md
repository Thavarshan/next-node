# Lab 05 — Diagnose a slow PostgreSQL foreign-key join

**Difficulty:** Beginner–Intermediate · **Code:** `packages/database/migrations/001_orders_user_id.sql` · **Test:** `packages/database/tests/05-index.challenge.test.ts`

## Business problem

A selective query joins `users.id` to `orders.user_id`, but orders have no index on the join column. The primary-key index on `orders.id` does not help with this lookup.

## Reproduce

1. Install/start Docker.
2. Run `pnpm db:up`, then `pnpm db:seed`. If Postgres is still initializing, wait for its health check and retry.
3. Run `pnpm db:explain`; record **actual time**, row counts and buffer reads.
4. Unlock the migration test and see it fail.

## Implement

1. Add a named index targeting the foreign-key join key to the migration SQL.
2. Apply it: `docker compose -f packages/database/compose.yaml exec -T postgres psql -U lab -d lab < packages/database/migrations/001_orders_user_id.sql`.
3. Run `pnpm db:explain` again.
4. Compare query plans and measurements; note when Postgres still prefers a sequential scan.
5. Add a second query with no selective `WHERE` clause. Explain why an index might *not* help it.

## Acceptance

- Migration test passes.
- `EXPLAIN (ANALYZE, BUFFERS)` was measured before and after.
- You explain the difference between a join key index and indexing unrelated IDs.

## Note

Fixture has 20k users and 200k orders to run comfortably on laptops; the original quiz has 1m/10m. Scale carefully if you have spare RAM/disk. To reset schema, run `pnpm db:down` then `pnpm db:up` (this compose setup uses ephemeral data).
