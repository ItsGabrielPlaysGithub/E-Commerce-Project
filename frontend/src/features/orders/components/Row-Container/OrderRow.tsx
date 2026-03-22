"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { Order } from "../../types/order";
import { OrderDetails } from "../OrderDetails";
import { OrderRowInfo } from "./OrderRowInfo";
import { OrderRowActions } from "./OrderRowActions";
import { PaymentProofUploadModal } from "../../../../components/modals/Payment-Proof";
import { useUpdateOrderStatus } from "../../hooks/use-update-order-status";

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
  const [transitionOrderStatus] = useUpdateOrderStatus();

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

      toast.success("Payment proof uploaded successfully!");
      if (onUploadSuccess) onUploadSuccess();
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to process payment proof";
      toast.error(errorMsg);
      throw error instanceof Error ? error : new Error(errorMsg);
    }
  };

  const handleCancelOrder = async () => {
    try {
      const orderId =
        typeof order.id === "string" ? parseInt(order.id, 10) : order.id;

      await transitionOrderStatus({
        variables: {
          input: {
            orderId,
            nextStatus: "CANCELLED",
            rejectionReason: "Order cancelled by B2B customer",
          },
        },
      });

      toast.success("Order cancelled successfully!");
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Error cancelling order";
      toast.error(errorMsg);
      console.error("Error cancelling order:", error);
    }
  };

  const isCancelled = order.status === "CANCELLED";

  return (
    <>
      <div className={`mb-3 rounded-lg border ${isCancelled ? "border-gray-300 bg-gray-50" : "border-slate-200"}`}>
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
