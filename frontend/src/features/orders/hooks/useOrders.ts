"use client";

import { useState, useMemo } from "react";
import type { Order, OrderStatus, OrderTabStatus } from "../types/order";

export function useOrders(orders: Order[]) {
  const [activeTab, setActiveTab] = useState<OrderTabStatus>("All");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (activeTab !== "All") {
        // Map activeTab display name to backend status values
        const tabStatusMap: Record<OrderTabStatus, string[]> = {
          "All": [],
          "Open": ["PENDING_APPROVAL", "READY_FOR_BILLING"],
          "Processing": ["APPROVED", "ORDERED_FROM_SUPPLIER", "AWAITING_PAYMENT_VERIFICATION"],
          "Shipped": ["PAID"],
          "Delivered": ["DELIVERED"],
          "Cancelled": ["REJECTED"],
        };
        
        const allowedStatuses = tabStatusMap[activeTab] || [];
        if (!allowedStatuses.includes(o.status)) {
          return false;
        }
      }
      
      if (
        search &&
        !o.id.toLowerCase().includes(search.toLowerCase()) &&
        !o.sapSo.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [orders, activeTab, search]);

  const counts = useMemo(() => {
    return {
      All: orders.length,
      Open: orders.filter((o) => o.status === "PENDING_APPROVAL" || o.status === "READY_FOR_BILLING").length,
      Processing: orders.filter((o) => o.status === "APPROVED" || o.status === "ORDERED_FROM_SUPPLIER" || o.status === "AWAITING_PAYMENT_VERIFICATION").length,
      Shipped: orders.filter((o) => o.status === "PAID").length,
      Delivered: orders.filter((o) => o.status === "DELIVERED").length,
      Cancelled: orders.filter((o) => o.status === "REJECTED").length,
    } as Record<OrderTabStatus, number>;
  }, [orders]);

  return {
    activeTab,
    setActiveTab,
    search,
    setSearch,
    expanded,
    setExpanded,
    filtered,
    counts,
  };
}
