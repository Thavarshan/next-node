import { describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { proxy, config } from "../../proxy";
import { verifySessionToken } from "../lib/session";

vi.mock("../lib/session", () => ({
  verifySessionToken: vi.fn(async (value?: string) => value === "valid-session"),
}));

describe.skip("Lab 04: protect routes at request boundary", () => {
  it("redirects missing sessions to login", async () => {
    const response = await proxy(new NextRequest("http://localhost:3000/dashboard"));
    expect(response.status).toBeGreaterThanOrEqual(300);
    expect(response.headers.get("location")).toBe("http://localhost:3000/login");
  });

  it("allows requests with verified sessions", async () => {
    const request = new NextRequest("http://localhost:3000/dashboard", {
      headers: { cookie: "session=valid-session" },
    });
    const response = await proxy(request);
    expect(verifySessionToken).toHaveBeenCalledWith("valid-session");
    expect(response.headers.get("location")).toBeNull();
  });

  it("only matches protected routes", () => {
    expect(config.matcher).toContain("/dashboard/:path*");
    expect(config.matcher).toContain("/settings/:path*");
  });
});
