import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken } from "@/lib/session";

export default async function DashboardPage() {
  // Defense in depth: Proxy is not sufficient authorization for private data.
  const token = (await cookies()).get("session")?.value;
  if (!(await verifySessionToken(token))) redirect("/login");

  return <h2>Protected dashboard</h2>;
}
