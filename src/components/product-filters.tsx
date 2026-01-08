"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import { Button } from "./ui/button"
import { Slider } from "./ui/slider"
import { Checkbox } from "./ui/checkbox"

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

const productTypes = ['Pequeño', 'Grande'];
const storeTypes = ['Express', 'Market', 'Hipermercado'];
const colors = ['Acero Inoxidable', 'Blanco', 'Negro', 'Gris'];
const brands = ['Samsung', 'LG', 'Whirlpool', 'Sony', 'Philips'];


export function ProductFilters() {
    return (
        <div className="p-4">
             <h3 className="text-2xl font-headline font-bold mb-4">Filtros</h3>
             <Accordion type="multiple" className="w-full">
                <AccordionItem value="category">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">Sub-Categoría</AccordionTrigger>
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

                 <AccordionItem value="product-type">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">Tipo De Producto</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                        {productTypes.map(type => (
                            <div key={type} className="flex items-center space-x-2">
                                <Checkbox id={`type-${type}`} />
                                <label htmlFor={`type-${type}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {type}
                                </label>
                            </div>
                        ))}
                    </AccordionContent>
                 </AccordionItem>

                  <AccordionItem value="store-type">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">Tipo De Tienda</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                        {storeTypes.map(type => (
                            <div key={type} className="flex items-center space-x-2">
                                <Checkbox id={`store-${type}`} />
                                <label htmlFor={`store-${type}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {type}
                                </label>
                            </div>
                        ))}
                    </AccordionContent>
                 </AccordionItem>

                 <AccordionItem value="color">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">Color</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                         {colors.map(color => (
                            <div key={color} className="flex items-center space-x-2">
                                <Checkbox id={`color-${color}`} />
                                <label htmlFor={`color-${color}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {color}
                                </label>
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>

                 <AccordionItem value="brand">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">Marca</AccordionTrigger>
                     <AccordionContent className="space-y-2">
                         {brands.map(brand => (
                            <div key={brand} className="flex items-center space-x-2">
                                <Checkbox id={`brand-${brand}`} />
                                <label htmlFor={`brand-${brand}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {brand}
                                </label>
                            </div>
                        ))}
                    </AccordionContent>
                 </AccordionItem>

             </Accordion>

             <div className="mt-6">
                <h4 className="text-lg font-semibold mb-4">Gama De Precios</h4>
                <Slider
                    defaultValue={[1000]}
                    max={12000000}
                    step={1000}
                    className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>$ 1.000,00</span>
                    <span>$ 11.953.846,00</span>
                </div>
             </div>

             <Button className="w-full mt-6">APLICAR</Button>

             <p className="text-xs text-muted-foreground mt-4">
                Los precios de oferta expresados en la web, son precios por unidad
             </p>
        </div>
    )
}
