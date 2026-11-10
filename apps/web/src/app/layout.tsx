import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Next + Node Learning Lab",
  description: "Fix ten real-world full-stack engineering problems.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui", maxWidth: 900, margin: "2rem auto", padding: "0 1rem", lineHeight: 1.6 }}>
        <header>
          <h1>Next + Node Learning Lab</h1>
          <nav style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/stocks">Stocks</Link>
            <Link href="/hydration">Hydration</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/settings">Settings</Link>
          </nav>
        </header>
        <hr />
        <main>{children}</main>
      </body>
    </html>
  );
}
