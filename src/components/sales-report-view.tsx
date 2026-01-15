
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Download, MoveUp, MoveDown } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "./ui/label";

const formSchema = z.object({
  ean: z.string().optional(),
  assistedSaleNumber: z.string().optional(),
  docType: z.string().optional(),
  saleDateFrom: z.date().optional(),
  ticketNumber: z.string().optional(),
  seller: z.string().optional(),
  docNumber: z.string().optional(),
  saleDateTo: z.date().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const mockData = [
  {
    id: "1",
    ean: "7796962991953",
    venta: "1936015",
    nroTicket: "6478",
    dniCliente: "17663874",
    fechaVenta: "11/01/2026 11:59:31",
    estadoArticulo: "Pendiente por Despachar",
    fechaDespacho: "",
    vendedor: "marco_vidal",
  },
  {
    id: "2",
    ean: "7799111682115",
    venta: "1935562",
    nroTicket: "741",
    dniCliente: "95336869",
    fechaVenta: "10/01/2026 14:54:46",
    estadoArticulo: "Pendiente por Despachar",
    fechaDespacho: "",
    vendedor: "lucas_arguello",
  },
];

export function SalesReportView() {
  const [data, setData] = useState(mockData);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ean: "",
      assistedSaleNumber: "",
      docType: "",
      ticketNumber: "",
      seller: "",
      docNumber: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
    // Here you would filter your data based on the form values
  };

  const TableHeaderItem = ({ label, sortable = true }: { label: string, sortable?: boolean }) => (
    <TableHead className="text-blue-700">
      <div className="flex items-center">
        {label}
        {sortable && (
          <div className="flex flex-col ml-1">
            <MoveUp className="h-3 w-3" />
            <MoveDown className="h-3 w-3 -mt-1" />
          </div>
        )}
      </div>
    </TableHead>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <h1 className="text-lg text-blue-700 font-bold">Venta Asistida &gt;</h1>
        <h2 className="text-lg text-red-600 font-bold ml-1">Despachar</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="p-4 border rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <FormField control={form.control} name="ean" render={({ field }) => (
                <FormItem><FormLabel>EAN:</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
            )}/>
            <FormField control={form.control} name="ticketNumber" render={({ field }) => (
                <FormItem><FormLabel>Número de Ticket:</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
            )}/>
            <FormField control={form.control} name="assistedSaleNumber" render={({ field }) => (
                <FormItem><FormLabel>Número de Venta asistida:</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
            )}/>
            <FormField control={form.control} name="seller" render={({ field }) => (
                <FormItem><FormLabel>Vendedor:</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
            )}/>
            <FormField control={form.control} name="docType" render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo Doc.:</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Seleccione" /></SelectTrigger>
                  </FormControl>
                  <SelectContent><SelectItem value="dni">DNI</SelectItem><SelectItem value="passport">Pasaporte</SelectItem></SelectContent>
                </Select>
              </FormItem>
            )}/>
            <FormField control={form.control} name="docNumber" render={({ field }) => (
                <FormItem><FormLabel>Nro. Doc.:</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
            )}/>
            <FormField control={form.control} name="saleDateFrom" render={({ field }) => (
              <FormItem className="flex flex-col"><FormLabel>Fecha Venta Desde:</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                        {field.value ? format(field.value, "dd/MM/yyyy") : <span>Seleccionar fecha</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent>
                </Popover>
              </FormItem>
            )}/>
            <FormField control={form.control} name="saleDateTo" render={({ field }) => (
              <FormItem className="flex flex-col"><FormLabel>Fecha Venta Hasta:</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                        {field.value ? format(field.value, "dd/MM/yyyy") : <span>Seleccionar fecha</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent>
                </Popover>
              </FormItem>
            )}/>

             <Button type="submit" className="bg-blue-800 hover:bg-blue-900 col-start-4 justify-self-end">Buscar</Button>
          </div>
        </form>
      </Form>

        <div className="p-4 border rounded-md space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Label>Selección:</Label>
                        <Checkbox />
                    </div>
                     <div className="flex items-center gap-2">
                        <Label>Registros por página:</Label>
                        <Select defaultValue="15">
                            <SelectTrigger className="w-[70px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="15">15</SelectItem>
                                <SelectItem value="30">30</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                 <p className="text-sm text-muted-foreground">
                    {data.length} ítems encontrados, mostrando todos los ítems.
                </p>
            </div>
            
            <div className="border rounded-md overflow-y-auto max-h-60 relative">
                <Table>
                    <TableHeader className="sticky top-0 bg-white z-10">
                        <TableRow>
                            <TableHead><Checkbox/></TableHead>
                            <TableHeaderItem label="EAN" />
                            <TableHeaderItem label="Venta" />
                            <TableHeaderItem label="Nro ticket" />
                            <TableHeaderItem label="DNI Cliente" />
                            <TableHeaderItem label="Fecha de Venta" />
                            <TableHeaderItem label="Estado Articulo" />
                            <TableHeaderItem label="Fecha de Despacho" />
                            <TableHeaderItem label="Vendedor" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id} className="bg-blue-50 odd:bg-white hover:bg-blue-100">
                                <TableCell><Checkbox /></TableCell>
                                <TableCell>{item.ean}</TableCell>
                                <TableCell>{item.venta}</TableCell>
                                <TableCell>{item.nroTicket}</TableCell>
                                <TableCell>{item.dniCliente}</TableCell>
                                <TableCell>{item.fechaVenta}</TableCell>
                                <TableCell>{item.estadoArticulo}</TableCell>
                                <TableCell>{item.fechaDespacho}</TableCell>
                                <TableCell>{item.vendedor}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
             <div className="flex items-center gap-2">
                <Label>Exportación de datos:</Label>
                <Button variant="ghost" size="icon">
                    <Download className="h-6 w-6 text-blue-800" />
                </Button>
            </div>
        </div>
        
        <div className="flex justify-center gap-4">
            <Button className="bg-blue-800 hover:bg-blue-900 px-8 py-6 text-lg">Despachar</Button>
            <Button className="bg-blue-800 hover:bg-blue-900 px-8 py-6 text-lg">No Despachado</Button>
        </div>
    </div>
  );
}

    