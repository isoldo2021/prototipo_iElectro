"use client";

import { ShoppingCart, ScanLine } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { Logo } from '@/components/logo';
import { SidebarTrigger } from './ui/sidebar';
import { UserAuth } from './user-auth';
import { BarcodeScanner } from './barcode-scanner';
import { useState } from 'react';

export function SiteHeader() {
  const { itemCount } = useCart();
  const [isScannerOpen, setScannerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container mx-auto flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex items-center gap-2">
              <SidebarTrigger />
              <Logo />
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={() => setScannerOpen(true)}>
                  <ScanLine className="h-5 w-5" />
                  <span className="sr-only">Escanear Producto</span>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/cart">
                  <div className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {itemCount}
                      </span>
                    )}
                  </div>
                  <span className="sr-only">Shopping Cart</span>
                </Link>
              </Button>
              <UserAuth />
            </nav>
          </div>
        </div>
      </header>
      <BarcodeScanner open={isScannerOpen} onOpenChange={setScannerOpen} />
    </>
  );
}
