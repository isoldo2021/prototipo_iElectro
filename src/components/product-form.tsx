"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useFirestore } from "@/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "./ui/scroll-area";
import { Checkbox } from "./ui/checkbox";
import { X } from "lucide-react";
import { Separator } from "./ui/separator";

const formSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
  slug: z.string().min(3, "El slug debe tener al menos 3 caracteres."),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres."),
  price: z.coerce.number().positive("El precio debe ser un número positivo."),
  originalPrice: z.coerce.number().optional(),
  installments: z.coerce.number().optional(),
  hasFreeShipping: z.boolean().default(false),
  carrefourCredit: z.string().optional(),
  imageUrls: z.array(z.string().url("Debe ser una URL válida.")).min(1, "Se requiere al menos una imagen."),
  imageHint: z.string().optional(),
  category: z.enum(['small', 'large']),
  specifications: z.array(z.object({ key: z.string().min(1), value: z.string().min(1) })),
  warrantyOptions: z.array(z.object({
    months: z.coerce.number().int().positive(),
    price: z.coerce.number().positive(),
  })),
  installationPrice: z.coerce.number().optional(),
  seller: z.string().optional(),
  stock: z.coerce.number().int().min(0, "El stock no puede ser negativo."),
  stockByStore: z.array(z.object({ key: z.string().min(1), value: z.coerce.number().int().min(0) })),
});

type ProductFormData = z.infer<typeof formSchema>;

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

const objectToArray = (obj: { [key: string]: any } | undefined) => {
    if (!obj) return [];
    return Object.entries(obj).map(([key, value]) => ({ key, value }));
};

const arrayToObject = (arr: { key: string, value: any }[]) => {
    return arr.reduce((acc, { key, value }) => {
        if (key) acc[key] = value;
        return acc;
    }, {} as { [key: string]: any });
};

export function ProductForm({ open, onOpenChange, product }: ProductFormProps) {
  const firestore = useFirestore();
  const { toast } = useToast();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      price: 0,
      hasFreeShipping: false,
      imageUrls: [],
      category: "small",
      specifications: [],
      warrantyOptions: [],
      stock: 0,
      stockByStore: [],
    },
  });
  
  const { fields: specFields, append: appendSpec, remove: removeSpec } = useFieldArray({ control: form.control, name: "specifications" });
  const { fields: warrantyFields, append: appendWarranty, remove: removeWarranty } = useFieldArray({ control: form.control, name: "warrantyOptions" });
  const { fields: imageUrlsFields, append: appendImageUrl, remove: removeImageUrl } = useFieldArray({ control: form.control, name: "imageUrls" });
  const { fields: stockByStoreFields, append: appendStockByStore, remove: removeStockByStore } = useFieldArray({ control: form.control, name: "stockByStore" });

  useEffect(() => {
    if (open) {
      if (product) {
        form.reset({
          ...product,
          specifications: objectToArray(product.specifications),
          stockByStore: objectToArray(product.stockByStore),
        });
      } else {
        form.reset({
          name: "",
          slug: "",
          description: "",
          price: 0,
          originalPrice: undefined,
          installments: undefined,
          hasFreeShipping: false,
          carrefourCredit: "",
          imageUrls: [],
          imageHint: "",
          category: "small",
          specifications: [],
          warrantyOptions: [],
          installationPrice: undefined,
          seller: "",
          stock: 0,
          stockByStore: [],
        });
      }
    }
  }, [product, open, form]);

  async function onSubmit(values: ProductFormData) {
    if (!firestore) return;

    try {
      const productId = product ? product.id : doc(collection(firestore, "products")).id;
      const productRef = doc(firestore, "products", productId);
      
      const productData: Product = {
        id: productId,
        ...values,
        specifications: arrayToObject(values.specifications),
        stockByStore: arrayToObject(values.stockByStore),
      };

      await setDoc(productRef, productData, { merge: true });

      toast({
        title: product ? "Artículo Actualizado" : "Artículo Creado",
        description: `Los datos de ${values.name} se han guardado correctamente.`,
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        variant: "destructive",
        title: "Error al guardar",
        description: "Hubo un problema al guardar el artículo.",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{product ? "Editar Artículo" : "Agregar Nuevo Artículo"}</DialogTitle>
          <DialogDescription>
            {product ? "Modifica los datos del artículo." : "Completa los datos para crear un nuevo artículo."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ScrollArea className="h-[60vh] p-4">
              <div className="space-y-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem><FormLabel>Nombre</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="slug" render={({ field }) => (
                  <FormItem><FormLabel>Slug</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem><FormLabel>Descripción</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="price" render={({ field }) => (
                    <FormItem><FormLabel>Precio</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="originalPrice" render={({ field }) => (
                    <FormItem><FormLabel>Precio Original</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="stock" render={({ field }) => (
                    <FormItem><FormLabel>Stock (Online)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem><FormLabel>Categoría</FormLabel><FormControl><select {...field} className="w-full h-10 border rounded-md px-3"><option value="small">Pequeño</option><option value="large">Grande</option></select></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="hasFreeShipping" render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><FormLabel>Envío Gratis</FormLabel></div></FormItem>
                )} />
                
                <Separator/>
                <div>
                  <h3 className="text-lg font-medium mb-2">URLs de Imagen</h3>
                  {imageUrlsFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2 mb-2">
                      <FormField control={form.control} name={`imageUrls.${index}`} render={({ field }) => (
                        <FormItem className="flex-1"><FormControl><Input {...field} placeholder={`URL de imagen ${index + 1}`} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <Button type="button" variant="destructive" size="icon" onClick={() => removeImageUrl(index)}><X className="h-4 w-4" /></Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={() => appendImageUrl("")}>Agregar URL</Button>
                </div>

                <Separator/>
                <div>
                  <h3 className="text-lg font-medium mb-2">Especificaciones</h3>
                  {specFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2 mb-2">
                       <FormField control={form.control} name={`specifications.${index}.key`} render={({ field }) => (<FormItem className="flex-1"><FormControl><Input {...field} placeholder="Clave (ej. Color)"/></FormControl><FormMessage/></FormItem>)} />
                       <FormField control={form.control} name={`specifications.${index}.value`} render={({ field }) => (<FormItem className="flex-1"><FormControl><Input {...field} placeholder="Valor (ej. Negro)"/></FormControl><FormMessage/></FormItem>)} />
                       <Button type="button" variant="destructive" size="icon" onClick={() => removeSpec(index)}><X className="h-4 w-4" /></Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={() => appendSpec({ key: '', value: '' })}>Agregar Especificación</Button>
                </div>
                
                <Separator/>
                <div>
                    <h3 className="text-lg font-medium mb-2">Opciones de Garantía</h3>
                    {warrantyFields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-2 mb-2">
                             <FormField control={form.control} name={`warrantyOptions.${index}.months`} render={({ field }) => (<FormItem className="flex-1"><FormControl><Input type="number" {...field} placeholder="Meses"/></FormControl><FormMessage/></FormItem>)} />
                             <FormField control={form.control} name={`warrantyOptions.${index}.price`} render={({ field }) => (<FormItem className="flex-1"><FormControl><Input type="number" {...field} placeholder="Precio"/></FormControl><FormMessage/></FormItem>)} />
                             <Button type="button" variant="destructive" size="icon" onClick={() => removeWarranty(index)}><X className="h-4 w-4" /></Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => appendWarranty({ months: 12, price: 0 })}>Agregar Garantía</Button>
                </div>
                
                <Separator/>
                <div>
                    <h3 className="text-lg font-medium mb-2">Stock por Tienda</h3>
                    {stockByStoreFields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-2 mb-2">
                             <FormField control={form.control} name={`stockByStore.${index}.key`} render={({ field }) => (<FormItem className="flex-1"><FormControl><Input {...field} placeholder="ID de Tienda"/></FormControl><FormMessage/></FormItem>)} />
                             <FormField control={form.control} name={`stockByStore.${index}.value`} render={({ field }) => (<FormItem className="flex-1"><FormControl><Input type="number" {...field} placeholder="Cantidad"/></FormControl><FormMessage/></FormItem>)} />
                             <Button type="button" variant="destructive" size="icon" onClick={() => removeStockByStore(index)}><X className="h-4 w-4" /></Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => appendStockByStore({ key: '', value: 0 })}>Agregar Tienda</Button>
                </div>
                
                <Separator/>
                <FormField control={form.control} name="installationPrice" render={({ field }) => (
                  <FormItem><FormLabel>Precio de Instalación</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="seller" render={({ field }) => (
                  <FormItem><FormLabel>Vendedor</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="imageHint" render={({ field }) => (
                  <FormItem><FormLabel>Pista de Imagen (para IA)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="carrefourCredit" render={({ field }) => (
                  <FormItem><FormLabel>Texto Crédito Carrefour</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField control={form.control} name="installments" render={({ field }) => (
                  <FormItem><FormLabel>Nro de Cuotas</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />

              </div>
            </ScrollArea>
            <DialogFooter className="pt-4">
              <Button type="submit">Guardar Cambios</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
