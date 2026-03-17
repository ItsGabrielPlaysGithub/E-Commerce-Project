"use client";

import { Download, RefreshCw } from "lucide-react";
import { useOrders } from "../../features/orders/hooks/useOrders";
import { mockOrders } from "../../features/orders/data/mockOrders";
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
    <div className="flex flex-col min-h-screen bg-gray-50" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* ── Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 m-[2%] mt-10 md:mt-0">
          <div>
            <h1 className="text-gray-900 font-bold text-2xl leading-tight mt-10">
              My Orders
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">
              Order history & tracking · GrandVista Hotels
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => alert('Export functionality coming soon')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg border text-sm transition-colors hover:bg-gray-50 hover:border-gray-400 cursor-pointer"
              style={{ borderColor: "#4b5563", color: "#4b5563" }}
            >
              <Download size={14} />
              Export
            </button>
          </div>
        </div>

        {/* Summary of Orders */}
        <div className="sumOfOrders m-[1.5%]">
          <OrdersSummary items={summaryItems} />
        </div>
        
        {/* ── Orders List + Filter  */}
        <div className="orderList ml-[1.5%] mr-[1.5%] mb-[1.5%]">
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
