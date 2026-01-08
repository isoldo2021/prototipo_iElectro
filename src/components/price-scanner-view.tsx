"use client";

import { useState } from "react";
import type { Product } from "@/types";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import { useToast } from "@/hooks/use-toast";
import { products } from "@/lib/products";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MapPin, Search } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Step = "store-selection" | "scanning" | "result" | "not-found";

interface Store {
  id: string;
  name: string;
  address: string;
}

const stores: Store[] = [
    { id: "store-1", name: "Carrefour Express", address: "Amenabar 1187, Belgrano, Ciudad Autónoma de Buenos Aires" },
    { id: "store-2", name: "Carrefour Market", address: "Av. Corrientes 3450, Almagro, CABA" },
    { id: "store-3", name: "Carrefour Hipermercado", address: "Av. Rivadavia 7845, Flores, CABA" },
]

export function PriceScannerView() {
  const [step, setStep] = useState<Step>("store-selection");
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
  const [scannedEan, setScannedEan] = useState<string | null>(null);
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const handleStoreSelect = (store: Store) => {
    setSelectedStore(store);
    setStep("scanning");
  };

  const onScanSuccess = (decodedText: string) => {
    const product = products.find(p => p.id === decodedText);
    setScannedEan(decodedText);
    scanner?.clear();

    if (product) {
      setScannedProduct(product);
      setStep("result");
    } else {
      setScannedProduct(null);
      setStep("not-found");
    }
  };
  
  const startScanner = async () => {
    try {
        const devices = await Html5Qrcode.getCameras();
        if (devices && devices.length) {
            const qrScanner = new Html5QrcodeScanner(
                "price-scanner-region",
                { fps: 10, qrbox: { width: 250, height: 150 } },
                false
            );
            qrScanner.render(onScanSuccess, () => {});
            setScanner(qrScanner);
        } else {
             toast({
                variant: "destructive",
                title: "Error de cámara",
                description: "No se encontraron cámaras en este dispositivo.",
            });
        }
    } catch (err) {
        toast({
            variant: "destructive",
            title: "Error de cámara",
            description: "No se pudo acceder a la cámara. Por favor, verifica los permisos.",
        });
    }
  };

  const handleScanAgain = () => {
    setScannedProduct(null);
    setScannedEan(null);
    setStep("scanning");
  }

  const handleFinalize = () => {
      router.push('/');
  }
  
  const handleRetry = () => {
    setStep('scanning');
  }

  const handleChangeStore = () => {
      setStep('store-selection');
      setSelectedStore(null);
      setScannedProduct(null);
      setScannedEan(null);
  }

  if (step === "store-selection") {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Escaneá un precio</CardTitle>
          <p className="text-muted-foreground">Elegí una sucursal</p>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Ingresá la dirección de un..." className="pl-10" />
            </div>
            <Button variant="ghost" className="w-full justify-start text-primary">
                <MapPin className="mr-2 h-5 w-5" />
                Buscar por provincia y localidad
            </Button>
             <Button variant="ghost" className="w-full justify-start text-primary">
                <MapPin className="mr-2 h-5 w-5" />
                Buscar sucursales cerca de mí
            </Button>
            <div className="space-y-2">
                <p className="font-semibold">Sucursales encontradas:</p>
                {stores.map(store => (
                     <button key={store.id} onClick={() => handleStoreSelect(store)} className="block w-full text-left p-2 rounded-md hover:bg-muted">
                        <p className="font-bold">{store.name}</p>
                        <p className="text-sm text-muted-foreground">{store.address}</p>
                    </button>
                ))}
            </div>
        </CardContent>
      </Card>
    );
  }

  if (step === "scanning") {
    return (
      <Dialog open={true} onOpenChange={() => {
          scanner?.clear();
          setStep('store-selection');
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Escaneá un precio</DialogTitle>
            <DialogDescription>
              Apuntá la cámara al código de barras del producto.
            </DialogDescription>
          </DialogHeader>
          <div id="price-scanner-region" className="w-full aspect-video rounded-md overflow-hidden border"></div>
          <p className="text-center text-sm text-muted-foreground">Escaneando para: <span className="font-bold">{selectedStore?.name}</span></p>
          <Button onClick={startScanner} className="w-full">Iniciar Escáner</Button>
        </DialogContent>
      </Dialog>
    );
  }

  if (step === "result" && scannedProduct) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Escaneá un precio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <p className="font-bold text-lg">{scannedProduct.name}</p>
            <div className="flex justify-between items-center text-sm bg-muted p-2 rounded-md">
                <span className="text-muted-foreground">EAN</span>
                <span>{scannedEan}</span>
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Precio normal</p>
                <p className="text-4xl font-bold text-primary">${scannedProduct.price.toFixed(2)}</p>
            </div>
            <Card className="bg-muted/50">
                <CardHeader className="p-4">
                    <p className="text-xs text-muted-foreground">Válido para esta sucursal</p>
                    <p className="font-semibold">{selectedStore?.name}</p>
                    <p className="text-sm">{selectedStore?.address}</p>
                </CardHeader>
                <CardFooter className="p-4 pt-0">
                    <Button variant="link" className="p-0 h-auto" onClick={handleChangeStore}>Cambiar de sucursal</Button>
                </CardFooter>
            </Card>
        </CardContent>
        <CardFooter className="flex-col space-y-2">
          <Button className="w-full" onClick={handleScanAgain}>Escanear otro producto</Button>
          <Button variant="ghost" className="w-full" onClick={handleFinalize}>Finalizar</Button>
        </CardFooter>
      </Card>
    );
  }

  if (step === "not-found") {
      return (
          <Card className="max-w-md mx-auto text-center">
              <CardHeader>
                  <CardTitle>Escaneá un precio</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center space-y-4">
                  <Image src="/magnifying-glass-error.svg" alt="No encontrado" width={100} height={100} />
                  <p className="text-xl font-bold">¡Ups! no encontramos el precio en la tienda que seleccionaste.</p>
                  <p className="text-muted-foreground">Volvé a intentarlo nuevamente</p>
              </CardContent>
              <CardFooter className="flex-col space-y-2">
                  <Button className="w-full" onClick={handleRetry}>Reintentar</Button>
                  <Button variant="ghost" className="w-full" onClick={handleFinalize}>Finalizar</Button>
              </CardFooter>
          </Card>
      );
  }

  return null;
}
