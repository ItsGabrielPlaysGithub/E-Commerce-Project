// Map database status values to display labels
const statusLabels: Record<string, string> = {
  PENDING_APPROVAL: "Upload proof of payment to proceed to processing",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  PACKING: "Packing",
  IN_TRANSIT: "In Transit",
  DELIVERED: "Delivered",
  PAID: "Paid",
  READY_FOR_BILLING: "Ready for Billing",
  AWAITING_PAYMENT_VERIFICATION: "Waiting for Payment Verification",
  READY_FOR_DELIVERY: "Ready for Delivery",
  DISCREPANCY_REPORTED: "Discrepancy Reported",
  ORDERED_FROM_SUPPLIER: "Ordered from Supplier",
}

export function getStatusLabel(status: string): string {
  return statusLabels[status] || status;
}

// Get status color for badge display
export function getStatusColor(status: string): { bg: string; border: string; text: string } {
  const colors: Record<string, { bg: string; border: string; text: string }> = {
    PENDING_APPROVAL: {
      bg: "#fef3c7",
      border: "#fde68a",
      text: "#d97706",
    },
    APPROVED: {
      bg: "#dbeafe",
      border: "#bfdbfe",
      text: "#2563eb",
    },
    REJECTED: {
      bg: "#fee2e2",
      border: "#fecaca",
      text: "#dc2626",
    },
    PACKING: {
      bg: "#faf5ff",
      border: "#f3e8ff",
      text: "#9333ea",
    },
    IN_TRANSIT: {
      bg: "#fef3c7",
      border: "#fde68a",
      text: "#ca8a04",
    },
    DELIVERED: {
      bg: "#dcfce7",
      border: "#bbf7d0",
      text: "#16a34a",
    },
    PAID: {
      bg: "#f3f4f6",
      border: "#e5e7eb",
      text: "#6b7280",
    },
    READY_FOR_BILLING: {
      bg: "#fef08a",
      border: "#fde047",
      text: "#ca8a04",
    },
    AWAITING_PAYMENT_VERIFICATION: {
      bg: "#e0e7ff",
      border: "#c7d2fe",
      text: "#4f46e5",
    },
    READY_FOR_DELIVERY: {
      bg: "#fbf8f3",
      border: "#f5f3ff",
      text: "#78350f",
    },
    DISCREPANCY_REPORTED: {
      bg: "#f3e8ff",
      border: "#e9d5ff",
      text: "#7c3aed",
    },
  };

  return colors[status] || colors.PENDING_APPROVAL;
}
