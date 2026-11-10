import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getAuthenticatedUserId(): Promise<string | null> {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) return null;
  const token = (await cookies()).get("session")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return typeof payload.sub === "string" ? payload.sub : null;
  } catch {
    return null;
  }
}
