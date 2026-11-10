import Link from "next/link";

const labs = [
  ["01", "ISR and product freshness", "/products"],
  ["02", "React.memo and useCallback", "/products"],
  ["04", "Protected routes with Proxy", "/dashboard"],
  ["07", "Frequent stock updates", "/stocks"],
  ["08", "Hydration mismatch", "/hydration"],
  ["10", "Server Actions security", "/settings"],
] as const;

export default function Home() {
  return (
    <>
      <p>This application intentionally contains unfinished or inefficient code. Do not deploy it.</p>
      <p>Read the challenge briefs in <code>docs/challenges</code>, activate one skipped test suite, and make it pass.</p>
      <ul>{labs.map(([number, title, href]) => <li key={number}><Link href={href}>Lab {number}: {title}</Link></li>)}</ul>
      <p>Labs 03, 06, and 09 live in the Express API. Lab 05 lives in PostgreSQL.</p>
    </>
  );
}
