export interface SalesOrder {
  orderId: string;
  orderNumber: string;
  userId: number;
  productId: number;
  orderType?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  deliveryFee?: number;
  grandTotal?: number;
  status: string;
  deliveryStatus?: string;
  paymentMethod?: string;
  paymentProofImage?: string;
  paymentProofUploadedAt?: string;
  paymentProofStatus?: string;
  paymentProofAttempts?: number;
  paymentProofRejectionReason?: string;
  paymongoTransactionId?: string;
  paymongoAmount?: number;
  paymongoPaymentMethod?: string;
  paymongoTimestamp?: string;
  createdAt: string;
  updatedAt: string;
}
