import { EventEmitter } from "node:events";

export const priceEmitter = new EventEmitter();

// LAB 09: We register callbacks but never detach them.
// TODO: Make cleanup actually call priceEmitter.off(...).
export function registerPriceListener(callback: (value: number) => void): () => void {
  priceEmitter.on("price", callback);
  return () => {
    // TODO: unregister callback
  };
}

export function broadcastPrice(value: number) {
  priceEmitter.emit("price", value);
}
