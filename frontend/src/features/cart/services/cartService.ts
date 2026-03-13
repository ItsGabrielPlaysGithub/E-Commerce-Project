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

/**
 * Placeholder for placing an order via API
 * Replace with your actual API endpoint
 */
export async function placeOrder(payload: PlaceOrderPayload) {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        orderId: `ORD-${Date.now()}`,
        message: "Order placed successfully",
      });
    }, 1500);
  });
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
