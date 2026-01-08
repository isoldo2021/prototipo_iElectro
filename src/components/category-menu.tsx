"use client"

import { ScrollArea } from "./ui/scroll-area"
import Link from "next/link"
import { Package, Truck, ScanSearch, PackageSearch } from "lucide-react"
import { Button } from "./ui/button"
import { ProductFilters } from "./product-filters"

export function CategoryMenu() {
    return (
        <div className="flex flex-col h-full">
            <ScrollArea className="flex-1">
                <ProductFilters />
            </ScrollArea>
             <div className="p-4 border-t mt-auto space-y-2">
                <Button variant="ghost" asChild className="p-0 h-auto justify-start text-base w-full">
                    <Link href="/scan-price" className="flex items-center gap-2">
                        <ScanSearch className="h-5 w-5" />
                        <span>Escaneá un precio</span>
                    </Link>
                </Button>
                <Button variant="ghost" asChild className="p-0 h-auto justify-start text-base w-full">
                    <Link href="/orders" className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        <span>Consulta de Pedidos</span>
                    </Link>
                </Button>
                 <Button variant="ghost" asChild className="p-0 h-auto justify-start text-base w-full">
                    <Link href="/stock-availability" className="flex items-center gap-2">
                        <PackageSearch className="h-5 w-5" />
                        <span>Consulta de Stock</span>
                    </Link>
                </Button>
                <Button variant="ghost" asChild className="p-0 h-auto justify-start text-base w-full">
                    <Link href="/delivery-availability" className="flex items-center gap-2">
                        <Truck className="h-5 w-5" />
                        <span>Disponibilidad de entrega</span>
                    </Link>
                </Button>
            </div>
        </div>
    )
}
