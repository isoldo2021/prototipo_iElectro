import { CartView } from "@/components/cart-view";
import { Suspense } from "react";

export default function CartPage() {
    return (
        <div className="container mx-auto py-12">
            <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8">Tu Carrito de Compras</h1>
            <Suspense fallback={<div>Cargando carrito...</div>}>
                <CartView />
            </Suspense>
        </div>
    );
}
