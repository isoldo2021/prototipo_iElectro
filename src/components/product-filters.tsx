

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
import type { Filters } from "@/app/page";
import Link from "next/link"
import { Package, Truck, ScanSearch, PackageSearch, Users, ShoppingBasket, MapPin, FileText } from "lucide-react"
import { Separator } from "./ui/separator"

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
const brandOptions = ["Samsung", "LG", "Whirlpool", "Gafa", "Patrick", "Drean", "BGH", "Lenovo", "Nespresso", "Philips", "Rheem", "Nakan"];
const colorOptions = ["Inox", "Blanco", "Negro", "Gris", "Plata"];

interface ProductFiltersProps {
    onApplyFilters: (filters: Filters) => void;
    onCategorySelect: (category: string) => void;
}

export function ProductFilters({ onApplyFilters, onCategorySelect }: ProductFiltersProps) {
    const [priceRange, setPriceRange] = useState([1000, 1200000]);
    const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);

    const handleCheckboxChange = (setter: React.Dispatch<React.SetStateAction<string[]>>, option: string) => {
        setter(prev => prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]);
    };
    
    const handleApply = () => {
        onApplyFilters({
            subCategory: selectedSubCategories,
            brands: selectedBrands,
            colors: selectedColors,
            priceRange: priceRange,
        });
    }

    return (
        <div className="p-4 flex flex-col h-full border rounded-lg">
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
                                            <button onClick={() => onCategorySelect(category)} className="text-sm hover:underline">{category}</button>
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
                                            <Checkbox id={`subcat-${option}`} onCheckedChange={() => handleCheckboxChange(setSelectedSubCategories, option)} checked={selectedSubCategories.includes(option)} />
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
                                    {brandOptions.sort().map(option => (
                                         <div key={option} className="flex items-center space-x-2">
                                            <Checkbox id={`brand-${option}`} onCheckedChange={() => handleCheckboxChange(setSelectedBrands, option)} checked={selectedBrands.includes(option)}/>
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
                                            <Checkbox id={`color-${option}`} onCheckedChange={() => handleCheckboxChange(setSelectedColors, option)} checked={selectedColors.includes(option)}/>
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
                            max={1200000}
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
            <div className="mt-6 pt-4 border-t">
                <Button className="w-full" onClick={handleApply}>APLICAR</Button>
            </div>
             <div className="p-4 border-t mt-auto space-y-2">
                <Separator className="mb-4" />
                <Button variant="ghost" asChild className="p-0 h-auto justify-start text-base w-full">
                    <Link href="/products-admin">
                        <div className="flex items-center gap-2">
                            <ShoppingBasket className="h-5 w-5" />
                            <span>Artículos</span>
                        </div>
                    </Link>
                </Button>
                <Button variant="ghost" asChild className="p-0 h-auto justify-start text-base w-full">
                    <Link href="/clients">
                         <div className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            <span>Clientes</span>
                        </div>
                    </Link>
                </Button>
                <Button variant="ghost" asChild className="p-0 h-auto justify-start text-base w-full">
                    <Link href="/address-check">
                         <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            <span>Consulta de Domicilio</span>
                        </div>
                    </Link>
                </Button>
                 <Button variant="ghost" asChild className="p-0 h-auto justify-start text-base w-full">
                    <Link href="/orders">
                         <div className="flex items-center gap-2">
                            <Package className="h-5 w-5" />
                            <span>Consulta de Pedidos</span>
                        </div>
                    </Link>
                </Button>
                <Button variant="ghost" asChild className="p-0 h-auto justify-start text-base w-full">
                    <Link href="/stock-availability">
                         <div className="flex items-center gap-2">
                            <PackageSearch className="h-5 w-5" />
                            <span>Consulta de Stock</span>
                        </div>
                    </Link>
                </Button>
                <Button variant="ghost" asChild className="p-0 h-auto justify-start text-base w-full">
                    <Link href="/delivery-availability">
                         <div className="flex items-center gap-2">
                            <Truck className="h-5 w-5" />
                            <span>Disponibilidad de entrega</span>
                        </div>
                    </Link>
                </Button>
                <Button variant="ghost" asChild className="p-0 h-auto justify-start text-base w-full">
                    <Link href="/scan-price">
                         <div className="flex items-center gap-2">
                            <ScanSearch className="h-5 w-5" />
                            <span>Escaneá un precio</span>
                        </div>
                    </Link>
                </Button>
                <Button variant="ghost" asChild className="p-0 h-auto justify-start text-base w-full">
                    <Link href="/sales-report">
                         <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            <span>Reporte de Ventas</span>
                        </div>
                    </Link>
                </Button>
            </div>
        </div>
    )
}
