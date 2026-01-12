import { ClientsView } from "@/components/clients-view";
import { Suspense } from "react";

export default function ClientsPage() {
    return (
        <div className="container mx-auto py-12">
            <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8">Gestión de Clientes</h1>
            <Suspense fallback={<div>Cargando clientes...</div>}>
                <ClientsView />
            </Suspense>
        </div>
    );
}
