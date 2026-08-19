import type { Money } from "@/lib/utils/format";

/**
 * A cart line carries the display data it needs.
 *
 * The alternative — storing slugs and resolving them against the catalogue on
 * the client — would mean shipping all nine products' copy, ingredients and
 * review data into the browser just to render a drawer. Denormalising five
 * fields at add-to-cart time is the cheaper trade, and it also means a line
 * still renders correctly if the product is later renamed or withdrawn.
 */
export interface CartLine {
  /** `${productSlug}:${variantId}` — stable, so re-adding merges quantity. */
  id: string;
  productSlug: string;
  productTitle: string;
  variantId: string;
  variantTitle: string;
  unitPrice: Money;
  compareAtUnitPrice: Money | null;
  image: { url: string; alt: string };
  quantity: number;
}

export type CartStatus = "idle" | "pending" | "error";

export interface CartTotals {
  subtotal: Money;
  shipping: Money;
  total: Money;
  totalQuantity: number;
  toFreeShipping: Money | null;
}
