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
      // Provide specific error messages based on status code
      const errorMsg = data?.error || data?.message || response.statusText;
      const contextMessage = getErrorContext(response.status, errorMsg);
      
      console.error(
        "[placeOrder] API Error:",
        {
          status: response.status,
          statusText: response.statusText,
          error: errorMsg,
          fullData: data,
          itemsCount: payload.items.length,
        }
      );
      
      throw new Error(contextMessage || errorMsg || "Failed to place order");
    }

    // Log partial failures if any
    if (data?.failedItems && data.failedItems.length > 0) {
      console.warn("[placeOrder] Partial order failure:", {
        createdItems: data.itemsCount,
        totalItems: payload.items.length,
        failedItems: data.failedItems,
      });
    }

    return data as PlaceOrderResponse;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[placeOrder] Exception:", {
      message: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
      itemsCount: payload.items.length,
    });
    throw error;
  }
}

/**
 * Provide more context-specific error messages
 */
function getErrorContext(status: number, errorMsg: string): string {
  switch (status) {
    case 401:
      return "You need to be logged in to place an order.";
    case 403:
      return "Invalid request. Please refresh the page and try again.";
    case 429:
      return "Too many order attempts. Please wait a moment and try again.";
    case 400:
      return errorMsg || "Invalid order data. Please check your items and delivery details.";
    case 500:
      return "Server error. Please try again in a moment.";
    default:
      return errorMsg;
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
