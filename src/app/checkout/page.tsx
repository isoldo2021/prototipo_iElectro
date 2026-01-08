import { CheckoutForm } from "@/components/checkout-form";
import { Suspense } from "react";

export default function CheckoutPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8 text-center">
          Finalizar Compra
        </h1>
        <Suspense fallback={<div>Cargando...</div>}>
          <CheckoutForm />
        </Suspense>
      </div>
    </div>
  );
}
