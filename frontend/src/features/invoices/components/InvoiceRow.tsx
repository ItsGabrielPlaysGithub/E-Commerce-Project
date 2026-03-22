"use client";


import { Eye } from "lucide-react";
import type { Invoice } from "../services/invoiceService";

interface InvoiceRowProps {
  invoice: Invoice;
  onViewDetails?: (invoice: Invoice) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Cleared":
      return "bg-green-100 text-green-800";
    case "Overdue":
      return "bg-red-100 text-red-800";
    case "Partially Paid":
      return "bg-amber-100 text-amber-800";
    case "Open":
    default:
      return "bg-amber-100 text-amber-800";
  }
};

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
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.paymentStatus)}`}>
          {invoice.paymentStatus}
        </span>
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
