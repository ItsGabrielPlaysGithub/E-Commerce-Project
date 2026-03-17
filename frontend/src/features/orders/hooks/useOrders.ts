"use client";

import { useState, useMemo } from "react";
import type { Order, OrderStatus } from "../types/order";

export function useOrders(orders: Order[]) {
  const [activeTab, setActiveTab] = useState<OrderStatus>("All");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (activeTab !== "All" && o.status !== activeTab) return false;
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
      Open: orders.filter((o) => o.status === "Open").length,
      Processing: orders.filter((o) => o.status === "Processing").length,
      Shipped: orders.filter((o) => o.status === "Shipped").length,
      Delivered: orders.filter((o) => o.status === "Delivered").length,
      Cancelled: orders.filter((o) => o.status === "Cancelled").length,
    };
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
