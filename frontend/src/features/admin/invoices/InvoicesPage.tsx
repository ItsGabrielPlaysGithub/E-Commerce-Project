'use client';

import { Download } from "lucide-react";
import {
  useFetchInvoices,
  useInvoices,
  InvoicesList,
  InvoicesFilter,
  payInvoiceByOrderId,
  type Invoice,
} from ".";
import { InvoiceDetailsModal } from "./components/InvoiceDetailsModal";

import { useEffect, useState } from "react";

const INVOICES_PER_PAGE = 6;

export function InvoicesPage() {
  // Fetch invoices from backend
  const { invoices: invoicesData, loading, error } = useFetchInvoices();

  // Manage filtering and search
  const { search, setSearch, filtered } = useInvoices(invoicesData || []);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(filtered.length / INVOICES_PER_PAGE));
  const startIndex = (currentPage - 1) * INVOICES_PER_PAGE;
  const paginatedInvoices = filtered.slice(startIndex, startIndex + INVOICES_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Calculate stats
  const totalInvoices = invoicesData?.length || 0;
  const totalAmount = invoicesData?.reduce((sum, i) => sum + i.totalAmount, 0) || 0;

  const statusCards = [
    {
      label: "UNPAID",
      count: invoicesData?.filter((i) => i.paymentStatus === "UNPAID").length || 0,
      amount: invoicesData
        ?.filter((i) => i.paymentStatus === "UNPAID")
        .reduce((s, i) => s + i.totalAmount, 0) || 0,
    },
    {
      label: "PAID",
      count: invoicesData?.filter((i) => i.paymentStatus === "PAID").length || 0,
      amount: invoicesData
        ?.filter((i) => i.paymentStatus === "PAID")
        .reduce((s, i) => s + i.totalAmount, 0) || 0,
    },
    {
      label: "OVERDUE",
      count: invoicesData?.filter((i) => i.paymentStatus === "OVERDUE").length || 0,
      amount: invoicesData
        ?.filter((i) => i.paymentStatus === "OVERDUE")
        .reduce((s, i) => s + i.totalAmount, 0) || 0,
    },
    {
      label: "PARTIALLY_PAID",
      count: invoicesData?.filter((i) => i.paymentStatus === "PARTIALLY_PAID").length || 0,
      amount: invoicesData
        ?.filter((i) => i.paymentStatus === "PARTIALLY_PAID")
        .reduce((s, i) => s + i.totalAmount, 0) || 0,
    },
  ];



  // Modal state for viewing invoice details
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isInvoiceModalOpen, setInvoiceModalOpen] = useState(false);

  // Handle actions
  const handleViewDetails = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setInvoiceModalOpen(true);
  };
  const handleCloseInvoiceModal = () => {
    setInvoiceModalOpen(false);
    setSelectedInvoice(null);
  };

  const handleApprovePayment = async (invoice: Invoice) => {
    try {
      const result = await payInvoiceByOrderId(invoice.orderId);
      if (result) {
        console.log("Payment approved for invoice:", invoice.invoiceNumber);
      }
    } catch (error) {
      console.error("Error approving payment:", error);
    }
  };

  return (
    <div className="space-y-6 px-8 py-8">
      {/* Invoice Details Modal */}
      {selectedInvoice && (
        <InvoiceDetailsModal
          isOpen={isInvoiceModalOpen}
          invoice={selectedInvoice}
          onClose={handleCloseInvoiceModal}
        />
      )}
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-gray-900 font-bold text-2xl">Billing Documents</h1>
          <p className="text-sm text-gray-500 mt-0.5">Accounts Receivable · Company Code: 1000</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">
            {totalInvoices} invoices · Total: ₱{totalAmount.toLocaleString("en-PH")}
          </span>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50">
            <Download size={12} /> Export to Excel
          </button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {statusCards.map(({ label, count, amount }) => (
          <div key={label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="text-xs text-gray-400 mb-1">{label}</div>
            <div
              className="font-bold"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.5rem",
                color:
                  label === "UNPAID"
                    ? "#d97706"
                    : label === "PAID"
                    ? "#16a34a"
                    : label === "OVERDUE"
                    ? "#dc2626"
                    : "#d97706",
              }}
            >
              ₱{amount.toLocaleString("en-PH")}
            </div>
            <div className="text-xs text-gray-400 mt-1">{count} document{count !== 1 ? "s" : ""}</div>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <InvoicesFilter searchTerm={search} onSearchChange={setSearch} />

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
          <p className="text-gray-500 text-sm">Loading invoices...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 rounded-xl border border-red-200 shadow-sm p-4">
          <p className="text-red-700 text-sm">Error loading invoices. Please try again.</p>
        </div>
      )}

      {/* Invoices List */}
      {!loading && !error && (
        <>
          <InvoicesList
            invoices={paginatedInvoices}
            emptyMessage="No invoices found matching your filters"
            onViewDetails={handleViewDetails}
            onApprovePayment={handleApprovePayment}
          />

          {filtered.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-gray-500">
                Showing {startIndex + 1}-{Math.min(startIndex + INVOICES_PER_PAGE, filtered.length)} of {filtered.length} invoices
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-xs text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
