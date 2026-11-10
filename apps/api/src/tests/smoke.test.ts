import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../app.js";

describe("API scaffold", () => {
  it("serves a health check without real credentials", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });

  it("rejects invalid hashing input", async () => {
    const response = await request(app).post("/crypto/hash").send({ password: 42 });
    expect(response.status).toBe(400);
  });
});
