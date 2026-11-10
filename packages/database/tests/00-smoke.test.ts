import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const schema = readFileSync(new URL("../sql/schema.sql", import.meta.url), "utf8");
describe("PostgreSQL scaffold", () => {
  it("has a users -> orders foreign-key relationship", () => {
    expect(schema).toMatch(/user_id\s+BIGINT\s+NOT\s+NULL\s+REFERENCES\s+users\(id\)/i);
  });
});
