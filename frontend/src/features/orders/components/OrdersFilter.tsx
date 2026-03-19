import { Search } from "lucide-react";
import type { OrderTabStatus } from "../types/order";
import { STATUS_TABS } from "../constants/orderConfig";

interface OrdersFilterProps {
  activeTab: OrderTabStatus;
  setActiveTab: (tab: OrderTabStatus) => void;
  search: string;
  setSearch: (search: string) => void;
  counts: Record<OrderTabStatus, number>;
}

export function OrdersFilter({
  activeTab,
  setActiveTab,
  search,
  setSearch,
  counts,
}: OrdersFilterProps) {
  return (
    <div
      className="bg-white rounded-xl border overflow-hidden"
      style={{ borderColor: "#e2e8f0" }}
    >
      <div
        className="flex items-center justify-between px-5 py-3 gap-4 flex-wrap"
        style={{ borderBottom: "1px solid #f1f5f9" }}
      >
        {/* Status tabs */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap"
              style={{
                backgroundColor: activeTab === tab ? "#bf262f" : "transparent",
                color: activeTab === tab ? "#fff" : "#6b7280",
              }}
            >
              {tab}
              <span
                className="px-1.5 py-0.5 rounded-full text-xs font-bold"
                style={{
                  backgroundColor:
                    activeTab === tab ? "rgba(255,255,255,0.25)" : "#f1f5f9",
                  color: activeTab === tab ? "#fff" : "#6b7280",
                  fontSize: "0.62rem",
                }}
              >
                {counts[tab]}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search order or SAP#…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-2 rounded-lg border text-xs focus:outline-none transition-all"
            style={{ borderColor: "#e2e8f0", width: "200px", fontSize: "0.78rem" }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#bab9b9";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#e2e8f0";
            }}
          />
        </div>
      </div>
    </div>
  );
}
