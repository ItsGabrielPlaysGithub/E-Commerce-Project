export type OrderStatus = "PENDING_APPROVAL" | "APPROVED" | "REJECTED" | "ORDERED_FROM_SUPPLIER" | "READY_FOR_BILLING" | "AWAITING_PAYMENT_VERIFICATION" | "PACKING" | "READY_FOR_DELIVERY" | "IN_TRANSIT" | "PAID" | "DELIVERED";

export type OrderTabStatus = "All" | "Open" | "Processing" | "Shipped" | "Delivered" | "Cancelled";

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
  paymentProofImage?: string;
  paymentProofStatus?: "pending" | "rejected" | "approved";
  paymentProofAttempts?: number;
  paymentProofRejectionReason?: string;
}
