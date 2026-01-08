
export type WarrantyOption = {
  months: number;
  price: number;
};

export type ShippingOption = {
  id: 'immediate' | 'home' | 'store';
  label: string;
  price: number;
  description: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  imageHint: string;
  category: 'small' | 'large';
  specifications: {
    [key: string]: string;
  };
  warrantyOptions: WarrantyOption[];
  installationPrice?: number;
};

export type Order = {
    id: string;
    userId: string;
    items: {
        product: Product;
        quantity: number;
        warranty: WarrantyOption | null;
        installation: boolean;
    }[];
    orderDate: string; 
    status: 'Procesando' | 'Enviado' | 'Entregado' | 'Cancelado' | 'Devuelto';
    shipping: ShippingOption;
    total: number;
    dni?: string;
    store?: string;
    paymentMethod: string;
};
