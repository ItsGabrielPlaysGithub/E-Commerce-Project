"use client";

import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { useAuth } from "@/features/auth";
import { Product, products } from "../../../data/products";

export type AccountType = "wholesale" | "bulk" | "retail";

export interface CartItem {
  product: Product;
  qty: number;
  selectedColor?: string;
  selectedSize?: string;
  pricingTier: AccountType;
  unitPrice: number;
}

interface CartContextType {
  items: CartItem[];
  pricingTier: AccountType;
  setPricingTier: (t: AccountType) => void;
  addItem: (product: Product, qty: number, opts?: { color?: string; size?: string }) => void;
  updateQty: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
  removeItems: (productIds: string[]) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  lastAdded: Product | null;
}

type PersistedCartItem = {
  productId: string;
  qty: number;
  selectedColor?: string;
  selectedSize?: string;
  pricingTier: AccountType;
  unitPrice: number;
};

type CartCookiePayload = {
  items: PersistedCartItem[];
  pricingTier: AccountType;
};

const CartContext = createContext<CartContextType>({
  items: [],
  pricingTier: "retail",
  setPricingTier: () => {},
  addItem: () => {},
  updateQty: () => {},
  removeItem: () => {},
  removeItems: () => {},
  clearCart: () => {},
  itemCount: 0,
  subtotal: 0,
  lastAdded: null,
});

function getUnitPrice(product: Product, tier: AccountType) {
  if (tier === "wholesale") return product.wholesalePrice;
  if (tier === "bulk") return product.bulkPrice;
  return product.retailPrice;
}

function serializeCartItems(items: CartItem[]): PersistedCartItem[] {
  return items.map((item) => ({
    productId: item.product.id,
    qty: item.qty,
    selectedColor: item.selectedColor,
    selectedSize: item.selectedSize,
    pricingTier: item.pricingTier,
    unitPrice: item.unitPrice,
  }));
}

function hydrateCartItems(serializedItems: PersistedCartItem[]): CartItem[] {
  const productMap = new Map(products.map((product) => [product.id, product]));

  return serializedItems
    .map((serializedItem) => {
      const product = productMap.get(serializedItem.productId);
      if (!product) {
        return null;
      }

      return {
        product,
        qty: serializedItem.qty,
        selectedColor: serializedItem.selectedColor,
        selectedSize: serializedItem.selectedSize,
        pricingTier: serializedItem.pricingTier,
        unitPrice: serializedItem.unitPrice,
      } as CartItem;
    })
    .filter((item): item is CartItem => item !== null);
}

export function CartProvider({ children }: { children: ReactNode }): React.ReactNode {
  const { company } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [pricingTier, setPricingTier] = useState<AccountType>("retail");
  const [lastAdded, setLastAdded] = useState<Product | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  const cartOwnerKey = useMemo(() => {
    if (company?.userId) {
      return `user:${company.userId}`;
    }

    if (company?.emailAddress) {
      return `email:${company.emailAddress.toLowerCase()}`;
    }

    return "guest";
  }, [company?.emailAddress, company?.userId]);

  useEffect(() => {
    const clearLegacyStorage = (storage: Storage) => {
      const keysToRemove: string[] = [];

      for (let i = 0; i < storage.length; i += 1) {
        const key = storage.key(i);
        if (!key) continue;

        const isLegacyCartKey =
          key === "cart_items" ||
          key === "cart_tier" ||
          key.startsWith("cart:") ||
          key.startsWith("session-cart:") ||
          key.startsWith("cart_");

        if (isLegacyCartKey) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach((key) => storage.removeItem(key));
    };

    try {
      clearLegacyStorage(localStorage);
      clearLegacyStorage(sessionStorage);
    } catch {
      // Ignore storage cleanup issues; app can proceed with cookie-backed cart.
    }
  }, []);

  useEffect(() => {
    setIsHydrated(false);

    const loadCart = async () => {
      try {
        const response = await fetch("/api/cart", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load cart cookie data");
        }

        const payload = (await response.json()) as CartCookiePayload;
        setItems(hydrateCartItems(payload.items || []));
        setPricingTier(payload.pricingTier || "retail");
      } catch (error) {
        console.error("Failed to load cart from cookies:", error);
        setItems([]);
        setPricingTier("retail");
      } finally {
        setIsHydrated(true);
      }
    };

    void loadCart();
  }, [cartOwnerKey]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    const persistCart = async () => {
      try {
        const response = await fetch("/api/cart", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: serializeCartItems(items),
            pricingTier,
          } as CartCookiePayload),
        });

        if (!response.ok) {
          throw new Error("Unable to persist cart cookie data");
        }
      } catch (error) {
        console.error("Failed to persist cart to cookies:", error);
      }
    };

    void persistCart();
  }, [isHydrated, items, pricingTier]);

  const addItem = (product: Product, qty: number, opts?: { color?: string; size?: string }) => {
    const unitPrice = getUnitPrice(product, pricingTier);
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, {
        product, qty, pricingTier, unitPrice,
        selectedColor: opts?.color,
        selectedSize: opts?.size,
      }];
    });
    setLastAdded(product);
    setTimeout(() => setLastAdded(null), 2500);
  };

  const updateQty = (productId: string, qty: number) => {
    if (qty < 1) return;
    setItems((prev) =>
      prev.map((i) => i.product.id === productId ? { ...i, qty } : i)
    );
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const removeItems = (productIds: string[]) => {
    if (productIds.length === 0) {
      return;
    }

    const productIdSet = new Set(productIds);
    setItems((prev) => prev.filter((item) => !productIdSet.has(item.product.id)));
  };

  const clearCart = () => setItems([]);

  const itemCount = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.qty * i.unitPrice, 0);

  return React.createElement(CartContext.Provider, { value: {
    items, pricingTier, setPricingTier,
    addItem, updateQty, removeItem, removeItems, clearCart,
    itemCount, subtotal, lastAdded,
  }}, isHydrated ? children : null);
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
