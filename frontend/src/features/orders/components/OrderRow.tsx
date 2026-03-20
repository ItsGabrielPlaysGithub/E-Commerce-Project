"use client";

import { useState } from "react";
import type { Order } from "../types/order";
import { OrderDetails } from "./OrderDetails";
import { OrderRowInfo } from "./OrderRowInfo";
import { OrderRowActions } from "./OrderRowActions";
import { PaymentProofUploadModal } from "../../../components/modals/Payment-Proof";

interface OrderRowProps {
  order: Order;
  isExpanded: boolean;
  onExpand: (orderId: string | null) => void;
  index: number;
  isLastItem: boolean;
  onUploadSuccess?: () => void;
}

export function OrderRow({
  order,
  isExpanded,
  onExpand,
  index,
  isLastItem,
  onUploadSuccess,
}: OrderRowProps) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleUploadPaymentProof = async (file: File): Promise<void> => {
    try {
      const orderId =
        typeof order.id === "string" ? parseInt(order.id, 10) : order.id;

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `http://localhost:4000/orders/upload-payment-proof/${orderId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to upload payment proof");
      }

      if (onUploadSuccess) onUploadSuccess();
    } catch (error) {
      console.error("Error uploading payment proof:", error);
      throw error instanceof Error
        ? error
        : new Error("Failed to process payment proof");
    }
  };

  const handleCancelOrder = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    try {
      const orderId =
        typeof order.id === "string" ? parseInt(order.id, 10) : order.id;

      const response = await fetch(
        `http://localhost:4000/orders/${orderId}/cancel`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to cancel order");
      }

      if (onUploadSuccess) onUploadSuccess();
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert(error instanceof Error ? error.message : "Failed to cancel order");
    }
  };

  return (
    <>
      <div className="mb-3 rounded-lg border border-slate-200">
        <div className="px-5 py-8 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-gray-50/50 transition-colors min-h-full relative">
          <OrderRowInfo order={order} />

          <OrderRowActions
            order={order}
            isExpanded={isExpanded}
            onExpand={onExpand}
            onCancelOrder={handleCancelOrder}
            onUploadPayment={() => setIsUploadModalOpen(true)}
          />
        </div>

        {isExpanded && <OrderDetails order={order} />}
      </div>

      <PaymentProofUploadModal
        isOpen={isUploadModalOpen}
        orderId={order.id}
        onClose={() => setIsUploadModalOpen(false)}
        onSubmit={handleUploadPaymentProof}
      />
    </>
  );
}
