"use client";

import { Eye } from "lucide-react";
import type { Invoice } from "../services/invoiceService";
import { getStatusColor, getStatusLabel } from "@/utils/statusMapper";

interface InvoiceRowProps {
  invoice: Invoice;
  onViewDetails?: (invoice: Invoice) => void;
}

export const InvoiceRow = ({
  invoice,
  onViewDetails,
}: InvoiceRowProps) => {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      {/* Billing Document (Invoice Number) */}
      <td className="px-4 py-3 text-sm font-medium text-gray-900">{invoice.invoiceNumber}</td>

      {/* Customer (Order/User) */}
      <td className="px-4 py-3 text-sm text-gray-700">
        <div className="font-medium">Order #{invoice.orderId}</div>
        <div className="text-xs text-gray-500">User #{invoice.userId}</div>
      </td>

      {/* Sales Order Ref (OrderId) */}
      <td className="px-4 py-3 text-sm text-gray-700">{invoice.orderId}</td>

      {/* Billing Date (createdAt) */}
      <td className="px-4 py-3 text-sm text-gray-700">{new Date(invoice.createdAt).toLocaleDateString("en-PH")}</td>

      {/* Due Date */}
      <td className="px-4 py-3 text-sm text-gray-700">{new Date(invoice.dueDate).toLocaleDateString("en-PH")}</td>

      {/* Gross Amount */}
      <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">₱{invoice.totalAmount.toLocaleString("en-PH")}</td>

      {/* Balance Due */}
      <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">
        {invoice.paymentStatus === "PAID" ? "₱0" : `₱${invoice.totalAmount.toLocaleString("en-PH")}`}
      </td>

      {/* Payment Status Badge */}
      <td className="px-4 py-3 text-sm">
        {(() => {
          const colors = getStatusColor(invoice.paymentStatus);
          return (
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: colors.bg,
                border: `1px solid ${colors.border}`,
                color: colors.text,
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: colors.text }}
              />
              {getStatusLabel(invoice.paymentStatus)}
            </span>
          );
        })()}
      </td>

      {/* Actions */}
      <td className="px-4 py-3 text-sm">
        <div className="flex items-center gap-2">
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(invoice)}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
              title="View Invoice"
            >
              <Eye size={16} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};
