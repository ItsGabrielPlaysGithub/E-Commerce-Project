'use client';

import { useState } from "react";
import Link from "next/link";
import {
  ClipboardList, FileText, Package, TrendingUp, TrendingDown,
  AlertTriangle, CheckCircle, Clock, ArrowRight, RefreshCw,
  ChevronRight, BarChart3, Download, Plus, Zap, Eye,
  ShoppingCart, CreditCard, Truck, Star,
} from "lucide-react";

const kpis = [
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
  {
    label: "Credit Available",
    value: "₱758,332",
    sub: "of ₱1,000,000 limit · 75.8%",
    icon: CreditCard,
    color: "#10b981",
    bg: "#ecfdf5",
    trend: "Net 30 · Gold Terms",
    up: true,
  },
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
];

const recentOrders = [
  {
    id: "OHW-2026-00412",
    sapSo: "SO-8000001234",
    date: "Mar 05, 2026",
    items: "Crystal Wine Glass Set × 24",
    qty: 24,
    amount: "₱39,576",
    status: "Shipped",
    statusColor: "#3b82f6",
    statusBg: "#eff6ff",
  },
  {
    id: "OHW-2026-00398",
    sapSo: "SO-8000001198",
    date: "Feb 28, 2026",
    items: "Elizabeth Ceramic Casserole × 50",
    qty: 50,
    amount: "₱89,950",
    status: "Processing",
    statusColor: "#f59e0b",
    statusBg: "#fffbeb",
  },
  {
    id: "OHW-2026-00381",
    sapSo: "SO-8000001162",
    date: "Feb 20, 2026",
    items: "Royal Bone China Set × 24 + 3 SKUs",
    qty: 72,
    amount: "₱112,142",
    status: "Delivered",
    statusColor: "#10b981",
    statusBg: "#ecfdf5",
  },
  {
    id: "OHW-2026-00354",
    sapSo: "SO-8000001099",
    date: "Feb 10, 2026",
    items: "Elite Vacuum Flask × 100",
    qty: 100,
    amount: "₱94,500",
    status: "Delivered",
    statusColor: "#10b981",
    statusBg: "#ecfdf5",
  },
  {
    id: "OHW-2026-00322",
    sapSo: "SO-8000001033",
    date: "Jan 29, 2026",
    items: "Marble Baking Pan Set × 36",
    qty: 36,
    amount: "₱50,364",
    status: "Delivered",
    statusColor: "#10b981",
    statusBg: "#ecfdf5",
  },
];

const quickReorder = [
  { id: "11", name: "Elite Vacuum Flask 500ml", sku: "OHW-VF-001", price: 949, lastQty: 100, stock: 356 },
  { id: "1",  name: "Elizabeth Ceramic Casserole", sku: "OHW-CK-001", price: 1799, lastQty: 50, stock: 243 },
  { id: "8",  name: "Crystal Wine Glass Set (6pcs)", sku: "OHW-GW-001", price: 1649, lastQty: 24, stock: 134 },
  { id: "6",  name: "Royal Bone China Dinner Set", sku: "OHW-DW-001", price: 2599, lastQty: 24, stock: 62 },
];

const sapModules = [
  { label: "MM · Inventory",      status: "Live",    color: "#10b981" },
  { label: "SD · Sales Orders",   status: "Live",    color: "#10b981" },
  { label: "FI · Invoicing",      status: "Live",    color: "#10b981" },
  { label: "FICO · AR Aging",     status: "Live",    color: "#10b981" },
];

const invoiceSummary = [
  { label: "Current",  amount: "₱112,142", color: "#10b981", pct: 46 },
  { label: "Due Soon", amount: "₱89,950",  color: "#f59e0b", pct: 37 },
  { label: "Overdue",  amount: "₱39,576",  color: "#ef4444", pct: 17 },
];

export default function Dashboard() {
  const [reorderQtys, setReorderQtys] = useState<Record<string, string>>({});
  const today = new Date().toLocaleDateString("en-PH", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  return (
    <div className="space-y-6 px-8 py-8" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1
            className="text-gray-900"
            style={{ fontWeight: 700, fontSize: "1.375rem", lineHeight: 1.3 }}
          >
            Good morning, Admin 👋
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">{today} · System Administrator</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg border text-sm transition-colors hover:bg-gray-50"
            style={{ borderColor: "#e2e8f0", color: "#4b5563" }}
          >
            <Download size={14} />
            Export
          </button>
          <Link
            href="/admin/orders"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all hover:opacity-90 shadow-sm"
            style={{ backgroundColor: "#bf262f" }}
          >
            <Plus size={14} />
            New Order
          </Link>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map(({ label, value, sub, icon: Icon, color, bg, trend, up }) => (
          <div
            key={label}
            className="bg-white rounded-xl p-5 border transition-all hover:shadow-md"
            style={{ borderColor: "#e2e8f0" }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: bg }}
              >
                <Icon size={19} style={{ color }} />
              </div>
              <div
                className="flex items-center gap-1 text-xs px-2 py-1 rounded-full"
                style={{
                  backgroundColor: up ? "#ecfdf5" : "#fef2f2",
                  color: up ? "#059669" : "#dc2626",
                }}
              >
                {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {trend}
              </div>
            </div>
            <div
              className="text-gray-900 mb-1"
              style={{ fontWeight: 700, fontSize: "1.5rem", lineHeight: 1.2 }}
            >
              {value}
            </div>
            <div className="text-gray-500 text-xs leading-relaxed">{label}</div>
            <div className="text-gray-400 mt-1" style={{ fontSize: "0.7rem" }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Main grid: Orders + Quick Reorder */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* Recent Orders table */}
        <div
          className="xl:col-span-2 bg-white rounded-xl border overflow-hidden"
          style={{ borderColor: "#e2e8f0" }}
        >
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #f1f5f9" }}>
            <div>
              <h2 className="font-semibold text-gray-800 text-sm">Recent Orders</h2>
              <p className="text-gray-400 mt-0.5" style={{ fontSize: "0.72rem" }}>Last 30 days · 5 orders</p>
            </div>
            <Link
              href="/admin/orders"
              className="flex items-center gap-1 text-xs font-medium transition-colors hover:opacity-70"
              style={{ color: "#bf262f" }}
            >
              View All <ChevronRight size={13} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: "#f8fafc" }}>
                  {["Order ID", "Date", "Description", "Qty", "Amount", "Status"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-gray-500 font-semibold uppercase tracking-wider whitespace-nowrap"
                      style={{ fontSize: "0.68rem", borderBottom: "1px solid #f1f5f9" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => (
                  <tr
                    key={order.id}
                    className="group transition-colors hover:bg-gray-50/80"
                    style={{ borderBottom: i < recentOrders.length - 1 ? "1px solid #f8fafc" : "none" }}
                  >
                    <td className="px-4 py-3.5">
                      <div>
                        <div className="font-mono text-xs font-semibold text-gray-800">{order.id}</div>
                        <div className="text-gray-400 mt-0.5" style={{ fontSize: "0.65rem" }}>{order.sapSo}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-gray-600 text-xs whitespace-nowrap">{order.date}</td>
                    <td className="px-4 py-3.5 text-gray-700 text-xs max-w-[180px] truncate">{order.items}</td>
                    <td className="px-4 py-3.5 text-gray-600 text-xs text-center">{order.qty}</td>
                    <td className="px-4 py-3.5 text-gray-800 text-xs font-semibold whitespace-nowrap">{order.amount}</td>
                    <td className="px-4 py-3.5">
                      <span
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                        style={{ backgroundColor: order.statusBg, color: order.statusColor }}
                      >
                        {order.status === "DELIVERED" && <CheckCircle size={10} className="mr-1" />}
                        {order.status === "Shipped" && <Truck size={10} className="mr-1" />}
                        {order.status === "Processing" && <Clock size={10} className="mr-1" />}
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Reorder */}
        <div
          className="bg-white rounded-xl border"
          style={{ borderColor: "#e2e8f0" }}
        >
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #f1f5f9" }}>
            <div>
              <h2 className="font-semibold text-gray-800 text-sm">Quick Reorder</h2>
              <p className="text-gray-400 mt-0.5" style={{ fontSize: "0.72rem" }}>Your most-ordered items</p>
            </div>
            <RefreshCw size={14} style={{ color: "#9ca3af" }} />
          </div>
          <div className="p-4 space-y-3">
            {quickReorder.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl border transition-all hover:border-red-200 hover:bg-red-50/30"
                style={{ borderColor: "#f1f5f9" }}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-gray-800 leading-snug line-clamp-2">{item.name}</div>
                    <div className="font-mono text-gray-400 mt-0.5" style={{ fontSize: "0.65rem" }}>{item.sku}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs font-bold text-gray-800">₱{item.price.toLocaleString()}</div>
                    <div className="text-gray-400" style={{ fontSize: "0.65rem" }}>WS price</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder={`Last: ${item.lastQty}`}
                    className="flex-1 min-w-0 px-2.5 py-1.5 rounded-lg border text-xs focus:outline-none transition-all"
                    style={{ borderColor: "#e2e8f0", fontSize: "0.75rem" }}
                    value={reorderQtys[item.id] || ""}
                    onChange={(e) => setReorderQtys({ ...reorderQtys, [item.id]: e.target.value })}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#bf262f";
                      e.currentTarget.style.boxShadow = "0 0 0 2px rgba(191,38,47,0.08)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#e2e8f0";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                  <button
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-white text-xs font-semibold transition-all hover:opacity-90 flex-shrink-0"
                    style={{ backgroundColor: "#bf262f" }}
                  >
                    <ShoppingCart size={11} />
                    Add
                  </button>
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-gray-400" style={{ fontSize: "0.65rem" }}>
                    Stock: {item.stock.toLocaleString()} units
                  </span>
                  {reorderQtys[item.id] && (
                    <span className="text-green-600 font-semibold" style={{ fontSize: "0.65rem" }}>
                      Total: ₱{(item.price * parseInt(reorderQtys[item.id] || "0")).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 pb-4">
            <Link
              href="/admin/products"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border text-xs font-semibold transition-all hover:bg-gray-50"
              style={{ borderColor: "#e2e8f0", color: "#4b5563" }}
            >
              Browse Full Catalog <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

        {/* Invoice aging summary */}
        <div
          className="bg-white rounded-xl border p-5"
          style={{ borderColor: "#e2e8f0" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800 text-sm">Invoice Aging</h2>
            <Link
              href="/admin/invoices"
              className="text-xs font-medium hover:opacity-70 transition-opacity"
              style={{ color: "#bf262f" }}
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {invoiceSummary.map(({ label, amount, color, pct }) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-gray-600">{label}</span>
                  <span className="text-xs font-semibold text-gray-800">{amount}</span>
                </div>
                <div className="w-full rounded-full h-2" style={{ backgroundColor: "#f1f5f9" }}>
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{ width: `${pct}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div
            className="mt-4 pt-4 flex items-center justify-between text-xs"
            style={{ borderTop: "1px solid #f1f5f9" }}
          >
            <span className="text-gray-500">Total Outstanding</span>
            <span className="font-bold text-gray-900">₱241,668</span>
          </div>
        </div>

        {/* SAP Integration Status */}
        <div
          className="bg-white rounded-xl border p-5"
          style={{ borderColor: "#e2e8f0" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800 text-sm">System Status</h2>
            <span
              className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium"
              style={{ backgroundColor: "#ecfdf5", color: "#059669" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
              All Systems Go
            </span>
          </div>
          <div className="space-y-2.5">
            {sapModules.map(({ label, status, color }) => (
              <div
                key={label}
                className="flex items-center justify-between py-2 px-3 rounded-lg"
                style={{ backgroundColor: "#f8fafc" }}
              >
                <span className="text-xs text-gray-600">{label}</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-xs font-medium" style={{ color }}>{status}</span>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/admin/analytics"
            className="mt-4 flex items-center justify-center gap-2 w-full py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-90 text-white"
            style={{ backgroundColor: "#1a0608" }}
          >
            <BarChart3 size={13} />
            View Analytics
          </Link>
        </div>

        {/* Account tier progress */}
        <div
          className="bg-white rounded-xl border p-5"
          style={{ borderColor: "#e2e8f0" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800 text-sm">Admin Status</h2>
            <span
              className="text-xs px-2.5 py-1 rounded-full font-bold"
              style={{ backgroundColor: "#fef3c7", color: "#92400e" }}
            >
              ADMIN
            </span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#fef3c7" }}
            >
              <Star size={22} style={{ color: "#d97706" }} fill="#d97706" />
            </div>
            <div>
              <div className="font-bold text-gray-800 text-sm">Full Admin</div>
              <div className="text-gray-500 text-xs">System Administrator · All Permissions</div>
            </div>
          </div>

          <div className="mb-1 flex justify-between text-xs text-gray-500">
            <span>System Access</span>
            <span className="font-semibold text-gray-700">100%</span>
          </div>
          <div className="w-full rounded-full h-3 overflow-hidden" style={{ backgroundColor: "#f1f5f9" }}>
            <div
              className="h-3 rounded-full"
              style={{
                width: "100%",
                background: "linear-gradient(90deg, #d97706 0%, #bf262f 100%)",
              }}
            />
          </div>
          <div className="flex justify-between text-xs mt-1.5">
            <span className="text-gray-400">Complete access</span>
            <span className="text-gray-500">All modules</span>
          </div>

          <div
            className="mt-4 p-3 rounded-xl text-xs space-y-1"
            style={{ backgroundColor: "#f9e9ea" }}
          >
            <div className="font-semibold text-xs" style={{ color: "#bf262f" }}>You can manage:</div>
            {["All Products & Inventory", "Orders & Payments", "User Accounts & Permissions"].map((perk) => (
              <div key={perk} className="flex items-center gap-1.5 text-gray-600">
                <CheckCircle size={10} style={{ color: "#bf262f" }} />
                {perk}
              </div>
            ))}
          </div>

          <Link
            href="/admin/users"
            className="mt-3 flex items-center justify-center gap-1.5 text-xs font-medium hover:opacity-70 transition-opacity"
            style={{ color: "#bf262f" }}
          >
            Manage Accounts <Eye size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
