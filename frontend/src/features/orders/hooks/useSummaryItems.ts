"use client";

import { useMemo } from "react";
import type { Order } from "../types/order";

interface SummaryItem {
  label: string;
  value: string;
  color: string;
  bg: string;
}

/**
 * Hook to calculate summary statistics from orders
 */
export function useSummaryItems(orders: Order[]): SummaryItem[] {
  return useMemo(() => {
    const processingOrders = orders.filter((o) => o.status === "Processing" || o.status === "Shipped").length;
    const totalOrdered = orders.reduce((sum, o) => sum + o.total, 0);
    const pendingPayment = orders
      .filter((o) => o.paymentStatus === "Pending")
      .reduce((sum, o) => sum + o.total, 0);

    return [
      {
        label: "Total Orders",
        value: orders.length.toString(),
        color: "#6b7280",
        bg: "#f9fafb",
      },
      {
        label: "In Progress",
        value: processingOrders.toString(),
        color: "#f59e0b",
        bg: "#fffbeb",
      },
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
  }, [orders]);
}
