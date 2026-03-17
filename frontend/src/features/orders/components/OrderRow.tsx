import { Upload, RotateCcw, Eye, ChevronDown, ChevronUp } from "lucide-react";
import type { Order } from "../types/order";
import { STATUS_CONFIG, PAY_CONFIG } from "../constants/orderConfig";
import { OrderDetails } from "./OrderDetails";

interface OrderRowProps {
  order: Order;
  isExpanded: boolean;
  onExpand: (orderId: string | null) => void;
  index: number;
  isLastItem: boolean;
}

export function OrderRow({
  order,
  isExpanded,
  onExpand,
  index,
  isLastItem,
}: OrderRowProps) {
  const StatusIcon = STATUS_CONFIG[order.status]?.icon;

  return (
    <div className="mb-3 rounded-lg border border-slate-200 overflow-hidden">
      <div className="px-5 py-8 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-gray-50/50 transition-colors min-h-full">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-sm font-bold text-gray-800">
              {order.id}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded font-medium"
              style={{ backgroundColor: "#f1f5f9", color: "#475569" }}
            >
              {order.sapSo}
            </span>
            <span
              className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium"
              style={{
                backgroundColor: STATUS_CONFIG[order.status]?.bg,
                color: STATUS_CONFIG[order.status]?.color,
              }}
            >
              {StatusIcon && <StatusIcon size={10} />}
              {order.status}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{
                backgroundColor: PAY_CONFIG[order.paymentStatus]?.bg,
                color: PAY_CONFIG[order.paymentStatus]?.color,
              }}
            >
              {order.paymentStatus}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1.5">
            <span className="text-xs text-gray-500">Ordered: {order.date}</span>
            {order.deliveryDate && (
              <span className="text-xs text-gray-500">
                {order.status === "Delivered" ? "Delivered" : "ETA"}:{" "}
                {order.deliveryDate}
              </span>
            )}
            <span className="text-xs text-gray-500">
              {order.items.length} SKU(s) ·{" "}
              {order.items.reduce((a, i) => a + i.qty, 0)} units
            </span>
          </div>
          <div className="text-xs text-gray-600 mt-1 truncate">
            {order.items.map((it) => `${it.name} ×${it.qty}`).join(" · ")}
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right">
            <div className="font-bold text-gray-800 text-sm">
              ₱{order.total.toLocaleString()}
            </div>
            <div className="text-gray-400" style={{ fontSize: "0.65rem" }}>
              incl. VAT
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {order.status === "Delivered" && (
              <button
                className="p-2 rounded-lg border transition-colors hover:bg-gray-50 text-gray-500"
                style={{ borderColor: "#e2e8f0" }}
                title="Reorder"
              >
                <RotateCcw size={13} />
              </button>
            )}
            {order.status === "Open" && order.paymentStatus === "Pending" && (
              <button
                className="p-2 rounded-lg border transition-colors hover:bg-blue-50 hover:text-blue-600 hover:border-blue-500 text-gray-500 border-gray-500"
                title="Upload Payment Proof"
              >
                <Upload size={13} />
              </button>
            )}
            <button
              onClick={() => onExpand(isExpanded ? null : order.id)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg border text-xs font-medium transition-colors hover:bg-gray-50"
              style={{ borderColor: "#e2e8f0", color: "#4b5563" }}
            >
              <Eye size={12} />
              {isExpanded ? "Close" : "Details"}
              {isExpanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
            </button>
          </div>
        </div>
      </div>

      {isExpanded && <OrderDetails order={order} />}
    </div>
  );
}
