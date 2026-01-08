import { PriceScannerView } from "@/components/price-scanner-view";
import { Suspense } from "react";

export default function ScanPricePage() {
    return (
        <div className="container mx-auto py-12">
            <Suspense fallback={<div>Cargando...</div>}>
                <PriceScannerView />
            </Suspense>
        </div>
    );
}
