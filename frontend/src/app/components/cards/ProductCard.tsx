import Link from "next/link";
import type { Product } from "../../data/products";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <Link
      href={`/products/${product.id}`}
      className="group rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-400">{product.category}</p>
        <h3 className="mt-1 text-sm font-semibold text-gray-800 line-clamp-2">
          {product.name}
        </h3>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm font-bold text-gray-900">{formattedPrice}</p>
          <p className="text-xs text-amber-500">{product.rating.toFixed(1)} / 5</p>
        </div>
      </div>
    </Link>
  );
}
