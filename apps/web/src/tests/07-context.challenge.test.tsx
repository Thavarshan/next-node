import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { StockBoard } from "../components/StockBoard";

describe.skip("Lab 07: select only the changing price", () => {
  it("does not re-render MSFT when only AAPL changes", () => {
    const rendered: string[] = [];
    render(<StockBoard onRowRender={(symbol) => rendered.push(symbol)} />);
    const initialMsftRenders = rendered.filter((symbol) => symbol === "MSFT").length;

    fireEvent.click(screen.getByText("Update AAPL"));
    expect(screen.getByText("AAPL: $101")).toBeTruthy();
    expect(rendered.filter((symbol) => symbol === "MSFT")).toHaveLength(initialMsftRenders);
  });
});
