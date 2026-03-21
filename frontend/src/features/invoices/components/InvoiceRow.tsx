"use client";

import type { Invoice } from "../services/invoiceService";

interface InvoiceRowProps {
  invoice: Invoice;
  onViewDetails?: (invoice: Invoice) => void;
  onApprovePayment?: (invoice: Invoice) => void;
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
  onApprovePayment,
}: InvoiceRowProps) => {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      {/* Invoice Number */}
      <td className="px-4 py-3 text-sm font-medium text-gray-900">{invoice.invoiceNumber}</td>

      {/* Order / User*/}
      <td className="px-4 py-3 text-sm text-gray-700">
        <div className="font-medium">Order #{invoice.orderId}</div>
        <div className="text-xs text-gray-500">User #{invoice.userId}</div>
      </td>

      {/* Due Date */}
      <td className="px-4 py-3 text-sm text-gray-600">{new Date(invoice.dueDate).toLocaleDateString("en-PH")}</td>

      {/* Total Amount */}
      <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">
        ₱{invoice.totalAmount.toLocaleString("en-PH")}
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
              className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            >
              View
            </button>
          )}
          {onApprovePayment && invoice.paymentStatus !== "Cleared" && (
            <button
              onClick={() => onApprovePayment(invoice)}
              className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700 transition-colors"
            >
              Approve
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};
