import { money, type Money } from "@/lib/utils/format";

/** Free over ₹1,500. One number, defined once, used by the cart, the PDP trust
 *  block and the announcement bar so the three can never disagree. */
export const FREE_SHIPPING_THRESHOLD: Money = money(150000);

export const STANDARD_SHIPPING: Money = money(9900);

export function shippingFor(subtotal: Money): Money {
  return subtotal.amount >= FREE_SHIPPING_THRESHOLD.amount ? money(0) : STANDARD_SHIPPING;
}

export function amountToFreeShipping(subtotal: Money): Money | null {
  const remaining = FREE_SHIPPING_THRESHOLD.amount - subtotal.amount;
  return remaining > 0 ? money(remaining) : null;
}
