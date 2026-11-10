"use client";

// LAB 08: Server output differs from the browser's first render.
// TODO: Give both environments the same initial value, then read browser state after hydration.
export function HydrationClock() {
  const width = typeof window === "undefined" ? "unknown" : String(window.innerWidth);
  return <p>Window width: {width}</p>;
}
