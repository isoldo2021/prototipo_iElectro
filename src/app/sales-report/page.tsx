import { SalesReportView } from "@/components/sales-report-view";
import { Suspense } from "react";

export default function SalesReportPage() {
    return (
        <div className="container mx-auto py-8">
             <Suspense fallback={<div>Cargando reporte...</div>}>
                <SalesReportView />
            </Suspense>
        </div>
    );
}
