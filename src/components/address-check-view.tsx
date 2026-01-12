"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { CheckCircle2, Truck } from "lucide-react";

const formSchema = z.object({
  address: z.string().min(5, "La dirección debe tener al menos 5 caracteres."),
});

type FormValues = z.infer<typeof formSchema>;

export function AddressCheckView() {
  const [checkResult, setCheckResult] = useState<"success" | "fail" | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    // Simulate an API call
    setCheckResult(null);
    setTimeout(() => {
        // Simple logic: if address contains numbers, it's considered valid for delivery
        if (/\d/.test(data.address)) {
            setCheckResult("success");
        } else {
            setCheckResult("fail");
        }
    }, 1000);
  };

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Verificar Cobertura</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tu dirección</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Av. Corrientes 1234, CABA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col items-stretch space-y-4">
            <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Verificando..." : "Verificar"}
            </Button>
            {checkResult === "success" && (
                <Alert>
                    <CheckCircle2 className="h-4 w-4"/>
                    <AlertTitle>¡Llegamos a tu zona!</AlertTitle>
                    <AlertDescription>
                        Buenas noticias, tenemos cobertura de entrega en la dirección ingresada.
                    </AlertDescription>
                </Alert>
            )}
            {checkResult === "fail" && (
                 <Alert variant="destructive">
                    <Truck className="h-4 w-4"/>
                    <AlertTitle>¡Lo sentimos!</AlertTitle>
                    <AlertDescription>
                        Actualmente no tenemos cobertura en la dirección ingresada. Estamos trabajando para expandirnos.
                    </AlertDescription>
                </Alert>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
