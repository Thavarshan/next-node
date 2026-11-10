import { describe, expect, it } from "vitest";
import { getProducts } from "../lib/catalog";

describe("Next.js scaffold", () => {
  it("provides repeatable product fixtures", async () => {
    const products = await getProducts();
    expect(products).toHaveLength(3);
    expect(products.every((item) => item.price > 0)).toBe(true);
  });
});
