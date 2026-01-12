
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
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
          Bienvenido a Carrefour
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          La mejor tecnología para tu hogar. Explora nuestra selección de electrodomésticos de última generación.
        </p>
      </section>

      <section className="mt-16">
        {isLoading && <div>Cargando productos...</div>}
        {products && <ProductCatalog allProducts={products} />}
      </section>
    </div>
  );
}
