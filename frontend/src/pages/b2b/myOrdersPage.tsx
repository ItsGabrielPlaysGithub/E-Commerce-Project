"use client";

import { Download, RefreshCw } from "lucide-react";
import { useOrders } from "../../features/orders/hooks/useOrders";
import { mockOrders } from "../../features/orders/data/mockOrders";
import { OrdersPageHeader } from "../../features/orders/components/OrdersPageHeader";
import { OrdersSummary } from "../../features/orders/components/OrdersSummary";
import { OrdersList } from "./../../features/orders/components/OrdersList";
import { BottomBar } from "@/components/layout/bottomBar";

export function MyOrdersPage() {
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
      className="bg-gray-50 min-h-screen"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <OrdersPageHeader ordersCount={counts.total || mockOrders.length} />
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
            filtered={filtered}
          />
        </div>
      </div>

      {/* Bottom Bar - Stays at Bottom */}
      <BottomBar />
    </div>
  );
}

export default MyOrdersPage;
