
"use client";

import { useComparison } from "@/context/comparison-context";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/types";
import { useProductsByIds } from "@/hooks/use-products";


export function CompareView() {
    const { comparisonIds } = useComparison();
    const { items: comparisonItems, isLoading } = useProductsByIds(comparisonIds);
    const { addToCart } = useCart();
    const { toast } = useToast();

    if (isLoading) {
        return <div>Cargando productos para comparar...</div>
    }

    if (comparisonItems.length === 0) {
        return (
            <Card className="text-center py-20">
                <CardContent>
                    <h2 className="text-2xl font-semibold mb-4">No hay productos para comparar</h2>
                    <p className="text-muted-foreground mb-6">Selecciona productos desde el catálogo para ver sus características lado a lado.</p>
                    <Button asChild>
                        <Link href="/">Volver al Catálogo</Link>
                    </Button>
                </CardContent>
            </Card>
        );
    }

    const allSpecKeys = Array.from(new Set(comparisonItems.flatMap(item => Object.keys(item.specifications))));
    
    const handleAddToCart = (product: Product) => {
        addToCart(product);
        toast({
            title: "Agregado al carrito",
            description: `${product.name} ha sido agregado a tu carrito.`,
        });
    };

    return (
        <Card>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table className="min-w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1/4">Característica</TableHead>
                                {comparisonItems.map(item => (
                                    <TableHead key={item.id} className="w-1/4 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <Image src={item.imageUrls[0]} alt={item.name} width={100} height={100} className="rounded-md object-cover" data-ai-hint={item.imageHint}/>
                                            <span className="font-semibold text-foreground">{item.name}</span>
                                        </div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-semibold">Precio</TableCell>
                                {comparisonItems.map(item => (
                                    <TableCell key={item.id} className="text-center font-bold text-primary text-lg">
                                        S/ {item.price.toFixed(2)}
                                    </TableCell>
                                ))}
                            </TableRow>
                             <TableRow>
                                <TableCell className="font-semibold">Garantía</TableCell>
                                {comparisonItems.map(item => (
                                    <TableCell key={item.id} className="text-center">
                                        {item.warrantyOptions.map(w => `${w.months}m (S/${w.price})`).join(', ') || 'N/A'}
                                    </TableCell>
                                ))}
                            </TableRow>
                            {allSpecKeys.map(key => (
                                <TableRow key={key}>
                                    <TableCell className="font-semibold">{key}</TableCell>
                                    {comparisonItems.map(item => (
                                        <TableCell key={item.id} className="text-center">
                                            {item.specifications[key] || 'N/A'}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                             <TableRow>
                                <TableCell></TableCell>
                                {comparisonItems.map(item => (
                                    <TableCell key={item.id} className="text-center">
                                        <Button onClick={() => handleAddToCart(item)}>
                                            <ShoppingCart className="mr-2 h-4 w-4" />
                                            Agregar
                                        </Button>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
