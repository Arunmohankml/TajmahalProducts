import { CarpetProduct, INITIAL_PRODUCTS } from "./tajmahal_data";

export interface StoreProduct {
  id: string;
  name: string;
  series: string;
  category: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
  is_featured: boolean;
  is_limited: boolean;
  created_at: string;
  care_level: "Beginner" | "Easy" | "Moderate" | "Advanced";
  size: string;
}

// Map Tajmahal initial products into StoreProduct for legacy backward compatibility
export const LOCAL_CATALOG: StoreProduct[] = INITIAL_PRODUCTS.map((p) => ({
  id: p.id,
  name: p.title,
  series: p.collection_name,
  category: p.collection_name,
  description: p.description,
  price: 0, // Luxury bespoke quote basis
  image_url: p.image_url,
  stock: 1,
  is_featured: p.is_featured,
  is_limited: true,
  created_at: "2026-01-01T00:00:00.000Z",
  care_level: "Advanced",
  size: p.size,
}));

export function getLocalProduct(id: string) {
  return LOCAL_CATALOG.find((product) => product.id === id);
}
