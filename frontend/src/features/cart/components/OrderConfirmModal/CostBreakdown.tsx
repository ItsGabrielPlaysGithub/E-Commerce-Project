import { CART_CONFIG } from "../../constants/cartConstants";

interface CostBreakdownProps {
  subtotal: number;
  deliveryFee: number;
  grandTotal: number;
  redColor: string;
}

export function CostBreakdown({ subtotal, deliveryFee, grandTotal, redColor }: CostBreakdownProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
      <div className="flex justify-between text-gray-500">
        <span>Subtotal</span>
        <span>₱{subtotal.toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-gray-500">
        <span>Delivery</span>
        <span>{deliveryFee === 0 ? "FREE" : `₱${deliveryFee}`}</span>
      </div>
      <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-200">
        <span>Total</span>
        <span style={{ color: redColor }}>₱{grandTotal.toLocaleString()}</span>
      </div>
    </div>
  );
}
