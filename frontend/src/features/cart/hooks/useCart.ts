"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Product } from "../../../data/products";

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
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  lastAdded: Product | null;
}

const CartContext = createContext<CartContextType>({
  items: [],
  pricingTier: "retail",
  setPricingTier: () => {},
  addItem: () => {},
  updateQty: () => {},
  removeItem: () => {},
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

export function CartProvider({ children }: { children: ReactNode }): React.ReactNode {
  const [items, setItems] = useState<CartItem[]>([]);
  const [pricingTier, setPricingTier] = useState<AccountType>("retail");
  const [lastAdded, setLastAdded] = useState<Product | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem("cart_items");
      const savedTier = localStorage.getItem("cart_tier") as AccountType;
      
      if (savedItems) {
        setItems(JSON.parse(savedItems));
      }
      if (savedTier) {
        setPricingTier(savedTier);
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("cart_items", JSON.stringify(items));
    }
  }, [items, isHydrated]);

  // Save pricing tier to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("cart_tier", pricingTier);
    }
  }, [pricingTier, isHydrated]);

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

  const clearCart = () => setItems([]);

  const itemCount = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.qty * i.unitPrice, 0);

  return React.createElement(CartContext.Provider, { value: {
    items, pricingTier, setPricingTier,
    addItem, updateQty, removeItem, clearCart,
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
