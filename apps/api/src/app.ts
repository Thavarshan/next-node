import express from "express";
import cookieParser from "cookie-parser";
import { deriveKey } from "./challenges/crypto.js";
import { broadcastPrice, registerPriceListener } from "./challenges/listeners.js";
import { refreshDemoSession, startDemoSession } from "./challenges/session.js";

export const app = express();
app.use(express.json({ limit: "32kb" }));
app.use(cookieParser());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

// Never expose these intentionally incomplete learning endpoints publicly.
app.post("/crypto/hash", async (req, res, next) => {
  try {
    const password = req.body?.password;
    if (typeof password !== "string" || password.length > 200) {
      res.status(400).json({ error: "password must be a string (max 200 chars)" });
      return;
    }
    const digest = await deriveKey(password);
    res.json({ digest });
  } catch (error) {
    next(error);
  }
});

app.get("/events", (_req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.flushHeaders();
  res.write(": price stream connected\n\n");

  const cleanup = registerPriceListener((value) => {
    res.write("data: " + JSON.stringify({ value }) + "\n\n");
  });

  // LAB 09: TODO hook response close into cleanup. Otherwise the emitter
  // retains callbacks, including their response objects, after clients leave.
  void cleanup;
});

app.post("/events/demo-update", (_req, res) => {
  broadcastPrice(123);
  res.json({ ok: true });
});

app.post("/auth/demo-login", startDemoSession);
app.post("/auth/refresh", refreshDemoSession);
