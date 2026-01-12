
import type { Product } from '@/types';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';

export const products: Product[] = [
  // This data is now being fetched from Firestore.
  // This file is kept for type reference and legacy functions,
  // but the static array is no longer the source of truth.
];

export const getProductBySlug = (slug: string, allProducts: Product[]): Product | undefined => {
  return allProducts.find((p) => p.slug === slug);
};

export const useProductBySlug = (slug: string) => {
    const firestore = useFirestore();
    const productQuery = useMemoFirebase(() => {
        if (!firestore || !slug) return null;
        return query(collection(firestore, "products"), where("slug", "==", slug));
    }, [firestore, slug]);

    const { data: products, isLoading, error } = useCollection<Product>(productQuery);

    return {
        product: products && products.length > 0 ? products[0] : null,
        isLoading,
        error
    }
}
