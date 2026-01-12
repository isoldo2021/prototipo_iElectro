import { ProductsAdminView } from "@/components/products-admin-view";
import { Suspense } from "react";

export default function ProductsAdminPage() {
    return (
        <div className="container mx-auto py-12">
            <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8">Gestión de Artículos</h1>
            <Suspense fallback={<div>Cargando artículos...</div>}>
                <ProductsAdminView />
            </Suspense>
        </div>
    );
}
