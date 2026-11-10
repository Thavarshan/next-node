import { describe, expect, it } from "vitest";
import { deriveKey } from "../challenges/crypto.js";

// Unlock by changing describe.skip to describe.
describe.skip("Lab 03: CPU work must not block requests", () => {
  it("provides a Promise-based API rather than running synchronously", async () => {
    const operation = deriveKey("password");
    expect(operation).toBeInstanceOf(Promise);
    expect(await operation).toMatch(/^[0-9a-f]{64}$/);
  });

  it("allows an unrelated event-loop turn while hashing", async () => {
    let ticked = false;
    setImmediate(() => { ticked = true; });
    const operation = deriveKey("second-password");
    await new Promise<void>((resolve) => setImmediate(resolve));
    expect(ticked).toBe(true);
    expect(await operation).toMatch(/^[0-9a-f]{64}$/);
  });
});
