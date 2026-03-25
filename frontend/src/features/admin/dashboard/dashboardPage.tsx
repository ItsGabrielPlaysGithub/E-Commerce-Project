'use client';

import { useMemo, useState } from "react";
import { useOrders } from "@/features/admin/sales-order/hooks";
import { getStatusColor, getStatusLabel } from "@/utils/statusMapper";
import DashboardHeader from "./components/DashboardHeader";
// import DashboardSummaryCards from "./components/DashboardSummaryCards";
import KpiCards from "./components/KpiCards";
import QuickReorderCard from "./components/QuickReorderCard";
import RecentOrdersTable from "./components/RecentOrdersTable";

export default function Dashboard() {
  const [reorderQtys, setReorderQtys] = useState<Record<string, number>>({});
  const { data, loading } = useOrders();
  const today = new Date().toLocaleDateString("en-PH", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  const recentOrders = useMemo(() => {
    const source = data?.allOrders ?? [];

    const grouped = new Map<string, {
      id: string;
      sapSo: string;
      date: string;
      items: string;
      qty: number;
      amount: string;
      status: string;
      statusBg: string;
      statusColor: string;
      sortAt: number;
      lineItems: number;
      totalQty: number;
      totalAmount: number;
      statusRaw: string;
    }>();

    for (const order of source) {
      const groupKey = order.orderNumber || `ORDER-${order.orderId}`;
      const createdAt = new Date(order.createdAt || order.updatedAt || Date.now());
      const sortAt = createdAt.getTime();
      const existing = grouped.get(groupKey);

      if (!existing) {
        grouped.set(groupKey, {
          id: groupKey,
          sapSo: "-",
          date: createdAt.toLocaleDateString("en-PH", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          items: "1 line item",
          qty: order.quantity ?? 0,
          amount: "₱0",
          status: getStatusLabel(order.status || "PENDING_APPROVAL"),
          statusBg: getStatusColor(order.status || "PENDING_APPROVAL").bg,
          statusColor: getStatusColor(order.status || "PENDING_APPROVAL").text,
          sortAt,
          lineItems: 1,
          totalQty: order.quantity ?? 0,
          totalAmount: order.totalPrice ?? 0,
          statusRaw: order.status || "PENDING_APPROVAL",
        });
        continue;
      }

      existing.lineItems += 1;
      existing.totalQty += order.quantity ?? 0;
      existing.totalAmount += order.totalPrice ?? 0;

      if (sortAt >= existing.sortAt) {
        existing.sortAt = sortAt;
        existing.date = createdAt.toLocaleDateString("en-PH", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        });
        existing.statusRaw = order.status || existing.statusRaw;
      }

      existing.items = `${existing.lineItems} line item${existing.lineItems > 1 ? "s" : ""}`;
      existing.qty = existing.totalQty;
      existing.amount = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        maximumFractionDigits: 0,
      }).format(existing.totalAmount);

      const statusPalette = getStatusColor(existing.statusRaw);
      existing.status = getStatusLabel(existing.statusRaw);
      existing.statusBg = statusPalette.bg;
      existing.statusColor = statusPalette.text;
    }

    return [...grouped.values()]
      .sort((a, b) => b.sortAt - a.sortAt)
      .slice(0, 5)
      .map(({ sortAt, lineItems, totalQty, totalAmount, statusRaw, ...rest }) => rest);
  }, [data?.allOrders]);

  return (
    <div className="space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <DashboardHeader today={today} />
      <KpiCards />

      <div className="grid grid-cols-1 gap-5 2xl:grid-cols-3">
        <div className="2xl:col-span-2">
          <RecentOrdersTable orders={recentOrders} loading={loading} />
        </div>
        <QuickReorderCard reorderQtys={reorderQtys} setReorderQtys={setReorderQtys} />
      </div>

      {/* <DashboardSummaryCards /> */}
    </div>
  );
}
