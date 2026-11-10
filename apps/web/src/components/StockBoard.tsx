"use client";

import { createContext, memo, useContext, useState } from "react";

type Prices = Record<"AAPL" | "MSFT", number>;
type StockContextValue = { prices: Prices; update: (symbol: keyof Prices) => void };

const StockContext = createContext<StockContextValue | null>(null);

function StockProvider({ children }: { children: React.ReactNode }) {
  const [prices, setPrices] = useState<Prices>({ AAPL: 100, MSFT: 200 });
  const update = (symbol: keyof Prices) =>
    setPrices((current) => ({ ...current, [symbol]: current[symbol] + 1 }));

  // LAB 07: Context makes every consumer re-render for every price change.
  return <StockContext.Provider value={{ prices, update }}>{children}</StockContext.Provider>;
}

function useStockContext() {
  const context = useContext(StockContext);
  if (!context) throw new Error("StockProvider is missing");
  return context;
}

const StockRow = memo(function StockRow({
  symbol,
  onRowRender,
}: {
  symbol: keyof Prices;
  onRowRender?: (symbol: keyof Prices) => void;
}) {
  const { prices } = useStockContext();
  onRowRender?.(symbol);
  return <p>{symbol}: ${prices[symbol]}</p>;
});

function Controls() {
  const { update } = useStockContext();
  return <button onClick={() => update("AAPL")}>Update AAPL</button>;
}

export function StockBoard({
  onRowRender,
}: {
  onRowRender?: (symbol: keyof Prices) => void;
}) {
  return (
    <StockProvider>
      <Controls />
      <StockRow symbol="AAPL" onRowRender={onRowRender} />
      <StockRow symbol="MSFT" onRowRender={onRowRender} />
    </StockProvider>
  );
}
