import Link from "next/link";
import { RED } from "../../../data/constants";
import type { Product } from "../../../data/products";
import {
  getProductPrice,
  getRetailPrice,
  type ProductPriceType,
} from "../../../data/pricing";

interface ProductsListProps {
  products: Product[];
  priceType: ProductPriceType;
}

export function ProductsList({ products, priceType }: ProductsListProps) {
  return (
    <div className="flex flex-col gap-3">
      {products.map((p) => (
        <div key={p.id} className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4 items-center hover:shadow-sm transition-shadow">
          <img src={p.image} alt={p.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">{p.category}</div>
            <Link href={`/b2b/products/${p.id}`} className="text-gray-800 text-sm font-medium hover:text-red-600 transition-colors line-clamp-1">
              {p.name}
            </Link>
          </div>
          <div className="text-right shrink-0">
            <div className="font-bold text-gray-900 text-sm">
              ₱{getProductPrice(p, priceType).toLocaleString()}
            </div>
            {priceType !== "retail" && (
              <div className="text-xs text-gray-300 line-through">₱{getRetailPrice(p).toLocaleString()}</div>
            )}
            <Link
              href={`/b2b/products/${p.id}`}
              className="mt-1.5 inline-block text-xs font-semibold px-3 py-1 rounded-lg text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: RED }}
            >
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
