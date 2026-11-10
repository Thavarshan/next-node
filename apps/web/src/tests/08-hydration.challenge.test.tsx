import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import { HydrationClock } from "../components/HydrationClock";

describe.skip("Lab 08: same initial render on server and browser", () => {
  it("renders a deterministic placeholder before effects run", () => {
    // SSR output must be deterministic even when this test runs in jsdom.
    const html = renderToString(<HydrationClock />);
    expect(html).toContain("Window width: Loading...");
  });
});
