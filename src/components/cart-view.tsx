
"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, ShieldCheck, Wrench } from "lucide-react";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import type { WarrantyOption } from "@/types";

export function CartView() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    updateWarranty,
    toggleInstallation, 
    itemCount, 
    subtotal, 
    warrantyTotal, 
    installationTotal, 
    total 
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <Card className="text-center py-20">
        <CardContent>
          <h2 className="text-2xl font-semibold mb-4">Tu carrito está vacío</h2>
          <p className="text-muted-foreground mb-6">Parece que aún no has agregado ningún producto.</p>
          <Button asChild>
            <Link href="/">Empezar a Comprar</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-12 items-start">
      <div className="lg:col-span-2">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] hidden md:table-cell">Producto</TableHead>
                  <TableHead>Detalles</TableHead>
                  <TableHead className="text-center">Cantidad</TableHead>
                  <TableHead className="text-right">Precio</TableHead>
                  <TableHead className="w-[50px]">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map(({ product, quantity, warranty, installation }) => (
                  <TableRow key={product.id}>
                    <TableCell className="hidden md:table-cell">
                      <div className="aspect-square w-20 bg-white flex items-center justify-center p-1 rounded-md">
                        <Image
                          src={product.imageUrls[0]}
                          alt={product.name}
                          width={60}
                          height={60}
                          className="h-auto w-auto object-contain"
                          data-ai-hint={product.imageHint}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">S/ {product.price.toFixed(2)}</p>
                      <div className="mt-2 flex flex-col gap-2">
                          <div className="flex items-center space-x-2">
                            <ShieldCheck className="h-4 w-4 text-green-600"/>
                             <Select
                                value={warranty ? String(warranty.months) : "0"}
                                onValueChange={(value) => {
                                    const selectedMonths = parseInt(value, 10);
                                    if (selectedMonths === 0) {
                                        updateWarranty(product.id, null);
                                    } else {
                                        const newWarranty = product.warrantyOptions.find(w => w.months === selectedMonths);
                                        updateWarranty(product.id, newWarranty || null);
                                    }
                                }}
                             >
                                <SelectTrigger className="w-[220px] h-8 text-sm">
                                    <SelectValue placeholder="Garantía Extendida" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">Sin garantía</SelectItem>
                                    {product.warrantyOptions.map(option => (
                                        <SelectItem key={option.months} value={String(option.months)}>
                                            {option.months} meses (+S/ {option.price.toFixed(2)})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                             </Select>
                          </div>
                          {product.installationPrice && (
                            <div className="flex items-center space-x-2">
                                <Checkbox id={`installation-${product.id}`} checked={installation} onCheckedChange={() => toggleInstallation(product.id)} />
                                <label htmlFor={`installation-${product.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1">
                                    <Wrench className="h-4 w-4 text-blue-600"/> Instalación (+S/ {product.installationPrice.toFixed(2)})
                                </label>
                            </div>
                          )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                        <Input 
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => updateQuantity(product.id, parseInt(e.target.value, 10))}
                            className="w-20 text-center mx-auto"
                        />
                    </TableCell>
                    <TableCell className="text-right font-medium">S/ {(product.price * quantity).toFixed(2)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(product.id)}>
                        <Trash2 className="h-5 w-5 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Resumen del Pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal ({itemCount} productos)</span>
              <span>S/ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Garantías</span>
              <span>S/ {warrantyTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Instalaciones</span>
              <span>S/ {installationTotal.toFixed(2)}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>S/ {total.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full text-lg" asChild>
                <Link href="/checkout">Finalizar Compra</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
