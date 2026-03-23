import { ProductCard } from "../../../../components/cards/ProductCard";
import type { Product } from "../../../../data/products";
import type { ProductPriceType } from "../../../../data/pricing";

interface ProductsGridProps {
  products: Product[];
  priceType: ProductPriceType;
}

export function ProductsGrid({ products, priceType }: ProductsGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} showPricing={priceType} />
      ))}
    </div>
  );
}
