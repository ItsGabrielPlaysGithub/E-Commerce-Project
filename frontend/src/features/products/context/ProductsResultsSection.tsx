import { NoProducts } from "../components/NoProducts";
import { ProductsGrid } from "../components/ProductsGrid";
import { ProductsList } from "../components/ProductsList";
import { useProductsPage } from "./ProductsPageProvider";

export function ProductsResultsSection() {
  const { filteredProducts, priceType, viewMode } = useProductsPage();

  if (filteredProducts.length === 0) {
    return <NoProducts />;
  }

  if (viewMode === "grid") {
    return <ProductsGrid products={filteredProducts} priceType={priceType} />;
  }

  return <ProductsList products={filteredProducts} priceType={priceType} />;
}
