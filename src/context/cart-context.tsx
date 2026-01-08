"use client";

import { createContext, useContext, useState, ReactNode, useMemo, useEffect } from "react";
import type { Product, WarrantyOption, ShippingOption } from "@/types";

export interface CartItem {
  product: Product;
  quantity: number;
  warranty: WarrantyOption | null;
  installation: boolean;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number, warranty?: WarrantyOption | null) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateWarranty: (productId: string, warranty: WarrantyOption | null) => void;
  toggleInstallation: (productId: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  warrantyTotal: number;
  installationTotal: number;
  shippingOption: ShippingOption | null;
  setShippingOption: (option: ShippingOption | null) => void;
  shippingTotal: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shippingOption, setShippingOption] = useState<ShippingOption | null>(null);


  useEffect(() => {
    // In a real app, you might load the cart from localStorage
  }, []);

  const addToCart = (product: Product, quantity = 1, warranty: WarrantyOption | null = null) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity, warranty, installation: false }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  const updateWarranty = (productId: string, warranty: WarrantyOption | null) => {
    setCartItems(prevItems => 
        prevItems.map(item => 
            item.product.id === productId ? { ...item, warranty } : item
        )
    );
  };

  const toggleInstallation = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId && item.product.installationPrice ? { ...item, installation: !item.installation } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setShippingOption(null);
  };

  const itemCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const warrantyTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (item.warranty ? item.warranty.price * item.quantity : 0), 0);
  }, [cartItems]);

  const installationTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (item.installation && item.product.installationPrice ? item.product.installationPrice * item.quantity : 0), 0);
  }, [cartItems]);

  const shippingTotal = useMemo(() => {
    return shippingOption?.price ?? 0;
  }, [shippingOption]);

  const total = useMemo(() => {
    return subtotal + warrantyTotal + installationTotal + shippingTotal;
  }, [subtotal, warrantyTotal, installationTotal, shippingTotal]);
  

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateWarranty,
    toggleInstallation,
    clearCart,
    itemCount,
    subtotal,
    warrantyTotal,
    installationTotal,
    shippingOption,
    setShippingOption,
    shippingTotal,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
