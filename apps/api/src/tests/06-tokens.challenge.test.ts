import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../app.js";

function getFirstSetCookie(response: { headers: Record<string, string | string[] | undefined> }): string {
  const header = response.headers["set-cookie"];
  return (Array.isArray(header) ? header[0] : header) ?? "";
}

// Unlock by changing describe.skip to describe.
// Challenge tests are intentionally written before the implementation.
describe.skip("Lab 06: safe access/refresh token separation", () => {
  it("returns access tokens in JSON and refresh tokens only in secure cookies", async () => {
    const response = await request(app).post("/auth/demo-login").send({});
    expect(response.status).toBe(200);
    expect(response.body.accessToken).toEqual(expect.any(String));
    expect(response.body.refreshToken).toBeUndefined();
    const cookie = getFirstSetCookie(response);
    expect(cookie).toMatch(/refreshToken=/);
    expect(cookie).toMatch(/HttpOnly/i);
    expect(cookie).toMatch(/Secure/i);
    expect(cookie).toMatch(/SameSite=Strict/i);
    expect(cookie).toMatch(/Path=\/auth\/refresh/i);
  });

  it("rejects a refresh request without a valid cookie", async () => {
    const response = await request(app).post("/auth/refresh");
    expect(response.status).toBe(401);
  });

  it("rotates refresh tokens, rejecting replay of a consumed token", async () => {
    const login = await request(app).post("/auth/demo-login").send({});
    const oldCookie = getFirstSetCookie(login).split(";")[0];
    const rotated = await request(app).post("/auth/refresh").set("Cookie", oldCookie);
    expect(rotated.status).toBe(200);
    expect(rotated.body.accessToken).toEqual(expect.any(String));
    const newCookie = getFirstSetCookie(rotated).split(";")[0];
    expect(newCookie).not.toBe(oldCookie);
    expect((await request(app).post("/auth/refresh").set("Cookie", oldCookie)).status).toBe(401);
  });
});
