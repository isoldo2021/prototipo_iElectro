"use client"

import { useState } from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "./ui/scroll-area"

const categories = [
    "Audio",
    "Celulares",
    "Climatización",
    "Cocinas y hornos",
    "Cuidado personal y salud",
    "Heladeras y freezers",
    "Informática y gaming",
    "Instalaciones",
    "Lavado",
    "Pequeños electrodomésticos",
    "Termotanques y calefones",
    "TV y soportes"
].sort((a, b) => a.localeCompare(b));

const subCategoryOptions = ["Heladeras", "Freezers", "Cavas"];
const brandOptions = ["Samsung", "LG", "Whirlpool", "Gafa", "Patrick"];
const colorOptions = ["Inox", "Blanco", "Negro", "Gris"];


export function ProductFilters() {
    const [priceRange, setPriceRange] = useState([1000, 12000000]);

    return (
        <div className="p-4 flex flex-col h-full">
            <h2 className="text-2xl font-bold font-headline mb-4">Catálogo</h2>
            
            <ScrollArea className="flex-grow pr-4 -mr-4">
                <div className="space-y-4">
                    <Accordion type="single" collapsible defaultValue="electro" className="w-full">
                         <AccordionItem value="electro">
                            <AccordionTrigger className="font-semibold text-base">Electro y tecnología</AccordionTrigger>
                            <AccordionContent>
                               <div className="space-y-2 pt-2">
                                    {categories.map(category => (
                                         <div key={category} className="flex items-center space-x-2">
                                            <a href="#" className="text-sm hover:underline">{category}</a>
                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <h3 className="text-xl font-bold font-headline mb-4 pt-4 border-t">Filtros</h3>
                    
                    <Accordion type="multiple" defaultValue={["sub-categoria", "marca", "color"]} className="w-full">
                        <AccordionItem value="sub-categoria">
                            <AccordionTrigger className="font-semibold">Sub-Categoría</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-2 pt-2">
                                    {subCategoryOptions.map(option => (
                                         <div key={option} className="flex items-center space-x-2">
                                            <Checkbox id={`subcat-${option}`} />
                                            <Label htmlFor={`subcat-${option}`} className="font-normal">{option}</Label>
                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="marca">
                            <AccordionTrigger className="font-semibold">Marca</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-2 pt-2">
                                    {brandOptions.map(option => (
                                         <div key={option} className="flex items-center space-x-2">
                                            <Checkbox id={`brand-${option}`} />
                                            <Label htmlFor={`brand-${option}`} className="font-normal">{option}</Label>
                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="color">
                            <AccordionTrigger className="font-semibold">Color</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-2 pt-2">
                                    {colorOptions.map(option => (
                                         <div key={option} className="flex items-center space-x-2">
                                            <Checkbox id={`color-${option}`} />
                                            <Label htmlFor={`color-${option}`} className="font-normal">{option}</Label>
                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <div>
                        <h3 className="font-semibold mb-2 mt-4 text-base">Gama De Precios</h3>
                        <Slider
                            defaultValue={[priceRange[0], priceRange[1]]}
                            max={12000000}
                            min={1000}
                            step={1000}
                            onValueChange={(value) => setPriceRange(value)}
                        />
                        <div className="flex justify-between text-sm text-muted-foreground mt-2">
                            <span>$ {priceRange[0].toLocaleString('es-AR')}</span>
                            <span>$ {priceRange[1].toLocaleString('es-AR')}</span>
                        </div>
                    </div>
                </div>
            </ScrollArea>
            <div className="mt-6">
                <Button className="w-full">APLICAR</Button>
            </div>
        </div>
    )
}
