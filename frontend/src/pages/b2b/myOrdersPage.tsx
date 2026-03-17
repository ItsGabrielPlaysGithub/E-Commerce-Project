"use client";

import { useState, useEffect } from "react";
import { Download, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { useOrders } from "../../features/orders/hooks/useOrders";
import { mockOrders } from "../../features/orders/data/mockOrders";
import { OrdersPageHeader } from "../../features/orders/components/OrdersPageHeader";
import { OrdersSummary } from "../../features/orders/components/OrdersSummary";
import { OrdersList } from "./../../features/orders/components/OrdersList";
import { BottomBar } from "@/components/layout/bottomBar";

export function MyOrdersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const {
    activeTab,
    setActiveTab,
    search,
    setSearch,
    expanded,
    setExpanded,
    filtered,
    counts,
  } = useOrders(mockOrders);

  // Reset to page 1 when search or tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeTab]);

  // Calculate pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedFiltered = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const summaryItems = [
    { label: "Total Orders", value: "6", color: "#6b7280", bg: "#f9fafb" },
    { label: "In Progress", value: "2", color: "#f59e0b", bg: "#fffbeb" },
    {
      label: "Total Ordered",
      value: "₱492,071",
      color: "#3b82f6",
      bg: "#eff6ff",
    },
    {
      label: "Pending Payment",
      value: "₱145,069",
      color: "#ef4444",
      bg: "#fef2f2",
    },
  ];

  return (
    <div
      className="bg-gray-50 min-h-screen flex flex-col"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <OrdersPageHeader ordersCount={counts.All || mockOrders.length} />
      <div className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Summary of Orders */}
          <div className="space-y-6">
            <OrdersSummary items={summaryItems} />

            {/* ── Orders List + Filter  */}
            <OrdersList
              orders={mockOrders}
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
