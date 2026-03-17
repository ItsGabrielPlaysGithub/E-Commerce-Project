import { Products } from "@/pages/b2b/productsPage";

interface ProductsPageProps {
  params: {
    category: string;
  };
}

export default function Page({ params }: ProductsPageProps) {
  return <Products initialCategory={decodeURIComponent(params.category)} />;
}
