import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { placeOrder } from "../services";
import { CartItem, DeliveryDetails } from "../types";

export type CartAuthCompany = {
  userId?: number;
};

export const useOrderPlacement = (
  selectedItems: CartItem[],
  selectedSubtotal: number,
  delivery: DeliveryDetails,
  currentCompany: CartAuthCompany | null,
  removeItems: (ids: string[]) => void,
  setErrors: (errors: Partial<DeliveryDetails>) => void
) => {
  const router = useRouter();
  const [placing, setPlacing] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handlePlaceOrder = useCallback(
    async (validateForm: () => boolean) => {
      if (selectedItems.length === 0) {
        setErrors({ notes: "Select at least one item to checkout." });
        return;
      }

      if (!validateForm()) return;

      if (!confirmed) {
        setErrors({ notes: "Please confirm your order before proceeding." });
        return;
      }

      setPlacing(true);
      try {
        const response = await placeOrder({
          items: selectedItems.map((item: CartItem) => ({
            productId: item.product.id,
            quantity: item.qty,
            unitPrice: item.unitPrice,
          })),
          delivery,
          subtotal: selectedSubtotal,
          deliveryFee: selectedSubtotal >= 3000 ? 0 : 350,
          grandTotal: selectedSubtotal + (selectedSubtotal >= 3000 ? 0 : 350),
        });
        
        removeItems(selectedItems.map((item) => item.product.id));
        router.push(`/b2b/order-success?orderNumber=${response.orderNumber}`);
      } catch (error) {
        console.error("Error placing order:", error);
        setErrors({ notes: "Failed to place order. Please try again." });
      } finally {
        setPlacing(false);
      }
    },
    [selectedItems, confirmed, delivery, selectedSubtotal, currentCompany?.userId, removeItems, router, setErrors]
  );

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setErrors({});
    setConfirmed(false);
  }, [setErrors]);

  return {
    showModal,
    setShowModal,
    confirmed,
    setConfirmed,
    placing,
    handlePlaceOrder,
    handleCloseModal,
  };
};
