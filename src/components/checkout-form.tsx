
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Truck, Store, Zap, CreditCard, Wallet } from "lucide-react";
import { collection } from "firebase/firestore";

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
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import type { Order, ShippingOption } from "@/types";
import { useFirestore, useUser, addDocumentNonBlocking } from "@/firebase";

const shippingOptions: ShippingOption[] = [
    { id: 'store', label: 'Recojo en Tienda', price: 0, description: 'Disponible en 24 horas' },
    { id: 'home', label: 'Envío a Domicilio', price: 25, description: 'Entrega en 2-4 días hábiles' },
    { id: 'immediate', label: 'Entrega Inmediata', price: 50, description: 'Recíbelo en menos de 2 horas' },
];

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, introduce un correo electrónico válido."),
  address: z.string().min(5, "La dirección debe tener al menos 5 caracteres."),
  city: z.string().min(2, "La ciudad debe tener al menos 2 caracteres."),
  postalCode: z.string().min(5, "El código postal debe tener al menos 5 caracteres."),
  shipping: z.enum(['store', 'home', 'immediate'], { required_error: 'Debes seleccionar un método de envío.' }),
  dni: z.string().min(8, "El DNI debe tener al menos 8 caracteres."),
  store: z.string().optional(),
  paymentMethod: z.enum(['creditCard', 'mercadoPago'], { required_error: 'Debes seleccionar un método de pago.' }),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvc: z.string().optional(),
}).refine(data => {
    if (data.shipping === 'store') {
        return !!data.store && data.store.length > 0;
    }
    return true;
}, {
    message: "Por favor, selecciona una tienda para el recojo.",
    path: ['store'],
}).refine(data => {
    if (data.paymentMethod === 'creditCard') {
        return !!data.cardNumber && /^\d{16}$/.test(data.cardNumber);
    }
    return true;
}, {
    message: "El número de tarjeta debe tener 16 dígitos.",
    path: ['cardNumber'],
}).refine(data => {
    if (data.paymentMethod === 'creditCard') {
        return !!data.expiryDate && /^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiryDate);
    }
    return true;
}, {
    message: "El formato debe ser MM/AA.",
    path: ['expiryDate'],
}).refine(data => {
    if (data.paymentMethod === 'creditCard') {
        return !!data.cvc && /^\d{3,4}$/.test(data.cvc);
    }
    return true;
}, {
    message: "El CVC debe tener 3 o 4 dígitos.",
    path: ['cvc'],
});


export function CheckoutForm() {
  const { total, clearCart, cartItems, setShippingOption, shippingTotal, subtotal, warrantyTotal, installationTotal, shippingOption: selectedShippingOption } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const firestore = useFirestore();
  const { user } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      dni: "",
    },
  });
  
  const shippingValue = form.watch('shipping');
  const paymentMethodValue = form.watch('paymentMethod');

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Debes iniciar sesión para realizar un pedido."
        });
        return;
    }
    if (!selectedShippingOption) {
         toast({
            variant: "destructive",
            title: "Error",
            description: "Debes seleccionar un método de envío."
        });
        return;
    }

    const orderData: Omit<Order, 'id'> = {
        userId: user.uid,
        items: cartItems,
        orderDate: new Date().toISOString(),
        status: 'Procesando',
        shipping: selectedShippingOption,
        total: total,
        dni: values.dni,
        store: values.shipping === 'store' ? values.store : undefined,
        paymentMethod: values.paymentMethod === 'creditCard' ? 'Tarjeta de Crédito' : 'Mercado Pago',
    };
    
    const ordersRef = collection(firestore, `users/${user.uid}/orders`);
    addDocumentNonBlocking(ordersRef, orderData);

    toast({
      title: "¡Pedido Realizado!",
      description: "Gracias por tu compra. Hemos recibido tu pedido.",
    });
    clearCart();
    router.push("/orders");
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

  const handleShippingChange = (value: string) => {
    const option = shippingOptions.find(o => o.id === value);
    setShippingOption(option || null);
    form.setValue('shipping', value as 'store' | 'home' | 'immediate');
  }
  
  const getShippingIcon = (id: string) => {
      switch(id) {
          case 'store': return <Store className="h-6 w-6 text-primary" />;
          case 'home': return <Truck className="h-6 w-6 text-primary" />;
          case 'immediate': return <Zap className="h-6 w-6 text-primary" />;
      }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
           <Card>
            <CardHeader>
              <CardTitle className="font-headline">Método de Entrega</CardTitle>
            </CardHeader>
            <CardContent>
                <FormField
                  control={form.control}
                  name="shipping"
                  render={({ field }) => (
                    <FormItem>
                      <RadioGroup onValueChange={handleShippingChange} className="grid gap-4">
                        {shippingOptions.map(option => (
                           <FormItem key={option.id}>
                             <FormControl>
                               <RadioGroupItem value={option.id} className="sr-only" />
                             </FormControl>
                             <FormLabel
                               className={`flex flex-col items-start p-4 rounded-lg border-2 cursor-pointer transition-colors ${field.value === option.id ? 'border-primary bg-primary/5' : 'border-border'}`}
                              >
                               <div className="flex items-center gap-4 w-full">
                                {getShippingIcon(option.id)}
                                <div className="flex-grow">
                                    <span className="font-semibold">{option.label}</span>
                                    <p className="text-sm text-muted-foreground">{option.description}</p>
                                </div>
                                <span className="font-semibold text-sm">S/ {option.price.toFixed(2)}</span>
                               </div>
                             </FormLabel>
                           </FormItem>
                        ))}
                      </RadioGroup>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 {shippingValue === 'store' && (
                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name="store"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Selecciona una Tienda</FormLabel>
                          <FormControl>
                            <Input placeholder="Ej: Carrefour San Miguel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Información de Envío y Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <FormField
                control={form.control}
                name="dni"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DNI</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu número de DNI" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
        </div>
        <div className="space-y-8">
          <Card>
              <CardHeader>
                  <CardTitle className="font-headline">Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="space-y-4">
                      {cartItems.map(item => (
                          <div key={item.product.id} className="flex justify-between items-start text-sm">
                              <div>
                                  <p className="font-semibold">{item.product.name} <span className="text-muted-foreground">x {item.quantity}</span></p>
                                  {item.warranty && <p className="text-xs text-muted-foreground">+ {item.warranty.months} meses garantía</p>}
                                  {item.installation && <p className="text-xs text-muted-foreground">+ Instalación</p>}
                              </div>
                              <span>S/ {(item.product.price * item.quantity).toFixed(2)}</span>
                          </div>
                      ))}
                      <Separator />
                       <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span>S/ {subtotal.toFixed(2)}</span>
                      </div>
                       <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Garantías</span>
                          <span>S/ {warrantyTotal.toFixed(2)}</span>
                      </div>
                       <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Instalaciones</span>
                          <span>S/ {installationTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Envío</span>
                          <span>S/ {shippingTotal.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span>S/ {total.toFixed(2)}</span>
                      </div>
                  </div>
              </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Detalles de Pago</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <RadioGroup 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      className="grid grid-cols-1 gap-4"
                    >
                      <FormItem>
                        <FormControl>
                           <RadioGroupItem value="creditCard" className="sr-only" />
                        </FormControl>
                        <FormLabel className={`flex flex-col items-start p-4 rounded-lg border-2 cursor-pointer transition-colors ${field.value === 'creditCard' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                            <div className="flex items-center gap-4 w-full">
                                <CreditCard className="h-6 w-6 text-primary" />
                                <span className="font-semibold">Tarjeta de Crédito/Débito</span>
                            </div>
                        </FormLabel>
                      </FormItem>

                      <FormItem>
                         <FormControl>
                           <RadioGroupItem value="mercadoPago" className="sr-only" />
                         </FormControl>
                         <FormLabel className={`flex flex-col items-start p-4 rounded-lg border-2 cursor-pointer transition-colors ${field.value === 'mercadoPago' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                            <div className="flex items-center gap-4 w-full">
                                <Wallet className="h-6 w-6 text-primary" />
                                <span className="font-semibold">Mercado Pago</span>
                            </div>
                         </FormLabel>
                      </FormItem>
                    </RadioGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {paymentMethodValue === 'creditCard' && (
                <div className="space-y-4 mt-6">
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
                </div>
              )}
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full text-lg">
            Pagar S/ {total.toFixed(2)}
          </Button>
        </div>
      </form>
    </Form>
  );
}
