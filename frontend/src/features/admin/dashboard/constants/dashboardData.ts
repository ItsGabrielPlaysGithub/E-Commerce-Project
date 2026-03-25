import {
  ClipboardList,
  FileText,
  AlertTriangle,
  CreditCard,
} from "lucide-react";

export const kpis = [
  {
    label: "Active Orders",
    value: "3",
    sub: "12 line items · 2 in transit",
    icon: ClipboardList,
    color: "#3b82f6",
    bg: "#eff6ff",
    trend: "+1 vs last week",
    up: true,
  },
  {
    label: "Open Invoices",
    value: "₱241,668",
    sub: "2 invoices · Due in 7 days",
    icon: FileText,
    color: "#f59e0b",
    bg: "#fffbeb",
    trend: "-₱58K vs last month",
    up: false,
  },
  // {
  //   label: "Credit Available",
  //   value: "₱758,332",
  //   sub: "of ₱1,000,000 limit · 75.8%",
  //   icon: CreditCard,
  //   color: "#10b981",
  //   bg: "#ecfdf5",
  //   trend: "Net 30 · Gold Terms",
  //   up: true,
  // },
  {
    label: "Restock Alerts",
    value: "2",
    sub: "Items below reorder point",
    icon: AlertTriangle,
    color: "#ef4444",
    bg: "#fef2f2",
    trend: "View suggested PO",
    up: false,
  },
] as const;

export const quickReorder = [
  { id: "11", name: "Elite Vacuum Flask 500ml", sku: "OHW-VF-001", price: 949, lastQty: 100, stock: 356 },
  { id: "1", name: "Elizabeth Ceramic Casserole", sku: "OHW-CK-001", price: 1799, lastQty: 50, stock: 243 },
  { id: "8", name: "Crystal Wine Glass Set (6pcs)", sku: "OHW-GW-001", price: 1649, lastQty: 24, stock: 134 },
  { id: "6", name: "Royal Bone China Dinner Set", sku: "OHW-DW-001", price: 2599, lastQty: 24, stock: 62 },
] as const;

export const sapModules = [
  { label: "MM · Inventory", status: "Live", color: "#10b981" },
  { label: "SD · Sales Orders", status: "Live", color: "#10b981" },
  { label: "FI · Invoicing", status: "Live", color: "#10b981" },
  { label: "FICO · AR Aging", status: "Live", color: "#10b981" },
] as const;

export const invoiceSummary = [
  { label: "Current", amount: "₱112,142", color: "#10b981", pct: 46 },
  { label: "Due Soon", amount: "₱89,950", color: "#f59e0b", pct: 37 },
  { label: "Overdue", amount: "₱39,576", color: "#ef4444", pct: 17 },
] as const;

