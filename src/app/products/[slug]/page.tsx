"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { ShoppingCart, ShieldCheck, Wrench } from "lucide-react";

import { getProductBySlug, products } from "@/lib/products";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";
import { ProductGrid } from "@/components/product-grid";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import type { WarrantyOption } from "@/types";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedWarranty, setSelectedWarranty] = useState<WarrantyOption | null>(null);


  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product, 1, selectedWarranty);
    toast({
      title: "Agregado al carrito",
      description: `${product.name} ha sido agregado a tu carrito.`,
    });
  };

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="container mx-auto py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="rounded-lg overflow-hidden border">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={800}
            height={800}
            className="w-full h-full object-cover"
            data-ai-hint={product.imageHint}
          />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-headline mb-4">
            {product.name}
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            {product.description}
          </p>
          <div className="mb-6">
            <span className="text-4xl font-bold text-primary">
              S/ {product.price.toFixed(2)}
            </span>
          </div>

          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-start gap-3 rounded-lg border p-4">
                <ShieldCheck className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                <div>
                    <h3 className="font-semibold">Garantía Extendida</h3>
                    <p className="text-sm text-muted-foreground mb-3">Protege tu compra por más tiempo.</p>
                     <RadioGroup onValueChange={(value) => setSelectedWarranty(product.warrantyOptions.find(w => w.months === parseInt(value)) || null)}>
                        <div className="flex items-center space-x-2">
                           <RadioGroupItem value="0" id="warranty-none" defaultChecked/>
                           <Label htmlFor="warranty-none">Sin garantía extendida</Label>
                        </div>
                        {product.warrantyOptions.map(option => (
                           <div key={option.months} className="flex items-center space-x-2">
                              <RadioGroupItem value={String(option.months)} id={`warranty-${option.months}`} />
                              <Label htmlFor={`warranty-${option.months}`}>{option.months} meses (+S/ {option.price.toFixed(2)})</Label>
                           </div>
                        ))}
                     </RadioGroup>
                </div>
            </div>
            {product.installationPrice && (
                <div className="flex items-center gap-3 rounded-lg border p-4">
                    <Wrench className="h-8 w-8 text-primary" />
                    <div>
                        <h3 className="font-semibold">Servicio de Instalación</h3>
                        <p className="text-sm text-muted-foreground">Deja que nuestros expertos lo instalen por S/ {product.installationPrice.toFixed(2)}.</p>
                    </div>
                </div>
            )}
          </div>
          
          <Button size="lg" className="w-full text-lg" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Agregar al Carrito
          </Button>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-2xl font-bold font-headline mb-6">Especificaciones Técnicas</h2>
        <Table>
          <TableBody>
            {Object.entries(product.specifications).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell className="font-semibold">{key}</TableCell>
                <TableCell>{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-20">
            <h2 className="text-2xl font-bold font-headline mb-6">Productos Relacionados</h2>
            <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
}
