"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useFirestore } from "@/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import type { UserProfile } from "@/types";
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
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  firstName: z.string().min(2, "El nombre es demasiado corto."),
  lastName: z.string().min(2, "El apellido es demasiado corto."),
  email: z.string().email("Por favor, introduce un correo electrónico válido."),
});

interface ClientFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: UserProfile | null;
}

export function ClientForm({ open, onOpenChange, client }: ClientFormProps) {
  const firestore = useFirestore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  useEffect(() => {
    if (client) {
      form.reset(client);
    } else {
      form.reset({
        firstName: "",
        lastName: "",
        email: "",
      });
    }
  }, [client, form, open]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!firestore) return;

    try {
      const clientId = client ? client.id : doc(collection(firestore, "users")).id;
      const clientRef = doc(firestore, "users", clientId);
      
      const userData: UserProfile = {
        id: clientId,
        ...values,
      };

      await setDoc(clientRef, userData, { merge: true });

      toast({
        title: client ? "Cliente Actualizado" : "Cliente Creado",
        description: `Los datos de ${values.firstName} se han guardado correctamente.`,
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Error saving client:", error);
      toast({
        variant: "destructive",
        title: "Error al guardar",
        description: "Hubo un problema al guardar el cliente.",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{client ? "Editar Cliente" : "Agregar Nuevo Cliente"}</DialogTitle>
          <DialogDescription>
            {client ? "Modifica los datos del cliente." : "Completa los datos para crear un nuevo cliente."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Juan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input placeholder="Pérez" {...field} />
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
            <DialogFooter>
              <Button type="submit">Guardar Cambios</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
