import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { usePlaceOrder } from "../services";
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
  const [placeOrderMutation] = usePlaceOrder();

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

      // Check authentication before attempting order
      if (!currentCompany?.userId) {
        setErrors({ notes: "Please log in to place an order." });
        return;
      }

      setPlacing(true);
      try {
        const mutationInput = {
          items: selectedItems.map((item: CartItem) => ({
            productId: parseInt(String(item.product.id), 10),
            quantity: parseInt(String(item.qty), 10),
            unitPrice: parseFloat(String(item.unitPrice)),
          })),
          delivery,
          subtotal: parseFloat(String(selectedSubtotal)),
          deliveryFee: parseFloat(String(selectedSubtotal >= 1500 ? 0 : 350)),
          grandTotal: parseFloat(String(selectedSubtotal + (selectedSubtotal >= 1500 ? 0 : 350))),
          userId: currentCompany?.userId || 0,
          companyId: currentCompany?.userId?.toString(),
        };

        console.log("[useOrderPlacement] Sending mutation with input:", JSON.stringify(mutationInput, null, 2));

        const result = await placeOrderMutation({
          variables: {
            input: mutationInput,
          },
        });

        console.log("[useOrderPlacement] Mutation response:", result);

        const responseData = result.data as any;
        if (!responseData?.placeOrder) {
          const noDataMessage = "No response from server. Please try again.";
          console.error("[useOrderPlacement] No data returned:", responseData);
          setErrors({ notes: noDataMessage });
          return;
        }

        const { placeOrder } = responseData;
        removeItems(selectedItems.map((item) => item.product.id));
        router.push(`/b2b/order-success?orderNumber=${placeOrder.orderNumber}`);
      } catch (error) {
        let errorMessage = "Failed to place order";

        try {
          if (error instanceof Error) {
            errorMessage = error.message;
            console.error("[useOrderPlacement] Order placement exception:", {
              message: error.message,
              name: error.name,
              stack: error.stack,
            });
          } else if (typeof error === 'object' && error !== null) {
            const errorObj = error as any;
            console.error("[useOrderPlacement] Order placement exception:", {
              message: errorObj.message || 'Unknown error',
              networkError: errorObj.networkError,
              graphQLErrors: errorObj.graphQLErrors,
              statusCode: errorObj.statusCode,
              originalError: errorObj.originalError,
            });
            errorMessage = errorObj.message || "Failed to place order";
          } else {
            console.error("[useOrderPlacement] Order placement exception:", String(error));
          }
        } catch (logError) {
          console.error("[useOrderPlacement] Failed to log error properly:", String(logError));
        }

        setErrors({ notes: errorMessage });
      } finally {
        setPlacing(false);
      }
    },
    [selectedItems, confirmed, delivery, selectedSubtotal, currentCompany?.userId, removeItems, router, setErrors, placeOrderMutation]
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
