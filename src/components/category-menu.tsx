
"use client"

import { ScrollArea } from "./ui/scroll-area"
import Link from "next/link"
import { Package, Truck, ScanSearch, PackageSearch, Users, ShoppingBasket, MapPin, FileText } from "lucide-react"
import { Button } from "./ui/button"
import { ProductFilters } from "./product-filters"
import { Separator } from "./ui/separator"

export function CategoryMenu() {
    return (
        <div className="flex flex-col h-full">
            <ScrollArea className="flex-1">
                <ProductFilters />
            </ScrollArea>
             <div className="p-4 border-t mt-auto space-y-2">
                 <Separator className="mb-4" />
                <Button variant="ghost" asChild className="p-0 h-auto justify-start text-base w-full">
                    <Link href="/products-admin" className="flex items-center gap-2">
                        <ShoppingBasket className="h-5 w-5" />
                        <span>Artículos</span>
                    </Link>
                </Button>
                <Button variant="ghost" asChild className="p-0 h-auto justify-start text-base w-full">
                    <Link href="/clients" className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        <span>Clientes</span>
                    </Link>
                </Button>
                <Button variant="ghost" asChild className="p-0 h-auto justify-start text-base w-full">
                    <Link href="/address-check" className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        <span>Consulta de Domicilio</span>
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
                <Button variant="ghost" asChild className="p-0 h-auto justify-start text-base w-full">
                    <Link href="/scan-price" className="flex items-center gap-2">
                        <ScanSearch className="h-5 w-5" />
                        <span>Escaneá un precio</span>
                    </Link>
                </Button>
                <Button variant="ghost" asChild className="p-0 h-auto justify-start text-base w-full">
                    <Link href="/sales-report" className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>Reporte de Ventas</span>
                    </Link>
                </Button>
            </div>
        </div>
    )
}
