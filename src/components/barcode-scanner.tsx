"use client";

import { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { useToast } from '@/hooks/use-toast';
import { products } from '@/lib/products';
import { useCart } from '@/context/cart-context';

interface BarcodeScannerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const qrcodeRegionId = "qr-code-reader";

export function BarcodeScanner({ open, onOpenChange }: BarcodeScannerProps) {
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | undefined>(undefined);
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);
    const { toast } = useToast();
    const { addToCart } = useCart();
    const lastScannedRef = useRef<string | null>(null);

    useEffect(() => {
        if (!open) {
            if (scannerRef.current) {
                scannerRef.current.clear().catch(error => {
                    console.error("Failed to clear html5-qrcode-scanner.", error);
                });
                scannerRef.current = null;
            }
            return;
        }

        const checkPermissionAndStartScanner = async () => {
            try {
                const devices = await Html5Qrcode.getCameras();
                if (devices && devices.length) {
                    setHasCameraPermission(true);
                    
                    // Creates a new instance of the scanner on every open
                    const scanner = new Html5QrcodeScanner(
                        qrcodeRegionId,
                        {
                            fps: 10,
                            qrbox: { width: 250, height: 150 },
                            rememberLastUsedCamera: true,
                        },
                        false // verbose
                    );

                    const onScanSuccess = (decodedText: string) => {
                        if (decodedText !== lastScannedRef.current) {
                            lastScannedRef.current = decodedText;
                            const product = products.find(p => p.id === decodedText);

                            if (product) {
                                addToCart(product);
                                toast({
                                    title: "Producto Agregado",
                                    description: `${product.name} fue agregado al carrito.`,
                                });
                            } else {
                                toast({
                                    variant: "destructive",
                                    title: "Producto no encontrado",
                                    description: `No se encontró ningún producto con el código: ${decodedText}`,
                                });
                            }
                            onOpenChange(false);
                        }
                    };

                    const onScanFailure = (error: any) => {
                        // console.warn(`Code scan error = ${error}`);
                    };

                    scanner.render(onScanSuccess, onScanFailure);
                    scannerRef.current = scanner;
                } else {
                    setHasCameraPermission(false);
                }
            } catch (err) {
                console.error(err);
                setHasCameraPermission(false);
            }
        };

        checkPermissionAndStartScanner();

        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear().catch(error => {
                    console.error("Failed to clear html5-qrcode-scanner on cleanup.", error);
                });
                scannerRef.current = null;
            }
        };
    }, [open, addToCart, onOpenChange, toast]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Escanear Producto</DialogTitle>
                    <DialogDescription>
                        Apunta la cámara al código de barras del producto para agregarlo al carrito.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    {hasCameraPermission === undefined && <p>Solicitando permiso de cámara...</p>}
                    
                    {hasCameraPermission === false && (
                         <Alert variant="destructive">
                            <AlertTitle>Acceso a la Cámara Denegado</AlertTitle>
                            <AlertDescription>
                                Por favor, habilita el permiso de la cámara en tu navegador para escanear productos.
                            </AlertDescription>
                        </Alert>
                    )}

                    {hasCameraPermission && (
                         <div id={qrcodeRegionId} className='w-full aspect-video rounded-md overflow-hidden border' />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
