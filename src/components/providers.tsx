"use client";

import { CartProvider } from "@/context/cart-context";
import { ComparisonProvider } from "@/context/comparison-context";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <ComparisonProvider>{children}</ComparisonProvider>
    </CartProvider>
  );
}
