
"use client";

import { useState } from "react";
import { useUser, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, where, orderBy } from "firebase/firestore";
import type { Order } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Badge } from "./ui/badge";
import { format } from "date-fns";
import Image from "next/image";
import { useFirestore } from "@/firebase/provider";

export function OrdersView() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"dni" | "date" | "store">("dni");

  const ordersQuery = useMemoFirebase(() => {
    if (!user) return null;
    
    let q = query(collection(firestore, `users/${user.uid}/orders`), orderBy('orderDate', 'desc'));

    if (searchTerm) {
        if (filterType === 'dni') {
            q = query(q, where('dni', '==', searchTerm));
        } else if (filterType === 'store') {
            q = query(q, where('store', '==', searchTerm));
        } else if (filterType === 'date') {
            // This is a simplification. A real date search would need a date picker and range logic.
            // For now, we search for a partial match in the date string.
             q = query(q, where('orderDate', '>=', searchTerm));
        }
    }

    return q;
  }, [user, firestore, searchTerm, filterType]);

  const { data: orders, isLoading } = useCollection<Order>(ordersQuery);

  const getStatusVariant = (status: Order['status']) => {
    switch (status) {
      case "Entregado":
        return "bg-green-500";
      case "Enviado":
        return "bg-blue-500";
      case "Procesando":
        return "bg-yellow-500";
      case "Cancelado":
        return "bg-red-500";
      case "Devuelto":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  if (isUserLoading || isLoading) {
    return <div>Cargando tus pedidos...</div>;
  }

  if (!user) {
    return (
      <Card className="text-center py-20">
        <CardContent>
          <h2 className="text-2xl font-semibold mb-4">Inicia sesión para ver tus pedidos</h2>
          <p className="text-muted-foreground mb-6">
            Para consultar tu historial de pedidos, por favor, inicia sesión.
          </p>
          <Button asChild>
            <a href="/login">Iniciar Sesión</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Buscar Pedidos</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-2">
            <Button variant={filterType === 'dni' ? 'default' : 'outline'} onClick={() => setFilterType('dni')}>DNI</Button>
            <Button variant={filterType === 'date' ? 'default' : 'outline'} onClick={() => setFilterType('date')}>Fecha</Button>
            <Button variant={filterType === 'store' ? 'default' : 'outline'} onClick={() => setFilterType('store')}>Local</Button>
          </div>
          <Input
            type={filterType === 'date' ? 'date' : 'text'}
            placeholder={`Buscar por ${filterType}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
        </CardContent>
      </Card>

      {orders && orders.length > 0 ? (
        <Accordion type="multiple" className="space-y-4">
          {orders.map((order) => (
            <AccordionItem value={order.id} key={order.id} className="bg-card border rounded-lg">
              <AccordionTrigger className="p-4 hover:no-underline">
                <div className="flex flex-col md:flex-row md:items-center justify-between w-full text-left">
                    <div className="flex-1">
                        <p className="font-bold">Pedido #{order.id.slice(-6)}</p>
                        <p className="text-sm text-muted-foreground">
                            {format(new Date(order.orderDate), "dd/MM/yyyy")}
                        </p>
                    </div>
                    <div className="flex-1 flex justify-start md:justify-center my-2 md:my-0">
                         <Badge className={getStatusVariant(order.status)}>{order.status}</Badge>
                    </div>
                    <p className="flex-1 font-semibold text-right">S/ {order.total.toFixed(2)}</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 border-t">
                <div className="space-y-4">
                    {order.items.map(item => (
                        <div key={item.product.id} className="flex gap-4">
                            <Image src={item.product.imageUrls[0]} alt={item.product.name} width={64} height={64} className="rounded-md object-cover"/>
                            <div className="flex-1">
                                <p className="font-semibold">{item.product.name}</p>
                                <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                                <p className="text-sm text-muted-foreground">Precio: S/ {item.product.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 pt-4 border-t flex justify-end gap-2">
                    <Button variant="outline" size="sm" disabled={order.status !== 'Entregado'}>Devolución</Button>
                    <Button variant="destructive" size="sm" disabled={order.status !== 'Procesando'}>Anular</Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <Card className="text-center py-20">
          <CardContent>
            <h2 className="text-2xl font-semibold mb-4">No se encontraron pedidos</h2>
            <p className="text-muted-foreground">No tienes pedidos que coincidan con la búsqueda actual o aún no has realizado ninguno.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
