import { useEffect, useState } from "react";
import { PRODUCTS, type Category, type Product } from "@/data/products";
import { apiFetch } from "@/lib/api";

interface BackendProduct {
  id: number | string;
  name: string;
  description?: string | null;
  price: number | string;
  stock?: number | null;
  category?: string | null;
  image_url?: string | null;
}

const categoryMap: Record<string, Category> = {
  cone: "Cones",
  cones: "Cones",
  cup: "Cones",
  shake: "Shakes",
  shakes: "Shakes",
  sundae: "Sundaes",
  sundaes: "Sundaes",
  waffle: "Waffles",
  waffles: "Waffles",
  seasonal: "Seasonal",
};

function mapBackendProduct(product: BackendProduct, index: number): Product {
  const fallback = PRODUCTS[index % PRODUCTS.length];
  const normalizedCategory = String(product.category || "").toLowerCase();
  const image = product.image_url && !product.image_url.includes("example.com")
    ? product.image_url
    : fallback.image;

  return {
    id: `db-${product.id}`,
    name: product.name,
    description: product.description || fallback.description,
    price: Number(product.price),
    rating: fallback.rating,
    reviews: fallback.reviews,
    badge: product.stock === 0 ? "Sold Out" : "Fresh Batch",
    image,
    category: categoryMap[normalizedCategory] ?? fallback.category,
    flavors: [product.name, ...fallback.flavors.slice(0, 2)],
    toppings: fallback.toppings,
  };
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        const backendProducts = await apiFetch<BackendProduct[]>("/api/products");
        if (cancelled) return;

        const mappedProducts = backendProducts.map(mapBackendProduct);
        setProducts([...mappedProducts, ...PRODUCTS]);
      } catch {
        if (!cancelled) setProducts(PRODUCTS);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading };
}
