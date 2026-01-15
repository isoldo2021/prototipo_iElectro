
"use client";

import { useState, useMemo } from 'react';
import { ProductCatalog } from '@/components/product-catalog';
import { products } from '@/lib/products';
import type { Product } from '@/types';
import { ProductFilters } from '@/components/product-filters';
import { Button } from '@/components/ui/button';
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export interface Filters {
  category?: string;
  subCategory?: string[];
  brands?: string[];
  colors?: string[];
  priceRange?: number[];
}

export default function Home() {
  const [filters, setFilters] = useState<Filters>({});

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
  }
  
  const handleCategorySelect = (category: string) => {
    setFilters({ category });
  }
  
  const handleClearFilters = () => {
    setFilters({});
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
            <ProductFilters 
                onApplyFilters={handleApplyFilters}
                onCategorySelect={handleCategorySelect}
            />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <SidebarTrigger variant="outline" className="md:hidden">
                    Filtros y Categorías
                </SidebarTrigger>
                 {(filters.category || (filters.brands && filters.brands.length > 0) || (filters.colors && filters.colors.length > 0) || filters.priceRange) && (
                    <Button variant="ghost" onClick={handleClearFilters}>
                        Limpiar filtros
                    </Button>
                )}
            </div>
            <ProductCatalog allProducts={filteredProducts} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
