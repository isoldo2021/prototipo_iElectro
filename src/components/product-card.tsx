"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Layers } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";
import { useCart } from "@/context/cart-context";
import { useComparison } from "@/context/comparison-context";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

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

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/products/${product.slug}`} className="block overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={600}
            className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-105"
            data-ai-hint={product.imageHint}
          />
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <Link href={`/products/${product.slug}`}>
          <CardTitle className="mb-2 font-headline text-lg leading-tight hover:text-primary">
            {product.name}
          </CardTitle>
        </Link>
        <p className="text-2xl font-bold text-primary">
          S/ {product.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-2 p-4 pt-0">
        <Button onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Agregar al Carrito
        </Button>
        <div className="flex items-center justify-center space-x-2 rounded-md border p-2">
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
