"use client";

import { useCartLogic } from "./hooks/useCartLogic";
import {
  CartEmpty,
  CartItems,
  CartSummary,
  OrderConfirmModal,
} from "./components/index";
import { CART_COLORS } from "./constants/index";

export function Cart() {
  const {
    company,
    items,
    selectedItems,
    selectedItemIds,
    itemCount,
    selectedItemCount,
    selectedSubtotal,
    tier,
    showModal,
    setShowModal,
    delivery,
    setDelivery,
    confirmed,
    setConfirmed,
    errors,
    setErrors,
    placing,
    selectedMoqWarnings,
    hasSelectedItems,
    handlePlaceOrder,
    handleCloseModal,
    onUpdateQty,
    onRemoveItem,
    onToggleItemSelection,
  } = useCartLogic();

  if (!company) return null;
  if (items.length === 0) return <CartEmpty />;

  return (
    <div className="bg-gray-50 min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-6 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <a href="/b2b/home" className="hover:text-red-600">
                Home
              </a>
              <span>/</span>
              <span className="text-gray-600">Order Cart</span>
            </div>
            <h1
              className="text-gray-900"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "1.5rem",
              }}
            >
              Order Cart
            </h1>
            <p className="text-gray-400 text-xs mt-0.5">
              {itemCount} items · {tier} pricing active
            </p>
          </div>
          <a
            href="../app/b2b/products"
            style={{ color: CART_COLORS.RED }}
            className="text-sm font-semibold flex items-center gap-1.5 hover:opacity-80 transition-opacity"
          >
            + Add More Products
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CartItems
          items={items}
          company={company}
          moqWarnings={selectedMoqWarnings}
          selectedItemIds={selectedItemIds}
          onUpdateQty={onUpdateQty}
          onRemoveItem={onRemoveItem}
          onToggleItemSelection={onToggleItemSelection}
        />

        <CartSummary
          items={selectedItems}
          company={company}
          subtotal={selectedSubtotal}
          itemCount={selectedItemCount}
          hasSelectedItems={hasSelectedItems}
          onProceed={() => hasSelectedItems && setShowModal(true)}
        />
      </div>

      <OrderConfirmModal
        isOpen={showModal}
        onClose={handleCloseModal}
        items={selectedItems}
        company={company}
        subtotal={selectedSubtotal}
        itemCount={selectedItemCount}
        moqWarnings={selectedMoqWarnings}
        delivery={delivery}
        errors={errors}
        confirmed={confirmed}
        placing={placing}
        onDeliveryChange={(field, value) =>
          setDelivery((prev) => ({ ...prev, [field]: value }))
        }
        onConfirmedChange={(value) => {
          setConfirmed(value);
          setErrors((prev) => ({ ...prev, notes: undefined }));
        }}
        onPlaceOrder={handlePlaceOrder}
      />
    </div>
  );
}
