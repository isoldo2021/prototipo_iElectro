"use client";

import { useComparison } from "@/context/comparison-context";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { X, Layers } from "lucide-react";

export function ComparisonBar() {
  const { comparisonItems, toggleFromComparison, clearComparison } = useComparison();

  if (comparisonItems.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="container mx-auto shadow-2xl animate-in fade-in-0 slide-in-from-bottom-10 duration-500">
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-headline font-semibold hidden md:block">Comparar Productos</h3>
            <div className="flex items-center gap-2">
              {comparisonItems.map((item) => (
                <div key={item.id} className="relative">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-md object-cover"
                    data-ai-hint={item.imageHint}
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full"
                    onClick={() => toggleFromComparison(item.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              {Array.from({ length: 4 - comparisonItems.length }).map((_, i) => (
                <div key={i} className="h-12 w-12 rounded-md border-2 border-dashed bg-muted hidden sm:block" />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href="/compare">
                <Layers className="mr-2 h-4 w-4" />
                Comparar ({comparisonItems.length})
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={clearComparison}>
              Limpiar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
