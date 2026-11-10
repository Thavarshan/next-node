-- Run before and after applying migrations/001_orders_user_id.sql.
-- See EXPLAIN ANALYZE output, actual timing, shared buffer reads.
EXPLAIN (ANALYZE, BUFFERS)
SELECT o.id, o.total_cents
FROM users u
JOIN orders o ON o.user_id = u.id
WHERE u.id = 42;
