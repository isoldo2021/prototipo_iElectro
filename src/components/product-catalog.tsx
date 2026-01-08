"use client";

import { useState, useMemo } from 'react';
import type { Product } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ListFilter } from 'lucide-react';
import { ProductGrid } from './product-grid';

type SortOption = 'relevance' | 'newest' | 'discount' | 'price-desc' | 'price-asc' | 'name-asc' | 'name-desc';

interface ProductCatalogProps {
  allProducts: Product[];
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'relevance', label: 'Relevancia' },
  { value: 'newest', label: 'Más reciente' },
  { value: 'discount', label: 'Con descuento' },
  { value: 'price-desc', label: 'Precio más alto' },
  { value: 'price-asc', label: 'Precio más bajo' },
  { value: 'name-asc', label: 'A-Z' },
  { value: 'name-desc', label: 'Z-A' },
];

export function ProductCatalog({ allProducts }: ProductCatalogProps) {
  const [sort, setSort] = useState<SortOption>('relevance');

  const sortedProducts = useMemo(() => {
    const productsCopy = [...allProducts];
    switch (sort) {
      case 'newest':
        // Assuming products are already somewhat sorted by date or we can use ID as a proxy
        return productsCopy.reverse();
      case 'discount':
        return productsCopy.sort((a, b) => {
          const discountA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
          const discountB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
          return discountB - discountA;
        });
      case 'price-desc':
        return productsCopy.sort((a, b) => b.price - a.price);
      case 'price-asc':
        return productsCopy.sort((a, b) => a.price - b.price);
      case 'name-asc':
        return productsCopy.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return productsCopy.sort((a, b) => b.name.localeCompare(a.name));
      case 'relevance':
      default:
        // Simple relevance: stock > hasFreeShipping
        return productsCopy.sort((a, b) => {
            const scoreA = (a.stock > 0 ? 10 : 0) + (a.hasFreeShipping ? 5 : 0);
            const scoreB = (b.stock > 0 ? 10 : 0) + (b.hasFreeShipping ? 5 : 0);
            return scoreB - scoreA;
        });
    }
  }, [sort, allProducts]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold font-headline">Nuestro Catálogo</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <ListFilter className="mr-2 h-4 w-4" />
              Ordenar por: {sortOptions.find(o => o.value === sort)?.label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup value={sort} onValueChange={(value) => setSort(value as SortOption)}>
              {sortOptions.map((option) => (
                <DropdownMenuRadioItem key={option.value} value={option.value}>
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ProductGrid products={sortedProducts} />
    </div>
  );
}
