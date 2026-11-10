import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifySessionToken } from "./src/lib/session";

// LAB 04: A route matcher is present, but authentication is NOT enforced.
// TODO: Reject missing/invalid sessions before the protected route renders.
export async function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*"],
};
