import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { Product } from "@/data/products";
import { fetchCartFromBackend, syncCartBackend } from "@/lib/cartApi";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFlavor: string;
  selectedToppings: string[];
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, flavor: string, toppings: string[]) => void;
  removeItem: (productId: string, flavor?: string) => void;
  updateQty: (productId: string, qty: number, flavor?: string) => void;
  clearCart: () => void;
  syncAfterLogin: () => Promise<void>;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("scoops_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isInitialized, setIsInitialized] = useState(false);

  // Initial load from backend
  useEffect(() => {
    const initBackendCart = async () => {
      const token = localStorage.getItem("scoops_token");
      if (token) {
        try {
          const backendCart = await fetchCartFromBackend();
          // If backend has items, we use them. If it's an object instead of array, handle gracefully.
          if (Array.isArray(backendCart) && backendCart.length > 0) {
            setItems(backendCart);
          }
        } catch (err) {
          console.error("Failed to fetch cart from backend", err);
        }
      }
      setIsInitialized(true);
    };
    initBackendCart();
  }, []);

  // Sync to localStorage & Backend when items change
  useEffect(() => {
    localStorage.setItem("scoops_cart", JSON.stringify(items));

    // Only sync if we have initialized, to avoid overwriting backend with empty local state on mount
    if (isInitialized) {
      const token = localStorage.getItem("scoops_token");
      if (token) {
        syncCartBackend(items).catch(console.error);
      }
    }
  }, [items, isInitialized]);

  // Expose manual sync for Login flow
  const syncAfterLogin = async () => {
    const localItems = items;
    try {
      const backendCart = await fetchCartFromBackend();
      // Simple merge logic: just use backend cart if local is empty, else overwrite backend with local.
      // A more complex merge could combine them.
      if (localItems.length === 0 && Array.isArray(backendCart) && backendCart.length > 0) {
        setItems(backendCart);
      } else if (localItems.length > 0) {
        await syncCartBackend(localItems);
      }
    } catch (err) {
      console.error("Failed to sync cart after login", err);
    }
  };

  const addItem = useCallback((product: Product, flavor: string, toppings: string[]) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id && i.selectedFlavor === flavor);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.selectedFlavor === flavor
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1, selectedFlavor: flavor, selectedToppings: toppings }];
    });
  }, []);

  const removeItem = useCallback((productId: string, flavor?: string) => {
    setItems((prev) => prev.filter((i) => {
      if (flavor) {
        return !(i.product.id === productId && i.selectedFlavor === flavor);
      }
      return i.product.id !== productId;
    }));
  }, []);

  const updateQty = useCallback((productId: string, qty: number, flavor?: string) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => {
        if (flavor) {
          return !(i.product.id === productId && i.selectedFlavor === flavor);
        }
        return i.product.id !== productId;
      }));
    } else {
      setItems((prev) => prev.map((i) => {
        const matches = flavor 
          ? i.product.id === productId && i.selectedFlavor === flavor
          : i.product.id === productId;
        return matches ? { ...i, quantity: qty } : i;
      }));
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, syncAfterLogin, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
