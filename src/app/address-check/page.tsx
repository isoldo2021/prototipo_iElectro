import { AddressCheckView } from "@/components/address-check-view";
import { Suspense } from "react";

export default function AddressCheckPage() {
    return (
        <div className="container mx-auto py-12">
            <h1 className="text-3xl md:text-4xl font-bold font-headline mb-2 text-center">Consulta de Domicilio</h1>
            <p className="text-muted-foreground mb-8 text-center">Ingresá tu dirección para saber si llegamos a tu zona.</p>
            <Suspense fallback={<div>Cargando...</div>}>
                <AddressCheckView />
            </Suspense>
        </div>
    );
}
