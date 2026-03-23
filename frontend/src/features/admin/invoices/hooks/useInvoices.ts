"use client";

import { useState, useMemo } from "react";
import type { Invoice } from "../services/invoiceService";

export type InvoiceTabStatus = "All" | "UNPAID" | "PAID" | "OVERDUE" | "PARTIALLY_PAID";

export interface UseInvoicesReturn {
  activeTab: InvoiceTabStatus;
  setActiveTab: (tab: InvoiceTabStatus) => void;
  search: string;
  setSearch: (search: string) => void;
  expanded: string | null;
  setExpanded: (id: string | null) => void;
  filtered: Invoice[];
  counts: Record<InvoiceTabStatus, number>;
}

/**
 * Custom hook to manage invoice filtering, search, and tabs
 */
export const useInvoices = (invoices: Invoice[]): UseInvoicesReturn => {
  const [activeTab, setActiveTab] = useState<InvoiceTabStatus>("All");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return invoices.filter((invoice) => {
      // Filter by tab
      if (activeTab !== "All") {
        const statusMap: Record<InvoiceTabStatus, string[]> = {
          All: [],
          UNPAID: ["UNPAID"],
          PAID: ["PAID"],
          OVERDUE: ["OVERDUE"],
          PARTIALLY_PAID: ["PARTIALLY_PAID"],
        };

        const allowedStatuses = statusMap[activeTab] || [];
        if (!allowedStatuses.includes(invoice.paymentStatus)) {
          return false;
        }
      }

      // Filter by search
      if (
        search &&
        !invoice.invoiceNumber.toLowerCase().includes(search.toLowerCase()) &&
        !String(invoice.orderId).includes(search) &&
        !String(invoice.userId).includes(search)
      ) {
        return false;
      }

      return true;
    });
  }, [invoices, activeTab, search]);

  const counts = useMemo(() => {
    return {
      All: invoices.length,
      UNPAID: invoices.filter((i) => i.paymentStatus === "UNPAID").length,
      PAID: invoices.filter((i) => i.paymentStatus === "PAID").length,
      OVERDUE: invoices.filter((i) => i.paymentStatus === "OVERDUE").length,
      PARTIALLY_PAID: invoices.filter((i) => i.paymentStatus === "PARTIALLY_PAID").length,
    } as Record<InvoiceTabStatus, number>;
  }, [invoices]);

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
};
