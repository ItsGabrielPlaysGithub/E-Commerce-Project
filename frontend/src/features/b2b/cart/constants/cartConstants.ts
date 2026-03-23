export const CART_COLORS = {
  RED: "#bf262f",
  RED_LIGHT: "#f9e9ea",
} as const;

export const CART_CONFIG = {
  FREE_DELIVERY_THRESHOLD: 1500, // ₱1500
  DELIVERY_FEE: 350, // ₱350 when below threshold
  MOQ_WARNING_COLOR: "#92400e",
  MOQ_WARNING_BG: "#fffbeb",
  RETAIL_PRICE_COLOR: "#92400e",
} as const;
