"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, ShoppingCart, LogIn } from "lucide-react";
import { Product } from "../../data/products";
import {
  getProductPrice,
  getProductReviewCount,
  getRetailPrice,
} from "../../data/pricing";
import { useCart } from "@/features/b2b/cart/hooks/useCart";
import { useAuth } from "@/features/auth";
import { AddToCartConfirmModal } from "../modals/AddToCartConfirmModal";

const RED = "#bf262f";
const RED_LIGHT = "#f9e9ea";

// Helper function to convert product name to URL slug
const productNameToSlug = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]/g, "");
};

interface ProductCardProps {
  product: Product;
  showPricing?: "retail" | "wholesale" | "bulk";
}

export function ProductCard({ product, showPricing = "retail" }: ProductCardProps) {
  const { addItem } = useCart();
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const displayPrice = getProductPrice(product, "retail");
  const retailPrice = getRetailPrice(product);
  const reviewCount = getProductReviewCount(product);
  const inStock = true;

  const handleAddItem = () => {
    setShowConfirmModal(true);
  };

  const handleAddToCartAndCheckout = () => {
    addItem(product, 1);
    setShowConfirmModal(false);
    router.push("/b2b/cart");
  };

  const handleAddToCartAndContinue = () => {
    addItem(product, 1);
    setShowConfirmModal(false);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden group hover:shadow-sm hover:border-gray-200 transition-all h-full flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 aspect-square shrink-0">
        <img
          src={product.imageUrl || product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {!inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-gray-700 text-white text-xs px-3 py-1 rounded-full">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-2 sm:p-3 md:p-3.5 flex flex-col grow gap-2">
        <div className="text-xs text-gray-300 mb-0.5 uppercase tracking-wider truncate">{product.category}</div>
        <Link href={`/b2b/products/${productNameToSlug(product.name)}`}>
          <p className="text-gray-800 text-xs sm:text-sm font-medium mb-1 line-clamp-2 hover:text-red-600 transition-colors leading-snug">
            {product.name}
          </p>
        </Link>

        <div className="flex items-center gap-0.5 mb-auto">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={10}
              fill={s <= Math.round(product.rating) ? "#f59e0b" : "none"}
              stroke={s <= Math.round(product.rating) ? "#f59e0b" : "#d1d5db"}
            />
          ))}
          <span className="text-gray-300 text-xs ml-0.5">({reviewCount})</span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-2">
          <div className="order-2 sm:order-1">
            <div className="text-gray-900 font-bold text-sm sm:text-base">₱{displayPrice.toLocaleString()}</div>
          </div>
          <div className="w-full sm:w-auto order-1 sm:order-2">
          {isLoggedIn && inStock ? (
            <button
              onClick={handleAddItem}
              className="w-full sm:w-auto flex items-center justify-center gap-1 text-xs sm:text-sm font-semibold px-2 sm:px-3 py-2 sm:py-1.5 rounded-lg hover:opacity-80 hover:shadow-md hover:scale-105 transition-all text-white whitespace-nowrap cursor-pointer"
              style={{ backgroundColor: RED }}
            >
              <ShoppingCart size={14} className="sm:hidden" />
              <ShoppingCart size={12} className="hidden sm:block" />
              <span>Add</span>
            </button>
          ) : !isLoggedIn ? (
            <Link
              href="/b2b/login"
              className="w-full sm:w-auto flex items-center justify-center gap-1 text-xs sm:text-sm font-semibold px-2 sm:px-3 py-2 sm:py-1.5 rounded-lg hover:opacity-80 hover:shadow-md hover:scale-105 transition-all whitespace-nowrap cursor-pointer"
              style={{ backgroundColor: RED, color: "#ffffff" }}
            >
              <LogIn size={14} className="sm:hidden" />
              <LogIn size={12} className="hidden sm:block" />
              <span>Add to Cart</span>
            </Link>
          ) : (
            <span className="text-xs text-gray-300 font-medium">Sold Out</span>
          )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AddToCartConfirmModal
        isOpen={showConfirmModal}
        product={product}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleAddToCartAndCheckout}
        onContinueShopping={handleAddToCartAndContinue}
      />
    </div>
  );
}
