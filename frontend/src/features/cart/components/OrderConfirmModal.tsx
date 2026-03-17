"use client";

import { useState } from "react";
import { CartItem, Company, DeliveryDetails } from "../types";
import { CART_COLORS, CART_CONFIG } from "../constants/cartConstants";
import { ModalHeader } from "./OrderConfirmModal/ModalHeader";
import { ItemsSummary } from "./OrderConfirmModal/ItemsSummary";
import { CostBreakdown } from "./OrderConfirmModal/CostBreakdown";
import { DeliveryForm } from "./OrderConfirmModal/DeliveryForm";
import { PaymentMethod } from "./OrderConfirmModal/PaymentMethod";
import { ConfirmCheckbox } from "./OrderConfirmModal/ConfirmCheckbox";
import { ModalFooter } from "./OrderConfirmModal/ModalFooter";

interface OrderConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  company: Company;
  subtotal: number;
  itemCount: number;
  moqWarnings: CartItem[];
  delivery: DeliveryDetails;
  errors: Partial<DeliveryDetails>;
  confirmed: boolean;
  placing: boolean;
  onDeliveryChange: (field: keyof DeliveryDetails, value: string) => void;
  onConfirmedChange: (value: boolean) => void;
  onPlaceOrder: () => void;
}

export function OrderConfirmModal({
  isOpen,
  onClose,
  items,
  company,
  subtotal,
  itemCount,
  moqWarnings,
  delivery,
  errors,
  confirmed,
  placing,
  onDeliveryChange,
  onConfirmedChange,
  onPlaceOrder,
}: OrderConfirmModalProps) {
  const { RED, RED_LIGHT } = CART_COLORS;
  const { FREE_DELIVERY_THRESHOLD, DELIVERY_FEE } = CART_CONFIG;
  const [minDeliveryDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [paymentMethod, setPaymentMethod] = useState<"e-payment" | "manual">(
    "e-payment",
  );

  if (!isOpen) return null;

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const grandTotal = subtotal + deliveryFee;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <ModalHeader onClose={onClose} />

        <div className="px-6 py-5 space-y-5">
          <ItemsSummary items={items} itemCount={itemCount} />
          <CostBreakdown
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            grandTotal={grandTotal}
            redColor={RED}
          />
          <PaymentMethod
            selectedMethod={paymentMethod}
            onMethodChange={setPaymentMethod}
          />
          <DeliveryForm
            delivery={delivery}
            errors={errors}
            minDeliveryDate={minDeliveryDate}
            redColor={RED}
            onDeliveryChange={onDeliveryChange}
          />

          <ConfirmCheckbox
            confirmed={confirmed}
            redColor={RED}
            redLightColor={RED_LIGHT}
            onConfirmedChange={onConfirmedChange}
          />
        </div>

        <ModalFooter
          onClose={onClose}
          onPlaceOrder={onPlaceOrder}
          placing={placing}
          redColor={RED}
        />
      </div>
    </div>
  );
}
