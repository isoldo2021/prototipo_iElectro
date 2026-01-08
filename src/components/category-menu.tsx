"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollArea } from "./ui/scroll-area"
import Link from "next/link"
import { Package, Truck, ScanSearch, PackageSearch } from "lucide-react"
import { Button } from "./ui/button"

const categories = [
    {
        name: "TV y soportes",
        subcategories: ["Smart TV", "Soportes y accesorios"],
    },
    {
        name: "Celulares",
        subcategories: ["Celulares libres", "Smartwatches y Accesorios", "Accesorios de Celulares y Telefonía"],
    },
    {
        name: "Climatización",
        subcategories: ["Aires acondicionados", "Ventiladores y climatizadores", "Calefacción eléctrica", "Calefacción a gas", "Calefacción a leña"],
    },
    {
        name: "Pequeños electrodomésticos",
        subcategories: ["Cafeteras", "Jarras eléctricas", "Jugueras y exprimidores", "Tostadoras y sandwicheras", "Licuadoras, procesadoras y gasificadoras", "Batidoras", "Cocción", "Planchas", "Máquinas de coser"],
    },
    {
        name: "Lavado",
        subcategories: ["Lavarropas", "Secarropas", "Lavasecarropas", "Lavavajillas"],
    },
    {
        name: "Termotanques y calefones",
        subcategories: ["Calefones", "Termotanques a gas", "Termotanques eléctricos", "Termotanques Solares"],
    },
    {
        name: "Cocinas y hornos",
        subcategories: ["Cocinas", "Anafes", "Hornos", "Microondas", "Campanas y purificadores"],
    },
    {
        name: "Audio",
        subcategories: ["Parlantes portátiles", "Equipos de sonido", "Auriculares", "Audio para autos", "Radios"],
    },
    {
        name: "Cuidado personal y salud",
        subcategories: ["Planchitas de pelo", "Secadores de pelo", "Depiladoras", "Afeitadoras y cortapelos", "Salud y bienestar", "Balanzas Personales"],
    },
    {
        name: "Informática y gaming",
        subcategories: ["Notebooks y PC", "Consolas y joysticks", "Impresoras y cartuchos", "Tablets", "Monitores y proyectores", "Teclados y mouse", "Cámaras de seguridad", "Fotografía", "Drones", "Accesorios y Componentes"],
    },
    {
        name: "Heladeras y freezers",
        subcategories: ["Heladeras", "Freezers", "Cavas"],
    },
    {
        name: "Instalaciones",
        subcategories: [],
    }
]

export function CategoryMenu() {
    return (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b space-y-2">
                <h2 className="text-2xl font-headline font-bold">Menú</h2>
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
            <ScrollArea className="flex-1">
                <div className="p-4">
                     <h3 className="text-lg font-headline font-semibold mb-2">Categorías</h3>
                     <Button variant="link" asChild className="p-0 h-auto text-base">
                        <Link href="/">Ver todos los productos</Link>
                    </Button>
                </div>
                <Accordion type="single" collapsible className="w-full px-4">
                    <AccordionItem value="electro-tech">
                        <AccordionTrigger className="text-lg font-semibold hover:no-underline">Electro y Tecnología</AccordionTrigger>
                        <AccordionContent>
                            <Accordion type="multiple" className="w-full pl-4">
                                {categories.map((category) => (
                                    <AccordionItem value={category.name} key={category.name}>
                                        <AccordionTrigger className="text-base font-semibold hover:no-underline border-b-0 py-2">
                                            <Link href="#" className="hover:underline">{category.name}</Link>
                                        </AccordionTrigger>
                                        {category.subcategories.length > 0 && (
                                            <AccordionContent className="pb-0">
                                                <ul className="flex flex-col gap-1 pl-4 pt-1 border-l">
                                                    {category.subcategories.map((subcategory) => (
                                                        <li key={subcategory}>
                                                            <Link href="#" className="text-muted-foreground hover:text-foreground hover:underline text-sm">
                                                                {subcategory}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </AccordionContent>
                                        )}
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </ScrollArea>
        </div>
    )
}
