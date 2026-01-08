
"use client";

import { ShoppingCart, Heart, User, Clock, Search, Menu, Mic, Tag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { Logo } from '@/components/logo';
import { SidebarTrigger } from './ui/sidebar';
import { UserAuth } from './user-auth';
import { Input } from './ui/input';

export function SiteHeader() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container mx-auto flex h-20 items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Logo />
          <Button variant="outline" className="hidden md:flex items-center gap-2">
            <Menu className="h-5 w-5" />
            <span className="font-semibold">Categorías</span>
          </Button>
          <SidebarTrigger className="md:hidden"/>
        </div>

        <div className="flex-1 max-w-xl hidden md:flex">
          <div className="relative w-full">
            <Input
              type="search"
              placeholder="Buscá de todo en Carrefour"
              className="h-11 w-full rounded-full pl-5 pr-20"
            />
            <div className='absolute inset-y-0 right-0 flex items-center pr-1.5'>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                    <Mic className="h-5 w-5 text-muted-foreground" />
                </Button>
                <Button type="submit" size="icon" className="rounded-full h-9 w-9 bg-blue-600 hover:bg-blue-700">
                    <Search className="h-5 w-5 text-white" />
                </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
            <Button variant="ghost" className="hidden md:flex flex-col items-center h-auto px-2 py-1">
                <Clock className="h-6 w-6"/>
                <span className="text-xs">Entrega inmediata</span>
            </Button>
            <Button variant="ghost" asChild className="hidden md:flex flex-col items-center h-auto px-2 py-1">
                <Link href="/offers">
                    <Tag className="h-6 w-6"/>
                    <span className="text-xs">Ofertas</span>
                </Link>
            </Button>
            <Button variant="ghost" className="hidden md:flex flex-col items-center h-auto px-2 py-1">
                <Heart className="h-6 w-6"/>
                <span className="text-xs">Favoritos</span>
            </Button>
             <div className="hidden md:block">
                <UserAuth />
             </div>
             <div className="h-8 border-l mx-2 hidden md:block"></div>
             <Button variant="outline" className="relative rounded-full h-12 w-24 flex items-center gap-2">
                <ShoppingCart className="h-6 w-6" />
                <span className="font-semibold">Carrito</span>
                 {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {itemCount}
                    </span>
                 )}
            </Button>
        </div>
      </div>
    </header>
  );
}
