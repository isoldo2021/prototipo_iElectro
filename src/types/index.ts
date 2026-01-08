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
