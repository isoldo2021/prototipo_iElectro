
"use client";

import { ProductCatalog } from '@/components/product-catalog';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import type { Product } from '@/types';

export default function Home() {
  const firestore = useFirestore();
  
  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'products'));
  }, [firestore]);

  const { data: products, isLoading } = useCollection<Product>(productsQuery);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mt-8">
        {isLoading && <div>Cargando productos...</div>}
        {products && <ProductCatalog allProducts={products} />}
      </section>
    </div>
  );
}
