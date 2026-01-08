export type WarrantyOption = {
  months: number;
  price: number;
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
