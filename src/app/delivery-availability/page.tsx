import { DeliveryAvailabilityView } from "@/components/delivery-availability-view";
import { Suspense } from "react";

export default function DeliveryAvailabilityPage() {
    return (
        <div className="container mx-auto py-12">
            <h1 className="text-3xl md:text-4xl font-bold font-headline mb-2">Disponibilidad de Entrega</h1>
            <p className="text-muted-foreground mb-8">Tené en cuenta que la disponibilidad puede variar al momento de realizar el pago.</p>
            <Suspense fallback={<div>Cargando...</div>}>
                <DeliveryAvailabilityView />
            </Suspense>
        </div>
    );
}
