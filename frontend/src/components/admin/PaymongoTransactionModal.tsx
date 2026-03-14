'use client';

import { X, AlertCircle, CheckCircle } from "lucide-react";

interface SalesOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  netAmount: number;
  paymongoTransactionId?: string;
  paymongoAmount?: number;
  paymongoPaymentMethod?: string;
  paymongoTimestamp?: string;
}

interface PaymongoTransactionModalProps {
  order: SalesOrder;
  onClose: () => void;
  onMarkAsReady: (order: SalesOrder) => void;
  onReportDiscrepancy: (order: SalesOrder) => void;
  isLoading?: boolean;
}

export function PaymongoTransactionModal({
  order,
  onClose,
  onMarkAsReady,
  onReportDiscrepancy,
  isLoading = false,
}: PaymongoTransactionModalProps) {
  const orderAmount = order.netAmount;
  const chargedAmount = order.paymongoAmount || 0;
  const amountMatch = Math.abs(orderAmount - chargedAmount) < 0.01;
  const amountDifference = chargedAmount - orderAmount;

  const paymentMethodDisplay: Record<string, string> = {
    card: "Credit/Debit Card",
    gcash: "GCash",
    grab_pay: "Grab Pay",
    paymaya: "PayMaya",
    bank_transfer: "Bank Transfer",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div
        className="rounded-2xl overflow-hidden w-full max-w-lg"
        style={{
          background: "white",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        }}
      >
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
              PayMongo Transaction Details
            </h3>
            <p style={{ fontSize: "12px", color: "#94a3b8" }}>
              Order #{order.orderNumber} • {order.customerName}
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
          {/* Amount Verification */}
          <div
            className="rounded-lg p-4"
            style={{
              background: amountMatch ? "#ecfdf5" : "#fef2f2",
              border: `1px solid ${amountMatch ? "#bbf7d0" : "#fecaca"}`,
            }}
          >
            <div className="flex items-start gap-3">
              {amountMatch ? (
                <CheckCircle size={20} color="#16a34a" style={{ flexShrink: 0 }} />
              ) : (
                <AlertCircle size={20} color="#dc2626" style={{ flexShrink: 0 }} />
              )}
              <div className="flex-1">
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: amountMatch ? "#16a34a" : "#dc2626",
                    marginBottom: "4px",
                  }}
                >
                  {amountMatch ? "Amount Match ✓" : "Amount Discrepancy ⚠"}
                </p>
                <p style={{ fontSize: "12px", color: amountMatch ? "#16a34a" : "#dc2626" }}>
                  Expected: ₱{orderAmount.toLocaleString("en-PH")} | Charged: ₱
                  {chargedAmount.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                </p>
                {!amountMatch && (
                  <p style={{ fontSize: "11px", color: "#dc2626", marginTop: "4px" }}>
                    Difference: {amountDifference > 0 ? "+" : ""}₱
                    {Math.abs(amountDifference).toLocaleString("en-PH", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="space-y-3">
            <p
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#374151",
              }}
            >
              Transaction Information
            </p>

            <div
              className="rounded-lg overflow-hidden"
              style={{ border: "1px solid #f1f5f9" }}
            >
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: "1px solid #f8fafc" }}
              >
                <p style={{ fontSize: "12px", color: "#64748b" }}>Transaction ID</p>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#0f172a",
                    fontFamily: "monospace",
                  }}
                >
                  {order.paymongoTransactionId}
                </p>
              </div>

              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: "1px solid #f8fafc" }}
              >
                <p style={{ fontSize: "12px", color: "#64748b" }}>Payment Method</p>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "#0f172a" }}>
                  {paymentMethodDisplay[order.paymongoPaymentMethod || "card"] ||
                    order.paymongoPaymentMethod}
                </p>
              </div>

              <div className="flex items-center justify-between px-4 py-3">
                <p style={{ fontSize: "12px", color: "#64748b" }}>Timestamp</p>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "#0f172a" }}>
                  {order.paymongoTimestamp
                    ? new Date(order.paymongoTimestamp).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-6 py-4 flex gap-3"
          style={{ borderTop: "1px solid #f1f5f9" }}
        >
          {!amountMatch && (
            <button
              onClick={() => onReportDiscrepancy(order)}
              disabled={isLoading}
              className="flex-1 py-2.5 rounded-lg transition-all"
              style={{
                background: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#dc2626",
                fontSize: "13px",
                fontWeight: 600,
                opacity: isLoading ? 0.6 : 1,
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
            >
              {isLoading ? "Processing..." : "Report Discrepancy"}
            </button>
          )}

          <button
            onClick={() => onMarkAsReady(order)}
            disabled={isLoading || !amountMatch}
            className="flex-1 py-2.5 rounded-lg transition-all"
            style={{
              background: amountMatch ? "#dcfce7" : "#f1f5f9",
              border: amountMatch ? "1px solid #bbf7d0" : "1px solid #e2e8f0",
              color: amountMatch ? "#16a34a" : "#94a3b8",
              fontSize: "13px",
              fontWeight: 600,
              opacity: isLoading ? 0.6 : !amountMatch ? 0.5 : 1,
              cursor:
                isLoading || !amountMatch ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? "Processing..." : "Mark as Ready for Delivery"}
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
  );
}
