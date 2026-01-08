import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqItems = [
    {
        question: "¿Qué métodos de pago aceptan?",
        answer: "Aceptamos tarjetas de crédito y débito Visa, MasterCard y American Express, así como pagos a través de Mercado Pago."
    },
    {
        question: "¿Cómo funciona la garantía extendida?",
        answer: "La garantía extendida protege tu producto por más tiempo contra defectos de fabricación. Puedes seleccionarla en la página del producto antes de agregarlo al carrito. El costo varía según el producto y la duración."
    },
    {
        question: "¿Puedo anular un pedido?",
        answer: "Puedes anular un pedido únicamente si su estado es 'Procesando'. Ve a 'Consulta de Pedidos', busca tu pedido y haz clic en el botón 'Anular'."
    },
    {
        question: "¿Cómo realizo una devolución?",
        answer: "Si tu pedido ya fue entregado, puedes solicitar una devolución desde la sección 'Consulta de Pedidos' dentro de los 10 días de haberlo recibido."
    },
    {
        question: "¿El servicio de instalación está disponible para todos los productos?",
        answer: "El servicio de instalación está disponible para productos seleccionados de gran tamaño, como lavarropas, refrigeradores y aires acondicionados. Verás la opción en la página del producto si está disponible."
    },
    {
        question: "¿Qué hago si mi producto llega dañado?",
        answer: "Por favor, contáctanos de inmediato a través de nuestro centro de ayuda o teléfono de atención al cliente para que podamos solucionar el problema lo antes posible."
    },
];


export default function FaqPage() {
    return (
        <div className="container mx-auto py-12">
            <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8 text-center">Preguntas Frecuentes</h1>
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>Respuestas a tus dudas</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {faqItems.map((item, index) => (
                             <AccordionItem value={`item-${index + 1}`} key={index}>
                                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
}
