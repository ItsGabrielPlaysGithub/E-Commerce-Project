import type { Product } from "./products";

export type ProductPriceType = "retail" | "wholesale" | "bulk";

const PRICE_MULTIPLIERS: Record<ProductPriceType, number> = {
  retail: 1,
  wholesale: 0.92,
  bulk: 0.84,
};

export function getRetailPrice(product: Product) {
  return product.price;
}

export function getProductPrice(product: Product, priceType: ProductPriceType) {
  return Math.round(product.price * PRICE_MULTIPLIERS[priceType]);
}

export function getProductReviewCount(product: Product) {
  return Math.max(12, Math.round(product.rating * 18));
}
