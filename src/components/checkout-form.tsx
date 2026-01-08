"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "./ui/separator";

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, introduce un correo electrónico válido."),
  address: z.string().min(5, "La dirección debe tener al menos 5 caracteres."),
  city: z.string().min(2, "La ciudad debe tener al menos 2 caracteres."),
  postalCode: z.string().min(5, "El código postal debe tener al menos 5 caracteres."),
  cardNumber: z.string().regex(/^\d{16}$/, "El número de tarjeta debe tener 16 dígitos."),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "El formato debe ser MM/AA."),
  cvc: z.string().regex(/^\d{3,4}$/, "El CVC debe tener 3 o 4 dígitos."),
});

export function CheckoutForm() {
  const { total, clearCart, cartItems } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Order submitted:", values);
    toast({
      title: "¡Pedido Realizado!",
      description: "Gracias por tu compra. Hemos recibido tu pedido.",
    });
    clearCart();
    router.push("/");
  }

  if (cartItems.length === 0) {
     return (
        <Card className="text-center py-20">
            <CardContent>
                <h2 className="text-2xl font-semibold mb-4">No hay nada para procesar</h2>
                <p className="text-muted-foreground mb-6">Tu carrito está vacío. Agrega productos antes de finalizar la compra.</p>
                <Button asChild>
                    <Link href="/">Volver al Catálogo</Link>
                </Button>
            </CardContent>
        </Card>
     )
  }

  return (
    <div className="grid md:grid-cols-2 gap-12">
      <div>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {cartItems.map(item => (
                        <div key={item.product.id} className="flex justify-between items-center text-sm">
                            <div>
                                <span className="font-semibold">{item.product.name}</span>
                                <span className="text-muted-foreground"> x {item.quantity}</span>
                            </div>
                            <span>S/ {(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>S/ {total.toFixed(2)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Información de Envío</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan Pérez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input placeholder="juan.perez@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                      <Input placeholder="Av. Siempre Viva 123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                 <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Ciudad</FormLabel>
                        <FormControl>
                        <Input placeholder="Lima" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Código Postal</FormLabel>
                        <FormControl>
                        <Input placeholder="Lima 01" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Detalles de Pago</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Número de Tarjeta</FormLabel>
                        <FormControl>
                        <Input placeholder="**** **** **** ****" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="expiryDate"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Vencimiento (MM/AA)</FormLabel>
                            <FormControl>
                            <Input placeholder="12/28" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cvc"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>CVC</FormLabel>
                            <FormControl>
                            <Input placeholder="123" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full text-lg">
            Pagar S/ {total.toFixed(2)}
          </Button>
        </form>
      </Form>
    </div>
  );
}
