"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import type { Product } from "@/types";

interface ComparisonContextType {
  comparisonIds: string[];
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
      if (prevIds.length >= 4) {
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

  const value = {
    comparisonIds,
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
