import type { Request, Response } from "express";

// LAB 06: Access token belongs in the JSON response; refresh token belongs
// only in a scoped HttpOnly+Secure+SameSite=Strict cookie. Implement rotation.
// This is a demo identity flow without real credential verification.
// TODO: implement a signed token pair and a server-side refresh-token registry.
export async function startDemoSession(_req: Request, res: Response) {
  res.status(501).json({ error: "TODO Lab 06: issue secure token pair" });
}

export async function refreshDemoSession(_req: Request, res: Response) {
  res.status(501).json({ error: "TODO Lab 06: verify and rotate refresh token" });
}
