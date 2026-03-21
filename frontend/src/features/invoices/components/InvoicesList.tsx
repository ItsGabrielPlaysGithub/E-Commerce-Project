"use client";

import { InvoiceRow } from "./InvoiceRow";
import type { Invoice } from "../services/invoiceService";

interface InvoicesListProps {
  invoices: Invoice[];
  emptyMessage?: string;
  onViewDetails?: (invoice: Invoice) => void;
  onApprovePayment?: (invoice: Invoice) => void;
}

export const InvoicesList = ({
  invoices,
  emptyMessage = "No invoices found",
  onViewDetails,
  onApprovePayment,
}: InvoicesListProps) => {
  if (invoices.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
        <p className="text-gray-500 text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                BILLING DOCUMENT
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                CUSTOMER
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                SALES ORDER REF
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                BILLING DATE
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                DUE DATE
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">
                GROSS AMOUNT
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">
                BALANCE DUE
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                STATUS
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <InvoiceRow
                key={invoice.invoiceId}
                invoice={invoice}
                onViewDetails={onViewDetails}
                onApprovePayment={onApprovePayment}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
