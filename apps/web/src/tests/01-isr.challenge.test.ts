import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const page = readFileSync(new URL("../app/products/page.tsx", import.meta.url), "utf8");

describe.skip("Lab 01: hourly ISR", () => {
  it("revalidates the product route every 3600 seconds", () => {
    expect(page).toMatch(/export\s+const\s+revalidate\s*=\s*3600\s*;/);
  });

  it("does not force dynamic rendering for stable product content", () => {
    expect(page).not.toMatch(/export\s+const\s+dynamic\s*=\s*["']force-dynamic["']/);
  });
});
