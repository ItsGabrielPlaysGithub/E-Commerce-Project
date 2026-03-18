'use client';

import { X, CheckCircle, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { formatDateWithTime } from "@/utils/dateFormatter";

interface SalesOrder {
  orderId: string;
  orderNumber: string;
  userId: number;
  paymentProofImage?: string;
  paymentProofUploadedAt?: string;
}

interface PaymentProofModalProps {
  isOpen: boolean;
  order: SalesOrder;
  onClose: () => void;
  onApprove: (order: SalesOrder) => void;
  onReject: (order: SalesOrder) => void;
  isLoading?: boolean;
}

export function PaymentProofModal({
  isOpen,
  order,
  onClose,
  onApprove,
  onReject,
  isLoading = false,
}: PaymentProofModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50"
        style={{
          background: "rgba(0,0,0,0.5)",
          animation: isOpen
            ? "fadeIn 0.2s ease-out"
            : "fadeOut 0.2s ease-out forwards",
        }}
        onClick={onClose}
        onAnimationEnd={() => {
          if (!isOpen) setIsAnimating(false);
        }}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="rounded-2xl overflow-hidden w-full max-w-2xl pointer-events-auto"
          style={{
            background: "white",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            animation: isOpen
              ? "slideUp 0.3s ease-out"
              : "slideDown 0.2s ease-out forwards",
          }}
          onAnimationEnd={() => {
            if (!isOpen) setIsAnimating(false);
          }}
        >
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes fadeOut {
              from { opacity: 1; }
              to { opacity: 0; }
            }
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes slideDown {
              from {
                opacity: 1;
                transform: translateY(0);
              }
              to {
                opacity: 0;
                transform: translateY(20px);
              }
            }
          `}</style>
        {/* Header */}
        <div
          className="px-6 py-4 flex items-center justify-between"
          style={{ borderBottom: "1px solid #f1f5f9" }}
        >
          <div>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              Payment Proof Verification
            </h3>
            <p style={{ fontSize: "12px", color: "#94a3b8" }}>
              Order #{order.orderNumber} • Customer #{order.userId}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 hover:bg-slate-100"
            disabled={isLoading}
          >
            <X size={16} color="#64748b" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 flex flex-col gap-5">
          {/* Image Display */}
          {order.paymentProofImage ? (
            <div className="w-full">
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "12px",
                }}
              >
                Uploaded Proof
              </p>
              <div
                className="rounded-lg overflow-hidden"
                style={{
                  border: "1px solid #e2e8f0",
                  background: "#f8fafc",
                  maxHeight: "400px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={order.paymentProofImage}
                  alt="Payment proof"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "400px",
                    objectFit: "contain",
                  }}
                />
              </div>
              {order.paymentProofUploadedAt && (
                <p
                  style={{
                    fontSize: "11px",
                    color: "#94a3b8",
                    marginTop: "8px",
                  }}
                >
                  Uploaded: {formatDateWithTime(order.paymentProofUploadedAt)}
                </p>
              )}
            </div>
          ) : (
            <div
              className="rounded-lg p-8 text-center"
              style={{
                border: "1px solid #f1f5f9",
                background: "#f8fafc",
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  color: "#94a3b8",
                }}
              >
                No payment proof image available
              </p>
            </div>
          )}

          {/* Instructions */}
          <div
            className="rounded-lg p-4"
            style={{
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#1e40af",
                marginBottom: "6px",
              }}
            >
              ℹ️ Verification Instructions
            </p>
            <ul
              style={{
                fontSize: "12px",
                color: "#1e40af",
                lineHeight: "1.6",
              }}
            >
              <li>• Verify the amount matches the order total</li>
              <li>• Check the sender details match the customer</li>
              <li>• Confirm the transaction date is recent</li>
              <li>• Look for any signs of forgery or manipulation</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-6 py-4 flex gap-3"
          style={{ borderTop: "1px solid #f1f5f9" }}
        >
          <button
            onClick={() => onReject(order)}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all"
            style={{
              background: "#fee2e2",
              border: "1px solid #fecaca",
              color: "#dc2626",
              fontSize: "13px",
              fontWeight: 600,
              opacity: isLoading ? 0.6 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            <XCircle size={14} />
            {isLoading ? "Processing..." : "Reject Payment"}
          </button>

          <button
            onClick={() => onApprove(order)}
            disabled={isLoading || !order.paymentProofImage}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all"
            style={{
              background: order.paymentProofImage ? "#dcfce7" : "#f1f5f9",
              border: order.paymentProofImage ? "1px solid #bbf7d0" : "1px solid #e2e8f0",
              color: order.paymentProofImage ? "#16a34a" : "#94a3b8",
              fontSize: "13px",
              fontWeight: 600,
              opacity: isLoading || !order.paymentProofImage ? 0.6 : 1,
              cursor: isLoading || !order.paymentProofImage ? "not-allowed" : "pointer",
            }}
          >
            <CheckCircle size={14} />
            {isLoading ? "Processing..." : "Approve Payment"}
          </button>

          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2.5 rounded-lg transition-all"
            style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              color: "#64748b",
              fontSize: "13px",
              fontWeight: 600,
              opacity: isLoading ? 0.6 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            Close
          </button>
        </div>
        </div>
      </div>
    </>
  );
}
