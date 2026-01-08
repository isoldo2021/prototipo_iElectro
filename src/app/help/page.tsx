import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { LifeBuoy, Phone, Mail } from "lucide-react";
import Link from "next/link";

export default function HelpPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8">Centro de Ayuda</h1>
      
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">Contáctanos</CardTitle>
                <Phone className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold">0800-444-2277</p>
                <p className="text-xs text-muted-foreground">Lun a Vie de 9 a 18 hs</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">Email de Soporte</CardTitle>
                <Mail className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <p className="text-xl font-bold break-all">ayuda@carrefour.com.ar</p>
                <p className="text-xs text-muted-foreground">Respuesta en 24hs hábiles</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">Preguntas Frecuentes</CardTitle>
                <LifeBuoy className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                 <Button asChild>
                    <Link href="/faq">Ir a Preguntas Frecuentes</Link>
                </Button>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Guías Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>¿Cómo comprar en línea?</AccordionTrigger>
              <AccordionContent>
                Para comprar en Carrefour, simplemente navega por nuestro catálogo, agrega los productos que desees a tu carrito y procede al pago. Puedes iniciar sesión para un proceso más rápido o comprar como invitado.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Opciones de envío</AccordionTrigger>
              <AccordionContent>
                Ofrecemos recojo en tienda, envío a domicilio estándar y entrega inmediata. Cada opción tiene un costo y tiempo de entrega diferente que podrás ver y seleccionar durante el proceso de compra.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Seguimiento de mi pedido</AccordionTrigger>
              <AccordionContent>
                Puedes ver el estado actual de tu pedido en la sección "Consulta de Pedidos" en el menú principal. Allí encontrarás toda la información actualizada sobre la ubicación y estado de tu compra.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
