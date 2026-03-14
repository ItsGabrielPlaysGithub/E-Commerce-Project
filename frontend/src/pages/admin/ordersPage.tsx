'use client';

import { useState } from "react";
import { Download, Plus, Search, Filter } from "lucide-react";
import { SalesOrdersTable } from "@/components/admin/SalesOrdersTable";
import { PaymentProofModal } from "@/components/admin/PaymentProofModal";
import { PaymongoTransactionModal } from "@/components/admin/PaymongoTransactionModal";

interface SalesOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerNo: string;
  orderType: "Bulk" | "Wholesale" | "Retail";
  createdDate: string;
  deliveryStatus: string;
  netAmount: number;
  status: string;
  paymentMethod: "paymongo" | "manual_transfer";
  paymentProofImage?: string;
  paymentProofUploadedAt?: string;
  paymongoTransactionId?: string;
  paymongoAmount?: number;
  paymongoPaymentMethod?: string;
  paymongoTimestamp?: string;
}

// Mock data
const ordersData: SalesOrder[] = [
  {
    id: "1",
    orderNumber: "5000000412",
    customerName: "GrandVista Hotels",
    customerNo: "C-0001204",
    orderType: "Bulk" as const,
    createdDate: "2026-03-05",
    deliveryStatus: "Partially Shipped",
    netAmount: 87500,
    status: "In Progress",
    paymentMethod: "paymongo",
    paymongoTransactionId: "TXN-PM-001",
    paymongoAmount: 87500,
    paymongoPaymentMethod: "GCash",
    paymongoTimestamp: "2026-03-05 10:30 AM",
  },
  {
    id: "2",
    orderNumber: "5000000411",
    customerName: "CookMart Philippines",
    customerNo: "C-0000892",
    orderType: "Wholesale" as const,
    createdDate: "2026-03-04",
    deliveryStatus: "Fully Shipped",
    netAmount: 142300,
    status: "Delivered",
    paymentMethod: "manual_transfer",
    paymentProofImage: "https://via.placeholder.com/400x300?text=Payment+Proof",
    paymentProofUploadedAt: "2026-03-04 02:15 PM",
  },
  {
    id: "3",
    orderNumber: "5000000410",
    customerName: "Nourish Restaurant Group",
    customerNo: "C-0001105",
    orderType: "Bulk" as const,
    createdDate: "2026-03-03",
    deliveryStatus: "Fully Shipped",
    netAmount: 213600,
    status: "Billed",
    paymentMethod: "paymongo",
    paymongoTransactionId: "TXN-PM-002",
    paymongoAmount: 213600,
    paymongoPaymentMethod: "Card",
    paymongoTimestamp: "2026-03-03 09:45 AM",
  },
  {
    id: "4",
    orderNumber: "5000000409",
    customerName: "The Kitchen Store",
    customerNo: "C-0000341",
    orderType: "Wholesale" as const,
    createdDate: "2026-03-02",
    deliveryStatus: "Fully Shipped",
    netAmount: 28776,
    status: "Billed",
    paymentMethod: "paymongo",
    paymongoTransactionId: "TXN-PM-003",
    paymongoAmount: 28776,
    paymongoPaymentMethod: "Grab Pay",
    paymongoTimestamp: "2026-03-02 03:20 PM",
  },
  {
    id: "5",
    orderNumber: "5000000408",
    customerName: "SM Lifestyle",
    customerNo: "C-0000671",
    orderType: "Bulk" as const,
    createdDate: "2026-03-01",
    deliveryStatus: "Not Shipped",
    netAmount: 319800,
    status: "Open",
    paymentMethod: "manual_transfer",
    paymentProofImage: "https://via.placeholder.com/400x300?text=Payment+Proof",
    paymentProofUploadedAt: "2026-03-01 11:00 AM",
  },
  {
    id: "6",
    orderNumber: "5000000407",
    customerName: "Fiesta Foodservice",
    customerNo: "C-0000812",
    orderType: "Bulk" as const,
    createdDate: "2026-02-28",
    deliveryStatus: "Fully Shipped",
    netAmount: 96450,
    status: "Billed",
    paymentMethod: "paymongo",
    paymongoTransactionId: "TXN-PM-004",
    paymongoAmount: 96450,
    paymongoPaymentMethod: "Bank Transfer",
    paymongoTimestamp: "2026-02-28 08:15 AM",
  },
];

export default function SalesOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [paymentProofOrder, setPaymentProofOrder] = useState<SalesOrder | null>(null);
  const [paymentProofLoading, setPaymentProofLoading] = useState(false);
  const [paymongoTransactionOrder, setPaymongoTransactionOrder] = useState<SalesOrder | null>(null);
  const [paymongoTransactionLoading, setPaymongoTransactionLoading] = useState(false);

  // Calculate stats
  const totalOrders = ordersData.length;
  const totalAmount = ordersData.reduce((sum, o) => sum + o.netAmount, 0);

  const statusCards = [
    {
      label: "Open",
      count: ordersData.filter((o) => o.status === "Open").length,
      amount: ordersData.filter((o) => o.status === "Open").reduce((s, o) => s + o.netAmount, 0),
    },
    {
      label: "In Progress",
      count: ordersData.filter((o) => o.status === "In Progress").length,
      amount: ordersData.filter((o) => o.status === "In Progress").reduce((s, o) => s + o.netAmount, 0),
    },
    {
      label: "Delivered",
      count: ordersData.filter((o) => o.status === "Delivered").length,
      amount: ordersData.filter((o) => o.status === "Delivered").reduce((s, o) => s + o.netAmount, 0),
    },
    {
      label: "Billed",
      count: ordersData.filter((o) => o.status === "Billed").length,
      amount: ordersData.filter((o) => o.status === "Billed").reduce((s, o) => s + o.netAmount, 0),
    },
  ];

  // Filter orders
  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Handle actions
  const handleViewDetails = (order: SalesOrder) => {
    console.log("View details:", order);
  };

  const handleViewPaymentProof = (order: SalesOrder) => {
    setPaymentProofOrder(order);
  };

  const handleApprovePayment = async (order: SalesOrder) => {
    setPaymentProofLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Payment approved for order:", order.orderNumber);
    setPaymentProofLoading(false);
    setPaymentProofOrder(null);
  };

  const handleRejectPayment = async (order: SalesOrder) => {
    setPaymentProofLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Payment rejected for order:", order.orderNumber);
    setPaymentProofLoading(false);
    setPaymentProofOrder(null);
  };

  const handleViewPaymongoDetails = (order: SalesOrder) => {
    setPaymongoTransactionOrder(order);
  };

  const handleMarkAsReadyForDelivery = async (order: SalesOrder) => {
    setPaymongoTransactionLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Order marked as ready for delivery:", order.orderNumber);
    setPaymongoTransactionLoading(false);
    setPaymongoTransactionOrder(null);
  };

  const handleReportDiscrepancy = async (order: SalesOrder) => {
    setPaymongoTransactionLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Discrepancy reported - flagged for manual review:", order.orderNumber);
    setPaymongoTransactionLoading(false);
    setPaymongoTransactionOrder(null);
  };

  const handleViewInvoice = (order: SalesOrder) => {
    console.log("View invoice:", order);
  };

  const handleCancelOrder = (order: SalesOrder) => {
    console.log("Cancel order:", order);
  };

  const handleAdjustDelivery = (order: SalesOrder) => {
    console.log("Adjust delivery:", order);
  };

  const handlePrint = (order: SalesOrder) => {
    console.log("Print order:", order);
  };

  return (
    <div className="space-y-6 px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-gray-900 font-bold text-2xl">Sales Orders</h1>
          <p className="text-sm text-gray-500 mt-0.5">Sales Org: 1000</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">
            {totalOrders} orders · Total: ₱{totalAmount.toLocaleString('en-PH')}
          </span>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50">
            <Download size={12} /> Export
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
                color: label === "Open" ? "#d97706" : label === "In Progress" ? "#2563eb" : label === "Delivered" ? "#16a34a" : "#6b7280",
              }}
            >
              {count}
            </div>
            <div className="text-xs text-gray-400">
              ₱{amount.toLocaleString('en-PH')}
            </div>
          </div>
        ))}
      </div>

      {/* Search, Filter & Add Button Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        {/* Search */}
        <div className="flex-1 relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by order number or customer..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Filter size={14} />
            Filter
          </button>

          {showFilterDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4 space-y-4">
              {/* Status Filter */}
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-2 block">
                  Status
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["all", "Open", "In Progress", "Delivered", "Billed"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className="px-3 py-2 rounded-lg text-xs font-medium transition-all text-left"
                      style={{
                        backgroundColor:
                          selectedStatus === status ? "#fdf2f2" : "#f9fafb",
                        color:
                          selectedStatus === status ? "#bf262f" : "#6b7280",
                        border:
                          selectedStatus === status
                            ? "1px solid #bf262f"
                            : "1px solid #e5e7eb",
                      }}
                    >
                      {status === "all" ? "All Status" : status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedStatus("all");
                }}
                className="w-full px-3 py-2 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Add Order Button */}
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold transition-all hover:opacity-90 shadow-sm"
          style={{ backgroundColor: "#bf262f" }}
        >
          <Plus size={14} />
          New Order
        </button>
      </div>

      {/* Sales Orders Table */}
      <SalesOrdersTable
        orders={filteredOrders}
        emptyMessage="No sales orders found matching your filters"
        onViewDetails={handleViewDetails}
        onViewPaymentProof={handleViewPaymentProof}
        onApprovePayment={handleApprovePayment}
        onRejectPayment={handleRejectPayment}
        onViewPaymongoDetails={handleViewPaymongoDetails}
        onMarkAsReadyForDelivery={handleMarkAsReadyForDelivery}
        onReportDiscrepancy={handleReportDiscrepancy}
        onViewInvoice={handleViewInvoice}
        onCancelOrder={handleCancelOrder}
        onAdjustDelivery={handleAdjustDelivery}
        onPrint={handlePrint}
      />

      {/* Payment Proof Modal */}
      {paymentProofOrder && (
        <PaymentProofModal
          order={paymentProofOrder}
          onClose={() => setPaymentProofOrder(null)}
          onApprove={() => handleApprovePayment(paymentProofOrder)}
          onReject={() => handleRejectPayment(paymentProofOrder)}
          isLoading={paymentProofLoading}
        />
      )}

      {/* PayMongo Transaction Modal */}
      {paymongoTransactionOrder && (
        <PaymongoTransactionModal
          order={paymongoTransactionOrder}
          onClose={() => setPaymongoTransactionOrder(null)}
          onMarkAsReady={() => handleMarkAsReadyForDelivery(paymongoTransactionOrder)}
          onReportDiscrepancy={() => handleReportDiscrepancy(paymongoTransactionOrder)}
          isLoading={paymongoTransactionLoading}
        />
      )}
    </div>
  );
}
