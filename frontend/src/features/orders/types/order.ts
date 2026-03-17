export type OrderStatus = "All" | "Open" | "Processing" | "Shipped" | "Delivered" | "Cancelled";

export interface OrderItem {
  sku: string;
  name: string;
  qty: number;
  unitPrice: number;
  total: number;
}

export interface Order {
  id: string;
  sapSo: string;
  date: string;
  deliveryDate?: string;
  customer: string;
  items: OrderItem[];
  subtotal: number;
  vat: number;
  total: number;
  status: OrderStatus;
  paymentStatus: "Paid" | "Pending" | "Overdue";
  deliveryMethod: string;
  notes?: string;
}
