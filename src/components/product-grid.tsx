import type { Product } from "@/types";
import { ProductCard } from "./product-card";
import { ComparisonBar } from "./comparison-bar";

interface ProductGridProps {
    products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
    if (!products || products.length === 0) {
        return <p>No hay productos para mostrar.</p>;
    }
    return (
        <>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <ComparisonBar />
        </>
    )
}
