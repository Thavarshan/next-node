-- Safe local-only fixture. Do NOT use production databases.
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id BIGINT PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE orders (
  id BIGINT PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  total_cents INTEGER NOT NULL
);

-- LAB 05: There is intentionally no index on orders(user_id).
-- The PRIMARY KEY index on orders(id) does NOT optimize joining by user_id.
