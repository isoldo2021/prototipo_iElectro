
"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Layers, Heart, Info } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";
import { useCart } from "@/context/cart-context";
import { useComparison } from "@/context/comparison-context";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleFromComparison, isInComparison } = useComparison();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Agregado al carrito",
      description: `${product.name} ha sido agregado a tu carrito.`,
    });
  };

  const handleToggleComparison = () => {
    toggleFromComparison(product.id);
  }

  const isComparing = isInComparison(product.id);

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg group">
      <div className="relative overflow-hidden">
        <Link href={`/products/${product.slug}`} className="block">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={600}
            className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={product.imageHint}
          />
        </Link>
        {product.hasFreeShipping && (
            <Badge className="absolute top-2 right-2 bg-blue-600 text-white hover:bg-blue-700">
                ENVÍO GRATIS
            </Badge>
        )}
         <Button variant="ghost" size="icon" className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white">
            <Heart className="h-5 w-5 text-muted-foreground"/>
        </Button>
      </div>

      <CardContent className="flex-grow p-4 space-y-2">
        {product.installments && (
            <Badge variant="destructive">{product.installments} CUOTAS SIN INTERÉS</Badge>
        )}
        {product.carrefourCredit && (
            <div className="flex items-center gap-1 text-sm text-blue-600 font-semibold">
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current"><path d="m12 0c-6.628 0-12 5.372-12 12s5.372 12 12 12 12-5.372 12-12-5.372-12-12-12zm4.282 6.6l-5.986 5.982-2.992-2.99 1.41-1.418 1.582 1.582 4.576-4.576z"/></svg>
                <span>{product.carrefourCredit}</span>
                <Info className="h-4 w-4" />
            </div>
        )}
        
        <div>
            {product.originalPrice && (
                 <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-primary">
                        $ {product.price.toLocaleString('es-AR', {minimumFractionDigits: 2})}
                    </p>
                    {discountPercentage > 0 && <Badge variant="outline" className="border-red-500 text-red-500">-{discountPercentage}%</Badge>}
                </div>
            )}
            {!product.originalPrice && (
                 <p className="text-2xl font-bold text-primary">
                    $ {product.price.toLocaleString('es-AR', {minimumFractionDigits: 2})}
                </p>
            )}
            {product.originalPrice && (
                <p className="text-sm text-muted-foreground line-through">
                    $ {product.originalPrice.toLocaleString('es-AR', {minimumFractionDigits: 2})}
                </p>
            )}
        </div>

        <Link href={`/products/${product.slug}`} className="block pt-1">
          <p className="text-sm leading-tight text-foreground hover:text-primary">
            {product.name}
          </p>
        </Link>
      </CardContent>

      <CardFooter className="flex-col items-stretch gap-2 p-4 pt-0">
        <Button onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Agregar al Carrito
        </Button>
        <div className="flex items-center justify-center space-x-2 rounded-md border p-2 h-10">
            <Checkbox 
                id={`compare-${product.id}`} 
                checked={isComparing}
                onCheckedChange={handleToggleComparison}
                aria-label="Comparar producto"
            />
            <Label htmlFor={`compare-${product.id}`} className="text-sm font-medium leading-none cursor-pointer">
                Comparar
            </Label>
        </div>
      </CardFooter>
    </Card>
  );
}
