"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import type { Product } from "@/types";
import { products as allProducts } from "@/lib/products";

interface ComparisonContextType {
  comparisonIds: string[];
  comparisonItems: Product[];
  toggleFromComparison: (productId: string) => void;
  isInComparison: (productId: string) => boolean;
  clearComparison: () => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider = ({ children }: { children: ReactNode }) => {
  const [comparisonIds, setComparisonIds] = useState<string[]>([]);

  const toggleFromComparison = (productId: string) => {
    setComparisonIds((prevIds) => {
      if (prevIds.includes(productId)) {
        return prevIds.filter((id) => id !== productId);
      }
      // Limit to 4 items for comparison
      if (prevIds.length >= 4) {
        // Here you might want to show a toast notification
        console.warn("Comparison limit reached.");
        return prevIds;
      }
      return [...prevIds, productId];
    });
  };

  const isInComparison = (productId: string) => {
    return comparisonIds.includes(productId);
  };
  
  const clearComparison = () => {
    setComparisonIds([]);
  }

  const comparisonItems = useMemo(() => {
    return allProducts.filter((product) => comparisonIds.includes(product.id));
  }, [comparisonIds]);

  const value = {
    comparisonIds,
    comparisonItems,
    toggleFromComparison,
    isInComparison,
    clearComparison,
  };

  return <ComparisonContext.Provider value={value}>{children}</ComparisonContext.Provider>;
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error("useComparison must be used within a ComparisonProvider");
  }
  return context;
};
