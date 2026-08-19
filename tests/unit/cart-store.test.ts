import { beforeEach, describe, expect, it } from "vitest";

import {
  __resetForTests,
  addLine,
  getSnapshot,
  removeLine,
  setQuantity,
  subscribe,
} from "@/lib/cart/store";
import type { CartLine } from "@/lib/cart/types";

function line(overrides: Partial<CartLine> = {}): CartLine {
  return {
    id: "balance-cleanser:default",
    productSlug: "balance-cleanser",
    productTitle: "Balance Cleanser",
    variantId: "default",
    variantTitle: "150ml",
    unitPrice: { amount: 189900, currencyCode: "INR" },
    compareAtUnitPrice: null,
    image: { url: "/brand/products/balance-cleanser.jpg", alt: "Balance Cleanser" },
    quantity: 1,
    ...overrides,
  };
}

beforeEach(() => {
  window.localStorage.clear();
  __resetForTests();
});

describe("cart store", () => {
  it("adds a new line", () => {
    addLine(line());
    expect(getSnapshot().lines).toHaveLength(1);
    expect(getSnapshot().lines[0]?.quantity).toBe(1);
  });

  it("merges quantity when the same line id is added again", () => {
    addLine(line({ quantity: 1 }));
    addLine(line({ quantity: 2 }));
    const lines = getSnapshot().lines;
    expect(lines).toHaveLength(1);
    expect(lines[0]?.quantity).toBe(3);
  });

  it("updates quantity for an existing line", () => {
    addLine(line());
    setQuantity("balance-cleanser:default", 5);
    expect(getSnapshot().lines[0]?.quantity).toBe(5);
  });

  it("removes the line when quantity is set below 1", () => {
    addLine(line());
    setQuantity("balance-cleanser:default", 0);
    expect(getSnapshot().lines).toHaveLength(0);
  });

  it("removes a line explicitly", () => {
    addLine(line());
    removeLine("balance-cleanser:default");
    expect(getSnapshot().lines).toHaveLength(0);
  });

  it("persists lines to localStorage on every mutation", () => {
    addLine(line());
    const stored = window.localStorage.getItem("vela.cart.v1");
    expect(stored).not.toBeNull();
    expect(JSON.parse(stored ?? "[]")).toHaveLength(1);
  });

  it("ignores malformed stored data instead of throwing", () => {
    window.localStorage.setItem("vela.cart.v1", "not json");
    __resetForTests();
    // subscribe triggers the storage read; getSnapshot alone would return the
    // server snapshot, so read through a fresh subscribe/unsubscribe cycle.
    const unsubscribe = subscribe(() => {});
    expect(getSnapshot().lines).toEqual([]);
    expect(getSnapshot().loaded).toBe(true);
    unsubscribe();
  });
});
