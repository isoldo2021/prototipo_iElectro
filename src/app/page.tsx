
"use client";

import { useState, useMemo } from 'react';
import { ProductCatalog } from '@/components/product-catalog';
import { products } from '@/lib/products';
import type { Product } from '@/types';
import { ProductFilters } from '@/components/product-filters';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button';
import { PanelLeft } from 'lucide-react';


export interface Filters {
  category?: string;
  subCategory?: string[];
  brands?: string[];
  colors?: string[];
  priceRange?: number[];
}

export default function Home() {
  const [filters, setFilters] = useState<Filters>({});
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const filteredProducts: Product[] = useMemo(() => {
    let filtered = [...products];

    if (filters.category) {
      filtered = filtered.filter(p => p.categoryName === filters.category);
    }
    
    if(filters.subCategory && filters.subCategory.length > 0) {
        filtered = filtered.filter(p => p.specifications['Sub-Categoría'] && filters.subCategory?.includes(p.specifications['Sub-Categoría']));
    }

    if (filters.brands && filters.brands.length > 0) {
        filtered = filtered.filter(p => p.specifications['Marca'] && filters.brands?.includes(p.specifications['Marca']));
    }
    
    if (filters.colors && filters.colors.length > 0) {
        filtered = filtered.filter(p => p.specifications['Color'] && filters.colors?.includes(p.specifications['Color']));
    }

    if (filters.priceRange) {
        filtered = filtered.filter(p => p.price >= filters.priceRange![0] && p.price <= filters.priceRange![1]);
    }


    return filtered;
  }, [filters]);
  
  const handleApplyFilters = (newFilters: Filters) => {
    setFilters(prevFilters => ({...prevFilters, ...newFilters}));
    setIsSheetOpen(false);
  }
  
  const handleCategorySelect = (category: string) => {
    setFilters({ category });
    setIsSheetOpen(false);
  }
  
  const handleClearFilters = () => {
    setFilters({});
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-[280px_1fr] gap-8 items-start">
        <div className="hidden md:block">
            <ProductFilters 
                onApplyFilters={handleApplyFilters}
                onCategorySelect={handleCategorySelect}
            />
        </div>
        <div>
            <div className="flex justify-between items-center mb-4">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="md:hidden">
                            <PanelLeft className="mr-2 h-4 w-4" />
                            Filtros y Categorías
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-[320px]">
                        <ProductFilters 
                             onApplyFilters={handleApplyFilters}
                             onCategorySelect={handleCategorySelect}
                        />
                    </SheetContent>
                </Sheet>
                 {(filters.category || filters.brands || filters.colors || filters.priceRange) && (
                    <Button variant="ghost" onClick={handleClearFilters}>
                        Limpiar filtros
                    </Button>
                )}
            </div>
            <ProductCatalog allProducts={filteredProducts} />
        </div>
      </div>
    </div>
  );
}
