"use client";

import { useEffect } from "react";
import { useOrders } from "../../features/orders/hooks/useOrders";
import { useFetchOrders } from "../../features/orders/hooks/useFetchOrders";
import { useMostOrderedItems } from "../../features/orders/hooks/useMostOrderedItems";
import { usePagination } from "../../features/orders/hooks/usePagination";
import { useSummaryItems } from "../../features/orders/hooks/useSummaryItems";
import { OrdersPageHeader } from "../../features/orders/components/OrdersPageHeader";
import { OrdersSummary } from "../../features/orders/components/OrdersSummary";
import { OrdersLoadingState } from "../../features/orders/components/OrdersLoadingState";
import { OrdersErrorState } from "../../features/orders/components/OrdersErrorState";
import { OrdersMainContent } from "../../features/orders/components/OrdersMainContent";
import { BottomBar } from "@/components/layout/bottomBar";

const ITEMS_PER_PAGE = 6;

export function MyOrdersPage() {
  // Fetch orders from backend
  const { orders, loading, error, refetchOrders } = useFetchOrders();

  // Filter and search logic
  const { activeTab, setActiveTab, search, setSearch, expanded, setExpanded, filtered, counts } = useOrders(orders);

  // Pagination
  const pagination = usePagination(filtered.length, ITEMS_PER_PAGE);

  // Summary statistics
  const summaryItems = useSummaryItems(orders);

  // Quick reorder items
  const quickReorderItems = useMostOrderedItems(orders);

  // Handle pagination reset on search/filter change
  useEffect(() => {
    pagination.reset();
  }, [search, activeTab]);

  // Get paginated items
  const paginatedFiltered = filtered.slice(pagination.startIndex, pagination.endIndex);

  // Handle error retry
  const handleRetry = () => {
    refetchOrders();
  };

  if (loading) {
    return <OrdersLoadingState />;
  }

  if (error) {
    return <OrdersErrorState error={error} onRetry={handleRetry} />;
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      <OrdersPageHeader ordersCount={counts.All || orders.length} />

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Summary of Orders */}
          <div className="space-y-6">
            <OrdersSummary items={summaryItems} />

            {/* Orders List + Sidebar */}
            <OrdersMainContent
              orders={orders}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              search={search}
              setSearch={setSearch}
              expanded={expanded}
              setExpanded={setExpanded}
              counts={counts}
              filteredOrders={paginatedFiltered}
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onNextPage={pagination.nextPage}
              onPrevPage={pagination.prevPage}
              quickReorderItems={quickReorderItems}
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <BottomBar />
    </div>
  );
}

export default MyOrdersPage;
