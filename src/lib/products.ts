
import type { Product } from '@/types';

export const products: Product[] = [
    {
    "id": "heladera-samsung-rt38k5",
    "name": "Heladera con freezer Samsung RT38K5 no frost plata con 382L de capacidad 220V",
    "slug": "heladera-samsung-rt38k5",
    "description": "Frescura y practicidad en tu cocina. La tecnología de refrigeración No Frost evita la formación de hielo y escarcha, manteniendo tus alimentos en perfectas condiciones por más tiempo. Su diseño elegante en color plata se adapta a cualquier estilo.",
    "price": 499999,
    "originalPrice": 549999,
    "installments": 12,
    "hasFreeShipping": true,
    "carrefourCredit": "10% de descuento con Tarjeta Carrefour",
    "imageUrls": [
      "https://picsum.photos/seed/heladera1/600/600",
      "https://picsum.photos/seed/heladera2/600/600",
      "https://picsum.photos/seed/heladera3/600/600"
    ],
    "imageHint": "heladera moderna",
    "category": "large",
    "specifications": {
      "Capacidad total": "382 L",
      "Tipo de deshielo": "No Frost",
      "Eficiencia energética": "A+",
      "Dimensiones": "178.5 cm x 67.5 cm x 66.8 cm"
    },
    "warrantyOptions": [
      { "months": 12, "price": 25000 },
      { "months": 24, "price": 45000 }
    ],
    "installationPrice": 15000,
    "seller": "Samsung Oficial",
    "stock": 15,
    "stockByStore": { "store-1": 5, "store-2": 3 }
  },
  {
    "id": "lavarropas-drean-next-8-14",
    "name": "Lavarropas automático Drean Next 8.14 blanco con capacidad de 8kg 220 V",
    "slug": "lavarropas-drean-next-8-14",
    "description": "El Lavarropas Drean Next 8.14 es la solución ideal para tu hogar. Con capacidad de 8kg y 1400 rpm de centrifugado, tu ropa saldrá casi seca. Cuenta con 34 programas de lavado para adaptarse a cada tipo de tejido y necesidad.",
    "price": 389999,
    "originalPrice": 420000,
    "installments": 6,
    "hasFreeShipping": true,
    "imageUrls": [
      "https://picsum.photos/seed/lavarropas1/600/600",
      "https://picsum.photos/seed/lavarropas2/600/600"
    ],
    "imageHint": "lavarropas blanco",
    "category": "large",
    "specifications": {
      "Capacidad de lavado": "8 kg",
      "Velocidad de centrifugado": "1400 rpm",
      "Eficiencia energética": "A++",
      "Programas de lavado": "34"
    },
    "warrantyOptions": [
      { "months": 12, "price": 20000 }
    ],
    "installationPrice": 12000,
    "seller": "Drean",
    "stock": 20,
    "stockByStore": { "store-2": 8, "store-3": 4 }
  },
  {
    "id": "smart-tv-lg-55-uq7500",
    "name": "Smart TV LG 55” 4K UHD ThinQ AI UQ7500",
    "slug": "smart-tv-lg-55-uq7500",
    "description": "Viví una experiencia cinematográfica en casa con el Smart TV LG de 55 pulgadas. Su resolución 4K UHD y el procesador α5 Gen 5 AI mejoran la calidad de imagen y sonido. Accedé a tus apps favoritas con webOS 22.",
    "price": 349999,
    "hasFreeShipping": false,
    "carrefourCredit": "15% de descuento con Tarjeta Carrefour",
    "imageUrls": [
      "https://picsum.photos/seed/tv1/600/600",
      "https://picsum.photos/seed/tv2/600/600"
    ],
    "imageHint": "smart tv",
    "category": "large",
    "specifications": {
      "Tamaño de pantalla": "55 pulgadas",
      "Resolución": "4K UHD (3840 x 2160)",
      "Sistema operativo": "webOS 22",
      "Puertos HDMI": "3"
    },
    "warrantyOptions": [
      { "months": 12, "price": 18000 },
      { "months": 24, "price": 32000 }
    ],
    "stock": 30,
    "stockByStore": { "store-1": 10, "store-3": 7 }
  },
  {
    "id": "celular-samsung-galaxy-a54",
    "name": "Celular Samsung Galaxy A54 5G 128GB",
    "slug": "celular-samsung-galaxy-a54",
    "description": "Descubrí el asombroso Galaxy A54 5G. Su pantalla Super AMOLED de 120Hz te ofrece una visualización increíble, y su cámara de 50MP captura fotos y videos con una calidad impresionante. Batería que dura hasta dos días.",
    "price": 299999,
    "originalPrice": 329999,
    "installments": 12,
    "hasFreeShipping": true,
    "imageUrls": [
      "https://picsum.photos/seed/celular1/600/600",
      "https://picsum.photos/seed/celular2/600/600"
    ],
    "imageHint": "smartphone",
    "category": "small",
    "specifications": {
      "Pantalla": "6.4 pulgadas Super AMOLED",
      "Almacenamiento": "128 GB",
      "Cámara principal": "50 MP",
      "Batería": "5000 mAh"
    },
    "warrantyOptions": [
      { "months": 6, "price": 15000 }
    ],
    "stock": 50,
    "stockByStore": { "store-1": 15, "store-2": 20, "store-3": 15 }
  },
  {
    "id": "cocina-escorial-candor",
    "name": "Cocina a gas Escorial Candor S2 50cm",
    "slug": "cocina-escorial-candor",
    "description": "Renová tu cocina con el modelo Candor de Escorial. Cuenta con 4 hornallas de alta eficiencia, horno con puerta de doble vidrio y encendido electrónico para mayor comodidad y seguridad.",
    "price": 189999,
    "hasFreeShipping": false,
    "imageUrls": [
      "https://picsum.photos/seed/cocina1/600/600"
    ],
    "imageHint": "cocina gas",
    "category": "large",
    "specifications": {
      "Tipo": "A gas",
      "Cantidad de hornallas": "4",
      "Ancho": "50 cm",
      "Eficiencia energética": "A"
    },
    "warrantyOptions": [
      { "months": 12, "price": 10000 }
    ],
    "installationPrice": 18000,
    "stock": 18,
    "stockByStore": { "store-3": 10 }
  },
  {
    "id": "aire-acondicionado-bgh",
    "name": "Aire acondicionado BGH Silent Air split frío/calor 3000 frigorías",
    "slug": "aire-acondicionado-bgh",
    "description": "Mantené el clima ideal todo el año con el aire acondicionado BGH Silent Air. Su tecnología Inverter ajusta la potencia para ahorrar energía y su funcionamiento es ultra silencioso. Controlalo desde tu celular con la app.",
    "price": 599999,
    "installments": 18,
    "hasFreeShipping": true,
    "imageUrls": [
      "https://picsum.photos/seed/aire1/600/600"
    ],
    "imageHint": "aire acondicionado",
    "category": "large",
    "specifications": {
      "Frigorías": "3000",
      "Tecnología": "Inverter",
      "Tipo de climatización": "Frío/Calor",
      "Eficiencia energética": "A++"
    },
    "warrantyOptions": [
      { "months": 24, "price": 50000 },
      { "months": 36, "price": 80000 }
    ],
    "installationPrice": 35000,
    "seller": "BGH",
    "stock": 12,
    "stockByStore": { "store-1": 4 }
  },
    {
    "id": "auriculares-sony-wh1000xm5",
    "name": "Auriculares Inalámbricos Sony WH-1000XM5 con Noise Cancelling",
    "slug": "auriculares-sony-wh1000xm5",
    "description": "Sumérgete en tu música con la cancelación de ruido líder en la industria. Los WH-1000XM5 ofrecen una calidad de sonido excepcional, un diseño ligero y una autonomía de hasta 30 horas.",
    "price": 349990,
    "originalPrice": 399990,
    "hasFreeShipping": true,
    "installments": 6,
    "imageUrls": ["https://picsum.photos/seed/audio1/600/600"],
    "imageHint": "auriculares inalámbricos",
    "category": "small",
    "specifications": {
      "Tipo": "Over-ear",
      "Conectividad": "Bluetooth 5.2",
      "Cancelación de ruido": "Sí, activa",
      "Autonomía": "30 horas"
    },
    "warrantyOptions": [{ "months": 6, "price": 15000 }],
    "stock": 40,
    "stockByStore": { "store-1": 10, "store-2": 15 }
  },
  {
    "id": "notebook-lenovo-ideapad-3",
    "name": "Notebook Lenovo IdeaPad 3 15.6” Ryzen 5 8GB RAM 256GB SSD",
    "slug": "notebook-lenovo-ideapad-3",
    "description": "Ideal para trabajo y estudio, la IdeaPad 3 combina un rendimiento potente con un diseño delgado y ligero. Su procesador AMD Ryzen 5 y el almacenamiento SSD garantizan velocidad y eficiencia en todas tus tareas.",
    "price": 479999,
    "hasFreeShipping": true,
    "installments": 12,
    "imageUrls": ["https://picsum.photos/seed/notebook1/600/600"],
    "imageHint": "notebook lenovo",
    "category": "small",
    "specifications": {
      "Procesador": "AMD Ryzen 5",
      "Memoria RAM": "8 GB",
      "Almacenamiento": "256 GB SSD",
      "Pantalla": "15.6 pulgadas Full HD"
    },
    "warrantyOptions": [{ "months": 12, "price": 25000 }],
    "stock": 25,
    "stockByStore": { "store-2": 10, "store-3": 5 }
  },
  {
    "id": "cafetera-nespresso-essenza-mini",
    "name": "Cafetera Nespresso Essenza Mini",
    "slug": "cafetera-nespresso-essenza-mini",
    "description": "Disfruta de un café perfecto en segundos con la cafetera más compacta de Nespresso. Su diseño minimalista se adapta a cualquier espacio y su sistema de alta presión de 19 bares garantiza un espresso de calidad barista.",
    "price": 149999,
    "originalPrice": 169999,
    "hasFreeShipping": false,
    "imageUrls": ["https://picsum.photos/seed/cafetera1/600/600"],
    "imageHint": "cafetera pequeña",
    "category": "small",
    "specifications": {
      "Marca": "Nespresso",
      "Presión": "19 bares",
      "Capacidad del tanque": "0.6 L",
      "Apagado automático": "Sí"
    },
    "warrantyOptions": [],
    "stock": 100,
    "stockByStore": { "store-1": 30, "store-2": 40, "store-3": 30 }
  },
  {
    "id": "afeitadora-philips-s1121",
    "name": "Afeitadora Eléctrica Philips Shaver Series 1000 S1121",
    "slug": "afeitadora-philips-s1121",
    "description": "Logra una afeitada suave y al ras con las cuchillas ComfortCut. Sus cabezales flexibles se adaptan a las curvas de tu rostro. Uso con cable para una potencia constante.",
    "price": 59999,
    "hasFreeShipping": false,
    "imageUrls": ["https://picsum.photos/seed/afeitadora1/600/600"],
    "imageHint": "afeitadora eléctrica",
    "category": "small",
    "specifications": {
      "Marca": "Philips",
      "Sistema de afeitado": "Cuchillas ComfortCut",
      "Uso": "Con cable",
      "Limpieza": "Lavable"
    },
    "warrantyOptions": [],
    "stock": 80,
    "stockByStore": { "store-1": 20, "store-2": 30 }
  },
  {
    "id": "termotanque-rheem-80l",
    "name": "Termotanque a gas Rheem 80L de pie",
    "slug": "termotanque-rheem-80l",
    "description": "Agua caliente sin interrupciones para toda tu familia. El termotanque Rheem de 80 litros cuenta con un sistema de alta recuperación y un quemador de acero inoxidable para mayor durabilidad y eficiencia.",
    "price": 249999,
    "hasFreeShipping": false,
    "imageUrls": ["https://picsum.photos/seed/termotanque1/600/600"],
    "imageHint": "termotanque gas",
    "category": "large",
    "specifications": {
      "Capacidad": "80 L",
      "Tipo de conexión": "Superior",
      "Recuperación": "Alta",
      "Tipo de gas": "Multigas"
    },
    "warrantyOptions": [{ "months": 12, "price": 12000 }],
    "installationPrice": 20000,
    "stock": 15,
    "stockByStore": { "store-3": 8 }
  },
  {
    "id": "soporte-tv-nakan",
    "name": "Soporte para TV Nakan SPL-695 móvil de 32 a 65 pulgadas",
    "slug": "soporte-tv-nakan",
    "description": "Optimiza tu espacio y encuentra el ángulo de visión perfecto con este soporte móvil. Compatible con TVs de 32 a 65 pulgadas, permite inclinación y giro para una experiencia visual inmejorable.",
    "price": 49999,
    "hasFreeShipping": false,
    "imageUrls": ["https://picsum.photos/seed/soporte1/600/600"],
    "imageHint": "soporte tv",
    "category": "small",
    "specifications": {
      "Marca": "Nakan",
      "Compatibilidad": "32 a 65 pulgadas",
      "Tipo": "Móvil (inclinación y giro)",
      "VESA": "Hasta 400x400"
    },
    "warrantyOptions": [],
    "stock": 150,
    "stockByStore": { "store-1": 50, "store-2": 50, "store-3": 50 }
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p) => p.slug === slug);
};

export const useProductBySlug = (slug: string) => {
    // This hook is now simplified to use the local array.
    // In a real application, this would query Firestore.
    const product = getProductBySlug(slug);
    return {
        product,
        isLoading: false,
        error: null,
    }
}
