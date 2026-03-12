import { PageHeader } from "./PageHeader";
import { useProductsPage } from "./ProductsPageProvider";

export function ProductsHeaderSection() {
  const { activeCategory, filteredProducts } = useProductsPage();

  return (
    <PageHeader
      activeCategory={activeCategory}
      filteredCount={filteredProducts.length}
    />
  );
}
