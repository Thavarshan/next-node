import { jwtVerify } from "jose";

// DEMO ONLY: set SESSION_SECRET to a strong random value in .env.local.
// Never treat mere cookie presence as proof of authentication.
export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  const secret = process.env.SESSION_SECRET;
  if (!token || !secret || secret.length < 32) return false;

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return typeof payload.sub === "string" && payload.sub.length > 0;
  } catch {
    return false;
  }
}
