import { describe, expect, it } from "vitest";
import { broadcastPrice, priceEmitter, registerPriceListener } from "../challenges/listeners.js";

describe.skip("Lab 09: event emitter cleanup", () => {
  it("stops retaining listeners after unsubscribe", () => {
    const baseline = priceEmitter.listenerCount("price");
    const observed: number[] = [];
    const unsubscribe = registerPriceListener((price) => observed.push(price));

    expect(priceEmitter.listenerCount("price")).toBe(baseline + 1);
    broadcastPrice(100);
    unsubscribe();
    broadcastPrice(200);
    expect(priceEmitter.listenerCount("price")).toBe(baseline);
    expect(observed).toEqual([100]);
  });
});
