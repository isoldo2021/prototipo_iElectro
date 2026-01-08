
import { OrdersView } from "@/components/orders-view";
import { Suspense } from "react";

export default function OrdersPage() {
    return (
        <div className="container mx-auto py-12">
            <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8">Consulta de Pedidos</h1>
            <Suspense fallback={<div>Cargando pedidos...</div>}>
                <OrdersView />
            </Suspense>
        </div>
    );
}

