import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken } from "@/lib/session";
import { updateDisplayName } from "./actions";

export default async function SettingsPage() {
  const token = (await cookies()).get("session")?.value;
  if (!(await verifySessionToken(token))) redirect("/login");

  return (
    <>
      <h2>Profile settings: Lab 10</h2>
      <form action={updateDisplayName}>
        <label htmlFor="name">Display name</label>
        <input id="name" name="name" minLength={2} maxLength={100} />
        <button type="submit">Save</button>
      </form>
    </>
  );
}
