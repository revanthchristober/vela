/**
 * Shared formatting helpers.
 *
 * Money is stored everywhere in the app as an integer number of minor units
 * (paise) plus a currency code. Never as a float — 1899.99 does not survive
 * arithmetic, and a storefront that quietly rounds prices is a storefront
 * nobody trusts.
 */

export type CurrencyCode = "INR";

export interface Money {
  /** Integer minor units. ₹1,899.00 is 189900. */
  amount: number;
  currencyCode: CurrencyCode;
}

const MINOR_UNITS: Record<CurrencyCode, number> = { INR: 100 };

/** ₹1,899 — trailing `.00` is dropped, partial rupees are kept. */
export function formatMoney(money: Money, locale = "en-IN"): string {
  const divisor = MINOR_UNITS[money.currencyCode];
  const major = money.amount / divisor;
  const hasFraction = money.amount % divisor !== 0;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: money.currencyCode,
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: hasFraction ? 2 : 0,
  }).format(major);
}

/** Percentage saved when a compare-at price is present. Rounds down. */
export function discountPercent(
  price: Money,
  compareAtPrice: Money | null,
): number | null {
  if (!compareAtPrice || compareAtPrice.amount <= price.amount) return null;
  return Math.floor(
    ((compareAtPrice.amount - price.amount) / compareAtPrice.amount) * 100,
  );
}

export function money(amount: number, currencyCode: CurrencyCode = "INR"): Money {
  return { amount, currencyCode };
}

/** Sum of a list of Money, guarding against mixed currencies. */
export function sumMoney(
  items: readonly Money[],
  currencyCode: CurrencyCode = "INR",
): Money {
  let total = 0;
  for (const item of items) {
    if (item.currencyCode !== currencyCode) {
      throw new Error(
        `Cannot sum ${item.currencyCode} into a ${currencyCode} total. Mixed-currency carts are out of scope.`,
      );
    }
    total += item.amount;
  }
  return { amount: total, currencyCode };
}
