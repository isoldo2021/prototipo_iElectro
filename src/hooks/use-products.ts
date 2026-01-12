
'use client';

import { useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, where, documentId, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import type { Product } from "@/types";

export const useProductsByIds = (ids: string[]) => {
  const firestore = useFirestore();
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!firestore || !ids || ids.length === 0) {
        setItems([]);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const productsRef = collection(firestore, "products");
        const q = query(productsRef, where(documentId(), "in", ids));
        const querySnapshot = await getDocs(q);
        const fetchedItems = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Product));
        setItems(fetchedItems);
      } catch (e: any) {
        setError(e);
        console.error("Error fetching products by IDs:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [firestore, ids]);

  return { items, isLoading, error };
};
