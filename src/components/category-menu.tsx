"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollArea } from "./ui/scroll-area"
import Link from "next/link"
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
            <div className="p-4">
                <h2 className="text-2xl font-headline font-bold">Electro y tecnología</h2>
                <Button variant="link" asChild className="p-0 h-auto text-base">
                    <Link href="/">VER TODOS LOS PRODUCTOS</Link>
                </Button>
            </div>
            <ScrollArea className="flex-1">
                <Accordion type="multiple" className="w-full p-4">
                    {categories.map((category) => (
                        <AccordionItem value={category.name} key={category.name}>
                            <AccordionTrigger className="text-base font-semibold hover:no-underline">
                                <Link href="#" className="hover:underline">{category.name}</Link>
                            </AccordionTrigger>
                            <AccordionContent>
                                <ul className="flex flex-col gap-2 pl-4 pt-2">
                                    {category.subcategories.map((subcategory) => (
                                        <li key={subcategory}>
                                            <Link href="#" className="text-muted-foreground hover:text-foreground hover:underline">
                                                {subcategory}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </ScrollArea>
        </div>
    )
}
