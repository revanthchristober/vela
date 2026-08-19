import { describe, expect, it } from "vitest";

import { discountPercent, formatMoney, money, sumMoney } from "@/lib/utils/format";

describe("formatMoney", () => {
  it("drops the trailing .00 for whole rupees", () => {
    expect(formatMoney(money(189900))).toBe("₹1,899");
  });

  it("keeps two decimals when the amount has a fraction", () => {
    expect(formatMoney(money(189950))).toBe("₹1,899.50");
  });
});

describe("discountPercent", () => {
  it("returns null when there is no compare-at price", () => {
    expect(discountPercent(money(1000), null)).toBeNull();
  });

  it("returns null when the compare-at price is not higher", () => {
    expect(discountPercent(money(1000), money(1000))).toBeNull();
    expect(discountPercent(money(1200), money(1000))).toBeNull();
  });

  it("rounds the saved percentage down", () => {
    // 1899 -> 1499 is a 21.06% saving, must floor to 21.
    expect(discountPercent(money(1499), money(1899))).toBe(21);
  });
});

describe("sumMoney", () => {
  it("sums a list of amounts in the same currency", () => {
    expect(sumMoney([money(1000), money(2500), money(500)])).toEqual(money(4000));
  });

  it("returns zero for an empty list", () => {
    expect(sumMoney([])).toEqual(money(0));
  });

  it("throws on mixed currencies rather than silently summing them", () => {
    expect(() =>
      sumMoney([money(1000, "INR"), { amount: 500, currencyCode: "USD" as "INR" }]),
    ).toThrow(/Mixed-currency/);
  });
});
