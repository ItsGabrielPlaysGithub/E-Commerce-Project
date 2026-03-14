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
  companyId: string;
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

    if (!response.ok) {
      throw new Error(`Failed to place order: ${response.statusText}`);
    }

    const data = (await response.json()) as PlaceOrderResponse;
    return data;
  } catch (error) {
    console.error("Error calling placeOrder :", error);
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
