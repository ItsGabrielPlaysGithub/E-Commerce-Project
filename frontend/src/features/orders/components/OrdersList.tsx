import { Package } from "lucide-react";
import type { Order, OrderStatus } from "../types/order";
import { OrdersFilter } from "./OrdersFilter";
import { OrderRow } from "./OrderRow";

interface OrdersListProps {
  orders: Order[];
  activeTab: OrderStatus;
  setActiveTab: (tab: OrderStatus) => void;
  search: string;
  setSearch: (search: string) => void;
  expanded: string | null;
  setExpanded: (id: string | null) => void;
  counts: Record<OrderStatus, number>;
  filtered: Order[];
}

export function OrdersList({
  activeTab,
  setActiveTab,
  search,
  setSearch,
  expanded,
  setExpanded,
  counts,
  filtered,
}: OrdersListProps) {
  return (
    <div className="space-y-5">
      <OrdersFilter
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        search={search}
        setSearch={setSearch}
        counts={counts}
      />

      {/* Orders list */}
      <div className="bg-white rounded-xl p-5 flex flex-col">
        {filtered.length === 0 && (
          <div className="flex items-center justify-center py-16 text-gray-400">
            <div className="text-center">
              <Package size={32} className="mx-auto mb-3 opacity-40" />
              <div className="text-sm font-medium">No orders match your filters</div>
            </div>
          </div>
        )}
        {filtered.length > 0 && (
          <div className="space-y-3">
            {filtered.map((order, i) => (
              <OrderRow
                key={order.id}
                order={order}
                isExpanded={expanded === order.id}
                onExpand={setExpanded}
                index={i}
                isLastItem={i === filtered.length - 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
