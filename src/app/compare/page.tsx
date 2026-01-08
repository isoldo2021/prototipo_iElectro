import { CompareView } from "@/components/compare-view";
import { Suspense } from "react";

export default function ComparePage() {
    return (
        <div className="container mx-auto py-12">
            <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8">Comparar Productos</h1>
            <Suspense fallback={<div>Cargando comparación...</div>}>
                <CompareView />
            </Suspense>
        </div>
    );
}
