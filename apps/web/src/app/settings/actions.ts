"use server";

import { getAuthenticatedUserId } from "@/lib/auth";
import { setDisplayName } from "@/lib/profile-store";
import { z } from "zod";

// LAB 10: The action is an HTTP entry point. Implement authentication,
// validation, and per-user writes INSIDE this function, not only in the UI.
export async function updateDisplayName(_formData: FormData): Promise<void> {
  throw new Error("TODO Lab 10: validate input and authorize on the server");
}
