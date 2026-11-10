import { describe, expect, it, vi } from "vitest";
import { getAuthenticatedUserId } from "../lib/auth";
import { getDisplayName } from "../lib/profile-store";
import { updateDisplayName } from "../app/settings/actions";

vi.mock("../lib/auth", () => ({
  getAuthenticatedUserId: vi.fn(async () => null),
}));

function payload(name: string) {
  const data = new FormData();
  data.set("name", name);
  return data;
}

describe.skip("Lab 10: secure Server Actions", () => {
  it("rejects anonymous callers regardless of the UI", async () => {
    vi.mocked(getAuthenticatedUserId).mockResolvedValue(null);
    await expect(updateDisplayName(payload("Alex Doe"))).rejects.toThrow(/unauthorized/i);
  });

  it("rejects invalid input even for authenticated users", async () => {
    vi.mocked(getAuthenticatedUserId).mockResolvedValue("u1");
    await expect(updateDisplayName(payload("x"))).rejects.toThrow(/invalid|too small|name/i);
  });

  it("updates only the authenticated user's record", async () => {
    vi.mocked(getAuthenticatedUserId).mockResolvedValue("u1");
    await updateDisplayName(payload("Alex Doe"));
    expect(getDisplayName("u1")).toBe("Alex Doe");
    expect(getDisplayName("u2")).toBeUndefined();
  });
});
