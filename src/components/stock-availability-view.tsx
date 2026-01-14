
"use client";

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Product } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { CheckCircle2, XCircle } from 'lucide-react';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { products as mockProducts } from '@/lib/products';

interface Store {
  id: string;
  name: string;
  address: string;
}

const stores: Store[] = [
    { id: "store-1", name: "Carrefour Express", address: "Amenabar 1187, Belgrano, CABA" },
    { id: "store-2", name: "Carrefour Market", address: "Av. Corrientes 3450, Almagro, CABA" },
    { id: "store-3", name: "Carrefour Hipermercado", address: "Av. Rivadavia 7845, Flores, CABA" },
];

export function StockAvailabilityView() {
    const searchParams = useSearchParams();
    const initialProductId = searchParams.get('productId');
    const [selectedProductId, setSelectedProductId] = useState<string | undefined>(initialProductId || undefined);
    
    const products = mockProducts;

    const selectedProduct = useMemo(() => {
        return products?.find(p => p.id === selectedProductId);
    }, [selectedProductId, products]);


    return (
        <Card>
            <CardHeader>
                <CardTitle>Consultar Stock</CardTitle>
                <p className="text-muted-foreground">Selecciona un producto para ver su disponibilidad en nuestras sucursales.</p>
            </CardHeader>
            <CardContent className="space-y-6">
                <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={"Selecciona un producto..."} />
                    </SelectTrigger>
                    <SelectContent>
                        {products?.map(product => (
                            <SelectItem key={product.id} value={product.id}>
                                {product.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {selectedProduct && (
                    <Card className="overflow-hidden">
                        <div className='flex flex-col md:flex-row'>
                             <div className="p-4 md:w-1/3 flex flex-col items-center justify-center bg-muted/50">
                                <Image 
                                    src={selectedProduct.imageUrls[0]} 
                                    alt={selectedProduct.name} 
                                    width={150} 
                                    height={150} 
                                    className='object-cover rounded-md'
                                    data-ai-hint={selectedProduct.imageHint}
                                />
                                <h3 className="font-bold text-lg mt-4 text-center">{selectedProduct.name}</h3>
                                <p className="text-primary font-bold text-xl mt-2">S/ {selectedProduct.price.toFixed(2)}</p>
                            </div>
                            <div className="md:w-2/3">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Sucursal</TableHead>
                                            <TableHead className="text-right">Stock</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {stores.map(store => {
                                            const stockCount = selectedProduct.stockByStore ? selectedProduct.stockByStore[store.id] || 0 : 0;
                                            return (
                                                <TableRow key={store.id}>
                                                    <TableCell>
                                                        <p className="font-semibold">{store.name}</p>
                                                        <p className="text-sm text-muted-foreground">{store.address}</p>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        {stockCount > 0 ? (
                                                            <Badge variant="outline" className="text-green-600 border-green-600">
                                                                <CheckCircle2 className="mr-2 h-4 w-4"/>
                                                                Disponible ({stockCount})
                                                            </Badge>
                                                        ) : (
                                                            <Badge variant="destructive">
                                                                <XCircle className="mr-2 h-4 w-4"/>
                                                                Agotado
                                                            </Badge>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </Card>
                )}
                 {!selectedProduct && selectedProductId && (
                    <div className="text-center py-10">
                        <p className="text-muted-foreground">Producto no encontrado.</p>
                    </div>
                 )}
            </CardContent>
        </Card>
    );
}
