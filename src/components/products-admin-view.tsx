"use client";

import { useState } from "react";
import type { Product } from "@/types";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ProductForm } from "./product-form";
import { products as mockProducts } from "@/lib/products";
import { useUser } from "@/firebase";
import { useToast } from "@/hooks/use-toast";

export function ProductsAdminView() {
  const { user } = useUser();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const { toast } = useToast();

  const handleAddNew = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (productId: string) => {
    // This is a mock delete for demonstration
    setProducts(prev => prev.filter(p => p.id !== productId));
    toast({
      title: "Artículo Eliminado (Demo)",
      description: "El artículo ha sido eliminado de la vista de demostración.",
    });
  };
  
  if (!user) {
    return (
      <Card className="text-center py-20">
        <CardContent>
          <h2 className="text-2xl font-semibold mb-4">Acceso Denegado</h2>
          <p className="text-muted-foreground mb-6">
            Debes iniciar sesión para administrar los artículos.
          </p>
          <Button asChild>
            <a href="/login">Iniciar Sesión</a>
          </Button>
        </CardContent>
      </Card>
    );
  }


  return (
    <div>
       <ProductForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          product={selectedProduct}
        />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Lista de Artículos</CardTitle>
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Agregar Artículo
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Imagen</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products && products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image src={product.imageUrls[0]} alt={product.name} width={40} height={40} className="rounded-md object-cover"/>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>$ {product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                         <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. Esto eliminará permanentemente el artículo (en esta demo).
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(product.id)}>Eliminar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                  </TableCell>
                </TableRow>
              ))}
               {!products || products.length === 0 && (
                <TableRow>
                    <TableCell colSpan={5} className="text-center h-24">No hay artículos para mostrar.</TableCell>
                </TableRow>
               )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
