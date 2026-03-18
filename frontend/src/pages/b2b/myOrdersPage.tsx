"use client";

import { useState, useEffect } from "react";
import { Download, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { useOrders } from "../../features/orders/hooks/useOrders";
import { useFetchOrders } from "../../features/orders/hooks/useFetchOrders";
import { OrdersPageHeader } from "../../features/orders/components/OrdersPageHeader";
import { OrdersSummary } from "../../features/orders/components/OrdersSummary";
import { OrdersList } from "./../../features/orders/components/OrdersList";
import { BottomBar } from "@/components/layout/bottomBar";

export function MyOrdersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // Fetch orders from NestJS backend
  const { orders, loading, error, refetchOrders } = useFetchOrders();

  const {
    activeTab,
    setActiveTab,
    search,
    setSearch,
    expanded,
    setExpanded,
    filtered,
    counts,
  } = useOrders(orders);

  // Reset to page 1 when search or tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeTab]);

  // Calculate pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedFiltered = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Calculate dynamic summary items from actual orders
  const processingOrders = orders.filter(o => o.status === "Processing" || o.status === "Shipped").length;
  const totalOrdered = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingPayment = orders
    .filter(o => o.paymentStatus === "Pending")
    .reduce((sum, o) => sum + o.total, 0);

  const summaryItems = [
    { label: "Total Orders", value: orders.length.toString(), color: "#6b7280", bg: "#f9fafb" },
    { label: "In Progress", value: processingOrders.toString(), color: "#f59e0b", bg: "#fffbeb" },
    {
      label: "Total Ordered",
      value: `₱${totalOrdered.toLocaleString("en-PH")}`,
      color: "#3b82f6",
      bg: "#eff6ff",
    },
    {
      label: "Pending Payment",
      value: `₱${pendingPayment.toLocaleString("en-PH")}`,
      color: "#ef4444",
      bg: "#fef2f2",
    },
  ];

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error loading orders: {error}</div>
      </div>
    );
  }

  return (
    <div
      className="bg-gray-50 min-h-screen flex flex-col"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <OrdersPageHeader ordersCount={counts.All || orders.length} />
      <div className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Summary of Orders */}
          <div className="space-y-6">
            <OrdersSummary items={summaryItems} />

            {/* ── Orders List + Filter  */}
            <OrdersList
              orders={orders}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              search={search}
              setSearch={setSearch}
              expanded={expanded}
              setExpanded={setExpanded}
              counts={counts}
              filtered={paginatedFiltered}
            />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  Page {currentPage} of {totalPages} ({filtered.length} total orders)
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={14} />
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar - Stays at Bottom */}
      <BottomBar />
    </div>
  );
}

export default MyOrdersPage;
