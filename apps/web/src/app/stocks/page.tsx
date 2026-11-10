import { StockBoard } from "@/components/StockBoard";

export default function StocksPage() {
  return (
    <>
      <h2>Live prices: Lab 07</h2>
      <p>Updating AAPL should not make the MSFT row render again. Add more symbols and simulate rapid updates.</p>
      <StockBoard />
    </>
  );
}
