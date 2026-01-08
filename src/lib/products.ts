
import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'prod_001',
    name: 'Refrigerador FrostFree 400L',
    slug: 'refrigerador-frostfree-400l',
    description: 'Refrigerador moderno de acero inoxidable con dispensador de agua y tecnología FrostFree para evitar la acumulación de hielo.',
    price: 2499.99,
    originalPrice: 2999.99,
    installments: 9,
    hasFreeShipping: true,
    carrefourCredit: '9 CSI MI CARREFOUR CRÉDITO',
    imageUrl: 'https://images.unsplash.com/photo-1643356472833-5b1f2cd4ca3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxyZWZyaWdlcmF0b3IlMjBraXRjaGVufGVufDB8fHx8MTc2NzgxMDU4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'refrigerator kitchen',
    category: 'large',
    specifications: {
      'Capacidad': '400 Litros',
      'Eficiencia Energética': 'A++',
      'Dimensiones (AlxAnxPr)': '185cm x 60cm x 65cm',
      'Tipo': 'Dos puertas',
      'Color': 'Acero Inoxidable',
    },
    warrantyOptions: [
        { months: 12, price: 250 },
        { months: 24, price: 450 },
    ],
    installationPrice: 150,
    stock: 15,
    stockByStore: {
      "store-1": 5,
      "store-2": 2,
      "store-3": 8,
    }
  },
  {
    id: 'prod_002',
    name: 'Lavadora Carga Frontal 8kg',
    slug: 'lavadora-carga-frontal-8kg',
    description: 'Lavadora de carga frontal con capacidad de 8kg, múltiples programas de lavado y motor inverter silencioso.',
    price: 1899.00,
    imageUrl: 'https://images.unsplash.com/photo-1668417863230-64f268d1d252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8d2FzaGluZyUyMG1hY2hpbmV8ZW58MHx8fHwxNzY3ODk4Njc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'washing machine',
    category: 'large',
    specifications: {
      'Capacidad de Lavado': '8 kg',
      'Velocidad de Centrifugado': '1400 RPM',
      'Eficiencia Energética': 'A+++',
      'Programas': '15',
      'Color': 'Blanco',
    },
    warrantyOptions: [
        { months: 12, price: 190 },
        { months: 24, price: 340 },
    ],
    installationPrice: 100,
    stock: 20,
    stockByStore: {
      "store-1": 10,
      "store-2": 5,
      "store-3": 5,
    }
  },
  {
    id: 'prod_003',
    name: 'Horno Microondas Grill 25L',
    slug: 'horno-microondas-grill-25l',
    description: 'Horno microondas de diseño elegante en color negro, con función grill y 25 litros de capacidad.',
    price: 599.50,
    imageUrl: 'https://images.unsplash.com/photo-1626143508000-4b5904e5e84a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxtaWNyb3dhdmUlMjBvdmVufGVufDB8fHx8MTc2Nzg1NDE3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'microwave oven',
    category: 'small',
    specifications: {
      'Capacidad': '25 Litros',
      'Potencia': '900W',
      'Función Grill': 'Sí, 1000W',
      'Niveles de Potencia': '5',
      'Color': 'Negro',
    },
    warrantyOptions: [
        { months: 12, price: 60 },
    ],
    stock: 50,
    stockByStore: {
      "store-1": 20,
      "store-2": 15,
      "store-3": 15,
    }
  },
  {
    id: 'prod_004',
    name: 'Smart TV 4K 65"',
    slug: 'smart-tv-4k-65',
    description: 'Televisor inteligente de 65 pulgadas con resolución 4K UHD, HDR y sistema operativo avanzado con tus apps favoritas.',
    price: 3200.00,
    originalPrice: 3500.00,
    hasFreeShipping: true,
    imageUrl: 'https://images.unsplash.com/flagged/photo-1572609239482-d3a83f976aa0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxzbWFydCUyMHR2fGVufDB8fHx8MTc2Nzg5ODY3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'smart tv',
    category: 'large',
    specifications: {
      'Tamaño de Pantalla': '65 pulgadas',
      'Resolución': '3840 x 2160 (4K UHD)',
      'Tecnología': 'LED',
      'Puertos HDMI': '3',
      'Smart OS': 'Sí',
    },
    warrantyOptions: [
        { months: 12, price: 320 },
        { months: 24, price: 580 },
    ],
    installationPrice: 200,
    stock: 0,
    stockByStore: {
      "store-1": 0,
      "store-2": 3,
      "store-3": 1,
    }
  },
  {
    id: 'prod_005',
    name: 'Cafetera de Goteo Programable',
    slug: 'cafetera-goteo-programable',
    description: 'Prepara el café perfecto cada mañana. Cafetera de goteo programable con jarra de vidrio y filtro permanente.',
    price: 250.00,
    imageUrl: 'https://images.unsplash.com/photo-1515442261605-65987783cb6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8Y29mZmVlJTIwbWFrZXJ8ZW58MHx8fHwxNzY3ODcxNzIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'coffee maker',
    category: 'small',
    specifications: {
      'Capacidad': '1.5 Litros (12 tazas)',
      'Programable': 'Sí, 24 horas',
      'Filtro': 'Permanente, lavable',
      'Función Mantener Caliente': 'Sí',
      'Color': 'Negro y Acero',
    },
    warrantyOptions: [
        { months: 12, price: 25 },
    ],
    stock: 30,
  },
  {
    id: 'prod_006',
    name: 'Licuadora de Alta Potencia',
    slug: 'licuadora-alta-potencia',
    description: 'Licuadora de alta velocidad ideal para smoothies, sopas y más. Con vaso de tritan resistente y cuchillas de acero.',
    price: 450.00,
    imageUrl: 'https://images.unsplash.com/photo-1564940735784-b15466e8dc09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxraXRjaGVuJTIwYmxlbmRlcnxlbnwwfHx8fDE3Njc3OTUyMjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'kitchen blender',
    category: 'small',
    specifications: {
      'Potencia': '1200W',
      'Capacidad del Vaso': '2 Litros',
      'Material del Vaso': 'Tritan (Libre de BPA)',
      'Velocidades': 'Variable + Pulso',
      'Color': 'Gris',
    },
    warrantyOptions: [
        { months: 12, price: 45 },
    ],
    seller: 'ElectroHogar',
    stock: 0,
    stockByStore: {
      "store-1": 1,
      "store-2": 0,
      "store-3": 4,
    }
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p) => p.slug === slug);
};
