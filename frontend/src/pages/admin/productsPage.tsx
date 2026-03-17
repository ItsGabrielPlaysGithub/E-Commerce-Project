'use client';

import { useState } from "react";
import { Download, Package, AlertTriangle, Zap, TrendingUp, Plus, Search, Filter } from "lucide-react";
import { ProductsTable } from "@/components/admin/ProductsTable";
import { AddProductModal, type ProductFormData } from "@/features/products/components/AddProductModal";
import { ArchiveConfirmDialog } from "@/components/admin/ArchiveConfirmDialog";
import { AdjustStockModal } from "@/components/admin/AdjustStockModal";
import { ProductDetailsModal } from "@/components/admin/ProductDetailsModal";
import { useProducts } from "@/features/products/hooks/use-products";
import { toast } from "sonner";

interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  available: number;
  inTransit: number;
  blocked: number;
  reorderPoint: number;
  status: string;
  price: number;
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState<(ProductFormData & { productId: number }) | null>(null);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [archiveLoading, setArchiveLoading] = useState(false);
  const [adjustStockOpen, setAdjustStockOpen] = useState(false);
  const [adjustStockLoading, setAdjustStockLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Fetch from GraphQL
  const { data, loading, error } = useProducts();

  // Transform data directly (no useEffect needed)
  const products: Product[] = (data?.getProducts || []).map((product) => ({
    id: product.productId.toString(),
    sku: product.sku || `SKU-${product.productId}`,
    name: product.productName,
    category: product.category || "Uncategorized",
    available: product.available || 0,
    inTransit: product.inTransit || 0,
    blocked: product.blocked || 0,
    reorderPoint: product.reorderPoint || 50,
    status: "Active" as const,
    price: product.productPrice,
  }));

  if (loading) return <div className="p-8">Loading products...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error.message}</div>;


  const totalItems = products.length;
  const totalUnits = products.reduce((sum, p) => sum + p.available, 0);
  const inTransitUnits = products.reduce((sum, p) => sum + p.inTransit, 0);
  const lowStockCount = products.filter((p) => p.available <= p.reorderPoint).length;

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ["all", ...new Set(products.map((p) => p.category))];
  const statuses = ["all", "Active", "Low Stock", "Out of Stock"];

  // Action handlers
  const handleAddProduct = (formData: ProductFormData) => {
    console.log("Product added:", formData);
    // TODO: Call createProduct mutation to add to backend
    // The GraphQL cache will auto-update
  };

  const handleEdit = (product: Product) => {
    setProductToEdit({
      name: product.name,
      sku: product.sku,
      category: product.category,
      price: product.price,
      reorderPoint: product.reorderPoint,
      available: product.available,
      productId: parseInt(product.id),
    });
    setShowAddProductModal(true);
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setShowDetailsModal(true);
  };

  const handleAdjustStock = (product: Product) => {
    setSelectedProduct(product);
    setAdjustStockOpen(true);
  };

  const handleAdjustStockSubmit = async (data: { available: number; inTransit: number; blocked: number }) => {
    setAdjustStockLoading(true);
    try {
      console.log("Adjust stock for product:", selectedProduct?.name, data);
      // TODO: Call updateProductStock mutation with refetchQueries: ["GetProducts"]
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Stock updated successfully!");
      setAdjustStockOpen(false);
      // When you implement the real mutation, add: refetchQueries: ["GetProducts"]
    } catch (error) {
      console.error("Failed to adjust stock:", error);
      toast.error("Failed to adjust stock");
    } finally {
      setAdjustStockLoading(false);
    }
  };

  const handleArchive = (product: Product) => {
    setSelectedProduct(product);
    setArchiveDialogOpen(true);
  };

  const handleArchiveConfirm = async () => {
    setArchiveLoading(true);
    try {
      console.log("Archiving product:", selectedProduct?.name);
      // TODO: Call archiveProduct mutation with refetchQueries: ["GetProducts"]
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Product archived successfully!");
      setArchiveDialogOpen(false);
      // When you implement the real mutation, add: refetchQueries: ["GetProducts"]
    } catch (error) {
      console.error("Failed to archive product:", error);
      toast.error("Failed to archive product");
    } finally {
      setArchiveLoading(false);
    }
  };

  return (
    <div className="space-y-6 px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 font-bold text-2xl">Product Inventory</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage your product inventory and stock levels</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">
            {totalItems} products · {totalUnits} total units
          </span>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50">
            <Download size={12} /> Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Products",
            value: totalItems,
            icon: Package,
            color: "#bf262f",
            bg: "#fdf2f2",
          },
          {
            label: "Total Units",
            value: totalUnits,
            icon: TrendingUp,
            color: "#2563eb",
            bg: "#eff6ff",
          },
          {
            label: "In Transit",
            value: inTransitUnits,
            icon: Zap,
            color: "#d97706",
            bg: "#fffbeb",
          },
          {
            label: "Below Reorder",
            value: lowStockCount,
            icon: AlertTriangle,
            color: "#dc2626",
            bg: "#fef2f2",
          },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-xs">{label}</span>
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: bg }}
              >
                <Icon size={16} style={{ color }} />
              </div>
            </div>
            <div
              className="font-bold"
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                lineHeight: 1.2,
                color,
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Search, Filter & Add Product Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        {/* Search */}
        <div className="flex-1 relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by name or SKU..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 transition-all"
            style={{ borderColor: "#e5e7eb" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Filter size={14} />
            Filter
          </button>

          {showFilterDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4 space-y-4">
              {/* Category Filter */}
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-2 block">
                  Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className="px-3 py-2 rounded-lg text-xs font-medium transition-all text-left"
                      style={{
                        backgroundColor:
                          selectedCategory === cat ? "#fdf2f2" : "#f9fafb",
                        color:
                          selectedCategory === cat ? "#bf262f" : "#6b7280",
                        border:
                          selectedCategory === cat
                            ? "1px solid #bf262f"
                            : "1px solid #e5e7eb",
                      }}
                    >
                      {cat === "all" ? "All Categories" : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-2 block">
                  Status
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {statuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className="px-3 py-2 rounded-lg text-xs font-medium transition-all text-left"
                      style={{
                        backgroundColor:
                          selectedStatus === status ? "#fdf2f2" : "#f9fafb",
                        color:
                          selectedStatus === status ? "#bf262f" : "#6b7280",
                        border:
                          selectedStatus === status
                            ? "1px solid #bf262f"
                            : "1px solid #e5e7eb",
                      }}
                    >
                      {status === "all" ? "All Status" : status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedStatus("all");
                }}
                className="w-full px-3 py-2 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Add Product Button */}
        <button
          onClick={() => setShowAddProductModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold transition-all hover:opacity-90 shadow-sm"
          style={{ backgroundColor: "#bf262f" }}
        >
          <Plus size={14} />
          Add Product
        </button>
      </div>

      {/* Products Table */}
      <ProductsTable
        products={filteredProducts}
        emptyMessage="No products found matching your filters"
        onEdit={handleEdit}
        onViewDetails={handleViewDetails}
        onAdjustStock={handleAdjustStock}
        onArchive={handleArchive}
      />

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={showAddProductModal}
        onClose={() => {
          setShowAddProductModal(false);
          setProductToEdit(null);
        }}
        onSubmit={handleAddProduct}
        productToEdit={productToEdit || undefined}
      />

      {/* Archive Confirm Dialog */}
      {selectedProduct && (
        <ArchiveConfirmDialog
          isOpen={archiveDialogOpen}
          productName={selectedProduct.name}
          onConfirm={handleArchiveConfirm}
          onCancel={() => setArchiveDialogOpen(false)}
          isLoading={archiveLoading}
        />
      )}

      {/* Adjust Stock Modal */}
      {selectedProduct && (
        <AdjustStockModal
          isOpen={adjustStockOpen}
          product={selectedProduct}
          onClose={() => setAdjustStockOpen(false)}
          onSubmit={handleAdjustStockSubmit}
          isLoading={adjustStockLoading}
        />
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          isOpen={showDetailsModal}
          product={selectedProduct}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
}
