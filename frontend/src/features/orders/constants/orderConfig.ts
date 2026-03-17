import {
  CheckCircle,
  Clock,
  Truck,
  X,
  Package,
} from "lucide-react";
import type { OrderStatus } from "../types/order";

export const STATUS_CONFIG: Record<string, { color: string; bg: string; icon: React.ElementType }> = {
  Open: { color: "#6b7280", bg: "#f9fafb", icon: Package },
  Processing: { color: "#f59e0b", bg: "#fffbeb", icon: Clock },
  Shipped: { color: "#3b82f6", bg: "#eff6ff", icon: Truck },
  Delivered: { color: "#10b981", bg: "#ecfdf5", icon: CheckCircle },
  Cancelled: { color: "#ef4444", bg: "#fef2f2", icon: X },
};

export const PAY_CONFIG: Record<string, { color: string; bg: string }> = {
  Paid: { color: "#059669", bg: "#ecfdf5" },
  Pending: { color: "#d97706", bg: "#fffbeb" },
  Overdue: { color: "#dc2626", bg: "#fef2f2" },
};

export const STATUS_TABS: OrderStatus[] = ["All", "Open", "Processing", "Shipped", "Delivered", "Cancelled"];
