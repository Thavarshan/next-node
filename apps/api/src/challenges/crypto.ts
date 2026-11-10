import { pbkdf2Sync } from "node:crypto";

// LAB 03: Synchronous CPU-intensive key derivation blocks the event loop.
// Replace with a non-blocking API (native async crypto or a managed worker pool).
// Never use raw PBKDF2 like this as a drop-in password authentication system.
export function deriveKey(password: string): string | Promise<string> {
  return pbkdf2Sync(password, "lab-only-salt", 200_000, 32, "sha256").toString("hex");
}
