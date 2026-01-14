"use client";

import { useState } from "react";
import { useUser } from "@/firebase";
import type { UserProfile } from "@/types";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { ClientForm } from "./client-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const mockClients: UserProfile[] = [
    { id: "user-1", firstName: "Juan", lastName: "Pérez", email: "juan.perez@example.com" },
    { id: "user-2", firstName: "María", lastName: "García", email: "maria.garcia@example.com" },
    { id: "user-3", firstName: "Carlos", lastName: "López", email: "carlos.lopez@example.com" },
];

export function ClientsView() {
  const { user } = useUser();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<UserProfile | null>(null);
  const [clients, setClients] = useState<UserProfile[]>(mockClients);
  const { toast } = useToast();

  const handleAddNew = () => {
    setSelectedClient(null);
    setIsFormOpen(true);
  };

  const handleEdit = (client: UserProfile) => {
    setSelectedClient(client);
    setIsFormOpen(true);
  };

  const handleDelete = async (clientId: string) => {
    setClients(prev => prev.filter(c => c.id !== clientId));
    toast({
        title: "Cliente Eliminado (Demo)",
        description: "El cliente ha sido eliminado de la lista de demostración.",
    });
  };
  
  if (!user) {
    return (
      <Card className="text-center py-20">
        <CardContent>
          <h2 className="text-2xl font-semibold mb-4">Acceso Denegado</h2>
          <p className="text-muted-foreground mb-6">
            Debes iniciar sesión para administrar los clientes.
          </p>
          <Button asChild>
            <a href="/login">Iniciar Sesión</a>
          </Button>
        </CardContent>
      </Card>
    );
  }


  return (
    <div>
       <ClientForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          client={selectedClient}
        />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Lista de Clientes</CardTitle>
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Agregar Cliente
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Apellido</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients && clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.firstName}</TableCell>
                  <TableCell>{client.lastName}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(client)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                         <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. Esto eliminará permanentemente al cliente de la base de datos (en esta demo).
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(client.id)}>Eliminar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                  </TableCell>
                </TableRow>
              ))}
               {!clients || clients.length === 0 && (
                <TableRow>
                    <TableCell colSpan={4} className="text-center h-24">No hay clientes para mostrar.</TableCell>
                </TableRow>
               )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
