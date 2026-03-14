import { PlaceOrderRequest } from "./types";
import { parseProductId } from "./products";

export type ValidationResult = {
  ok: boolean;
  status?: number;
  error?: string;
};

export function validateOrderPayload(body: PlaceOrderRequest): ValidationResult {
  if (!body.items || body.items.length === 0) {
    return { ok: false, status: 400, error: "Cart cannot be empty." };
  }

  if (body.items.length > 100) {
    return { ok: false, status: 400, error: "Order contains too many items." };
  }

  if (!body.delivery?.address?.trim() || !body.delivery?.contactPerson?.trim()) {
    return { ok: false, status: 400, error: "Incomplete delivery information." };
  }

  for (let i = 0; i < body.items.length; i++) {
    const item = body.items[i];

    if (!Number.isInteger(item.quantity) || item.quantity <= 0 || item.quantity > 10000) {
      return { ok: false, status: 400, error: `Invalid quantity for item ${i + 1}.` };
    }

    if (!parseProductId(item.productId)) {
      return { ok: false, status: 400, error: `Invalid product identifier for item ${i + 1}.` };
    }
  }

  if (typeof body.subtotal !== "number" || body.subtotal < 0 || body.subtotal > 10000000) {
    return { ok: false, status: 400, error: "Invalid order total." };
  }

  return { ok: true };
}
