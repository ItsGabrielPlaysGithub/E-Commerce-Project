"use client";

import { X, Package } from "lucide-react";
import { useState, useEffect } from "react";
import { useCreateProduct } from "../hooks/service-hooks/use-createproduct";
import { useUpdateProduct } from "../hooks/service-hooks/use-updateproduct";
import { toast } from "sonner";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: ProductFormData) => void;
  productToEdit?: ProductFormData & { productId: number };
  categories: { categoryId: number; categoryName: string }[];
}

export interface ProductFormData {
  name: string;
  sku: string;
  category: string;
  price: number;
  reorderPoint: number;
  available: number;
}

export function AddProductModal({
  isOpen,
  onClose,
  onSubmit,
  productToEdit,
  categories,
}: AddProductModalProps) {
  const [createProduct] = useCreateProduct();
  const [updateProduct] = useUpdateProduct();
  const isEditMode = !!productToEdit;
  const [isAnimating, setIsAnimating] = useState(false);

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    sku: "",
    category: "",
    price: 0,
    reorderPoint: 0,
    available: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Pre-fill form when editing
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isEditMode && productToEdit) {
      setFormData({
        name: productToEdit.name,
        sku: productToEdit.sku,
        category: productToEdit.category,
        price: productToEdit.price,
        reorderPoint: productToEdit.reorderPoint,
        available: productToEdit.available,
      });
    } else {
      setFormData({
        name: "",
        sku: "",
        category: "",
        price: 0,
        reorderPoint: 0,
        available: 0,
      });
    }
    setErrors({});
    setError(null);
  }, [isOpen, isEditMode, productToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let finalValue: any = value;

    // Handle numeric fields
    if (name === "price" || name === "reorderPoint" || name === "available") {
      // Block negative sign input
      if (value.includes("-")) {
        return;
      }
      const numValue = parseFloat(value);
      finalValue = value === "" ? 0 : numValue || 0;
    }

    // Handle text fields - trim and validate
    if (name === "name") {
      finalValue = value.slice(0, 100); // Max 100 characters
    }

    if (name === "sku") {
      // Allow only alphanumeric and hyphens
      finalValue = value.replace(/[^a-zA-Z0-9-]/g, "").slice(0, 20);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const field = (e.target as HTMLInputElement).name;
    // Block minus key on numeric fields
    if (
      (field === "price" || field === "reorderPoint" || field === "available") &&
      e.key === "-"
    ) {
      e.preventDefault();
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.sku.trim()) newErrors.sku = "SKU is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0";
    if (formData.reorderPoint < 0) newErrors.reorderPoint = "Reorder point cannot be negative";
    if (formData.available < 0) newErrors.available = "Available units cannot be negative";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    if (isEditMode && productToEdit) {
      // Edit mode - use updateProduct (id separate)
      updateProduct({
        variables: {
          id: productToEdit.productId,
          input: {
            productName: formData.name,
            productDescription: "",
            sku: formData.sku,
            category: formData.category,
            productPrice: formData.price,
            reorderPoint: formData.reorderPoint,
            available: formData.available,
          },
        },
      })
        .then(() => {
          onSubmit(formData);
          toast.success("Product updated successfully!");
          setFormData({
            name: "",
            sku: "",
            category: "",
            price: 0,
            reorderPoint: 0,
            available: 0,
          });
          onClose();
        })
        .catch((err) => {
          setError(err);
          toast.error("Failed to update product.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // Create mode - use createProduct
      createProduct({
        variables: {
          input: {
            productName: formData.name,
            productDescription: "",
            sku: formData.sku,
            category: formData.category,
            productPrice: formData.price,
            reorderPoint: formData.reorderPoint,
            available: formData.available,
          },
        },
      })
        .then(() => {
          onSubmit(formData);
          toast.success("Product created successfully!");
          setFormData({
            name: "",
            sku: "",
            category: "",
            price: 0,
            reorderPoint: 0,
            available: 0,
          });
          onClose();
        })
        .catch((err) => {
          setError(err);
          toast.error("Failed to create product.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed top-0 left-0 w-screen h-screen z-40"
        style={{
          background: "rgba(0,0,0,0.5)",
          animation: isOpen
            ? "fadeIn 0.2s ease-out"
            : "fadeOut 0.2s ease-out forwards",
        }}
        onClick={onClose}
        onAnimationEnd={() => {
          if (!isOpen) setIsAnimating(false);
        }}
      />

      {/* Modal */}
      <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center p-4 pointer-events-none" style={{ maxHeight: "100vh", maxWidth: "100vw" }}>
        <div
          className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden pointer-events-auto"
          style={{
            animation: isOpen
              ? "slideUp 0.3s ease-out"
              : "slideDown 0.2s ease-out forwards",
          }}
          onAnimationEnd={() => {
            if (!isOpen) setIsAnimating(false);
          }}
        >
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes fadeOut {
              from { opacity: 1; }
              to { opacity: 0; }
            }
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes slideDown {
              from {
                opacity: 1;
                transform: translateY(0);
              }
              to {
                opacity: 0;
                transform: translateY(20px);
              }
            }
          `}</style>
        {/* Header */}
        <div
          className="px-6 py-4 border-b border-gray-100 flex items-center justify-between"
          style={{ backgroundColor: "#fdf2f2" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#fff4f4" }}
            >
              <Package size={20} style={{ color: "#bf262f" }} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {isEditMode ? "Edit Product" : "Add New Product"}
              </h2>
              <p className="text-sm text-gray-500">
                {isEditMode ? "Update the product details below" : "Fill in the product details below"}
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Error from mutation */}
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-red-700">{error.message}</p>
            </div>
          )}
          {/* Product Name */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-700">
                Product Name *
              </label>
              <span className="text-xs text-gray-500">
                {formData.name.trim().length}/100
              </span>
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              maxLength={100}
              placeholder="e.g., Elite Vacuum Flask 500ml"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 transition-all"
              style={{
                borderColor: errors.name ? "#dc2626" : "",
              }}
            />
            {errors.name && (
              <p className="text-xs text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          {/* SKU and Category Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* SKU */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">
                  SKU *
                </label>
                <span className="text-xs text-gray-500">
                  {formData.sku.length}/20
                </span>
              </div>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                maxLength={20}
                placeholder="e.g., OHW-VF-001"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 transition-all"
                style={{
                  borderColor: errors.sku ? "#dc2626" : "",
                }}
              />
              {errors.sku && (
                <p className="text-xs text-red-600 mt-1">{errors.sku}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 transition-all bg-white"
                style={{
                  borderColor: errors.category ? "#dc2626" : "",
                }}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryName}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-xs text-red-600 mt-1">{errors.category}</p>
              )}
            </div>
          </div>

          {/* Price and Reorder Point Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price (₱) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price || ""}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 transition-all"
                style={{
                  borderColor: errors.price ? "#dc2626" : "",
                }}
              />
              {errors.price && (
                <p className="text-xs text-red-600 mt-1">{errors.price}</p>
              )}
            </div>

            {/* Reorder Point */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Reorder Point *
              </label>
              <input
                type="number"
                name="reorderPoint"
                value={formData.reorderPoint || ""}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="100"
                min="0"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 transition-all"
                style={{
                  borderColor: errors.reorderPoint ? "#dc2626" : "",
                }}
              />
              {errors.reorderPoint && (
                <p className="text-xs text-red-600 mt-1">{errors.reorderPoint}</p>
              )}
            </div>
          </div>

          {/* Available Units */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Available Units *
            </label>
            <input
              type="number"
              name="available"
              value={formData.available || ""}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="0"
              min="0"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 transition-all"
              style={{
                borderColor: errors.available ? "#dc2626" : "",
              }}
            />
            {errors.available && (
              <p className="text-xs text-red-600 mt-1">{errors.available}</p>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 pt-6" />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3 rounded-xl font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#bf262f" }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {isEditMode ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  <Package size={16} />
                  {isEditMode ? "Update Product" : "Add Product"}
                </>
              )}
            </button>
          </div>
        </form>
        </div>
      </div>
    </>
  );
}
