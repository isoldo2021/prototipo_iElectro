import { ProductCatalog } from '@/components/product-catalog';
import { SuggestedProducts } from '@/components/suggested-products';
import { products } from '@/lib/products';

export default function Home() {
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

      <SuggestedProducts />

      <section className="mt-16">
        <ProductCatalog allProducts={products} />
      </section>
    </div>
  );
}
