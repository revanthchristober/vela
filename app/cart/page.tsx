import type { Metadata } from "next";

import { CartPageView } from "@/components/commerce/CartPageView";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Your bag",
  robots: { index: false, follow: true },
};

/**
 * The drawer is the primary cart. This page exists for direct links, for
 * browsers where the drawer fails, and so that "your bag" is a real URL rather
 * than a state that only exists inside a click handler. It is not linked from
 * the header.
 */
export default function CartPage() {
  return (
    <main id="main">
      <Container className="py-16 sm:py-24">
        <h1 className="font-display text-5xl font-light">Your bag</h1>
        <CartPageView />
      </Container>
    </main>
  );
}
