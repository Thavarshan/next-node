-- Reduced fixture for laptops (20k users, 200k orders).
-- For the original 1m/10m scenario increase both generate_series ranges.
TRUNCATE orders, users;
INSERT INTO users (id, name)
SELECT n, 'User ' || n FROM generate_series(1, 20000) AS n;

INSERT INTO orders (id, user_id, total_cents)
SELECT n, ((n * 997) % 20000) + 1, (n % 10000) + 1
FROM generate_series(1, 200000) AS n;

ANALYZE users;
ANALYZE orders;
