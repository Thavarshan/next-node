import { HydrationClock } from "@/components/HydrationClock";

export default function HydrationPage() {
  return (
    <>
      <h2>Hydration: Lab 08</h2>
      <p>Compare server-rendered HTML with the browser's first render. Watch the browser console.</p>
      <HydrationClock />
    </>
  );
}
