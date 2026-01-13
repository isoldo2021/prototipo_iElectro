
"use client";

import { ProductCatalog } from '@/components/product-catalog';
import { products } from '@/lib/products';
import type { Product } from '@/types';

export default function Home() {
  // For demonstration purposes, we are using the local product list.
  // In a real application, you would fetch this from Firestore like before.
  const allProducts: Product[] = products;

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mt-8">
        {!allProducts && <div>Cargando productos...</div>}
        {allProducts && <ProductCatalog allProducts={allProducts} />}
      </section>
    </div>
  );
}
