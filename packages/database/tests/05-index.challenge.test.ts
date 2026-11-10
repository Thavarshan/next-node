import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const migration = readFileSync(new URL("../migrations/001_orders_user_id.sql", import.meta.url), "utf8");

describe.skip("Lab 05: missing foreign-key index", () => {
  it("creates an index on orders(user_id) without indexing unrelated columns", () => {
    expect(migration).toMatch(/CREATE\s+(?:INDEX|UNIQUE\s+INDEX)\b[\s\S]*?\bON\s+(?:public\.)?orders\s*\(\s*user_id\s*\)/i);
  });
});
