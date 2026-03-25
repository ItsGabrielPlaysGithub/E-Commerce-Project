import { CheckCircle, Clock, Truck } from "lucide-react";

interface RecentOrderRow {
  id: string;
  sapSo: string;
  date: string;
  items: string;
  qty: number;
  amount: string;
  status: string;
  statusColor: string;
  statusBg: string;
}

interface RecentOrdersTableProps {
  orders: RecentOrderRow[];
  loading?: boolean;
}

export default function RecentOrdersTable({ orders, loading = false }: RecentOrdersTableProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col min-h-80 sm:min-h-96">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">Recent Sales Orders</h2>
        <button className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50">
          View All
        </button>
      </div>
      <div className="overflow-x-auto overflow-y-auto flex-1">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="px-3 py-2 font-medium">Order</th>
              <th className="px-3 py-2 font-medium">SAP SO</th>
              <th className="px-3 py-2 font-medium">Date</th>
              <th className="px-3 py-2 font-medium">Items</th>
              <th className="px-3 py-2 font-medium">Qty</th>
              <th className="px-3 py-2 font-medium">Amount</th>
              <th className="px-3 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="border-t border-slate-100">
                <td colSpan={7} className="px-3 py-4 text-center text-sm text-slate-500">
                  Loading recent orders...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr className="border-t border-slate-100">
                <td colSpan={7} className="px-3 py-4 text-center text-sm text-slate-500">
                  No recent orders found.
                </td>
              </tr>
            ) : (
              orders.map((o) => {
                const normalizedStatus = o.status.toLowerCase();
                const StatusIcon = normalizedStatus.includes("delivered")
                  ? CheckCircle
                  : normalizedStatus.includes("transit") || normalizedStatus.includes("shipped")
                    ? Truck
                    : Clock;

              return (
                <tr key={o.id} className="border-t border-slate-100">
                  <td className="px-3 py-2 font-medium text-slate-900">{o.id}</td>
                  <td className="px-3 py-2 text-slate-600">{o.sapSo}</td>
                  <td className="px-3 py-2 text-slate-600">{o.date}</td>
                  <td className="px-3 py-2 text-slate-600">{o.items}</td>
                  <td className="px-3 py-2 text-slate-600">{o.qty}</td>
                  <td className="px-3 py-2 font-semibold text-slate-900">{o.amount}</td>
                  <td className="px-3 py-2">
                    <span
                      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium"
                      style={{ backgroundColor: o.statusBg, color: o.statusColor }}
                    >
                      <StatusIcon className="h-3.5 w-3.5" />
                      {o.status}
                    </span>
                  </td>
                </tr>
              );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
