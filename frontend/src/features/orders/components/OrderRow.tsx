"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, MoreVertical } from "lucide-react";
import type { Order } from "../types/order";
import { STATUS_CONFIG, PAY_CONFIG } from "../constants/orderConfig";
import { getStatusLabel } from "@/utils/statusMapper";
import { formatDateWithTime2DigitYear } from "@/utils/dateFormatter";
import { OrderDetails } from "./OrderDetails";
import { PaymentProofUploadModal } from "../../../components/modals/PaymentProofUploadModal";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const StatusIcon = STATUS_CONFIG[order.status]?.icon;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMenuOpen]);

  const handleUploadPaymentProof = async (file: File): Promise<void> => {
    try {
      // Parse orderId to number (handle both string and number)
      const orderId =
        typeof order.id === "string" ? parseInt(order.id, 10) : order.id;

      // Create FormData for multipart file upload
      const formData = new FormData();
      formData.append("file", file);

      // Upload payment proof to backend
      const response = await fetch(
        `http://localhost:4000/orders/upload-payment-proof/${orderId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Failed to upload payment proof"
        );
      }

      const result = await response.json();
      console.log("Payment proof uploaded successfully:", result);

      // Backend already updated the order status - refetch orders to get latest status
      if (onUploadSuccess) {
        onUploadSuccess();
      }
      
      console.log("Payment proof upload complete. Order refreshed with new status.", order.id);
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

      console.log("Order cancelled successfully:", order.id);
      setIsMenuOpen(false);
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert(error instanceof Error ? error.message : "Failed to cancel order");
    }
  };

  return (
    <>
      <div className="mb-3 rounded-lg border border-slate-200">
        <div className="px-5 py-8 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-gray-50/50 transition-colors min-h-full relative">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-sm font-bold text-gray-800">
                {order.id}
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded font-medium"
                style={{ backgroundColor: "#f1f5f9", color: "#475569" }}
              >
                {order.sapSo}
              </span>
              <span
                className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium"
                style={{
                  backgroundColor: STATUS_CONFIG[order.status]?.bg,
                  color: STATUS_CONFIG[order.status]?.color,
                }}
              >
                {StatusIcon && <StatusIcon size={10} />}
                {getStatusLabel(order.status)}
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{
                  backgroundColor: PAY_CONFIG[order.paymentStatus]?.bg,
                  color: PAY_CONFIG[order.paymentStatus]?.color,
                }}
              >
                {order.paymentStatus}
              </span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1.5">
              <span className="text-xs text-gray-500">Ordered: {formatDateWithTime2DigitYear(order.date)}</span>
              {order.deliveryDate && (
                <span className="text-xs text-gray-500">
                  {order.status === "DELIVERED" ? "Delivered" : "ETA"}:{" "}
                  {order.deliveryDate}
                </span>
              )}
            </div>
            <div className="text-xs text-gray-600 mt-1 truncate">
              {order.items.map((it) => `${it.name} ×${it.qty}`).join(" · ")}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <div className="font-bold text-gray-800 text-sm">
                ₱{order.total.toLocaleString()}
              </div>
              <div className="text-gray-400" style={{ fontSize: "0.65rem" }}>
                incl. delivery
              </div>
            </div>

            {/* 3-Dot Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
                title="More actions"
              >
                <MoreVertical size={16} />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="py-1">
                    {/* Cancel Order */}
                    <button
                      onClick={handleCancelOrder}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel Order
                    </button>

                    {/* Upload Proof of Payment */}
                    <button
                      onClick={() => {
                        setIsUploadModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                       Upload Payment Proof
                    </button>

                    {/* View Details */}
                    <button
                      onClick={() => {
                        onExpand(isExpanded ? null : order.id);
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      {isExpanded ? "Close Details" : "View Details"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
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
