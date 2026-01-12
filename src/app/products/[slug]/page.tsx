
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShoppingCart, ShieldCheck, Wrench, CheckCircle2, XCircle, Store, Loader2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { useProductBySlug } from "@/lib/products";
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
import type { WarrantyOption, Product } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, where } from "firebase/firestore";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const firestore = useFirestore();
  
  const [selectedWarranty, setSelectedWarranty] = useState<WarrantyOption | null>(null);
  const [installationSelected, setInstallationSelected] = useState(false);

  const { product, isLoading: isProductLoading } = useProductBySlug(params.slug);

  const relatedProductsQuery = useMemoFirebase(() => {
    if (!firestore || !product) return null;
    return query(collection(firestore, "products"), where("category", "==", product.category), where("id", "!=", product.id));
  }, [firestore, product]);

  const { data: relatedProducts, isLoading: areRelatedLoading } = useCollection<Product>(relatedProductsQuery);

  if (isProductLoading) {
    return (
        <div className="container mx-auto py-12 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-4 text-lg">Cargando producto...</span>
        </div>
    );
  }

  if (!product) {
    return (
        <div className="container mx-auto py-12 text-center">
            <h1 className="text-2xl font-bold">Producto no encontrado</h1>
            <p className="text-muted-foreground">El producto que buscas no existe o ha sido eliminado.</p>
        </div>
    );
  }

  const handleAddToCart = () => {
    if (product.stock > 0) {
      addToCart(product, 1, selectedWarranty, installationSelected);
      toast({
        title: "Agregado al carrito",
        description: `${product.name} ha sido agregado a tu carrito.`,
      });
    } else {
       toast({
        variant: "destructive",
        title: "Sin stock",
        description: "Este producto no está disponible para compra online.",
      });
    }
  };

  const handleConsultStock = () => {
    router.push(`/stock-availability?productId=${product.id}`);
  }

  return (
    <div className="container mx-auto py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
           <Carousel className="w-full max-w-xl mx-auto">
              <CarouselContent>
                {product.imageUrls.map((url, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-square w-full rounded-lg overflow-hidden border bg-white flex items-center justify-center p-4">
                      <Image
                        src={url}
                        alt={`${product.name} - image ${index + 1}`}
                        width={400}
                        height={400}
                        className="w-auto h-auto object-contain max-h-full max-w-full"
                        data-ai-hint={product.imageHint}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {product.imageUrls.length > 1 && (
                <>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </>
              )}
            </Carousel>
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-headline mb-2">
            {product.name}
          </h1>
          {product.seller && (
            <p className="text-sm text-muted-foreground mb-4">
                Vendido y enviado por <span className="font-semibold text-foreground">{product.seller}</span>
            </p>
          )}
          <p className="text-muted-foreground text-lg mb-6">
            {product.description}
          </p>

          <div className="mb-6 flex items-center gap-4">
            <span className="text-4xl font-bold text-primary">
              S/ {product.price.toFixed(2)}
            </span>
             {product.stock > 0 ? (
                <Badge variant="outline" className="text-green-600 border-green-600">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    En Stock
                </Badge>
            ) : (
                 <Badge variant="destructive">
                    <XCircle className="mr-2 h-4 w-4" />
                    Sin Stock Online
                </Badge>
            )}
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
                <div className="flex items-start gap-3 rounded-lg border p-4">
                    <Wrench className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold">Servicio de Instalación</h3>
                        <p className="text-sm text-muted-foreground mb-3">Deja que nuestros expertos lo instalen por S/ {product.installationPrice.toFixed(2)}.</p>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="installation" checked={installationSelected} onCheckedChange={(checked) => setInstallationSelected(checked as boolean)} />
                            <Label htmlFor="installation">Sí, deseo el servicio de instalación</Label>
                        </div>
                    </div>
                </div>
            )}
          </div>
          
           {product.stock > 0 ? (
                <Button size="lg" className="w-full text-lg" onClick={handleAddToCart}>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Agregar al Carrito
                </Button>
            ) : (
                 <Button size="lg" className="w-full text-lg" variant="secondary" onClick={handleConsultStock}>
                    <Store className="mr-2 h-5 w-5" />
                    Consultar stock en sucursales
                </Button>
            )}
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

      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-20">
            <h2 className="text-2xl font-bold font-headline mb-6">Productos Relacionados</h2>
            <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
}
