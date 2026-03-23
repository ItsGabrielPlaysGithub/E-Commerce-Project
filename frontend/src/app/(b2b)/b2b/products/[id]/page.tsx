"use client";

import { useParams } from "next/navigation";
import { useGetProductByNameQuery } from "@/features/admin/products/hooks/service-hooks/use-product-name";
// import { ProductDetailContainer } from "@/features/products/products-details";
import type { Product } from "@/data/products";

/**
 * Product Detail Page
 * 
 * Usage Flow:
 * 1. User clicks on a ProductCard from the products listing page
 * 2. Next.js routes to /b2b/products/[productName]
 * 3. This page component loads
 * 4. useParams() extracts the product name (slug) from the URL
 * 5. We fetch the product from GraphQL using the name
 * 6. ProductDetailContainer renders all product details
 */
export default function ProductDetailPage() {
  const params = useParams();
  // Get the dynamic segment (works whether folder is [id] or [name])
  const productName = (params?.id || params?.name) as string | undefined;

  // Decode the slug back to product name (convert hyphens back to spaces)
  const decodedName = productName ? productName.replace(/-/g, " ") : undefined;

  // Fetch product by name from GraphQL
  const { data, loading, error } = useGetProductByNameQuery(decodedName);

  // Transform GraphQL product to Product type
  let product: Product | undefined = undefined;
  if (data?.getProductByName) {
    const graphQLProduct = data.getProductByName;
    product = {
      id: graphQLProduct.productId.toString(),
      name: graphQLProduct.productName,
      price: Math.round(graphQLProduct.productPrice || 0),
      retailPrice: Math.round(graphQLProduct.productPrice || 0),
      wholesalePrice: Math.round((graphQLProduct.productPrice || 0) * 0.92),
      bulkPrice: Math.round((graphQLProduct.productPrice || 0) * 0.84),
      minWholesale: 10,
      minBulk: 50,
      image: "https://images.unsplash.com/photo-1696986324692-f4aa0f2f495d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      imageUrl: graphQLProduct.imageUrl || undefined,
      category: typeof graphQLProduct.category === 'string' ? graphQLProduct.category : (graphQLProduct.category?.categoryName || "Uncategorized"),
      rating: 4.5,
      description: graphQLProduct.productDescription,
    };
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-gray-500">Error loading product</p>
      </div>
    );
  }

  // return <ProductDetailContainer product={product} />;
}
