"use client";

import { OrdersList } from "./OrdersList";
import { OrdersPaginationControls } from "./OrdersPaginationControls";
import { QuickReorder } from "./QuickReorder";
import type { Order, OrderStatus, OrderTabStatus } from "../types/order";

interface OrdersMainContentProps {
  orders: Order[];
  activeTab: OrderTabStatus;
  setActiveTab: (tab: OrderTabStatus) => void;
  search: string;
  setSearch: (search: string) => void;
  expanded: string | null;
  setExpanded: (id: string | null) => void;
  counts: Record<OrderTabStatus, number>;
  filteredOrders: Order[];
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  quickReorderItems: Array<{ id: string; name: string; sku: string; price: number; lastQty: number; stock: number }>;
  onUploadSuccess?: () => void;
}

export function OrdersMainContent({
  orders,
  activeTab,
  setActiveTab,
  search,
  setSearch,
  expanded,
  setExpanded,
  counts,
  filteredOrders,
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
  quickReorderItems,
  onUploadSuccess,
}: OrdersMainContentProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Orders List - Takes 2/3 on desktop */}
      <div className="lg:col-span-2">
        <OrdersList
          orders={orders}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          search={search}
          setSearch={setSearch}
          expanded={expanded}
          setExpanded={setExpanded}
          counts={counts}
          filtered={filteredOrders}
          onUploadSuccess={onUploadSuccess}
        />

        {/* Pagination Controls */}
        <OrdersPaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredOrders.length}
          onNext={onNextPage}
          onPrevious={onPrevPage}
        />
      </div>

      {/* Sidebar - Quick Reorder */}
      <div className="lg:col-span-1">
        <QuickReorder items={quickReorderItems} />
      </div>
    </div>
  );
}
