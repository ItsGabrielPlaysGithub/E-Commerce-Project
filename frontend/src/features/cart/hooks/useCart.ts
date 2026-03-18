"use client";

import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { useMutation, useQuery as apolloUseQuery } from "@apollo/client/react";
import { useAuth } from "@/features/auth";
import { Product, products } from "../../../data/products";
import { GET_CART } from "../services/query";
import { ADD_TO_CART, UPDATE_CART_ITEM, REMOVE_FROM_CART, CLEAR_CART, REMOVE_CART_ITEM_BY_PRODUCT_ID } from "../services/cartMutation";

export interface CartItem {
  product: Product;
  qty: number;
  selectedColor?: string;
  selectedSize?: string;
  unitPrice: number;
}

interface CartContextType {
  items: CartItem[];
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
  unitPrice: number;
};

type CartCookiePayload = {
  items: PersistedCartItem[];
};

interface GetCartResponse {
  getCart: {
    items: any[];
  };
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  updateQty: () => {},
  removeItem: () => {},
  removeItems: () => {},
  clearCart: () => {},
  itemCount: 0,
  subtotal: 0,
  lastAdded: null,
});

function getUnitPrice(product: Product) {
  return product.retailPrice;
}

function serializeCartItems(items: CartItem[]): PersistedCartItem[] {
  return items.map((item) => ({
    productId: item.product.id,
    qty: item.qty,
    selectedColor: item.selectedColor,
    selectedSize: item.selectedSize,
    unitPrice: item.unitPrice,
  }));
}

function hydrateCartItems(serializedItems: any[]): CartItem[] {
  const productMap = new Map(products.map((product) => [product.id, product]));

  return serializedItems
    .map((serializedItem) => {
      // Handle both old and new format
      const productId = String(serializedItem.productId);
      const product = productMap.get(productId);
      if (!product) {
        return null;
      }

      return {
        product,
        qty: serializedItem.quantity || serializedItem.qty || 1,
        selectedColor: serializedItem.selectedColor,
        selectedSize: serializedItem.selectedSize,
        unitPrice: parseFloat(String(serializedItem.unitPrice)),
      } as CartItem;
    })
    .filter((item): item is CartItem => item !== null);
}

export function CartProvider({ children }: { children: ReactNode }): React.ReactNode {
  const { company } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [lastAdded, setLastAdded] = useState<Product | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // GraphQL mutations
  const [addToCartMutation] = useMutation(ADD_TO_CART);
  const [removeFromCartMutation] = useMutation(REMOVE_FROM_CART);
  const [clearCartMutation] = useMutation(CLEAR_CART);
  const [removeByProductMutation] = useMutation(REMOVE_CART_ITEM_BY_PRODUCT_ID);

  // GraphQL query
  const { data: cartData, refetch: refetchCart, error: cartError } = apolloUseQuery<GetCartResponse>(GET_CART, {
    variables: { userId: company?.userId || 0 },
    skip: !company?.userId,
  });

  // Handle cart data updates
  useEffect(() => {
    if (cartData?.getCart?.items) {
      try {
        setItems(hydrateCartItems(cartData.getCart.items));
        setIsHydrated(true);
      } catch (error) {
        console.error("Failed to hydrate cart items:", error);
        setIsHydrated(true);
        setItems([]);
      }
    }
  }, [cartData]);

  // Handle cart errors
  useEffect(() => {
    if (cartError) {
      console.error("Failed to fetch cart:", cartError);
      setIsHydrated(true);
    }
  }, [cartError]);

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
      // Ignore storage cleanup issues
    }
  }, []);

  // Refetch cart when user logs in
  useEffect(() => {
    if (company?.userId) {
      void refetchCart();
    } else {
      setIsHydrated(true);
      setItems([]);
    }
  }, [company?.userId, refetchCart]);

  const addItem = (product: Product, qty: number, opts?: { color?: string; size?: string }) => {
    const unitPrice = getUnitPrice(product);
    
    // Update local state immediately
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, {
        product, qty, unitPrice,
        selectedColor: opts?.color,
        selectedSize: opts?.size,
      }];
    });
    
    // Sync with backend
    if (company?.userId) {
      void addToCartMutation({
        variables: {
          userId: company.userId,
          input: {
            productId: parseInt(product.id, 10),
            quantity: qty,
            unitPrice,
            selectedColor: opts?.color,
            selectedSize: opts?.size,
          },
        },
      });
    }
    
    setLastAdded(product);
    setTimeout(() => setLastAdded(null), 2500);
  };

  const updateQty = (productId: string, qty: number) => {
    if (qty < 1) return;
    
    // Update local state
    setItems((prev) =>
      prev.map((i) => i.product.id === productId ? { ...i, qty } : i)
    );

    // Sync with backend
    if (company?.userId) {
      const item = items.find(i => i.product.id === productId);
      if (item) {
        // We would need to track the backend ID, for now just refetch
        void refetchCart();
      }
    }
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
    
    // Sync with backend
    if (company?.userId) {
      void removeByProductMutation({
        variables: {
          userId: company.userId,
          productId: parseInt(productId, 10),
        },
      });
    }
  };

  const removeItems = (productIds: string[]) => {
    if (productIds.length === 0) {
      return;
    }

    const productIdSet = new Set(productIds);
    setItems((prev) => prev.filter((item) => !productIdSet.has(item.product.id)));
    
    // Sync with backend
    if (company?.userId) {
      productIds.forEach(productId => {
        void removeByProductMutation({
          variables: {
            userId: company.userId,
            productId: parseInt(productId, 10),
          },
        });
      });
    }
  };

  const clearCart = () => {
    setItems([]);
    
    // Sync with backend
    if (company?.userId) {
      void clearCartMutation({
        variables: { userId: company.userId },
      });
    }
  };

  const itemCount = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.qty * i.unitPrice, 0);

  return React.createElement(CartContext.Provider, { value: {
    items,
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
