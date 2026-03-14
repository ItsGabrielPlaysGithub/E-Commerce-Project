'use client';

import { useState } from "react";
import { Download } from "lucide-react";
import { InvoicesTable } from "../../components/admin/InvoicesTable";

interface Invoice {
  id: string;
  billingDocNo: string;
  customerName: string;
  customerNo: string;
  salesOrderRef: string;
  billingDate: string;
  dueDate: string;
  grossAmount: number;
  paidAmount: number;
  balanceDue: number;
  paymentStatus: "Open" | "Cleared" | "Overdue" | "Partially Paid";
}

// Mock data
const invoicesData: Invoice[] = [
  {
    id: "1",
    billingDocNo: "9000001201",
    customerName: "GrandVista Hotels",
    customerNo: "C-0001204",
    salesOrderRef: "5000000412",
    billingDate: "2026-03-05",
    dueDate: "2026-04-05",
    grossAmount: 87500,
    paidAmount: 0,
    balanceDue: 87500,
    paymentStatus: "Open",
  },
  {
    id: "2",
    billingDocNo: "9000001200",
    customerName: "CookMart Philippines",
    customerNo: "C-0000892",
    salesOrderRef: "5000000411",
    billingDate: "2026-03-04",
    dueDate: "2026-04-04",
    grossAmount: 142300,
    paidAmount: 142300,
    balanceDue: 0,
    paymentStatus: "Cleared",
  },
  {
    id: "3",
    billingDocNo: "9000001199",
    customerName: "Nourish Restaurant Group",
    customerNo: "C-0001105",
    salesOrderRef: "5000000410",
    billingDate: "2026-02-20",
    dueDate: "2026-03-20",
    grossAmount: 213600,
    paidAmount: 106800,
    balanceDue: 106800,
    paymentStatus: "Partially Paid",
  },
  {
    id: "4",
    billingDocNo: "9000001198",
    customerName: "The Kitchen Store",
    customerNo: "C-0000341",
    salesOrderRef: "5000000409",
    billingDate: "2026-02-15",
    dueDate: "2026-03-15",
    grossAmount: 28776,
    paidAmount: 0,
    balanceDue: 28776,
    paymentStatus: "Overdue",
  },
  {
    id: "5",
    billingDocNo: "9000001197",
    customerName: "SM Lifestyle",
    customerNo: "C-0000671",
    salesOrderRef: "5000000408",
    billingDate: "2026-02-10",
    dueDate: "2026-03-10",
    grossAmount: 319800,
    paidAmount: 319800,
    balanceDue: 0,
    paymentStatus: "Cleared",
  },
  {
    id: "6",
    billingDocNo: "9000001196",
    customerName: "Fiesta Foodservice",
    customerNo: "C-0000812",
    salesOrderRef: "5000000407",
    billingDate: "2026-02-05",
    dueDate: "2026-03-05",
    grossAmount: 96450,
    paidAmount: 0,
    balanceDue: 96450,
    paymentStatus: "Overdue",
  },
];

export function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Calculate stats
  const totalInvoices = invoicesData.length;
  const totalAmount = invoicesData.reduce((sum, i) => sum + i.grossAmount, 0);

  const statusCards = [
    {
      label: "Open",
      count: invoicesData.filter((i) => i.paymentStatus === "Open").length,
      amount: invoicesData
        .filter((i) => i.paymentStatus === "Open")
        .reduce((s, i) => s + i.balanceDue, 0),
    },
    {
      label: "Cleared",
      count: invoicesData.filter((i) => i.paymentStatus === "Cleared").length,
      amount: invoicesData
        .filter((i) => i.paymentStatus === "Cleared")
        .reduce((s, i) => s + i.grossAmount, 0),
    },
    {
      label: "Overdue",
      count: invoicesData.filter((i) => i.paymentStatus === "Overdue").length,
      amount: invoicesData
        .filter((i) => i.paymentStatus === "Overdue")
        .reduce((s, i) => s + i.balanceDue, 0),
    },
    {
      label: "Partially Paid",
      count: invoicesData.filter((i) => i.paymentStatus === "Partially Paid").length,
      amount: invoicesData
        .filter((i) => i.paymentStatus === "Partially Paid")
        .reduce((s, i) => s + i.balanceDue, 0),
    },
  ];

  // Filter invoices
  const filteredInvoices = invoicesData.filter((invoice) => {
    const matchesSearch =
      invoice.billingDocNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Handle actions
  const handleViewDetails = (invoice: Invoice) => {
    console.log("View invoice details:", invoice);
  };

  const handleApprovePayment = (invoice: Invoice) => {
    console.log("Approve payment for invoice:", invoice.billingDocNo);
  };

  return (
    <div className="space-y-6 px-8 py-8">
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
                  label === "Open"
                    ? "#d97706"
                    : label === "Cleared"
                    ? "#16a34a"
                    : label === "Overdue"
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
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Search by document number or customer..."
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Invoices Table */}
      <InvoicesTable
        invoices={filteredInvoices}
        emptyMessage="No invoices found matching your filters"
        onViewDetails={handleViewDetails}
        onApprovePayment={handleApprovePayment}
      />
    </div>
  );
}
