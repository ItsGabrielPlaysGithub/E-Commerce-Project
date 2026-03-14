import { callGraphQL } from "./graphql";
import { GetProductsQueryResult } from "./types";
import { GET_PRODUCTS_QUERY } from "./queries";

export function parseProductId(rawProductId: string): number | null {
  if (!rawProductId || typeof rawProductId !== "string") return null;

  if (/^\d+$/.test(rawProductId)) {
    const id = parseInt(rawProductId, 10);
    return Number.isInteger(id) && id > 0 ? id : null;
  }

  const prefixed = /^p(\d+)$/i.exec(rawProductId);
  if (!prefixed) return null;

  const id = parseInt(prefixed[1], 10);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function getAuthoritativePrices(): Promise<Map<number, number>> {
  const result = await callGraphQL<GetProductsQueryResult>(GET_PRODUCTS_QUERY, {});
  const products = Array.isArray(result.getProducts) ? result.getProducts : [];

  const priceMap = new Map<number, number>();
  for (const product of products) {
    const parsedPrice =
      typeof product.productPrice === "number"
        ? product.productPrice
        : Number(product.productPrice);

    if (
      typeof product.productId === "number" &&
      Number.isFinite(parsedPrice) &&
      product.productId > 0 &&
      parsedPrice >= 0
    ) {
      priceMap.set(product.productId, parsedPrice);
    }
  }

  return priceMap;
}
