
import { StockAvailabilityView } from "@/components/stock-availability-view";
import { Suspense } from "react";

export default function StockAvailabilityPage() {
    return (
        <div className="container mx-auto py-12">
            <div className="mx-auto max-w-4xl">
                 <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8 text-center">Consulta de Stock en Tiendas</h1>
                <Suspense fallback={<div>Cargando...</div>}>
                    <StockAvailabilityView />
                </Suspense>
            </div>
        </div>
    );
}
