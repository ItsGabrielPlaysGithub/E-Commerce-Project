import Link from "next/link";
import { Star, ShoppingCart, LogIn } from "lucide-react";
import { Product } from "../../data/products";
import {
  getProductPrice,
  getProductReviewCount,
  getRetailPrice,
} from "../../data/pricing";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";

const RED = "#bf262f";
const RED_LIGHT = "#f9e9ea";

interface ProductCardProps {
  product: Product;
  showPricing?: "retail" | "wholesale" | "bulk";
}

export function ProductCard({ product, showPricing = "retail" }: ProductCardProps) {
  // const { addItem } = useCart();
  // const { isLoggedIn, company } = useAuth();

  // Fallback values since context is not available
  const isLoggedIn = false;
  const company = null;
  const addItem = () => {};

  const activeTier = company?.accountType ?? showPricing;
  const displayPrice = getProductPrice(product, activeTier);
  const retailPrice = getRetailPrice(product);
  const reviewCount = getProductReviewCount(product);
  const inStock = true;

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden group hover:shadow-sm hover:border-gray-200 transition-all">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 aspect-square">
        <img
          src={product.image}
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
      <div className="p-3.5">
        <div className="text-xs text-gray-300 mb-1 uppercase tracking-wider">{product.category}</div>
        <Link href={`/b2b/products/${product.id}`}>
          <p className="text-gray-800 text-xs font-medium mb-2 line-clamp-2 hover:text-red-600 transition-colors leading-snug">
            {product.name}
          </p>
        </Link>

        <div className="flex items-center gap-1 mb-3">
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

        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="text-gray-900 font-bold text-sm">₱{displayPrice.toLocaleString()}</div>
            {activeTier !== "retail" && (
              <div className="text-gray-300 text-xs line-through">₱{retailPrice.toLocaleString()}</div>
            )}
          </div>
          {isLoggedIn && inStock ? (
            <button
              onClick={() => addItem(product, 1)}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity text-white"
              style={{ backgroundColor: RED }}
            >
              <ShoppingCart size={11} /> Add
            </button>
          ) : !isLoggedIn ? (
            <Link
              href="/b2b/login"
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: RED_LIGHT, color: RED }}
            >
              <LogIn size={11} /> Order
            </Link>
          ) : (
            <span className="text-xs text-gray-300 font-medium">Sold Out</span>
          )}
        </div>
      </div>
    </div>
  );
}
