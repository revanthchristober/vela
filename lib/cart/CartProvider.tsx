"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

import { amountToFreeShipping, shippingFor } from "@/data/shipping";
import * as store from "@/lib/cart/store";
import type { CartLine, CartTotals } from "@/lib/cart/types";
import { money, sumMoney, type Money } from "@/lib/utils/format";

export function lineTotal(line: CartLine): Money {
  return money(line.unitPrice.amount * line.quantity, line.unitPrice.currencyCode);
}

function totalsFor(lines: readonly CartLine[]): CartTotals {
  const subtotal = sumMoney(lines.map(lineTotal));
  const shipping = shippingFor(subtotal);
  return {
    subtotal,
    shipping,
    total: money(subtotal.amount + shipping.amount),
    totalQuantity: lines.reduce((sum, line) => sum + line.quantity, 0),
    toFreeShipping: amountToFreeShipping(subtotal),
  };
}

interface CartContextValue {
  lines: readonly CartLine[];
  totals: CartTotals;
  /** False until storage has been read — the badge never flashes a stale zero. */
  hydrated: boolean;
  persistFailed: boolean;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addLine: (line: Omit<CartLine, "quantity"> & { quantity?: number }) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeLine: (id: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

/**
 * Drawer visibility is the only genuine React state here. The lines themselves
 * live in an external store (lib/cart/store.ts) and are read with
 * useSyncExternalStore, so there is no effect mirroring storage into state.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const state = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const addLine = useCallback<CartContextValue["addLine"]>((line) => {
    store.addLine({ ...line, quantity: line.quantity ?? 1 });
    setIsOpen(true);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines: state.lines,
      totals: totalsFor(state.lines),
      hydrated: state.loaded,
      persistFailed: state.persistFailed,
      isOpen,
      open,
      close,
      addLine,
      setQuantity: store.setQuantity,
      removeLine: store.removeLine,
    }),
    [state, isOpen, open, close, addLine],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside <CartProvider>.");
  }
  return context;
}
