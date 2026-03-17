'use client';

import { MoreVertical, Edit2, Eye, FileText, Printer, X, Calendar, CreditCard, AlertTriangle, CheckCircle } from "lucide-react";
import { useState } from "react";

interface SalesOrder {
  orderId: string;
  orderNumber: string;
  userId: number;
  productId: number;
  orderType?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  status: string;
  deliveryStatus?: string;
  paymentMethod?: string;
  paymentProofImage?: string;
  paymentProofUploadedAt?: string;
  paymongoTransactionId?: string;
  paymongoAmount?: number;
  paymongoPaymentMethod?: string;
  paymongoTimestamp?: string;
  createdAt: string;
  updatedAt: string;
}

function StatusBadge({ status }: { status: string }) {
  const statusColors: Record<string, { bg: string; color: string }> = {
    PENDING_APPROVAL: { bg: "#fffbeb", color: "#d97706" },
    APPROVED: { bg: "#eff6ff", color: "#2563eb" },
    DELIVERED: { bg: "#ecfdf5", color: "#16a34a" },
    PAID: { bg: "#f3f4f6", color: "#6b7280" },
    READY_FOR_BILLING: { bg: "#fef3c7", color: "#ca8a04" },
  };

  const style = statusColors[status] || { bg: "#f3f4f6", color: "#6b7280" };
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{
        backgroundColor: style.bg,
        color: style.color,
        border: `1px solid ${style.color}30`,
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: style.color }} />
      {status}
    </span>
  );
}

function OrderTypeBadge({ type }: { type: string }) {
  const typeColors: Record<string, { bg: string; color: string }> = {
    Bulk: { bg: "#f9e9ea", color: "#bf262f" },
    Wholesale: { bg: "#eff6ff", color: "#2563eb" },
    Retail: { bg: "#f0fdf4", color: "#16a34a" },
  };

  const style = typeColors[type] || typeColors["Retail"];
  return (
    <span
      className="text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{
        backgroundColor: style.bg,
        color: style.color,
      }}
    >
      {type}
    </span>
  );
}

function PaymentMethodBadge({ method }: { method: string }) {
  const methodColors: Record<string, { bg: string; color: string }> = {
    paymongo: { bg: "#ecfdf5", color: "#059669" },
    manual_transfer: { bg: "#fef3c7", color: "#d97706" },
  };

  const style = methodColors[method] || methodColors["paymongo"];
  const label = method === "paymongo" ? "PayMongo" : "Bank Transfer";

  return (
    <span
      className="text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{
        backgroundColor: style.bg,
        color: style.color,
      }}
    >
      {label}
    </span>
  );
}

function ActionsMenu({
  order,
  onViewDetails,
  onViewPaymentProof,
  onApprovePayment,
  onRejectPayment,
  onViewPaymongoDetails,
  onMarkAsReadyForDelivery,
  onReportDiscrepancy,
  onViewInvoice,
  onCancelOrder,
  onAdjustDelivery,
  onPrint,
}: {
  order: SalesOrder;
  onViewDetails?: (order: SalesOrder) => void;
  onViewPaymentProof?: (order: SalesOrder) => void;
  onApprovePayment?: (order: SalesOrder) => void;
  onRejectPayment?: (order: SalesOrder) => void;
  onViewPaymongoDetails?: (order: SalesOrder) => void;
  onMarkAsReadyForDelivery?: (order: SalesOrder) => void;
  onReportDiscrepancy?: (order: SalesOrder) => void;
  onViewInvoice?: (order: SalesOrder) => void;
  onCancelOrder?: (order: SalesOrder) => void;
  onAdjustDelivery?: (order: SalesOrder) => void;
  onPrint?: (order: SalesOrder) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setButtonPosition({
      top: rect.bottom + 8,
      left: rect.left - 220,
    });
    setIsOpen(!isOpen);
  };

  const actions = [];

  // Always available
  actions.push({
    label: "View Details",
    icon: Eye,
    onClick: () => { onViewDetails?.(order); setIsOpen(false); },
  });

  // PayMongo payment verification
  if (order.paymentMethod === "paymongo" && order.status === "PAID") {
    actions.push({
      label: "View PayMongo Details",
      icon: CreditCard,
      onClick: () => { onViewPaymongoDetails?.(order); setIsOpen(false); },
    });
    actions.push({
      label: "Mark as Ready for Delivery",
      icon: CheckCircle,
      onClick: () => { onMarkAsReadyForDelivery?.(order); setIsOpen(false); },
    });
  }

  // Manual payment workflow
  if (order.paymentMethod === "manual_transfer" && order.status === "READY_FOR_BILLING") {
    actions.push({
      label: "View Payment Proof",
      icon: FileText,
      onClick: () => { onViewPaymentProof?.(order); setIsOpen(false); },
    });
  }

  // Status-specific actions for paid/delivered orders
  if (order.status === "PENDING_APPROVAL") {
    actions.push({
      label: "Adjust Delivery Date",
      icon: Calendar,
      onClick: () => { onAdjustDelivery?.(order); setIsOpen(false); },
    });
    actions.push({
      label: "Cancel Order",
      icon: X,
      onClick: () => { onCancelOrder?.(order); setIsOpen(false); },
    });
  }

  if (order.status === "APPROVED") {
    actions.push({
      label: "Adjust Delivery Date",
      icon: Calendar,
      onClick: () => { onAdjustDelivery?.(order); setIsOpen(false); },
    });
  }

  if (["DELIVERED", "PAID"].includes(order.status)) {
    actions.push({
      label: "View Invoice",
      icon: FileText,
      onClick: () => { onViewInvoice?.(order); setIsOpen(false); },
    });
  }

  return (
    <div className="flex items-center gap-1">
      {/* Print Button */}
      <button
        onClick={() => onPrint?.(order)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
        title="Print order"
      >
        <Printer size={16} />
      </button>

      {/* More Actions Dropdown */}
      <div>
        <button
          onClick={handleMenuOpen}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          title="More options"
        >
          <MoreVertical size={16} />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            <div
              className="fixed w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
              style={{
                top: buttonPosition.top,
                left: buttonPosition.left,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              }}
            >
              {actions.map((action) => (
                <button
                  key={action.label}
                  onClick={action.onClick}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-left transition-colors hover:bg-gray-50 text-gray-700"
                >
                  <action.icon size={14} />
                  {action.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

interface SalesOrdersTableProps {
  orders: SalesOrder[];
  emptyMessage?: string;
  onViewDetails?: (order: SalesOrder) => void;
  onViewPaymentProof?: (order: SalesOrder) => void;
  onApprovePayment?: (order: SalesOrder) => void;
  onRejectPayment?: (order: SalesOrder) => void;
  onViewPaymongoDetails?: (order: SalesOrder) => void;
  onMarkAsReadyForDelivery?: (order: SalesOrder) => void;
  onReportDiscrepancy?: (order: SalesOrder) => void;
  onViewInvoice?: (order: SalesOrder) => void;
  onCancelOrder?: (order: SalesOrder) => void;
  onAdjustDelivery?: (order: SalesOrder) => void;
  onPrint?: (order: SalesOrder) => void;
}

export function SalesOrdersTable({
  orders,
  emptyMessage = "No sales orders found",
  onViewDetails,
  onViewPaymentProof,
  onApprovePayment,
  onRejectPayment,
  onViewPaymongoDetails,
  onMarkAsReadyForDelivery,
  onReportDiscrepancy,
  onViewInvoice,
  onCancelOrder,
  onAdjustDelivery,
  onPrint,
}: SalesOrdersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Pagination calculations
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = orders.slice(startIndex, endIndex);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col">
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-sm" style={{ minWidth: "100%" }}>
          <thead>
            <tr
              className="border-b border-gray-100"
              style={{ backgroundColor: "#fafafa" }}
            >
              {[
                "SO Number",
                "Customer",
                "Type",
                "Payment",
                "Date",
                "Delivery",
                "Amount",
                "Status",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <tr
                  key={order.orderNumber || order.orderId}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-5 py-3.5 font-mono text-xs text-gray-600 whitespace-nowrap">
                    {order.orderNumber}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-gray-800 whitespace-nowrap">
                      Customer #{order.userId}
                    </div>
                    <div className="text-xs text-gray-400">Product #{order.productId}</div>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <OrderTypeBadge type={order.orderType || "Retail"} />
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <PaymentMethodBadge method={order.paymentMethod || ""} />
                  </td>
                  <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-PH') : '-'}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <StatusBadge status={order.deliveryStatus || ""} />
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-gray-800 whitespace-nowrap">
                    ₱{(order.totalPrice || 0).toLocaleString('en-PH')}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <div className="flex justify-center">
                      <ActionsMenu
                        order={order}
                        onViewDetails={onViewDetails}
                        onViewPaymentProof={onViewPaymentProof}
                        onApprovePayment={onApprovePayment}
                        onRejectPayment={onRejectPayment}
                        onViewPaymongoDetails={onViewPaymongoDetails}
                        onMarkAsReadyForDelivery={onMarkAsReadyForDelivery}
                        onReportDiscrepancy={onReportDiscrepancy}
                        onViewInvoice={onViewInvoice}
                        onCancelOrder={onCancelOrder}
                        onAdjustDelivery={onAdjustDelivery}
                        onPrint={onPrint}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="px-5 py-8 text-center text-sm text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderTop: "1px solid #f1f5f9", background: "#fafafa" }}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors"
            style={{
              borderColor: currentPage === 1 ? "#e5e7eb" : "#d1d5db",
              color: currentPage === 1 ? "#d1d5db" : "#6b7280",
              backgroundColor: currentPage === 1 ? "#f3f4f6" : "white",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
          >
            ← Previous
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className="w-8 h-8 rounded-lg text-xs font-semibold transition-all"
                style={{
                  backgroundColor: currentPage === page ? "#bf262f" : "#f3f4f6",
                  color: currentPage === page ? "white" : "#6b7280",
                  border: currentPage === page ? "1px solid #bf262f" : "1px solid #e5e7eb",
                  cursor: "pointer",
                }}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors"
            style={{
              borderColor: currentPage === totalPages ? "#e5e7eb" : "#d1d5db",
              color: currentPage === totalPages ? "#d1d5db" : "#6b7280",
              backgroundColor: currentPage === totalPages ? "#f3f4f6" : "white",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            Next →
          </button>
        </div>

        <p style={{ fontSize: "12px", color: "#6b7280" }}>
          Showing {startIndex + 1}-{Math.min(endIndex, orders.length)} of {orders.length} orders
        </p>
      </div>
    </div>
  );
}
