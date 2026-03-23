'use client';

import { useState } from "react";
import { Download, Plus, Search, Filter } from "lucide-react";
import { SalesOrdersTable } from "@/features/admin/sales-order/components/SalesOrdersTable";
import { PaymentProofModal } from "@/features/admin/sales-order/components/PaymentProofModal";
import { PaymongoTransactionModal } from "@/features/admin/sales-order/components/PaymongoTransactionModal";
import { OrderDetailsModal } from "@/features/admin/sales-order/components/OrderDetailsModal";
import { UpdateOrderStatusModal } from "@/features/admin/sales-order/components/UpdateOrderStatusModal";
import { useOrders } from "@/features/admin/sales-order/hooks";
import { useTransitionOrderStatus } from "@/features/admin/sales-order/hooks/use-transitionorderstatus";
import { useRejectPaymentProof } from "@/features/admin/sales-order/hooks/use-reject-payment-proof";
import { getStatusLabel, getStatusColor } from "@/utils/statusMapper";
import { SalesOrder } from "../../../types/types";
import { toast } from "sonner";

export default function SalesOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<SalesOrder | null>(null);
  const [paymentProofOrder, setPaymentProofOrder] = useState<SalesOrder | null>(null);
  const [paymentProofLoading, setPaymentProofLoading] = useState(false);
  const [paymongoTransactionOrder, setPaymongoTransactionOrder] = useState<SalesOrder | null>(null);
  const [paymongoTransactionLoading, setPaymongoTransactionLoading] = useState(false);
  const [updateStatusOrder, setUpdateStatusOrder] = useState<SalesOrder | null>(null);
  const [updateStatusLoading, setUpdateStatusLoading] = useState(false);

  // Fetch orders from GraphQL
  const { data, loading, error } = useOrders();
  const [transitionOrderStatus] = useTransitionOrderStatus();
  const [rejectPaymentProof] = useRejectPaymentProof();

  // Transform GraphQL data to match SalesOrder interface
  const ordersData: SalesOrder[] = (data?.allOrders || []).map((order: any) => ({
    orderId: order.orderId?.toString() || "",
    orderNumber: order.orderNumber || "",
    userId: order.userId || 0,
    productId: order.productId || 0,
    orderType: order.orderType || "",
    quantity: order.quantity || 0,
    unitPrice: order.unitPrice || 0,
    totalPrice: order.totalPrice || 0,
    status: order.status || "PENDING_APPROVAL",
    deliveryStatus: order.deliveryStatus || "",
    paymentMethod: order.paymentMethod || "",
    paymentProofImage: order.paymentProofImage 
      ? `${process.env.NEXT_PUBLIC_IMAGE_PATH}${order.paymentProofImage}`
      : "",
    paymentProofUploadedAt: order.paymentProofUploadedAt || "",
    paymentProofStatus: order.paymentProofStatus || "",
    paymentProofRejectionReason: order.paymentProofRejectionReason || "",
    paymentProofAttempts: order.paymentProofAttempts || 0,
    paymongoTransactionId: order.paymongoTransactionId || "",
    paymongoAmount: order.paymongoAmount || 0,
    paymongoPaymentMethod: order.paymongoPaymentMethod || "",
    paymongoTimestamp: order.paymongoTimestamp || "",
    createdAt: order.createdAt || "",
    updatedAt: order.updatedAt || "",
  }));

  if (loading) {
    return (
      <div className="space-y-6 px-8 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            <p className="mt-4 text-gray-600">Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 px-8 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="text-center text-red-600">
            <p className="text-lg font-semibold">Error loading orders</p>
            <p className="mt-2 text-sm">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate stats
  const totalOrders = ordersData.length;
  const totalAmount = ordersData.reduce((sum, o) => sum + o.totalPrice, 0);

  const statusCards = [
    {
      label: "PENDING_APPROVAL",
      count: ordersData.filter((o) => o.status === "PENDING_APPROVAL").length,
      amount: ordersData.filter((o) => o.status === "PENDING_APPROVAL").reduce((s, o) => s + o.totalPrice, 0),
    },
    {
      label: "ACCEPT",
      count: ordersData.filter((o) => o.status === "ACCEPT").length,
      amount: ordersData.filter((o) => o.status === "ACCEPT").reduce((s, o) => s + o.totalPrice, 0),
    },
    {
      label: "IN_TRANSIT",
      count: ordersData.filter((o) => o.status === "IN_TRANSIT").length,
      amount: ordersData.filter((o) => o.status === "IN_TRANSIT").reduce((s, o) => s + o.totalPrice, 0),
    },
    {
      label: "DELIVERED",
      count: ordersData.filter((o) => o.status === "DELIVERED").length,
      amount: ordersData.filter((o) => o.status === "DELIVERED").reduce((s, o) => s + o.totalPrice, 0),
    },
  ];

  // Filter orders
  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userId.toString().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Handle actions
  const handleViewDetails = (order: SalesOrder) => {
    setSelectedOrder(order);
  };

  const handleViewPaymentProof = (order: SalesOrder) => {
    setPaymentProofOrder(order);
  };

  const handleApprovePayment = async (order: SalesOrder) => {
    setPaymentProofLoading(true);
    try {
      // Determine next status based on current status
      const nextStatus = order.status === "AWAITING_PAYMENT_VERIFICATION" ? "ACCEPT" : "ACCEPT";
      
      await transitionOrderStatus({
        variables: {
          input: {
            orderId: parseInt(order.orderId),
            nextStatus: nextStatus,
          },
        },
      });
      toast.success("Payment approved successfully!");
      setPaymentProofOrder(null);
    } catch (error) {
      console.error("Failed to approve payment:", error);
      toast.error("Failed to approve payment");
    } finally {
      setPaymentProofLoading(false);
    }
  };

  const handleRejectPayment = async (order: SalesOrder, reason?: string) => {
    setPaymentProofLoading(true);
    try {
      if (!reason) {
        toast.error("Rejection reason is required");
        setPaymentProofLoading(false);
        return;
      }

      await rejectPaymentProof({
        variables: {
          input: {
            orderId: parseInt(order.orderId),
            rejectionReason: reason,
          },
        },
      });
      toast.success("Payment proof rejected successfully");
      console.log("✅ Payment rejected with reason:", reason);
      setPaymentProofOrder(null);
    } catch (error) {
      console.error("Failed to reject payment:", error);
      toast.error("Failed to reject payment");
    } finally {
      setPaymentProofLoading(false);
    }
  };

  const handleViewPaymongoDetails = (order: SalesOrder) => {
    setPaymongoTransactionOrder(order);
  };

  const handleMarkAsReadyForDelivery = async (order: SalesOrder) => {
    setPaymongoTransactionLoading(true);
    try {
      await transitionOrderStatus({
        variables: {
          input: {
            orderId: parseInt(order.orderId),
            nextStatus: "READY_FOR_DELIVERY",
          },
        },
      });
      toast.success("Order marked as ready for delivery");
      setPaymongoTransactionOrder(null);
    } catch (error) {
      console.error("Failed to mark order as ready:", error);
      toast.error("Failed to mark order as ready for delivery");
    } finally {
      setPaymongoTransactionLoading(false);
    }
  };

  const handleReportDiscrepancy = async (order: SalesOrder) => {
    setPaymongoTransactionLoading(true);
    try {
      await transitionOrderStatus({
        variables: {
          input: {
            orderId: parseInt(order.orderId),
            nextStatus: "REJECTED",
            rejectionReason: "Discrepancy reported - flagged for manual review",
          },
        },
      });
      toast.success("Discrepancy reported - order flagged for manual review");
      setPaymongoTransactionOrder(null);
    } catch (error) {
      console.error("Failed to report discrepancy:", error);
      toast.error("Failed to report discrepancy");
    } finally {
      setPaymongoTransactionLoading(false);
    }
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

  const handleUpdateStatus = (order: SalesOrder) => {
    setUpdateStatusOrder(order);
  };

  const handleStatusUpdateSubmit = async (newStatus: string) => {
    if (!updateStatusOrder) return;

    setUpdateStatusLoading(true);
    try {
      await transitionOrderStatus({
        variables: {
          input: {
            orderId: parseInt(updateStatusOrder.orderId),
            nextStatus: newStatus,
          },
        },
      });
      toast.success("Order status updated successfully!");
      setUpdateStatusOrder(null);
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast.error("Failed to update order status");
    } finally {
      setUpdateStatusLoading(false);
    }
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
            <div className="text-xs text-gray-400 mb-1">{getStatusLabel(label)}</div>
            <div
              className="font-bold"
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                lineHeight: 1.2,
                color: getStatusColor(label).text,
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
                  {["all", "PENDING_APPROVAL", "ACCEPT", "DELIVERED", "PAID"].map((status) => (
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
                      {status === "all" ? "All Status" : getStatusLabel(status)}
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
        onUpdateStatus={handleUpdateStatus}
        onPrint={handlePrint}
      />

      {/* Payment Proof Modal */}
      {paymentProofOrder && (
        <PaymentProofModal
          isOpen={!!paymentProofOrder}
          order={paymentProofOrder}
          onClose={() => setPaymentProofOrder(null)}
          onApprove={() => handleApprovePayment(paymentProofOrder)}
          onReject={(order, reason) => handleRejectPayment(order, reason)}
          isLoading={paymentProofLoading}
        />
      )}

      {/* PayMongo Transaction Modal */}
      {paymongoTransactionOrder && (
        <PaymongoTransactionModal
          isOpen={!!paymongoTransactionOrder}
          order={paymongoTransactionOrder}
          onClose={() => setPaymongoTransactionOrder(null)}
          onMarkAsReady={() => handleMarkAsReadyForDelivery(paymongoTransactionOrder)}
          onReportDiscrepancy={() => handleReportDiscrepancy(paymongoTransactionOrder)}
          isLoading={paymongoTransactionLoading}
        />
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          isOpen={!!selectedOrder}
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      {/* Update Order Status Modal */}
      {updateStatusOrder && (
        <UpdateOrderStatusModal
          isOpen={!!updateStatusOrder}
          orderNumber={updateStatusOrder.orderNumber}
          currentStatus={updateStatusOrder.status}
          onClose={() => setUpdateStatusOrder(null)}
          onUpdate={handleStatusUpdateSubmit}
          isLoading={updateStatusLoading}
        />
      )}
    </div>
  );
}
