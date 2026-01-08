import { ProductGrid } from '@/components/product-grid';
import { products } from '@/lib/products';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
          Bienvenido a ElectroSmart
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          La mejor tecnología para tu hogar. Explora nuestra selección de electrodomésticos de última generación.
        </p>
      </section>

      <ProductGrid products={products} />
    </div>
  );
}
