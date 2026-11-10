import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ItemPicker } from "../components/ItemPicker";

describe.skip("Lab 02: stable callbacks and memo", () => {
  it("does not render item rows when only the unrelated counter changes", () => {
    const onRowRender = vi.fn();
    render(<ItemPicker onRowRender={onRowRender} />);
    expect(onRowRender).toHaveBeenCalledTimes(3);

    fireEvent.click(screen.getByText("Increment unrelated counter"));
    expect(onRowRender).toHaveBeenCalledTimes(3);

    fireEvent.click(screen.getByText("Select p2"));
    expect(screen.getByText(/Selected: p2/)).toBeTruthy();
  });
});
