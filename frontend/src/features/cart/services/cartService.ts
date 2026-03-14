import { DeliveryDetails } from "../types";

interface PlaceOrderPayload {
  items: Array<{
    productId: string;
    quantity: number;
    unitPrice: number;
  }>;
  delivery: DeliveryDetails;
  subtotal: number;
  deliveryFee: number;
  grandTotal: number;
  companyId?: string;
}

interface PlaceOrderResponse {
  success: boolean;
  orderNumber: string;
  message: string;
}

/**
 * Place an order via backend API
 * The backend generates the order number and persists the order
 */
export async function placeOrder(payload: PlaceOrderPayload): Promise<PlaceOrderResponse> {
  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json() as any;

    if (!response.ok) {
      const errorMsg = data?.error || data?.message || response.statusText;
      throw new Error(errorMsg || "Failed to place order");
    }

    return data as PlaceOrderResponse;
  } catch (error) {
    console.error("Error calling placeOrder:", error);
    throw error;
  }
}

/**
 * Validate delivery details before submission
 */
export function validateDeliveryDetails(delivery: DeliveryDetails) {
  const errors: Partial<DeliveryDetails> = {};

  if (!delivery.address.trim()) {
    errors.address = "Delivery address is required.";
  }
  if (!delivery.contactPerson.trim()) {
    errors.contactPerson = "Contact person is required.";
  }
  if (!delivery.contactNumber.trim()) {
    errors.contactNumber = "Contact number is required.";
  }
  if (!delivery.deliveryDate) {
    errors.deliveryDate = "Preferred delivery date is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
