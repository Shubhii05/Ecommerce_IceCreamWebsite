import { apiFetch } from "./api";
import type { CartItem } from "@/context/CartContext";

export async function fetchCartFromBackend(): Promise<Record<string, any>> {
  return await apiFetch<Record<string, any>>("/api/cart", { auth: true });
}

export async function addToCartBackend(productId: string, quantity: number): Promise<Record<string, any>> {
  return await apiFetch<Record<string, any>>("/api/cart/add", {
    method: "POST",
    auth: true,
    body: JSON.stringify({ productId, quantity }),
  });
}

export async function removeFromCartBackend(productId: string): Promise<Record<string, any>> {
  return await apiFetch<Record<string, any>>("/api/cart/remove", {
    method: "POST",
    auth: true,
    body: JSON.stringify({ productId }),
  });
}

export async function clearCartBackend(): Promise<void> {
  return await apiFetch<void>("/api/cart/clear", {
    method: "DELETE",
    auth: true,
  });
}

export async function syncCartBackend(items: CartItem[]): Promise<CartItem[]> {
  return await apiFetch<CartItem[]>("/api/cart/sync", {
    method: "POST",
    auth: true,
    body: JSON.stringify({ items }),
  });
}
