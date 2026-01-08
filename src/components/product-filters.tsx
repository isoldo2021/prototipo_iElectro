"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"

const categories = [
    {
        name: "Audio",
        subcategories: ["Parlantes portátiles", "Equipos de sonido", "Auriculares", "Audio para autos", "Radios"],
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
        name: "Cocinas y hornos",
        subcategories: ["Cocinas", "Anafes", "Hornos", "Microondas", "Campanas y purificadores"],
    },
    {
        name: "Cuidado personal y salud",
        subcategories: ["Planchitas de pelo", "Secadores de pelo", "Depiladoras", "Afeitadoras y cortapelos", "Salud y bienestar", "Balanzas Personales"],
    },
    {
        name: "Heladeras y freezers",
        subcategories: ["Heladeras", "Freezers", "Cavas"],
    },
    {
        name: "Informática y gaming",
        subcategories: ["Notebooks y PC", "Consolas y joysticks", "Impresoras y cartuchos", "Tablets", "Monitores y proyectores", "Teclados y mouse", "Cámaras de seguridad", "Fotografía", "Drones", "Accesorios y Componentes"],
    },
    {
        name: "Instalaciones",
        subcategories: [],
    },
    {
        name: "Lavado",
        subcategories: ["Lavarropas", "Secarropas", "Lavasecarropas", "Lavavajillas"],
    },
    {
        name: "Pequeños electrodomésticos",
        subcategories: ["Cafeteras", "Jarras eléctricas", "Jugueras y exprimidores", "Tostadoras y sandwicheras", "Licuadoras, procesadoras y gasificadoras", "Batidoras", "Cocción", "Planchas", "Máquinas de coser"],
    },
    {
        name: "Termotanques y calefones",
        subcategories: ["Calefones", "Termotanques a gas", "Termotanques eléctricos", "Termotanques Solares"],
    },
    {
        name: "TV y soportes",
        subcategories: ["Smart TV", "Soportes y accesorios"],
    },
]

export function ProductFilters() {
    return (
        <div className="p-4">
             <Accordion type="single" collapsible defaultValue="electro-tecnologia" className="w-full">
                <AccordionItem value="electro-tecnologia">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                        Electro y tecnología
                    </AccordionTrigger>
                    <AccordionContent>
                        <Accordion type="multiple" className="w-full space-y-2">
                            {categories.map((category) => (
                                <AccordionItem value={category.name} key={category.name} className="border-b-0">
                                     <AccordionTrigger className="text-base font-semibold hover:no-underline border-b-0 p-1 rounded-md hover:bg-muted">
                                        {category.name}
                                    </AccordionTrigger>
                                    {category.subcategories.length > 0 && (
                                        <AccordionContent className="pb-0">
                                            <ul className="flex flex-col gap-1 pl-4 pt-1">
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
        </div>
    )
}
