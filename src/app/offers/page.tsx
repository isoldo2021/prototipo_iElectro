import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ticket } from "lucide-react";

const offers = [
    {
        id: 1,
        title: "20% OFF en Lavarropas",
        description: "Válido para todos los lavarropas de carga frontal. No acumulable con otras promociones.",
        code: "LAVA20",
        expiry: "Vence en 3 días"
    },
    {
        id: 2,
        title: "S/ 500 de descuento en Refrigeradores",
        description: "En compras superiores a S/ 3000 en refrigeradores seleccionados.",
        code: "REFRI500",
        expiry: "Vence en 1 semana"
    },
    {
        id: 3,
        title: "Envío Gratis en Pequeños Electros",
        description: "Aplica para cafeteras, licuadoras y microondas. Usá el código al finalizar la compra.",
        code: "PEQUEÑOENVIO",
        expiry: "Vence en 2 días"
    },
    {
        id: 4,
        title: "15% Extra con Tarjeta Carrefour",
        description: "En toda la categoría de TV y Video. Exclusivo para pagos con Tarjeta Carrefour Crédito.",
        code: "TC-VIDEO15",
        expiry: "Vence este mes"
    },
];

export default function OffersPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="flex items-center gap-4 mb-8">
        <Ticket className="h-10 w-10 text-primary" />
        <div>
            <h1 className="text-3xl md:text-4xl font-bold font-headline">Cupones y Ofertas</h1>
            <p className="text-muted-foreground">Aprovechá estos descuentos en tu próxima compra.</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <Card key={offer.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{offer.title}</CardTitle>
              <CardDescription>{offer.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <span className="text-lg font-bold font-mono text-primary">{offer.code}</span>
                    <Button variant="ghost" size="sm">Copiar</Button>
                </div>
            </CardContent>
            <CardFooter>
                <p className="text-xs text-muted-foreground">{offer.expiry}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
