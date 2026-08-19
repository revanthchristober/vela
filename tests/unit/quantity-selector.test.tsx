import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { QuantitySelector } from "@/components/ui/QuantitySelector";

describe("QuantitySelector", () => {
  it("calls onChange with value + 1 when increasing", () => {
    const onChange = vi.fn();
    render(<QuantitySelector value={2} onChange={onChange} label="Balance Cleanser" />);
    fireEvent.click(screen.getByRole("button", { name: /increase/i }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("calls onChange with value - 1 when decreasing", () => {
    const onChange = vi.fn();
    render(<QuantitySelector value={2} onChange={onChange} label="Balance Cleanser" />);
    fireEvent.click(screen.getByRole("button", { name: /decrease/i }));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it("disables the decrease button at the minimum", () => {
    const onChange = vi.fn();
    render(
      <QuantitySelector value={1} onChange={onChange} min={1} label="Balance Cleanser" />,
    );
    expect(screen.getByRole("button", { name: /decrease/i })).toBeDisabled();
  });

  it("disables the increase button at the maximum", () => {
    const onChange = vi.fn();
    render(
      <QuantitySelector value={9} onChange={onChange} max={9} label="Balance Cleanser" />,
    );
    expect(screen.getByRole("button", { name: /increase/i })).toBeDisabled();
  });

  it("names the label in the accessible button text", () => {
    render(<QuantitySelector value={1} onChange={vi.fn()} label="Recovery Oil" />);
    expect(screen.getByText("Increase quantity of Recovery Oil")).toBeInTheDocument();
  });
});
